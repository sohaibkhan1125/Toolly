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
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
              Bill Split Calculator
            </h1>
            <p className="text-lg text-slate-500 font-medium">
              Split bills quickly and fairly with optional tip and tax included.
            </p>
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
                      <span>Original Total</span>
                      <span className="text-slate-900">AED {result.breakdown.originalTotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-slate-500">
                      <span>Tip Amount ({tipPercentage || 0}%)</span>
                      <span className="text-slate-900">AED {result.breakdown.tipAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm font-medium text-slate-500">
                      <span>Tax Amount ({taxPercentage || 0}%)</span>
                      <span className="text-slate-900">AED {result.breakdown.taxAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base font-bold text-slate-900 pt-2 border-t border-slate-100">
                      <span>Grand Total</span>
                      <span>AED {result.breakdown.grandTotal.toFixed(2)}</span>
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

          {/* FAQ Section */}
          <section className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 space-y-8">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Info className="w-6 h-6 text-blue-500" />
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">How do you split a bill fairly?</h3>
                <p className="text-slate-600 leading-relaxed">
                  The fairest way to split a bill is either dividing the total evenly among all participants or paying exactly for what each person consumed. For large groups, equal splits are often preferred for simplicity.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Should tax be included in the split?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes, tax is part of the overall service cost. When splitting a bill equally, the tax should be divided proportionally based on each person's share of the total.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Should tip be included in the split?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Tipping practices vary by culture, but generally, tips are added to the grand total before splitting. If one person received significantly more service, they might choose to contribute more to the tip.
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
