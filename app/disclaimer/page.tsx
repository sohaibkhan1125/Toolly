"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  AlertTriangle, 
  Scale, 
  SearchX, 
  BookOpen, 
  ArrowLeft,
  FileWarning,
  CheckCircle2,
  HelpCircle
} from "lucide-react";
import Link from "next/link";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="space-y-4 border-b border-slate-100 pb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-xs font-black uppercase tracking-widest">
              <AlertTriangle className="w-3.5 h-3.5" />
              Not Professional Advice
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Legal Disclaimer
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
              While we strive for accuracy, our tools are provided for informational and educational purposes only. Please read this carefully before taking action based on any tool outputs.
            </p>
            <div className="text-sm text-slate-400 font-bold">
              Last Updated: April 5, 2026
            </div>
          </div>

          {/* Key Warning Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-amber-50/50 rounded-[2.5rem] border border-amber-100 space-y-4">
              <div className="w-12 h-12 bg-amber-100 text-amber-700 rounded-2xl flex items-center justify-center shadow-inner">
                <Scale className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">No Professional Advice</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                The outputs from our financial tools (Savings Planner, Rent Calculator, etc.) do not constitute financial, investment, or tax advice. Consult a professional before making large decisions.
              </p>
            </div>
            
            <div className="p-8 bg-blue-50/50 rounded-[2.5rem] border border-blue-100 space-y-4">
              <div className="w-12 h-12 bg-blue-100 text-blue-700 rounded-2xl flex items-center justify-center shadow-inner">
                <SearchX className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">Estimated Accuracy</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                Our tools are designed to provide estimates and scenarios. Actual results may vary based on bank-specific rules, regional taxes, or real-time market fluctuations.
              </p>
            </div>
          </div>

          {/* Detailed Legal Sections */}
          <div className="space-y-12 prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-500 prose-p:font-medium prose-p:leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl flex items-center gap-3">
                <BookOpen className="w-6 h-6 text-amber-600" />
                1. General Information
              </h2>
              <p>
                All content, calculations, and data presented on Toolly are for general illustrative and educational purposes only. We provide these utilities "as is" and without any warranties, express or implied, regarding their completeness, reliability, or accuracy.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl flex items-center gap-3">
                <FileWarning className="w-6 h-6 text-amber-600" />
                2. Limitation of Liability
              </h2>
              <p>
                In no event shall Toolly, its developers, or its affiliates be held liable for any decisions made or actions taken in reliance upon the information provided by these tools. Any consequences of your financial or professional actions are solely your responsibility.
              </p>
            </section>

            <section className="space-y-4 p-8 bg-slate-900 rounded-[2.5rem] text-white">
              <h2 className="text-2xl text-white flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                3. Precision Commitment
              </h2>
              <p className="text-slate-400">
                Despite our disclaimer, we pride ourselves on precision. Our formulas are based on industry standards (such as FV for compound interest and PMT for loan calculations). We regularly audit our tools to ensure they meet the highest technical standards of output.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl flex items-center gap-3">
                <HelpCircle className="w-6 h-6 text-amber-600" />
                4. External Redirects
              </h2>
              <p>
                Certain tools may contain links to external financial services or PDF generation scripts. We are not responsible for the content or privacy practices of these external sites or scripts once you leave the Toolly platform.
              </p>
            </section>

            <section className="pt-8 border-t border-slate-100 text-center">
              <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                Stay informed. Play safe. Grow smarter.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
