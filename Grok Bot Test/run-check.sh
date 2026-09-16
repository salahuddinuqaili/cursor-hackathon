#!/usr/bin/env bash
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
JSON="$ROOT/expected-agents.json"
echo "Grok Bot Test — expected agents"
if command -v python3 >/dev/null 2>&1; then
  python3 - <<'PY' "$JSON"
import json, sys
data = json.load(open(sys.argv[1], encoding="utf-8"))
for a in data.get("agents", []):
    req = "required" if a.get("required") else "on-call"
    print(f"- {a.get('id')} ({req}): {a.get('lane')}")
PY
elif command -v jq >/dev/null 2>&1; then
  jq -r '.agents[] | "- \(.id) (\(if .required then "required" else "on-call" end)): \(.lane)"' "$JSON"
else
  echo "(install python3 or jq for pretty list; raw file: $JSON)"
  cat "$JSON"
fi
echo
echo "Fill RESULTS.md after agent LIVE acks"
