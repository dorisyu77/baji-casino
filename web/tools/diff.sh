#!/usr/bin/env bash
# 用法：diff.sh <ref.png> <mine.png> [out_diff.png] [mask_y_ranges]
# mask_y_ranges 例：「150-744」表示物理 y=150~744 區段塗黑（避開時序動畫）
# 多段用逗號：「150-744,2286-2436」（hero+marquee + bottom-bar）
# 輸出：AE 像素差、總像素、diff% 到 stdout

set -euo pipefail

REF="${1:?用法：$0 <ref> <mine> [out_diff.png] [mask_y_ranges]}"
MINE="${2:?用法：$0 <ref> <mine> [out_diff.png] [mask_y_ranges]}"
OUT="${3:-/tmp/_diff.png}"
MASK="${4:-}"

# 先取尺寸（兩張須一致）
REF_DIM=$(identify -format "%w %h" "$REF")
MINE_DIM=$(identify -format "%w %h" "$MINE")
W=${REF_DIM%% *}
H=${REF_DIM##* }

if [[ "$REF_DIM" != "$MINE_DIM" ]]; then
  echo "[尺寸不符] ref=$REF_DIM mine=$MINE_DIM" >&2
  exit 2
fi

REF_WORK="$REF"
MINE_WORK="$MINE"

if [[ -n "$MASK" ]]; then
  REF_WORK=/tmp/_diff_ref_masked.png
  MINE_WORK=/tmp/_diff_mine_masked.png
  DRAW_ARGS=()
  IFS=',' read -ra RANGES <<< "$MASK"
  for r in "${RANGES[@]}"; do
    Y0=${r%%-*}
    Y1=${r##*-}
    DRAW_ARGS+=(-draw "rectangle 0,$Y0 $W,$Y1")
  done
  magick "$REF" -fill black "${DRAW_ARGS[@]}" "$REF_WORK"
  magick "$MINE" -fill black "${DRAW_ARGS[@]}" "$MINE_WORK"
fi

AE=$(compare -metric AE -fuzz 5% "$REF_WORK" "$MINE_WORK" "$OUT" 2>&1 || true)
TOTAL=$((W * H))
PCT=$(awk -v a="$AE" -v t="$TOTAL" 'BEGIN{ if(t==0){print 0}else{printf "%.3f", (a/t)*100} }')
echo "ref=$REF mine=$MINE"
echo "size=${W}x${H}  total=$TOTAL  AE=$AE  diff=${PCT}%"
echo "diff_image=$OUT"
[[ -n "$MASK" ]] && echo "mask=$MASK"
