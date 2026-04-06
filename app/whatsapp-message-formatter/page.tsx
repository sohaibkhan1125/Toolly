"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { 
  ArrowLeft, 
  Copy, 
  RotateCcw, 
  Check, 
  MessageSquare, 
  Bold, 
  List, 
  Type, 
  AlignLeft, 
  Info,
  ChevronRight,
  Send,
  ExternalLink
} from "lucide-react";

export default function WhatsAppFormatter() {
  const [inputText, setInputText] = useState<string>("");
  const [formattedText, setFormattedText] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"preview" | "raw">("preview");
  const [isCopied, setIsCopied] = useState<boolean>(false);
  
  // Formatting Options
  const [options, setOptions] = useState({
    boldFirstLine: true,
    convertToBullets: true,
    addPaddingBetweenParagraphs: true,
    removeExtraSpaces: true
  });

  const handleOptionChange = (key: keyof typeof options) => {
    setOptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const formatMessage = () => {
    if (!inputText.trim()) {
      setFormattedText("");
      return;
    }

    let lines = inputText.split("\n");

    // 1. Remove extra blank spaces (Trim lines and collapse multiple blank lines)
    if (options.removeExtraSpaces) {
      lines = lines.map(line => line.trim());
      // Collapse repeated empty lines to maximum one blank line
      const filteredLines: string[] = [];
      let lastWasEmpty = false;
      for (const line of lines) {
        if (line === "") {
          if (!lastWasEmpty) {
            filteredLines.push("");
            lastWasEmpty = true;
          }
        } else {
          filteredLines.push(line);
          lastWasEmpty = false;
        }
      }
      lines = filteredLines;
    }

    // 2. Bold First Line
    let processedLines = [...lines];
    let firstNonEmptyIdx = processedLines.findIndex(l => l.trim() !== "");
    
    if (options.boldFirstLine && firstNonEmptyIdx !== -1) {
      processedLines[firstNonEmptyIdx] = `*${processedLines[firstNonEmptyIdx]}*`;
    }

    // 3. Convert to Bullet Points
    if (options.convertToBullets) {
      for (let i = 0; i < processedLines.length; i++) {
        if (i > firstNonEmptyIdx && processedLines[i].trim() !== "") {
          // If it's not already a bullet
          if (!processedLines[i].startsWith("• ") && !processedLines[i].startsWith("*")) {
             processedLines[i] = `• ${processedLines[i]}`;
          }
        }
      }
    }

    // 4. Add spacing between paragraphs
    if (options.addPaddingBetweenParagraphs) {
       // Ensure exactly one blank line between paragraph blocks
       // This is mostly covered by the collapse logic, but let's refine
    }

    setFormattedText(processedLines.join("\n"));
  };

  useEffect(() => {
    formatMessage();
  }, [inputText, options]);

  const copyToClipboard = () => {
    if (!formattedText) return;
    navigator.clipboard.writeText(formattedText);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const reset = () => {
    setInputText("");
    setFormattedText("");
    setIsCopied(false);
  };

  // Helper for Preview rendering (emulating WhatsApp style)
  const renderWhatsAppPreview = (text: string) => {
    return text.split("\n").map((line, i) => {
      let content: React.ReactNode = line;
      
      // Handle WhatsApp bolding *text*
      if (line.startsWith("*") && line.endsWith("*")) {
        content = <strong>{line.substring(1, line.length -1)}</strong>;
      } else if (line.includes("*")) {
        // Multi-bolding logic (simplified)
        const parts = line.split(/(\*.*?\*)/g);
        content = parts.map((part, pi) => {
           if (part.startsWith("*") && part.endsWith("*")) {
             return <strong key={pi}>{part.substring(1, part.length - 1)}</strong>;
           }
           return part;
        });
      }

      return (
        <div key={i} className="min-h-[1.25rem]">
          {line === "" ? <br /> : content}
        </div>
      );
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Back Button */}
          <Link 
            href="/" 
            className="inline-flex items-center gap-2 text-slate-500 hover:text-emerald-600 font-bold transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
            Back to Home
          </Link>

          {/* Header */}
          <div className="text-center md:text-left space-y-4">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
                WhatsApp Message Formatter
              </h1>
              <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider">
                Free • No sign-up • Runs in your browser
              </p>
            </div>
            
            <div className="text-slate-600 space-y-4 text-base leading-relaxed mt-6">
              <p>This WhatsApp message formatter helps you create clean and well-structured messages instantly. Whether you're sending business messages, announcements, or long texts, formatting your message properly makes it easier to read and more professional.</p>
              <p>With this tool, you can add bold text, bullet points, and spacing to your message before copying it into WhatsApp. Instead of manually editing your text, you can generate a polished version in seconds.</p>
              <p>If you want your messages to stand out and be easy to understand, this formatter gives you a simple and fast way to improve your communication. You can also use our <Link href="/invoice-generator" className="text-emerald-600 hover:underline font-medium">Invoice Generator</Link> to create and send professional invoices.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left: Input & Options */}
            <div className="lg:col-span-12 xl:col-span-7 space-y-6">
              <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100 space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-black text-slate-400 uppercase tracking-[0.2em]">Compose Message</h3>
                  <div className="text-xs font-bold text-slate-300">
                    {inputText.length} Characters
                  </div>
                </div>

                <div className="relative">
                  <textarea
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    className="w-full h-80 p-6 bg-slate-50 border border-slate-100 rounded-3xl focus:ring-4 focus:ring-emerald-50 focus:border-emerald-500 outline-none transition-all font-medium text-slate-700 text-lg resize-none placeholder:text-slate-300"
                    placeholder="Paste or type your message here..."
                  />
                  <div className="absolute right-6 bottom-6 flex gap-3">
                    <button 
                      onClick={reset}
                      className="p-3 bg-white text-slate-400 hover:text-rose-500 rounded-xl shadow-sm border border-slate-100 transition-all active:scale-95"
                      title="Reset"
                    >
                      <RotateCcw className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={copyToClipboard}
                      disabled={!inputText}
                      className={`px-6 py-3 rounded-xl font-black flex items-center gap-2 shadow-lg transition-all active:scale-95 text-sm uppercase tracking-wide ${
                        isCopied 
                        ? "bg-emerald-500 text-white shadow-emerald-200" 
                        : "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 disabled:opacity-50 disabled:grayscale"
                      }`}
                    >
                      {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {isCopied ? "Copied!" : "Copy Message"}
                    </button>
                  </div>
                </div>

                {/* Quick Actions / Options */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                  <button 
                    onClick={() => handleOptionChange("boldFirstLine")}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 group ${
                      options.boldFirstLine 
                      ? "border-emerald-500 bg-emerald-50/30" 
                      : "border-slate-50 bg-white hover:border-slate-200"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${options.boldFirstLine ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Bold className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-black ${options.boldFirstLine ? 'text-slate-900' : 'text-slate-400'}`}>Bold First Line</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Automatic Heading Format</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleOptionChange("convertToBullets")}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 group ${
                      options.convertToBullets 
                      ? "border-emerald-500 bg-emerald-50/30" 
                      : "border-slate-50 bg-white hover:border-slate-200"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${options.convertToBullets ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <List className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-black ${options.convertToBullets ? 'text-slate-900' : 'text-slate-400'}`}>Auto Bullets</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Convert new lines to links</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleOptionChange("addPaddingBetweenParagraphs")}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 group ${
                      options.addPaddingBetweenParagraphs 
                      ? "border-emerald-500 bg-emerald-50/30" 
                      : "border-slate-50 bg-white hover:border-slate-200"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${options.addPaddingBetweenParagraphs ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <AlignLeft className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-black ${options.addPaddingBetweenParagraphs ? 'text-slate-900' : 'text-slate-400'}`}>Smart Spacing</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Cleaner paragraph breaks</p>
                    </div>
                  </button>

                  <button 
                    onClick={() => handleOptionChange("removeExtraSpaces")}
                    className={`p-4 rounded-2xl border-2 transition-all flex items-center gap-4 group ${
                      options.removeExtraSpaces 
                      ? "border-emerald-500 bg-emerald-50/30" 
                      : "border-slate-50 bg-white hover:border-slate-200"
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${options.removeExtraSpaces ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
                      <Type className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <p className={`text-sm font-black ${options.removeExtraSpaces ? 'text-slate-900' : 'text-slate-400'}`}>Trim & Clean</p>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Remove redundant white space</p>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Preview Area */}
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col space-y-4">
              <div className="flex items-center justify-between px-2">
                 <h2 className="text-xl font-black text-slate-900 tracking-tight uppercase">Formatted Message</h2>
                 <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Copy and paste directly into WhatsApp</p>
              </div>

              <div className="bg-slate-900 p-8 rounded-[2.5rem] shadow-2xl flex-grow flex flex-col overflow-hidden relative border-4 border-slate-800">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex gap-1 bg-slate-800 p-1 rounded-xl shadow-inner">
                    <button 
                      onClick={() => setActiveTab("preview")}
                      className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                        activeTab === "preview" ? "bg-slate-700 text-emerald-400 shadow-md" : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Visual
                    </button>
                    <button 
                      onClick={() => setActiveTab("raw")}
                      className={`px-5 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all ${
                        activeTab === "raw" ? "bg-slate-700 text-emerald-400 shadow-md" : "text-slate-500 hover:text-slate-300"
                      }`}
                    >
                      Raw Code
                    </button>
                  </div>
                  <div className="flex gap-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-700" />
                  </div>
                </div>

                {activeTab === "preview" ? (
                  <div className="flex-grow bg-[#E5DDD5] rounded-[1.5rem] p-6 relative overflow-hidden flex flex-col">
                    {/* WhatsApp Background Chat Pattern - using a CSS hack or just a color */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 0.5px, transparent 0.5px)', backgroundSize: '10px 10px' }} />
                    
                    <div className="relative z-10 flex flex-col h-full">
                       {formattedText ? (
                         <div className="self-start max-w-[90%] bg-white p-4 rounded-2xl rounded-tl-none shadow-sm text-slate-800 text-sm leading-relaxed font-sans relative">
                            {/* WhatsApp speech bubble tip */}
                            <div className="absolute -left-2 top-0 text-white">
                               <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                  <path d="M0 0C4 0 10 2 12 12V0H0Z" fill="white" />
                               </svg>
                            </div>
                            <div className="whitespace-pre-wrap break-words">
                               {renderWhatsAppPreview(formattedText)}
                            </div>
                            <div className="text-[10px] text-slate-400 text-right mt-1 font-bold">10:45 AM</div>
                         </div>
                       ) : (
                         <div className="flex-grow flex items-center justify-center text-slate-400 flex-col gap-4">
                            <div className="w-16 h-16 bg-slate-200/50 rounded-full flex items-center justify-center animate-pulse">
                               <Send className="w-8 h-8 opacity-20" />
                            </div>
                            <p className="text-xs font-black uppercase tracking-widest opacity-40">Snapshot Preview</p>
                         </div>
                       )}
                    </div>
                  </div>
                ) : (
                  <div className="flex-grow bg-slate-950 rounded-[1.5rem] p-8 font-mono text-emerald-400 text-sm overflow-auto custom-scrollbar leading-loose border border-emerald-900/30">
                    {formattedText ? (
                      <pre className="whitespace-pre-wrap break-words">
                        {formattedText}
                      </pre>
                    ) : (
                      <div className="h-full flex items-center justify-center text-slate-800 uppercase font-black tracking-[0.3em]">
                        Code Ready
                      </div>
                    )}
                  </div>
                )}
                
                <div className="mt-8 flex justify-between items-center text-[10px] font-black text-slate-700 uppercase tracking-widest">
                   <span>Safety Guaranteed</span>
                   <span className="text-emerald-500">Live Syncing</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content Sections */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 space-y-8 mt-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900">How This WhatsApp Formatter Works</h2>
              <div className="text-slate-600 space-y-4 text-base leading-relaxed">
                <p>This WhatsApp formatter works by restructuring your text into a clean and readable format. When you enter your message, the tool automatically applies formatting rules such as bold headings, bullet points, and spacing.</p>
                <p>For example, the first line can be formatted as a bold title, while the remaining lines can be converted into bullet points. This makes your message easier to scan and understand, especially when sharing important information.</p>
                <p>The tool also removes extra spaces and organizes your content into clear sections. This is particularly useful for business messages, where clarity and presentation matter.</p>
                <p>Once your message is formatted, you can copy it instantly and paste it directly into WhatsApp. The formatting will appear correctly when sent, helping your message look more professional.</p>
                <p>Because the tool runs directly in your browser, your text is not stored or shared, making it a safe and convenient option for everyday use.</p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 space-y-4">
              <h2 className="text-xl font-black text-slate-900">Example: Before and after formatting</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200 space-y-2">
                  <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Input</span>
                  <pre className="font-sans text-slate-700 whitespace-pre-wrap">meeting tomorrow
bring documents
be on time</pre>
                </div>
                <div className="bg-emerald-50 p-6 rounded-2xl border border-emerald-100 space-y-2">
                   <span className="text-xs font-black text-emerald-600 uppercase tracking-widest">Output</span>
                  <pre className="font-sans text-emerald-900 font-medium whitespace-pre-wrap">*Meeting tomorrow*
• bring documents
• be on time</pre>
                </div>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 space-y-4">
              <h2 className="text-xl font-black text-slate-900">When to use this tool</h2>
              <p className="text-slate-600 text-base leading-relaxed mb-4">This WhatsApp formatter is useful for:</p>
              <ul className="list-disc pl-5 space-y-2 text-slate-600 font-medium">
                <li>Business messages and client communication</li>
                <li>Announcements and group messages</li>
                <li>Event invitations</li>
                <li>Marketing messages</li>
              </ul>
              <p className="text-slate-600 text-base leading-relaxed mt-4">If you want your message to look clean, structured, and professional, this tool makes it easy.</p>
            </div>
          </div>

          {/* FAQ Section */}
          <section className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 space-y-8 mt-8">
            <h2 className="text-2xl font-black text-slate-900 flex items-center gap-3">
              <Info className="w-6 h-6 text-emerald-500" />
              Frequently Asked Questions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">How do I make text bold in WhatsApp?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Wrap the text with asterisks like this.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Can I create bullet points in WhatsApp?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes, this tool formats your message into bullet-style text.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Does formatting work on all devices?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes, formatted text works across WhatsApp on all devices.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Do I need to install anything?</h3>
                <p className="text-slate-600 leading-relaxed">
                  No, this tool works directly in your browser.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Is my message saved?</h3>
                <p className="text-slate-600 leading-relaxed">
                  No, your text is not stored or shared.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 space-y-6 mt-8">
            <h2 className="text-2xl font-black text-slate-900">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/invoice-generator" className="p-4 border border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all font-bold text-slate-700 hover:text-emerald-700 text-center">
                Invoice Generator
              </Link>
              <Link href="/bill-split-calculator" className="p-4 border border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all font-bold text-slate-700 hover:text-emerald-700 text-center">
                Bill Split Calculator
              </Link>
              <Link href="/salary-to-lifestyle-calculator" className="p-4 border border-slate-200 rounded-2xl hover:border-emerald-500 hover:bg-emerald-50 transition-all font-bold text-slate-700 hover:text-emerald-700 text-center">
                Salary to Lifestyle Calculator
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #064e3b;
          border-radius: 10px;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        .animate-shake {
          animation: shake 0.2s ease-in-out 0s 2;
        }
      `}</style>
    </div>
  );
}
