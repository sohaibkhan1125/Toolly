"use client";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  ShieldCheck, 
  Zap, 
  Globe, 
  Rocket, 
  Heart, 
  Users, 
  CheckCircle2, 
  Target,
  Sparkles
} from "lucide-react";
import Link from "next/link";

export default function AboutUs() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* Hero Section */}
        <section className="relative py-24 overflow-hidden bg-slate-50">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-6xl">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-50" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-50" />
          </div>

          <div className="max-w-4xl mx-auto px-4 relative z-10 text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-slate-100 text-blue-600 font-bold text-sm">
              <Sparkles className="w-4 h-4" />
              Our Story
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight leading-tight">
              Empowering Your Daily <span className="text-blue-600 underline decoration-blue-200">Decisions</span>
            </h1>
            <p className="text-xl text-slate-500 font-medium max-w-2xl mx-auto">
              Toolly was born from a simple idea: making professional-grade financial and notification tools accessible to everyone, everywhere. 
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-24 px-4 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h2 className="text-3xl font-black text-slate-900 flex items-center gap-3">
                    <Target className="w-8 h-8 text-blue-600" />
                    Our Mission
                  </h2>
                  <p className="text-lg text-slate-600 leading-relaxed font-medium">
                    To build the most intuitive, fast, and secure suite of micro-tools that help individuals and small businesses manage their finances, communications, and productivity without the bloat.
                  </p>
                </div>
                
                <div className="space-y-4">
                   {/* Features List */}
                   {[
                     "Privacy-first: We don't store your personal data.",
                     "Precision-engineered: Accurate calculations every time.",
                     "User-centric design: Minimalist, fast, and accessible.",
                     "100% Free: Essential tools shouldn't come with a price tag."
                   ].map((item, i) => (
                     <div key={i} className="flex items-center gap-3 text-slate-700 font-bold">
                        <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        {item}
                     </div>
                   ))}
                </div>
              </div>

              <div className="relative group">
                <div className="absolute inset-0 bg-blue-600 rounded-[3rem] rotate-3 opacity-10 group-hover:rotate-1 transition-transform" />
                <div className="relative bg-slate-900 p-12 rounded-[3rem] text-white space-y-8 shadow-2xl">
                   <div className="space-y-2">
                     <p className="text-xs font-black uppercase tracking-widest text-blue-400">The Vision</p>
                     <h3 className="text-3xl font-black">Future of Utility</h3>
                   </div>
                   <p className="text-slate-400 text-lg font-medium leading-relaxed">
                     "We envision a world where complex tasks like budget planning, invoice generation, and media processing are simplified into a single click."
                   </p>
                   <div className="pt-4 border-t border-slate-800 flex items-center gap-4">
                      <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
                        <Users className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-bold">Team Toolly</p>
                        <p className="text-xs text-slate-500 uppercase font-black">Innovation Dept.</p>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Global Values */}
        <section className="py-24 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto space-y-16">
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-black text-slate-900">Built on Core Values</h2>
              <p className="text-slate-500 font-bold max-w-xl mx-auto">Our principles guide every line of code we write and every tool we launch.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6 hover:-translate-y-2 transition-all">
                <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                   <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Security</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">Your data belongs to you. Every tool runs locally in your browser so your information never leaves your device.</p>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6 hover:-translate-y-2 transition-all">
                <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                   <Zap className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Speed</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">Instant tools for instant results. We optimize for performance so you can get things done in seconds, not minutes.</p>
              </div>

              <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6 hover:-translate-y-2 transition-all">
                <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center">
                   <Globe className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-slate-900">Accessibility</h3>
                <p className="text-slate-500 font-medium text-sm leading-relaxed">No accounts, no paywalls, no barriers. Toolly is open to everyone, whether on mobile, tablet, or desktop.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 px-4">
          <div className="max-w-4xl mx-auto bg-blue-600 rounded-[3.5rem] p-12 md:p-20 text-center space-y-8 relative overflow-hidden">
             <div className="absolute top-0 right-0 p-24 bg-white/10 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
             
             <h2 className="text-4xl md:text-5xl font-black text-white relative z-10 leading-tight">
               Ready to streamline your workflow?
             </h2>
             <p className="text-blue-100 text-lg font-bold relative z-10 max-w-xl mx-auto">
               Join thousands of users who rely on Toolly for their everyday specialized tasks.
             </p>
             <div className="pt-4 relative z-10">
               <Link href="/" className="inline-flex items-center gap-2 px-10 py-5 bg-white text-blue-600 font-black rounded-2xl hover:bg-slate-50 active:scale-95 transition-all shadow-xl shadow-blue-900/20 uppercase tracking-wide">
                 Start Exploring Tools
                 <Rocket className="w-5 h-5" />
               </Link>
             </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
