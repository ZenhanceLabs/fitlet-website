import type { Metadata } from "next";
import { PrivacyPolicyPage } from "../components/LegalContent";

export const metadata: Metadata = { title: "プライバシーポリシー | Fitlet", description: "Fitletのプライバシーポリシー。" };

export default function PrivacyPage() {
  return <PrivacyPolicyPage />;
}
