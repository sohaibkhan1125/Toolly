"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  ChevronRight, 
  RotateCcw, 
  Calculator, 
  Info, 
  ArrowLeft, 
  PiggyBank, 
  Target, 
  TrendingUp, 
  Calendar, 
  Percent,
  Wallet,
  ArrowRightLeft,
  ChevronDown,
  CircleDollarSign
} from "lucide-react";

type CalcMode = "goal" | "projection";

export default function SavingPlanner() {
  const [mode, setMode] = useState<CalcMode>("goal");
  const [initialBalance, setInitialBalance] = useState<string>("");
  const [monthlyContribution, setMonthlyContribution] = useState<string>("");
  const [targetGoal, setTargetGoal] = useState<string>("");
  const [interestRate, setInterestRate] = useState<string>("5");
  const [durationYears, setDurationYears] = useState<string>("");
  const [durationMonths, setDurationMonths] = useState<string>("");

  const [result, setResult] = useState<{
    totalSaved: number;
    totalInterest: number;
    totalPrincipal: number;
    monthlyNeeded?: number;
    isFeasible: boolean;
    message: string;
  } | null>(null);

  const [error, setError] = useState<string>("");

  const calculate = () => {
    setError("");
    const initial = parseFloat(initialBalance || "0");
    const rate = parseFloat(interestRate || "0") / 100 / 12;
    const years = parseFloat(durationYears || "0");
    const months = parseFloat(durationMonths || "0");
    const totalMonths = (years * 12) + months;

    if (totalMonths <= 0) {
      setError("Please enter a valid duration (years or months).");
      return;
    }

    if (mode === "projection") {
      const monthly = parseFloat(monthlyContribution || "0");
      if (monthly <= 0 && initial <= 0) {
        setError("Please enter a monthly contribution or starting balance.");
        return;
      }

      // FV formula: FV = P(1+r)^n + PMT * [((1+r)^n - 1) / r]
      let totalSaved = 0;
      if (rate === 0) {
        totalSaved = initial + (monthly * totalMonths);
      } else {
        totalSaved = initial * Math.pow(1 + rate, totalMonths) + 
                     monthly * ((Math.pow(1 + rate, totalMonths) - 1) / rate);
      }

      const totalPrincipal = initial + (monthly * totalMonths);
      const totalInterest = totalSaved - totalPrincipal;

      setResult({
        totalSaved,
        totalInterest,
        totalPrincipal,
        isFeasible: true,
        message: `In ${totalMonths} months, you'll have approximately AED ${totalSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}.`
      });

    } else {
      const target = parseFloat(targetGoal || "0");
      if (target <= 0) {
        setError("Please enter a valid target goal amount.");
        return;
      }

      if (initial >= target) {
        setError("Your starting balance is already greater than or equal to your goal!");
        return;
      }

      // PMT formula: PMT = (FV - P(1+r)^n) / [((1+r)^n - 1) / r]
      let monthlyNeeded = 0;
      if (rate === 0) {
        monthlyNeeded = (target - initial) / totalMonths;
      } else {
        const numerator = target - (initial * Math.pow(1 + rate, totalMonths));
        const denominator = (Math.pow(1 + rate, totalMonths) - 1) / rate;
        monthlyNeeded = numerator / denominator;
      }

      const totalPrincipal = initial + (monthlyNeeded * totalMonths);
      const totalInterest = target - totalPrincipal;

      setResult({
        totalSaved: target,
        totalInterest,
        totalPrincipal,
        monthlyNeeded,
        isFeasible: monthlyNeeded > 0,
        message: monthlyNeeded > 0 
          ? `You need to save AED ${monthlyNeeded.toLocaleString(undefined, { maximumFractionDigits: 0 })} monthly to reach your goal.`
          : "Your starting balance with interest will exceed your goal!"
      });
    }
  };

  const reset = () => {
    setInitialBalance("");
    setMonthlyContribution("");
    setTargetGoal("");
    setInterestRate("5");
    setDurationYears("");
    setDurationMonths("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-teal-600 font-bold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center space-y-3">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-teal-50 text-teal-700 rounded-full text-sm font-bold border border-teal-100 shadow-sm">
              <PiggyBank className="w-4 h-4" />
              Smarter Financial Planning
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              Premium <span className="text-teal-600">Savings</span> Planner
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Take control of your future. Calculate exactly how much you need to save or project your wealth growth with ease.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Input Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-8 h-full">
                {/* Mode Selector */}
                <div className="p-1 bg-slate-50 rounded-2xl flex gap-1">
                  <button
                    onClick={() => { setMode("goal"); setResult(null); }}
                    className={`flex-1 py-3 px-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      mode === "goal" ? "bg-white text-teal-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <Target className="w-4 h-4" />
                    Reach a Goal
                  </button>
                  <button
                    onClick={() => { setMode("projection"); setResult(null); }}
                    className={`flex-1 py-3 px-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all flex items-center justify-center gap-2 ${
                      mode === "projection" ? "bg-white text-teal-600 shadow-sm" : "text-slate-400 hover:text-slate-600"
                    }`}
                  >
                    <TrendingUp className="w-4 h-4" />
                    Project Growth
                  </button>
                </div>

                <div className="space-y-6">
                  {/* Common Inputs */}
                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Starting Balance</label>
                    <div className="relative group">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-slate-50 rounded-lg group-focus-within:bg-teal-50 group-focus-within:text-teal-600 transition-colors">
                        <Wallet className="w-4 h-4" />
                      </div>
                      <input
                        type="number"
                        value={initialBalance}
                        onChange={(e) => setInitialBalance(e.target.value)}
                        className="w-full pl-16 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-50 focus:border-teal-500 outline-none transition-all font-bold text-slate-700"
                        placeholder="e.g. 5000"
                      />
                    </div>
                  </div>

                  {mode === "goal" ? (
                    <div className="space-y-2">
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Target Savings Goal</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-slate-50 rounded-lg group-focus-within:bg-teal-50 group-focus-within:text-teal-600 transition-colors">
                          <CircleDollarSign className="w-4 h-4" />
                        </div>
                        <input
                          type="number"
                          value={targetGoal}
                          onChange={(e) => setTargetGoal(e.target.value)}
                          className="w-full pl-16 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-50 focus:border-teal-500 outline-none transition-all font-bold text-slate-700 underline decoration-teal-300 decoration-2"
                          placeholder="e.g. 50000"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Monthly Contribution</label>
                      <div className="relative group">
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-slate-50 rounded-lg group-focus-within:bg-teal-50 group-focus-within:text-teal-600 transition-colors">
                          <ArrowRightLeft className="w-4 h-4" />
                        </div>
                        <input
                          type="number"
                          value={monthlyContribution}
                          onChange={(e) => setMonthlyContribution(e.target.value)}
                          className="w-full pl-16 pr-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-50 focus:border-teal-500 outline-none transition-all font-bold text-slate-700"
                          placeholder="e.g. 2000"
                        />
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Years</label>
                      <input
                        type="number"
                        value={durationYears}
                        onChange={(e) => setDurationYears(e.target.value)}
                        className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-50 focus:border-teal-500 outline-none transition-all font-bold text-slate-700"
                        placeholder="0"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Months</label>
                      <input
                        type="number"
                        value={durationMonths}
                        onChange={(e) => setDurationMonths(e.target.value)}
                        className="w-full px-4 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-teal-50 focus:border-teal-500 outline-none transition-all font-bold text-slate-700"
                        placeholder="0"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-xs font-black text-slate-400 uppercase tracking-widest pl-1 flex justify-between">
                      Annual Interest Rate (%)
                      <span className="text-teal-600">{interestRate}%</span>
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="20"
                      step="0.5"
                      value={interestRate}
                      onChange={(e) => setInterestRate(e.target.value)}
                      className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-teal-600"
                    />
                    <div className="flex justify-between text-[10px] font-black text-slate-300 uppercase tracking-tighter">
                      <span>0%</span>
                      <span>10%</span>
                      <span>20%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4">
                  {error && (
                    <div className="p-4 bg-rose-50 text-rose-600 rounded-2xl text-xs font-bold flex gap-3 items-center border border-rose-100 animate-shake">
                      <Info className="w-4 h-4 shrink-0" />
                      {error}
                    </div>
                  )}

                  <div className="flex gap-4">
                    <button
                      onClick={calculate}
                      className="flex-grow py-5 bg-teal-600 text-white font-black rounded-[1.5rem] hover:bg-teal-700 active:scale-95 transition-all shadow-lg shadow-teal-100 flex items-center justify-center gap-2 uppercase tracking-wide text-sm"
                    >
                      <Calculator className="w-5 h-5" />
                      Calculate
                    </button>
                    <button
                      onClick={reset}
                      className="px-6 py-5 bg-slate-50 text-slate-400 font-bold rounded-[1.5rem] hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center border border-slate-100"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-8 flex flex-col">
              {result ? (
                <div className="space-y-8 flex-grow">
                  {/* Hero Card */}
                  <div className="bg-white p-10 rounded-[3rem] shadow-sm border border-slate-100 text-center space-y-6 relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none group-hover:scale-110 transition-transform duration-700">
                      <PiggyBank className="w-64 h-64 text-teal-600" />
                    </div>
                    
                    <div className="space-y-2 relative z-10">
                      <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em]">Estimated Total Savings</p>
                      <p className="text-6xl font-black text-slate-900 tracking-tighter">
                        <span className="text-teal-600">AED</span> {result.totalSaved.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                      </p>
                    </div>

                    <div className="max-w-md mx-auto p-4 bg-teal-50/50 rounded-2xl border border-teal-100 relative z-10">
                      <p className="text-sm text-teal-800 font-bold leading-relaxed italic">
                        "{result.message}"
                      </p>
                    </div>

                    {mode === "goal" && result.monthlyNeeded && (
                      <div className="pt-4 space-y-4">
                         <div className="h-px w-full bg-slate-50" />
                         <div className="flex flex-col md:flex-row justify-center items-center gap-8">
                            <div className="text-center">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Monthly Saving Needed</p>
                               <p className="text-2xl font-black text-slate-800">AED {result.monthlyNeeded.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                            </div>
                            <div className="h-8 w-px bg-slate-100 hidden md:block" />
                            <div className="text-center">
                               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Time to Goal</p>
                               <p className="text-2xl font-black text-slate-800">{(parseFloat(durationYears || "0") * 12 + parseFloat(durationMonths || "0"))} Months</p>
                            </div>
                         </div>
                      </div>
                    )}
                  </div>

                  {/* Detailed Cards */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                        <Wallet className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Total Contributions</p>
                        <p className="text-2xl font-black text-slate-900">AED {result.totalPrincipal.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-blue-500" style={{ width: `${(result.totalPrincipal / result.totalSaved) * 100}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
                      <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                        <Percent className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Compounded Interest</p>
                        <p className="text-2xl font-black text-slate-900">AED {result.totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}</p>
                        <div className="mt-2 h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                          <div className="h-full bg-amber-500" style={{ width: `${(result.totalInterest / result.totalSaved) * 100}%` }} />
                        </div>
                      </div>
                    </div>

                    <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-4">
                      <div className="w-12 h-12 bg-teal-50 text-teal-600 rounded-2xl flex items-center justify-center">
                        <TrendingUp className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Portfolio Growth</p>
                        <p className="text-2xl font-black text-slate-900">+ {((result.totalInterest / result.totalPrincipal) * 100).toFixed(1)}%</p>
                        <p className="text-[10px] font-bold text-slate-400 italic">Total ROI over period</p>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 flex-grow flex flex-col items-center justify-center text-center space-y-6 opacity-80 border-dashed border-2">
                  <div className="w-24 h-24 bg-slate-50 text-slate-300 rounded-[2rem] flex items-center justify-center animate-bounce">
                    <PiggyBank className="w-12 h-12" />
                  </div>
                  <div className="space-y-2 max-w-sm">
                    <h3 className="text-2xl font-black text-slate-800 uppercase tracking-tight">Check your roadmap</h3>
                    <p className="text-slate-400 font-bold leading-relaxed">
                      Enter your details and click calculate to see your personalized savings trajectory and monthly goals.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* FAQ / Education Section */}
          <section className="bg-white p-12 md:p-16 rounded-[3.5rem] shadow-sm border border-slate-100 space-y-12">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                  <Info className="w-8 h-8 text-teal-500" />
                  Savings FAQ
                </h2>
                <p className="text-slate-400 font-medium">Expert advice on hit your financial milestones.</p>
              </div>
              <Link href="/" className="px-8 py-4 bg-teal-50 text-teal-600 hover:bg-teal-100 rounded-2xl font-bold transition-all text-sm border border-teal-50">
                Back to Dashboard
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 relative z-10">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">What is the 50/30/20 rule?</h3>
                <p className="text-slate-500 leading-relaxed font-bold text-sm">
                  It's a popular budgeting strategy: Spend 50% on needs, 30% on wants, and put 20% into savings or high-yield investments.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">How much should I save each month?</h3>
                <p className="text-slate-500 leading-relaxed font-bold text-sm">
                  Ideally, aim for 20% of your net income. Even if you start smaller, consistency is key to building long-term wealth.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">What is compound interest?</h3>
                <p className="text-slate-500 leading-relaxed font-bold text-sm">
                  It's interest calculated on your initial principal AND the accumulated interest from previous periods. Over time, this accelerates your savings growth significantly.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">What is a good savings interest rate?</h3>
                <p className="text-slate-500 leading-relaxed font-bold text-sm">
                   A high-yield savings account typically offers 4-5% annually. For long-term goals (5+ years), index fund investments might offer higher historic returns.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-slate-800">Is it better to save or pay off debt?</h3>
                <p className="text-slate-500 leading-relaxed font-bold text-sm">
                  Always prioritize paying off high-interest debt (like credit cards) first. If your debt interest is higher than your savings interest, you are effectively "losing" money.
                </p>
              </div>
            </div>
          </section>

          {/* Tips Section (Existing Dark Mode Style) */}
          <section className="bg-slate-900 p-12 md:p-16 rounded-[3.5rem] shadow-xl text-white space-y-12 overflow-hidden relative">
            <div className="absolute top-0 right-0 p-16 opacity-10 blur-3xl bg-teal-500 rounded-full pointer-events-none" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-black tracking-tight flex items-center gap-3">
                  <TrendingUp className="w-8 h-8 text-teal-400" />
                  Wealth Strategy
                </h2>
                <p className="text-slate-400 font-medium">Maximize your growth in the UAE market.</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 relative z-10">
              <div className="space-y-4">
                <div className="w-10 h-10 bg-teal-600/20 text-teal-400 rounded-xl flex items-center justify-center font-black">01</div>
                <h3 className="text-xl font-bold">Start Small, Start Early</h3>
                <p className="text-slate-400 leading-relaxed font-medium text-sm">
                  A small amount saved now is worth more than a larger amount saved later due to the power of time.
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 bg-teal-600/20 text-teal-400 rounded-xl flex items-center justify-center font-black">02</div>
                <h3 className="text-xl font-bold">Automate Transfers</h3>
                <p className="text-slate-400 leading-relaxed font-medium text-sm">
                   Set up an automatic transfer on payday so your savings are put away before you have a chance to spend them!
                </p>
              </div>
              <div className="space-y-4">
                <div className="w-10 h-10 bg-teal-600/20 text-teal-400 rounded-xl flex items-center justify-center font-black">03</div>
                <h3 className="text-xl font-bold">Review Quarterly</h3>
                <p className="text-slate-400 leading-relaxed font-medium text-sm">
                  Your goals and income change. Review your plan every 3 months to see if you can increase your contributions.
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
