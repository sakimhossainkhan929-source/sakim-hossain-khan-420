import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Eye, 
  Check, 
  X, 
  Users, 
  CreditCard, 
  Database, 
  Sparkles, 
  ArrowUpRight, 
  FileText, 
  Printer, 
  ExternalLink,
  ChevronDown,
  RefreshCw,
  Send,
  Download
} from 'lucide-react';
import { 
  UserProfile, 
  PanApplication, 
  ApplicationStatus, 
  ServiceType 
} from '../types';
import { StorageService } from '../services/storageService';
import { FirebaseService } from '../services/firebase';

interface AdminDashboardProps {
  currentUser: UserProfile;
  applications: PanApplication[];
  users: UserProfile[];
  onRefresh: () => void;
  onLogout: () => void;
  onViewApplication: (app: PanApplication) => void;
  onDownloadReceipt: (app: PanApplication) => void;
  onDownloadEPan: (app: PanApplication) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  currentUser,
  applications,
  users,
  onRefresh,
  onLogout,
  onViewApplication,
  onDownloadReceipt,
  onDownloadEPan
}) => {
  const [activeTab, setActiveTab] = useState<'applications' | 'customers' | 'payments' | 'broadcast' | 'settings'>('applications');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [selectedApp, setSelectedApp] = useState<PanApplication | null>(null);

  // Status update modal state
  const [newStatus, setNewStatus] = useState<ApplicationStatus>('under_review');
  const [statusRemarks, setStatusRemarks] = useState('');
  const [allocatePanInput, setAllocatePanInput] = useState('');
  const [speedPostInput, setSpeedPostInput] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);

  // Broadcast state
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [broadcastSent, setBroadcastSent] = useState(false);

  // Stats calculation
  const totalApps = applications.length;
  const pendingReview = applications.filter(a => a.status === 'submitted' || a.status === 'under_review').length;
  const inProcessing = applications.filter(a => a.status === 'processing').length;
  const completedCount = applications.filter(a => a.status === 'completed').length;
  const totalRevenue = applications.reduce((sum, a) => sum + (a.payment.amount || 107), 0);

  const filteredApps = applications.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesService = serviceFilter === 'all' || app.serviceType === serviceFilter;
    const matchesSearch = 
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.acknowledgementNo.includes(searchQuery) ||
      app.applicant.fullNameOnCard.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.customerMobile.includes(searchQuery) ||
      app.customerEmail.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesService && matchesSearch;
  });

  const openStatusEditor = (app: PanApplication) => {
    setSelectedApp(app);
    setNewStatus(app.status);
    setStatusRemarks(app.statusRemarks || '');
    setAllocatePanInput(app.allocatedPan || '');
    setSpeedPostInput(app.speedPostTracking || '');
  };

  const handleUpdateStatusSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedApp) return;

    setIsUpdating(true);
    setTimeout(() => {
      const updated = StorageService.updateStatus(selectedApp.id, newStatus, statusRemarks, 'Admin SAKIM');
      if (updated && allocatePanInput) {
        updated.allocatedPan = allocatePanInput.toUpperCase();
        if (speedPostInput) updated.speedPostTracking = speedPostInput.toUpperCase();
        StorageService.saveApplication(updated);
      }

      // Sync with Cloud Firestore
      FirebaseService.updateApplicationStatus(selectedApp.id, newStatus, statusRemarks)
        .catch(err => console.warn('Firestore status sync warning:', err));

      setIsUpdating(false);
      setSelectedApp(null);
      onRefresh();
    }, 600);
  };

  const handleTogglePaymentVerify = (app: PanApplication) => {
    const nextState = !app.payment.verifiedByAdmin;
    StorageService.verifyPayment(app.id, nextState);
    onRefresh();
  };

  const handleSendBroadcast = (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;

    StorageService.addNotification({
      id: `broadcast-${Date.now()}`,
      userId: 'all',
      title: broadcastTitle,
      message: broadcastMessage,
      date: new Date().toISOString(),
      read: false,
      type: 'alert'
    });

    setBroadcastTitle('');
    setBroadcastMessage('');
    setBroadcastSent(true);
    setTimeout(() => setBroadcastSent(false), 3000);
  };

  const handleExportData = () => {
    const exportObj = {
      applications,
      users,
      exportedAt: new Date().toISOString()
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `SAKIM_SEVA_DATABASE_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleResetData = () => {
    if (confirm('Reset database to initial realistic sample data? All local edits will be replaced with defaults.')) {
      StorageService.resetDatabase();
      onRefresh();
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 max-w-7xl mx-auto space-y-8 animate-in fade-in">
      {/* Top Admin Header Bar */}
      <div className="rounded-3xl bg-gradient-to-r from-[#0d2258] via-[#09163f] to-[#06102c] border-2 border-amber-400 p-6 shadow-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-400 p-0.5 shadow-lg flex items-center justify-center">
            <div className="w-full h-full bg-[#071333] rounded-[14px] flex items-center justify-center">
              <Shield className="w-7 h-7 text-amber-400" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-black text-white font-cinzel">
                SAKIM Admin Center
              </h1>
              <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-red-600 text-white shadow">
                Root Access
              </span>
            </div>
            <p className="text-xs text-amber-300">
              National Assisted PAN Facilitation & Verification Command Hub
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onRefresh}
            className="p-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-slate-300 border border-blue-800 transition"
            title="Refresh Database Records"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={handleExportData}
            className="px-3 py-2 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-amber-300 border border-amber-500/40 text-xs font-bold transition flex items-center gap-1.5"
            title="Export full JSON backup"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export DB</span>
          </button>

          <button
            onClick={onLogout}
            className="px-4 py-2 rounded-xl bg-rose-950 hover:bg-rose-900 text-rose-200 border border-rose-800 text-xs font-bold transition"
          >
            Exit Admin
          </button>
        </div>
      </div>

      {/* KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-[#08153b] border border-blue-900 shadow">
          <span className="text-[11px] text-slate-400 font-medium">Total Applications</span>
          <p className="text-2xl font-black text-white mt-1">{totalApps}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#08153b] border border-amber-500/40 shadow">
          <span className="text-[11px] text-amber-300 font-medium">Pending Scrutiny</span>
          <p className="text-2xl font-black text-amber-300 mt-1">{pendingReview}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#08153b] border border-cyan-500/40 shadow">
          <span className="text-[11px] text-cyan-300 font-medium">Govt Processing</span>
          <p className="text-2xl font-black text-cyan-300 mt-1">{inProcessing}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#08153b] border border-emerald-500/40 shadow">
          <span className="text-[11px] text-emerald-400 font-medium">PAN Allocated</span>
          <p className="text-2xl font-black text-emerald-300 mt-1">{completedCount}</p>
        </div>

        <div className="p-4 rounded-2xl bg-[#08153b] border border-blue-900 shadow col-span-2 sm:col-span-1">
          <span className="text-[11px] text-slate-400 font-medium">Facilitation Revenue</span>
          <p className="text-2xl font-black text-amber-400 mt-1">₹{totalRevenue}</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-blue-900 flex items-center gap-2 overflow-x-auto pb-1 text-xs font-bold">
        {[
          { id: 'applications', label: 'All Applications', count: totalApps },
          { id: 'customers', label: 'Registered Customers', count: users.length },
          { id: 'payments', label: 'Payment Verifications', count: applications.filter(a => a.payment.status === 'paid').length },
          { id: 'broadcast', label: 'Send Announcement', count: null },
          { id: 'settings', label: 'System & Virtual Memory', count: null }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-amber-400 text-slate-950 font-black shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-blue-900/40'
            }`}
          >
            <span>{tab.label}</span>
            {tab.count !== null && (
              <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                activeTab === tab.id ? 'bg-slate-900 text-amber-300' : 'bg-blue-950 text-slate-300'
              }`}>
                {tab.count}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* TAB 1: Applications Management */}
      {activeTab === 'applications' && (
        <div className="space-y-4">
          {/* Search & Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-[#08153b] p-3.5 rounded-2xl border border-blue-900 text-xs">
            <div className="sm:col-span-5 relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by ID, Name, Mobile, PAN, Ack..."
                className="w-full pl-9 pr-3 py-1.5 rounded-xl bg-[#040b20] border border-blue-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="sm:col-span-4 flex items-center gap-2">
              <span className="text-slate-400 shrink-0 font-medium">Status:</span>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl bg-[#040b20] border border-blue-800 text-xs text-white"
              >
                <option value="all">All Statuses</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="document_required">Document Required</option>
                <option value="processing">Govt Processing</option>
                <option value="completed">Completed / Allocated</option>
                <option value="rejected">Rejected</option>
              </select>
            </div>

            <div className="sm:col-span-3 flex items-center gap-2">
              <span className="text-slate-400 shrink-0 font-medium">Service:</span>
              <select
                value={serviceFilter}
                onChange={(e) => setServiceFilter(e.target.value)}
                className="w-full px-2.5 py-1.5 rounded-xl bg-[#040b20] border border-blue-800 text-xs text-white"
              >
                <option value="all">All Services</option>
                <option value="new_pan">New PAN</option>
                <option value="minor_pan">Minor PAN</option>
                <option value="major_pan">Major PAN</option>
                <option value="correction">Correction</option>
                <option value="reprint">Reprint</option>
              </select>
            </div>
          </div>

          {/* Applications Table */}
          <div className="rounded-2xl bg-[#071333] border border-blue-900 overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-[#040b20] text-slate-400 uppercase font-semibold border-b border-blue-900/80">
                  <tr>
                    <th className="py-3 px-4">App ID / Ack No</th>
                    <th className="py-3 px-4">Applicant</th>
                    <th className="py-3 px-4">Service</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4">Payment</th>
                    <th className="py-3 px-4">Allocated PAN</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-blue-900/50 text-slate-200">
                  {filteredApps.map(app => (
                    <tr key={app.id} className="hover:bg-blue-950/40 transition">
                      <td className="py-3.5 px-4">
                        <div className="font-mono font-bold text-amber-300">{app.id}</div>
                        <div className="text-[10px] text-slate-400 font-mono">{app.acknowledgementNo}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-bold text-white">{app.applicant.fullNameOnCard}</div>
                        <div className="text-[10px] text-slate-400">
                          {app.contact.city}, {app.contact.state} • +91 {app.customerMobile}
                        </div>
                      </td>

                      <td className="py-3.5 px-4 capitalize font-medium text-blue-200">
                        {app.serviceType.replace('_', ' ')}
                      </td>

                      <td className="py-3.5 px-4">
                        <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          app.status === 'completed' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' :
                          app.status === 'processing' ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40' :
                          app.status === 'under_review' ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' :
                          app.status === 'document_required' ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40' :
                          'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                        }`}>
                          {app.status.replace('_', ' ')}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <button
                          onClick={() => handleTogglePaymentVerify(app)}
                          className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase transition flex items-center gap-1 ${
                            app.payment.verifiedByAdmin 
                              ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' 
                              : 'bg-amber-950 text-amber-300 border border-amber-800 hover:bg-emerald-900'
                          }`}
                          title="Click to toggle payment verification"
                        >
                          {app.payment.verifiedByAdmin ? '✔ Verified' : '⏳ Pending'}
                        </button>
                      </td>

                      <td className="py-3.5 px-4 font-mono font-black text-amber-400">
                        {app.allocatedPan || '—'}
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => onViewApplication(app)}
                          className="px-2.5 py-1 rounded-lg bg-blue-900/60 hover:bg-blue-800 text-slate-200 font-semibold"
                          title="View Full Application"
                        >
                          View
                        </button>

                        <button
                          onClick={() => openStatusEditor(app)}
                          className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/50 font-bold"
                          title="Update Status & Remarks"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Customer Management */}
      {activeTab === 'customers' && (
        <div className="space-y-4">
          <div className="bg-[#08153b] p-4 rounded-2xl border border-blue-900">
            <h3 className="text-sm font-bold text-white">Registered Customer Accounts</h3>
            <p className="text-xs text-slate-300">Total {users.length} registered accounts in virtual memory</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {users.map(u => {
              const userApps = applications.filter(a => a.customerUserId === u.id || a.customerEmail === u.email);
              return (
                <div key={u.id} className="p-4 rounded-2xl bg-[#071333] border border-blue-900 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                        {u.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{u.name}</h4>
                        <p className="text-[11px] text-slate-400">{u.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-950 text-amber-300 border border-blue-800">
                      {u.role}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 border-t border-blue-900/60 pt-2">
                    <div>
                      <span className="text-slate-500 block text-[10px]">Mobile:</span>
                      <strong>+91 {u.mobile}</strong>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px]">Total Applications:</span>
                      <strong className="text-amber-300">{userApps.length}</strong>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 3: Payment Verification Center */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          <div className="bg-[#08153b] p-4 rounded-2xl border border-blue-900">
            <h3 className="text-sm font-bold text-white">Payment Audit & Verification</h3>
            <p className="text-xs text-slate-300">Verify customer UPI / UTR transaction receipts</p>
          </div>

          <div className="space-y-3">
            {applications.map(app => (
              <div key={app.id} className="p-4 rounded-2xl bg-[#071333] border border-blue-900 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-amber-300">{app.id}</span>
                    <span className="text-slate-400">•</span>
                    <strong className="text-white">{app.applicant.fullNameOnCard}</strong>
                  </div>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    UTR: <span className="font-mono text-slate-200">{app.payment.utrNumber}</span> • Txn: <span className="font-mono text-slate-200">{app.payment.transactionId}</span>
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm font-black text-white">₹{app.payment.amount}.00</p>
                    <span className="text-[10px] text-slate-400 uppercase">{app.payment.method}</span>
                  </div>

                  <button
                    onClick={() => handleTogglePaymentVerify(app)}
                    className={`px-3 py-1.5 rounded-xl font-bold uppercase transition ${
                      app.payment.verifiedByAdmin 
                        ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' 
                        : 'bg-amber-400 text-slate-950 shadow'
                    }`}
                  >
                    {app.payment.verifiedByAdmin ? 'Payment Verified ✓' : 'Click to Verify'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: Announcement Broadcast */}
      {activeTab === 'broadcast' && (
        <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-[#08153b] border-2 border-amber-400/60 shadow-xl space-y-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Send className="w-4 h-4 text-amber-400" />
              Broadcast System Announcement
            </h3>
            <p className="text-xs text-slate-300">
              Sends an instant notification alert to all registered customer dashboards.
            </p>
          </div>

          {broadcastSent && (
            <div className="p-3 rounded-xl bg-emerald-950 border border-emerald-700 text-emerald-300 text-xs font-bold">
              Announcement broadcasted successfully to all customers!
            </div>
          )}

          <form onSubmit={handleSendBroadcast} className="space-y-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Announcement Title</label>
              <input
                type="text"
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="e.g. Income Tax Server Maintenance or Speedy Dispatch Update"
                className="w-full px-3 py-2.5 rounded-xl bg-[#040b20] border border-blue-800 text-white"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Message Content</label>
              <textarea
                rows={4}
                value={broadcastMessage}
                onChange={(e) => setBroadcastMessage(e.target.value)}
                placeholder="Type the message for customers..."
                className="w-full px-3 py-2.5 rounded-xl bg-[#040b20] border border-blue-800 text-white"
              />
            </div>

            <button
              type="submit"
              className="gold-btn w-full py-2.5 rounded-xl font-bold shadow"
            >
              Send Broadcast Alert
            </button>
          </form>
        </div>
      )}

      {/* TAB 5: System Settings & Reset */}
      {activeTab === 'settings' && (
        <div className="max-w-2xl mx-auto p-6 rounded-3xl bg-[#08153b] border border-blue-900 shadow-xl space-y-5 text-xs">
          <div>
            <h3 className="text-sm font-bold text-white">Virtual Memory & Persistence Controls</h3>
            <p className="text-slate-400 mt-1">
              SAKIM runs on a persistent client-side data store with automated virtual memory caching.
            </p>
          </div>

          <div className="space-y-3 pt-2">
            <div className="p-3.5 rounded-2xl bg-[#040b20] border border-blue-900 flex items-center justify-between">
              <div>
                <p className="font-bold text-white">Full Database JSON Export</p>
                <p className="text-slate-400 text-[11px]">Download all applications, users, and audit histories.</p>
              </div>
              <button
                onClick={handleExportData}
                className="gold-btn px-4 py-1.5 rounded-xl font-bold"
              >
                Export
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-rose-950/40 border border-rose-900/60 flex items-center justify-between">
              <div>
                <p className="font-bold text-rose-300">Reset Demo Data</p>
                <p className="text-slate-400 text-[11px]">Restore initial sample applications (Completed, Minor, Correction, Draft).</p>
              </div>
              <button
                onClick={handleResetData}
                className="px-4 py-1.5 rounded-xl bg-rose-900 hover:bg-rose-800 text-white font-bold"
              >
                Reset DB
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Update Modal */}
      {selectedApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#09173f] border-2 border-amber-400 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-blue-900 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  Update Application Status
                </h3>
                <p className="text-xs text-amber-300">
                  {selectedApp.id} • {selectedApp.applicant.fullNameOnCard}
                </p>
              </div>
              <button
                onClick={() => setSelectedApp(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleUpdateStatusSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-300 mb-1">Status Lifecycle *</label>
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value as ApplicationStatus)}
                  className="w-full px-3 py-2 rounded-xl bg-[#040b20] border border-blue-800 text-white font-bold"
                >
                  <option value="submitted">Submitted</option>
                  <option value="under_review">Under Review</option>
                  <option value="document_required">Document Required</option>
                  <option value="processing">In Govt Processing</option>
                  <option value="completed">Completed / Allocated</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              {newStatus === 'completed' && (
                <div className="space-y-3 p-3 rounded-2xl bg-emerald-950/50 border border-emerald-700">
                  <div>
                    <label className="block font-bold text-emerald-300 mb-1">
                      Allocate 10-Digit PAN Number
                    </label>
                    <input
                      type="text"
                      maxLength={10}
                      value={allocatePanInput}
                      onChange={(e) => setAllocatePanInput(e.target.value.toUpperCase())}
                      placeholder="e.g. BLRPS7812M (or auto-generates if blank)"
                      className="w-full px-3 py-2 rounded-xl bg-[#040b20] border border-emerald-600 font-mono text-sm uppercase text-amber-300"
                    />
                  </div>

                  <div>
                    <label className="block font-bold text-emerald-300 mb-1">
                      India Post Speed Post Tracking No.
                    </label>
                    <input
                      type="text"
                      value={speedPostInput}
                      onChange={(e) => setSpeedPostInput(e.target.value.toUpperCase())}
                      placeholder="e.g. EK948172901IN"
                      className="w-full px-3 py-2 rounded-xl bg-[#040b20] border border-emerald-600 font-mono text-xs uppercase text-white"
                    />
                  </div>
                </div>
              )}

              <div>
                <label className="block font-semibold text-slate-300 mb-1">
                  Admin Remarks / Customer Notification Note *
                </label>
                <textarea
                  rows={3}
                  value={statusRemarks}
                  onChange={(e) => setStatusRemarks(e.target.value)}
                  placeholder="Detail the next action or reason for this status update..."
                  className="w-full px-3 py-2 rounded-xl bg-[#040b20] border border-blue-800 text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-blue-900">
                <button
                  type="button"
                  onClick={() => setSelectedApp(null)}
                  className="px-4 py-2 rounded-xl bg-blue-950 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="gold-btn px-6 py-2 rounded-xl font-black shadow"
                >
                  {isUpdating ? 'Saving...' : 'Save & Notify Customer'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
