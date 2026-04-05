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
          <div className="text-center space-y-3">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-full text-sm font-bold border border-emerald-100 shadow-sm">
              <MessageSquare className="w-4 h-4" />
              Messaging Professional
            </div>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              WhatsApp <span className="text-emerald-600">Formatter</span>
            </h1>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Structure your messages with professional bold headings and neat bullet points ready for WhatsApp sharing.
            </p>
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
                        : "bg-slate-900 text-white shadow-slate-200 disabled:opacity-50 disabled:grayscale"
                      }`}
                    >
                      {isCopied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                      {isCopied ? "Copied!" : "Copy Formatted"}
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
            <div className="lg:col-span-12 xl:col-span-5 flex flex-col">
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

          {/* Tips & FAQ Section */}
          <section className="bg-white p-12 rounded-[3.5rem] shadow-sm border border-slate-100 space-y-16">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-6">
                   <div className="flex items-center gap-4">
                      <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                          <Info className="w-8 h-8" />
                      </div>
                      <div>
                         <h2 className="text-2xl font-black text-slate-900 tracking-tight">Pro Styling Guide</h2>
                         <p className="text-slate-400 font-bold">Manual formatting symbols.</p>
                      </div>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Bold</p>
                         <p className="text-sm font-mono text-slate-700">*text*</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Italic</p>
                         <p className="text-sm font-mono text-slate-700">_text_</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Strikethrough</p>
                         <p className="text-sm font-mono text-slate-700">~text~</p>
                      </div>
                      <div className="p-4 bg-slate-50 rounded-2xl space-y-2">
                         <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Monospace</p>
                         <p className="text-sm font-mono text-slate-700">```text```</p>
                      </div>
                   </div>
                </div>

                <div className="space-y-8">
                   <h2 className="text-2xl font-black text-slate-900 tracking-tight">Frequently Asked Questions</h2>
                   <div className="space-y-6">
                      <div className="space-y-2">
                         <h3 className="font-bold text-slate-800 text-base">How do I format text for WhatsApp?</h3>
                         <p className="text-slate-500 leading-relaxed font-medium text-sm">
                            WhatsApp uses specific symbols like asterisks for bold (*text*) and underscores for italics (_text_). Our tool automates this so you don't have to remember the codes.
                         </p>
                      </div>
                      <div className="space-y-2">
                         <h3 className="font-bold text-slate-800 text-base">Can I make bullet points in WhatsApp?</h3>
                         <p className="text-slate-500 leading-relaxed font-medium text-sm">
                            Yes! While WhatsApp doesn't have a "bullet button," using a bullet symbol (•) or a hyphen (-) at the start of a line creates a list. Our formatter adds professional bullets automatically.
                         </p>
                      </div>
                      <div className="space-y-2">
                         <h3 className="font-bold text-slate-800 text-base">How do I copy formatted text?</h3>
                         <p className="text-slate-500 leading-relaxed font-medium text-sm">
                            Once you've typed your message and selected your options, simply click the "Copy Formatted" button. The text, including all hidden WhatsApp symbols, will be saved to your clipboard.
                         </p>
                      </div>
                   </div>
                </div>
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
