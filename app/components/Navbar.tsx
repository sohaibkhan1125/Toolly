import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-1 group">
            <span className="text-2xl font-bold text-[#1d4ed8]">Toolly</span>
            <svg 
              viewBox="0 0 24 24" 
              className="w-6 h-6 text-green-500 fill-current"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </Link>

          {/* Nav Links */}
          <div className="flex gap-8">
            <Link 
              href="/" 
              className="text-slate-500 hover:text-[#1d4ed8] font-medium transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              className="text-slate-500 hover:text-[#1d4ed8] font-medium transition-colors"
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
