/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { DisclaimerBanner } from './components/DisclaimerBanner';
import { PortalMainView } from './components/PortalMainView';
import { HeroLanding } from './components/HeroLanding';
import { ServicesGrid } from './components/ServicesGrid';
import { CustomerDashboard } from './components/CustomerDashboard';
import { AdminDashboard } from './components/AdminDashboard';
import { ApplicationFormModal } from './components/ApplicationFormModal';
import { TrackingModal } from './components/TrackingModal';
import { EPanCardModal } from './components/EPanCardModal';
import { PaymentReceiptModal } from './components/PaymentReceiptModal';
import { ApplicationDetailsModal } from './components/ApplicationDetailsModal';
import { 
  RegisterModal, 
  ForgotPasswordModal, 
  GovtAuthModal, 
  NotificationsModal 
} from './components/AuthModals';
import { StorageService } from './services/storageService';
import { FirebaseService, checkIsAdmin } from './services/firebase';
import { 
  UserProfile, 
  PanApplication, 
  ServiceType, 
  UserRole, 
  AppNotification 
} from './types';
import { 
  ShieldCheck, 
  Phone, 
  Mail, 
  Lock, 
  Sparkles, 
  HelpCircle, 
  FileText,
  Clock,
  Layers,
  ChevronRight,
  QrCode,
  X
} from 'lucide-react';

// Default citizen profile to directly open Dashboard without login screen block
const DEFAULT_CITIZEN_PROFILE: UserProfile = {
  id: 'citizen-active-1',
  name: 'Citizen Portal',
  email: 'sakimhossaink@gmail.com',
  mobile: '9876543210',
  role: 'customer',
  state: 'West Bengal',
  createdAt: '2026-11-10T00:00:00Z'
};

export default function App() {
  // Initialization - Directly open with active citizen profile (Bypassing login screen)
  const [currentUser, setCurrentUser] = useState<UserProfile>(() => {
    StorageService.init();
    return StorageService.getCurrentUser() || DEFAULT_CITIZEN_PROFILE;
  });

  const [currentView, setCurrentView] = useState<'home' | 'dashboard' | 'admin' | 'services' | 'support'>('dashboard');
  const [applications, setApplications] = useState<PanApplication[]>(() => StorageService.getApplications());
  const [notifications, setNotifications] = useState<AppNotification[]>(() => {
    return StorageService.getNotifications(currentUser.id);
  });

  // Modals state
  const [activeServiceModal, setActiveServiceModal] = useState<ServiceType | null>(null);
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);
  const [trackingTargetId, setTrackingTargetId] = useState<string>('');
  const [ePanModalApp, setEPanModalApp] = useState<PanApplication | null>(null);
  const [receiptModalApp, setReceiptModalApp] = useState<PanApplication | null>(null);
  const [detailsModalApp, setDetailsModalApp] = useState<PanApplication | null>(null);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const [forgotPasswordModalOpen, setForgotPasswordModalOpen] = useState(false);
  const [govtAuthModalType, setGovtAuthModalType] = useState<'google' | 'digilocker' | 'aadhaar' | null>(null);
  const [notificationsModalOpen, setNotificationsModalOpen] = useState(false);
  const [loginRolePreference, setLoginRolePreference] = useState<UserRole>('customer');
  const [qrModalOpen, setQrModalOpen] = useState(false);

  // Real-Time Firebase Auth Session Listener & Persistence (Preserved)
  useEffect(() => {
    const unsubscribe = FirebaseService.onAuthStateChange(async (fbUser) => {
      if (fbUser) {
        const isAdmin = await checkIsAdmin(fbUser);
        let profile: UserProfile = {
          id: fbUser.uid,
          name: fbUser.displayName || fbUser.email?.split('@')[0] || 'Citizen User',
          email: fbUser.email || '',
          mobile: fbUser.phoneNumber || '',
          role: isAdmin ? 'admin' : 'customer',
          state: 'India',
          createdAt: new Date().toISOString()
        };

        const cached = StorageService.getCurrentUser();
        if (cached && cached.id === fbUser.uid) {
          profile = { ...profile, ...cached, role: isAdmin ? 'admin' : 'customer' };
        }

        StorageService.setCurrentUser(profile);
        setCurrentUser(profile);
        await refreshData(profile);
      }
    });

    return () => unsubscribe();
  }, []);

  const refreshData = async (activeUser?: UserProfile | null) => {
    const userToQuery = activeUser !== undefined ? activeUser : currentUser;
    if (userToQuery) {
      try {
        if (userToQuery.role === 'admin') {
          const firestoreApps = await FirebaseService.getAllApplications();
          if (firestoreApps && firestoreApps.length > 0) {
            setApplications(firestoreApps);
          } else {
            setApplications(StorageService.getApplications());
          }
        } else {
          const firestoreApps = await FirebaseService.getUserApplications(userToQuery.id);
          if (firestoreApps && firestoreApps.length > 0) {
            setApplications(firestoreApps);
          } else {
            setApplications(StorageService.getUserApplications(userToQuery.id, userToQuery.email));
          }
        }
      } catch {
        setApplications(StorageService.getApplications());
      }
      setNotifications(StorageService.getNotifications(userToQuery.id));
    } else {
      setApplications(StorageService.getApplications());
      setNotifications(StorageService.getNotifications('all'));
    }
  };

  // Real Firebase Login Handler
  const handleLogin = async (identifier: string, role: UserRole, password?: string) => {
    if (!password) {
      throw new Error('Please enter your password.');
    }

    try {
      const profile = await FirebaseService.loginUser(identifier.trim().toLowerCase(), password);

      if (role === 'admin' && profile.role !== 'admin') {
        throw new Error('Access Denied: This account does not have administrative privileges. Admin access is restricted.');
      }

      StorageService.setCurrentUser(profile);
      setCurrentUser(profile);
      setCurrentView(profile.role === 'admin' ? 'admin' : 'dashboard');
      await refreshData(profile);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('user-not-found') || msg.includes('invalid-credential')) {
        throw new Error('Invalid email or password. Please verify your credentials or register for an account.');
      } else if (msg.includes('wrong-password')) {
        throw new Error('Incorrect password. Please try again or use Forgot Password.');
      } else if (msg.includes('invalid-email')) {
        throw new Error('Please enter a valid email address.');
      } else {
        throw new Error(msg);
      }
    }
  };

  // Google OAuth Popup Login
  const handleGoogleLogin = async () => {
    try {
      const profile = await FirebaseService.loginWithGoogle();
      StorageService.setCurrentUser(profile);
      setCurrentUser(profile);
      setCurrentView(profile.role === 'admin' ? 'admin' : 'dashboard');
      await refreshData(profile);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('popup-closed-by-user')) {
        return; // User intentionally closed popup
      }
      alert('Google authentication error: ' + msg);
    }
  };

  // Secure Logout (Resets session to default citizen access)
  const handleLogout = async () => {
    try {
      await FirebaseService.logout();
    } catch (e) {
      console.warn('Firebase logout notice:', e);
    }
    StorageService.setCurrentUser(null);
    setCurrentUser(DEFAULT_CITIZEN_PROFILE);
    setCurrentView('dashboard');
  };

  // Open Service form directly
  const handleSelectService = (service: ServiceType) => {
    setActiveServiceModal(service);
  };

  // Open Tracking
  const handleOpenTracking = (appId?: string) => {
    setTrackingTargetId(appId || '');
    setTrackingModalOpen(true);
  };

  // Unread notification count
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkNotificationRead = (notifId: string) => {
    StorageService.markNotificationAsRead(notifId);
    refreshData();
  };

  return (
    <div className="min-h-screen bg-[#050d24] text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 1. Header with Clock, Ticker, and Brand */}
      <Header
        currentUser={currentUser}
        onNavigate={(v) => {
          if (v === 'support') {
            setCurrentView('support');
          } else if (v === 'admin') {
            setCurrentView('admin');
          } else {
            setCurrentView('dashboard');
          }
        }}
        onLoginClick={(role) => {
          if (role === 'admin') {
            setCurrentView('admin');
          } else {
            setCurrentView('dashboard');
          }
        }}
        onLogout={handleLogout}
        onOpenTracking={() => handleOpenTracking()}
        onOpenNotifications={() => setNotificationsModalOpen(true)}
        unreadCount={unreadCount}
        currentView={currentView}
      />

      {/* 2. Legal Transparency & Regulatory Notice Banner */}
      <DisclaimerBanner />

      {/* 3. Main Views: Direct Access to Customer Dashboard as Default Home Page */}
      <main className="flex-1">
        {currentView === 'support' ? (
          <div className="max-w-5xl mx-auto py-10 px-4 sm:px-6 space-y-8 animate-in fade-in">
            <div className="flex items-center justify-between border-b border-blue-900 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-black uppercase text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/30">
                  24x7 Customer Support
                </span>
                <h1 className="text-3xl font-black text-white font-cinzel">
                  Help & PAN Assistance Center
                </h1>
                <p className="text-sm text-slate-300">
                  Dedicated support for New PAN applications, Minor PAN, Major PAN conversion, and Corrections.
                </p>
              </div>
              <button
                onClick={() => setCurrentView('dashboard')}
                className="gold-btn px-4 py-2 rounded-xl text-xs font-black shadow"
              >
                « Back to Dashboard
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 rounded-3xl bg-[#08153b] border-2 border-amber-500/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-400/20 text-amber-400 flex items-center justify-center mx-auto">
                  <Phone className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base">Toll-Free Helpline</h3>
                <p className="text-xs text-slate-300">Call our certified PAN desk for real-time filing support</p>
                <a href="tel:+919876543210" className="inline-block gold-btn px-4 py-2 rounded-xl text-xs font-black">
                  +91-98765-43210
                </a>
              </div>

              <div className="p-6 rounded-3xl bg-[#08153b] border-2 border-blue-500/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-blue-400/20 text-blue-400 flex items-center justify-center mx-auto">
                  <Mail className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base">Email Processing Desk</h3>
                <p className="text-xs text-slate-300">Send self-attested documents or gazette notification copies</p>
                <a href="mailto:support@sakim.com" className="inline-block px-4 py-2 rounded-xl bg-blue-900 text-blue-200 border border-blue-700 text-xs font-bold">
                  support@sakim.com
                </a>
              </div>

              <div className="p-6 rounded-3xl bg-[#08153b] border-2 border-emerald-500/40 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-400/20 text-emerald-400 flex items-center justify-center mx-auto">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-white text-base">Speed Post Tracking</h3>
                <p className="text-xs text-slate-300">Track delivery of physical PAN card via India Post</p>
                <button 
                  onClick={() => handleOpenTracking()}
                  className="px-4 py-2 rounded-xl bg-emerald-950 text-emerald-300 border border-emerald-700 text-xs font-bold"
                >
                  Track Dispatch Status
                </button>
              </div>
            </div>
          </div>
        ) : currentView === 'admin' ? (
          <AdminDashboard
            currentUser={currentUser}
            applications={applications}
            users={StorageService.getUsers()}
            onRefresh={refreshData}
            onLogout={handleLogout}
            onViewApplication={(app) => setDetailsModalApp(app)}
            onDownloadReceipt={(app) => setReceiptModalApp(app)}
            onDownloadEPan={(app) => setEPanModalApp(app)}
          />
        ) : (
          <CustomerDashboard
            currentUser={currentUser}
            applications={applications}
            notifications={notifications}
            onOpenService={handleSelectService}
            onOpenTracking={(id) => handleOpenTracking(id)}
            onViewApplication={(app) => setDetailsModalApp(app)}
            onDownloadReceipt={(app) => setReceiptModalApp(app)}
            onDownloadEPan={(app) => setEPanModalApp(app)}
            onRefresh={refreshData}
            onLogout={handleLogout}
          />
        )}
      </main>

      {/* 4. Global Modals */}

      {/* Application Form Modal (Requirement 4 & 5) */}
      {activeServiceModal && currentUser && (
        <ApplicationFormModal
          serviceType={activeServiceModal}
          currentUser={currentUser}
          onClose={() => setActiveServiceModal(null)}
          onSubmitSuccess={(newApp) => {
            setActiveServiceModal(null);
            refreshData();
            setCurrentView('dashboard');
            setReceiptModalApp(newApp);
          }}
        />
      )}

      {/* Live Tracking Modal (Requirement 8) */}
      {trackingModalOpen && (
        <TrackingModal
          initialId={trackingTargetId}
          onClose={() => setTrackingModalOpen(false)}
          onDownloadEPan={(app) => setEPanModalApp(app)}
          onDownloadReceipt={(app) => setReceiptModalApp(app)}
        />
      )}

      {/* E-PAN Card Viewer Modal (Requirement 3) */}
      {ePanModalApp && (
        <EPanCardModal
          application={ePanModalApp}
          onClose={() => setEPanModalApp(null)}
        />
      )}

      {/* Payment Receipt / Invoice Modal (Requirement 6) */}
      {receiptModalApp && (
        <PaymentReceiptModal
          application={receiptModalApp}
          onClose={() => setReceiptModalApp(null)}
        />
      )}

      {/* Application Dossier Details Modal */}
      {detailsModalApp && (
        <ApplicationDetailsModal
          application={detailsModalApp}
          onClose={() => setDetailsModalApp(null)}
          onDownloadReceipt={(app) => setReceiptModalApp(app)}
          onDownloadEPan={(app) => setEPanModalApp(app)}
        />
      )}

      {/* Registration Modal */}
      {registerModalOpen && (
        <RegisterModal
          onClose={() => setRegisterModalOpen(false)}
          onRegisterSuccess={(user) => {
            setRegisterModalOpen(false);
            setCurrentUser(user);
            setCurrentView('dashboard');
            refreshData();
          }}
        />
      )}

      {/* Forgot Password Modal */}
      {forgotPasswordModalOpen && (
        <ForgotPasswordModal
          onClose={() => setForgotPasswordModalOpen(false)}
        />
      )}

      {/* Govt / Identity Verification Modal */}
      {govtAuthModalType && (
        <GovtAuthModal
          type={govtAuthModalType}
          onClose={() => setGovtAuthModalType(null)}
          onSuccess={(user) => {
            setGovtAuthModalType(null);
            setCurrentUser(user);
            setCurrentView('dashboard');
            refreshData();
          }}
        />
      )}

      {/* Notifications Drawer */}
      {notificationsModalOpen && (
        <NotificationsModal
          notifications={notifications}
          onClose={() => setNotificationsModalOpen(false)}
          onSelectApplication={(id) => handleOpenTracking(id)}
          onMarkRead={handleMarkNotificationRead}
        />
      )}

      {/* Interactive Payment QR Modal */}
      {qrModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-sm rounded-3xl bg-[#09173f] border-2 border-amber-400 p-6 text-center space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-blue-900 pb-2 text-left">
              <div>
                <h3 className="text-base font-bold text-white">SAKIM Payment Gateway</h3>
                <p className="text-[11px] text-amber-300">Official UPI Instant Settlement QR</p>
              </div>
              <button
                onClick={() => setQrModalOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 bg-white rounded-2xl mx-auto w-52 h-52 flex flex-col items-center justify-center shadow-inner border border-amber-400">
              <QrCode className="w-40 h-40 text-slate-950" />
              <span className="text-[10px] font-mono font-bold text-slate-700 mt-1">UPI: sakimpan@icici</span>
            </div>

            <div className="space-y-1 text-xs">
              <p className="text-amber-300 font-bold text-sm">Application Fee: ₹107.00</p>
              <p className="text-slate-400 text-[11px]">Scan using Google Pay, PhonePe, Paytm, or BHIM</p>
            </div>

            <button
              onClick={() => {
                setQrModalOpen(false);
                handleSelectService('new_pan');
              }}
              className="gold-btn w-full py-2.5 rounded-xl text-xs font-black shadow"
            >
              Start PAN Application & Pay
            </button>
          </div>
        </div>
      )}

      {/* 5. Footer matching reference aesthetics */}
      <footer className="bg-[#030718] border-t border-amber-500/30 text-xs py-8 px-4 sm:px-6 mt-12 no-print">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 text-slate-400">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="font-cinzel text-lg font-black text-amber-400">SAKIM</span>
              <span className="text-white font-bold">Digital Seva Kendra</span>
            </div>
            <p className="text-[11px] leading-relaxed">
              Your trusted partner for 100% genuine citizen facilitation, government schemes, PAN services, certificates, and instant tracking.
            </p>
            <p className="text-[10px] text-amber-300 font-semibold">
              Assisted Facilitation Center • Secure AES Virtual Memory
            </p>
          </div>

          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">Our Services</p>
            <ul className="space-y-1 text-[11px]">
              <li><button onClick={() => handleSelectService('new_pan')} className="hover:text-amber-400">New PAN Application (Form 49A)</button></li>
              <li><button onClick={() => handleSelectService('minor_pan')} className="hover:text-amber-400">Minor PAN Card (Under 18 Years)</button></li>
              <li><button onClick={() => handleSelectService('major_pan')} className="hover:text-amber-400">Major PAN Conversion (Adult)</button></li>
              <li><button onClick={() => handleSelectService('correction')} className="hover:text-amber-400">PAN Correction & Update</button></li>
              <li><button onClick={() => handleSelectService('reprint')} className="hover:text-amber-400">Reprint Lost/Damaged PAN</button></li>
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-2">Quick Navigation</p>
            <ul className="space-y-1 text-[11px]">
              <li><button onClick={() => setCurrentView('dashboard')} className="hover:text-amber-400">Home Dashboard</button></li>
              <li><button onClick={() => handleOpenTracking()} className="hover:text-amber-400">Track PAN Application Status</button></li>
              <li><button onClick={() => setCurrentView('support')} className="hover:text-amber-400">Helpdesk & Support</button></li>
              <li>
                <button 
                  onClick={() => handleLogin('admin@sakim.com', 'admin')} 
                  className="text-amber-400 hover:text-white font-bold"
                >
                  Admin Control Portal
                </button>
              </li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-xs font-bold text-white uppercase tracking-wider mb-1">Contact & Legal</p>
            <p className="text-[11px] text-slate-300">
              Helpline: <strong className="text-amber-400">+91-98765-43210</strong>
            </p>
            <p className="text-[11px] text-slate-300">
              Email: <strong className="text-blue-300">support@sakim.com</strong>
            </p>
            <p className="text-[10px] text-slate-500 leading-tight">
              Disclaimer: SAKIM Digital Seva Kendra is an independent citizen facilitation platform. We provide assisted application preparation and official portal connectivity.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-6 pt-4 border-t border-blue-900/40 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-medium text-slate-300">
            © 2026 SAKIM Digital Seva Kendra. All Rights Reserved.
          </p>

          <div className="flex items-center gap-3 text-xs">
            <span className="font-bold text-white">Follow Us:</span>
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center text-[10px] font-bold shadow cursor-pointer hover:scale-110 transition-transform">
                ▶
              </span>
              <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-bold shadow cursor-pointer hover:scale-110 transition-transform">
                f
              </span>
              <span className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center text-[10px] font-bold shadow cursor-pointer hover:scale-110 transition-transform">
                ✆
              </span>
              <span className="w-6 h-6 rounded-full bg-sky-500 text-white flex items-center justify-center text-[10px] font-bold shadow cursor-pointer hover:scale-110 transition-transform">
                ✈
              </span>
              <span className="w-6 h-6 rounded-full bg-slate-800 text-white flex items-center justify-center text-[10px] font-bold shadow cursor-pointer hover:scale-110 transition-transform">
                ✕
              </span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
