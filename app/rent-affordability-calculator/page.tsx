"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronRight, RotateCcw, Calculator, Info, ArrowLeft, Home, Wallet, PieChart } from "lucide-react";

export default function RentAffordabilityCalculator() {
  const [monthlySalary, setMonthlySalary] = useState<string>("");
  const [fixedExpenses, setFixedExpenses] = useState<string>("");
  const [savingsPercentage, setSavingsPercentage] = useState<string>("10");
  const [result, setResult] = useState<{
    lowRent: number;
    highRent: number;
    adjustedRent: number;
    status: "Comfortable" | "Tight" | "Risky";
    savingsAmount: number;
    remainingIncome: number;
  } | null>(null);
  const [error, setError] = useState<string>("");
  const [warning, setWarning] = useState<string>("");

  const calculate = () => {
    setError("");
    setWarning("");
    const salary = parseFloat(monthlySalary);
    const expenses = parseFloat(fixedExpenses || "0");
    const savings = parseFloat(savingsPercentage || "0");

    if (isNaN(salary) || salary <= 0) {
      setError("Please enter a valid monthly salary greater than 0.");
      return;
    }
    if (expenses < 0 || savings < 0 || savings > 100) {
      setError("Please check your numbers (expenses and percentages can't be negative).");
      return;
    }

    if (expenses >= salary) {
      setWarning("Your current expenses are too high for a safe rent estimate.");
      setResult(null);
      return;
    }

    const lowRent = salary * 0.30;
    const highRent = salary * 0.35;
    const savingsAmount = salary * (savings / 100);
    const remainingIncome = salary - expenses - savingsAmount;

    if (remainingIncome <= 0) {
      setWarning("Your current savings goal and expenses leave no remaining income for rent.");
      setResult(null);
      return;
    }

    const adjustedRent = remainingIncome * 0.40;

    let status: "Comfortable" | "Tight" | "Risky" = "Risky";
    if (adjustedRent >= lowRent) {
      status = "Comfortable";
    } else if (adjustedRent >= lowRent * 0.8) {
      status = "Tight";
    }

    setResult({
      lowRent,
      highRent,
      adjustedRent,
      status,
      savingsAmount,
      remainingIncome
    });
  };

  const reset = () => {
    setMonthlySalary("");
    setFixedExpenses("");
    setSavingsPercentage("10");
    setResult(null);
    setError("");
    setWarning("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
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
              Rent Affordability Calculator
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Find a safe monthly rent range based on your income and expenses.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Inputs Card */}
            <div className="lg:col-span-1 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Monthly Salary (AED)</label>
                  <div className="relative">
                    <Wallet className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      value={monthlySalary}
                      onChange={(e) => setMonthlySalary(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium"
                      placeholder="12000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Monthly Fixed Expenses (AED)</label>
                  <div className="relative">
                    <Calculator className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      value={fixedExpenses}
                      onChange={(e) => setFixedExpenses(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium"
                      placeholder="3000"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Savings Goal (%)</label>
                  <div className="relative">
                    <PieChart className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                      type="number"
                      value={savingsPercentage}
                      onChange={(e) => setSavingsPercentage(e.target.value)}
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium"
                      placeholder="10"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-6">
                {(error || warning) && (
                  <div className={`p-4 rounded-xl text-sm font-medium flex items-start gap-3 ${error ? 'bg-red-50 text-red-600' : 'bg-orange-50 text-orange-600'}`}>
                    <Info className="w-5 h-5 mt-0.5 shrink-0" />
                    <span>{error || warning}</span>
                  </div>
                )}

                <div className="flex gap-4">
                  <button
                    onClick={calculate}
                    className="flex-grow py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 active:scale-95 transition-all shadow-md flex items-center justify-center gap-2"
                  >
                    <Calculator className="w-5 h-5" />
                    Calculate
                  </button>
                  <button
                    onClick={reset}
                    className="px-6 py-4 bg-slate-50 text-slate-400 border border-slate-100 font-bold rounded-2xl hover:bg-slate-100 active:scale-95 transition-all flex items-center justify-center hover:text-slate-600"
                  >
                    <RotateCcw className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Results Display */}
            <div className="lg:col-span-2 space-y-6">
              {result ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 h-full">
                  {/* Standard Range Card */}
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6 flex flex-col justify-between">
                    <div className="space-y-4">
                      <span className="inline-block px-4 py-1.5 bg-slate-100 text-slate-600 rounded-full text-xs font-bold uppercase tracking-wider">
                        Standard Rule (30-35%)
                      </span>
                      <div className="space-y-1">
                        <p className="text-3xl font-black text-slate-900 tracking-tight">
                          AED {result.lowRent.toLocaleString()} – {result.highRent.toLocaleString()}
                        </p>
                        <p className="text-sm text-slate-400 font-medium italic">Basic recommended range</p>
                      </div>
                    </div>

                    <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100">
                      <p className="text-sm text-blue-700 leading-relaxed font-medium">
                        Based on your inputs, a safer monthly rent target is <span className="font-bold underline">AED {result.lowRent.toLocaleString()}</span>.
                      </p>
                    </div>
                  </div>

                  {/* Personalized Affordability Card */}
                  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6 flex flex-col justify-between">
                    <div className="flex justify-between items-start">
                      <div className="space-y-4">
                        <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-xs font-bold uppercase tracking-wider">
                          Adjusted Affordability
                        </span>
                        <div className="space-y-1">
                          <p className="text-4xl font-black text-slate-900 tracking-tight uppercase">
                            AED {result.adjustedRent.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                          </p>
                          <p className="text-sm text-slate-400 font-medium">Personalized safe amount</p>
                        </div>
                      </div>
                      
                      {/* Status Label */}
                      <div className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest shadow-sm ${
                        result.status === "Comfortable" ? "bg-emerald-500 text-white" :
                        result.status === "Tight" ? "bg-amber-500 text-white" :
                        "bg-rose-500 text-white"
                      }`}>
                        {result.status}
                      </div>
                    </div>

                    <div className="space-y-3 pt-4 border-t border-slate-50 font-medium">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Monthly Savings</span>
                        <span className="text-slate-700">AED {result.savingsAmount.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-400">Remaining for Living</span>
                        <span className="text-slate-700 font-bold">AED {result.remainingIncome.toLocaleString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/50 border-2 border-dashed border-slate-200 rounded-3xl h-[400px] lg:h-full flex flex-col items-center justify-center p-8 text-center space-y-4 opacity-60">
                  <div className="p-5 bg-slate-100 rounded-full">
                    <Home className="w-10 h-10 text-slate-400" />
                  </div>
                  <div className="space-y-1 max-w-sm">
                    <p className="text-xl font-black text-slate-600 tracking-tight uppercase">Get your rent score</p>
                    <p className="text-sm text-slate-400 font-medium">Fill in your salary and monthly expenses to calculate a safe monthly rent range.</p>
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
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-sm">
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base">How much rent should I spend from my salary?</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  The standard rule is to spend no more than 30% to 35% of your gross monthly income on rent. This ensures you have enough for groceries, transportation, and savings.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base">Is 30% of salary a good rent rule?</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                   Yes, the 30% rule is a widely accepted benchmark. However, it's a general guide. If you live in a high-cost area or have high debts, you may need to adjust this percentage downward.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-slate-800 text-base">Should I include savings when calculating rent?</h3>
                <p className="text-slate-600 leading-relaxed font-medium">
                  Absolutely. Prioritizing savings (typically 10-20% of your income) BEFORE calculating what you can afford for rent is the most financially responsible approach to housing.
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
