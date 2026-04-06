import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rent Affordability Calculator UAE – How Much Rent Can I Afford?",
  description:
    "Find out how much rent you can afford based on your salary. Use this free UAE rent calculator to plan your budget and avoid overspending.",
};

export default function RentAffordabilityLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
