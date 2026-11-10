import React, { useState } from 'react';
import { 
  FilePlus2, 
  RefreshCw, 
  Crown, 
  FileEdit, 
  Printer, 
  Search, 
  Lock, 
  Eye, 
  EyeOff, 
  User, 
  KeyRound, 
  ShieldCheck, 
  Zap, 
  Database, 
  Users, 
  Headphones, 
  CheckCircle2, 
  Sparkles,
  ArrowRight,
  Shield,
  UserPlus,
  Download,
  CreditCard,
  QrCode,
  FileText,
  Clock,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { ServiceType, UserRole } from '../types';

interface PortalMainViewProps {
  onSelectService: (service: ServiceType) => void;
  onOpenTracking: () => void;
  onLogin: (identifier: string, role: UserRole) => void;
  onOpenRegister: () => void;
  onOpenForgotPassword: () => void;
  onOpenQR: () => void;
}

export const PortalMainView: React.FC<PortalMainViewProps> = ({
  onSelectService,
  onOpenTracking,
  onLogin,
  onOpenRegister,
  onOpenForgotPassword,
  onOpenQR
}) => {
  const [mobileNumber, setMobileNumber] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [selectedPaymentProvider, setSelectedPaymentProvider] = useState<string | null>(null);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!mobileNumber.trim()) {
      setLoginError('Please enter Mobile Number or Email');
      return;
    }
    if (!password) {
      setLoginError('Please enter Password');
      return;
    }
    setLoginError('');
    onLogin(mobileNumber, 'customer');
  };

  const handleQuickDemo = (role: 'customer' | 'admin') => {
    if (role === 'customer') {
      setMobileNumber('9876543210');
      setPassword('user123');
      onLogin('9876543210', 'customer');
    } else {
      onLogin('admin@sakim.com', 'admin');
    }
  };

  return (
    <div className="w-full space-y-5 pb-8">
      {/* ─────────────────────────────────────────────────────────────────
          1. MAIN HERO BANNER (CLEAN DIGITAL PAN CARD - NO HUMAN PHOTO)
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden rounded-b-3xl border-b-2 border-amber-500/60 shadow-2xl bg-gradient-to-b from-[#081b4e] via-[#051136] to-[#030920]">
        {/* Glow Halos & Floating Lighting */}
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(ellipse_at_top,#1e40af_0%,#091d5a_50%,#03091e_100%)]"></div>
        <div className="absolute top-2 left-1/3 w-80 h-80 bg-blue-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute top-8 right-1/4 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6 sm:py-8 relative z-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
          
          {/* Left: Clean 3D Geometric Digital PAN Card (NO HUMAN PHOTO) */}
          <div className="md:col-span-4 flex justify-center md:justify-start">
            <div className="relative w-72 sm:w-80 transform -rotate-2 hover:rotate-0 transition-transform duration-300 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] group">
              {/* Outer Golden Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-amber-400 via-blue-400 to-amber-500 rounded-2xl blur-md opacity-70 group-hover:opacity-100 transition-opacity"></div>

              {/* Digital PAN Card Body */}
              <div className="relative rounded-2xl bg-gradient-to-br from-[#1e3a8a] via-[#172554] to-[#0f172a] p-4 text-white border-2 border-amber-400/90 shadow-2xl overflow-hidden">
                {/* Guilloche Wave lines pattern */}
                <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#60a5fa_1px,transparent_1px)] [background-size:8px_8px]"></div>

                {/* Card Top Row */}
                <div className="flex items-center justify-between border-b border-amber-400/40 pb-2 relative z-10">
                  <div className="flex items-center gap-1.5">
                    <div className="w-6 h-6 rounded-lg bg-amber-400 text-slate-950 flex items-center justify-center font-cinzel font-black text-[10px] shadow">
                      S
                    </div>
                    <div>
                      <p className="font-cinzel text-[10px] font-black tracking-wider text-amber-300">
                        SAKIM DIGITAL
                      </p>
                      <p className="text-[7px] text-blue-200 tracking-tight">DIGITAL SEVA PORTAL</p>
                    </div>
                  </div>

                  <span className="text-[8px] font-mono text-emerald-300 font-bold bg-emerald-950/80 border border-emerald-500/60 px-1.5 py-0.5 rounded">
                    DIGITAL PAN
                  </span>
                </div>

                {/* Gold EMV Chip & Geometric Security Seal (Replaces human photo) */}
                <div className="grid grid-cols-12 gap-2 mt-3 items-center relative z-10">
                  {/* Left: Metallic EMV Smart Chip */}
                  <div className="col-span-4 flex flex-col items-center gap-1.5">
                    <div className="w-12 h-10 rounded-md bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-600 p-0.5 shadow-md border border-amber-200/80 flex flex-col justify-between">
                      <div className="flex justify-between h-2 border-b border-amber-700/40">
                        <span className="w-3 border-r border-amber-700/40"></span>
                        <span className="w-3"></span>
                      </div>
                      <div className="h-2 border-b border-amber-700/40"></div>
                      <div className="flex justify-between h-2">
                        <span className="w-3 border-r border-amber-700/40"></span>
                        <span className="w-3"></span>
                      </div>
                    </div>

                    <div className="w-12 py-0.5 rounded bg-blue-900/60 border border-blue-400/40 text-center">
                      <span className="text-[6.5px] font-mono text-amber-300 font-bold">SECURE ID</span>
                    </div>
                  </div>

                  {/* Right: Card Details */}
                  <div className="col-span-8 space-y-1 text-left pl-1">
                    <div>
                      <p className="text-[7px] font-bold uppercase text-slate-400 tracking-wider">
                        Permanent Account Number
                      </p>
                      <p className="font-mono text-sm sm:text-base font-black text-amber-300 tracking-widest drop-shadow">
                        ABCDE1234F
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-1 text-[7.5px] text-slate-300 pt-0.5">
                      <div>
                        <span className="text-[6px] text-slate-400 uppercase block">Holder</span>
                        <strong className="text-white">SAKIM CITIZEN</strong>
                      </div>
                      <div>
                        <span className="text-[6px] text-slate-400 uppercase block">Valid Thru</span>
                        <strong className="text-white">PERMANENT</strong>
                      </div>
                    </div>

                    <div className="pt-1 border-t border-blue-700/40 flex justify-between items-center text-[7px] text-blue-200">
                      <span className="font-semibold">Assisted Processing</span>
                      <span className="text-emerald-400 font-bold">✔ VERIFIED</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center: Glowing SAKIM Heading & Banners */}
          <div className="md:col-span-5 text-center space-y-2.5">
            {/* Glowing Golden Ring around title */}
            <div className="relative inline-block">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-none">
                <span className="block font-cinzel gold-3d-text uppercase">
                  Sakim
                </span>
                <span className="block text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white mt-1 drop-shadow-md">
                  Digital Seva Kendra
                </span>
              </h1>
            </div>

            {/* Slogan Pill matching reference */}
            <div className="inline-block px-5 py-1.5 rounded-full gold-badge-gradient text-xs sm:text-sm font-black tracking-wider uppercase shadow-xl border border-amber-300">
              Your One Stop Digital Solution
            </div>

            <div className="flex items-center justify-center gap-2 text-xs font-bold text-amber-300">
              <span>★ Fast</span>
              <span>•</span>
              <span>Secure</span>
              <span>•</span>
              <span>Reliable ★</span>
            </div>

            {/* Cursive Tagline */}
            <p className="font-script text-2xl sm:text-3xl text-amber-300 font-normal tracking-wide drop-shadow">
              Welcome to Our Portal
            </p>
          </div>

          {/* Right: SAKIM Seal & Green Checkmarks */}
          <div className="md:col-span-3 flex flex-col items-center md:items-end text-center md:text-right space-y-2.5">
            {/* Laurel Crest Emblem */}
            <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow-xl shadow-amber-500/20">
              <div className="w-full h-full bg-[#08153b] rounded-[14px] flex flex-col items-center justify-center p-1 border border-amber-400/50">
                <span className="text-[8px] text-amber-300 font-bold">★ ★ ★</span>
                <span className="text-[11px] font-black font-cinzel text-amber-300 tracking-wider">SAKIM</span>
                <Shield className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20 -mt-0.5" />
              </div>
            </div>
            <span className="text-[10px] font-bold text-amber-300 uppercase tracking-widest font-cinzel">
              Digital India Initiative
            </span>

            {/* 3 Green Badges */}
            <div className="space-y-1 text-xs font-bold text-white text-left">
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-[9px] shadow">
                  ✓
                </div>
                <span>Fast & Secure Process</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-[9px] shadow">
                  ✓
                </div>
                <span>100% Genuine Assistance</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-4 h-4 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 font-black text-[9px] shadow">
                  ✓
                </div>
                <span>Virtual Memory Auto-Save</span>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          2. MAIN BODY: 2 COLUMNS
             Left: CIRCULAR / ROUNDED 3D PAN SERVICES + KEY FEATURES
             Right: CUSTOMER LOGIN + SEPARATE PAYMENT METHODS SECTION
      ───────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-3 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
          
          {/* ═══════════════════════════════════════════════════════════════
              LEFT COLUMN: CIRCULAR & ROUNDED 3D PAN SERVICES (~70-74%)
          ═══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-8 space-y-5">
            {/* Ribbon Header: ★ Our PAN Services */}
            <div className="flex items-center gap-3">
              <div className="inline-flex items-center gap-1.5 px-4 py-1 rounded-full gold-badge-gradient text-xs sm:text-sm font-black tracking-wide uppercase shadow-md">
                <span>★</span>
                <span>Our Digital Seva Services</span>
              </div>
              <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-500/70 via-blue-500/40 to-transparent"></div>
              <span className="text-xs text-amber-300 font-bold hidden sm:inline">
                Click any service to start
              </span>
            </div>

            {/* 3x2 Grid of Circular 3D PAN Service Buttons (Requirement 4) */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3.5 sm:gap-4">
              
              {/* 1. New PAN Apply (Circular 3D Icon with Glowing Gold Border) */}
              <div 
                onClick={() => onSelectService('new_pan')}
                className="rounded-service-tile rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer group"
              >
                {/* Large 3D Circular Button */}
                <div className="circular-service-btn w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-500 text-white mb-2.5 relative">
                  <FilePlus2 className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 text-slate-950 font-black text-[11px] flex items-center justify-center shadow">
                    +
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                  New PAN Apply
                </h3>
                <p className="text-[10px] text-cyan-200 mt-0.5">Form 49A Online</p>
                <span className="mt-2 text-[10px] font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                  Apply Now »
                </span>
              </div>

              {/* 2. Minor PAN (Circular 3D Icon with Glowing Gold Border) */}
              <div 
                onClick={() => onSelectService('minor_pan')}
                className="rounded-service-tile rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer group border-amber-400"
              >
                <div className="circular-service-btn w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-amber-600 via-yellow-500 to-amber-400 text-slate-950 mb-2.5 relative">
                  <User className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow text-slate-950" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-blue-950 text-amber-300 font-bold text-[9px] flex items-center justify-center border border-amber-400">
                    &lt;18
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                  Minor PAN
                </h3>
                <p className="text-[10px] text-cyan-200 mt-0.5">For Minor / Child</p>
                <span className="mt-2 text-[10px] font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                  Apply Now »
                </span>
              </div>

              {/* 3. Major PAN (Circular 3D Icon with Glowing Gold Border) */}
              <div 
                onClick={() => onSelectService('major_pan')}
                className="rounded-service-tile rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer group"
              >
                <div className="circular-service-btn w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-purple-700 via-indigo-600 to-blue-500 text-white mb-2.5 relative">
                  <Crown className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow text-amber-300" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                    18+
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                  Major PAN
                </h3>
                <p className="text-[10px] text-cyan-200 mt-0.5">For Major Changes</p>
                <span className="mt-2 text-[10px] font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                  Apply Now »
                </span>
              </div>

              {/* 4. PAN Correction (Circular 3D Icon with Glowing Gold Border) */}
              <div 
                onClick={() => onSelectService('correction')}
                className="rounded-service-tile rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer group"
              >
                <div className="circular-service-btn w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-emerald-600 via-teal-500 to-cyan-500 text-white mb-2.5 relative">
                  <FileEdit className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow text-white" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-black text-[9px] flex items-center justify-center">
                    ✎
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                  PAN Correction
                </h3>
                <p className="text-[10px] text-cyan-200 mt-0.5">Update Your Details</p>
                <span className="mt-2 text-[10px] font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                  Update Now »
                </span>
              </div>

              {/* 5. PAN Reprint (Circular 3D Icon with Glowing Gold Border) */}
              <div 
                onClick={() => onSelectService('reprint')}
                className="rounded-service-tile rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer group"
              >
                <div className="circular-service-btn w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-rose-600 via-pink-600 to-purple-600 text-white mb-2.5 relative">
                  <Printer className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow text-white" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-cyan-400 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                    2x
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                  PAN Reprint
                </h3>
                <p className="text-[10px] text-cyan-200 mt-0.5">Get Duplicate PAN</p>
                <span className="mt-2 text-[10px] font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                  Request Now »
                </span>
              </div>

              {/* 6. Track Application (Circular 3D Icon with Glowing Gold Border) */}
              <div 
                onClick={onOpenTracking}
                className="rounded-service-tile rounded-2xl p-4 flex flex-col items-center text-center cursor-pointer group"
              >
                <div className="circular-service-btn w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center bg-gradient-to-tr from-blue-700 via-indigo-600 to-cyan-500 text-white mb-2.5 relative">
                  <Search className="w-8 h-8 sm:w-9 sm:h-9 drop-shadow text-white" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 text-slate-950 font-bold text-[9px] flex items-center justify-center animate-ping"></span>
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-emerald-400 text-slate-950 font-bold text-[9px] flex items-center justify-center">
                    ●
                  </span>
                </div>
                <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                  Track Application
                </h3>
                <p className="text-[10px] text-cyan-200 mt-0.5">Check Your Status</p>
                <span className="mt-2 text-[10px] font-bold text-amber-400 group-hover:translate-x-0.5 transition-transform inline-flex items-center gap-0.5">
                  Track Now »
                </span>
              </div>

            </div>

            {/* Additional Assisted Services (Matching rich multi-service reference) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-1">
              <div 
                onClick={onOpenTracking}
                className="p-2.5 rounded-xl bg-blue-950/70 hover:bg-blue-900 border border-blue-800/60 hover:border-amber-400 cursor-pointer flex items-center gap-2.5 transition"
              >
                <Download className="w-5 h-5 text-emerald-400 shrink-0" />
                <div className="text-left text-xs">
                  <p className="font-bold text-white leading-tight">E-PAN Download</p>
                  <p className="text-[9px] text-slate-400">Instant PDF Copy</p>
                </div>
              </div>

              <div 
                onClick={() => onSelectService('new_pan')}
                className="p-2.5 rounded-xl bg-blue-950/70 hover:bg-blue-900 border border-blue-800/60 hover:border-amber-400 cursor-pointer flex items-center gap-2.5 transition"
              >
                <FileText className="w-5 h-5 text-amber-400 shrink-0" />
                <div className="text-left text-xs">
                  <p className="font-bold text-white leading-tight">Form 49A Print</p>
                  <p className="text-[9px] text-slate-400">Assisted Filing</p>
                </div>
              </div>

              <div 
                onClick={onOpenTracking}
                className="p-2.5 rounded-xl bg-blue-950/70 hover:bg-blue-900 border border-blue-800/60 hover:border-amber-400 cursor-pointer flex items-center gap-2.5 transition"
              >
                <ShieldCheck className="w-5 h-5 text-cyan-400 shrink-0" />
                <div className="text-left text-xs">
                  <p className="font-bold text-white leading-tight">Link Aadhaar-PAN</p>
                  <p className="text-[9px] text-slate-400">Status Verification</p>
                </div>
              </div>

              <div 
                onClick={onOpenQR}
                className="p-2.5 rounded-xl bg-blue-950/70 hover:bg-blue-900 border border-blue-800/60 hover:border-amber-400 cursor-pointer flex items-center gap-2.5 transition"
              >
                <CreditCard className="w-5 h-5 text-purple-400 shrink-0" />
                <div className="text-left text-xs">
                  <p className="font-bold text-white leading-tight">Official Fee ₹107</p>
                  <p className="text-[9px] text-slate-400">Tax Invoice Slip</p>
                </div>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                LATEST UPDATES TICKER (MATCHING REFERENCE IMAGE TICKER)
            ───────────────────────────────────────────────────────────── */}
            <div className="rounded-2xl bg-[#071333] border border-blue-900 p-3 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
                  <span className="text-xs font-black text-amber-400 uppercase tracking-wider">
                    Latest Updates & Announcements
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">November 2026</span>
              </div>

              <div className="space-y-1.5 text-xs">
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-blue-950/60 border border-blue-900/60">
                  <span className="px-1.5 py-0.2 rounded bg-red-600 text-white font-black text-[9px] uppercase">
                    NEW
                  </span>
                  <span className="text-slate-200">
                    Assisted PAN allocation processing window updated to 48-72 working hours.
                  </span>
                </div>
                <div className="flex items-center gap-2 p-1.5 rounded-lg bg-blue-950/60 border border-blue-900/60">
                  <span className="px-1.5 py-0.2 rounded bg-amber-500 text-slate-950 font-black text-[9px] uppercase">
                    NEW
                  </span>
                  <span className="text-slate-200">
                    Minor-to-Major PAN conversion now supports direct digital photo and signature upload.
                  </span>
                </div>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                ★ OUR KEY FEATURES (5 Feature Badges)
            ───────────────────────────────────────────────────────────── */}
            <div className="space-y-2 pt-1">
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center gap-1 px-3 py-0.5 rounded-full gold-badge-gradient text-[11px] font-black uppercase shadow">
                  <span>★</span>
                  <span>Our Key Features</span>
                </div>
                <div className="h-px flex-1 bg-blue-800/60"></div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 text-center">
                <div className="rounded-service-tile rounded-xl p-2.5 space-y-1">
                  <ShieldCheck className="w-5 h-5 text-emerald-400 mx-auto" />
                  <p className="text-[11px] font-bold text-white leading-tight">100% Secure</p>
                  <p className="text-[9px] text-slate-400">& Encrypted</p>
                </div>

                <div className="rounded-service-tile rounded-xl p-2.5 space-y-1">
                  <Zap className="w-5 h-5 text-amber-400 mx-auto" />
                  <p className="text-[11px] font-bold text-white leading-tight">Instant Process</p>
                  <p className="text-[9px] text-slate-400">& Quick Response</p>
                </div>

                <div className="rounded-service-tile rounded-xl p-2.5 space-y-1 border-amber-400/80">
                  <Database className="w-5 h-5 text-amber-400 mx-auto animate-pulse" />
                  <p className="text-[11px] font-bold text-amber-300 leading-tight">Virtual Memory</p>
                  <p className="text-[9px] text-slate-400">(Save Your Data)</p>
                </div>

                <div className="rounded-service-tile rounded-xl p-2.5 space-y-1">
                  <Users className="w-5 h-5 text-purple-400 mx-auto" />
                  <p className="text-[11px] font-bold text-white leading-tight">Trusted by</p>
                  <p className="text-[9px] text-slate-400">Millions</p>
                </div>

                <div className="rounded-service-tile rounded-xl p-2.5 space-y-1 col-span-2 sm:col-span-1">
                  <Headphones className="w-5 h-5 text-blue-400 mx-auto" />
                  <p className="text-[11px] font-bold text-white leading-tight">24x7 Support</p>
                  <p className="text-[9px] text-slate-400">Helpdesk</p>
                </div>
              </div>
            </div>

          </div>

          {/* ═══════════════════════════════════════════════════════════════
              RIGHT COLUMN: CUSTOMER LOGIN + SEPARATE PAYMENT SECTION (~26-30%)
          ═══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-4 space-y-4">
            
            {/* ─────────────────────────────────────────────────────────────
                1. CUSTOMER LOGIN BOX (Requirement 2)
            ───────────────────────────────────────────────────────────── */}
            <div className="relative rounded-3xl bg-gradient-to-b from-[#0f2357] via-[#09173f] to-[#050d26] p-4 sm:p-5 border-2 border-amber-400 shadow-2xl neon-blue-glow">
              
              {/* Header with Golden Padlock */}
              <div className="flex items-center justify-between mb-3.5 pb-2 border-b border-blue-800/80">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg bg-amber-400/20 text-amber-400 flex items-center justify-center border border-amber-400/40">
                    <Lock className="w-4 h-4 fill-amber-400/30" />
                  </div>
                  <h2 className="text-base sm:text-lg font-black text-white tracking-wide">
                    Customer Login
                  </h2>
                </div>

                <button
                  type="button"
                  onClick={() => handleQuickDemo('admin')}
                  className="text-[10px] text-amber-300 bg-blue-950/80 hover:bg-blue-900 border border-amber-500/40 px-2 py-0.5 rounded font-bold"
                  title="Switch to Admin login"
                >
                  Admin Login
                </button>
              </div>

              {loginError && (
                <div className="mb-3 p-2 rounded-lg bg-red-950/80 border border-red-500 text-red-200 text-xs font-semibold">
                  {loginError}
                </div>
              )}

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-3">
                {/* Mobile Number / Identifier */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <User className="w-4 h-4" />
                    </div>
                    <input
                      type="text"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value)}
                      placeholder="Mobile Number"
                      className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-[#040b20] border border-blue-700/80 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-xs sm:text-sm text-white placeholder-slate-400 font-medium"
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      className="w-full pl-9 pr-9 py-2.5 rounded-xl bg-[#040b20] border border-blue-700/80 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-xs sm:text-sm text-white placeholder-slate-400 font-medium"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full gold-btn py-2.5 rounded-full text-sm font-black flex items-center justify-center gap-1.5 shadow-lg shadow-amber-500/25 cursor-pointer group"
                >
                  <span>Login</span>
                  <span>»</span>
                </button>
              </form>

              {/* OR Divider */}
              <div className="relative my-3">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-blue-900"></div>
                </div>
                <div className="relative flex justify-center text-[10px] uppercase">
                  <span className="bg-[#09173f] px-2 text-slate-400 font-bold">
                    OR
                  </span>
                </div>
              </div>

              {/* New Registration & Forgot Password links */}
              <div className="space-y-1.5 text-center text-xs">
                <button
                  type="button"
                  onClick={onOpenRegister}
                  className="w-full py-1.5 px-2 rounded-xl bg-blue-950/70 hover:bg-blue-900/60 border border-blue-800 text-amber-300 font-bold flex items-center justify-center gap-1.5 transition"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>New Registration</span>
                </button>

                <div className="pt-1 flex items-center justify-between text-[11px] px-1 text-slate-400">
                  <button
                    type="button"
                    onClick={onOpenForgotPassword}
                    className="hover:text-amber-300 font-medium flex items-center gap-1"
                  >
                    <span>?</span>
                    <span>Forgot Password?</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleQuickDemo('customer')}
                    className="text-amber-400 hover:text-amber-300 font-bold underline text-[10px]"
                    title="Pre-fill with Demo Customer"
                  >
                    1-Click Demo
                  </button>
                </div>
              </div>
            </div>

            {/* ─────────────────────────────────────────────────────────────
                2. SEPARATE PAYMENT SECTION (Requirement 3: Below Login)
                   Rounded payment cards for UPI, GPay, PhonePe, Paytm, Razorpay
            ───────────────────────────────────────────────────────────── */}
            <div className="rounded-3xl bg-gradient-to-br from-[#0c2054] to-[#061238] border-2 border-amber-400/80 p-4 shadow-xl space-y-3">
              <div className="flex items-center justify-between border-b border-blue-800/80 pb-2">
                <div className="flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-amber-400" />
                  <h3 className="text-xs sm:text-sm font-black text-white uppercase tracking-wider">
                    Payment Options & Gateways
                  </h3>
                </div>
                <span className="text-[9px] font-bold text-amber-300 bg-amber-400/20 px-2 py-0.5 rounded border border-amber-400/40">
                  Fee: ₹107
                </span>
              </div>

              <p className="text-[11px] text-slate-300">
                Select your payment mode for instant PAN processing and official receipt generation:
              </p>

              {/* Individual Rounded Payment Cards with Beautiful Colors & Glowing Borders */}
              <div className="grid grid-cols-2 gap-2">
                
                {/* 1. UPI */}
                <div 
                  onClick={() => setSelectedPaymentProvider('UPI')}
                  className={`payment-card-badge p-2.5 rounded-xl cursor-pointer flex items-center gap-2 ${
                    selectedPaymentProvider === 'UPI' ? 'border-amber-400 bg-blue-900/60' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-black text-slate-900 text-[10px] shadow">
                    UPI
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Instant UPI</p>
                    <p className="text-[9px] text-slate-400">All UPI Apps</p>
                  </div>
                </div>

                {/* 2. Google Pay (GPay) */}
                <div 
                  onClick={() => setSelectedPaymentProvider('Google Pay')}
                  className={`payment-card-badge p-2.5 rounded-xl cursor-pointer flex items-center gap-2 ${
                    selectedPaymentProvider === 'Google Pay' ? 'border-amber-400 bg-blue-900/60' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center font-bold text-slate-800 text-[9px] shadow">
                    GPay
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Google Pay</p>
                    <p className="text-[9px] text-slate-400">Instant UPI</p>
                  </div>
                </div>

                {/* 3. PhonePe */}
                <div 
                  onClick={() => setSelectedPaymentProvider('PhonePe')}
                  className={`payment-card-badge p-2.5 rounded-xl cursor-pointer flex items-center gap-2 ${
                    selectedPaymentProvider === 'PhonePe' ? 'border-amber-400 bg-blue-900/60' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#5f259f] flex items-center justify-center font-black text-white text-[10px] shadow">
                    पे
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">PhonePe</p>
                    <p className="text-[9px] text-slate-400">BHIM / Wallet</p>
                  </div>
                </div>

                {/* 4. Paytm */}
                <div 
                  onClick={() => setSelectedPaymentProvider('Paytm')}
                  className={`payment-card-badge p-2.5 rounded-xl cursor-pointer flex items-center gap-2 ${
                    selectedPaymentProvider === 'Paytm' ? 'border-amber-400 bg-blue-900/60' : ''
                  }`}
                >
                  <div className="w-8 h-8 rounded-lg bg-[#002e6e] flex items-center justify-center font-bold text-cyan-300 text-[9px] shadow">
                    Paytm
                  </div>
                  <div>
                    <p className="text-xs font-bold text-white leading-tight">Paytm UPI</p>
                    <p className="text-[9px] text-slate-400">Fast Payment</p>
                  </div>
                </div>

                {/* 5. Razorpay (Full Width integration card) */}
                <div 
                  onClick={() => setSelectedPaymentProvider('Razorpay')}
                  className={`payment-card-badge col-span-2 p-2.5 rounded-xl cursor-pointer flex items-center justify-between ${
                    selectedPaymentProvider === 'Razorpay' ? 'border-amber-400 bg-blue-900/60' : ''
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-[#0c2340] border border-cyan-400/60 flex items-center justify-center font-black text-cyan-300 text-[10px] shadow">
                      R
                    </div>
                    <div>
                      <p className="text-xs font-bold text-white leading-tight flex items-center gap-1.5">
                        <span>Razorpay Gateway</span>
                        <span className="text-[9px] text-cyan-300 bg-cyan-950 px-1.5 py-0.2 rounded border border-cyan-800">
                          Cards & Netbanking
                        </span>
                      </p>
                      <p className="text-[9px] text-slate-400">Debit / Credit / NetBanking (Integration Ready)</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>

              </div>

              {/* Informational Payment Notice (Requirement: Actual UPI QR code provided only after configured) */}
              <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-900 text-[10px] text-slate-300 space-y-1">
                <p className="text-amber-300 font-semibold flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                  Verified Payment Policy:
                </p>
                <p className="text-slate-400">
                  Payments are verified through official transaction UTR or gateway confirmation. Start an application to complete payment.
                </p>
              </div>

              {/* Action Button */}
              <button
                type="button"
                onClick={() => onSelectService('new_pan')}
                className="gold-btn w-full py-2 rounded-xl text-xs font-black shadow flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <span>Proceed with {selectedPaymentProvider || 'Secure Payment'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          3. BOTTOM RIBBON (MATCHING REFERENCE FOOTER STRIP)
      ───────────────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-2">
        <div className="w-full py-2.5 rounded-full bg-gradient-to-r from-blue-950 via-[#0a1b4d] to-blue-950 border border-amber-500/50 text-center shadow-lg">
          <p className="text-xs sm:text-sm font-black tracking-widest text-amber-300 uppercase font-cinzel">
            ★ Digital India... Secure India... Better India... ★
          </p>
        </div>
      </div>
    </div>
  );
};
