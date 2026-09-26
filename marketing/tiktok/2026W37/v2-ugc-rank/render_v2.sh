#!/bin/zsh
set -euo pipefail

ROOT="/Users/berry/Dev/Fitlet"
OUT="$ROOT/marketing/tiktok/2026W37/v2-ugc-rank"
FONT="/System/Library/Fonts/ヒラギノ角ゴシック W7.ttc"

swift "$OUT/render_frames.swift"

cat > "$OUT/frames.txt" <<EOF
file '$OUT/frames/frame-00-hook.png'
duration 1.5
file '$OUT/frames/frame-01-nine.png'
duration 0.7
file '$OUT/frames/frame-02-workout-glimpse.png'
duration 1.0
file '$OUT/frames/frame-03-what.png'
duration 1.8
file '$OUT/frames/frame-04-workout-proof.png'
duration 1.0
file '$OUT/frames/frame-05-league-proof.png'
duration 0.8
file '$OUT/frames/frame-06-home-proof.png'
duration 1.2
file '$OUT/frames/frame-07-loop.png'
duration 1.2
file '$OUT/frames/frame-07-loop.png'
EOF

ffmpeg -y -f concat -safe 0 -i "$OUT/frames.txt" -vf "fps=30,format=yuv420p" -an -t 9.2 "$OUT/video-only.mp4"

ffmpeg -y -i "$OUT/video-only.mp4" \
  -i "$ROOT/assets/m4a/rank_up.m4a" \
  -i "$ROOT/assets/m4a/beep-digital-short-gfx-sounds-smartphone-text-question-prompt-3-1-0m00s.mp3" \
  -filter_complex "
    anullsrc=channel_layout=stereo:sample_rate=44100:d=9.2[silence];
    [2:a]adelay=650|650,volume=0.34[beep];
    [1:a]adelay=6000|6000,volume=0.22[rank];
    [silence][beep][rank]amix=inputs=3:duration=first:dropout_transition=0[a]
  " \
  -map 0:v -map "[a]" -r 30 -t 9.2 \
  -c:v libx264 -preset medium -crf 18 -pix_fmt yuv420p \
  -c:a aac -b:a 128k -movflags +faststart \
  "$OUT/fitlet-v2-ugc-rank.mp4"

ffprobe -v error -select_streams v:0 -show_entries stream=width,height,r_frame_rate -show_entries format=duration -of default=noprint_wrappers=1 "$OUT/fitlet-v2-ugc-rank.mp4"
