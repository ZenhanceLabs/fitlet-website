#!/bin/zsh
set -euo pipefail

ROOT="/Users/berry/Dev/Fitlet"
BASE="$ROOT/marketing/tiktok/2026W37"
mkdir -p /private/tmp/fitlet-clang-cache /private/tmp/fitlet-swift-cache

CLANG_MODULE_CACHE_PATH=/private/tmp/fitlet-clang-cache \
SWIFT_MODULECACHE_PATH=/private/tmp/fitlet-swift-cache \
swift "$BASE/render_v4_prototypes.swift" b

CLANG_MODULE_CACHE_PATH=/private/tmp/fitlet-clang-cache \
SWIFT_MODULECACHE_PATH=/private/tmp/fitlet-swift-cache \
swift "$BASE/render_v4_prototypes.swift" c

cat > "$BASE/v4-b-notify/frames.txt" <<EOF
file '$BASE/v4-b-notify/frames/frame-00-door.png'
duration 0.65
file '$BASE/v4-b-notify/frames/frame-01-close.png'
duration 0.75
file '$BASE/v4-b-notify/frames/frame-02-yes.png'
duration 1.80
file '$BASE/v4-b-notify/frames/frame-03-workout.png'
duration 1.00
file '$BASE/v4-b-notify/frames/frame-04-club.png'
duration 1.30
file '$BASE/v4-b-notify/frames/frame-05-tomorrow.png'
duration 2.00
file '$BASE/v4-b-notify/frames/frame-06-slam.png'
duration 1.30
file '$BASE/v4-b-notify/frames/frame-07-loop.png'
duration 1.20
file '$BASE/v4-b-notify/frames/frame-00-door.png'
EOF

cat > "$BASE/v4-c-rank/frames.txt" <<EOF
file '$BASE/v4-c-rank/frames/frame-00-platform.png'
duration 0.70
file '$BASE/v4-c-rank/frames/frame-01-why.png'
duration 1.00
file '$BASE/v4-c-rank/frames/frame-02-departing.png'
duration 1.30
file '$BASE/v4-c-rank/frames/frame-03-workout.png'
duration 1.00
file '$BASE/v4-c-rank/frames/frame-04-alone.png'
duration 1.30
file '$BASE/v4-c-rank/frames/frame-05-satisfied.png'
duration 0.80
file '$BASE/v4-c-rank/frames/frame-06-league.png'
duration 1.80
file '$BASE/v4-c-rank/frames/frame-07-last-train.png'
duration 1.10
file '$BASE/v4-c-rank/frames/frame-08-loop.png'
duration 1.00
file '$BASE/v4-c-rank/frames/frame-00-platform.png'
EOF

ffmpeg -y -f concat -safe 0 -i "$BASE/v4-b-notify/frames.txt" -vf "fps=30,format=yuv420p" -an -t 10 "$BASE/v4-b-notify/video-only.mp4"
ffmpeg -y -f concat -safe 0 -i "$BASE/v4-c-rank/frames.txt" -vf "fps=30,format=yuv420p" -an -t 10 "$BASE/v4-c-rank/video-only.mp4"

ffmpeg -y -i "$BASE/v4-b-notify/video-only.mp4" \
  -i "$ROOT/assets/m4a/beep-digital-short-gfx-sounds-smartphone-text-question-prompt-3-1-0m00s.mp3" \
  -i "$ROOT/assets/m4a/rank_up.m4a" \
  -filter_complex "anullsrc=channel_layout=stereo:sample_rate=44100:d=10[s];[1:a]adelay=150|150,volume=0.25[b];[2:a]adelay=3200|3200,volume=0.18[r];[s][b][r]amix=inputs=3:duration=first:dropout_transition=0[a]" \
  -map 0:v -map "[a]" -r 30 -t 10 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart \
  "$BASE/v4-b-notify/fitlet-v4-b-notify.mp4"

ffmpeg -y -i "$BASE/v4-c-rank/video-only.mp4" \
  -i "$ROOT/assets/m4a/beep-digital-short-gfx-sounds-smartphone-text-question-prompt-3-1-0m00s.mp3" \
  -i "$ROOT/assets/m4a/rank_up.m4a" \
  -filter_complex "anullsrc=channel_layout=stereo:sample_rate=44100:d=10[s];[1:a]adelay=0|0,volume=0.18[b];[2:a]adelay=6100|6100,volume=0.24[r];[s][b][r]amix=inputs=3:duration=first:dropout_transition=0[a]" \
  -map 0:v -map "[a]" -r 30 -t 10 -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p -c:a aac -b:a 128k -movflags +faststart \
  "$BASE/v4-c-rank/fitlet-v4-c-rank.mp4"

ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -show_entries format=duration -of default=noprint_wrappers=1 "$BASE/v4-b-notify/fitlet-v4-b-notify.mp4"
ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -show_entries format=duration -of default=noprint_wrappers=1 "$BASE/v4-c-rank/fitlet-v4-c-rank.mp4"
