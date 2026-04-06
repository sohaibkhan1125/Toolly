import ToolCard from "./ToolCard";

// Custom SVG Icons to match the image style
const Icons = {
  BillSplit: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="40" height="40" rx="8" fill="#1D63ED" />
      <path d="M12 12H28V28H12V12Z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
      <path d="M16 16H24" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <rect x="16" y="20" width="2" height="2" fill="white" />
      <rect x="22" y="20" width="2" height="2" fill="white" />
      <rect x="16" y="24" width="2" height="2" fill="white" />
      <rect x="22" y="24" width="2" height="2" fill="white" />
    </svg>
  ),
  Rent: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M20 8L32 18V32H8V18L20 8Z" fill="#10B981" />
      <rect x="16" y="22" width="8" height="10" fill="white" />
    </svg>
  ),
  Salary: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="8" y="12" width="24" height="18" rx="2" fill="#0EA5E9" />
      <path d="M16 12V10C16 8.89543 16.8954 8 18 8H22C23.1046 8 24 8.89543 24 10V12" stroke="white" strokeWidth="2" />
      <path d="M20 21C21.6569 21 23 19.6569 23 18C23 16.3431 21.6569 15 20 15C18.3431 15 17 16.3431 17 18C17 19.6569 18.3431 21 20 21Z" stroke="white" strokeWidth="2" />
      <path d="M20 18V21" stroke="white" strokeWidth="2" />
    </svg>
  ),
  Invoice: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="20" height="24" rx="2" fill="#94A3B8" />
      <path d="M14 14H26" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 18H26" stroke="white" strokeWidth="2" strokeLinecap="round" />
      <path d="M14 22H20" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  ),
  Savings: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M34 20C34 27.732 27.732 34 20 34C12.268 34 6 27.732 6 20C6 12.268 12.268 6 20 6C27.732 6 34 12.268 34 20Z" fill="#14B8A6" />
      <path d="M20 12V28" stroke="white" strokeWidth="3" strokeLinecap="round" />
      <path d="M25 15L20 12L15 15" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  WhatsApp: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="16" fill="#22C55E" />
      <path d="M14 16H26M14 21H26M14 26H20" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  ),
  Notes: () => (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="8" width="20" height="24" rx="2" fill="#4F46E5" />
      <path d="M14 14H24M14 19H24M14 24H19" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
};

// Illustrations (Right-side items)
const Illustrations = {
  Sheet: () => (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="10" width="30" height="40" rx="3" fill="#E2E8F0" stroke="#CBD5E1" strokeWidth="1" />
      <rect x="15" y="18" width="20" height="2" fill="#94A3B8" />
      <rect x="15" y="24" width="20" height="2" fill="#94A3B8" />
      <rect x="15" y="30" width="12" height="2" fill="#94A3B8" />
      <circle cx="45" cy="45" r="8" fill="#F59E0B" />
      <path d="M42 45L44 47L48 43" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  HouseDetail: () => (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="10" width="35" height="30" rx="2" fill="#F1F5F9" stroke="#E2E8F0" />
      <rect x="20" y="15" width="25" height="4" rx="1" fill="#CBD5E1" />
      <rect x="20" y="22" width="15" height="4" rx="1" fill="#CBD5E1" />
      <rect x="40" y="35" width="15" height="15" rx="2" fill="#1D63ED" />
      <rect x="45" y="42" width="5" height="2" fill="white" />
    </svg>
  ),
  Folder: () => (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 15C10 12.7909 11.7909 11 14 11H25L30 16H46C48.2091 16 50 17.7909 50 20V45C50 47.2091 48.2091 49 46 49H14C11.7909 49 10 47.2091 10 45V15Z" fill="#1E293B" />
      <rect x="38" y="32" width="15" height="12" rx="2" fill="#1D63ED" />
      <circle cx="45" cy="38" r="2" fill="white" />
    </svg>
  ),
  Checklist: () => (
    <svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="15" y="10" width="30" height="40" rx="2" fill="white" stroke="#E2E8F0" />
      <rect x="20" y="18" width="20" height="2" fill="#E2E8F0" />
      <rect x="20" y="24" width="20" height="2" fill="#E2E8F0" />
      <rect x="20" y="30" width="20" height="2" fill="#E2E8F0" />
      <circle cx="45" cy="45" r="8" fill="#10B981" />
      <path d="M42 45L44 47L48 43" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
};

export const tools = [
  {
    title: "Bill Split Calculator",
    description: "Divide expenses easily",
    keywords: ["bill", "split", "expenses", "divide", "share", "group"],
    icon: <Icons.BillSplit />,
    secondaryIcon: <Illustrations.Sheet />,
    color: "blue",
    href: "/bill-split-calculator"
  },
  {
    title: "Rent Calculator",
    description: "Find what you can afford",
    keywords: ["rent", "house", "afford", "apartment", "home", "property", "housing"],
    icon: <Icons.Rent />,
    secondaryIcon: <Illustrations.HouseDetail />,
    color: "green",
    href: "/rent-affordability-calculator"
  },
  {
    title: "Salary Calculator",
    description: "See your lifestyle breakdown",
    keywords: ["salary", "income", "lifestyle", "wage", "pay", "earnings", "budget"],
    icon: <Icons.Salary />,
    secondaryIcon: <Illustrations.Folder />,
    color: "sky",
    href: "/salary-to-lifestyle-calculator"
  },
  {
    title: "Invoice Generator",
    description: "Create invoices instantly",
    keywords: ["invoice", "bill", "receipt", "payment", "freelance", "pdf", "generate"],
    icon: <Icons.Invoice />,
    secondaryIcon: <Illustrations.Sheet />,
    color: "slate",
    href: "/invoice-generator"
  },
  {
    title: "Savings Planner",
    description: "Plan your savings goals",
    keywords: ["savings", "save", "goal", "plan", "invest", "finance", "money", "interest"],
    icon: <Icons.Savings />,
    secondaryIcon: <Illustrations.Checklist />,
    href: "/saving-planner"
  },
  {
    title: "WhatsApp Formatter",
    description: "Format your messages",
    keywords: ["whatsapp", "format", "message", "chat", "bold", "text", "bullet"],
    icon: <Icons.WhatsApp />,
    secondaryIcon: <Illustrations.Folder />,
    href: "/whatsapp-message-formatter"
  }
];

interface ToolGridProps {
  searchQuery?: string;
}

export default function ToolGrid({ searchQuery = "" }: ToolGridProps) {
  const filtered = searchQuery.trim()
    ? tools.filter((tool) => {
        const q = searchQuery.toLowerCase();
        return (
          tool.title.toLowerCase().includes(q) ||
          tool.description.toLowerCase().includes(q) ||
          tool.keywords.some((k) => k.includes(q))
        );
      })
    : tools;

  return (
    <section className="bg-slate-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((tool, index) => (
              <ToolCard
                key={index}
                title={tool.title}
                description={tool.description}
                icon={tool.icon}
                secondaryIcon={tool.secondaryIcon}
                color={tool.color}
                href={tool.href}
              />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center space-y-4">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-black text-slate-700">No tools found</h3>
            <p className="text-slate-400 font-medium text-sm max-w-xs">
              Try a different keyword like "rent", "invoice", or "split bill".
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
