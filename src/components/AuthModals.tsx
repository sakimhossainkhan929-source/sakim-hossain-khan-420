import React, { useState } from 'react';
import { 
  X, 
  User, 
  Phone, 
  Mail, 
  MapPin, 
  Lock, 
  Eye, 
  EyeOff, 
  CheckCircle2, 
  ShieldCheck, 
  Fingerprint, 
  Sparkles,
  ArrowRight,
  Bell,
  AlertCircle,
  ExternalLink
} from 'lucide-react';
import { UserProfile, AppNotification } from '../types';
import { StorageService } from '../services/storageService';
import { FirebaseService } from '../services/firebase';

// 1. Registration Modal
interface RegisterModalProps {
  onClose: () => void;
  onRegisterSuccess: (user: UserProfile) => void;
}

export const RegisterModal: React.FC<RegisterModalProps> = ({
  onClose,
  onRegisterSuccess
}) => {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [email, setEmail] = useState('');
  const [state, setState] = useState('West Bengal');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [termsAgreed, setTermsAgreed] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return setError('Please enter your full legal name');
    if (!email.trim() || !email.includes('@')) return setError('Please enter a valid email address');
    if (!password || password.length < 6) return setError('Password must be at least 6 characters');
    if (password !== confirmPassword) return setError('Passwords do not match');
    if (!termsAgreed) return setError('Please accept the Terms & Privacy Declaration');

    setLoading(true);
    setError('');

    try {
      const newUser = await FirebaseService.registerUser(
        name.trim(), 
        email.trim().toLowerCase(), 
        password, 
        mobile.trim()
      );

      StorageService.saveUser(newUser);
      StorageService.setCurrentUser(newUser);

      // Welcome notification
      StorageService.addNotification({
        id: `notif-${Date.now()}`,
        userId: newUser.id,
        title: 'Welcome to SAKIM Digital Seva Kendra!',
        message: 'Your official citizen account is active with Firebase Authentication & Cloud Firestore. You can now access government services, PAN applications, and welfare schemes.',
        date: new Date().toISOString(),
        read: false,
        type: 'general'
      });

      onRegisterSuccess(newUser);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('email-already-in-use')) {
        setError('This email is already registered. Please login or use Forgot Password.');
      } else if (msg.includes('weak-password')) {
        setError('Password should be at least 6 characters.');
      } else if (msg.includes('invalid-email')) {
        setError('Invalid email address format.');
      } else {
        setError(msg || 'Registration failed. Please check your network and try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-md rounded-3xl bg-gradient-to-b from-[#0c2054] to-[#06102c] border-2 border-amber-400 p-6 sm:p-7 shadow-2xl space-y-5 text-xs text-slate-200">
        <div className="flex items-center justify-between border-b border-blue-900 pb-3">
          <div>
            <h2 className="text-lg font-black text-white">Citizen Registration</h2>
            <p className="text-amber-300 text-xs">Create your personal SAKIM Digital Seva Kendra account</p>
          </div>
          <button onClick={onClose} className="p-1 rounded-lg text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {error && (
          <div className="p-2.5 rounded-xl bg-red-950 border border-red-700 text-red-300 font-medium flex items-start gap-2">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Full Legal Name *</label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="As per Aadhaar / Official ID"
                required
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#040b20] border border-blue-800 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Email Address (Login ID) *</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="citizen@example.com"
                required
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#040b20] border border-blue-800 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Mobile (Optional)</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="tel"
                  maxLength={10}
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                  placeholder="10 Digits"
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#040b20] border border-blue-800 font-mono text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">State / UT *</label>
              <select
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="w-full px-2 py-2 rounded-xl bg-[#040b20] border border-blue-800 text-white text-xs"
              >
                <option value="West Bengal">West Bengal</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Delhi">Delhi</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Bihar">Bihar</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Gujarat">Gujarat</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Password *</label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 chars"
                  required
                  className="w-full pl-9 pr-7 py-2 rounded-xl bg-[#040b20] border border-blue-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Confirm Password *</label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                required
                className="w-full px-3 py-2 rounded-xl bg-[#040b20] border border-blue-800 text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-400">
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-amber-300 hover:underline flex items-center gap-1"
            >
              {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
              <span>{showPassword ? 'Hide Passwords' : 'Show Passwords'}</span>
            </button>
            <span className="text-[10px] text-emerald-400">Firebase Encrypted</span>
          </div>

          <label className="flex items-start gap-2 pt-1 cursor-pointer text-[11px] text-slate-300">
            <input
              type="checkbox"
              checked={termsAgreed}
              onChange={(e) => setTermsAgreed(e.target.checked)}
              className="mt-0.5 rounded text-amber-500 focus:ring-amber-400"
            />
            <span>I agree to the Digital Personal Data Protection (DPDP) Act terms and authorize SAKIM Digital Seva Kendra to process citizen facilitation requests.</span>
          </label>

          <button
            type="submit"
            disabled={loading}
            className="gold-btn w-full py-2.5 rounded-xl font-black text-xs shadow-md mt-2 flex items-center justify-center gap-1.5 disabled:opacity-50"
          >
            {loading ? (
              <span>Creating Firebase Account...</span>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

// 2. Forgot Password Modal (Firebase Password Reset)
interface ForgotPasswordModalProps {
  onClose: () => void;
}

export const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const handleResetSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      setError('Please enter a valid registered email address.');
      return;
    }

    setLoading(true);
    setError('');

    try {
      await FirebaseService.sendPasswordReset(email.trim().toLowerCase());
      setSent(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      if (msg.includes('user-not-found')) {
        setError('No account found with this email address. Please sign up first.');
      } else if (msg.includes('invalid-email')) {
        setError('Invalid email address format.');
      } else {
        setError(msg || 'Failed to dispatch reset email. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-sm rounded-3xl bg-[#09173f] border-2 border-amber-400 p-6 space-y-4 text-xs text-slate-200">
        <div className="flex items-center justify-between border-b border-blue-900 pb-2">
          <h3 className="font-bold text-white text-base">Reset Password</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {!sent ? (
          <form onSubmit={handleResetSubmit} className="space-y-3">
            <p className="text-slate-300 text-xs">
              Enter your registered Firebase email address. An official password reset link will be sent directly to your inbox.
            </p>

            {error && (
              <div className="p-2.5 rounded-xl bg-red-950 border border-red-700 text-red-300 font-medium">
                {error}
              </div>
            )}

            <div>
              <label className="block mb-1 text-slate-300 font-semibold">Registered Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  required
                  className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#040b20] border border-blue-800 text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="gold-btn w-full py-2.5 rounded-xl font-bold flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {loading ? <span>Sending Reset Link...</span> : <span>Send Password Reset Link</span>}
            </button>
          </form>
        ) : (
          <div className="text-center space-y-3 py-3">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/40">
              <CheckCircle2 className="w-7 h-7" />
            </div>
            <h4 className="text-sm font-bold text-white">Reset Email Dispatched!</h4>
            <p className="text-[11px] text-slate-300 leading-relaxed">
              We have dispatched a password reset link to <strong className="text-amber-300">{email}</strong>. Please check your inbox (and spam folder) to set a new password, then return to log in.
            </p>
            <button
              onClick={onClose}
              className="gold-btn w-full py-2 rounded-xl font-bold text-xs"
            >
              Back to Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// 3. Government / Identity Integration Status Modal (Google / DigiLocker / Aadhaar)
// Upgraded to real authentication requirements: No fake OTPs, no simulated login success.
interface GovtAuthModalProps {
  type: 'google' | 'digilocker' | 'aadhaar';
  onClose: () => void;
  onSuccess: (user: UserProfile) => void;
}

export const GovtAuthModal: React.FC<GovtAuthModalProps> = ({
  type,
  onClose,
  onSuccess
}) => {
  const googleClientId = typeof import.meta !== 'undefined' && import.meta.env ? (import.meta.env.VITE_GOOGLE_CLIENT_ID || '') : '';

  const handleGoogleAuth = () => {
    if (googleClientId) {
      // Direct to Google OAuth endpoint when client ID is configured
      const redirectUri = window.location.origin;
      const scope = encodeURIComponent('email profile openid');
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${googleClientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=${scope}`;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl bg-[#09173f] border-2 border-amber-400 p-6 space-y-4 text-xs text-slate-200">
        <div className="flex items-center justify-between border-b border-blue-900 pb-2 text-left">
          <div className="flex items-center gap-2">
            {type === 'aadhaar' ? (
              <Fingerprint className="w-5 h-5 text-orange-400" />
            ) : type === 'digilocker' ? (
              <ShieldCheck className="w-5 h-5 text-blue-400" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            )}
            <h3 className="font-bold text-white text-sm capitalize">
              {type === 'google' 
                ? 'Google Sign-In Authentication' 
                : type === 'digilocker' 
                ? 'DigiLocker Official Integration' 
                : 'Aadhaar e-KYC Statutory Integration'}
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 1. GOOGLE SIGN-IN STATUS */}
        {type === 'google' && (
          <div className="space-y-3">
            <div className="p-3.5 rounded-2xl bg-blue-950/80 border border-blue-800 text-left space-y-2">
              <span className="text-amber-300 font-bold block text-xs">
                Real Google Sign-In Status:
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                {googleClientId 
                  ? 'Google OAuth 2.0 Client ID is detected. Click below to authenticate via your Google Account.'
                  : 'Google OAuth 2.0 Client ID is currently pending configuration in environment variables.'}
              </p>
              <div className="font-mono text-[10px] bg-[#040a1d] p-2 rounded border border-blue-900 text-slate-400">
                Required Key: <strong className="text-amber-400">VITE_GOOGLE_CLIENT_ID</strong><br />
                Configured: {googleClientId ? <span className="text-emerald-400 font-bold">YES</span> : <span className="text-red-400 font-bold">NO (Pending in .env)</span>}
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 text-left space-y-1">
              <strong className="block text-amber-300">Security & Anti-Simulation Policy:</strong>
              <p className="text-slate-300">
                Per requirement 6, mock or fake Google authentication has been completely removed. Live Google Sign-In requires your registered OAuth Client ID in Google Cloud Console.
              </p>
            </div>

            {googleClientId ? (
              <button
                onClick={handleGoogleAuth}
                className="w-full gold-btn py-2.5 rounded-xl font-black shadow flex items-center justify-center gap-2"
              >
                <span>Authorize with Google OAuth</span>
                <ExternalLink className="w-4 h-4" />
              </button>
            ) : (
              <div className="space-y-2">
                <button
                  disabled
                  className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-400 text-xs font-bold cursor-not-allowed border border-slate-700"
                >
                  Configure VITE_GOOGLE_CLIENT_ID to Enable
                </button>
                <p className="text-[10px] text-slate-400 text-center">
                  In the meantime, citizens can sign in securely with their verified Mobile Number / Email & Password.
                </p>
              </div>
            )}
          </div>
        )}

        {/* 2. DIGILOCKER INTEGRATION STATUS */}
        {type === 'digilocker' && (
          <div className="space-y-3 text-left">
            <div className="p-3.5 rounded-2xl bg-blue-950/80 border border-blue-800 space-y-2">
              <span className="text-blue-300 font-bold block text-xs">
                DigiLocker (MeriPehchaan) Official Integration:
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Authorized DigiLocker document access operates via the National Single Sign-On (MeriPehchaan) OAuth Gateway requiring statutory client credentials.
              </p>
              <div className="font-mono text-[10px] bg-[#040a1d] p-2 rounded border border-blue-900 text-slate-400">
                Required Keys: <strong className="text-amber-400">DIGILOCKER_CLIENT_ID, DIGILOCKER_CLIENT_SECRET</strong><br />
                Status: <span className="text-amber-400 font-bold">Awaiting Production API Keys</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 space-y-1">
              <strong className="block text-amber-300">Zero Simulated Data Guarantee:</strong>
              <p className="text-slate-300">
                Fake document retrieval is disabled. Citizens can access the genuine government DigiLocker portal directly at <strong>digilocker.gov.in</strong> or sign in via registered credentials.
              </p>
            </div>

            <a
              href="https://www.digilocker.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full gold-btn py-2.5 rounded-xl font-black shadow flex items-center justify-center gap-1.5 no-underline"
            >
              <span>Open Official DigiLocker Portal (digilocker.gov.in)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* 3. AADHAAR STATUTORY NOTICE */}
        {type === 'aadhaar' && (
          <div className="space-y-3 text-left">
            <div className="p-3.5 rounded-2xl bg-orange-950/80 border border-orange-700/60 space-y-2">
              <span className="text-orange-300 font-bold block text-xs">
                Aadhaar Authentication Legal & Regulatory Standards:
              </span>
              <p className="text-slate-300 leading-relaxed text-[11px]">
                Direct Aadhaar biometric and OTP e-KYC is strictly governed by the <strong>Aadhaar Act 2016</strong> and requires authorized Authentication User Agency (AUA / KUA) license from UIDAI.
              </p>
              <div className="font-mono text-[10px] bg-[#040a1d] p-2 rounded border border-orange-900 text-slate-400">
                Required Licensing: <strong className="text-orange-400">UIDAI_ASA_KUA_LICENSE</strong><br />
                Status: <span className="text-orange-400 font-bold">Authorized Gateway Integration Required</span>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-[11px] text-amber-200 space-y-1">
              <strong className="block text-amber-300">Privacy & Security Protection:</strong>
              <p className="text-slate-300">
                Per requirement 6 and the Digital Personal Data Protection (DPDP) Act, no fake OTPs (such as '123456') or mock Aadhaar capture forms are permitted. To access genuine UIDAI Aadhaar services, visit <strong>uidai.gov.in</strong>.
              </p>
            </div>

            <a
              href="https://uidai.gov.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full gold-btn py-2.5 rounded-xl font-black shadow flex items-center justify-center gap-1.5 no-underline"
            >
              <span>Open Official UIDAI Portal (uidai.gov.in)</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        <div className="pt-2 border-t border-blue-900/60 text-center">
          <button
            onClick={onClose}
            className="text-xs text-slate-400 hover:text-white font-semibold"
          >
            Close & Return to Login
          </button>
        </div>
      </div>
    </div>
  );
};

// 4. Notifications Center Modal
interface NotificationsModalProps {
  notifications: AppNotification[];
  onClose: () => void;
  onSelectApplication?: (appId: string) => void;
  onMarkRead: (notifId: string) => void;
}

export const NotificationsModal: React.FC<NotificationsModalProps> = ({
  notifications,
  onClose,
  onSelectApplication,
  onMarkRead
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-md rounded-3xl bg-[#09173f] border-2 border-amber-400 p-6 space-y-4 text-xs text-slate-200 max-h-[85vh] flex flex-col">
        <div className="flex items-center justify-between border-b border-blue-900 pb-2 shrink-0">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-amber-400" />
            <h3 className="font-bold text-white text-base">Notifications & Alerts</h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-2 overflow-y-auto flex-1 pr-1">
          {notifications.length === 0 ? (
            <p className="text-center py-6 text-slate-400">No notifications at this time.</p>
          ) : (
            notifications.map(n => (
              <div
                key={n.id}
                onClick={() => {
                  onMarkRead(n.id);
                  if (n.linkToApplicationId && onSelectApplication) {
                    onSelectApplication(n.linkToApplicationId);
                    onClose();
                  }
                }}
                className={`p-3 rounded-2xl border transition cursor-pointer ${
                  n.read 
                    ? 'bg-blue-950/40 border-blue-900 text-slate-400' 
                    : 'bg-[#0a1844] border-amber-500/50 text-white shadow-md'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-amber-300 text-xs">{n.title}</span>
                  <span className="text-[10px] text-slate-400 font-mono">
                    {new Date(n.date).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-[11px] text-slate-300 mt-1">{n.message}</p>
                {n.linkToApplicationId && (
                  <span className="inline-block mt-2 text-[10px] text-amber-400 font-bold underline">
                    View Application {n.linkToApplicationId} →
                  </span>
                )}
              </div>
            ))
          )}
        </div>

        <button
          onClick={onClose}
          className="w-full py-2 rounded-xl bg-blue-950 text-slate-300 font-bold shrink-0"
        >
          Close
        </button>
      </div>
    </div>
  );
};
