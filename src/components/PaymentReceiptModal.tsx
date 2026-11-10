import React from 'react';
import { X, Printer, CheckCircle2, Shield, QrCode } from 'lucide-react';
import { PanApplication } from '../types';

interface PaymentReceiptModalProps {
  application: PanApplication;
  onClose: () => void;
}

export const PaymentReceiptModal: React.FC<PaymentReceiptModalProps> = ({
  application,
  onClose
}) => {
  const handlePrint = () => {
    window.print();
  };

  const receiptNo = application.payment.receiptNumber || `RCPT-2026-${application.id.slice(-5)}`;
  const dateStr = application.payment.paidAt 
    ? new Date(application.payment.paidAt).toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    : new Date().toLocaleDateString('en-IN');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-xl rounded-3xl bg-[#09173f] border-2 border-amber-400 p-6 sm:p-7 shadow-2xl space-y-6">
        {/* Modal Top Actions (No Print) */}
        <div className="flex items-center justify-between border-b border-blue-900 pb-3 no-print">
          <div>
            <h2 className="text-base font-bold text-white">Payment Receipt & Tax Invoice</h2>
            <p className="text-xs text-amber-300">Official Confirmation of Application Fee</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-blue-950 text-slate-400 hover:text-white border border-blue-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Printable Official Invoice Box */}
        <div className="bg-white text-slate-900 rounded-2xl p-6 sm:p-8 space-y-6 shadow-xl border border-slate-300 font-sans">
          {/* Header */}
          <div className="flex items-start justify-between border-b-2 border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-cinzel text-xl font-black tracking-wider text-blue-950">SAKIM</span>
                <span className="text-sm font-bold text-amber-600">Digital Seva Kendra</span>
              </div>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Assisted PAN Facilitation & Processing Node
              </p>
              <p className="text-[10px] text-slate-500">
                GSTIN: 19AAECS9821M1Z5 • Support: +91-98765-43210
              </p>
            </div>

            <div className="text-right">
              <span className="inline-block px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-black uppercase">
                Payment Success
              </span>
              <p className="font-mono text-xs font-bold text-slate-800 mt-1">{receiptNo}</p>
              <p className="text-[10px] text-slate-500">{dateStr}</p>
            </div>
          </div>

          {/* Customer & Application Details */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Billed To Applicant:</span>
              <p className="font-bold text-slate-900 uppercase text-sm mt-0.5">{application.applicant.fullNameOnCard}</p>
              <p className="text-slate-600 text-[11px]">+91 {application.contact.mobile} • {application.contact.email}</p>
              <p className="text-slate-600 text-[11px]">{application.contact.city}, {application.contact.state} - {application.contact.pincode}</p>
            </div>

            <div className="text-right">
              <span className="text-[10px] text-slate-500 font-bold uppercase block">Filing Reference:</span>
              <p className="font-mono text-xs font-bold text-blue-900 mt-0.5">App ID: {application.id}</p>
              <p className="font-mono text-xs text-slate-700">Ack No: {application.acknowledgementNo}</p>
              <p className="text-slate-600 text-[11px] capitalize">{application.serviceType.replace('_', ' ')}</p>
            </div>
          </div>

          {/* Pricing Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
            <table className="w-full text-left">
              <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="p-2.5">Description</th>
                  <th className="p-2.5 text-center">SAC Code</th>
                  <th className="p-2.5 text-right">Amount (INR)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                <tr>
                  <td className="p-2.5">
                    <strong>PAN Application & Assisted Processing Fee</strong>
                    <span className="block text-[10px] text-slate-500">Government filing, verification & physical delivery</span>
                  </td>
                  <td className="p-2.5 text-center font-mono text-slate-600">998311</td>
                  <td className="p-2.5 text-right font-mono font-bold">₹90.68</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-600">Central GST (CGST @ 9%)</td>
                  <td className="p-2.5 text-center font-mono text-slate-500">—</td>
                  <td className="p-2.5 text-right font-mono">₹8.16</td>
                </tr>
                <tr>
                  <td className="p-2.5 text-slate-600">State GST (SGST @ 9%)</td>
                  <td className="p-2.5 text-center font-mono text-slate-500">—</td>
                  <td className="p-2.5 text-right font-mono">₹8.16</td>
                </tr>
              </tbody>
              <tfoot className="bg-slate-50 font-bold text-slate-900 border-t border-slate-200">
                <tr>
                  <td className="p-2.5 text-sm" colSpan={2}>Grand Total Paid</td>
                  <td className="p-2.5 text-right font-mono text-base text-blue-900">₹107.00</td>
                </tr>
              </tfoot>
            </table>
          </div>

          {/* Payment Metadata & Verification Footprint */}
          <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs">
            <div className="space-y-1">
              <p className="text-[11px] text-slate-600">
                Mode: <strong className="text-slate-900 uppercase">{application.payment.method}</strong>
              </p>
              <p className="text-[11px] text-slate-600 font-mono">
                Transaction ID: {application.payment.transactionId}
              </p>
              <p className="text-[11px] text-slate-600 font-mono">
                Bank UTR: {application.payment.utrNumber}
              </p>
            </div>

            <div className="flex flex-col items-center">
              <QrCode className="w-12 h-12 text-slate-900" />
              <span className="text-[8px] text-slate-500 font-mono mt-0.5">SCAN TO VERIFY</span>
            </div>
          </div>

          {/* Disclaimer */}
          <p className="text-[9px] text-slate-400 text-center border-t border-slate-100 pt-3">
            This is a computer-generated invoice from SAKIM Digital Seva Kendra. No physical signature is required.
          </p>
        </div>

        {/* Modal Bottom Actions (No Print) */}
        <div className="flex items-center justify-between gap-3 pt-2 border-t border-blue-900 no-print">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-blue-950 text-slate-300 text-xs font-bold"
          >
            Close
          </button>

          <button
            onClick={handlePrint}
            className="gold-btn px-6 py-2 rounded-xl text-xs font-black shadow flex items-center gap-1.5 cursor-pointer"
          >
            <Printer className="w-4 h-4" />
            <span>Print Official Receipt</span>
          </button>
        </div>
      </div>
    </div>
  );
};
