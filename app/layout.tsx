import type { Metadata, Viewport } from "next";
import "./globals.css";
import { LocaleProvider } from "./lib/locale";

const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
const isPagesBuild = process.env.FITLET_PAGES === "true";
const metadataBase = isPagesBuild
  ? new URL("https://zenhancelabs.github.io/fitlet-website/")
  : undefined;
const socialImage = "https://zenhancelabs.github.io/fitlet-website/brand/fitlet-og.png";
const iconPath = `${basePath}/brand/fitlet-ios-icon.png`;

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  ...(metadataBase ? { metadataBase } : {}),
  title: "Fitlet — ちょっと動くを、習慣に。",
  description: "Fitletは、マップを進み、カメラで回数を数え、仲間と競い、コーチと続けるトレーニングアプリです。",
  verification: {
    google: "N2DY2G4qL4D4uK_7VdP_nJcnOS4qBK3fyAeLiM6BCd0",
  },
  icons: {
    icon: [{ url: iconPath, type: "image/png" }],
    apple: [{ url: iconPath, type: "image/png" }],
  },
  openGraph: {
    title: "Fitlet — ちょっと動くを、習慣に。",
    description: "マップを進み、カメラで回数を数え、仲間と競い、コーチと続ける。",
    type: "website",
    images: [{ url: socialImage, width: 1200, height: 630, type: "image/png", alt: "Fitletロゴ" }],
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
      <body><LocaleProvider>{children}</LocaleProvider></body>
    </html>
  );
}
