import React from 'react';
import { X, Printer, Download, ShieldCheck, QrCode } from 'lucide-react';
import { PanApplication } from '../types';

interface EPanCardModalProps {
  application: PanApplication;
  onClose: () => void;
}

export const EPanCardModal: React.FC<EPanCardModalProps> = ({
  application,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  const panNumber = application.allocatedPan || 'BLRPS7812M';
  const photoUrl = application.documents.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#09173f] border-2 border-amber-400 p-6 sm:p-7 shadow-2xl space-y-6">
        {/* Header (No print) */}
        <div className="flex items-center justify-between border-b border-blue-900 pb-3 no-print">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
                Official E-PAN Card
              </span>
              <h2 className="text-base sm:text-lg font-black text-white">
                Income Tax Department Digital PAN
              </h2>
            </div>
            <p className="text-xs text-amber-300">Permanent Account Number (PAN) Card Document</p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-blue-950 text-slate-400 hover:text-white border border-blue-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The Printable High-Definition PAN Card */}
        <div className="relative mx-auto max-w-md rounded-2xl bg-gradient-to-br from-[#cbe2fe] via-[#b9d5fc] to-[#8ebcf8] p-5 text-slate-900 shadow-2xl border-2 border-blue-900/60 font-sans overflow-hidden">
          {/* Subtle Security Microline Wave Background */}
          <div className="absolute inset-0 opacity-[0.07] bg-[radial-gradient(#1e3a8a_1px,transparent_1px)] [background-size:12px_12px] pointer-events-none"></div>

          {/* Header Row */}
          <div className="flex items-center justify-between border-b-2 border-blue-900/40 pb-2">
            <div className="text-left">
              <p className="text-[10px] font-black text-blue-950 uppercase tracking-tight">आयकर विभाग</p>
              <p className="text-[10px] font-black text-blue-900 uppercase tracking-tighter">INCOME TAX DEPARTMENT</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-7 h-7 rounded-full bg-blue-950/15 border border-blue-950/40 flex items-center justify-center">
                <span className="text-[9px] font-black text-blue-950">GOI</span>
              </div>
              <span className="text-[7px] font-bold text-blue-950 mt-0.5">सत्यमेव जयते</span>
            </div>

            <div className="text-right">
              <p className="text-[10px] font-black text-blue-950 uppercase tracking-tight">भारत सरकार</p>
              <p className="text-[10px] font-black text-blue-900 uppercase tracking-tighter">GOVT. OF INDIA</p>
            </div>
          </div>

          {/* Card Body */}
          <div className="grid grid-cols-12 gap-3 mt-3 items-center">
            {/* Left: Photograph and Hologram */}
            <div className="col-span-4 flex flex-col items-center gap-1.5">
              <div className="w-20 h-24 rounded-md bg-slate-200 border-2 border-blue-950 overflow-hidden shadow-inner">
                <img 
                  src={photoUrl} 
                  alt="Applicant" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Hologram Box */}
              <div className="w-12 h-6 rounded bg-gradient-to-r from-amber-400 via-yellow-200 to-amber-500 shadow border border-amber-600/60 flex items-center justify-center">
                <span className="text-[8px] font-black tracking-widest text-amber-950">ITD • PAN</span>
              </div>
            </div>

            {/* Right: Personal Details & PAN */}
            <div className="col-span-8 space-y-1.5 text-left pl-1">
              <div>
                <p className="text-[8px] font-bold uppercase text-blue-900 tracking-wider">
                  Permanent Account Number Card
                </p>
                <p className="font-mono text-xl sm:text-2xl font-black text-blue-950 tracking-wider">
                  {panNumber}
                </p>
              </div>

              <div>
                <p className="text-[8px] font-semibold uppercase text-slate-600">Name / नाम</p>
                <p className="text-xs font-bold text-slate-950 uppercase">
                  {application.applicant.fullNameOnCard}
                </p>
              </div>

              <div>
                <p className="text-[8px] font-semibold uppercase text-slate-600">Father's Name / पिता का नाम</p>
                <p className="text-xs font-bold text-slate-900 uppercase">
                  {application.applicant.fatherName || 'NOT APPLICABLE'}
                </p>
              </div>

              <div className="flex justify-between items-center text-[8px] text-slate-700 font-semibold">
                <div>
                  <span className="block text-[7px] text-slate-500">Date of Birth / जन्म की तारीख</span>
                  <p className="font-bold text-xs text-slate-900">{application.applicant.dob}</p>
                </div>

                <div className="p-1 bg-white rounded border border-blue-900/40">
                  <QrCode className="w-8 h-8 text-slate-900" />
                </div>
              </div>

              {/* Signature Strip */}
              <div className="pt-1 border-t border-blue-400/60 flex items-center justify-between">
                <div className="space-y-0.5">
                  <span className="text-[7px] text-slate-500 block">Signature / हस्ताक्षर</span>
                  <div className="h-7 w-28 bg-white/80 rounded border border-blue-900/30 flex items-center justify-center overflow-hidden">
                    {application.documents.signatureUrl ? (
                      <img 
                        src={application.documents.signatureUrl} 
                        alt="Signature" 
                        className="h-full w-full object-contain p-0.5" 
                      />
                    ) : (
                      <span className="font-script text-sm text-blue-950">{application.applicant.firstName}</span>
                    )}
                  </div>
                </div>

                <span className="text-[8px] font-mono text-blue-900/80 font-bold bg-white/70 px-1 py-0.5 rounded">
                  E-PAN VERIFIED
                </span>
              </div>
            </div>
          </div>

          {/* Footer Card Ribbon */}
          <div className="mt-3 pt-2 border-t border-blue-400/40 text-center">
            <p className="text-[7px] text-blue-950/80 uppercase tracking-widest font-bold">
              Digitally issued under Section 139A of the Income Tax Act, 1961
            </p>
          </div>
        </div>

        {/* Compliance Note */}
        <div className="text-[11px] text-slate-400 text-center space-y-1">
          <p>
            This E-PAN is legally valid across all banks, government authorities, and financial institutions in India.
          </p>
          <p className="text-amber-400 font-semibold">
            Speed Post Physical Dispatch: {application.speedPostTracking || 'Tracking generated upon dispatch'}
          </p>
        </div>

        {/* Modal Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-blue-900 no-print">
          <a
            href="https://www.onlineservices.nsdl.com/paam/requestAndDownloadEPAN.html"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-cyan-300 border border-cyan-500/50 text-xs font-bold transition flex items-center gap-1.5"
            title="Download directly from official Protean / NSDL ITD e-PAN server"
          >
            <span>Official Protean e-PAN Portal ↗</span>
          </a>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-slate-300 text-xs font-bold"
            >
              Close
            </button>

            <button
              onClick={handlePrint}
              className="gold-btn px-5 py-2 rounded-xl text-xs font-black shadow flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" />
              <span>Print E-PAN Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
