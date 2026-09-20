#!/usr/bin/env bash
#
# Monifactory dedicated server installer (interactive).
#
# Automates the "Dedicated Server Installation" section of the README:
#   1. Downloads server.zip from GitHub releases
#   2. Downloads the Forge 47.4.13 (MC 1.20.1) installer
#   3. Installs the Forge server (generates run.sh, libraries, etc.)
#   4. Unpacks server.zip over the server directory
#   5. Handles legacy `overrides/` layout (Monifactory <= 0.12.X)
#   6. Sets pack mode (Normal/Hard/Expert), RAM and EULA
#
# Usage:
#   ./install.sh
#
# The script asks you everything it needs. Just run it and answer the prompts.
# (Advanced: MONI_REPO, MONI_MC_VERSION, MONI_FORGE_VERSION, MONI_FORGE_URL and
#  MONI_SERVER_ZIP_URL env vars can override download sources.)
#
set -euo pipefail

REPO="Omicron-Industries/Monifactory"
MC_VERSION="1.20.1"
FORGE_VERSION="47.4.13"
DEFAULT_DIR="MonifactoryServer"
DEFAULT_MEMORY="6G"

if [[ $# -gt 0 ]]; then
  printf 'ERROR: this script takes no arguments. Just run ./install.sh and answer the prompts.\n' >&2
  exit 1
fi

log()  { printf '%s\n' "$*"; }
warn() { printf 'WARNING: %s\n' "$*" >&2; }
die()  { printf 'ERROR: %s\n' "$*" >&2; exit 1; }

# ask <prompt> <default> -> prints the answer (default on empty input / EOF)
# Reads from /dev/tty so prompts still work when the script itself is piped
# into bash (e.g. `curl ... | bash`), where stdin is the download stream.
ask() {
  local prompt="$1" default="$2" reply
  printf '%s [%s]: ' "${prompt}" "${default}" >&2
  if [[ -c /dev/tty ]]; then
    IFS= read -r reply 2>/dev/null </dev/tty || reply=""
  else
    IFS= read -r reply || reply=""
  fi
  [[ -z "${reply}" ]] && reply="${default}"
  printf '%s' "${reply}"
}

# ask_yes_no <prompt> <default: y|n> -> returns 0 for yes, 1 for no
ask_yes_no() {
  local prompt="$1" default="$2" reply yn
  yn="y/N"
  [[ "${default}" == "y" ]] && yn="Y/n"
  while true; do
    reply="$(ask "${prompt}" "${default}")"
    case "$(printf '%s' "${reply}" | tr '[:upper:]' '[:lower:]')" in
      y|yes) return 0 ;;
      n|no) return 1 ;;
      *) warn "Please answer y or n." ;;
    esac
    # Non-interactive stdin (EOF): ask() already returned the default,
    # which is valid, so we never loop here in practice.
    if [[ ! -t 0 ]]; then
      [[ "${default}" == "y" ]] && return 0 || return 1
    fi
  done
}

MONI_REPO="${MONI_REPO:-${REPO}}"
MONI_MC_VERSION="${MONI_MC_VERSION:-${MC_VERSION}}"
MONI_FORGE_VERSION="${MONI_FORGE_VERSION:-${FORGE_VERSION}}"
MONI_FORGE_URL="${MONI_FORGE_URL:-https://maven.minecraftforge.net/net/minecraftforge/forge/${MONI_MC_VERSION}-${MONI_FORGE_VERSION}/forge-${MONI_MC_VERSION}-${MONI_FORGE_VERSION}-installer.jar}"

# --- prerequisite checks ----------------------------------------------------
need_cmd() { command -v "$1" >/dev/null 2>&1 || die "Missing required command: $1"; }
need_cmd java
need_cmd unzip
if ! command -v curl >/dev/null 2>&1 && ! command -v wget >/dev/null 2>&1; then
  die "Need either curl or wget to download files."
fi

# Java 17+ is required for Minecraft 1.20.1
JAVA_MAJOR="$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d. -f1)"
if [[ "${JAVA_MAJOR}" == "1" ]]; then
  JAVA_MAJOR="$(java -version 2>&1 | awk -F '"' '/version/ {print $2}' | cut -d. -f2)"
fi
if [[ -n "${JAVA_MAJOR}" ]] && [[ "${JAVA_MAJOR}" -lt 17 ]]; then
  die "Java 17+ is required for MC 1.20.1, found Java ${JAVA_MAJOR}. Install Temurin/OpenJDK 17 or 21."
fi
log "Java check OK ($(java -version 2>&1 | head -n 1))"

download() { # download <url> <dest>
  local url="$1" dest="$2"
  log "Downloading ${url} -> ${dest}"
  if command -v curl >/dev/null 2>&1; then
    curl -fSL --retry 3 -o "${dest}" "${url}"
  else
    wget -O "${dest}" "${url}"
  fi
}

# Resolve a server.zip asset URL via the GitHub API.
# Uses python3 if present (most robust), else jq, else grep/sed fallback.
resolve_server_zip_url() { # resolve_server_zip_url <tag|"latest">
  local tag="$1" api_url asset_url
  if [[ "${tag}" == "latest" ]]; then
    api_url="https://api.github.com/repos/${MONI_REPO}/releases/latest"
  else
    # Allow tags with or without leading 'v'
    api_url="https://api.github.com/repos/${MONI_REPO}/releases/tags/${tag}"
  fi
  # NOTE: informational output here must go to stderr, because the caller
  # captures this function's stdout as the download URL.
  printf 'Resolving server.zip for %s via %s\n' "${tag}" "${api_url}" >&2
  local json
  if command -v curl >/dev/null 2>&1; then
    json="$(curl -fSL --retry 3 "${api_url}")"
  else
    json="$(wget -qO- "${api_url}")"
  fi
  if command -v python3 >/dev/null 2>&1; then
    asset_url="$(printf '%s' "${json}" | python3 -c \
      'import json,sys; d=json.load(sys.stdin); urls=[a["browser_download_url"] for a in d.get("assets",[]) if a.get("name","").lower().endswith("server.zip")]; print(urls[0] if urls else "")')"
  elif command -v jq >/dev/null 2>&1; then
    asset_url="$(printf '%s' "${json}" | jq -r '[.assets[] | select(.name | ascii_downcase | endswith("server.zip")) | .browser_download_url][0] // empty')"
  else
    asset_url="$(printf '%s' "${json}" | grep -o '"browser_download_url": *"[^"]*server\.zip"' | head -n 1 | sed 's/.*"browser_download_url": *"//; s/"$//')"
  fi
  [[ -n "${asset_url}" ]] || die "No *server.zip asset found for '${tag}'. Check https://github.com/${MONI_REPO}/releases"
  printf '%s' "${asset_url}"
}

# --- interactive setup ------------------------------------------------------
printf '\n=== Monifactory dedicated server setup ===\n\n'

TARGET_DIR="$(ask "Where should the server be installed" "./${DEFAULT_DIR}")"
VERSION="$(ask "Monifactory version tag (or 'latest')" "latest")"

while true; do
  MEMORY="$(ask "How much RAM for the server (e.g. 6G, 8192M)" "${DEFAULT_MEMORY}")"
  if [[ "${MEMORY}" =~ ^[0-9]+[GgMm]$ ]]; then
    break
  fi
  warn "Invalid memory '${MEMORY}'. Use e.g. 6G or 8192M."
done

while true; do
  PACK_MODE="$(ask "Pack mode - (N)ormal / (H)ard / (E)xpert" "N")"
  case "$(printf '%s' "${PACK_MODE}" | tr '[:upper:]' '[:lower:]')" in
    n|normal) PACK_MODE_ARG="N"; PACK_MODE_NAME="Normal"; break ;;
    h|hard)   PACK_MODE_ARG="H"; PACK_MODE_NAME="Hard"; break ;;
    e|expert) PACK_MODE_ARG="E"; PACK_MODE_NAME="Expert"; break ;;
    *) warn "Invalid mode '${PACK_MODE}'. Use N, H or E." ;;
  esac
done

if ask_yes_no "Accept the Mojang EULA (https://aka.ms/MinecraftEULA)" "y"; then
  ACCEPT_EULA=true
else
  ACCEPT_EULA=false
fi

if ask_yes_no "Start the server once setup is done" "n"; then
  START_SERVER=true
else
  START_SERVER=false
fi

printf '\n--- Summary ---\n'
printf '  Directory: %s\n' "${TARGET_DIR}"
printf '  Version:   %s (MC %s, Forge %s)\n' "${VERSION}" "${MONI_MC_VERSION}" "${MONI_FORGE_VERSION}"
printf '  RAM:       %s\n' "${MEMORY}"
printf '  Pack mode: %s\n' "${PACK_MODE_NAME}"
if "${ACCEPT_EULA}"; then
  printf '  EULA:      accepted\n'
else
  printf '  EULA:      you will accept it manually in eula.txt\n'
fi
if "${START_SERVER}"; then
  printf '  Afterwards: start the server\n'
else
  printf '  Afterwards: leave the server stopped\n'
fi

printf '\n'

mkdir -p "${TARGET_DIR}"
TARGET_DIR="$(cd "${TARGET_DIR}" && pwd)"
log "Install directory: ${TARGET_DIR}"

if [[ -n "${MONI_SERVER_ZIP_URL:-}" ]]; then
  SERVER_ZIP_URL="${MONI_SERVER_ZIP_URL}"
else
  SERVER_ZIP_URL="$(resolve_server_zip_url "${VERSION}")"
  log "server.zip: ${SERVER_ZIP_URL}"
fi

FORGE_JAR_NAME="forge-${MONI_MC_VERSION}-${MONI_FORGE_VERSION}-installer.jar"
SERVER_ZIP_NAME="monifactory-server.zip"

# --- downloads ----------------------------------------------------------------
cd "${TARGET_DIR}"
if [[ ! -f "${FORGE_JAR_NAME}" ]]; then
  download "${MONI_FORGE_URL}" "${FORGE_JAR_NAME}"
else
  log "Reusing existing ${FORGE_JAR_NAME}"
fi
if [[ ! -f "${SERVER_ZIP_NAME}" ]]; then
  download "${SERVER_ZIP_URL}" "${SERVER_ZIP_NAME}"
else
  log "Reusing existing ${SERVER_ZIP_NAME}"
fi

# --- forge server install (generates run.sh, libraries, vanilla jar) ---------
# Forge is very chatty; keep its output in a log file and only show it on failure.
log "Installing Forge server (this downloads Minecraft server files, may take a while)..."
if ! java -jar "${FORGE_JAR_NAME}" --installServer >forge-install.log 2>&1; then
  tail -n 20 forge-install.log >&2 || true
  die "Forge server install failed. See ${TARGET_DIR}/forge-install.log for details."
fi
log "Forge server installed."

# --- unpack the modpack over the server --------------------------------------
log "Unpacking ${SERVER_ZIP_NAME}..."
unzip -oq "${SERVER_ZIP_NAME}"

# Legacy layout (Monifactory <= 0.12.X shipped an overrides/ folder in server.zip)
if [[ -d "overrides" ]]; then
  log "Legacy overrides/ folder detected, moving contents up (pre-0.13 layout)..."
  shopt -s dotglob nullglob
  mv overrides/* ./
  rmdir overrides
  shopt -u dotglob nullglob
fi

# Sanity check: the pack must provide these after unpacking
for d in mods kubejs config; do
  [[ -d "${d}" ]] || warn "Expected directory '${d}' missing after unpack - did server.zip extract correctly?"
done

# --- pack mode ----------------------------------------------------------------
# README: java -jar <server>/mods/monilabs-*.jar <N/H/E>
shopt -s nullglob
MONI_JARS=(mods/monilabs-*.jar)
shopt -u nullglob
if [[ "${#MONI_JARS[@]}" -gt 0 ]]; then
  if [[ "${PACK_MODE_ARG}" != "N" ]]; then
    log "Setting pack mode to '${PACK_MODE_ARG}' via ${MONI_JARS[0]}..."
    java -jar "${MONI_JARS[0]}" "${PACK_MODE_ARG}"
  else
    log "Pack mode: Normal (default, no switch needed)"
  fi
else
  warn "mods/monilabs-*.jar not found, skipping pack-mode switch. Set it later with: java -jar mods/monilabs-*.jar <N/H/E>"
fi

# --- RAM ----------------------------------------------------------------------
# Modern Forge run.sh reads JVM args from user_jvm_args.txt
if [[ -f "user_jvm_args.txt" ]]; then
  if grep -q -- '-Xmx' user_jvm_args.txt; then
    sed -i "s/-Xmx[A-Za-z0-9]* /-Xmx${MEMORY} /; s/-Xmx[A-Za-z0-9]*\$/-Xmx${MEMORY}/" user_jvm_args.txt
    if ! grep -q -- '-Xms' user_jvm_args.txt; then
      printf '%s\n' "-Xms${MEMORY}" >> user_jvm_args.txt
    else
      sed -i "s/-Xms[A-Za-z0-9]* /-Xms${MEMORY} /; s/-Xms[A-Za-z0-9]*\$/-Xms${MEMORY}/" user_jvm_args.txt
    fi
  else
    printf '%s\n' "-Xmx${MEMORY} -Xms${MEMORY}" >> user_jvm_args.txt
  fi
else
  printf '# JVM args for the Monifactory server (written by install.sh)\n-Xmx%s -Xms%s\n' "${MEMORY}" "${MEMORY}" > user_jvm_args.txt
fi
log "RAM set to ${MEMORY} in user_jvm_args.txt"

# --- EULA ---------------------------------------------------------------------
if "${ACCEPT_EULA}"; then
  printf 'eula=true\n' > eula.txt
  log "Mojang EULA accepted (eula=true)."
else
  if [[ ! -f "eula.txt" ]]; then
    log "Generating eula.txt with a first (expected to fail) server start..."
    # This run exits non-zero asking the user to accept the EULA; don't abort.
    set +e
    if [[ -f "run.sh" ]]; then
      sh run.sh --initSettings >/dev/null 2>&1 || sh run.sh >/dev/null 2>&1 || true
    else
      java @user_jvm_args.txt @libraries/net/minecraftforge/forge/*/unix_args.txt nogui >/dev/null 2>&1 || true
    fi
    set -e
  fi
  if ! grep -q '^eula=true' eula.txt 2>/dev/null; then
    warn "You must accept the Mojang EULA: set eula=true in ${TARGET_DIR}/eula.txt, then run ./run.sh"
  fi
fi

if [[ -f "run.sh" ]]; then
  chmod +x run.sh
  # Launch without the server GUI by default, so plain ./run.sh uses nogui.
  if ! grep -q 'nogui' run.sh; then
    sed -i 's/"\$@"/nogui "$@"/' run.sh
    log "run.sh now launches with nogui by default."
  fi
else
  warn "run.sh not found - Forge install may have failed."
fi

# --- cleanup ------------------------------------------------------------------
rm -f "${FORGE_JAR_NAME}"

log "Install complete in ${TARGET_DIR}"
log "Next steps:"
if ! "${ACCEPT_EULA}" && ! grep -q '^eula=true' eula.txt 2>/dev/null; then
  log "  1. Edit eula.txt (eula=true)"
fi
log "  - Optional: edit server.properties (port etc.), user_jvm_args.txt (RAM)"
log "  - Start the server: cd '${TARGET_DIR}' && ./run.sh"
log "  - Switch pack mode later: java -jar mods/monilabs-*.jar <N/H/E>"

if "${START_SERVER}"; then
  if ! grep -q '^eula=true' eula.txt 2>/dev/null; then
    die "Cannot start: EULA not accepted. Set eula=true in eula.txt first, then run ./run.sh"
  fi
  log "Starting server..."
  exec ./run.sh nogui
fi
