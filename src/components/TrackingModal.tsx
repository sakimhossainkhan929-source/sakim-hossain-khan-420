import React, { useState } from 'react';
import { 
  Search, 
  X, 
  CheckCircle2, 
  Clock, 
  Truck, 
  FileCheck, 
  AlertCircle, 
  Download, 
  ExternalLink,
  ShieldCheck
} from 'lucide-react';
import { PanApplication, ApplicationStatus } from '../types';
import { StorageService } from '../services/storageService';

interface TrackingModalProps {
  initialId?: string;
  onClose: () => void;
  onDownloadEPan: (app: PanApplication) => void;
  onDownloadReceipt: (app: PanApplication) => void;
}

export const TrackingModal: React.FC<TrackingModalProps> = ({
  initialId = '',
  onClose,
  onDownloadEPan,
  onDownloadReceipt
}) => {
  const [searchInput, setSearchInput] = useState(initialId || 'SKM-2026-89412');
  const [searchedApp, setSearchedApp] = useState<PanApplication | null>(() => {
    return StorageService.getApplicationById(initialId || 'SKM-2026-89412') || null;
  });
  const [hasSearched, setHasSearched] = useState(true);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchInput.trim()) return;

    const app = StorageService.getApplicationById(searchInput.trim());
    setSearchedApp(app || null);
    setHasSearched(true);
  };

  // 5 Step tracker determination
  const getStepStatus = (stepIndex: number, currentStatus?: ApplicationStatus) => {
    if (!currentStatus) return 'pending';
    
    // Step 0: Submitted
    // Step 1: Under Review
    // Step 2: Processing (NSDL / Govt)
    // Step 3: Allocated
    // Step 4: Dispatched

    const statusWeight: Record<ApplicationStatus, number> = {
      'submitted': 0,
      'document_required': 1,
      'under_review': 1,
      'processing': 2,
      'completed': 4,
      'rejected': 0
    };

    const currentWeight = statusWeight[currentStatus] ?? 0;
    if (currentWeight > stepIndex) return 'completed';
    if (currentWeight === stepIndex) return 'active';
    return 'pending';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-b from-[#0c2054] to-[#06102c] border-2 border-amber-400 p-6 sm:p-7 shadow-2xl space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-900 pb-3">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-amber-400/20 text-amber-400">
              <Search className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-lg font-black text-white">Live PAN Application Tracker</h2>
              <p className="text-xs text-amber-300">Track real-time status with Application ID or 15-Digit Ack No</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-blue-950 text-slate-400 hover:text-white border border-blue-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search Bar */}
        <form onSubmit={handleSearch} className="flex gap-2">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="e.g. SKM-2026-89412 or 881029384756102"
            className="flex-1 px-4 py-2.5 rounded-xl bg-[#040b20] border border-blue-800 font-mono text-sm text-amber-300 uppercase placeholder-slate-500 focus:outline-none focus:border-amber-400"
          />
          <button
            type="submit"
            className="gold-btn px-6 py-2.5 rounded-xl text-xs font-black shadow-md cursor-pointer"
          >
            Track Status
          </button>
        </form>

        {/* Quick Sample Links */}
        <div className="flex items-center gap-2 text-[11px] text-slate-400">
          <span>Try sample IDs:</span>
          <button
            type="button"
            onClick={() => {
              setSearchInput('SKM-2026-89412');
              setSearchedApp(StorageService.getApplicationById('SKM-2026-89412') || null);
            }}
            className="text-amber-400 underline font-mono"
          >
            SKM-2026-89412 (Completed)
          </button>
          <span>•</span>
          <button
            type="button"
            onClick={() => {
              setSearchInput('SKM-2026-77319');
              setSearchedApp(StorageService.getApplicationById('SKM-2026-77319') || null);
            }}
            className="text-amber-400 underline font-mono"
          >
            SKM-2026-77319 (Minor)
          </button>
        </div>

        {/* Result Area */}
        {searchedApp ? (
          <div className="space-y-6 pt-2 animate-in fade-in">
            {/* Top Summary Banner */}
            <div className="p-4 rounded-2xl bg-[#08153b] border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="space-y-1">
                <span className="font-mono text-amber-300 font-bold text-sm">{searchedApp.id}</span>
                <p className="font-bold text-white text-sm">{searchedApp.applicant.fullNameOnCard}</p>
                <p className="text-slate-400">Ack No: <span className="font-mono text-slate-200">{searchedApp.acknowledgementNo}</span></p>
              </div>

              <div className="sm:text-right space-y-1">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase ${
                  searchedApp.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                  searchedApp.status === 'processing' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse' :
                  searchedApp.status === 'document_required' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                  'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  {searchedApp.status.replace('_', ' ')}
                </span>
                <p className="text-slate-400 text-[11px]">Last Updated: {new Date(searchedApp.updatedAt).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Stepper Timeline */}
            <div className="space-y-4 py-2">
              <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                Application Journey Progress
              </h4>

              <div className="relative pl-6 space-y-6 border-l-2 border-blue-900 ml-3">
                {[
                  {
                    title: '1. Application Submitted & Payment Confirmed',
                    desc: `Fee of ₹${searchedApp.payment.amount} received via ${searchedApp.payment.method.toUpperCase()}. Ref: ${searchedApp.payment.transactionId}`,
                    date: new Date(searchedApp.createdAt).toLocaleDateString()
                  },
                  {
                    title: '2. Assisted Document Scrutiny',
                    desc: 'Verification of Identity, Address, and Date of Birth supporting records.',
                    date: searchedApp.history[1]?.timestamp ? new Date(searchedApp.history[1].timestamp).toLocaleDateString() : 'In Progress'
                  },
                  {
                    title: '3. Transmitted to Central ITD Government Portal',
                    desc: 'Filing confirmed with Income Tax Department PAN allocation gateway.',
                    date: searchedApp.history[2]?.timestamp ? new Date(searchedApp.history[2].timestamp).toLocaleDateString() : 'Awaiting'
                  },
                  {
                    title: '4. Permanent Account Number (PAN) Allocated',
                    desc: searchedApp.allocatedPan ? `Allocated PAN: ${searchedApp.allocatedPan}. E-PAN generated.` : 'Pending ITD allotment.',
                    date: searchedApp.status === 'completed' ? 'Approved' : 'Pending'
                  },
                  {
                    title: '5. Physical PAN Card Dispatched',
                    desc: searchedApp.speedPostTracking ? `Dispatched via India Post Speed Post. Tracking No: ${searchedApp.speedPostTracking}` : 'Will dispatch to address upon allotment.',
                    date: searchedApp.speedPostTracking ? 'Dispatched' : 'Pending'
                  }
                ].map((st, idx) => {
                  const state = getStepStatus(idx, searchedApp.status);
                  return (
                    <div key={idx} className="relative group">
                      <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold ${
                        state === 'completed' ? 'bg-emerald-500 text-slate-950' :
                        state === 'active' ? 'bg-amber-400 text-slate-950 animate-bounce' :
                        'bg-blue-950 text-slate-500 border border-blue-800'
                      }`}>
                        {state === 'completed' ? '✓' : idx + 1}
                      </div>

                      <div className="text-xs">
                        <div className="flex items-center justify-between">
                          <p className={`font-bold ${state === 'completed' || state === 'active' ? 'text-white' : 'text-slate-400'}`}>
                            {st.title}
                          </p>
                          <span className="text-[10px] font-mono text-slate-500">{st.date}</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mt-0.5">{st.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current Remarks */}
            {searchedApp.statusRemarks && (
              <div className="p-3.5 rounded-2xl bg-blue-950/80 border border-blue-800 text-xs text-slate-300">
                <strong className="text-amber-400">Official Facilitator Note: </strong>
                {searchedApp.statusRemarks}
              </div>
            )}

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 pt-2 border-t border-blue-900 justify-between items-center">
              <a
                href="https://tin.tin.nsdl.com/pantan/StatusTrack.html"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-2 rounded-xl bg-[#040d2b] hover:bg-blue-950 text-cyan-300 border border-cyan-500/50 text-xs font-bold transition flex items-center gap-1.5"
                title="Verify directly on official Income Tax Department TIN-NSDL status server"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Official NSDL Portal Status ↗</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => onDownloadReceipt(searchedApp)}
                  className="px-4 py-2 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-amber-300 border border-amber-400/40 text-xs font-bold transition flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Ack Slip</span>
                </button>

                {searchedApp.status === 'completed' && (
                  <button
                    onClick={() => onDownloadEPan(searchedApp)}
                    className="gold-btn px-4 py-2 rounded-xl text-xs font-black shadow flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download E-PAN Card</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        ) : (
          hasSearched && (
            <div className="text-center py-8 bg-[#040b20] rounded-2xl border border-blue-900 space-y-3 text-xs">
              <AlertCircle className="w-8 h-8 text-rose-400 mx-auto" />
              <p className="font-bold text-white">No Record Found for "{searchInput}"</p>
              <p className="text-slate-400">Please check your 15-digit acknowledgement number or SAKIM Application ID.</p>
              <a
                href="https://tin.tin.nsdl.com/pantan/StatusTrack.html"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-blue-900 hover:bg-blue-800 text-cyan-200 border border-cyan-500/40 text-xs font-bold transition"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Search on Official TIN-NSDL Portal ↗</span>
              </a>
            </div>
          )
        )}
      </div>
    </div>
  );
};
