"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  Mail, 
  MessageSquare, 
  MapPin, 
  Send, 
  ArrowLeft,
  CheckCircle2,
  Clock,
  Globe
} from "lucide-react";
import Link from "next/link";

export default function ContactUs() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "General Inquiry",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 5000);
    setFormData({ name: "", email: "", subject: "General Inquiry", message: "" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />

      <main className="flex-grow">
        {/* Hero & Background Decor */}
        <section className="relative py-20 overflow-hidden bg-slate-50">
          <div className="absolute top-0 right-0 p-32 bg-blue-100/50 blur-3xl rounded-full translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 p-24 bg-emerald-100/30 blur-3xl rounded-full -translate-x-1/2 translate-y-1/2" />
          
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="max-w-3xl space-y-6">
              <Link 
                href="/" 
                className="inline-flex items-center gap-2 text-slate-500 hover:text-blue-600 font-bold transition-colors group"
              >
                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
              <h1 className="text-5xl md:text-6xl font-black text-slate-900 tracking-tight">
                Get in <span className="text-blue-600">Touch</span>
              </h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                Have a question about our tools or want to suggest a new feature? We'd love to hear from you. Our team typically responds within 24 hours.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Content */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
              
              {/* Left Column: Info */}
              <div className="lg:col-span-5 space-y-12">
                <div className="space-y-8">
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-tight">Contact Information</h2>
                  
                  <div className="space-y-6">
                    <div className="flex gap-5 group">
                      <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all shadow-sm">
                        <Mail className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Email Us</p>
                        <p className="text-lg font-bold text-slate-700">support@toolly.com</p>
                        <p className="text-sm text-slate-400 font-medium">For technical help and business inquiries.</p>
                      </div>
                    </div>

                    <div className="flex gap-5 group">
                      <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-all shadow-sm">
                        <MessageSquare className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Feedback</p>
                        <p className="text-lg font-bold text-slate-700">feedback@toolly.com</p>
                        <p className="text-sm text-slate-400 font-medium">Tell us what you think or suggest a feature.</p>
                      </div>
                    </div>

                    <div className="flex gap-5 group">
                      <div className="w-14 h-14 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-all shadow-sm">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs font-black text-slate-400 uppercase tracking-widest">Location</p>
                        <p className="text-lg font-bold text-slate-700">Dubai, United Arab Emirates</p>
                        <p className="text-sm text-slate-400 font-medium">Our headquarters in the Heart of Innovation.</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Stats/Info */}
                <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white space-y-6 shadow-xl shadow-slate-200">
                   <div className="flex items-center gap-3">
                      <Clock className="w-6 h-6 text-blue-400" />
                      <p className="font-black uppercase tracking-widest text-xs">Response Time</p>
                   </div>
                   <h3 className="text-3xl font-black italic">"Under 24 Hours"</h3>
                   <p className="text-slate-400 font-medium text-sm leading-relaxed">
                     Our dedicated support specialists work around the clock to ensure your workflow remains uninterrupted.
                   </p>
                   <div className="flex items-center gap-2 text-emerald-400 text-sm font-bold">
                     <Globe className="w-4 h-4" />
                     Available Worldwide
                   </div>
                </div>
              </div>

              {/* Right Column: Form */}
              <div className="lg:col-span-7">
                <div className="bg-white p-8 md:p-12 rounded-[3.5rem] shadow-2xl border border-slate-100 relative">
                  {isSubmitted && (
                    <div className="absolute inset-0 z-20 bg-white/90 backdrop-blur-sm rounded-[3.5rem] flex flex-col items-center justify-center text-center p-8 space-y-4 animate-in fade-in zoom-in duration-300">
                      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center shadow-lg shadow-emerald-50">
                        <CheckCircle2 className="w-10 h-10" />
                      </div>
                      <h3 className="text-3xl font-black text-slate-900">Message Sent!</h3>
                      <p className="text-slate-500 font-medium max-w-xs mx-auto">
                        Thank you for reaching out. We've received your inquiry and will get back to you shortly.
                      </p>
                      <button 
                        onClick={() => setIsSubmitted(false)}
                        className="text-blue-600 font-black uppercase text-sm tracking-widest mt-4 hover:underline"
                      >
                        Send another message
                      </button>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Your Name</label>
                        <input
                          required
                          type="text"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-bold text-slate-700"
                          placeholder="John Doe"
                        />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Email Address</label>
                        <input
                          required
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-bold text-slate-700"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Subject</label>
                      <select 
                        value={formData.subject}
                        onChange={(e) => setFormData({...formData, subject: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 appearance-none"
                      >
                         <option>General Inquiry</option>
                         <option>Feature Request</option>
                         <option>Bug Report</option>
                         <option>Business Partnership</option>
                      </select>
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-black text-slate-400 uppercase tracking-widest pl-1">Your Message</label>
                      <textarea
                        required
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        className="w-full px-6 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-4 focus:ring-blue-50 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 resize-none"
                        placeholder="Tell us what's on your mind..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-5 bg-blue-600 text-white font-black rounded-[1.5rem] hover:bg-blue-700 active:scale-95 transition-all shadow-xl shadow-blue-100 flex items-center justify-center gap-3 uppercase tracking-[0.15em] text-sm"
                    >
                      <Send className="w-5 h-5" />
                      Send Message
                    </button>
                    
                    <p className="text-[10px] text-slate-400 font-bold text-center uppercase tracking-tighter">
                      By clicking send, you agree to our privacy policy regarding data collection.
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
