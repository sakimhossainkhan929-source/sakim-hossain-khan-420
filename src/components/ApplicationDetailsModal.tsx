import React from 'react';
import { X, CheckCircle2, Clock, MapPin, User, FileText, Download, Printer, Shield } from 'lucide-react';
import { PanApplication } from '../types';

interface ApplicationDetailsModalProps {
  application: PanApplication;
  onClose: () => void;
  onDownloadReceipt: (app: PanApplication) => void;
  onDownloadEPan: (app: PanApplication) => void;
}

export const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
  application,
  onClose,
  onDownloadReceipt,
  onDownloadEPan
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-gradient-to-b from-[#0c2054] to-[#06102c] border-2 border-amber-400 p-6 sm:p-7 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto text-xs text-slate-200">
        {/* Top Header */}
        <div className="flex items-center justify-between border-b border-blue-900 pb-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-amber-300 font-bold text-sm">
                {application.id}
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded uppercase bg-blue-900 text-blue-200">
                {application.serviceType.replace('_', ' ')}
              </span>
            </div>
            <p className="text-white font-bold text-base mt-0.5">
              {application.applicant.fullNameOnCard}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-blue-950 text-slate-400 hover:text-white border border-blue-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Alert Banner */}
        <div className="p-3.5 rounded-2xl bg-[#08153b] border border-amber-500/40 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-slate-400 text-[11px] block">Current Application Status:</span>
            <span className="font-bold text-white text-sm capitalize">
              {application.status.replace('_', ' ')}
            </span>
            {application.statusRemarks && (
              <p className="text-amber-300 text-[11px] mt-0.5">{application.statusRemarks}</p>
            )}
          </div>

          {application.allocatedPan && (
            <div className="bg-emerald-950/80 border border-emerald-600 px-3 py-1.5 rounded-xl text-right">
              <span className="text-[10px] text-emerald-300 block font-bold">ALLOTTED PAN</span>
              <span className="font-mono text-base font-black text-amber-300">{application.allocatedPan}</span>
            </div>
          )}
        </div>

        {/* Biometrics & Personal Info */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
          {/* Photos & Signatures */}
          <div className="md:col-span-4 space-y-3">
            <div className="p-3 rounded-2xl bg-[#040b20] border border-blue-900 text-center space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">Applicant Photo</span>
              <div className="w-24 h-28 mx-auto rounded-xl border-2 border-amber-400 bg-slate-900 overflow-hidden shadow">
                <img 
                  src={application.documents.photoUrl || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80'} 
                  alt="Applicant" 
                  className="w-full h-full object-cover" 
                />
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-[#040b20] border border-blue-900 text-center space-y-2">
              <span className="text-[10px] text-slate-400 font-bold uppercase block">
                {application.serviceType === 'minor_pan' ? "Parent / Guardian Signature" : "Applicant Signature"}
              </span>
              <div className="h-12 bg-white rounded-lg border border-blue-900 p-1 flex items-center justify-center overflow-hidden">
                {application.documents.signatureUrl ? (
                  <img src={application.documents.signatureUrl} alt="Signature" className="h-full object-contain" />
                ) : (
                  <span className="font-script text-sm text-blue-950">{application.applicant.firstName}</span>
                )}
              </div>
            </div>
          </div>

          {/* Core Personal Details */}
          <div className="md:col-span-8 p-4 rounded-2xl bg-[#08153b] border border-blue-900 space-y-3">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
              <User className="w-4 h-4" />
              <span>Personal & Family Details</span>
            </h4>

            <div className="grid grid-cols-2 gap-3 text-slate-300">
              <div>
                <span className="text-slate-500 block text-[10px]">Title & Name:</span>
                <strong className="text-white">{application.applicant.title} {application.applicant.firstName} {application.applicant.lastName}</strong>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">Father's Name:</span>
                <strong className="text-white">{application.applicant.fatherName}</strong>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">Date of Birth (DOB):</span>
                <span className="text-white font-mono">{application.applicant.dob}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">Gender:</span>
                <span className="text-white">{application.applicant.gender}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">Aadhaar Reference:</span>
                <span className="font-mono text-slate-200">{application.applicant.aadhaarNumber || 'Provided during assisted filing'}</span>
              </div>

              <div>
                <span className="text-slate-500 block text-[10px]">Existing PAN:</span>
                <span className="font-mono text-amber-300">{application.applicant.existingPan || 'N/A (New Card)'}</span>
              </div>
            </div>

            {/* Minor Details if applicable */}
            {application.minorDetails && (
              <div className="mt-3 pt-3 border-t border-blue-900 space-y-1">
                <span className="text-[10px] text-amber-400 font-bold uppercase block">Representative Assessee (Minor Section)</span>
                <p>Guardian: <strong className="text-white">{application.minorDetails.guardianName}</strong> ({application.minorDetails.guardianRelationship})</p>
                <p className="text-slate-400 text-[11px]">{application.minorDetails.guardianAddress}</p>
              </div>
            )}
          </div>
        </div>

        {/* Address & Communication */}
        <div className="p-4 rounded-2xl bg-[#08153b] border border-blue-900 space-y-2">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <MapPin className="w-4 h-4" />
            <span>Dispatch & Residence Address</span>
          </h4>
          <p className="text-white font-medium">
            {application.contact.flatNo} {application.contact.premises}, {application.contact.road}, {application.contact.area}
          </p>
          <p className="text-slate-300">
            {application.contact.city}, {application.contact.state} - <strong className="font-mono text-amber-300">{application.contact.pincode}</strong>, {application.contact.country}
          </p>
          <p className="text-slate-400 text-[11px]">
            Mobile: +91 {application.contact.mobile} • Email: {application.contact.email}
          </p>
        </div>

        {/* Documents Attached */}
        <div className="p-4 rounded-2xl bg-[#08153b] border border-blue-900 space-y-2">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <FileText className="w-4 h-4" />
            <span>Verified Supporting Proofs</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-800">
              <span className="text-[10px] text-slate-400 block">Identity Proof</span>
              <strong className="text-white text-[11px]">{application.documents.idProofType}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-800">
              <span className="text-[10px] text-slate-400 block">Address Proof</span>
              <strong className="text-white text-[11px]">{application.documents.addressProofType}</strong>
            </div>
            <div className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-800">
              <span className="text-[10px] text-slate-400 block">DOB Proof</span>
              <strong className="text-white text-[11px]">{application.documents.dobProofType}</strong>
            </div>
          </div>
        </div>

        {/* Audit History Timeline */}
        <div className="p-4 rounded-2xl bg-[#08153b] border border-blue-900 space-y-3">
          <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
            <Clock className="w-4 h-4" />
            <span>Audit History & Lifecycle Events</span>
          </h4>
          <div className="space-y-2">
            {application.history.map(item => (
              <div key={item.id} className="p-2.5 rounded-xl bg-blue-950/60 border border-blue-900 flex items-start justify-between gap-3 text-xs">
                <div>
                  <span className="font-bold text-amber-300 uppercase text-[10px] block">
                    {item.status.replace('_', ' ')} • by {item.actor}
                  </span>
                  <p className="text-slate-200 mt-0.5">{item.note}</p>
                </div>
                <span className="text-[10px] font-mono text-slate-400 shrink-0">
                  {new Date(item.timestamp).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-blue-900">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-950 text-slate-300 font-bold"
          >
            Close
          </button>

          <div className="flex gap-2">
            <button
              onClick={() => onDownloadReceipt(application)}
              className="px-4 py-2 rounded-xl bg-blue-900/60 text-amber-300 border border-amber-400/40 font-bold transition flex items-center gap-1"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Receipt</span>
            </button>

            {application.status === 'completed' && (
              <button
                onClick={() => onDownloadEPan(application)}
                className="gold-btn px-5 py-2 rounded-xl font-black shadow flex items-center gap-1"
              >
                <Download className="w-3.5 h-3.5" />
                <span>E-PAN Card</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
