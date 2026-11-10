import React from 'react';
import { ShieldAlert, Info, ExternalLink } from 'lucide-react';

export const DisclaimerBanner: React.FC = () => {
  return (
    <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-blue-950 border-y border-amber-500/25 px-4 py-2 text-xs">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2 text-slate-300">
        <div className="flex items-center gap-2 text-center md:text-left">
          <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong className="text-amber-300 font-semibold">Important Regulatory Notice:</strong> SAKIM Digital Seva Kendra is an independent assisted citizen digital services & facilitation consultancy platform. We assist citizens in preparing and filing applications through authorized official channels.
          </span>
        </div>
        <div className="flex items-center gap-3 shrink-0 text-[11px] text-amber-400/90 font-medium">
          <span className="flex items-center gap-1">
            <Info className="w-3.5 h-3.5 text-blue-400" />
            100% Genuine Assistance
          </span>
          <span>•</span>
          <span className="text-slate-400">Assisted Submissions via Authorized Service Centers</span>
        </div>
      </div>
    </div>
  );
};
