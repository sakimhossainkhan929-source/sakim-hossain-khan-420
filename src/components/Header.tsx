import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  Phone, 
  HelpCircle, 
  User, 
  LogOut, 
  Search, 
  Bell, 
  Home, 
  Layers, 
  FileText, 
  CheckCircle2, 
  ChevronDown,
  Menu,
  X
} from 'lucide-react';
import { UserProfile, AppNotification } from '../types';

interface HeaderProps {
  currentUser: UserProfile | null;
  onNavigate: (view: 'home' | 'dashboard' | 'admin' | 'track' | 'support' | 'services') => void;
  onLoginClick: (role?: 'customer' | 'admin') => void;
  onLogout: () => void;
  onOpenTracking: () => void;
  onOpenNotifications: () => void;
  unreadCount: number;
  currentView: string;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onNavigate,
  onLoginClick,
  onLogout,
  onOpenTracking,
  onOpenNotifications,
  unreadCount,
  currentView
}) => {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric',
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit',
        hour12: true 
      };
      setCurrentTime(now.toLocaleDateString('en-US', options));
    };
    updateDateTime();
    const interval = setInterval(updateDateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="w-full select-none sticky top-0 z-40 bg-[#060e29]/95 backdrop-blur-md border-b border-amber-500/30 shadow-lg">
      {/* Top Utility Ticker Bar */}
      <div className="bg-[#030818] border-b border-blue-900/40 text-xs py-1.5 px-3 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-slate-300">
          {/* Date & Time and Digital India badge */}
          <div className="flex items-center gap-3">
            <span className="font-mono text-amber-300 font-semibold flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {currentTime || 'Tuesday, November 10, 2026 | 12:51 AM'}
            </span>
            <span className="hidden md:inline-block text-slate-600">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-blue-200">
              <span className="inline-flex items-center text-[11px] font-bold tracking-wide uppercase px-2 py-0.5 rounded bg-gradient-to-r from-orange-500 via-white to-green-600 text-slate-900 shadow-sm">
                Digital India
              </span>
              <span className="text-slate-300 font-medium">Empowering Every Citizen</span>
            </div>
          </div>

          {/* Helpdesk Contact & Quick Links */}
          <div className="flex items-center gap-4 text-xs">
            <a 
              href="tel:+919876543210" 
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 transition-colors font-medium"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Helpdesk: <strong className="text-white">+91-98765-43210</strong></span>
            </a>
            <span className="text-slate-600">|</span>
            <button 
              onClick={() => onNavigate('support')}
              className="hover:text-amber-400 flex items-center gap-1 transition-colors text-slate-300"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Support</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={onOpenTracking}
              className="text-amber-300 hover:text-amber-200 flex items-center gap-1 font-semibold"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track PAN</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between gap-4">
        {/* Brand Logo & Title */}
        <div 
          onClick={() => onNavigate(currentUser ? 'dashboard' : 'home')}
          className="flex items-center gap-3 cursor-pointer group"
        >
          {/* Golden Laurel Crest Badge */}
          <div className="relative flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-b from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
            <div className="w-full h-full bg-[#071333] rounded-[10px] flex flex-col items-center justify-center p-1 border border-amber-400/40">
              <span className="text-[10px] text-amber-300 font-bold tracking-tighter">★ ★ ★</span>
              <span className="text-xs font-black font-cinzel text-amber-300 tracking-wider">SAKIM</span>
              <Shield className="w-3.5 h-3.5 text-amber-400 fill-amber-400/20 -mt-0.5" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-xl sm:text-2xl font-black tracking-tight text-white font-cinzel drop-shadow-md">
                SAKIM
              </span>
              <span className="text-lg sm:text-xl font-bold text-amber-400">
                Digital Seva Kendra
              </span>
            </div>
            <p className="text-[11px] sm:text-xs text-blue-200 font-medium tracking-wide flex items-center gap-1">
              <span className="text-amber-300 font-semibold">Sabka Saath • Sabka Vikas • Sabka Digital Seva</span>
            </p>
          </div>
        </div>

        {/* Desktop Navigation Links Matching Reference Image */}
        <nav className="hidden lg:flex items-center gap-1.5">
          {/* Home Button (Gold Active) */}
          <button
            onClick={() => onNavigate(currentUser ? 'dashboard' : 'home')}
            className={`px-3.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
              (currentUser && (currentView === 'dashboard' || currentView === 'home')) || (!currentUser && currentView === 'home')
                ? 'gold-btn text-slate-950 shadow-md'
                : 'royal-nav-pill px-3 py-1 text-slate-200'
            }`}
          >
            <Home className="w-3.5 h-3.5" />
            Home
          </button>

          {/* Services Dropdown Button */}
          <button
            onClick={() => onNavigate(currentUser ? 'dashboard' : 'home')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
              currentView === 'services'
                ? 'gold-btn text-slate-950 shadow-md'
                : 'royal-nav-pill text-slate-200'
            }`}
          >
            <span>Services</span>
            <ChevronDown className="w-3 h-3 text-amber-400" />
          </button>

          {/* About Us Button */}
          <button
            onClick={() => onNavigate('support')}
            className="royal-nav-pill px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1"
          >
            About Us
          </button>

          {/* Our Features Button (from reference image) */}
          <button
            onClick={() => {
              const el = document.getElementById('key-features-section');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth' });
              } else {
                onNavigate(currentUser ? 'dashboard' : 'home');
              }
            }}
            className="royal-nav-pill px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1"
          >
            Our Features
          </button>

          {/* Support Dropdown Button */}
          <button
            onClick={() => onNavigate('support')}
            className={`px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
              currentView === 'support'
                ? 'gold-btn text-slate-950 shadow-md'
                : 'royal-nav-pill text-slate-200'
            }`}
          >
            <span>Support</span>
            <ChevronDown className="w-3 h-3 text-amber-400" />
          </button>

          {/* Contact Us Button */}
          <button
            onClick={() => onNavigate('support')}
            className="royal-nav-pill px-3 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1"
          >
            Contact Us
          </button>

          {/* My Account Button (Gold Pill Button on Right) */}
          {currentUser ? (
            <div className="relative ml-1">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="gold-btn px-4 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span className="truncate max-w-[100px]">{currentUser.name.split(' ')[0]}</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#09153a] border border-amber-500/40 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="px-3 py-2 border-b border-blue-900/60 mb-1">
                    <p className="text-xs font-bold text-white truncate">{currentUser.name}</p>
                    <p className="text-[11px] text-amber-300 font-mono truncate">{currentUser.email}</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold text-emerald-400 bg-emerald-950/60 border border-emerald-800 px-1.5 py-0.5 rounded">
                      ● Active {currentUser.role === 'admin' ? 'Administrator' : 'Customer'}
                    </span>
                  </div>

                  <button
                    onClick={() => {
                      setAccountMenuOpen(false);
                      onNavigate(currentUser.role === 'admin' ? 'admin' : 'dashboard');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-200 hover:bg-blue-900/40 hover:text-amber-300 flex items-center gap-2"
                  >
                    <FileText className="w-4 h-4 text-amber-400" />
                    <span>{currentUser.role === 'admin' ? 'Admin Control Center' : 'Customer Dashboard'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setAccountMenuOpen(false);
                      onOpenNotifications();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-slate-200 hover:bg-blue-900/40 hover:text-amber-300 flex items-center justify-between"
                  >
                    <span className="flex items-center gap-2">
                      <Bell className="w-4 h-4 text-blue-400" />
                      Notifications
                    </span>
                    {unreadCount > 0 && (
                      <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-red-600 text-white">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  <div className="border-t border-blue-900/60 my-1"></div>

                  <button
                    onClick={() => {
                      setAccountMenuOpen(false);
                      onLogout();
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-semibold text-rose-300 hover:bg-rose-950/40 flex items-center gap-2"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="relative ml-1">
              <button
                onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                className="gold-btn px-4 py-1 rounded-full text-xs font-black flex items-center gap-1.5 shadow-md cursor-pointer"
              >
                <User className="w-3.5 h-3.5" />
                <span>My Account</span>
                <ChevronDown className="w-3 h-3" />
              </button>

              {accountMenuOpen && (
                <div className="absolute right-0 mt-2 w-48 rounded-xl bg-[#09153a] border border-amber-500/50 shadow-2xl p-2 z-50 animate-in fade-in">
                  <button
                    onClick={() => {
                      setAccountMenuOpen(false);
                      onLoginClick('customer');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-200 hover:bg-blue-900/60 hover:text-amber-300 flex items-center gap-2"
                  >
                    <User className="w-4 h-4 text-amber-400" />
                    <span>Customer Login</span>
                  </button>

                  <button
                    onClick={() => {
                      setAccountMenuOpen(false);
                      onLoginClick('admin');
                    }}
                    className="w-full text-left px-3 py-2 rounded-lg text-xs font-bold text-slate-200 hover:bg-blue-900/60 hover:text-amber-300 flex items-center gap-2"
                  >
                    <Shield className="w-4 h-4 text-amber-400" />
                    <span>Admin Login</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Button */}
        <div className="lg:hidden flex items-center gap-2">
          {currentUser && (
            <button
              onClick={onOpenNotifications}
              className="relative p-2 rounded-lg bg-blue-950/80 text-amber-400 border border-blue-800/60"
            >
              <Bell className="w-4 h-4" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-600 text-[9px] font-bold rounded-full flex items-center justify-center text-white">
                  {unreadCount}
                </span>
              )}
            </button>
          )}

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-blue-950/80 text-amber-400 border border-amber-500/40"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#071333] border-t border-amber-500/30 px-4 py-3 space-y-2 animate-in slide-in-from-top">
          <button
            onClick={() => {
              onNavigate('home');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-slate-200 hover:bg-blue-900/40"
          >
            Home
          </button>
          <button
            onClick={() => {
              onNavigate('services');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-slate-200 hover:bg-blue-900/40"
          >
            Digital Seva Services
          </button>
          <button
            onClick={() => {
              onOpenTracking();
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-amber-400 hover:bg-blue-900/40"
          >
            Track PAN Status
          </button>
          <button
            onClick={() => {
              onNavigate('support');
              setMobileMenuOpen(false);
            }}
            className="w-full text-left py-2 px-3 rounded-lg text-sm font-semibold text-slate-200 hover:bg-blue-900/40"
          >
            Help & Support
          </button>

          <div className="border-t border-blue-900/60 pt-2">
            {currentUser ? (
              <div className="space-y-2">
                <div className="px-3 py-1 text-xs text-amber-300">
                  Signed in as <strong>{currentUser.name}</strong> ({currentUser.role})
                </div>
                <button
                  onClick={() => {
                    onNavigate(currentUser.role === 'admin' ? 'admin' : 'dashboard');
                    setMobileMenuOpen(false);
                  }}
                  className="w-full gold-btn py-2 rounded-lg text-sm font-bold text-center"
                >
                  Go to {currentUser.role === 'admin' ? 'Admin Dashboard' : 'Customer Dashboard'}
                </button>
                <button
                  onClick={() => {
                    onLogout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full py-2 rounded-lg text-sm font-bold text-rose-300 hover:bg-rose-950/40 text-center"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => {
                    onLoginClick('customer');
                    setMobileMenuOpen(false);
                  }}
                  className="gold-btn py-2 rounded-lg text-xs font-bold text-center"
                >
                  Customer Login
                </button>
                <button
                  onClick={() => {
                    onLoginClick('admin');
                    setMobileMenuOpen(false);
                  }}
                  className="bg-blue-950 border border-amber-500/50 py-2 rounded-lg text-xs font-bold text-amber-300 text-center"
                >
                  Admin Login
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};
