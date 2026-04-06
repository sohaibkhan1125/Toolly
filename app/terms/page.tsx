"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Gavel, 
  ShieldCheck, 
  FileText, 
  RefreshCcw, 
  ArrowLeft,
  Scale,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function TermsAndConditions() {
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
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-black uppercase tracking-widest">
              <Gavel className="w-3.5 h-3.5" />
              User Agreement
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Terms & Conditions
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-2xl leading-relaxed">
              Welcome to Toolly. By accessing our platform, you agree to comply with and be bound by the following terms of service.
            </p>
            <div className="text-sm text-slate-400 font-bold">
              Last Updated: April 5, 2026
            </div>
          </div>

          {/* Core Principles Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4 hover:border-blue-200 transition-colors">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">Fair Use Policy</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                Our tools are designed for manual, human use. Automated scraping or mass-processing of our calculators is strictly prohibited to ensure stability for all.
              </p>
            </div>
            
            <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4 hover:border-emerald-200 transition-colors">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-black text-slate-900 leading-tight">No Hidden Fees</h3>
              <p className="text-sm text-slate-600 font-medium leading-relaxed italic">
                The core Toolly suite is 100% free. We will never charge you for basic calculation outputs or hidden "premium" export fees without explicit notice.
              </p>
            </div>
          </div>

          {/* Detailed Legal Sections */}
          <div className="space-y-12 prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-500 prose-p:font-medium prose-p:leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl flex items-center gap-3">
                <Scale className="w-6 h-6 text-blue-600" />
                1. Acceptance of Terms
              </h2>
              <p>
                By using Toolly (the "Site"), you acknowledge that you have read, understood, and agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl flex items-center gap-3">
                <RefreshCcw className="w-6 h-6 text-blue-600" />
                2. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these terms at any time. Changes will be posted on this page with an updated "Last Updated" date. Continued use of the Site after changes indicates your acceptance of the new terms.
              </p>
            </section>

            <section className="space-y-4 p-8 bg-blue-600 rounded-[2.5rem] text-white">
              <h2 className="text-2xl text-white flex items-center gap-3">
                <CheckCircle2 className="w-6 h-6 text-blue-200" />
                3. Intellectual Property
              </h2>
              <p className="text-blue-100">
                The Site's code, design, icons, and specialized formulas are the exclusive property of Toolly. You may not reproduce, redistribute, or reverse-engineer our tools without prior written consent. All logos and trademarks are property of their respective owners.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl flex items-center gap-3 text-red-600">
                <AlertCircle className="w-6 h-6 text-red-500" />
                4. User Accountability
              </h2>
              <p>
                You are solely responsible for how you use the data generated by our tools. Toolly is not liable for financial losses, contractual disputes, or any negative outcomes resulting from the use of our calculators in real-world scenarios.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl">5. Governing Law</h2>
              <p>
                These terms are governed by the laws of the United Arab Emirates. Any disputes arising from the use of the Site shall be settled within the jurisdiction of the courts of Dubai, UAE.
              </p>
            </section>

            <section className="pt-8 border-t border-slate-100 text-center">
              <p className="text-sm font-black uppercase tracking-widest text-slate-400">
                © {new Date().getFullYear()} Toolly. All rights reserved.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
