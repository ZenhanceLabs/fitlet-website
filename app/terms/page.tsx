import type { Metadata } from "next";
import { TermsPage as TermsContentPage } from "../components/LegalContent";

export const metadata: Metadata = { title: "利用規約 | Fitlet", description: "Fitletの利用規約。" };

export default function TermsPage() {
  return <TermsContentPage />;
}
