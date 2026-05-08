#!/usr/bin/env bash
# 將 index.html 的 footer 區段(@sync-footer-start ~ @sync-footer-end)
# 同步到 slots.html / casino.html / login.html。
#
# 用法:
#   bash tools/sync-footer.sh           # 真同步
#   bash tools/sync-footer.sh --check   # 只檢查是否已同步,不寫入(CI 用)
#
# 設計原則:
# - 純 bash + awk,無 npm 依賴(對齊 mobile/CLAUDE.md 行 13-15)
# - 目標檔需自備兩行標記:@sync-footer-start / @sync-footer-end
# - 標記之間的內容會被 index.html 的對應段完全替換
set -euo pipefail

cd "$(dirname "$0")/.."

SOURCE="index.html"
# login.html 不放完整 footer(對齊 baji.live SPA 行為,login 是專注表單頁,
# 僅在 Stage 6 把 Terms 連結改連 terms.html)
TARGETS=(slots.html casino.html sports.html crash.html table.html fishing.html arcade.html lottery.html)
START_MARK="@sync-footer-start"
END_MARK="@sync-footer-end"
MODE="${1:-write}"

# 從 index.html 抽出標記之間的區段(含兩個標記行)
extract_block() {
  awk -v s="$START_MARK" -v e="$END_MARK" '
    $0 ~ s { in_block = 1 }
    in_block { print }
    $0 ~ e { in_block = 0 }
  ' "$1"
}

# 用替換區段重寫目標檔
replace_block() {
  local target="$1" block_file="$2"
  awk -v s="$START_MARK" -v e="$END_MARK" -v bf="$block_file" '
    $0 ~ s {
      while ((getline line < bf) > 0) print line
      close(bf)
      skip = 1
      next
    }
    skip && $0 ~ e { skip = 0; next }
    !skip { print }
  ' "$target"
}

block_tmp="$(mktemp)"
trap 'rm -f "$block_tmp"' EXIT
extract_block "$SOURCE" > "$block_tmp"

if [[ ! -s "$block_tmp" ]]; then
  echo "ERROR: 在 $SOURCE 找不到 $START_MARK / $END_MARK 標記" >&2
  exit 2
fi

src_lines=$(wc -l < "$block_tmp" | tr -d ' ')
echo "[sync-footer] 來源 $SOURCE 內 footer 區段:$src_lines 行"

ok=1
for tgt in "${TARGETS[@]}"; do
  if [[ ! -f "$tgt" ]]; then
    echo "[sync-footer] SKIP $tgt(不存在)"
    continue
  fi
  if ! grep -q "$START_MARK" "$tgt" || ! grep -q "$END_MARK" "$tgt"; then
    echo "[sync-footer] WARN $tgt 缺少標記,需先手動加上 <!-- $START_MARK --> 與 <!-- $END_MARK -->"
    ok=0
    continue
  fi

  new_tmp="$(mktemp)"
  replace_block "$tgt" "$block_tmp" > "$new_tmp"

  if [[ "$MODE" == "--check" ]]; then
    if diff -q "$tgt" "$new_tmp" > /dev/null; then
      echo "[sync-footer] OK   $tgt 已同步"
    else
      echo "[sync-footer] DIFF $tgt 與 $SOURCE 不同步,執行 bash tools/sync-footer.sh 修正"
      ok=0
    fi
    rm -f "$new_tmp"
  else
    if diff -q "$tgt" "$new_tmp" > /dev/null; then
      echo "[sync-footer] OK   $tgt 已是最新"
      rm -f "$new_tmp"
    else
      mv "$new_tmp" "$tgt"
      echo "[sync-footer] WROTE $tgt"
    fi
  fi
done

if [[ "$MODE" == "--check" && $ok -eq 0 ]]; then
  exit 1
fi
