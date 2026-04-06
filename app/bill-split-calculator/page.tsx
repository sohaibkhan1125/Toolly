"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronRight, RotateCcw, Calculator, Info, ArrowLeft } from "lucide-react";

export default function BillSplitCalculator() {
  const [totalAmount, setTotalAmount] = useState<string>("");
  const [numberOfPeople, setNumberOfPeople] = useState<string>("");
  const [tipPercentage, setTipPercentage] = useState<string>("");
  const [taxPercentage, setTaxPercentage] = useState<string>("");
  const [result, setResult] = useState<{
    perPerson: number;
    breakdown: {
      originalTotal: number;
      tipAmount: number;
      taxAmount: number;
      grandTotal: number;
      people: number;
    };
  } | null>(null);
  const [error, setError] = useState<string>("");

  const calculate = () => {
    setError("");
    const amount = parseFloat(totalAmount);
    const people = parseInt(numberOfPeople);
    const tip = parseFloat(tipPercentage || "0");
    const tax = parseFloat(taxPercentage || "0");

    if (isNaN(amount) || amount <= 0) {
      setError("Please enter a valid total amount greater than 0.");
      return;
    }
    if (isNaN(people) || people < 1) {
      setError("Number of people must be at least 1.");
      return;
    }
    if (tip < 0 || tax < 0) {
      setError("Percentages cannot be negative.");
      return;
    }

    const tipAmount = amount * (tip / 100);
    const taxAmount = amount * (tax / 100);
    const grandTotal = amount + tipAmount + taxAmount;
    const perPerson = grandTotal / people;

    setResult({
      perPerson,
      breakdown: {
        originalTotal: amount,
        tipAmount,
        taxAmount,
        grandTotal,
        people,
      },
    });
  };

  const reset = () => {
    setTotalAmount("");
    setNumberOfPeople("");
    setTipPercentage("");
    setTaxPercentage("");
    setResult(null);
    setError("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="max-w-3xl mx-auto space-y-8">
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
                Bill Split Calculator
              </h1>
              <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider">
                Free • No sign-up • Runs in your browser
              </p>
            </div>
            
            <div className="text-slate-600 space-y-4 text-base leading-relaxed mt-6">
              <p>Easily split your bill between friends with this free bill split calculator. Whether you're dining out, traveling, or sharing expenses, this tool helps you divide costs quickly and fairly. Simply enter the total amount, number of people, and optional tip or tax to get an instant breakdown.</p>
              <p>This calculator is perfect for restaurants, group trips, shared living expenses, or any situation where you need to divide costs evenly. Instead of manually calculating and risking errors, you can get accurate results instantly with no sign-up required.</p>
              <p>If you're looking for a simple and fast way to split bills online in the UAE or anywhere else, this tool gives you everything you need in seconds. You may also find our <Link href="/rent-affordability-calculator" className="text-blue-600 hover:underline font-medium">Rent Affordability Calculator</Link> useful when planning your monthly expenses.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Inputs Card */}
            <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Total Amount (AED)</label>
                  <input
                    type="number"
                    value={totalAmount}
                    onChange={(e) => setTotalAmount(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium"
                    placeholder="200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Number of People</label>
                  <input
                    type="number"
                    value={numberOfPeople}
                    onChange={(e) => setNumberOfPeople(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium"
                    placeholder="4"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tip (%)</label>
                    <input
                      type="number"
                      value={tipPercentage}
                      onChange={(e) => setTipPercentage(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium"
                      placeholder="10"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Tax (%)</label>
                    <input
                      type="number"
                      value={taxPercentage}
                      onChange={(e) => setTaxPercentage(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium"
                      placeholder="5"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-red-50 text-red-600 rounded-lg text-sm font-medium flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  {error}
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
                  className="px-6 py-4 bg-slate-100 text-slate-600 font-bold rounded-2xl hover:bg-slate-200 active:scale-95 transition-all flex items-center justify-center"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Results Display */}
            <div className="space-y-6">
              {result ? (
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 h-full flex flex-col justify-between">
                  <div className="text-center space-y-4">
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 rounded-full text-sm font-bold uppercase tracking-wider">
                      Each Person Pays
                    </span>
                    <div className="text-5xl font-black text-slate-900 tracking-tight">
                      AED {result.perPerson.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </div>
                  </div>

                  <div className="mt-8 space-y-4 border-t border-slate-50 pt-6">
                    <div className="flex justify-between text-sm font-medium text-slate-500">
                      <span>Total</span>
                      <span className="text-slate-900">AED {result.breakdown.originalTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-slate-500">
                      <span>Tip</span>
                      <span className="text-slate-900">AED {result.breakdown.tipAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-slate-500">
                      <span>Tax</span>
                      <span className="text-slate-900">AED {result.breakdown.taxAmount.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-white/50 border-2 border-dashed border-slate-200 rounded-3xl h-full flex flex-col items-center justify-center p-8 text-center space-y-4 opacity-60">
                  <div className="p-4 bg-slate-100 rounded-full">
                    <Calculator className="w-8 h-8 text-slate-400 font-bold" />
                  </div>
                  <div className="space-y-1">
                    <p className="font-bold text-slate-600">No results yet</p>
                    <p className="text-sm text-slate-400">Fill in the fields and click Calculate to see the split.</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Content Section: How it Works & Example */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 space-y-8 mt-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900">How This Bill Split Calculator Works</h2>
              <div className="text-slate-600 space-y-4 text-base leading-relaxed">
                <p>This bill split calculator works by dividing the total cost of a bill among a group of people. You simply enter the total amount, the number of people, and any additional charges such as tip or tax. The calculator then automatically adds these amounts and splits the final total evenly.</p>
                <p>For example, if your total bill is AED 200 and you want to add a 10% tip, the calculator will first calculate the tip amount (AED 20), bringing the total to AED 220. If you are splitting this between 4 people, each person would pay AED 55.</p>
                <p>Including tip and tax ensures that everyone contributes fairly and avoids confusion or underpayment. This is especially useful when dining in restaurants, where service charges or VAT may apply.</p>
                <p>This tool removes the need for manual calculations and ensures accuracy every time. Whether you are splitting bills with friends, family, or colleagues, you can get clear and instant results without any hassle.</p>
                <p>Because this calculator runs directly in your browser, your data is not stored or shared, making it a safe and convenient solution for everyday use.</p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 space-y-4">
              <h2 className="text-xl font-black text-slate-900">Example: Splitting a bill</h2>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <p className="text-slate-700 font-medium mb-4">Let's say your total bill is AED 300, with a 10% tip and 5 people.</p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex justify-between items-center max-w-sm">
                    <span>Tip:</span>
                    <span className="font-bold text-slate-900">AED 30</span>
                  </li>
                  <li className="flex justify-between items-center max-w-sm">
                    <span>Total with tip:</span>
                    <span className="font-bold text-slate-900">AED 330</span>
                  </li>
                  <li className="flex justify-between items-center max-w-sm text-lg mt-2 pt-2 border-t border-slate-200">
                    <span>Per person:</span>
                    <span className="font-black text-blue-600">AED 66</span>
                  </li>
                </ul>
                <p className="mt-4 text-slate-700">Using this calculator, each person would pay AED 66.</p>
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
                <h3 className="font-bold text-slate-800 text-base">How do you split a bill fairly?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Divide the total amount (including tip and tax) by the number of people. This tool does it instantly.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Should tip be included in the split?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes, including tip ensures everyone pays their fair share.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Can I use this calculator in the UAE?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes, this tool works globally and is ideal for UAE users.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">What if some people ordered more?</h3>
                <p className="text-slate-600 leading-relaxed">
                  This version splits equally. Custom split options may be added later.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Do I need to sign up?</h3>
                <p className="text-slate-600 leading-relaxed">
                  No, this tool is completely free and requires no registration.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 space-y-6 mt-8">
            <h2 className="text-2xl font-black text-slate-900">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/rent-affordability-calculator" className="p-4 border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all font-bold text-slate-700 hover:text-blue-700 text-center">
                Rent Affordability Calculator
              </Link>
              <Link href="/salary-to-lifestyle-calculator" className="p-4 border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all font-bold text-slate-700 hover:text-blue-700 text-center">
                Salary to Lifestyle Calculator
              </Link>
              <Link href="/saving-planner" className="p-4 border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all font-bold text-slate-700 hover:text-blue-700 text-center">
                Savings Planner
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
