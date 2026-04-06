import { Zap, Lock, HeadphonesIcon } from "lucide-react";

export default function BenefitsBar() {
  return (
    <div className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-4xl mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 text-slate-900 font-semibold text-lg">
          <div className="flex items-center gap-3">
            <Zap className="text-orange-500 w-6 h-6 fill-current" />
            <span>Instant Results</span>
          </div>
          <div className="flex items-center gap-3">
            <Lock className="text-blue-500 w-6 h-6 fill-current" />
            <span>No Sign-Up Required</span>
          </div>
          <div className="flex items-center gap-3">
            <Zap className="text-green-500 w-6 h-6 fill-current" />
            <span>100% Free Tools</span>
          </div>
        </div>
      </div>
    </div>
  );
}
