"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer"
import { ChevronRight, RotateCcw, Calculator, Info, ArrowLeft, Heart, CreditCard, ShoppingBag, Car, PiggyBank, Smile } from "lucide-react";

type LifestyleLevel = "Basic" | "Comfortable" | "Premium";

interface CategoryData {
  name: string;
  percentage: number;
  icon: React.ReactNode;
  color: string;
}

const LIFESTYLE_PRESETS: Record<LifestyleLevel, CategoryData[]> = {
  Basic: [
    { name: "Rent", percentage: 30, icon: <CreditCard className="w-5 h-5" />, color: "blue" },
    { name: "Food", percentage: 15, icon: <ShoppingBag className="w-5 h-5" />, color: "emerald" },
    { name: "Transport", percentage: 10, icon: <Car className="w-5 h-5" />, color: "amber" },
    { name: "Savings", percentage: 20, icon: <PiggyBank className="w-5 h-5" />, color: "teal" },
    { name: "Other", percentage: 25, icon: <Heart className="w-5 h-5" />, color: "rose" },
  ],
  Comfortable: [
    { name: "Rent", percentage: 35, icon: <CreditCard className="w-5 h-5" />, color: "blue" },
    { name: "Food", percentage: 15, icon: <ShoppingBag className="w-5 h-5" />, color: "emerald" },
    { name: "Transport", percentage: 10, icon: <Car className="w-5 h-5" />, color: "amber" },
    { name: "Savings", percentage: 15, icon: <PiggyBank className="w-5 h-5" />, color: "teal" },
    { name: "Other", percentage: 25, icon: <Heart className="w-5 h-5" />, color: "rose" },
  ],
  Premium: [
    { name: "Rent", percentage: 40, icon: <CreditCard className="w-5 h-5" />, color: "blue" },
    { name: "Food", percentage: 15, icon: <ShoppingBag className="w-5 h-5" />, color: "emerald" },
    { name: "Transport", percentage: 10, icon: <Car className="w-5 h-5" />, color: "amber" },
    { name: "Savings", percentage: 10, icon: <PiggyBank className="w-5 h-5" />, color: "teal" },
    { name: "Other", percentage: 25, icon: <Heart className="w-5 h-5" />, color: "rose" },
  ],
};

const LIFESTYLE_MESSAGES: Record<LifestyleLevel, string> = {
  Basic: "Best for saving more and keeping costs lower.",
  Comfortable: "Balanced lifestyle with moderate spending.",
  Premium: "Higher rent and lifestyle spend with lower savings.",
};

export default function SalaryToLifestyleCalculator() {
  const [salary, setSalary] = useState<string>("");
  const [level, setLevel] = useState<LifestyleLevel>("Comfortable");
  const [result, setResult] = useState<{
    categories: { name: string; amount: number; percentage: number; color: string; icon: React.ReactNode }[];
    total: number;
    message: string;
  } | null>(null);
  const [error, setError] = useState<string>("");

  const calculate = () => {
    setError("");
    const amount = parseFloat(salary);

    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid monthly salary greater than 0.");
      return;
    }

    const presets = LIFESTYLE_PRESETS[level];
    const categoryResults = presets.map((p) => ({
      ...p,
      amount: amount * (p.percentage / 100),
    }));

    setResult({
      categories: categoryResults,
      total: amount,
      message: LIFESTYLE_MESSAGES[level],
    });
  };

  const reset = () => {
    setSalary("");
    setLevel("Comfortable");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="max-w-5xl mx-auto space-y-8">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Salary to Lifestyle Calculator
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Visualize how your monthly salary could be split for your ideal lifestyle.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Inputs Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-tight">Monthly Salary (AED)</label>
                  <input
                    type="number"
                    value={salary}
                    onChange={(e) => setSalary(e.target.value)}
                    className="w-full px-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold text-lg"
                    placeholder="15000"
                  />
                </div>
                <div>
                  <label className="block text-sm font-black text-slate-700 mb-2 uppercase tracking-tight">Lifestyle Level</label>
                  <div className="grid grid-cols-1 gap-2">
                    {(Object.keys(LIFESTYLE_PRESETS) as LifestyleLevel[]).map((l) => (
                      <button
                        key={l}
                        onClick={() => setLevel(l)}
                        className={`px-4 py-3 rounded-xl border font-bold transition-all text-sm flex items-center justify-between ${
                          level === l 
                          ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                          : "bg-white text-slate-500 border-slate-100 hover:border-slate-200"
                        }`}
                      >
                        {l}
                        {level === l && <Smile className="w-4 h-4" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-bold flex items-center gap-2">
                  <Info className="w-4 h-4 shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex gap-4">
                <button
                  onClick={calculate}
                  className="flex-grow py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide"
                >
                  <Calculator className="w-5 h-5" />
                  Calculate
                </button>
                <button
                  onClick={reset}
                  className="px-6 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-200 active:scale-95 transition-all flex items-center justify-center"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-2 space-y-6">
              {result ? (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-8">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Budget Breakdown</h2>
                      <span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-xs font-black uppercase tracking-widest">
                        {level} Level
                      </span>
                    </div>
                    
                    {/* Visual Progress Bar */}
                    <div className="h-6 w-full bg-slate-100 rounded-full overflow-hidden flex shadow-inner">
                      {result.categories.map((c, i) => (
                        <div 
                          key={i}
                          style={{ width: `${c.percentage}%` }}
                          className={`h-full bg-${c.color}-500 transition-all duration-700 ease-out border-r border-white/20 last:border-0`}
                          title={`${c.name}: ${c.percentage}%`}
                        />
                      ))}
                    </div>

                    <p className="text-sm text-slate-500 font-bold italic text-center pt-2">
                      "{result.message}"
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {result.categories.map((c, i) => (
                      <div key={i} className="p-5 bg-slate-50/50 border border-slate-50 rounded-2xl flex items-center gap-4 hover:shadow-md transition-shadow">
                        <div className={`p-3 bg-${c.color}-100 text-${c.color}-600 rounded-xl`}>
                          {c.icon}
                        </div>
                        <div className="flex-grow">
                          <p className="text-xs font-black text-slate-400 uppercase tracking-widest">{c.name}</p>
                          <p className="text-xl font-black text-slate-900">AED {c.amount.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-black text-slate-800">{c.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="bg-white/50 border-2 border-dashed border-slate-200 rounded-3xl h-full flex flex-col items-center justify-center p-12 text-center space-y-4 opacity-70">
                  <div className="p-6 bg-slate-100 rounded-full">
                    <PiggyBank className="w-12 h-12 text-slate-400" />
                  </div>
                  <div className="space-y-1 max-w-sm">
                    <p className="text-2xl font-black text-slate-700 tracking-tight uppercase">Analyze your salary</p>
                    <p className="text-sm text-slate-400 font-bold leading-relaxed">Enter your monthly income and select a lifestyle level to see your budget roadmap.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FAQ Section */}
          <section className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 space-y-8">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Info className="w-6 h-6 text-blue-500" />
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">How should I divide my salary each month?</h3>
                <p className="text-slate-500 leading-relaxed font-bold text-sm">
                   A common rule is the 50/30/20 rule: 50% for needs, 30% for wants, and 20% for savings. Our calculator helps you fine-tune this based on your preferred lifestyle tiers.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">What is a good savings target?</h3>
                <p className="text-slate-500 leading-relaxed font-bold text-sm">
                  Aiming for at least 15-20% is ideal. If you're on a "Basic" tier, prioritizing 20% savings helps build an emergency fund and future wealth much faster.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">How much should go to rent and food?</h3>
                <p className="text-slate-500 leading-relaxed font-bold text-sm">
                  Rent should ideally stay under 30-35%. Food typically accounts for 10-15% of a healthy budget. If rent is higher, you'll need to cut from other categories.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
