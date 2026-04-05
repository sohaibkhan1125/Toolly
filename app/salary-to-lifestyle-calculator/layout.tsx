import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Salary Breakdown Calculator UAE – Monthly Budget Planner",
  description:
    "See how your salary is divided across rent, food, transport, and savings. Use this free calculator to plan your lifestyle and budget smarter.",
};

export default function SalaryToLifestyleLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
