import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "WhatsApp Message Formatter – Bold, Bullets & Clean Text Tool",
  description:
    "Format your WhatsApp messages easily with bold text, bullet points, and spacing. Copy and send clean, professional messages instantly.",
};

export default function WhatsAppFormatterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
