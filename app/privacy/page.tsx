"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  ShieldCheck, 
  Lock, 
  EyeOff, 
  Database, 
  Server, 
  ArrowLeft,
  FileText,
  BadgeCheck,
  AlertCircle
} from "lucide-react";
import Link from "next/link";

export default function PrivacyPolicy() {
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
              <ShieldCheck className="w-3.5 h-3.5" />
              Privacy First
            </div>
            <h1 className="text-4xl sm:text-5xl font-black text-slate-900 tracking-tight">
              Privacy Policy
            </h1>
            <p className="text-lg text-slate-500 font-medium max-w-2xl">
              At Toolly, we believe your data belongs to you. Our commitment is to provide powerful tools without compromising your privacy.
            </p>
            <div className="text-sm text-slate-400 font-bold">
              Last Updated: April 5, 2026
            </div>
          </div>

          {/* Quick Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
              <Lock className="w-8 h-8 text-blue-600" />
              <h3 className="font-black text-slate-900">No Storage</h3>
              <p className="text-sm text-slate-500 font-medium">We do not store your calculation data or personal inputs on our servers.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
              <EyeOff className="w-8 h-8 text-emerald-600" />
              <h3 className="font-black text-slate-900">No Tracking</h3>
              <p className="text-sm text-slate-500 font-medium">We don't use invasive tracking cookies or sell your activity to third parties.</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-3xl border border-slate-100 space-y-3">
              <Database className="w-8 h-8 text-amber-600" />
              <h3 className="font-black text-slate-900">Local Only</h3>
              <p className="text-sm text-slate-500 font-medium">Most processing happens directly in your browser for maximum security.</p>
            </div>
          </div>

          {/* Detailed Sections */}
          <div className="space-y-10 prose prose-slate max-w-none prose-headings:font-black prose-headings:text-slate-900 prose-p:text-slate-500 prose-p:font-medium prose-p:leading-relaxed">
            <section className="space-y-4">
              <h2 className="text-2xl flex items-center gap-3">
                <FileText className="w-6 h-6 text-blue-600" />
                1. Information We Collect
              </h2>
              <p>
                Toolly is designed to be a minimalist utility platform. We do not require account registration, and we do not collect personal identifying information (PII) such as your name, email address, or phone number unless you explicitly contact us for support.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl flex items-center gap-3">
                <Server className="w-6 h-6 text-blue-600" />
                2. How We Use Data
              </h2>
              <p>
                Any data you input into our calculators (e.g., salary, rent, invoice details) is processed locally in your browser's memory. This information is used solely to generate the results you see on your screen and is cleared once you refresh or close the page.
              </p>
            </section>

            <section className="space-y-4 border-l-4 border-blue-500 pl-6 py-2 bg-blue-50/30 rounded-r-2xl">
              <h2 className="text-2xl flex items-center gap-3 text-slate-900">
                <BadgeCheck className="w-6 h-6 text-blue-600" />
                3. Third-Party Services
              </h2>
              <p>
                We may use basic analytics services (like Google Analytics) to understand general traffic patterns. These services use anonymized data to tell us how many people visit the site, not who they are.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl flex items-center gap-3">
                <AlertCircle className="w-6 h-6 text-blue-600" />
                4. Your Rights
              </h2>
              <p>
                Since we don't store your data, you don't need to ask us to delete it! However, you have the right to use our platform without any tracking by using a browser with "Do Not Track" enabled or private browsing modes.
              </p>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <h2 className="text-2xl">5. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please reach out to us at <span className="text-blue-600 font-bold">privacy@toolly.com</span>.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
