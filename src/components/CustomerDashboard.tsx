import React, { useState } from 'react';
import { 
  FileText, 
  Plus, 
  Search, 
  Download, 
  Eye, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  CreditCard, 
  Bell, 
  HelpCircle, 
  User, 
  Shield, 
  Database, 
  Printer, 
  ArrowRight,
  ExternalLink,
  RefreshCw,
  Sparkles,
  ChevronRight,
  Layers,
  FileCheck,
  Mail,
  Fingerprint,
  HardHat,
  HeartHandshake,
  HeartPulse,
  Plane,
  Car,
  ShoppingBag,
  Cpu,
  Smartphone,
  Send,
  Building2,
  Users,
  ShieldCheck,
  Home,
  FileSignature,
  Radar,
  Receipt,
  PhoneCall,
  X,
  Check,
  Megaphone,
  Zap,
  Headphones,
  Vote,
  Sun,
  Sprout,
  Briefcase,
  Flame,
  GraduationCap,
  Baby,
  Scroll,
  Award,
  Droplet,
  Train
} from 'lucide-react';
import { 
  UserProfile, 
  PanApplication, 
  ServiceType, 
  ApplicationStatus, 
  AppNotification 
} from '../types';
import { NEW_GOVERNMENT_SERVICES, NewGovernmentService } from '../services/newServicesData';
import { NewServiceDetailView } from './NewServiceDetailView';

interface CustomerDashboardProps {
  currentUser: UserProfile;
  applications: PanApplication[];
  notifications: AppNotification[];
  onOpenService: (service: ServiceType) => void;
  onOpenTracking: (appId?: string) => void;
  onViewApplication: (app: PanApplication) => void;
  onDownloadReceipt: (app: PanApplication) => void;
  onDownloadEPan: (app: PanApplication) => void;
  onRefresh: () => void;
  onLogout: () => void;
}

interface CitizenServiceItem {
  id: string;
  titleEn: string;
  titleHi: string;
  gradientClass: string;
  borderClass: string;
  iconBg: string;
  actionType: 'pan_menu' | 'pan_service' | 'tracking' | 'download' | 'receipt' | 'generic' | 'external_gov';
  panServiceType?: ServiceType;
  officialUrl?: string;
  portalName?: string;
  description: string;
  fee?: string;
  turnaround?: string;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({
  currentUser,
  applications,
  notifications,
  onOpenService,
  onOpenTracking,
  onViewApplication,
  onDownloadReceipt,
  onDownloadEPan,
  onRefresh,
  onLogout
}) => {
  // Modal states
  const [panPickerOpen, setPanPickerOpen] = useState(false);
  const [genericServiceModal, setGenericServiceModal] = useState<CitizenServiceItem | null>(null);
  const [activeDossierTab, setActiveDossierTab] = useState<'applications' | 'receipts' | 'downloads'>('applications');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showDossier, setShowDossier] = useState(false);

  // Statistics
  const totalApps = applications.length;
  const completedApps = applications.filter(a => a.status === 'completed').length;
  const reviewApps = applications.filter(a => a.status === 'under_review' || a.status === 'processing').length;
  const actionRequiredApps = applications.filter(a => a.status === 'document_required').length;

  const filteredApplications = applications.filter(app => {
    const matchesFilter = statusFilter === 'all' || app.status === statusFilter;
    const matchesSearch = 
      app.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.acknowledgementNo.includes(searchQuery) ||
      app.applicant.fullNameOnCard.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // New Government Services States (34 Services across 4 categories in Demo Mode)
  const [selectedNewService, setSelectedNewService] = useState<NewGovernmentService | null>(null);
  const [activeNewCategory, setActiveNewCategory] = useState<'all' | 'identity' | 'schemes' | 'certificates' | 'other'>('all');
  const [newServicesList, setNewServicesList] = useState<NewGovernmentService[]>(NEW_GOVERNMENT_SERVICES);

  const filteredNewServices = newServicesList.filter(s => {
    if (activeNewCategory === 'all') return true;
    return s.category === activeNewCategory;
  });

  // The 21 3D Glossy Service Cards (Matching the 7 columns x 3 rows in the reference image)
  // All 19 official government portals connect to genuine verified HTTPS destinations.
  // AEPS Biometric & Micro ATM remain 100% unchanged as assisted counter desks per Requirement 5.
  const citizenServices: CitizenServiceItem[] = [
    // ── ROW 1 ──
    {
      id: 'aadhaar_card',
      titleEn: 'Aadhaar Card',
      titleHi: 'आधार कार्ड',
      gradientClass: 'bg-gradient-to-b from-[#d91424] via-[#b9101d] to-[#7f0a13]',
      borderClass: 'border-[#ff4d5a] text-[#ff4d5a]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://uidai.gov.in/',
      portalName: 'UIDAI - Unique Identification Authority of India',
      description: 'Official UIDAI Aadhaar portal: Download e-Aadhaar, Order Aadhaar PVC Card, Check Aadhaar Status, and update demographic details.',
      fee: '₹50 Government Fee',
      turnaround: 'Instant / 3-5 Days'
    },
    {
      id: 'pan_card',
      titleEn: 'PAN Card',
      titleHi: 'पैन कार्ड',
      gradientClass: 'bg-gradient-to-b from-[#0c4a9e] via-[#083272] to-[#041a40]',
      borderClass: 'border-[#38bdf8] text-[#38bdf8]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://tinpan.proteantech.in/services/pan/pan-index',
      portalName: 'Protean (TIN-NSDL) Official PAN Portal',
      description: 'Official Protean TIN-NSDL Permanent Account Number portal: New PAN (Form 49A/49AA), Changes/Correction in PAN data, and Reprint.',
      fee: '₹107.00 All inclusive',
      turnaround: '48-72 Hours'
    },
    {
      id: 'labour_card',
      titleEn: 'Labour Card',
      titleHi: 'श्रमिक कार्ड',
      gradientClass: 'bg-gradient-to-b from-[#0a9e2d] via-[#077220] to-[#044012]',
      borderClass: 'border-[#4ade80] text-[#4ade80]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://labour.wb.gov.in/',
      portalName: 'West Bengal Labour Department Portal',
      description: 'Government of West Bengal Labour Department: BOCW registration, Samajik Suraksha Yojana (SSY), and shramik welfare services.',
      fee: 'Govt Subsidized',
      turnaround: '5-7 Working Days'
    },
    {
      id: 'e_shram',
      titleEn: 'e-Shram / ABHA',
      titleHi: 'ई-श्रम कार्ड',
      gradientClass: 'bg-gradient-to-b from-[#82129e] via-[#5d0c72] to-[#340440]',
      borderClass: 'border-[#c084fc] text-[#c084fc]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://eshram.gov.in/',
      portalName: 'Ministry of Labour & Employment - e-Shram Portal',
      description: 'National Database of Unorganised Workers (NDUW): Register for 12-digit UAN Card, accidental cover under PMSBY, and social welfare benefits.',
      fee: 'Free Registration',
      turnaround: 'Instant Digital Card'
    },
    {
      id: 'ayushman_bharat',
      titleEn: 'ABHA Health Card',
      titleHi: 'आयुष्मान भारत',
      gradientClass: 'bg-gradient-to-b from-[#e05e00] via-[#ab4700] to-[#692a00]',
      borderClass: 'border-[#fb923c] text-[#fb923c]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://abha.abdm.gov.in/',
      portalName: 'Ayushman Bharat Digital Mission (ABDM) - National Health Authority',
      description: 'Official ABHA portal: Create 14-digit Ayushman Bharat Health Account (ABHA) number, access digital health records, and PM-JAY scheme.',
      fee: 'Free of Cost',
      turnaround: 'Instant Download'
    },
    {
      id: 'passport',
      titleEn: 'Passport',
      titleHi: 'पासपोर्ट',
      gradientClass: 'bg-gradient-to-b from-[#006b6b] via-[#004747] to-[#002626]',
      borderClass: 'border-[#2dd4bf] text-[#2dd4bf]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://www.passportindia.gov.in/',
      portalName: 'Passport Seva - Ministry of External Affairs, Govt. of India',
      description: 'Passport Seva official portal: Apply for Fresh/Reissue Passport, Police Clearance Certificate (PCC), schedule PSK appointments, and track status.',
      fee: '₹1,500 Standard Fee',
      turnaround: 'Appointment Booking'
    },
    {
      id: 'driving_licence',
      titleEn: 'Driving Licence',
      titleHi: 'ड्राइविंग लाइसेंस',
      gradientClass: 'bg-gradient-to-b from-[#0d8a70] via-[#086350] to-[#04382c]',
      borderClass: 'border-[#34d399] text-[#34d399]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://parivahan.gov.in/',
      portalName: 'Parivahan Sarathi - Ministry of Road Transport and Highways',
      description: 'Official MoRTH Parivahan Sarathi portal: Apply for Learner Licence, Driving Licence test slot booking, DL renewal, and duplicate DL.',
      fee: 'RTO Prescribed Fee',
      turnaround: 'Slot in 48 Hours'
    },

    // ── ROW 2 ──
    {
      id: 'ration_card',
      titleEn: 'Ration Card',
      titleHi: 'राशन कार्ड',
      gradientClass: 'bg-gradient-to-b from-[#7c1694] via-[#540e66] to-[#31073d]',
      borderClass: 'border-[#e879f9] text-[#e879f9]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://food.wb.gov.in/',
      portalName: 'West Bengal Food & Supplies Department Portal',
      description: 'Department of Food & Supplies, Govt. of West Bengal: Apply for digital ration card (Form 3/4), link Aadhaar with ration card, and check status.',
      fee: 'State Prescribed',
      turnaround: '7-14 Working Days'
    },
    {
      id: 'aeps',
      titleEn: 'AEPS Biometric',
      titleHi: 'आधार पेमेंट',
      gradientClass: 'bg-gradient-to-b from-[#008ba3] via-[#006073] to-[#003842]',
      borderClass: 'border-[#22d3ee] text-[#22d3ee]',
      iconBg: 'bg-white/20',
      actionType: 'generic',
      description: 'Aadhaar Enabled Payment System (AEPS) cash withdrawal, balance enquiry, and mini-statement through certified merchant counter desk.',
      fee: 'Zero Charges',
      turnaround: 'Real-Time Immediate'
    },
    {
      id: 'micro_atm',
      titleEn: 'Micro ATM',
      titleHi: 'माइक्रो ATM',
      gradientClass: 'bg-gradient-to-b from-[#c4146e] via-[#8c0d4e] to-[#54062e]',
      borderClass: 'border-[#f472b6] text-[#f472b6]',
      iconBg: 'bg-white/20',
      actionType: 'generic',
      description: 'Instant debit card cash payout and balance check across all major Indian banks through hand-held POS terminal.',
      fee: 'Bank Standard',
      turnaround: 'Instant Cash'
    },
    {
      id: 'money_transfer',
      titleEn: 'Money Transfer',
      titleHi: 'पैसे भेजें',
      gradientClass: 'bg-gradient-to-b from-[#0e9647] via-[#096931] to-[#053d1c]',
      borderClass: 'border-[#34d399] text-[#34d399]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://www.npci.org.in/',
      portalName: 'National Payments Corporation of India (NPCI)',
      description: 'Official NPCI payment network: Domestic Money Transfer (DMT), IMPS, NEFT, and Unified Payments Interface (UPI) infrastructure.',
      fee: 'Nominal IMPS Surcharge',
      turnaround: 'Under 60 Seconds'
    },
    {
      id: 'namo_loan',
      titleEn: 'Namo Loan',
      titleHi: 'नमो लोन',
      gradientClass: 'bg-gradient-to-b from-[#164da3] via-[#0e3470] to-[#081e42]',
      borderClass: 'border-[#60a5fa] text-[#60a5fa]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://pmsvanidhi.mohua.gov.in/',
      portalName: 'PM SVANidhi - Ministry of Housing and Urban Affairs',
      description: 'Prime Minister Street Vendor AtmaNirbhar Nidhi (PM SVANidhi) portal: Micro-credit facility of ₹10,000, ₹20,000, and ₹50,000 with interest subsidy.',
      fee: 'Subsidized Interest',
      turnaround: 'Direct Bank Credit'
    },
    {
      id: 'pm_kisan',
      titleEn: 'PM Kisan',
      titleHi: 'किसान सम्मान निधि',
      gradientClass: 'bg-gradient-to-b from-[#e06602] via-[#a34a00] to-[#612b00]',
      borderClass: 'border-[#fb923c] text-[#fb923c]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://pmkisan.gov.in/',
      portalName: 'PM-KISAN Samman Nidhi - Ministry of Agriculture & Farmers Welfare',
      description: 'Official PM-KISAN Portal: Farmer e-KYC verification, new farmer registration, beneficiary status check, and installment payment inquiry.',
      fee: 'Free Govt Service',
      turnaround: 'Instant KYC'
    },
    {
      id: 'insurance',
      titleEn: 'Insurance',
      titleHi: 'बीमा सेवाएं',
      gradientClass: 'bg-gradient-to-b from-[#6918a3] via-[#480f73] to-[#280842]',
      borderClass: 'border-[#a855f7] text-[#a855f7]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://www.jansuraksha.gov.in/',
      portalName: 'Pradhan Mantri Jan Suraksha (PMJJBY & PMSBY)',
      description: 'Official Jan Suraksha portal: Pradhan Mantri Jeevan Jyoti Bima Yojana (PMJJBY) and Pradhan Mantri Suraksha Bima Yojana (PMSBY) forms and claims.',
      fee: '₹20 to ₹436 / Year',
      turnaround: 'Instant Policy'
    },

    // ── ROW 3 ──
    {
      id: 'govt_schemes',
      titleEn: 'Govt Schemes',
      titleHi: 'सरकारी योजनाएं',
      gradientClass: 'bg-gradient-to-b from-[#329e0a] via-[#237006] to-[#133d02]',
      borderClass: 'border-[#86efac] text-[#86efac]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://www.myscheme.gov.in/',
      portalName: 'myScheme National Portal - Government of India',
      description: 'Official myScheme portal: Discover government schemes based on eligibility, search 500+ central and state schemes, and apply online directly.',
      fee: 'Free Guidance',
      turnaround: 'Direct Assistance'
    },
    {
      id: 'online_apply',
      titleEn: 'Online Apply',
      titleHi: 'ऑनलाइन आवेदन',
      gradientClass: 'bg-gradient-to-b from-[#0f449e] via-[#0a2f70] to-[#051a42]',
      borderClass: 'border-[#38bdf8] text-[#38bdf8]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://tinpan.proteantech.in/services/pan/pan-index',
      portalName: 'Protean (TIN-NSDL) Form 49A Online PAN Portal',
      description: 'Direct online application for new Permanent Account Number (Form 49A) on the official Protean TIN-NSDL server.',
      fee: '₹107.00',
      turnaround: 'Instant Filing'
    },
    {
      id: 'status_track',
      titleEn: 'Status Track',
      titleHi: 'स्थिति जांचें',
      gradientClass: 'bg-gradient-to-b from-[#82199e] via-[#59106e] to-[#330740]',
      borderClass: 'border-[#c084fc] text-[#c084fc]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://tin.tin.nsdl.com/pantan/StatusTrack.html',
      portalName: 'Income Tax / TIN-NSDL Real-Time PAN Status Tracking',
      description: 'Official Income Tax Department / TIN-NSDL real-time PAN/TAN Application Status Tracking portal.',
      fee: 'Free Real-time Tracking',
      turnaround: 'Instant Live'
    },
    {
      id: 'download',
      titleEn: 'Download',
      titleHi: 'डाउनलोड करें',
      gradientClass: 'bg-gradient-to-b from-[#0e8a4a] via-[#095e32] to-[#05361c]',
      borderClass: 'border-[#4ade80] text-[#4ade80]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://www.onlineservices.nsdl.com/paam/requestAndDownloadEPAN.html',
      portalName: 'Protean / NSDL Official e-PAN Download Portal',
      description: 'Official Protean TIN-NSDL portal to download digital e-PAN Card PDF with QR code using Acknowledgement Number or PAN.',
      fee: 'Free for Allocated PANs',
      turnaround: 'Instant Download'
    },
    {
      id: 'print',
      titleEn: 'Print',
      titleHi: 'प्रिंट करें',
      gradientClass: 'bg-gradient-to-b from-[#d61828] via-[#990f1b] to-[#59070e]',
      borderClass: 'border-[#f87171] text-[#f87171]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://www.onlineservices.nsdl.com/paam/ReprintEPan.html',
      portalName: 'Protean / NSDL Official Reprint PAN Card Portal',
      description: 'Official Protean TIN-NSDL portal for requesting reprint of physical PVC PAN card delivered directly to registered address.',
      fee: 'Official Tax Invoice',
      turnaround: 'Instant Print'
    },
    {
      id: 'bill_payment',
      titleEn: 'Bill Payment',
      titleHi: 'बिल भुगतान',
      gradientClass: 'bg-gradient-to-b from-[#0277a8] via-[#015173] to-[#002f42]',
      borderClass: 'border-[#38bdf8] text-[#38bdf8]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://www.bharatbillpay.com/',
      portalName: 'Bharat BillPay (BBPS) - NPCI Official Portal',
      description: 'Bharat BillPay official portal: Integrated one-stop bill payment system for electricity, water, gas, broadband, and municipal taxes.',
      fee: 'BBPS Authorized',
      turnaround: 'Instant Receipt'
    },
    {
      id: 'mobile_recharge',
      titleEn: 'Mobile Recharge',
      titleHi: 'मोबाइल रिचार्ज',
      gradientClass: 'bg-gradient-to-b from-[#18a834] via-[#107323] to-[#084214]',
      borderClass: 'border-[#4ade80] text-[#4ade80]',
      iconBg: 'bg-white/20',
      actionType: 'external_gov',
      officialUrl: 'https://www.bharatbillpay.com/',
      portalName: 'Bharat BillPay (BBPS) - Mobile Recharge Official Portal',
      description: 'Official Bharat Bill Payment System for prepaid mobile recharge, postpaid mobile bill pay, and DTH service recharges.',
      fee: 'Zero Surcharge',
      turnaround: 'Instant Confirmation'
    }
  ];

  const handleCardClick = (service: CitizenServiceItem) => {
    if (service.officialUrl) {
      window.open(service.officialUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    switch (service.actionType) {
      case 'pan_menu':
        setPanPickerOpen(true);
        break;
      case 'pan_service':
        if (service.panServiceType) {
          onOpenService(service.panServiceType);
        } else {
          setPanPickerOpen(true);
        }
        break;
      case 'tracking':
        onOpenTracking();
        break;
      case 'download':
        const completed = applications.find(a => a.status === 'completed');
        if (completed) {
          onDownloadEPan(completed);
        } else if (applications.length > 0) {
          onViewApplication(applications[0]);
        } else {
          setPanPickerOpen(true);
        }
        break;
      case 'receipt':
        if (applications.length > 0) {
          onDownloadReceipt(applications[0]);
        } else {
          setPanPickerOpen(true);
        }
        break;
      case 'generic':
      default:
        setGenericServiceModal(service);
        break;
    }
  };

  const getServiceIcon = (id: string) => {
    switch (id) {
      case 'aadhaar_card':
        return <Fingerprint className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow" />;
      case 'pan_card':
        return (
          <div className="relative flex items-center justify-center">
            <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 drop-shadow" />
            <span className="absolute -bottom-1 -right-1 text-[8px] font-black bg-blue-950 text-white px-1 rounded border border-amber-300">
              PAN
            </span>
          </div>
        );
      case 'labour_card':
        return <HardHat className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 drop-shadow" />;
      case 'e_shram':
        return <Cpu className="w-7 h-7 sm:w-8 sm:h-8 text-white drop-shadow" />;
      case 'ayushman_bharat':
        return <HeartPulse className="w-7 h-7 sm:w-8 sm:h-8 text-red-200 drop-shadow" />;
      case 'passport':
        return <Plane className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-200 drop-shadow" />;
      case 'driving_licence':
        return <Car className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-200 drop-shadow" />;
      case 'ration_card':
        return <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 text-purple-200 drop-shadow" />;
      case 'aeps':
        return <Fingerprint className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-200 drop-shadow" />;
      case 'micro_atm':
        return <Smartphone className="w-7 h-7 sm:w-8 sm:h-8 text-pink-200 drop-shadow" />;
      case 'money_transfer':
        return <Send className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-200 drop-shadow" />;
      case 'namo_loan':
        return <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-blue-200 drop-shadow" />;
      case 'pm_kisan':
        return <User className="w-7 h-7 sm:w-8 sm:h-8 text-amber-200 drop-shadow" />;
      case 'insurance':
        return <ShieldCheck className="w-7 h-7 sm:w-8 sm:h-8 text-purple-200 drop-shadow" />;
      case 'govt_schemes':
        return <Home className="w-7 h-7 sm:w-8 sm:h-8 text-green-200 drop-shadow" />;
      case 'online_apply':
        return <FileSignature className="w-7 h-7 sm:w-8 sm:h-8 text-blue-200 drop-shadow" />;
      case 'status_track':
        return <Radar className="w-7 h-7 sm:w-8 sm:h-8 text-purple-200 drop-shadow" />;
      case 'download':
        return <Download className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-200 drop-shadow" />;
      case 'print':
        return <Printer className="w-7 h-7 sm:w-8 sm:h-8 text-red-200 drop-shadow" />;
      case 'bill_payment':
        return <Receipt className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-200 drop-shadow" />;
      case 'mobile_recharge':
        return <Smartphone className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-200 drop-shadow" />;
      default:
        return <Sparkles className="w-7 h-7 text-white drop-shadow" />;
    }
  };

  const getNewServiceIcon = (iconType: string) => {
    switch (iconType) {
      case 'vote': return <Vote className="w-7 h-7 sm:w-8 sm:h-8 text-red-200 drop-shadow" />;
      case 'shield': return <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-blue-200 drop-shadow" />;
      case 'smartphone': return <Smartphone className="w-7 h-7 sm:w-8 sm:h-8 text-orange-200 drop-shadow" />;
      case 'car': return <Car className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-200 drop-shadow" />;
      case 'plane': return <Plane className="w-7 h-7 sm:w-8 sm:h-8 text-teal-200 drop-shadow" />;
      case 'shoppingBag': return <ShoppingBag className="w-7 h-7 sm:w-8 sm:h-8 text-fuchsia-200 drop-shadow" />;
      case 'heartPulse': return <HeartPulse className="w-7 h-7 sm:w-8 sm:h-8 text-rose-200 drop-shadow" />;
      case 'heartHandshake': return <HeartHandshake className="w-7 h-7 sm:w-8 sm:h-8 text-purple-200 drop-shadow" />;
      case 'hardHat': return <HardHat className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-300 drop-shadow" />;
      case 'sun': return <Sun className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 drop-shadow" />;
      case 'sprout': return <Sprout className="w-7 h-7 sm:w-8 sm:h-8 text-green-200 drop-shadow" />;
      case 'home': return <Home className="w-7 h-7 sm:w-8 sm:h-8 text-blue-200 drop-shadow" />;
      case 'briefcase': return <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-sky-200 drop-shadow" />;
      case 'flame': return <Flame className="w-7 h-7 sm:w-8 sm:h-8 text-pink-200 drop-shadow" />;
      case 'building': return <Building2 className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-200 drop-shadow" />;
      case 'creditCard': return <CreditCard className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-200 drop-shadow" />;
      case 'clock': return <Clock className="w-7 h-7 sm:w-8 sm:h-8 text-purple-200 drop-shadow" />;
      case 'graduationCap': return <GraduationCap className="w-7 h-7 sm:w-8 sm:h-8 text-blue-200 drop-shadow" />;
      case 'baby': return <Baby className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-200 drop-shadow" />;
      case 'scroll': return <Scroll className="w-7 h-7 sm:w-8 sm:h-8 text-slate-200 drop-shadow" />;
      case 'receipt': return <Receipt className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-200 drop-shadow" />;
      case 'users': return <Users className="w-7 h-7 sm:w-8 sm:h-8 text-fuchsia-200 drop-shadow" />;
      case 'award': return <Award className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 drop-shadow" />;
      case 'fileCheck': return <FileCheck className="w-7 h-7 sm:w-8 sm:h-8 text-emerald-200 drop-shadow" />;
      case 'train': return <Train className="w-7 h-7 sm:w-8 sm:h-8 text-sky-200 drop-shadow" />;
      case 'zap': return <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 drop-shadow" />;
      case 'droplet': return <Droplet className="w-7 h-7 sm:w-8 sm:h-8 text-cyan-200 drop-shadow" />;
      default: return <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-amber-300 drop-shadow" />;
    }
  };

  const getStatusBadge = (status: ApplicationStatus) => {
    switch (status) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Allocated / Completed
          </span>
        );
      case 'processing':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 animate-pulse">
            <RefreshCw className="w-3.5 h-3.5" />
            In Govt Processing
          </span>
        );
      case 'under_review':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
            <Clock className="w-3.5 h-3.5" />
            Under Assisted Review
          </span>
        );
      case 'document_required':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-rose-500/20 text-rose-300 border border-rose-500/40">
            <AlertCircle className="w-3.5 h-3.5" />
            Document Required
          </span>
        );
      case 'submitted':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-blue-500/20 text-blue-300 border border-blue-500/40">
            <FileText className="w-3.5 h-3.5" />
            Submitted
          </span>
        );
      case 'rejected':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-500/20 text-red-400 border border-red-500/40">
            Rejected
          </span>
        );
    }
  };

  const getServiceLabel = (type: ServiceType) => {
    switch (type) {
      case 'new_pan': return 'New PAN Card (Form 49A)';
      case 'minor_pan': return 'Minor PAN (Child Under 18)';
      case 'major_pan': return 'Major PAN (Adult Upgrade)';
      case 'correction': return 'PAN Card Correction';
      case 'reprint': return 'Reprint Duplicate PAN';
    }
  };

  if (selectedNewService) {
    return (
      <div className="w-full min-h-screen overflow-y-auto pb-16 animate-in fade-in">
        <NewServiceDetailView
          service={selectedNewService}
          onBack={() => {
            setSelectedNewService(null);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          onUpdateOfficialUrl={(serviceId, url) => {
            setNewServicesList(prev => prev.map(s => s.id === serviceId ? { ...s, officialUrl: url } : s));
            setSelectedNewService(prev => prev ? { ...prev, officialUrl: url } : null);
          }}
        />
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen overflow-y-auto space-y-6 pb-16 animate-in fade-in">
      {/* ─────────────────────────────────────────────────────────────────
          1. TOP CUSTOMER AUTHENTICATION & QUICK STATUS STRIP
      ───────────────────────────────────────────────────────────────── */}
      <div className="bg-[#050f2e] border-b border-amber-500/30 px-3 sm:px-6 py-2">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-xs">
              {currentUser.name.charAt(0)}
            </div>
            <span className="text-slate-300">
              Welcome back, <strong className="text-white">{currentUser.name}</strong>
            </span>
            <span className="px-2 py-0.2 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 text-[10px] font-bold hidden sm:inline">
              Verified Customer
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDossier(!showDossier)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition flex items-center gap-1.5 ${
                showDossier ? 'bg-amber-400 text-slate-950 font-black' : 'bg-blue-900/60 hover:bg-blue-900 text-amber-300 border border-amber-400/40'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>My Applications ({totalApps})</span>
            </button>

            <button
              onClick={() => setPanPickerOpen(true)}
              className="gold-btn px-3 py-1 rounded-full text-xs font-black flex items-center gap-1 shadow"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Apply PAN</span>
            </button>

            <button
              onClick={() => onOpenTracking()}
              className="px-3 py-1 rounded-full bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-500/50 text-xs font-bold transition flex items-center gap-1"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Live Track</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────────────
          2. THE MAIN HERO BANNER (MATCHING THE SHARED REFERENCE IMAGE)
      ───────────────────────────────────────────────────────────────── */}
      <section className="relative w-full max-w-7xl mx-auto px-2 sm:px-6">
        <div className="relative w-full overflow-hidden rounded-2xl sm:rounded-3xl border-2 border-amber-400/90 shadow-2xl bg-[#03091e] drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)]">
          {/* Main Visual Reference Hero Banner Image */}
          <div className="relative w-full h-[180px] sm:h-[260px] md:h-[320px] lg:h-[360px] overflow-hidden">
            <img 
              src="/assets/aistudio/1bef728a-49ae-4323-9909-8964e8ac459e_cbcf7c62.jpg"
              alt="Sakim Digital Seva Kendra Hero Banner"
              className="w-full h-full object-cover object-top filter brightness-105 contrast-105 pointer-events-none select-none"
            />

            {/* Glowing Golden Ambient Overlay Border */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#040b20]/60 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Interactive Quick Launch Badges Over the Banner */}
            <div className="absolute bottom-3 left-4 right-4 flex flex-wrap items-center justify-between gap-2 pointer-events-auto">
              <div className="flex items-center gap-2 bg-[#040b20]/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-400/60 shadow">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                <span className="text-[11px] font-bold text-amber-300">
                  Assisted Digital Facilitation Center • 100% Tax Compliant
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setPanPickerOpen(true)}
                  className="gold-btn px-3 py-1 rounded-full text-xs font-black shadow-lg flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>New PAN Application</span>
                </button>
                <button
                  onClick={() => onOpenTracking()}
                  className="bg-blue-950/90 hover:bg-blue-900 text-cyan-300 border border-cyan-400 px-3 py-1 rounded-full text-xs font-bold shadow transition flex items-center gap-1"
                >
                  <Search className="w-3.5 h-3.5" />
                  <span>Check Status</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          3. THE 21 GLOSSY 3D SERVICE CARDS (7 COLUMNS x 3 ROWS)
             (COMPLETELY ZERO LOGIN BOX - AS IN USER'S MASKED REFERENCE)
             All 19 official government portals open directly in a new tab.
             AEPS Biometric & Micro ATM remain 100% unchanged as assisted counter desks.
      ───────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-2 sm:px-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {citizenServices.map((service) => {
            const isExternalGov = Boolean(service.officialUrl);
            const cardBody = (
              <>
                {/* Discrete external portal indicator for verified government portals */}
                {isExternalGov && (
                  <span 
                    className="absolute top-1.5 right-1.5 text-white/60 group-hover:text-amber-300 transition-colors"
                    title={`Connects to official portal: ${service.portalName || service.titleEn}`}
                  >
                    <ExternalLink className="w-2.5 h-2.5" />
                  </span>
                )}

                {/* Glossy 3D Icon */}
                <div className="mb-1.5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                  {getServiceIcon(service.id)}
                </div>

                {/* English Service Name */}
                <h3 className="text-xs sm:text-[13px] font-black text-white leading-tight drop-shadow tracking-tight">
                  {service.titleEn}
                </h3>

                {/* Hindi Service Name */}
                <p className="text-[10px] sm:text-[11px] font-semibold text-white/90 drop-shadow mt-0.5">
                  {service.titleHi}
                </p>
              </>
            );

            if (isExternalGov && service.officialUrl) {
              return (
                <a
                  key={service.id}
                  href={service.officialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Open official portal: ${service.portalName || service.titleEn}`}
                  className={`seva-card-3d relative group ${service.gradientClass} ${service.borderClass} p-3 sm:p-3.5 flex flex-col items-center justify-center text-center cursor-pointer shadow-lg no-underline`}
                >
                  {cardBody}
                </a>
              );
            }

            return (
              <button
                key={service.id}
                type="button"
                onClick={() => handleCardClick(service)}
                title={service.titleEn}
                className={`seva-card-3d relative group ${service.gradientClass} ${service.borderClass} p-3 sm:p-3.5 flex flex-col items-center justify-center text-center cursor-pointer shadow-lg w-full`}
              >
                {cardBody}
              </button>
            );
          })}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          NEW GOVERNMENT SERVICES SECTION (REQUIREMENTS 3, 4, 5)
          34 New Colorful 3D Glossy Service Buttons matching Aadhaar & PAN Card design
          Categories: Identity Services (8), Govt Schemes (12), Certificates (8), Other Services (6)
          Demo Mode – Link Not Connected (working click action opening separate service page)
      ───────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-2 sm:px-6 space-y-4">
        {/* Section Header & Category Filters */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 bg-gradient-to-r from-[#091845] via-[#051136] to-[#040c26] p-4 rounded-2xl border-2 border-amber-400/70 shadow-xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full gold-badge-gradient text-xs sm:text-sm font-black tracking-wide uppercase shadow">
                <span>★</span>
                <span>All Citizen Services & Government Schemes</span>
                <span>★</span>
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                34 New Services (Demo Mode)
              </span>
            </div>
            <p className="text-xs text-slate-300">
              Complete citizen service catalog: Identity, Welfare Schemes, State Certificates, and Public Utilities.
            </p>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <button
              onClick={() => setActiveNewCategory('all')}
              className={`px-3 py-1.5 rounded-full font-bold transition flex items-center gap-1 ${
                activeNewCategory === 'all'
                  ? 'gold-btn text-slate-950 shadow-md font-black'
                  : 'bg-blue-950/80 text-slate-300 hover:text-white border border-blue-800'
              }`}
            >
              <span>All ({newServicesList.length})</span>
            </button>
            <button
              onClick={() => setActiveNewCategory('identity')}
              className={`px-3 py-1.5 rounded-full font-bold transition flex items-center gap-1 ${
                activeNewCategory === 'identity'
                  ? 'gold-btn text-slate-950 shadow-md font-black'
                  : 'bg-blue-950/80 text-slate-300 hover:text-white border border-blue-800'
              }`}
            >
              <span>Identity (8)</span>
            </button>
            <button
              onClick={() => setActiveNewCategory('schemes')}
              className={`px-3 py-1.5 rounded-full font-bold transition flex items-center gap-1 ${
                activeNewCategory === 'schemes'
                  ? 'gold-btn text-slate-950 shadow-md font-black'
                  : 'bg-blue-950/80 text-slate-300 hover:text-white border border-blue-800'
              }`}
            >
              <span>Schemes (12)</span>
            </button>
            <button
              onClick={() => setActiveNewCategory('certificates')}
              className={`px-3 py-1.5 rounded-full font-bold transition flex items-center gap-1 ${
                activeNewCategory === 'certificates'
                  ? 'gold-btn text-slate-950 shadow-md font-black'
                  : 'bg-blue-950/80 text-slate-300 hover:text-white border border-blue-800'
              }`}
            >
              <span>Certificates (8)</span>
            </button>
            <button
              onClick={() => setActiveNewCategory('other')}
              className={`px-3 py-1.5 rounded-full font-bold transition flex items-center gap-1 ${
                activeNewCategory === 'other'
                  ? 'gold-btn text-slate-950 shadow-md font-black'
                  : 'bg-blue-950/80 text-slate-300 hover:text-white border border-blue-800'
              }`}
            >
              <span>Other (6)</span>
            </button>
          </div>
        </div>

        {/* 34 3D Glossy Cards Grid Matching Exact Aadhaar & PAN Card Style */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {filteredNewServices.map((srv) => (
            <button
              key={srv.id}
              type="button"
              onClick={() => {
                setSelectedNewService(srv);
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              title={`${srv.nameEn} – Demo Mode (Click to open dedicated service page)`}
              className={`seva-card-3d relative group ${srv.gradientClass} ${srv.borderClass} p-3 sm:p-3.5 flex flex-col items-center justify-center text-center cursor-pointer shadow-lg w-full transition-transform hover:-translate-y-1`}
            >
              {/* Discrete Demo Mode Tag required by User Specification */}
              <span className="absolute top-1.5 right-1.5 px-1.5 py-0.2 rounded text-[8px] font-black uppercase tracking-wider bg-black/60 text-amber-300 border border-amber-400/40">
                Demo
              </span>

              {/* Glossy 3D Icon */}
              <div className="mb-1.5 flex items-center justify-center transform group-hover:scale-110 transition-transform">
                {getNewServiceIcon(srv.iconType)}
              </div>

              {/* English Service Name */}
              <h3 className="text-xs sm:text-[13px] font-black text-white leading-tight drop-shadow tracking-tight">
                {srv.nameEn}
              </h3>

              {/* Hindi Service Name */}
              <p className="text-[10px] sm:text-[11px] font-semibold text-white/90 drop-shadow mt-0.5">
                {srv.nameHi}
              </p>
            </button>
          ))}
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          4. CUSTOMER APPLICATION DOSSIER & RECORDS DRAWER (TOGGLEABLE)
             (Keeps 100% of applications, receipts, e-PANs & features intact)
      ───────────────────────────────────────────────────────────────── */}
      {showDossier && (
        <section className="max-w-7xl mx-auto px-2 sm:px-6 animate-in slide-in-from-top-4">
          <div className="rounded-3xl bg-gradient-to-b from-[#091845] to-[#050e2b] border-2 border-amber-400 p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-blue-900 pb-3">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-400" />
                  <span>My PAN Applications & E-PAN Dossier</span>
                </h3>
                <p className="text-xs text-slate-300">
                  Track live progress, download approved e-PAN cards, and print official tax invoices.
                </p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowDossier(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
              <div className="p-2.5 rounded-xl bg-blue-950/70 border border-blue-800">
                <span className="text-slate-400 text-[10px] block">Total Applications</span>
                <span className="text-lg font-black text-white">{totalApps}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-950/70 border border-blue-800">
                <span className="text-emerald-400 text-[10px] block">Allocated / Completed</span>
                <span className="text-lg font-black text-emerald-300">{completedApps}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-950/70 border border-blue-800">
                <span className="text-amber-300 text-[10px] block">Under Scrutiny</span>
                <span className="text-lg font-black text-amber-300">{reviewApps}</span>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-950/70 border border-blue-800">
                <span className="text-rose-300 text-[10px] block">Action Required</span>
                <span className="text-lg font-black text-rose-400">{actionRequiredApps}</span>
              </div>
            </div>

            {/* Applications List */}
            {applications.length === 0 ? (
              <div className="text-center py-8 bg-[#040b20] rounded-2xl border border-blue-900 space-y-2">
                <FileText className="w-10 h-10 text-slate-500 mx-auto" />
                <p className="text-xs font-bold text-white">No applications filed yet</p>
                <button
                  onClick={() => setPanPickerOpen(true)}
                  className="gold-btn px-4 py-1.5 rounded-xl text-xs font-black inline-flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Start New Application</span>
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {applications.map((app) => (
                  <div
                    key={app.id}
                    className="p-4 rounded-2xl bg-[#061238] border border-blue-800/80 hover:border-amber-400 transition shadow-lg space-y-2.5"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-blue-900/60 pb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-black text-amber-300">{app.id}</span>
                          <span className="text-slate-500">•</span>
                          <span className="text-xs text-slate-300 font-semibold">
                            Ack: <span className="font-mono text-white">{app.acknowledgementNo}</span>
                          </span>
                        </div>
                        <p className="text-xs font-bold text-white">{getServiceLabel(app.serviceType)}</p>
                      </div>

                      <div>{getStatusBadge(app.status)}</div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
                      <div>
                        <span className="text-[10px] text-slate-400 block">Applicant:</span>
                        <strong className="text-white">{app.applicant.fullNameOnCard}</strong>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Submission:</span>
                        <span className="text-slate-200">
                          {new Date(app.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Allocated PAN:</span>
                        {app.allocatedPan ? (
                          <span className="font-mono text-xs font-black text-amber-300 bg-amber-400/10 px-2 py-0.5 rounded">
                            {app.allocatedPan}
                          </span>
                        ) : (
                          <span className="text-slate-500 italic text-[11px]">Processing</span>
                        )}
                      </div>
                      <div>
                        <span className="text-[10px] text-slate-400 block">Fee Paid:</span>
                        <span className="text-emerald-400 font-bold">₹{app.payment.amount} ({app.payment.status.toUpperCase()})</span>
                      </div>
                    </div>

                    {app.statusRemarks && (
                      <div className="p-2 rounded-xl bg-blue-950/80 border border-blue-900 text-xs text-slate-300 flex items-center gap-1.5">
                        <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                        <span><strong>Update:</strong> {app.statusRemarks}</span>
                      </div>
                    )}

                    <div className="flex flex-wrap items-center justify-end gap-2 pt-2 border-t border-blue-900/40">
                      <button
                        onClick={() => onViewApplication(app)}
                        className="px-3 py-1 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-slate-200 text-xs font-bold transition flex items-center gap-1"
                      >
                        <Eye className="w-3 h-3" />
                        <span>Details</span>
                      </button>
                      <button
                        onClick={() => onDownloadReceipt(app)}
                        className="px-3 py-1 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-amber-300 border border-amber-400/40 text-xs font-bold transition flex items-center gap-1"
                      >
                        <Printer className="w-3 h-3" />
                        <span>Receipt</span>
                      </button>
                      {app.status === 'completed' && (
                        <button
                          onClick={() => onDownloadEPan(app)}
                          className="gold-btn px-3 py-1 rounded-xl text-xs font-black flex items-center gap-1 shadow"
                        >
                          <Download className="w-3 h-3" />
                          <span>E-PAN Card</span>
                        </button>
                      )}
                      <button
                        onClick={() => onOpenTracking(app.id)}
                        className="px-3 py-1 rounded-xl bg-cyan-950 hover:bg-cyan-900 text-cyan-300 border border-cyan-700/60 text-xs font-bold transition flex items-center gap-1"
                      >
                        <Search className="w-3 h-3" />
                        <span>Live Tracking</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          5. LATEST UPDATES TICKER (MATCHING REFERENCE IMAGE)
      ───────────────────────────────────────────────────────────────── */}
      <section className="max-w-7xl mx-auto px-2 sm:px-6">
        <div className="rounded-2xl bg-[#071333] border-2 border-amber-400/60 p-2 sm:p-2.5 shadow-xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
            {/* Left Megaphone Badge */}
            <div className="flex items-center gap-2 shrink-0">
              <div className="px-3 py-1 rounded-xl bg-[#04091a] border border-amber-400 text-amber-300 flex items-center gap-1.5 shadow">
                <Megaphone className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-black uppercase tracking-wider">Latest Updates</span>
              </div>
              <button 
                onClick={() => onOpenTracking()}
                className="text-[11px] font-bold text-amber-300 hover:text-white flex items-center gap-0.5"
              >
                <span>View All</span>
                <span>→</span>
              </button>
            </div>

            {/* 3 Real-time Ticker Items matching reference image */}
            <div className="flex-1 grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
              <a 
                href="https://pmsvanidhi.mohua.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                title="Open Official PM SVANidhi Namo Loan Portal (pmsvanidhi.mohua.gov.in)"
                className="p-1.5 rounded-xl bg-[#040c26] border border-blue-900 hover:border-amber-400 transition-colors flex items-center justify-between gap-1.5 group no-underline"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="px-1.5 py-0.2 rounded bg-red-600 text-white font-black text-[9px] uppercase shrink-0">
                    NEW
                  </span>
                  <span className="text-slate-200 group-hover:text-amber-300 text-[11px] truncate flex items-center gap-1">
                    Namo Loan Portal Now Available – Apply Now
                    <ExternalLink className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">10 Nov 2026</span>
              </a>

              <a 
                href="https://pmkisan.gov.in/"
                target="_blank"
                rel="noopener noreferrer"
                title="Open Official PM-KISAN Portal (pmkisan.gov.in)"
                className="p-1.5 rounded-xl bg-[#040c26] border border-blue-900 hover:border-amber-400 transition-colors flex items-center justify-between gap-1.5 group no-underline"
              >
                <div className="flex items-center gap-1.5 truncate">
                  <span className="px-1.5 py-0.2 rounded bg-red-600 text-white font-black text-[9px] uppercase shrink-0">
                    NEW
                  </span>
                  <span className="text-slate-200 group-hover:text-amber-300 text-[11px] truncate flex items-center gap-1">
                    PM Kisan 20th Installment Released
                    <ExternalLink className="w-2.5 h-2.5 text-amber-400 shrink-0" />
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">10 Nov 2026</span>
              </a>

              <div className="p-1.5 rounded-xl bg-[#040c26] border border-blue-900 flex items-center justify-between gap-1.5">
                <div className="flex items-center gap-1.5 truncate">
                  <span className="px-1.5 py-0.2 rounded bg-red-600 text-white font-black text-[9px] uppercase shrink-0">
                    NEW
                  </span>
                  <span className="text-slate-200 text-[11px] truncate">
                    Digital Seva Portal Maintenance on 12 Nov
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono shrink-0">11 Nov 2026</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          6. 4 GOLD CREST KEY FEATURES & DIGITAL INDIA BANNER
             (MATCHING THE REFERENCE BOTTOM BAR)
      ───────────────────────────────────────────────────────────────── */}
      <section id="key-features-section" className="max-w-7xl mx-auto px-2 sm:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-3 bg-gradient-to-r from-[#081845] via-[#051136] to-[#040c26] p-3 sm:p-4 rounded-3xl border-2 border-amber-400/80 shadow-2xl">
          {/* 4 Golden Crest Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 sm:gap-4 w-full lg:w-auto">
            {/* 1. 100% Secure & Trusted */}
            <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#040c24] border border-amber-400/50 shadow">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#08153b] rounded-[10px] flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-black text-white">100% Secure</p>
                <p className="text-[10px] font-bold text-amber-300">& Trusted</p>
              </div>
            </div>

            {/* 2. Fast Service */}
            <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#040c24] border border-amber-400/50 shadow">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#08153b] rounded-[10px] flex items-center justify-center">
                  <Zap className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-black text-white">Fast</p>
                <p className="text-[10px] font-bold text-amber-300">Service</p>
              </div>
            </div>

            {/* 3. Trusted Platform */}
            <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#040c24] border border-amber-400/50 shadow">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#08153b] rounded-[10px] flex items-center justify-center">
                  <HeartHandshake className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-black text-white">Trusted</p>
                <p className="text-[10px] font-bold text-amber-300">Platform</p>
              </div>
            </div>

            {/* 4. 24x7 Support */}
            <div className="flex items-center gap-2.5 p-2 rounded-2xl bg-[#040c24] border border-amber-400/50 shadow">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-300 via-amber-500 to-amber-700 p-0.5 shadow flex items-center justify-center shrink-0">
                <div className="w-full h-full bg-[#08153b] rounded-[10px] flex items-center justify-center">
                  <Headphones className="w-5 h-5 text-amber-400" />
                </div>
              </div>
              <div className="text-left leading-tight">
                <p className="text-xs font-black text-white">24x7</p>
                <p className="text-[10px] font-bold text-amber-300">Support</p>
              </div>
            </div>
          </div>

          {/* Right Golden Curved Ribbon Banner */}
          <div className="relative overflow-hidden rounded-2xl px-6 py-2.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 border border-amber-200 text-slate-950 shadow-xl flex items-center gap-3">
            <div className="h-6 w-1.5 bg-gradient-to-b from-orange-500 via-white to-green-600 rounded-full shadow"></div>
            <div className="text-left">
              <p className="font-cinzel text-xs font-black tracking-wider uppercase text-slate-900">
                Digital India
              </p>
              <p className="text-[11px] font-bold text-slate-800 tracking-tight">
                Empowering Every Citizen
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ─────────────────────────────────────────────────────────────────
          7. PAN SERVICES MODAL CHOOSER (Triggered when PAN Card tile is clicked)
      ───────────────────────────────────────────────────────────────── */}
      {panPickerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-gradient-to-b from-[#0c2054] to-[#061238] border-2 border-amber-400 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-blue-900 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black">
                  <CreditCard className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-black text-white">SAKIM Digital Seva Kendra</h3>
                  <p className="text-xs text-amber-300 font-semibold">Select Application Category</p>
                </div>
              </div>
              <button
                onClick={() => setPanPickerOpen(false)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              Apply directly via the official government portal or choose a SAKIM assisted category below:
            </p>

            {/* Direct Official Government Protean TIN-NSDL Portal */}
            <a
              href="https://tinpan.proteantech.in/services/pan/pan-index"
              target="_blank"
              rel="noopener noreferrer"
              title="Launch official Protean (TIN-NSDL) PAN Portal"
              className="p-3.5 rounded-2xl bg-gradient-to-r from-[#0d2f78] via-[#0b2766] to-[#081f54] border-2 border-amber-400 hover:border-amber-300 text-left transition group shadow-lg flex items-center justify-between gap-3 no-underline"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-black shrink-0 shadow">
                  <ExternalLink className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs font-black text-white group-hover:text-amber-300">
                      Official Protean (TIN-NSDL) Portal
                    </h4>
                    <span className="px-1.5 py-0.2 rounded bg-emerald-500/30 text-emerald-300 text-[9px] font-bold border border-emerald-400/40">
                      Govt Official
                    </span>
                  </div>
                  <p className="text-[10px] text-cyan-200">
                    tinpan.proteantech.in • Direct Form 49A / 49AA Online Application
                  </p>
                </div>
              </div>
              <span className="text-xs font-black text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1 shrink-0">
                <span>Launch Portal</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </a>

            <div className="relative flex items-center py-0.5">
              <div className="flex-grow border-t border-blue-900/80"></div>
              <span className="flex-shrink mx-3 text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Or SAKIM Assisted Filing Categories
              </span>
              <div className="flex-grow border-t border-blue-900/80"></div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {/* 1. New PAN Card (Form 49A) */}
              <button
                onClick={() => {
                  setPanPickerOpen(false);
                  onOpenService('new_pan');
                }}
                className="p-3.5 rounded-2xl bg-[#09173f] hover:bg-[#0e2461] border border-blue-700 hover:border-amber-400 text-left transition group shadow flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-cyan-600 to-blue-600 text-white flex items-center justify-center font-black shrink-0 shadow">
                  <Plus className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white group-hover:text-amber-300">New PAN Application</h4>
                  <p className="text-[10px] text-cyan-200">Form 49A Online Apply</p>
                  <span className="text-[10px] text-amber-400 font-bold">Apply Now »</span>
                </div>
              </button>

              {/* 2. Minor PAN Card */}
              <button
                onClick={() => {
                  setPanPickerOpen(false);
                  onOpenService('minor_pan');
                }}
                className="p-3.5 rounded-2xl bg-[#09173f] hover:bg-[#0e2461] border border-blue-700 hover:border-amber-400 text-left transition group shadow flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-600 to-yellow-500 text-slate-950 flex items-center justify-center font-black shrink-0 shadow">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white group-hover:text-amber-300">Minor PAN Card</h4>
                  <p className="text-[10px] text-cyan-200">Child Under 18 Years</p>
                  <span className="text-[10px] text-amber-400 font-bold">Apply Now »</span>
                </div>
              </button>

              {/* 3. Major PAN Upgrade */}
              <button
                onClick={() => {
                  setPanPickerOpen(false);
                  onOpenService('major_pan');
                }}
                className="p-3.5 rounded-2xl bg-[#09173f] hover:bg-[#0e2461] border border-blue-700 hover:border-amber-400 text-left transition group shadow flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-purple-700 to-indigo-600 text-white flex items-center justify-center font-black shrink-0 shadow">
                  <CheckCircle2 className="w-5 h-5 text-amber-300" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white group-hover:text-amber-300">Major PAN Conversion</h4>
                  <p className="text-[10px] text-cyan-200">Adult Photo & Signature</p>
                  <span className="text-[10px] text-amber-400 font-bold">Apply Now »</span>
                </div>
              </button>

              {/* 4. PAN Correction */}
              <button
                onClick={() => {
                  setPanPickerOpen(false);
                  onOpenService('correction');
                }}
                className="p-3.5 rounded-2xl bg-[#09173f] hover:bg-[#0e2461] border border-blue-700 hover:border-amber-400 text-left transition group shadow flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-emerald-600 to-teal-500 text-white flex items-center justify-center font-black shrink-0 shadow">
                  <FileCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white group-hover:text-amber-300">PAN Correction</h4>
                  <p className="text-[10px] text-cyan-200">Update Name, DOB, Photo</p>
                  <span className="text-[10px] text-amber-400 font-bold">Update Now »</span>
                </div>
              </button>

              {/* 5. PAN Reprint */}
              <button
                onClick={() => {
                  setPanPickerOpen(false);
                  onOpenService('reprint');
                }}
                className="p-3.5 rounded-2xl bg-[#09173f] hover:bg-[#0e2461] border border-blue-700 hover:border-amber-400 text-left transition group shadow flex items-center gap-3 col-span-1 sm:col-span-2"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-rose-600 to-pink-600 text-white flex items-center justify-center font-black shrink-0 shadow">
                  <Printer className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white group-hover:text-amber-300">Reprint Lost / Damaged PAN</h4>
                  <p className="text-[10px] text-cyan-200">Duplicate Physical PVC Card via India Post</p>
                  <span className="text-[10px] text-amber-400 font-bold">Request Reprint »</span>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ─────────────────────────────────────────────────────────────────
          8. CITIZEN SEVA SERVICE INFORMATION MODAL (For non-PAN cards)
      ───────────────────────────────────────────────────────────────── */}
      {genericServiceModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-md rounded-3xl bg-[#09173f] border-2 border-amber-400 p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-blue-900 pb-3">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-amber-400/20 text-amber-400 flex items-center justify-center font-black border border-amber-400/40">
                  {getServiceIcon(genericServiceModal.id)}
                </div>
                <div>
                  <h3 className="text-base font-black text-white">{genericServiceModal.titleEn}</h3>
                  <p className="text-xs text-amber-300 font-semibold">{genericServiceModal.titleHi}</p>
                </div>
              </div>
              <button
                onClick={() => setGenericServiceModal(null)}
                className="p-1 rounded-lg text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-200 leading-relaxed">
              {genericServiceModal.description}
            </p>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-900">
                <span className="text-[10px] text-slate-400 block">Prescribed Fee</span>
                <strong className="text-amber-300 font-bold">{genericServiceModal.fee || 'Govt Fee'}</strong>
              </div>
              <div className="p-2.5 rounded-xl bg-blue-950/80 border border-blue-900">
                <span className="text-[10px] text-slate-400 block">Estimated Processing</span>
                <strong className="text-emerald-400 font-bold">{genericServiceModal.turnaround || '24-48 Hours'}</strong>
              </div>
            </div>

            <div className="p-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-xs text-amber-200 space-y-1">
              <p className="font-bold flex items-center gap-1 text-amber-400">
                <ShieldCheck className="w-4 h-4" />
                <span>Sakim Digital Seva Facilitation Desk</span>
              </p>
              <p className="text-[11px] text-slate-300">
                Our operator desk provides certified assisted filing for this scheme. Please carry required Aadhaar and identity documents.
              </p>
            </div>

            <div className="flex items-center gap-2 pt-2">
              <a
                href="tel:+919876543210"
                className="w-1/2 py-2.5 rounded-xl bg-blue-900/70 hover:bg-blue-800 text-blue-200 border border-blue-700 text-xs font-bold text-center transition flex items-center justify-center gap-1.5"
              >
                <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Helpdesk</span>
              </a>

              <button
                onClick={() => {
                  setGenericServiceModal(null);
                  setPanPickerOpen(true);
                }}
                className="w-1/2 gold-btn py-2.5 rounded-xl text-xs font-black shadow flex items-center justify-center gap-1"
              >
                <span>Filing Counter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
