#!/usr/bin/env bash
set -euo pipefail

TEMPLATE_REPO="git@github.com:solara-co-jp/next-shadcn-sparkle.git"
REMOTE_NAME="upstream"

usage() {
  cat <<EOF
Usage: bash scripts/init-from-template.sh [OPTIONS]

派生リポジトリにテンプレートリポジトリを upstream リモートとして登録し、
初回の fetch と .templaterc.json の生成を行います。

Options:
  -r, --repo URL    テンプレートリポジトリのURL (default: $TEMPLATE_REPO)
  -n, --name NAME   リモート名 (default: $REMOTE_NAME)
  -h, --help        このヘルプを表示

Example:
  # テンプレートリポから派生した新しいプロジェクトで実行
  git clone git@github.com:your-org/your-app.git
  cd your-app
  bash scripts/init-from-template.sh
EOF
}

while [[ $# -gt 0 ]]; do
  case "$1" in
    -r|--repo) TEMPLATE_REPO="$2"; shift 2 ;;
    -n|--name) REMOTE_NAME="$2"; shift 2 ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
done

# Check if we're in a git repo
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  echo "Error: Not inside a git repository." >&2
  exit 1
fi

# Check if remote already exists
if git remote get-url "$REMOTE_NAME" &>/dev/null; then
  existing_url=$(git remote get-url "$REMOTE_NAME")
  echo "Remote '$REMOTE_NAME' already exists: $existing_url"
  echo "To re-initialize, remove it first: git remote remove $REMOTE_NAME"
  exit 1
fi

echo "Adding remote '$REMOTE_NAME' -> $TEMPLATE_REPO"
git remote add "$REMOTE_NAME" "$TEMPLATE_REPO"

echo "Fetching $REMOTE_NAME..."
git fetch "$REMOTE_NAME"

# Get the latest commit hash from upstream/main
UPSTREAM_HASH=$(git rev-parse "$REMOTE_NAME/main")

# Generate .templaterc.json
cat > .templaterc.json <<JSONEOF
{
  "templateRepo": "$TEMPLATE_REPO",
  "templateVersion": "$UPSTREAM_HASH",
  "lastSynced": "$(date +%Y-%m-%d)"
}
JSONEOF

echo ""
echo "Done! Template upstream configured."
echo "  Remote:  $REMOTE_NAME -> $TEMPLATE_REPO"
echo "  Version: $UPSTREAM_HASH"
echo ""
echo "To pull in template updates later, run:"
echo "  bash scripts/sync-from-template.sh"
