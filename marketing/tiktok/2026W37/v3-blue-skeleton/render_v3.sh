#!/bin/zsh
set -euo pipefail

ROOT="/Users/berry/Dev/Fitlet"
OUT="$ROOT/marketing/tiktok/2026W37/v3-blue-skeleton"
mkdir -p /private/tmp/fitlet-clang-cache /private/tmp/fitlet-swift-cache

CLANG_MODULE_CACHE_PATH=/private/tmp/fitlet-clang-cache \
SWIFT_MODULECACHE_PATH=/private/tmp/fitlet-swift-cache \
swift "$OUT/render_frames.swift"

cat > "$OUT/frames.txt" <<EOF
file '$OUT/frames/frame-00-skeleton-close.png'
duration 0.25
file '$OUT/frames/frame-01-skeleton-follow.png'
duration 0.55
file '$OUT/frames/frame-02-skeleton-wide.png'
duration 0.70
file '$OUT/frames/frame-03-skeleton-repeat.png'
duration 3.20
file '$OUT/frames/frame-04-silence.png'
duration 0.30
file '$OUT/frames/frame-05-workout-reveal.png'
duration 1.40
file '$OUT/frames/frame-06-league-reveal.png'
duration 0.90
file '$OUT/frames/frame-07-home-reveal.png'
duration 1.20
file '$OUT/frames/frame-08-loop-out.png'
duration 1.00
file '$OUT/frames/frame-00-skeleton-close.png'
duration 0.50
file '$OUT/frames/frame-00-skeleton-close.png'
EOF

ffmpeg -y -f concat -safe 0 -i "$OUT/frames.txt" -vf "fps=30,format=yuv420p" -an -t 10 "$OUT/video-only.mp4"

ffmpeg -y -i "$OUT/video-only.mp4" \
  -i "$ROOT/assets/m4a/beep-digital-short-gfx-sounds-smartphone-text-question-prompt-3-1-0m00s.mp3" \
  -i "$ROOT/assets/m4a/rank_up.m4a" \
  -filter_complex "
    anullsrc=channel_layout=stereo:sample_rate=44100:d=10[silence];
    [1:a]adelay=400|400,volume=0.30[beep];
    [2:a]adelay=5200|5200,volume=0.20[rank];
    [silence][beep][rank]amix=inputs=3:duration=first:dropout_transition=0[a]
  " \
  -map 0:v -map "[a]" -r 30 -t 10 \
  -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
  -c:a aac -b:a 128k -movflags +faststart \
  "$OUT/fitlet-v3-blue-skeleton.mp4"

ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -show_entries format=duration -of default=noprint_wrappers=1 "$OUT/fitlet-v3-blue-skeleton.mp4"
