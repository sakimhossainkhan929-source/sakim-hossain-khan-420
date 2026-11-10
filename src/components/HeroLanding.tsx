import React, { useState } from 'react';
import { 
  Lock, 
  Eye, 
  EyeOff, 
  Smartphone, 
  KeyRound, 
  ShieldCheck, 
  Zap, 
  Headphones, 
  Users, 
  CheckCircle, 
  UserCheck, 
  Fingerprint, 
  ArrowRight,
  Shield,
  Sparkles,
  Info,
  Mail
} from 'lucide-react';
import { UserRole } from '../types';

interface HeroLandingProps {
  onLogin: (identifier: string, role: UserRole, password?: string) => Promise<void> | void;
  onGoogleLogin?: () => Promise<void> | void;
  onOpenRegister: () => void;
  onOpenForgotPassword: () => void;
  onOpenGovtAuth: (type: 'google' | 'digilocker' | 'aadhaar') => void;
  initialRole?: UserRole;
}

export const HeroLanding: React.FC<HeroLandingProps> = ({
  onLogin,
  onGoogleLogin,
  onOpenRegister,
  onOpenForgotPassword,
  onOpenGovtAuth,
  initialRole = 'customer'
}) => {
  const [activeTab, setActiveTab] = useState<UserRole>(initialRole);
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!identifier.trim()) {
      setErrorMessage(activeTab === 'customer' ? 'Please enter your registered Email' : 'Please enter Admin Email');
      return;
    }
    if (!password) {
      setErrorMessage('Please enter your password');
      return;
    }

    setErrorMessage('');
    setIsSubmitting(true);
    try {
      await onLogin(identifier.trim(), activeTab, password);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative overflow-hidden py-8 sm:py-12 px-4 sm:px-6">
      {/* Background Decorative Mesh & Parliament Silhouettes */}
      <div className="absolute inset-0 pointer-events-none -z-10">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 right-10 w-[450px] h-[450px] bg-amber-500/10 rounded-full blur-3xl"></div>
        {/* Subtle grid pattern */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: SAKIM Brand Presentation & 3D PAN Card */}
        <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
          {/* Emblem & Top Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/60 border border-blue-700/50 shadow-inner">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping"></span>
            <span className="text-xs font-semibold text-amber-300 tracking-wide uppercase">
              Assisted Govt. Certified PAN Portal Facilitation
            </span>
          </div>

          {/* Majestic Hero Title */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight text-white leading-none">
              <span className="block font-cinzel gold-text-gradient drop-shadow-lg">
                SAKIM
              </span>
              <span className="block text-2xl sm:text-4xl lg:text-5xl font-extrabold text-blue-100 tracking-normal mt-1">
                Digital Seva Kendra
              </span>
            </h1>

            {/* Slogan Pill */}
            <div className="inline-block mt-3 px-5 py-1.5 rounded-full gold-badge-gradient text-xs sm:text-sm font-extrabold tracking-wider uppercase shadow-lg shadow-amber-500/25">
              Apply • Update • Download • Track
            </div>

            {/* Script Tagline */}
            <p className="font-script text-2xl sm:text-3xl text-amber-300 font-normal tracking-wide drop-shadow pt-1">
              Your PAN... Our Priority...
            </p>
          </div>

          {/* 3D Realistic Showcase PAN Card */}
          <div className="relative mx-auto lg:mx-0 max-w-md perspective-1000 group">
            {/* Pedestal Glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-500/30 via-blue-500/30 to-amber-500/30 rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity"></div>
            
            {/* PAN Card Container */}
            <div className="relative rounded-2xl bg-gradient-to-br from-[#dbeafe] via-[#bfdbfe] to-[#93c5fd] p-4 sm:p-5 text-slate-900 shadow-2xl border-2 border-amber-300/80 transform hover:-translate-y-1 transition-all duration-300">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-blue-400/40 pb-2">
                <div className="text-left">
                  <p className="text-[10px] font-bold text-blue-900 uppercase tracking-tighter">आयकर विभाग</p>
                  <p className="text-[11px] font-black text-blue-950 uppercase tracking-tight">INCOME TAX DEPARTMENT</p>
                </div>
                <div className="flex flex-col items-center">
                  <div className="w-6 h-6 rounded-full bg-amber-600/20 flex items-center justify-center border border-amber-600/40">
                    <span className="text-[9px] font-black text-amber-900">GOI</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-[10px] font-bold text-blue-900 uppercase tracking-tighter">भारत सरकार</p>
                  <p className="text-[11px] font-black text-blue-950 uppercase tracking-tight">GOVT. OF INDIA</p>
                </div>
              </div>

              {/* Body */}
              <div className="grid grid-cols-12 gap-2 mt-3 items-center">
                {/* Clean Geometric Chip & Security Badge (No human photo) */}
                <div className="col-span-3 flex flex-col items-center gap-1.5">
                  <div className="w-14 h-12 rounded-lg bg-gradient-to-br from-amber-300 via-amber-400 to-yellow-600 p-0.5 shadow-md border border-amber-200/80 flex flex-col justify-between">
                    <div className="flex justify-between h-2.5 border-b border-amber-700/40">
                      <span className="w-3.5 border-r border-amber-700/40"></span>
                      <span className="w-3.5"></span>
                    </div>
                    <div className="h-2 border-b border-amber-700/40"></div>
                    <div className="flex justify-between h-2.5">
                      <span className="w-3.5 border-r border-amber-700/40"></span>
                      <span className="w-3.5"></span>
                    </div>
                  </div>
                  <div className="w-12 h-4 rounded bg-gradient-to-r from-blue-900 to-indigo-900 shadow border border-amber-400/50 flex items-center justify-center">
                    <span className="text-[7px] font-black tracking-widest text-amber-300">SAKIM</span>
                  </div>
                </div>

                {/* Details */}
                <div className="col-span-9 text-left pl-2 space-y-1">
                  <div>
                    <p className="text-[9px] font-bold uppercase text-slate-600">Permanent Account Number</p>
                    <p className="font-mono text-base sm:text-lg font-black text-blue-950 tracking-widest">
                      ABCDE1234F
                    </p>
                  </div>
                  <div>
                    <p className="text-[8px] font-semibold uppercase text-slate-500">Name</p>
                    <p className="text-xs font-bold text-slate-900 uppercase">SAKIM CITIZEN</p>
                  </div>
                  <div className="flex justify-between items-center text-[8px] text-slate-600 font-semibold">
                    <div>
                      <span>Father's Name:</span>
                      <p className="font-bold text-[9px] text-slate-800 uppercase">MOHAMMED HOSSAIN</p>
                    </div>
                    <div>
                      <span>DOB:</span>
                      <p className="font-bold text-[9px] text-slate-800">15/08/1998</p>
                    </div>
                  </div>
                  <div className="pt-1 border-t border-blue-300/60 flex justify-between items-center">
                    <div className="font-script text-base text-blue-950 font-bold">
                      Sakim Hossain
                    </div>
                    <span className="text-[7px] font-mono text-slate-500 bg-white/70 px-1 rounded">
                      DIGITALLY VERIFIED
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Key Bullet Checklist */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
            {[
              { label: '100% Secure', desc: 'Bank-Grade AES' },
              { label: 'Fast Process', desc: 'Quick Dispatch' },
              { label: 'Easy Access', desc: 'Anywhere, 24/7' },
              { label: 'Assisted Service', desc: 'Expert Support' }
            ].map((item, idx) => (
              <div 
                key={idx}
                className="bg-blue-950/60 border border-amber-500/30 rounded-xl p-2.5 text-center shadow-md backdrop-blur-sm"
              >
                <div className="flex items-center justify-center gap-1 text-amber-400 font-bold text-xs sm:text-sm">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{item.label}</span>
                </div>
                <p className="text-[10px] text-slate-300 mt-0.5">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Bottom Trust Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="flex items-center gap-2 text-left bg-[#071333] border border-blue-800/40 p-2 rounded-xl">
              <div className="p-2 rounded-lg bg-amber-500/20 text-amber-400">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Secure</p>
                <p className="text-[10px] text-slate-400">& Encrypted</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-left bg-[#071333] border border-blue-800/40 p-2 rounded-xl">
              <div className="p-2 rounded-lg bg-blue-500/20 text-blue-400">
                <Zap className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Instant</p>
                <p className="text-[10px] text-slate-400">Response</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-left bg-[#071333] border border-blue-800/40 p-2 rounded-xl">
              <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400">
                <Headphones className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">24x7</p>
                <p className="text-[10px] text-slate-400">Helpdesk</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-left bg-[#071333] border border-blue-800/40 p-2 rounded-xl">
              <div className="p-2 rounded-lg bg-purple-500/20 text-purple-400">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-white">Trusted</p>
                <p className="text-[10px] text-slate-400">Platform</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Secure Login Card (Matching Image 1 & 2) */}
        <div className="lg:col-span-5">
          <div className="relative rounded-3xl bg-gradient-to-b from-[#0e2154] via-[#09153b] to-[#050d24] p-6 sm:p-7 border-2 border-amber-400/80 shadow-2xl shadow-blue-950/80 neon-blue-glow">
            {/* Top Golden Lock Header */}
            <div className="flex flex-col items-center justify-center -mt-12 mb-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 p-0.5 shadow-xl shadow-amber-500/30 flex items-center justify-center">
                <div className="w-full h-full bg-[#081438] rounded-[14px] flex items-center justify-center">
                  <Lock className="w-8 h-8 text-amber-400 fill-amber-400/20" />
                </div>
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-white mt-2">
                Secure Login
              </h2>
              <p className="text-xs text-amber-300 font-medium">
                Access Your Digital Seva Services
              </p>
            </div>

            {/* Customer Login vs Admin Login Tabs */}
            <div className="grid grid-cols-2 gap-2 p-1 rounded-2xl bg-[#040a1d] border border-blue-900/60 mb-5">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('customer');
                  setErrorMessage('');
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'customer'
                    ? 'gold-btn text-slate-900 shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-blue-900/30'
                }`}
              >
                <UserCheck className="w-3.5 h-3.5" />
                Customer Login
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('admin');
                  setErrorMessage('');
                }}
                className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                  activeTab === 'admin'
                    ? 'gold-btn text-slate-900 shadow-lg'
                    : 'text-slate-400 hover:text-white hover:bg-blue-900/30'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Admin Login
              </button>
            </div>

            {/* Firebase Authentication Security Badge */}
            <div className="flex items-center justify-between mb-4 bg-blue-950/90 border border-blue-500/40 rounded-xl px-3 py-2 text-[11px]">
              <span className="text-blue-200 flex items-center gap-1.5 font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Firebase Authentication & Cloud Firestore</span>
              </span>
              <span className="text-[10px] text-amber-300 font-mono bg-blue-900/60 px-2 py-0.5 rounded border border-amber-400/30">
                Live Auth
              </span>
            </div>

            {/* Login Form */}
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              {errorMessage && (
                <div className="p-2.5 rounded-xl bg-red-950/90 border border-red-500/80 text-red-200 text-xs font-medium flex items-center gap-2">
                  <Info className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Email Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  {activeTab === 'customer' ? 'Registered Email Address' : 'Administrator Email'}
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-4 h-4" />
                  </div>
                  <input
                    type="email"
                    value={identifier}
                    onChange={(e) => setIdentifier(e.target.value)}
                    placeholder={activeTab === 'customer' ? 'citizen@example.com' : 'sakimhossaink@gmail.com'}
                    required
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-[#06102b] border border-blue-800/80 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-slate-500 font-medium"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                    <KeyRound className="w-4 h-4" />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter account password"
                    required
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-[#06102b] border border-blue-800/80 focus:border-amber-400 focus:outline-none focus:ring-1 focus:ring-amber-400 text-sm text-white placeholder-slate-500 font-medium"
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

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between text-xs pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="rounded border-blue-700 bg-blue-950 text-amber-500 focus:ring-amber-400"
                  />
                  <span>Remember Me</span>
                </label>

                <button
                  type="button"
                  onClick={onOpenForgotPassword}
                  className="text-amber-400 hover:text-amber-300 font-semibold"
                >
                  Forgot Password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full gold-btn py-3 rounded-xl text-sm font-black flex items-center justify-center gap-2 tracking-wide cursor-pointer shadow-lg shadow-amber-500/25 group disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Authenticating with Firebase...</span>
                ) : (
                  <>
                    <span>Login with Firebase</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </form>

            {/* Separator */}
            {activeTab === 'customer' && (
              <>
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-blue-900"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#09153b] px-3 text-slate-400 font-semibold tracking-wider">
                      OR
                    </span>
                  </div>
                </div>

                {/* Third-party / Identity verification integrations */}
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => onGoogleLogin ? onGoogleLogin() : onOpenGovtAuth('google')}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-slate-100 text-slate-800 text-xs font-bold transition flex items-center justify-center gap-2 shadow"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>Login with Google</span>
                  </button>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => onOpenGovtAuth('digilocker')}
                      className="py-2 px-2.5 rounded-xl bg-blue-900/60 hover:bg-blue-900 text-blue-200 border border-blue-700/60 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                    >
                      <Shield className="w-3.5 h-3.5 text-blue-400" />
                      <span>DigiLocker</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => onOpenGovtAuth('aadhaar')}
                      className="py-2 px-2.5 rounded-xl bg-orange-950/60 hover:bg-orange-950 text-orange-200 border border-orange-700/60 text-xs font-semibold transition flex items-center justify-center gap-1.5"
                    >
                      <Fingerprint className="w-3.5 h-3.5 text-orange-400" />
                      <span>Aadhaar OTP</span>
                    </button>
                  </div>
                </div>

                {/* New Customer Registration Link */}
                <div className="text-center pt-3 mt-2 border-t border-blue-900/40">
                  <p className="text-xs text-slate-300">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={onOpenRegister}
                      className="text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2"
                    >
                      New Customer Registration
                    </button>
                  </p>
                </div>
              </>
            )}

            {/* Bottom Reassurance Badge */}
            <div className="mt-4 pt-3 border-t border-blue-900/60 flex items-center justify-center gap-2 text-[11px] text-emerald-400 font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Your Data is Safe With Us (256-Bit SSL Protected)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
