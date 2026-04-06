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
          <div className="text-center md:text-left space-y-4">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                Rent Affordability Calculator
              </h1>
              <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider">
                Free • No sign-up • Runs in your browser
              </p>
            </div>
            
            <div className="text-slate-600 space-y-4 text-base leading-relaxed mt-6">
              <p>Use this rent affordability calculator to find out how much rent you can safely afford based on your monthly salary. Whether you're renting in Dubai or elsewhere, understanding your budget is essential to avoid financial stress.</p>
              <p>A common rule is to spend around 30% to 35% of your income on rent. However, your actual affordability depends on your lifestyle, expenses, and savings goals. This tool helps you calculate a realistic rent range instantly so you can make smarter financial decisions.</p>
              <p>If you're planning to rent a property in the UAE, this calculator gives you a quick and reliable estimate based on your income and spending habits. You can also use our <Link href="/salary-to-lifestyle-calculator" className="text-blue-600 hover:underline font-medium">Salary to Lifestyle Calculator</Link> to understand how your income is distributed.</p>
            </div>
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
                <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 flex flex-col justify-center h-full">
                  <div className="text-center space-y-4">
                    <p className="text-sm font-bold text-blue-600 uppercase tracking-widest">Recommended Rent</p>
                    <div className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                      AED {result.lowRent.toLocaleString()} – AED {result.highRent.toLocaleString()}
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-slate-100 space-y-4 max-w-sm mx-auto w-full">
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium text-lg">Adjusted rent</span>
                      <span className="text-slate-900 font-bold text-lg">AED {result.adjustedRent.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-slate-500 font-medium text-lg">Status</span>
                      <span className={`px-4 py-1.5 rounded-xl text-sm font-black uppercase tracking-wider shadow-sm ${
                        result.status === "Comfortable" ? "bg-emerald-500 text-white" :
                        result.status === "Tight" ? "bg-amber-500 text-white" :
                        "bg-rose-500 text-white"
                      }`}>
                        {result.status}
                      </span>
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

          {/* Content Sections */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 space-y-8 mt-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900">How This Rent Affordability Calculator Works</h2>
              <div className="text-slate-600 space-y-4 text-base leading-relaxed">
                <p>This rent affordability calculator estimates how much of your income you can safely spend on rent. A widely accepted guideline is to allocate around 30% to 35% of your monthly salary to housing costs. This ensures you still have enough income left for savings, daily expenses, and unexpected costs.</p>
                <p>For example, if your monthly salary is AED 10,000, a recommended rent range would be between AED 3,000 and AED 3,500. However, this is only a starting point. Your personal affordability depends on your financial situation, including fixed expenses such as loans, bills, and lifestyle spending.</p>
                <p>This calculator also considers your expenses and savings goals to provide a more realistic estimate. By subtracting your expenses and planned savings from your income, it calculates how much you can comfortably allocate to rent without overextending yourself.</p>
                <p>In cities like Dubai, where rental costs vary significantly by location, understanding your budget is especially important. Choosing a rent level that aligns with your income helps you maintain financial stability and avoid unnecessary stress.</p>
                <p>This tool gives you a clear starting point so you can confidently search for properties within your budget.</p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 space-y-4">
              <h2 className="text-xl font-black text-slate-900">Example: Rent calculation</h2>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <p className="text-slate-700 font-medium mb-4">If your monthly salary is AED 12,000:</p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex justify-between items-center max-w-sm">
                    <span>30% rule:</span>
                    <span className="font-bold text-slate-900">AED 3,600</span>
                  </li>
                  <li className="flex justify-between items-center max-w-sm">
                    <span>35% rule:</span>
                    <span className="font-bold text-slate-900">AED 4,200</span>
                  </li>
                </ul>
                <div className="mt-4 p-4 bg-blue-50 text-blue-800 rounded-xl">
                  <p className="font-medium">Your recommended rent range would be between AED 3,600 and AED 4,200.</p>
                </div>
                <p className="mt-4 text-slate-700">If your monthly expenses are AED 3,000 and you aim to save 10%, your adjusted rent may be lower.</p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 space-y-4">
              <h2 className="text-xl font-black text-slate-900">Rent affordability in Dubai</h2>
              <div className="text-slate-600 space-y-4 text-base leading-relaxed">
                <p>In Dubai, rental prices vary depending on location, property type, and lifestyle. Areas such as Dubai Marina and Downtown Dubai typically have higher rents, while areas like Deira or International City may offer more affordable options.</p>
                <p>This calculator helps you set a realistic budget so you can choose a property that fits your financial situation without overspending.</p>
              </div>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 space-y-8 mt-8">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Info className="w-6 h-6 text-blue-500" />
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">How much rent should I pay based on salary?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Most experts recommend spending 30% to 35% of your income on rent.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Is this calculator accurate for Dubai?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes, it provides a realistic estimate based on common UAE financial guidelines.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Should I include savings when calculating rent?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes, always include savings to maintain financial stability.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">What happens if I spend too much on rent?</h3>
                <p className="text-slate-600 leading-relaxed">
                  You may struggle to cover other expenses and save money.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Can I afford higher rent if I have no debt?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Possibly, but it’s still important to maintain a balanced budget.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 space-y-6 mt-8">
            <h2 className="text-2xl font-black text-slate-900">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/salary-to-lifestyle-calculator" className="p-4 border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all font-bold text-slate-700 hover:text-blue-700 text-center">
                Salary to Lifestyle Calculator
              </Link>
              <Link href="/saving-planner" className="p-4 border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all font-bold text-slate-700 hover:text-blue-700 text-center">
                Savings Planner
              </Link>
              <Link href="/bill-split-calculator" className="p-4 border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all font-bold text-slate-700 hover:text-blue-700 text-center">
                Bill Split Calculator
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
