'use client';

import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { publicAsset } from '../lib/publicAsset';

const LANDMARKS = [
  ['nose', 0],
  ['left_shoulder', 11],
  ['right_shoulder', 12],
  ['left_elbow', 13],
  ['right_elbow', 14],
  ['left_wrist', 15],
  ['right_wrist', 16],
  ['left_hip', 23],
  ['right_hip', 24],
  ['left_knee', 25],
  ['right_knee', 26],
  ['left_ankle', 27],
  ['right_ankle', 28],
] as const;

type PosePoint = { x: number; y: number; z: number; likelihood: number };
type PoseLandmarks = Record<string, PosePoint>;

const MODEL_PATH = publicAsset('/models/pose_landmarker_lite.task');
const WASM_PATH = 'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@1.0.1/wasm';

function clamp(value: number) {
  return Math.min(Math.max(value, 0), 1);
}

function toFitletLandmarks(points: Array<{ x: number; y: number; z: number; visibility?: number; presence?: number }>): PoseLandmarks {
  return Object.fromEntries(
    LANDMARKS.flatMap(([name, index]) => {
      const point = points[index];
      if (!point) return [];
      return [[name, {
        x: clamp(point.x),
        y: clamp(point.y),
        z: point.z,
        likelihood: clamp(point.visibility ?? point.presence ?? 0),
      }]];
    }),
  );
}

export function WebPoseCalibration() {
  const landmarkerRef = useRef<{ detect: (image: HTMLImageElement) => { landmarks?: Array<Array<{ x: number; y: number; z: number; visibility?: number; presence?: number }>> }; close?: () => void } | null>(null);
  const [status, setStatus] = useState('モデルを読み込んでいます…');
  const [statusCode, setStatusCode] = useState('loading');
  const [result, setResult] = useState<PoseLandmarks | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    void import('@mediapipe/tasks-vision').then(async ({ FilesetResolver, PoseLandmarker }) => {
      const vision = await FilesetResolver.forVisionTasks(WASM_PATH);
      const landmarker = await PoseLandmarker.createFromOptions(vision, {
        baseOptions: { modelAssetPath: MODEL_PATH },
        runningMode: 'IMAGE',
        numPoses: 1,
        minPoseDetectionConfidence: 0.35,
        minPosePresenceConfidence: 0.35,
      });
      if (!active) {
        landmarker.close();
        return;
      }
      landmarkerRef.current = landmarker;
      setStatus('画像を選択すると、Web上で骨格を抽出します。');
      setStatusCode('ready');
    }).catch((error: unknown) => {
      if (!active) return;
      setStatus(`MediaPipeの初期化に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
      setStatusCode('error');
    });

    return () => {
      active = false;
      landmarkerRef.current?.close?.();
      landmarkerRef.current = null;
    };
  }, []);

  const handleFile = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || !landmarkerRef.current) return;
    setStatus('画像を解析しています…');
    setStatusCode('running');
    setResult(null);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);

    try {
      const image = new Image();
      image.src = objectUrl;
      await image.decode();
      const detection = landmarkerRef.current.detect(image);
      const landmarks = toFitletLandmarks(detection.landmarks?.[0] ?? []);
      if (!landmarks.left_shoulder || !landmarks.right_shoulder) {
        throw new Error('人物の骨格を検出できませんでした。全身が見える画像を使ってください。');
      }
      setResult(landmarks);
      setStatus('解析完了。JSONはそのままパイプラインへ保存できます。');
      setStatusCode('complete');
    } catch (error: unknown) {
      setStatus(`解析に失敗しました: ${error instanceof Error ? error.message : String(error)}`);
      setStatusCode('error');
    }
  };

  const json = result ? JSON.stringify(result, null, 2) : '';

  return (
    <section className="pose-calibration-panel">
      <div className="pose-calibration-copy">
        <span className="eyebrow">姿勢データの確認</span>
        <h1>画像から骨格JSONを作る。</h1>
        <p>iPhoneやシミュレーターを通さず、同じ素材画像にWebの姿勢推定を実行します。生成した座標は本体のSkeletonOverlayへ渡せます。</p>
        <label className="pose-calibration-file">
          <span>画像を選択</span>
          <input type="file" accept="image/*" onChange={handleFile} />
        </label>
        <p className="pose-calibration-status" data-pose-status data-status={statusCode}>{status}</p>
      </div>
      <div className="pose-calibration-result">
        {previewUrl ? <img src={previewUrl} alt="解析対象" /> : <div className="pose-calibration-empty">画像プレビュー</div>}
        {json ? <pre data-pose-json>{json}</pre> : null}
      </div>
    </section>
  );
}
