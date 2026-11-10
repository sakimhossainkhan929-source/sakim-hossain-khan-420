import React, { useState } from 'react';
import { 
  FilePlus2, 
  UserCheck, 
  UserPlus, 
  FileEdit, 
  Printer, 
  Search, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  Database, 
  Users, 
  Headphones, 
  QrCode,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { ServiceType } from '../types';

interface ServicesGridProps {
  onSelectService: (service: ServiceType) => void;
  onOpenTracking: () => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({
  onSelectService,
  onOpenTracking
}) => {
  const [activeQrModal, setActiveQrModal] = useState(false);

  return (
    <section className="py-10 px-4 sm:px-6 max-w-7xl mx-auto space-y-10">
      {/* Section Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 px-4 py-1.5 rounded-full gold-badge-gradient text-xs sm:text-sm font-black tracking-wide uppercase shadow-md">
          <span>★</span>
          <span>SAKIM Digital Seva Kendra Services</span>
          <span>★</span>
        </div>
        <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-500/60 via-blue-500/30 to-transparent"></div>
        <span className="text-xs text-amber-300 hidden sm:inline-block font-semibold">
          Fast • Paperless • Assisted Facilitation
        </span>
      </div>

      {/* 6 Cards Grid (Matching Image 2) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. New PAN Application */}
        <div className="group relative rounded-2xl bg-gradient-to-b from-[#0d2258] to-[#071333] border-2 border-blue-600/50 hover:border-amber-400 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/20 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                Form 49A
              </span>
              <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                New PAN Application
              </h3>
              <p className="text-xs text-slate-300">
                Apply for fresh Permanent Account Number card for first-time Indian citizens.
              </p>
            </div>
            {/* Visual Icon / Miniature Card */}
            <div className="w-14 h-14 rounded-xl bg-blue-900/60 border border-blue-500/40 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
              <FilePlus2 className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-blue-900/60 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Delivery in 7-10 Days
            </span>
            <button
              onClick={() => onSelectService('new_pan')}
              className="gold-btn px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-md group-hover:shadow-amber-400/30"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 2. Minor PAN Application (With Child's Photo) */}
        <div className="group relative rounded-2xl bg-gradient-to-b from-[#0d2258] to-[#071333] border-2 border-amber-500/60 hover:border-amber-300 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/25 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded">
                Age Below 18 Years
              </span>
              <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                Minor PAN Application
              </h3>
              <p className="text-xs text-slate-300">
                For Minor / Child with Representative Assessee (Parent / Guardian) authentication.
              </p>
            </div>
            {/* Child Photo Avatar (Requirement: Minor PAN image showing a child) */}
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-400 shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <img 
                src="https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=300&q=80" 
                alt="Child Applicant" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-blue-900/60 flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-300 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Parent/Guardian Sign
            </span>
            <button
              onClick={() => onSelectService('minor_pan')}
              className="gold-btn px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-md group-hover:shadow-amber-400/30"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 3. Major PAN Application (With Adult Man in Suit Photo) */}
        <div className="group relative rounded-2xl bg-gradient-to-b from-[#0d2258] to-[#071333] border-2 border-blue-600/50 hover:border-amber-400 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/20 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded">
                Minor to Adult Upgrade
              </span>
              <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                Major PAN Application
              </h3>
              <p className="text-xs text-slate-300">
                Update Minor PAN card to Major after turning 18 with adult photograph and signature.
              </p>
            </div>
            {/* Adult Man Photo Avatar (Requirement: Major PAN showing an adult man) */}
            <div className="w-16 h-16 rounded-xl overflow-hidden border-2 border-amber-400 shrink-0 shadow-lg group-hover:scale-105 transition-transform">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80" 
                alt="Adult Applicant" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-blue-900/60 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5" />
              Upload Own Signature
            </span>
            <button
              onClick={() => onSelectService('major_pan')}
              className="gold-btn px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-md group-hover:shadow-amber-400/30"
            >
              <span>Apply Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 4. PAN Correction / Update */}
        <div className="group relative rounded-2xl bg-gradient-to-b from-[#0d2258] to-[#071333] border-2 border-blue-600/50 hover:border-amber-400 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/20 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                Changes & Corrections
              </span>
              <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                PAN Correction
              </h3>
              <p className="text-xs text-slate-300">
                Correct Name, Date of Birth, Father's Name, Photo, Signature, or Residential Address.
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-amber-500/10 border border-amber-500/40 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
              <FileEdit className="w-8 h-8 text-amber-400" />
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-blue-900/60 flex items-center justify-between">
            <span className="text-xs font-semibold text-blue-300 flex items-center gap-1">
              Retain Existing PAN
            </span>
            <button
              onClick={() => onSelectService('correction')}
              className="gold-btn px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-md group-hover:shadow-amber-400/30"
            >
              <span>Update Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 5. PAN Reprint (Duplicate PAN) */}
        <div className="group relative rounded-2xl bg-gradient-to-b from-[#0d2258] to-[#071333] border-2 border-blue-600/50 hover:border-amber-400 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/20 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-purple-300 bg-purple-500/20 px-2 py-0.5 rounded">
                Duplicate Card
              </span>
              <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                PAN Reprint
              </h3>
              <p className="text-xs text-slate-300">
                Request physical reprint for lost, stolen, or physically damaged PAN cards without changes.
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-purple-500/10 border border-purple-500/40 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
              <Printer className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-blue-900/60 flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 flex items-center gap-1">
              Direct Doorstep Dispatch
            </span>
            <button
              onClick={() => onSelectService('reprint')}
              className="gold-btn px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-md group-hover:shadow-amber-400/30"
            >
              <span>Request Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* 6. Track Application Status */}
        <div className="group relative rounded-2xl bg-gradient-to-b from-[#0d2258] to-[#071333] border-2 border-cyan-500/50 hover:border-amber-400 p-5 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-amber-500/20 flex flex-col justify-between">
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-cyan-300 bg-cyan-500/20 px-2 py-0.5 rounded">
                Live Status Tracker
              </span>
              <h3 className="text-lg font-black text-white group-hover:text-amber-300 transition-colors">
                Track Application
              </h3>
              <p className="text-xs text-slate-300">
                Enter your 15-digit acknowledgement number or SAKIM Application ID to check live status.
              </p>
            </div>
            <div className="w-14 h-14 rounded-xl bg-cyan-500/10 border border-cyan-500/40 p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform shadow-inner">
              <Search className="w-8 h-8 text-cyan-400" />
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-blue-900/60 flex items-center justify-between">
            <span className="text-xs font-semibold text-cyan-300 flex items-center gap-1">
              Real-time Post Tracking
            </span>
            <button
              onClick={onOpenTracking}
              className="gold-btn px-4 py-1.5 rounded-xl text-xs font-black flex items-center gap-1 shadow-md group-hover:shadow-amber-400/30"
            >
              <span>Track Now</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Payment Methods Bar & Key Features (Matching Image 2 Bottom Layout) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
        {/* Left: Key Features Bar (7 Columns) */}
        <div className="lg:col-span-8 bg-[#09163e]/90 rounded-2xl border border-amber-500/30 p-4 sm:p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">★ Our Key Features</span>
            <div className="h-px flex-1 bg-blue-800"></div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
            <div className="p-2 rounded-xl bg-blue-950/60 border border-blue-800/40 space-y-1">
              <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
              <p className="text-xs font-bold text-white">100% Secure</p>
              <p className="text-[10px] text-slate-400">& Encrypted</p>
            </div>

            <div className="p-2 rounded-xl bg-blue-950/60 border border-blue-800/40 space-y-1">
              <Zap className="w-5 h-5 text-amber-400 mx-auto" />
              <p className="text-xs font-bold text-white">Instant Process</p>
              <p className="text-[10px] text-slate-400">& Quick Response</p>
            </div>

            <div className="p-2 rounded-xl bg-blue-950/60 border border-amber-500/40 space-y-1">
              <Database className="w-5 h-5 text-amber-400 mx-auto animate-pulse" />
              <p className="text-xs font-bold text-amber-300">Virtual Memory</p>
              <p className="text-[10px] text-slate-300">(Save Your Data)</p>
            </div>

            <div className="p-2 rounded-xl bg-blue-950/60 border border-blue-800/40 space-y-1">
              <Users className="w-5 h-5 text-purple-400 mx-auto" />
              <p className="text-xs font-bold text-white">Trusted by</p>
              <p className="text-[10px] text-slate-400">Millions</p>
            </div>

            <div className="p-2 rounded-xl bg-blue-950/60 border border-blue-800/40 space-y-1 col-span-2 sm:col-span-1">
              <Headphones className="w-5 h-5 text-blue-400 mx-auto" />
              <p className="text-xs font-bold text-white">24x7 Support</p>
              <p className="text-[10px] text-slate-400">Helpdesk</p>
            </div>
          </div>
        </div>

        {/* Right: Payment Methods Box (4 Columns) */}
        <div className="lg:col-span-4 bg-[#09163e]/90 rounded-2xl border border-amber-500/40 p-4 sm:p-5 shadow-xl backdrop-blur-md">
          <div className="flex items-center justify-between mb-3">
            <span className="text-amber-400 text-xs font-bold uppercase tracking-wider">Payment Methods</span>
            <span className="text-[10px] text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-800 font-semibold">
              Instant Confirm
            </span>
          </div>

          <div className="flex items-center justify-between gap-3">
            {/* Accepted UPI logos */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-white text-slate-900 font-black text-xs shadow">UPI</span>
                <span className="px-2 py-1 rounded bg-[#002e6e] text-cyan-300 font-bold text-xs shadow">Paytm</span>
                <span className="px-2 py-1 rounded bg-white text-slate-800 font-bold text-xs shadow">G Pay</span>
                <span className="px-2 py-1 rounded bg-[#5f259f] text-white font-bold text-xs shadow">PhonePe</span>
              </div>
              <p className="text-[11px] text-slate-300">
                Official PAN Application Fee: <strong className="text-amber-300">₹107</strong> (All inclusive)
              </p>
            </div>

            {/* QR Code preview */}
            <div 
              onClick={() => setActiveQrModal(true)}
              className="cursor-pointer group flex flex-col items-center bg-white p-1.5 rounded-xl border border-amber-400 shadow-md shrink-0 hover:scale-105 transition-transform"
            >
              <QrCode className="w-10 h-10 text-slate-900" />
              <span className="text-[8px] font-black text-slate-900 uppercase tracking-tighter">Scan & Pay</span>
            </div>
          </div>
        </div>
      </div>

      {/* Digital India Bottom Strip (Matching Image 2 footer) */}
      <div className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-950 via-[#0a1844] to-blue-950 border border-amber-500/30 text-center shadow-lg">
        <p className="text-xs sm:text-sm font-black tracking-widest text-amber-300 uppercase font-cinzel">
          ★ Digital India... Secure India... Better India... ★
        </p>
      </div>

      {/* Quick QR code modal */}
      {activeQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-[#09173f] border-2 border-amber-400 p-6 text-center space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white">SAKIM UPI Instant QR</h3>
            <p className="text-xs text-slate-300">Scan using any UPI app to pay PAN application fee</p>
            
            <div className="p-4 bg-white rounded-2xl mx-auto w-52 h-52 flex flex-col items-center justify-center shadow-inner">
              <QrCode className="w-40 h-40 text-slate-950" />
              <span className="text-[10px] font-mono font-bold text-slate-600 mt-1">UPI ID: sakimpan@icici</span>
            </div>

            <p className="text-xs text-amber-300 font-bold">Standard Fee: ₹107.00</p>
            <button
              onClick={() => setActiveQrModal(false)}
              className="w-full gold-btn py-2 rounded-xl text-xs font-bold"
            >
              Close QR Preview
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
