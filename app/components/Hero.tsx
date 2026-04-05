import { Search } from 'lucide-react';

export default function Hero() {
  return (
    <section className="py-20 px-4 bg-white">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <div className="space-y-4">
          <h1 className="text-5xl font-extrabold tracking-tight text-slate-800 sm:text-6xl">
            Simple tools. Smarter decisions.
          </h1>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
            Fast, free tools to help you manage money, life, and work — instantly.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto flex items-center gap-0">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <svg 
                className="h-5 w-5 text-slate-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              className="block w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-l-2xl focus:ring-2 focus:ring-blue-100 focus:border-[#1d4ed8] text-slate-900 placeholder-slate-400 transition-all outline-none"
              placeholder="Search tools (e.g. rent calculator, split bill...)"
            />
          </div>
          <button className="h-[58px] px-6 bg-[#1D63ED] text-white rounded-r-2xl hover:bg-blue-700 transition-all shadow-sm active:scale-95 flex items-center justify-center">
            <svg 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
