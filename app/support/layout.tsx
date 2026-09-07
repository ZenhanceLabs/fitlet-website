import type { Metadata } from "next";

export const metadata: Metadata = { title: "お問い合わせ | Fitlet", description: "Fitletのよくある質問とお問い合わせ窓口。" };

export default function SupportLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
