import type { Metadata, Viewport } from "next";
import "./globals.css";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isPagesBuild = process.env.FITLET_PAGES === "true";
const metadataBase = isPagesBuild
  ? new URL("https://zenhancelabs.github.io/fitlet-website/")
  : undefined;
const socialImage = isPagesBuild
  ? "https://zenhancelabs.github.io/fitlet-website/brand/fitlet-logo.svg"
  : "/brand/fitlet-logo.svg";
const iconPath = `${basePath}/brand/fitlet-ios-icon.png`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title: "Fitlet — ちょっと動くを、習慣に。",
  description: "Fitletは、マップを進み、カメラで回数を数え、仲間と競い、コーチと続けるトレーニングアプリです。",
  icons: {
    icon: [{ url: iconPath, type: "image/png" }],
    apple: [{ url: iconPath, type: "image/png" }],
  },
  openGraph: {
    title: "Fitlet — ちょっと動くを、習慣に。",
    description: "マップを進み、カメラで回数を数え、仲間と競い、コーチと続ける。",
    type: "website",
    images: [{ url: socialImage, alt: "Fitletロゴ" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Fitlet — ちょっと動くを、習慣に。",
    description: "マップを進み、カメラで回数を数え、仲間と競い、コーチと続ける。",
    images: [socialImage],
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
