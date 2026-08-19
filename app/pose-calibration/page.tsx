import type { Metadata } from 'next';
import { WebPoseCalibration } from '../components/WebPoseCalibration';

export const metadata: Metadata = {
  title: 'Fitlet pose calibration',
  robots: { index: false, follow: false },
};

export default function PoseCalibrationPage() {
  return (
    <main className="pose-calibration-page">
      <WebPoseCalibration />
    </main>
  );
}
