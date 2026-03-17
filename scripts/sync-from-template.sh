#!/usr/bin/env bash
set -euo pipefail

REMOTE_NAME="upstream"
BRANCH="main"

usage() {
  cat <<EOF
Usage: bash scripts/sync-from-template.sh [OPTIONS]

テンプレートリポジトリの最新変更を取り込みます。
upstream リモートから fetch し、現在のブランチに merge します。

Options:
  -n, --name NAME     リモート名 (default: $REMOTE_NAME)
  -b, --branch NAME   マージ元ブランチ (default: $BRANCH)
  --dry-run            fetch のみ実行し、merge はしない
  -h, --help           このヘルプを表示

Example:
  bash scripts/sync-from-template.sh
  bash scripts/sync-from-template.sh --dry-run
EOF
}

DRY_RUN=false

while [[ $# -gt 0 ]]; do
  case "$1" in
    -n|--name) REMOTE_NAME="$2"; shift 2 ;;
    -b|--branch) BRANCH="$2"; shift 2 ;;
    --dry-run) DRY_RUN=true; shift ;;
    -h|--help) usage; exit 0 ;;
    *) echo "Unknown option: $1" >&2; usage; exit 1 ;;
  esac
done

# Check if we're in a git repo
if ! git rev-parse --is-inside-work-tree &>/dev/null; then
  echo "Error: Not inside a git repository." >&2
  exit 1
fi

# Check if remote exists
if ! git remote get-url "$REMOTE_NAME" &>/dev/null; then
  echo "Error: Remote '$REMOTE_NAME' not found." >&2
  echo "Run 'bash scripts/init-from-template.sh' first." >&2
  exit 1
fi

# Check for uncommitted changes
if ! git diff-index --quiet HEAD -- 2>/dev/null; then
  echo "Error: You have uncommitted changes. Please commit or stash them first." >&2
  exit 1
fi

TEMPLATE_URL=$(git remote get-url "$REMOTE_NAME")
echo "Fetching from $REMOTE_NAME ($TEMPLATE_URL)..."
git fetch "$REMOTE_NAME"

LOCAL_HEAD=$(git rev-parse HEAD)
UPSTREAM_HEAD=$(git rev-parse "$REMOTE_NAME/$BRANCH")

# Check if already up to date
MERGE_BASE=$(git merge-base HEAD "$REMOTE_NAME/$BRANCH" 2>/dev/null || echo "")
if [[ "$MERGE_BASE" == "$UPSTREAM_HEAD" ]]; then
  echo "Already up to date with $REMOTE_NAME/$BRANCH."
  exit 0
fi

# Show what will be merged
COMMITS_BEHIND=$(git rev-list --count HEAD.."$REMOTE_NAME/$BRANCH")
echo ""
echo "Updates available: $COMMITS_BEHIND commit(s) from $REMOTE_NAME/$BRANCH"
echo ""
echo "Changes to be merged:"
git --no-pager log --oneline HEAD.."$REMOTE_NAME/$BRANCH"
echo ""

if [[ "$DRY_RUN" == true ]]; then
  echo "[dry-run] Skipping merge. Run without --dry-run to apply."
  exit 0
fi

echo "Merging $REMOTE_NAME/$BRANCH..."
if git merge "$REMOTE_NAME/$BRANCH" --no-edit; then
  # Update .templaterc.json
  if [[ -f .templaterc.json ]]; then
    # Use a temp file to avoid issues with reading and writing the same file
    SYNCED_DATE=$(date +%Y-%m-%d)
    TMPFILE=$(mktemp)
    # Simple sed replacement for version and date
    sed -e "s/\"templateVersion\": \".*\"/\"templateVersion\": \"$UPSTREAM_HEAD\"/" \
        -e "s/\"lastSynced\": \".*\"/\"lastSynced\": \"$SYNCED_DATE\"/" \
        .templaterc.json > "$TMPFILE"
    mv "$TMPFILE" .templaterc.json
    git add .templaterc.json
    git commit --amend --no-edit
  fi

  echo ""
  echo "Sync complete!"
  echo "  Merged: $UPSTREAM_HEAD"
  echo "  Date:   $(date +%Y-%m-%d)"
else
  echo ""
  echo "Merge conflict detected!"
  echo ""
  echo "Resolve conflicts manually, then run:"
  echo "  git add <resolved-files>"
  echo "  git commit"
  echo ""
  echo "Hint: Template-owned paths (src/components/ui/, src/types/sparkle.ts)"
  echo "should generally keep the upstream version (theirs):"
  echo "  git checkout --theirs src/components/ui/<file>"
  echo "  git add src/components/ui/<file>"
  exit 1
fi
