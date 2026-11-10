import React, { useState } from 'react';
import { 
  ArrowLeft, 
  ExternalLink, 
  ShieldAlert, 
  FileText, 
  CheckCircle2, 
  Info, 
  Sparkles, 
  Link as LinkIcon, 
  Settings, 
  PhoneCall, 
  Check,
  Building2,
  AlertCircle
} from 'lucide-react';
import { NewGovernmentService, NewServiceFacility } from '../services/newServicesData';

interface NewServiceDetailViewProps {
  service: NewGovernmentService;
  onBack: () => void;
  onUpdateOfficialUrl?: (serviceId: string, url: string) => void;
}

export const NewServiceDetailView: React.FC<NewServiceDetailViewProps> = ({
  service,
  onBack,
  onUpdateOfficialUrl
}) => {
  const [configuredUrl, setConfiguredUrl] = useState(service.officialUrl || '');
  const [isEditingUrl, setIsEditingUrl] = useState(false);
  const [urlSavedFeedback, setUrlSavedFeedback] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState<NewServiceFacility | null>(null);

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateOfficialUrl) {
      onUpdateOfficialUrl(service.id, configuredUrl);
    }
    setIsEditingUrl(false);
    setUrlSavedFeedback(true);
    setTimeout(() => setUrlSavedFeedback(false), 3000);
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-3 sm:px-6 py-6 space-y-6 animate-in fade-in">
      {/* ─────────────────────────────────────────────────────────────────
          1. TOP NAVIGATION & BACK BUTTON
      ───────────────────────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-blue-900 pb-4">
        <button
          onClick={onBack}
          className="gold-btn px-4 py-2 rounded-xl text-xs font-black shadow flex items-center gap-2 group transition"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>« Back to Dashboard</span>
        </button>

        <div className="flex items-center gap-2">
          {/* Demo Mode Badge required by User Specification */}
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/50 shadow animate-pulse">
            <span className="w-2 h-2 rounded-full bg-amber-400"></span>
            Demo Mode – Link Not Connected
          </span>

          <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-900/60 text-blue-200 border border-blue-700/60 hidden sm:inline">
            {service.categoryLabel}
          </span>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          2. SERVICE HERO BANNER (MATCHING ROYAL BLUE & GOLD PALETTE)
      ───────────────────────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-gradient-to-br from-[#0c2054] via-[#08153b] to-[#040b20] border-2 border-amber-400/80 p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-900/80 text-amber-300 text-xs font-bold border border-blue-700">
              <Building2 className="w-3.5 h-3.5" />
              <span>{service.officialAuthority}</span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-4xl font-black text-white tracking-tight drop-shadow">
                {service.nameEn}
              </h1>
              <p className="text-lg sm:text-xl font-bold text-amber-300 drop-shadow mt-1">
                {service.nameHi}
              </p>
            </div>

            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
              {service.description}
            </p>
          </div>

          {/* Right Summary Card */}
          <div className="w-full md:w-80 rounded-2xl bg-[#06102b] border border-blue-800 p-4 space-y-3 shrink-0 shadow-lg">
            <div className="flex items-center justify-between border-b border-blue-900 pb-2">
              <span className="text-xs font-bold text-slate-300">Integration Status</span>
              <span className="text-[11px] font-black uppercase text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded border border-amber-400/30">
                Demo Mode
              </span>
            </div>

            <div className="space-y-1.5 text-xs text-slate-300">
              <div className="flex justify-between">
                <span className="text-slate-400">Category:</span>
                <strong className="text-white">{service.categoryLabel}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Official Portal:</span>
                <span className="text-amber-300 font-semibold truncate max-w-[160px]">
                  {configuredUrl ? configuredUrl : 'Link Not Connected'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Application Mode:</span>
                <span className="text-emerald-400 font-semibold">Assisted Guidance</span>
              </div>
            </div>

            {configuredUrl ? (
              <a
                href={configuredUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full gold-btn py-2 rounded-xl text-xs font-black shadow flex items-center justify-center gap-1.5 no-underline"
              >
                <span>Launch Connected Portal</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                type="button"
                onClick={() => setIsEditingUrl(true)}
                className="w-full py-2 rounded-xl bg-blue-900/60 hover:bg-blue-900 text-blue-200 border border-blue-700 text-xs font-bold transition flex items-center justify-center gap-1.5"
              >
                <Settings className="w-3.5 h-3.5 text-amber-400" />
                <span>Configure Official URL</span>
              </button>
            )}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────
            3. OFFICIAL URL CONFIGURATION PANEL (Allows user to add links)
        ───────────────────────────────────────────────────────────── */}
        <div className="rounded-2xl bg-[#04091a] border border-amber-400/40 p-4 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <LinkIcon className="w-4 h-4 text-amber-400" />
              <span className="text-xs font-bold text-white">
                Official Government Portal URL:
              </span>
              {configuredUrl ? (
                <span className="font-mono text-xs text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30 truncate max-w-xs">
                  {configuredUrl}
                </span>
              ) : (
                <span className="text-xs font-semibold text-amber-300/80 bg-amber-400/10 px-2.5 py-0.5 rounded border border-amber-400/30">
                  Demo Mode – Link Not Connected (Empty)
                </span>
              )}
            </div>

            <button
              onClick={() => setIsEditingUrl(!isEditingUrl)}
              className="text-xs text-amber-400 hover:text-amber-300 font-bold underline underline-offset-2 self-start sm:self-auto"
            >
              {isEditingUrl ? 'Cancel' : configuredUrl ? 'Edit Official URL' : '+ Connect Official URL Later'}
            </button>
          </div>

          {isEditingUrl && (
            <form onSubmit={handleSaveUrl} className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-blue-900 animate-in fade-in">
              <input
                type="url"
                value={configuredUrl}
                onChange={(e) => setConfiguredUrl(e.target.value)}
                placeholder="https://official-government-portal.gov.in"
                className="flex-1 px-3 py-2 rounded-xl bg-[#08153b] border border-blue-700 text-white text-xs font-mono focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="gold-btn px-4 py-2 rounded-xl text-xs font-black shadow flex items-center justify-center gap-1 shrink-0"
              >
                <Check className="w-3.5 h-3.5" />
                <span>Save Portal Link</span>
              </button>
            </form>
          )}

          {urlSavedFeedback && (
            <div className="p-2 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>Official portal link updated! In production, this link will be clickable directly.</span>
            </div>
          )}

          <div className="flex items-start gap-2 text-[11px] text-slate-400 pt-1">
            <Info className="w-3.5 h-3.5 text-blue-400 shrink-0 mt-0.5" />
            <span>
              <strong>Per Requirement 5:</strong> Official URLs for newly added services are kept empty in Demo Mode. Real government applications or mock fee payments are strictly disabled to prevent false submissions. You can connect genuine authorized URLs above anytime.
            </span>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          4. SERVICE SUBCATEGORIES & FACILITY BUTTONS (Requirement 5)
      ───────────────────────────────────────────────────────────────── */}
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gold-badge-gradient text-xs sm:text-sm font-black tracking-wide uppercase shadow">
            <span>★</span>
            <span>Available Facilities & Subcategories</span>
            <span>★</span>
          </div>
          <div className="h-0.5 flex-1 bg-gradient-to-r from-amber-500/60 via-blue-500/30 to-transparent"></div>
        </div>

        <p className="text-xs text-slate-300">
          Select any facility below to review application specifications, required documents, and citizen guidelines:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {service.subcategories.map((sub, idx) => (
            <div
              key={sub.id}
              onClick={() => setSelectedFacility(sub)}
              className="p-4 rounded-2xl bg-gradient-to-b from-[#091845] to-[#050e2b] border border-blue-800/80 hover:border-amber-400 transition-all cursor-pointer shadow-lg space-y-2 group"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 text-xs font-black flex items-center justify-center border border-amber-400/40 shrink-0">
                  {idx + 1}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30">
                  Demo Facility
                </span>
              </div>

              <div>
                <h3 className="text-xs sm:text-sm font-black text-white group-hover:text-amber-300 transition-colors">
                  {sub.nameEn}
                </h3>
                <p className="text-[11px] font-bold text-amber-300/90 mt-0.5">
                  {sub.nameHi}
                </p>
              </div>

              <p className="text-[11px] text-slate-300 leading-snug line-clamp-2">
                {sub.description}
              </p>

              <div className="pt-2 border-t border-blue-900/60 flex items-center justify-between text-xs text-amber-400 font-bold group-hover:translate-x-0.5 transition-transform">
                <span>View Facility Guidance »</span>
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          5. REQUIRED DOCUMENTS & ELIGIBILITY DETAILS
      ───────────────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Required Documents Checklist */}
        <div className="rounded-2xl bg-[#071333] border border-blue-800 p-5 space-y-3 shadow-lg">
          <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-blue-900 pb-2">
            <FileText className="w-4 h-4 text-amber-400" />
            <span>Required Documents for Citizen Application</span>
          </h3>

          <ul className="space-y-2 text-xs text-slate-300">
            {service.requiredDocuments.map((doc, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                <span>{doc}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Eligibility Criteria & Official Guidance */}
        <div className="rounded-2xl bg-[#071333] border border-blue-800 p-5 space-y-3 shadow-lg">
          <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-blue-900 pb-2">
            <ShieldAlert className="w-4 h-4 text-amber-400" />
            <span>Eligibility & Regulatory Guidelines</span>
          </h3>

          <div className="p-3 rounded-xl bg-blue-950/80 border border-blue-900 text-xs text-slate-200 leading-relaxed">
            <p className="font-semibold text-amber-300 mb-1">Eligible Applicants:</p>
            <p>{service.eligibility}</p>
          </div>

          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
            <p className="font-bold flex items-center gap-1.5 text-amber-300">
              <AlertCircle className="w-3.5 h-3.5" />
              <span>Assisted Facilitation Desk Notice</span>
            </p>
            <p className="text-[11px] text-slate-300">
              In accordance with government transparency guidelines, SAKIM operators assist citizens in document verification, scan sizing, and appointment guidance. No sensitive Aadhaar OTP or biometric credentials are saved or simulated.
            </p>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          6. FACILITY GUIDANCE MODAL
      ───────────────────────────────────────────────────────────────── */}
      {selectedFacility && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-[#09173f] border-2 border-amber-400 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-blue-900 pb-3">
              <div>
                <h3 className="text-base font-black text-white">{selectedFacility.nameEn}</h3>
                <p className="text-xs text-amber-300 font-semibold">{selectedFacility.nameHi}</p>
              </div>
              <button
                onClick={() => setSelectedFacility(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              {selectedFacility.description}
            </p>

            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1.5">
              <div className="flex items-center gap-1.5 font-bold text-amber-400">
                <AlertCircle className="w-4 h-4" />
                <span>Demo Mode – Link Not Connected</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-normal">
                Per requirement 5, official government portal links are kept empty for new services until connected by the portal administrator. Mock applications or simulated payments are strictly prohibited.
              </p>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-blue-900">
              <button
                onClick={() => setSelectedFacility(null)}
                className="gold-btn px-4 py-2 rounded-xl text-xs font-black shadow"
              >
                Close Guidance
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          7. BOTTOM BACK TO DASHBOARD BUTTON
      ───────────────────────────────────────────────────────────────── */}
      <div className="pt-4 border-t border-blue-900/60 flex items-center justify-between">
        <button
          onClick={onBack}
          className="gold-btn px-5 py-2.5 rounded-xl text-xs font-black shadow flex items-center gap-2 group transition"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>« Back to Dashboard</span>
        </button>

        <a
          href="tel:+919876543210"
          className="px-4 py-2 rounded-xl bg-blue-950 text-blue-200 border border-blue-800 text-xs font-bold hover:text-white transition flex items-center gap-1.5"
        >
          <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
          <span>Operator Helpdesk: +91-98765-43210</span>
        </a>
      </div>
    </div>
  );
};
