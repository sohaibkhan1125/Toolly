import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Invoice Generator UAE – Create & Download PDF Instantly",
  description:
    "Create professional invoices in seconds with our free invoice generator. Download clean PDF invoices instantly with no sign-up required.",
};

export default function InvoiceGeneratorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
