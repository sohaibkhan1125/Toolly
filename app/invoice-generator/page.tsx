"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { ChevronRight, RotateCcw, Calculator, Info, ArrowLeft, Plus, Trash2, Download, FileText, User, Building, Calendar, Hash } from "lucide-react";

interface InvoiceItem {
  id: string;
  name: string;
  quantity: number;
  unitPrice: number;
}

export default function InvoiceGenerator() {
  const [businessName, setBusinessName] = useState<string>("Toolly Studio");
  const [businessEmail, setBusinessEmail] = useState<string>("hello@example.com");
  const [clientName, setClientName] = useState<string>("Ahmed Ali");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("INV-001");
  const [invoiceDate, setInvoiceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [items, setItems] = useState<InvoiceItem[]>([
    { id: "1", name: "Design Service", quantity: 1, unitPrice: 500 }
  ]);
  const [notes, setNotes] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const invoiceRef = useRef<HTMLDivElement>(null);

  const addItem = () => {
    setItems([...items, { id: Math.random().toString(36).substr(2, 9), name: "", quantity: 1, unitPrice: 0 }]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter(item => item.id !== id));
    } else {
      // Keep one empty row as per requirements
      setItems([{ id: Math.random().toString(36).substr(2, 9), name: "", quantity: 1, unitPrice: 0 }]);
    }
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);

  const reset = () => {
    setBusinessName("");
    setBusinessEmail("");
    setClientName("");
    setInvoiceNumber("");
    setInvoiceDate(new Date().toISOString().split('T')[0]);
    setItems([{ id: "1", name: "", quantity: 1, unitPrice: 0 }]);
    setNotes("");
    setError("");
  };

  const downloadPDF = async () => {
    setError("");
    if (!businessName || !clientName || !invoiceNumber || !invoiceDate) {
      setError("Please fill in all required business and client details.");
      return;
    }

    if (items.some(item => !item.name || item.quantity <= 0 || item.unitPrice < 0)) {
      setError("Please ensure all items have a name, quantity > 0, and valid price.");
      return;
    }

    setIsGenerating(true);
    try {
      const html2canvas = (await import("html2canvas")).default;
      const { jsPDF } = await import("jspdf");

      if (invoiceRef.current) {
        const canvas = await html2canvas(invoiceRef.current, {
          scale: 2,
          useCORS: true,
          logging: false,
        });
        const imgData = canvas.toDataURL("image/png");
        const pdf = new jsPDF("p", "mm", "a4");
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = pdf.internal.pageSize.getHeight();
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
        const imgX = (pdfWidth - imgWidth * ratio) / 2;
        const imgY = 10; // Margin from top

        pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
        pdf.save(`Invoice_${invoiceNumber}.pdf`);
      }
    } catch (err) {
      console.error("PDF generation failed:", err);
      setError("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50">
      <Navbar />
      
      <main className="flex-grow py-12 px-4">
        <div className="max-w-6xl mx-auto space-y-8">
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
              <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight uppercase">
                Invoice Generator
              </h1>
              <p className="text-sm font-bold text-emerald-600 uppercase tracking-wider">
                Free • No sign-up • Runs in your browser
              </p>
            </div>
            
            <div className="text-slate-600 space-y-4 text-base leading-relaxed mt-6">
              <p>Create professional invoices instantly with this free invoice generator. Whether you're a freelancer, small business owner, or working on a one-time project, this tool allows you to generate clean and simple invoices in seconds.</p>
              <p>Just enter your details, add your items, and download your invoice as a PDF. There’s no need for complicated accounting software or sign-up processes. Everything is fast, simple, and works directly in your browser.</p>
              <p>If you're looking for a quick and reliable way to create invoices online in the UAE or anywhere else, this tool gives you everything you need without unnecessary complexity. You can also use our <Link href="/whatsapp-message-formatter" className="text-blue-600 hover:underline font-medium">WhatsApp Message Formatter</Link> to send clean invoice messages to clients.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Inputs Panel */}
            <div className="space-y-8 bg-white p-8 rounded-3xl shadow-sm border border-slate-100 overflow-y-auto max-h-[1000px]">
              <div className="space-y-6">
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                  <Building className="w-5 h-5 text-blue-500" />
                  Business Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-black text-slate-500 mb-2 uppercase">Business Name *</label>
                    <input
                      type="text"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold"
                      placeholder="Toolly Studio"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-500 mb-2 uppercase">Contact Email</label>
                    <input
                      type="text"
                      value={businessEmail}
                      onChange={(e) => setBusinessEmail(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold"
                      placeholder="hello@example.com"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest flex items-center gap-2 border-t pt-8 border-slate-50">
                  <User className="w-5 h-5 text-blue-500" />
                  Client Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-1">
                    <label className="block text-xs font-black text-slate-500 mb-2 uppercase">Client Name *</label>
                    <input
                      type="text"
                      value={clientName}
                      onChange={(e) => setClientName(e.target.value)}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold"
                      placeholder="Ahmed Ali"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-500 mb-2 uppercase">Invoice # *</label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="text"
                        value={invoiceNumber}
                        onChange={(e) => setInvoiceNumber(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold"
                        placeholder="INV-001"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-black text-slate-500 mb-2 uppercase">Date *</label>
                    <div className="relative">
                      <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <input
                        type="date"
                        value={invoiceDate}
                        onChange={(e) => setInvoiceDate(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-bold"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-center justify-between border-t pt-8 border-slate-50">
                  <h2 className="text-lg font-black text-slate-800 uppercase tracking-widest flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-500" />
                    Items
                  </h2>
                  <button 
                    onClick={addItem}
                    className="flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-blue-100 transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Item
                  </button>
                </div>
                
                <div className="space-y-3">
                  {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-3 items-end">
                      <div className="col-span-6">
                        <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase">Item Name</label>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => updateItem(item.id, "name", e.target.value)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:border-blue-500 outline-none font-bold text-sm"
                          placeholder="Project task..."
                        />
                      </div>
                      <div className="col-span-2">
                        <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase">Qty</label>
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => updateItem(item.id, "quantity", parseInt(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:border-blue-500 outline-none font-bold text-sm"
                        />
                      </div>
                      <div className="col-span-3">
                        <label className="block text-[10px] font-black text-slate-400 mb-1 uppercase">Price</label>
                        <input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(item.id, "unitPrice", parseFloat(e.target.value) || 0)}
                          className="w-full px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg focus:border-blue-500 outline-none font-bold text-sm"
                        />
                      </div>
                      <div className="col-span-1 pb-1">
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="p-2 text-slate-300 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 border-t pt-8 border-slate-50">
                <div>
                  <label className="block text-xs font-black text-slate-500 mb-2 uppercase">Notes (Optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-100 focus:border-blue-500 outline-none transition-all font-medium h-24 text-sm"
                    placeholder="Thank you for your business!"
                  />
                </div>
              </div>

              {error && (
                <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm font-bold flex items-center gap-3">
                  <Info className="w-5 h-5 shrink-0" />
                  {error}
                </div>
              )}

              <div className="flex gap-4 pt-4 border-t border-slate-50">
                <button
                  onClick={downloadPDF}
                  disabled={isGenerating}
                  className="flex-grow py-4 bg-blue-600 text-white font-black rounded-2xl hover:bg-blue-700 active:scale-95 transition-all shadow-lg flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-50"
                >
                  <Download className={`w-5 h-5 ${isGenerating ? 'animate-bounce' : ''}`} />
                  {isGenerating ? 'Generating...' : 'Download PDF'}
                </button>
                <button
                  onClick={reset}
                  className="px-6 py-4 bg-slate-100 text-slate-500 font-bold rounded-2xl hover:bg-slate-200 active:scale-95 transition-all flex items-center justify-center"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
              </div>
              <p className="text-center text-sm font-medium text-slate-500 mt-6">
                Download your invoice as a clean PDF in seconds
              </p>
            </div>

            {/* Preview Panel Wrapper */}
            <div className="lg:sticky lg:top-8 space-y-4">
              <div className="text-center space-y-1">
                <h2 className="text-2xl font-black text-slate-900">Live Invoice Preview</h2>
                <p className="text-sm font-medium text-slate-500">Your invoice is generated instantly in your browser</p>
              </div>
              {/* Preview Panel Base */}
              <div className="bg-slate-200 p-8 rounded-3xl overflow-hidden shadow-inner flex justify-center h-fit">
                <div 
                ref={invoiceRef}
                className="w-full max-w-[595px] min-h-[842px] bg-white p-12 font-sans"
                style={{ color: '#334155' }}
              >
                {/* Invoice Header */}
                <div className="flex justify-between items-start mb-16">
                  <div className="space-y-4">
                    <h2 className="text-3xl font-black tracking-tight uppercase" style={{ color: '#2563eb' }}>INVOICE</h2>
                    <div className="space-y-1">
                      <p className="text-xl font-bold" style={{ color: '#0f172a' }}>{businessName || 'Business Name'}</p>
                      <p className="text-sm font-medium" style={{ color: '#94a3b8' }}>{businessEmail}</p>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#cbd5e1' }}>Invoice Date</p>
                    <p className="text-sm font-bold" style={{ color: '#475569' }}>{invoiceDate}</p>
                    <div className="pt-4">
                      <p className="text-xs font-black uppercase tracking-widest" style={{ color: '#cbd5e1' }}>Invoice #</p>
                      <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{invoiceNumber || '---'}</p>
                    </div>
                  </div>
                </div>

                {/* Bill To */}
                <div className="mb-12">
                  <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#cbd5e1' }}>Bill To:</p>
                  <p className="text-xl font-bold" style={{ color: '#0f172a' }}>{clientName || 'Client Name'}</p>
                </div>

                {/* Items Table */}
                <div className="mb-12">
                  <table className="w-full text-left">
                    <thead>
                      <tr style={{ borderBottom: '2px solid #f1f5f9' }}>
                        <th className="pb-3 text-xs font-black uppercase tracking-wider" style={{ color: '#94a3b8' }}>Item Description</th>
                        <th className="pb-3 text-xs font-black uppercase tracking-wider text-center" style={{ color: '#94a3b8' }}>Qty</th>
                        <th className="pb-3 text-xs font-black uppercase tracking-wider text-right" style={{ color: '#94a3b8' }}>Price</th>
                        <th className="pb-3 text-xs font-black uppercase tracking-wider text-right" style={{ color: '#94a3b8' }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((item, index) => (
                        <tr key={index} style={{ borderBottom: '1px solid #f8fafc' }}>
                          <td className="py-4 text-sm font-bold" style={{ color: '#1e293b' }}>{item.name || '---'}</td>
                          <td className="py-4 text-sm text-center font-medium" style={{ color: '#475569' }}>{item.quantity}</td>
                          <td className="py-4 text-sm text-right font-medium" style={{ color: '#475569' }}>AED {item.unitPrice.toLocaleString()}</td>
                          <td className="py-4 text-sm text-right font-black" style={{ color: '#0f172a' }}>AED {(item.quantity * item.unitPrice).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Total Section */}
                <div className="flex justify-end pt-8" style={{ borderTop: '2px solid #f1f5f9' }}>
                  <div className="w-48 space-y-3">
                    <div className="flex justify-between items-center" style={{ color: '#94a3b8' }}>
                      <p className="text-sm font-bold">Subtotal</p>
                      <p className="text-sm font-bold">AED {subtotal.toLocaleString()}</p>
                    </div>
                    <div className="flex justify-between items-center p-3 rounded-xl" style={{ backgroundColor: '#2563eb', color: '#ffffff' }}>
                      <p className="text-sm font-black uppercase tracking-wider">Total</p>
                      <p className="text-lg font-black">AED {subtotal.toLocaleString()}</p>
                    </div>
                  </div>
                </div>

                {/* Footer Notes */}
                {notes && (
                  <div className="mt-24 pt-8" style={{ borderTop: '1px solid #f8fafc' }}>
                    <p className="text-xs font-black uppercase tracking-widest mb-2" style={{ color: '#cbd5e1' }}>Notes:</p>
                    <p className="text-sm leading-relaxed italic" style={{ color: '#64748b' }}>{notes}</p>
                  </div>
                )}
                
                <div className="mt-auto pt-24 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: '#e2e8f0' }}>{businessName} • Generated via Toolly</p>
                </div>
              </div>
            </div>
            </div>
          </div>

          {/* Content Section: How it Works, Example & Use Cases */}
          <div className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 space-y-8 mt-12">
            <div className="space-y-4">
              <h2 className="text-2xl font-black text-slate-900">How This Invoice Generator Works</h2>
              <div className="text-slate-600 space-y-4 text-base leading-relaxed">
                <p>This invoice generator works by allowing you to input your business details, client information, and a list of items or services. Each item includes a quantity and price, which are automatically calculated to produce a total invoice amount.</p>
                <p>Once you enter all the required details, the tool generates a professional invoice layout instantly. You can preview your invoice in real time and download it as a PDF with a single click.</p>
                <p>This is especially useful for freelancers and small businesses who need a quick and efficient way to bill clients without using complex accounting software. Instead of spending time formatting invoices manually, you can create one in seconds.</p>
                <p>Because the entire process runs in your browser, your data is not stored or shared, making it a secure and convenient option. Whether you’re invoicing for services, products, or projects, this tool provides a simple solution for everyday use.</p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 space-y-4">
              <h2 className="text-xl font-black text-slate-900">Example: Invoice calculation</h2>
              <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
                <p className="text-slate-700 font-medium mb-4">If you add:</p>
                <ul className="space-y-2 text-slate-600">
                  <li className="flex justify-between items-center max-w-sm">
                    <span>Service A:</span>
                    <span className="font-bold text-slate-900">AED 500</span>
                  </li>
                  <li className="flex justify-between items-center max-w-sm">
                    <span>Service B:</span>
                    <span className="font-bold text-slate-900">AED 300</span>
                  </li>
                  <li className="flex justify-between items-center max-w-sm text-lg mt-2 pt-2 border-t border-slate-200">
                    <span>Total invoice amount:</span>
                    <span className="font-black text-blue-600">AED 800</span>
                  </li>
                </ul>
                <p className="mt-4 text-slate-700">The generator automatically calculates totals, making it fast and error-free.</p>
              </div>
            </div>

            <div className="pt-8 border-t border-slate-100 space-y-4">
              <h2 className="text-xl font-black text-slate-900">Who can use this invoice generator?</h2>
              <div className="text-slate-600 space-y-4 text-base leading-relaxed">
                <p>This tool is ideal for freelancers, consultants, small businesses, and anyone who needs to create invoices quickly. It’s especially useful for:</p>
                <ul className="list-disc pl-6 space-y-2 text-slate-700 font-medium">
                  <li>Freelancers billing clients</li>
                  <li>Small businesses managing payments</li>
                  <li>Service providers issuing invoices</li>
                </ul>
                <p>If you need a fast and simple invoice solution without subscriptions or complex systems, this tool is designed for you.</p>
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
                <h3 className="font-bold text-slate-800 text-base">Can I download the invoice as a PDF?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes, you can generate and download a clean PDF instantly.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Do I need to sign up?</h3>
                <p className="text-slate-600 leading-relaxed">
                  No, this tool is completely free and requires no registration.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Is this suitable for freelancers?</h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes, it’s ideal for freelancers and small businesses.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Can I customize the invoice?</h3>
                <p className="text-slate-600 leading-relaxed">
                  You can add your details, client information, and items.
                </p>
              </div>
              <div className="space-y-3">
                <h3 className="font-bold text-slate-800 text-base">Is my data محفوظ؟ (safe)</h3>
                <p className="text-slate-600 leading-relaxed">
                  Yes, everything runs in your browser and is not stored.
                </p>
              </div>
            </div>
          </section>

          {/* Related Tools */}
          <section className="bg-white p-10 rounded-3xl shadow-sm border border-slate-100 space-y-6 mt-8">
            <h2 className="text-2xl font-black text-slate-900">Related Tools</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Link href="/bill-split-calculator" className="p-4 border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all font-bold text-slate-700 hover:text-blue-700 text-center">
                Bill Split Calculator
              </Link>
              <Link href="/saving-planner" className="p-4 border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all font-bold text-slate-700 hover:text-blue-700 text-center">
                Savings Planner
              </Link>
              <Link href="/whatsapp-message-formatter" className="p-4 border border-slate-200 rounded-2xl hover:border-blue-500 hover:bg-blue-50 transition-all font-bold text-slate-700 hover:text-blue-700 text-center">
                WhatsApp Message Formatter
              </Link>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
