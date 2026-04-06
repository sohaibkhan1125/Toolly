import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Bill Split Calculator UAE (Free & Easy with Tip)",
  description:
    "Split bills instantly with our free bill split calculator. Add tip and tax, divide expenses fairly, and get results in seconds. No sign-up required.",
};

export default function BillSplitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
