import type { Metadata } from "next";
import { LegalHubPage } from "../components/LegalContent";

export const metadata: Metadata = { title: "プライバシー・利用規約 | Fitlet", description: "Fitletのプライバシーポリシーと利用規約。" };

export default function LegalPageRoute() {
  return <LegalHubPage />;
}
