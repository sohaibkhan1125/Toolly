import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="py-8 bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-slate-500 font-medium">
          <div className="flex gap-8 order-2 md:order-1">
            <Link href="/privacy" className="hover:text-[#1d4ed8] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-[#1d4ed8] transition-colors">
              Disclaimer
            </Link>
            <Link href="/terms" className="hover:text-[#1d4ed8] transition-colors">
              Terms & Conditions
            </Link>
            <Link href="/contact" className="hover:text-[#1d4ed8] transition-colors">
              Contact Us
            </Link>
          </div>
          <div className="order-1 md:order-2">
            © {new Date().getFullYear()} Toolly. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
