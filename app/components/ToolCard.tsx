import React from 'react';
import Link from 'next/link';

interface ToolCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  secondaryIcon?: React.ReactNode;
  color?: string;
  href?: string;
}

export default function ToolCard({ title, description, icon, secondaryIcon, color = "blue", href }: ToolCardProps) {
  const CardContent = (
    <div className="group relative bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between cursor-pointer overflow-hidden">
      <div className="flex items-center gap-4 z-10 text-left">
        <div className={`p-3 bg-${color}-50 rounded-xl group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <div className="space-y-1">
          <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#1d4ed8] transition-colors line-clamp-1">
            {title}
          </h3>
          <p className="text-sm text-slate-500 font-medium line-clamp-1">
            {description}
          </p>
        </div>
      </div>
      
      {secondaryIcon && (
        <div className="relative z-10 opacity-80 group-hover:opacity-100 transition-opacity duration-300 w-24 flex justify-end">
          {secondaryIcon}
        </div>
      )}
    </div>
  );

  if (href) {
    return <Link href={href}>{CardContent}</Link>;
  }

  return CardContent;
}
