export interface NewServiceFacility {
  id: string;
  nameEn: string;
  nameHi: string;
  description: string;
}

export interface NewGovernmentService {
  id: string;
  nameEn: string;
  nameHi: string;
  category: 'identity' | 'schemes' | 'certificates' | 'other';
  categoryLabel: string;
  iconType: string;
  gradientClass: string;
  borderClass: string;
  badgeColor: string;
  description: string;
  officialAuthority: string;
  officialUrl?: string; // Empty for demo mode as requested
  subcategories: NewServiceFacility[];
  requiredDocuments: string[];
  eligibility: string;
}

export const NEW_GOVERNMENT_SERVICES: NewGovernmentService[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // 1. IDENTITY SERVICES (8 Cards)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'voter_id',
    nameEn: 'Voter ID Card',
    nameHi: 'मतदाता पहचान पत्र',
    category: 'identity',
    categoryLabel: 'Identity Services',
    iconType: 'vote',
    gradientClass: 'bg-gradient-to-b from-[#b81d24] via-[#8c1218] to-[#4d070b]',
    borderClass: 'border-[#f87171] text-[#f87171]',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    description: 'National Voters Service: Register new voter card (Form 6), update details, link Aadhaar with EPIC, and download digital e-EPIC card.',
    officialAuthority: 'Election Commission of India (ECI)',
    officialUrl: 'https://voters.eci.gov.in/',
    subcategories: [
      { id: 'voter_new', nameEn: 'Apply New Voter ID (Form 6)', nameHi: 'नया मतदाता कार्ड आवेदन (प्रारूप 6)', description: 'First-time voter registration for Indian citizens aged 18 years or above.' },
      { id: 'voter_correction', nameEn: 'Correction of Entries (Form 8)', nameHi: 'विवरण संशोधन (प्रारूप 8)', description: 'Update name, date of birth, photo, address, or constituency transfer.' },
      { id: 'voter_aadhaar', nameEn: 'Link Aadhaar with Voter ID (Form 6B)', nameHi: 'आधार-वोटर आईडी लिंक (प्रारूप 6B)', description: 'Voluntary authentication of EPIC identity through Aadhaar integration.' },
      { id: 'voter_eepic', nameEn: 'Download Digital e-EPIC', nameHi: 'डिजिटल ई-एपिक डाउनलोड', description: 'Download secure PDF version of the electoral photo identity card.' },
      { id: 'voter_search', nameEn: 'Search Electoral Roll', nameHi: 'मतदाता सूची में नाम खोजें', description: 'Check polling booth, serial number, and registration status in electoral roll.' }
    ],
    requiredDocuments: ['Proof of Age (Birth Certificate / Class 10 Admit)', 'Proof of Residence (Electricity Bill / Rent Agreement)', 'Passport-size Photograph'],
    eligibility: 'Citizen of India who has attained 18 years of age on the qualifying date.'
  },
  {
    id: 'digilocker',
    nameEn: 'DigiLocker',
    nameHi: 'डिजिलॉकर सेवा',
    category: 'identity',
    categoryLabel: 'Identity Services',
    iconType: 'shield',
    gradientClass: 'bg-gradient-to-b from-[#104b9e] via-[#0b336e] to-[#061d42]',
    borderClass: 'border-[#60a5fa] text-[#60a5fa]',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    description: 'National Digital Document Wallet: Access verified electronic copies of driving licence, registration certificates, academic awards, and PAN cards.',
    officialAuthority: 'Ministry of Electronics & Information Technology (MeitY)',
    officialUrl: 'https://www.digilocker.gov.in/',
    subcategories: [
      { id: 'dl_link_aadhaar', nameEn: 'Link Aadhaar to DigiLocker', nameHi: 'आधार से डिजिलॉker लिंक करें', description: 'Authenticate your DigiLocker vault using 12-digit Aadhaar e-KYC.' },
      { id: 'dl_fetch_docs', nameEn: 'Fetch Government Certificates', nameHi: 'सरकारी प्रमाण पत्र प्राप्त करें', description: 'Pull verified digital records from 2,000+ government issuers.' },
      { id: 'dl_dl_rc', nameEn: 'Driving Licence & Vehicle RC', nameHi: 'ड्राइविंग लाइसेंस व आरसी', description: 'Legally valid digital driving licence and registration certificate under IT Act.' },
      { id: 'dl_marksheets', nameEn: 'Class X / XII Digital Marksheets', nameHi: 'शैक्षणिक अंकपत्र व प्रमाण पत्र', description: 'Instant verified digital certificates from CBSE, ICSE, and state education boards.' }
    ],
    requiredDocuments: ['Aadhaar Number with registered mobile', 'Mobile phone for OTP verification'],
    eligibility: 'All Indian citizens with an active mobile number linked to Aadhaar.'
  },
  {
    id: 'umang',
    nameEn: 'UMANG',
    nameHi: 'उमंग सरकारी सेवाएं',
    category: 'identity',
    categoryLabel: 'Identity Services',
    iconType: 'smartphone',
    gradientClass: 'bg-gradient-to-b from-[#e05e00] via-[#ab4700] to-[#592400]',
    borderClass: 'border-[#fb923c] text-[#fb923c]',
    badgeColor: 'bg-orange-500/20 text-orange-300 border-orange-500/40',
    description: 'Unified Mobile Application for New-age Governance: One-stop access to central, state, and local government citizen services.',
    officialAuthority: 'National e-Governance Division (NeGD)',
    officialUrl: 'https://web.umang.gov.in/',
    subcategories: [
      { id: 'umang_epfo', nameEn: 'EPFO Passbook & PF Claim', nameHi: 'ईपीएफओ पासबुक व पीएफ क्लेम', description: 'View monthly PF contributions, member passbook, and submit online claims.' },
      { id: 'umang_gas', nameEn: 'LPG Cylinder Booking & Subsidy', nameHi: 'गैस सिलेंडर बुकिंग व सब्सिडी', description: 'Book Indane, Bharat Gas, and HP Gas refills with instant subsidy tracking.' },
      { id: 'umang_nps', nameEn: 'National Pension System (NPS)', nameHi: 'राष्ट्रीय पेंशन प्रणाली (NPS)', description: 'Track Tier I and Tier II investment portfolio, contribution receipts, and holdings.' }
    ],
    requiredDocuments: ['Active Mobile Number', 'Government Scheme Account/UAN/Consumer ID'],
    eligibility: 'All Indian citizens.'
  },
  {
    id: 'dl_services',
    nameEn: 'Driving Licence Services',
    nameHi: 'ड्राइविंग लाइसेंस सेवाएं',
    category: 'identity',
    categoryLabel: 'Identity Services',
    iconType: 'car',
    gradientClass: 'bg-gradient-to-b from-[#0d8a70] via-[#08614f] to-[#043329]',
    borderClass: 'border-[#34d399] text-[#34d399]',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Parivahan Sarathi: Online Learner Licence test, permanent driving licence slot booking, licence renewal, duplicate DL, and address change.',
    officialAuthority: 'Ministry of Road Transport and Highways (MoRTH)',
    officialUrl: 'https://sarathi.parivahan.gov.in/',
    subcategories: [
      { id: 'dl_learner', nameEn: 'Apply for Learner Licence (LL)', nameHi: 'लर्नर लाइसेंस आवेदन', description: 'Fill Form 2, take online road safety tutorial, and schedule appointment.' },
      { id: 'dl_permanent', nameEn: 'Permanent Driving Licence (DL)', nameHi: 'स्थायी ड्राइविंग लाइसेंस स्लॉट', description: 'Schedule automated driving test slot after 30 days of holding a valid LL.' },
      { id: 'dl_renewal', nameEn: 'Driving Licence Renewal', nameHi: 'ड्राइविंग लाइसेंस नवीनीकरण', description: 'Renew expired licences with medical fitness declaration (Form 1A).' },
      { id: 'dl_duplicate', nameEn: 'Duplicate Licence (Lost/Damaged)', nameHi: 'डुप्लीकेट लाइसेंस आवेदन', description: 'Request duplicate physical smart card for lost or defaced driving licences.' }
    ],
    requiredDocuments: ['Proof of Age (Birth Certificate / PAN / Passport)', 'Proof of Address (Aadhaar / Voter ID)', 'Passport-size Photographs', 'Medical Certificate Form 1A (if aged 40+)'],
    eligibility: 'Age 16+ for gearless 50cc two-wheelers, 18+ for light motor vehicles (LMV).'
  },
  {
    id: 'passport_services',
    nameEn: 'Passport Services',
    nameHi: 'पासपोर्ट सेवाएं',
    category: 'identity',
    categoryLabel: 'Identity Services',
    iconType: 'plane',
    gradientClass: 'bg-gradient-to-b from-[#006b6b] via-[#004747] to-[#002121]',
    borderClass: 'border-[#2dd4bf] text-[#2dd4bf]',
    badgeColor: 'bg-teal-500/20 text-teal-300 border-teal-500/40',
    description: 'Passport Seva: Apply for fresh/reissue ordinary passport, Tatkaal appointment booking, Police Clearance Certificate (PCC), and status inquiry.',
    officialAuthority: 'Ministry of External Affairs (MEA)',
    officialUrl: 'https://www.passportindia.gov.in/',
    subcategories: [
      { id: 'ps_fresh', nameEn: 'Apply for Fresh Passport', nameHi: 'नए पासपोर्ट हेतु आवेदन', description: '36-page or 60-page standard booklet application with 10-year validity.' },
      { id: 'ps_tatkaal', nameEn: 'Tatkaal Fast-Track Passport', nameHi: 'तत्काल पासपोर्ट सुविधा', description: 'Expedited processing and appointment scheduling for urgent travel requirements.' },
      { id: 'ps_pcc', nameEn: 'Police Clearance Certificate (PCC)', nameHi: 'पुलिस क्लीयरेंस सर्टिफिकेट', description: 'PCC issuance for employment, long-term visa, and immigration abroad.' },
      { id: 'ps_appointment', nameEn: 'Appointment Availability Check', nameHi: 'अपॉइंटमेंट उपलब्धता जांचें', description: 'Check real-time appointment dates across nearest PSK and Post Office PSK.' }
    ],
    requiredDocuments: ['Proof of Date of Birth (Birth Certificate / School Transfer Certificate)', 'Proof of Address (Aadhaar / Bank Passbook / Electricity Bill)', 'Non-ECR proof (Class 10 Pass Certificate)'],
    eligibility: 'Citizens of India by birth or naturalization.'
  },
  {
    id: 'ration_services',
    nameEn: 'Ration Card Services',
    nameHi: 'राशन कार्ड सेवाएं',
    category: 'identity',
    categoryLabel: 'Identity Services',
    iconType: 'shoppingBag',
    gradientClass: 'bg-gradient-to-b from-[#7c1694] via-[#540e66] to-[#2c0636]',
    borderClass: 'border-[#e879f9] text-[#e879f9]',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
    description: 'National Food Security (NFSA) & West Bengal Food Department: Apply for digital ration card, add family members, transfer FPS dealer, and download e-Ration card.',
    officialAuthority: 'Department of Food & Supplies, Govt of West Bengal / NFSA',
    officialUrl: 'https://food.wb.gov.in/',
    subcategories: [
      { id: 'rc_new', nameEn: 'Apply New Digital Ration Card', nameHi: 'नया डिजिटल राशन कार्ड आवेदन', description: 'State NFSA / BPL / AAY subsidized food grains entitlement card.' },
      { id: 'rc_member_add', nameEn: 'Add New Family Member', nameHi: 'नए परिवार के सदस्य का नाम जोड़ें', description: 'Add newborn children or newly married spouses to existing ration cards.' },
      { id: 'rc_aadhaar_link', nameEn: 'Link Aadhaar with Ration Card', nameHi: 'राशन कार्ड से आधार लिंक करें', description: 'Mandatory Aadhaar biometric seeding for nationwide portability under ONORC.' },
      { id: 'rc_download', nameEn: 'Download e-Ration Card', nameHi: 'ई-राशन कार्ड डाउनलोड', description: 'Instant download of digitally signed electronic ration card.' }
    ],
    requiredDocuments: ['Family Head Aadhaar Card', 'Family Member Birth Certificates', 'Proof of Address & Income Certificate', 'Recent Group Family Photo'],
    eligibility: 'Residents of the state fulfilling NFSA / State Food Scheme income criteria.'
  },
  {
    id: 'ayushman_bharat',
    nameEn: 'Ayushman Bharat',
    nameHi: 'आयुष्मान भारत (PM-JAY)',
    category: 'identity',
    categoryLabel: 'Identity Services',
    iconType: 'heartPulse',
    gradientClass: 'bg-gradient-to-b from-[#e01424] via-[#a30b17] to-[#59040b]',
    borderClass: 'border-[#f87171] text-[#f87171]',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    description: 'Pradhan Mantri Jan Arogya Yojana: Up to ₹5,00,000 cashless secondary and tertiary hospital treatment per family per year across India.',
    officialAuthority: 'National Health Authority (NHA)',
    officialUrl: 'https://beneficiary.nha.gov.in/',
    subcategories: [
      { id: 'ab_check', nameEn: 'Check Family PM-JAY Eligibility', nameHi: 'परिवार की पात्रता जांचें', description: 'Search SECC-2011 beneficiary list by mobile number or ration card.' },
      { id: 'ab_card_apply', nameEn: 'Ayushman Golden Card Application', nameHi: 'आयुष्मान गोल्डन कार्ड आवेदन', description: 'Generate certified PVC Ayushman Card with biometric/OTP verification.' },
      { id: 'ab_hospitals', nameEn: 'Find Empanelled Hospitals Near You', nameHi: 'निकटतम सूचीबद्ध अस्पताल खोजें', description: 'List of government and private hospitals offering cashless surgery and treatment.' }
    ],
    requiredDocuments: ['Ration Card / PM Letter', 'Aadhaar Card of all family members', 'Active Mobile Number'],
    eligibility: 'Families identified in SECC-2011 deprivation criteria or state beneficiary lists.'
  },
  {
    id: 'abha_health_id',
    nameEn: 'ABHA Health ID',
    nameHi: 'आभा डिजिटल हेल्थ आईडी',
    category: 'identity',
    categoryLabel: 'Identity Services',
    iconType: 'heartHandshake',
    gradientClass: 'bg-gradient-to-b from-[#82129e] via-[#5d0c72] to-[#2e0438]',
    borderClass: 'border-[#c084fc] text-[#c084fc]',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    description: 'Ayushman Bharat Digital Mission (ABDM): 14-digit unique health identifier to store, share, and access lab reports and medical prescriptions securely.',
    officialAuthority: 'National Health Authority (NHA)',
    officialUrl: 'https://abha.abdm.gov.in/',
    subcategories: [
      { id: 'abha_create', nameEn: 'Create 14-Digit ABHA Number', nameHi: '14 अंकों का आभा नंबर बनाएं', description: 'Instant generation via Aadhaar or Driving Licence authentication.' },
      { id: 'abha_phr', nameEn: 'Link Health Records & PHR App', nameHi: 'स्वास्थ्य रिकॉर्ड व पर्चे लिंक करें', description: 'Store prescriptions, MRI/CT scans, and diagnostic lab reports digitally.' },
      { id: 'abha_card_dl', nameEn: 'Download Digital ABHA Card', nameHi: 'डिजिटल आभा कार्ड डाउनलोड', description: 'Download high-resolution ABHA card with encrypted QR code.' }
    ],
    requiredDocuments: ['12-Digit Aadhaar Card', 'Mobile Number linked with Aadhaar'],
    eligibility: 'All Indian residents.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 2. GOVERNMENT SCHEMES (12 Cards)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'pm_vishwakarma',
    nameEn: 'PM Vishwakarma Yojana',
    nameHi: 'पीएम विश्वकर्मा योजना',
    category: 'schemes',
    categoryLabel: 'Government Schemes',
    iconType: 'hardHat',
    gradientClass: 'bg-gradient-to-b from-[#0a9e2d] via-[#077220] to-[#03360e]',
    borderClass: 'border-[#4ade80] text-[#4ade80]',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Financial support, modern toolkits (₹15,000 grant), collateral-free loans (up to ₹3 Lakh at 5% interest), and skill training for 18 traditional artisan trades.',
    officialAuthority: 'Ministry of MSME / Ministry of Skill Development',
    officialUrl: 'https://pmvishwakarma.gov.in/',
    subcategories: [
      { id: 'pmv_register', nameEn: 'Artisan Trade Registration', nameHi: 'कारीगर व शिल्पकार पंजीकरण', description: 'Register under Carpenters, Blacksmiths, Potters, Tailors, and 14 other trades.' },
      { id: 'pmv_toolkit', nameEn: 'Claim ₹15,000 Toolkit Incentive', nameHi: '₹15,000 टूलकिट सहायता क्लेम', description: 'Digital voucher grant to purchase modern equipment and tools.' },
      { id: 'pmv_loan', nameEn: 'Apply for 5% Subsidized Loan', nameHi: '5% रियायती ऋण आवेदन', description: 'First tranche of ₹1,00,000 and second tranche of ₹2,00,000 at 5% interest.' },
      { id: 'pmv_certificate', nameEn: 'Download Vishwakarma Certificate & ID', nameHi: 'विश्वकर्मा प्रमाण पत्र व आईडी', description: 'Government recognized artisan digital identity card and certificate.' }
    ],
    requiredDocuments: ['Aadhaar Card', 'Bank Passbook with IFSC', 'Active Mobile Number', 'Ration Card / Family Proof'],
    eligibility: 'Traditional artisans working with hands and tools in 18 specified trades, minimum 18 years of age.'
  },
  {
    id: 'pm_surya_ghar',
    nameEn: 'PM Surya Ghar Muft Bijli',
    nameHi: 'पीएम सूर्य घर मुफ्त बिजली योजना',
    category: 'schemes',
    categoryLabel: 'Government Schemes',
    iconType: 'sun',
    gradientClass: 'bg-gradient-to-b from-[#e06602] via-[#a34a00] to-[#542500]',
    borderClass: 'border-[#fb923c] text-[#fb923c]',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description: 'Rooftop solar subsidy up to ₹78,000 for residential households providing up to 300 units of free electricity every month.',
    officialAuthority: 'Ministry of New & Renewable Energy (MNRE)',
    officialUrl: 'https://pmsuryaghar.gov.in/',
    subcategories: [
      { id: 'pms_apply', nameEn: 'Apply for Rooftop Solar Subsidy', nameHi: 'रूफटॉप सोलर सब्सिडी आवेदन', description: 'Submit consumer details, DISCOM consumer number, and sanctioned load.' },
      { id: 'pms_calculator', nameEn: 'Solar Capacity & Subsidy Calculator', nameHi: 'सोलर क्षमता व सब्सिडी कैलकुलेटर', description: 'Estimate required kW capacity, rooftop area, and exact central subsidy.' },
      { id: 'pms_vendors', nameEn: 'Registered Solar Vendor Directory', nameHi: 'पंजीकृत सोलर वेंडर सूची', description: 'Select certified local solar installation agencies approved by DISCOM.' }
    ],
    requiredDocuments: ['Latest Electricity Bill (last 6 months)', 'Electricity Consumer Number', 'Aadhaar Card of Property Owner', 'Cancelled Cheque / Bank Passbook'],
    eligibility: 'Residential households with suitable roof space and active grid electricity connection.'
  },
  {
    id: 'pm_kisan_yojana',
    nameEn: 'PM Kisan Yojana',
    nameHi: 'पीएम किसान सम्मान निधि',
    category: 'schemes',
    categoryLabel: 'Government Schemes',
    iconType: 'sprout',
    gradientClass: 'bg-gradient-to-b from-[#1b8a10] via-[#12610a] to-[#093305]',
    borderClass: 'border-[#86efac] text-[#86efac]',
    badgeColor: 'bg-green-500/20 text-green-300 border-green-500/40',
    description: 'Direct income support of ₹6,000 per year in 3 equal installments of ₹2,000 transferred directly to landholding farmer families.',
    officialAuthority: 'Ministry of Agriculture & Farmers Welfare',
    officialUrl: 'https://pmkisan.gov.in/',
    subcategories: [
      { id: 'pmk_new', nameEn: 'New Farmer Registration', nameHi: 'नया किसान पंजीकरण', description: 'Register rural/urban cultivable land records for quarterly income benefit.' },
      { id: 'pmk_status', nameEn: 'Beneficiary & Installment Status', nameHi: 'किस्त व लाभार्थी स्थिति जांचें', description: 'Track 20th and upcoming installment payment status via Aadhaar or Mobile.' },
      { id: 'pmk_ekyc', nameEn: 'Mandatory e-KYC Verification', nameHi: 'अनिवार्य ई-केवाईसी सत्यापन', description: 'Complete Aadhaar OTP or facial recognition e-KYC to avoid payment stoppage.' },
      { id: 'pmk_land', nameEn: 'Land Seeding Status Check', nameHi: 'भूमि सीडिंग स्थिति जांचें', description: 'Verify revenue land records linkage with PM-KISAN database.' }
    ],
    requiredDocuments: ['Aadhaar Card', 'Land Ownership Records (Khatian / RoR / Parcha)', 'Bank Account linked with Aadhaar (DBT enabled)', 'Active Mobile Number'],
    eligibility: 'All landholding farmer families with cultivable landholding in their names.'
  },
  {
    id: 'pm_awas_yojana',
    nameEn: 'PM Awas Yojana',
    nameHi: 'पीएम आवास योजना (PMAY)',
    category: 'schemes',
    categoryLabel: 'Government Schemes',
    iconType: 'home',
    gradientClass: 'bg-gradient-to-b from-[#164da3] via-[#0e3470] to-[#061938]',
    borderClass: 'border-[#60a5fa] text-[#60a5fa]',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    description: 'Affordable pucca housing assistance for eligible urban (PMAY-U) and rural (PMAY-G) poor with credit-linked interest subsidy up to ₹2.67 Lakhs.',
    officialAuthority: 'Ministry of Housing & Urban Affairs (MoHUA)',
    officialUrl: 'https://pmaymis.gov.in/',
    subcategories: [
      { id: 'pma_apply', nameEn: 'PMAY Urban / Rural Application', nameHi: 'पीएम आवास शहरी व ग्रामीण आवेदन', description: 'Apply for home construction financial grant under BLC/AHP components.' },
      { id: 'pma_search', nameEn: 'Search Beneficiary by Name/Aadhaar', nameHi: 'नाम व आधार से लाभार्थी खोजें', description: 'Verify inclusion in approved PMAY permanent waiting list.' },
      { id: 'pma_subsidy', nameEn: 'Track CLSS Interest Subsidy', nameHi: 'ब्याज सब्सिडी स्थिति ट्रैक करें', description: 'Track home loan interest subsidy credit to your lending bank account.' }
    ],
    requiredDocuments: ['Aadhaar Card of all family members', 'Income Certificate', 'Land Registry / No-Land Affidavit', 'Bank Account details with IFSC'],
    eligibility: 'Families without any permanent pucca house in their name anywhere in India.'
  },
  {
    id: 'pm_mudra_yojana',
    nameEn: 'PM Mudra Yojana',
    nameHi: 'पीएम मुद्रा योजना (PMMY)',
    category: 'schemes',
    categoryLabel: 'Government Schemes',
    iconType: 'briefcase',
    gradientClass: 'bg-gradient-to-b from-[#0c4a9e] via-[#083272] to-[#041a40]',
    borderClass: 'border-[#38bdf8] text-[#38bdf8]',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    description: 'Collateral-free micro loans for non-corporate small businesses in three categories: Shishu (up to ₹50K), Kishor (up to ₹5L), and Tarun (up to ₹10L).',
    officialAuthority: 'Department of Financial Services, Ministry of Finance',
    officialUrl: 'https://www.mudra.org.in/',
    subcategories: [
      { id: 'mudra_shishu', nameEn: 'Apply Shishu Loan (up to ₹50,000)', nameHi: 'शिशु ऋण आवेदन (₹50,000 तक)', description: 'For startups and micro ventures needing seed capital without collateral.' },
      { id: 'mudra_kishor', nameEn: 'Apply Kishor Loan (₹50K to ₹5 Lakh)', nameHi: 'किशोर ऋण आवेदन (₹50K से ₹5L)', description: 'For growing enterprises purchasing inventory, equipment, or machinery.' },
      { id: 'mudra_tarun', nameEn: 'Apply Tarun Loan (₹5 Lakh to ₹10 Lakh)', nameHi: 'तरुण ऋण आवेदन (₹5L से ₹10L)', description: 'For established enterprises scaling operations, technology, and facilities.' }
    ],
    requiredDocuments: ['Identity Proof (Aadhaar / Voter ID)', 'Business Address Proof & Registration / Udyam No.', 'Last 6 Months Bank Statement', 'Project / Machinery Quotation'],
    eligibility: 'Non-farm micro and small entrepreneurs engaged in manufacturing, trading, or service sector.'
  },
  {
    id: 'pm_ujjwala_yojana',
    nameEn: 'PM Ujjwala Yojana',
    nameHi: 'प्रधानमंत्री उज्ज्वला योजना 2.0',
    category: 'schemes',
    categoryLabel: 'Government Schemes',
    iconType: 'flame',
    gradientClass: 'bg-gradient-to-b from-[#c4146e] via-[#8c0d4e] to-[#470627]',
    borderClass: 'border-[#f472b6] text-[#f472b6]',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
    description: 'Deposit-free LPG connection, free first cylinder refill, and free hotplate gas stove for adult women belonging to low-income households.',
    officialAuthority: 'Ministry of Petroleum & Natural Gas',
    officialUrl: 'https://www.pmuy.gov.in/',
    subcategories: [
      { id: 'ujj_apply', nameEn: 'Apply for Free LPG Connection', nameHi: 'मुफ्त एलपीजी कनेक्शन आवेदन', description: 'Submit Ujjwala 2.0 form with minimal documentation and no physical security deposit.' },
      { id: 'ujj_distributor', nameEn: 'Select Nearest LPG Agency', nameHi: 'निकटतम गैस एजेंसी चुनें', description: 'Choose Indane, Bharatgas, or HP Gas distributor serving your PIN code.' },
      { id: 'ujj_status', nameEn: 'Track Connection Release Status', nameHi: 'गैस कनेक्शन स्थिति ट्रैक करें', description: 'Real-time tracking of KYC validation, distributor verification, and delivery.' }
    ],
    requiredDocuments: ['Aadhaar Card of Woman Applicant and adult family members', 'Ration Card / Family Composition Certificate', 'Bank Passbook / Jan Dhan Account', 'Supplementary KYC declaration'],
    eligibility: 'Adult woman from eligible BPL / SC / ST / PM Awas / Forest Dweller households.'
  },
  {
    id: 'pm_svanidhi',
    nameEn: 'PM SVANidhi',
    nameHi: 'पीएम स्वनिधि (स्ट्रीट वेंडर)',
    category: 'schemes',
    categoryLabel: 'Government Schemes',
    iconType: 'building',
    gradientClass: 'bg-gradient-to-b from-[#0277a8] via-[#015173] to-[#002738]',
    borderClass: 'border-[#38bdf8] text-[#38bdf8]',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    description: 'Working capital micro-loans for street vendors starting from ₹10,000 (1st tranche), ₹20,000 (2nd tranche), to ₹50,000 (3rd tranche) with 7% interest subsidy.',
    officialAuthority: 'Ministry of Housing & Urban Affairs (MoHUA)',
    officialUrl: 'https://pmsvanidhi.mohua.gov.in/',
    subcategories: [
      { id: 'svan_first', nameEn: 'First Tranche Loan (₹10,000)', nameHi: 'प्रथम किस्त ऋण (₹10,000)', description: 'Collateral-free loan with 1-year repayment tenure and 7% annual interest subsidy.' },
      { id: 'svan_second', nameEn: 'Second & Third Tranche (Up to ₹50,000)', nameHi: 'द्वितीय व तृतीय किस्त ऋण (₹50K तक)', description: 'Enhanced loan limit upon timely repayment of earlier loans.' },
      { id: 'svan_cashback', nameEn: 'Digital Transaction Cashback Claim', nameHi: 'डिजिटल लेनदेन कैशबैक सुविधा', description: 'Earn up to ₹100 monthly cashback on processing digital UPI payments.' }
    ],
    requiredDocuments: ['Aadhaar Card', 'Certificate of Vending / Vending ID / LOR issued by ULB', 'Bank Passbook', 'Active Mobile Number'],
    eligibility: 'Street vendors in urban, peri-urban, and rural areas engaged in vending on or before cutoff date.'
  },
  {
    id: 'pm_jan_dhan',
    nameEn: 'PM Jan Dhan Yojana',
    nameHi: 'प्रधानमंत्री जन धन योजना (PMJDY)',
    category: 'schemes',
    categoryLabel: 'Government Schemes',
    iconType: 'creditCard',
    gradientClass: 'bg-gradient-to-b from-[#4a129e] via-[#330c6e] to-[#1a0538]',
    borderClass: 'border-[#a78bfa] text-[#a78bfa]',
    badgeColor: 'bg-indigo-500/20 text-indigo-300 border-indigo-500/40',
    description: 'Zero-balance basic savings bank deposit (BSBD) accounts with RuPay debit card, ₹2 Lakh free accident insurance, and ₹10,000 overdraft facility.',
    officialAuthority: 'Department of Financial Services, Ministry of Finance',
    officialUrl: 'https://pmjdy.gov.in/',
    subcategories: [
      { id: 'pjd_account', nameEn: 'Open Zero Balance Bank Account', nameHi: 'जीरो बैलेंस बैंक खाता खोलें', description: 'No minimum balance requirement with paperless e-KYC account opening.' },
      { id: 'pjd_rupay', nameEn: 'Order RuPay Debit Card', nameHi: 'रुपे डेबिट कार्ड ऑर्डर करें', description: 'ATM card with built-in ₹2,00,000 accidental insurance coverage.' },
      { id: 'pjd_dbt', nameEn: 'Direct Benefit Transfer (DBT) Seeding', nameHi: 'डीबीटी सब्सिडी खाता सीडिंग', description: 'Link account to receive PM-Kisan, scholarships, and gas subsidy directly.' }
    ],
    requiredDocuments: ['Aadhaar Card / Voter ID / NREGA Job Card', 'Passport-size Photograph', 'Mobile Number'],
    eligibility: 'Any Indian citizen aged 10 years and above who does not hold a basic bank account.'
  },
  {
    id: 'atal_pension',
    nameEn: 'Atal Pension Yojana',
    nameHi: 'अटल पेंशन योजना (APY)',
    category: 'schemes',
    categoryLabel: 'Government Schemes',
    iconType: 'clock',
    gradientClass: 'bg-gradient-to-b from-[#6918a3] via-[#480f73] to-[#24063b]',
    borderClass: 'border-[#c084fc] text-[#c084fc]',
    badgeColor: 'bg-purple-500/20 text-purple-300 border-purple-500/40',
    description: 'Government-guaranteed pension of ₹1,000, ₹2,000, ₹3,000, ₹4,000, or ₹5,000 per month starting at age 60 for unorganized sector workers.',
    officialAuthority: 'Pension Fund Regulatory & Development Authority (PFRDA)',
    officialUrl: 'https://www.npscra.nsdl.co.in/scheme-details.php',
    subcategories: [
      { id: 'apy_subscribe', nameEn: 'Enroll in APY Pension Plan', nameHi: 'एपीवाई पेंशन योजना में नामांकन', description: 'Choose desired monthly pension slab (₹1K to ₹5K) with auto-debit contribution.' },
      { id: 'apy_calculator', nameEn: 'Calculate Monthly Contribution', nameHi: 'मासिक योगदान राशि कैलकुलेटर', description: 'Find required monthly contribution based on current entry age (18 to 40).' },
      { id: 'apy_pran', nameEn: 'Download e-PRAN Card', nameHi: 'ई-प्रान कार्ड डाउनलोड करें', description: 'Permanent Retirement Account Number card download and statement of transaction.' }
    ],
    requiredDocuments: ['Savings Bank Account details with auto-debit facility', 'Aadhaar Card', 'Mobile Number', 'Spouse & Nominee Details'],
    eligibility: 'All citizens aged between 18 and 40 years holding a savings bank account.'
  },
  {
    id: 'annapurna_bhandar',
    nameEn: 'Annapurna Bhandar',
    nameHi: 'अन्नपूर्णा भंडार योजना',
    category: 'schemes',
    categoryLabel: 'Government Schemes',
    iconType: 'shoppingBag',
    gradientClass: 'bg-gradient-to-b from-[#0e9647] via-[#096931] to-[#043618]',
    borderClass: 'border-[#34d399] text-[#34d399]',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Public Distribution System (PDS) modernized consumer stores providing high-quality branded grocery items, packaged food, and provisions at subsidized fair rates.',
    officialAuthority: 'State Department of Food & Civil Supplies / Annavitran',
    officialUrl: 'https://annavitran.nic.in/',
    subcategories: [
      { id: 'ann_quota', nameEn: 'Check Monthly Entitlement & Rates', nameHi: 'मासिक कोटा व रियायती दरें', description: 'View available subsidized provisions, flour, pulses, spices, and oil allotments.' },
      { id: 'ann_dealer', nameEn: 'Find Nearest Annapurna Store', nameHi: 'निकटतम अन्नपूर्णा भंडार खोजें', description: 'Locate certified e-PoS modern fair price stores in your gram panchayat/ward.' },
      { id: 'ann_complaint', nameEn: 'Ration Distribution Grievance', nameHi: 'राशन वितरण शिकायत निवारण', description: 'Report weighment issues, dealer irregularity, or stock non-availability.' }
    ],
    requiredDocuments: ['Active Digital Ration Card', 'Aadhaar Card for biometric authentication on e-PoS'],
    eligibility: 'All NFSA / BPL / AAY and General Ration Card holders.'
  },
  {
    id: 'govt_scholarship',
    nameEn: 'Govt Scholarship Portal',
    nameHi: 'राष्ट्रीय छात्रवृत्ति योजनाएं (NSP)',
    category: 'schemes',
    categoryLabel: 'Government Schemes',
    iconType: 'graduationCap',
    gradientClass: 'bg-gradient-to-b from-[#164da3] via-[#0e3470] to-[#061938]',
    borderClass: 'border-[#38bdf8] text-[#38bdf8]',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    description: 'National Scholarship Portal (NSP) & State portals: Central Sector, Pre-Matric, Post-Matric, and Merit-cum-Means financial grants for students.',
    officialAuthority: 'Ministry of Education / Ministry of Minority Affairs / Social Justice',
    officialUrl: 'https://scholarships.gov.in/',
    subcategories: [
      { id: 'sch_pre', nameEn: 'Pre-Matric Scholarship (Class 1-10)', nameHi: 'प्री-मैट्रिक छात्रवृत्ति (कक्षा 1-10)', description: 'Financial support for school fees, books, and educational kits.' },
      { id: 'sch_post', nameEn: 'Post-Matric Scholarship (Class 11+)', nameHi: 'पोस्ट-मैट्रिक छात्रवृत्ति (कक्षा 11+)', description: 'College, university, ITI, diploma, and degree course fee reimbursement.' },
      { id: 'sch_merit', nameEn: 'Merit-cum-Means Professional Courses', nameHi: 'मेरिट-कम-मीन्स तकनीकी छात्रवृत्ति', description: 'Higher technical and professional degree programs (Engineering, MBBS, MBA).' },
      { id: 'sch_track', nameEn: 'Track Disbursement via PFMS / Aadhaar', nameHi: 'छात्रवृत्ति भुगतान स्थिति जांचें', description: 'Real-time tracking of Direct Benefit Transfer payment into student bank account.' }
    ],
    requiredDocuments: ['Aadhaar Card of Student', 'Income Certificate of Parents', 'Caste / Community Certificate (if applicable)', 'Previous Class Marksheet & Fee Receipt', 'Student Bank Account Passbook'],
    eligibility: 'Indian students studying in recognized institutions fulfilling family income and academic eligibility.'
  },
  {
    id: 'labour_welfare',
    nameEn: 'Labour Welfare Schemes',
    nameHi: 'श्रमिक कल्याण योजनाएं',
    category: 'schemes',
    categoryLabel: 'Government Schemes',
    iconType: 'hardHat',
    gradientClass: 'bg-gradient-to-b from-[#329e0a] via-[#237006] to-[#0f3002]',
    borderClass: 'border-[#86efac] text-[#86efac]',
    badgeColor: 'bg-green-500/20 text-green-300 border-green-500/40',
    description: 'Building and Other Construction Workers (BOCW) welfare board financial grants, accident relief, daughter marriage aid, and children educational stipends.',
    officialAuthority: 'State Labour Welfare Board / BOCW Welfare Board',
    officialUrl: 'https://labour.wb.gov.in/',
    subcategories: [
      { id: 'lab_bocw', nameEn: 'BOCW Worker Registration', nameHi: 'बीओसीडब्ल्यू श्रमिक नया पंजीकरण', description: 'Register construction, masonry, carpentry, electrical, and plumbing workers.' },
      { id: 'lab_marriage', nameEn: 'Daughter Marriage Grant (₹50,000)', nameHi: 'पुत्री विवाह सहायता (₹50,000)', description: 'Financial grant towards marriage expenses of registered worker daughters.' },
      { id: 'lab_medical', nameEn: 'Accidental Cover & Medical Relief', nameHi: 'दुर्घटना सहायता व चिकित्सा अनुदान', description: 'Hospitalization and accidental disability or death compensation claim.' },
      { id: 'lab_education', nameEn: 'Children Higher Education Assistance', nameHi: 'संतान उच्च शिक्षा छात्रवृत्ति', description: 'Annual educational grants for children of registered construction workers.' }
    ],
    requiredDocuments: ['90-Days Work Certificate signed by Employer/Contractor/Gram Pradhan', 'Aadhaar Card & Bank Passbook', 'Nominee Aadhaar Details', 'Passport-size Photographs'],
    eligibility: 'Workers aged 18 to 60 who have engaged in building or construction work for not less than 90 days in the preceding 12 months.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 3. CERTIFICATES (8 Cards)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'birth_certificate',
    nameEn: 'Birth Certificate',
    nameHi: 'जन्म प्रमाण पत्र',
    category: 'certificates',
    categoryLabel: 'Certificates',
    iconType: 'baby',
    gradientClass: 'bg-gradient-to-b from-[#0277a8] via-[#015173] to-[#002738]',
    borderClass: 'border-[#38bdf8] text-[#38bdf8]',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    description: 'Civil Registration System (CRS): Official record of birth for school admission, passport, driving licence, and proof of age.',
    officialAuthority: 'Registrar General of India / Municipal Health Department',
    officialUrl: 'https://janma-mrityutathya.wb.gov.in/',
    subcategories: [
      { id: 'bc_apply', nameEn: 'Apply for New Birth Certificate', nameHi: 'नया जन्म प्रमाण पत्र आवेदन', description: 'Registration within 21 days or delayed order registration via Magistrate.' },
      { id: 'bc_download', nameEn: 'Download Digitally Signed Certificate', nameHi: 'डिजिटली हस्ताक्षरित प्रमाण पत्र', description: 'Download instant QR-coded verified birth certificate with digital seal.' },
      { id: 'bc_correction', nameEn: 'Name Correction in Birth Certificate', nameHi: 'नाम व विवरण सुधार आवेदन', description: 'Rectify child name spelling, parents name, or date of birth as per hospital slip.' }
    ],
    requiredDocuments: ['Hospital Discharge Summary / Birth Slip', 'Parents Aadhaar Cards', 'Parents Marriage Certificate (if available)', 'Address Proof'],
    eligibility: 'Event of birth occurring within the jurisdiction of the concerned registrar.'
  },
  {
    id: 'death_certificate',
    nameEn: 'Death Certificate',
    nameHi: 'मृत्यु प्रमाण पत्र',
    category: 'certificates',
    categoryLabel: 'Certificates',
    iconType: 'scroll',
    gradientClass: 'bg-gradient-to-b from-[#374151] via-[#1f2937] to-[#111827]',
    borderClass: 'border-slate-400 text-slate-300',
    badgeColor: 'bg-slate-500/20 text-slate-300 border-slate-500/40',
    description: 'Official death certificate for property mutation, insurance settlement, bank account claim, and family pension transfer.',
    officialAuthority: 'Municipal Corporation / Gram Panchayat Registrar',
    officialUrl: 'https://janma-mrityutathya.wb.gov.in/',
    subcategories: [
      { id: 'dc_apply', nameEn: 'Death Certificate Registration', nameHi: 'मृत्यु प्रमाण पत्र नया पंजीकरण', description: 'Report event of death within statutory period with cremation/burial slip.' },
      { id: 'dc_download', nameEn: 'Download e-Death Certificate', nameHi: 'ई-मृत्यु प्रमाण पत्र डाउनलोड', description: 'Download verified copy for bank settlement and legal heir proceedings.' },
      { id: 'dc_correction', nameEn: 'Correction in Death Records', nameHi: 'मृत्यु रिकॉर्ड संशोधन', description: 'Correct deceased person age, address, or spelling of names.' }
    ],
    requiredDocuments: ['Doctor / Hospital Medical Certificate of Cause of Death', 'Crematorium / Burial Ground Receipt', 'Deceased Person Aadhaar Card', 'Applicant ID Proof'],
    eligibility: 'Legal heirs, family members, or authorized representatives.'
  },
  {
    id: 'income_certificate',
    nameEn: 'Income Certificate',
    nameHi: 'आय प्रमाण पत्र',
    category: 'certificates',
    categoryLabel: 'Certificates',
    iconType: 'receipt',
    gradientClass: 'bg-gradient-to-b from-[#0e8a4a] via-[#095e32] to-[#04331a]',
    borderClass: 'border-[#4ade80] text-[#4ade80]',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Revenue department certificate establishing annual household income for government scholarships, reservations, EWS quota, and fee waivers.',
    officialAuthority: 'Revenue Department / Tehsildar Office',
    officialUrl: 'https://edistrict.wb.gov.in/',
    subcategories: [
      { id: 'ic_apply', nameEn: 'Apply for Family Income Certificate', nameHi: 'पारिवारिक आय प्रमाण पत्र आवेदन', description: 'Income assessment verified by Revenue Patwari / Circle Officer.' },
      { id: 'ic_download', nameEn: 'Download Verified Income Certificate', nameHi: 'सत्यापित आय प्रमाण पत्र डाउनलोड', description: 'Download digitally signed certificate valid across all universities and banks.' },
      { id: 'ic_renewal', nameEn: 'Annual Income Certificate Renewal', nameHi: 'वार्षिक आय प्रमाण पत्र नवीनीकरण', description: 'Re-issue certificate for the current financial year.' }
    ],
    requiredDocuments: ['Salary Slips / Form 16 / ITR or Self-declaration Affidavit', 'Ration Card / Family Composition', 'Aadhaar Card of Applicant & Family Head', 'Electricity Bill'],
    eligibility: 'Residents of the state fulfilling income assessment guidelines.'
  },
  {
    id: 'caste_certificate',
    nameEn: 'Caste Certificate',
    nameHi: 'जाति प्रमाण पत्र (SC/ST/OBC)',
    category: 'certificates',
    categoryLabel: 'Certificates',
    iconType: 'users',
    gradientClass: 'bg-gradient-to-b from-[#7c1694] via-[#540e66] to-[#2b0633]',
    borderClass: 'border-[#e879f9] text-[#e879f9]',
    badgeColor: 'bg-fuchsia-500/20 text-fuchsia-300 border-fuchsia-500/40',
    description: 'Statutory proof of belonging to Scheduled Caste (SC), Scheduled Tribe (ST), or Other Backward Classes (OBC) for affirmative reservation benefits.',
    officialAuthority: 'Sub-Divisional Officer (SDO) / Sub-Divisional Magistrate (SDM)',
    officialUrl: 'https://castcertificatewb.gov.in/',
    subcategories: [
      { id: 'cc_apply', nameEn: 'Apply SC / ST / OBC Certificate', nameHi: 'एससी/एसटी/ओबीसी प्रमाण पत्र आवेदन', description: 'State and Central format certificate issuance for admissions and recruitments.' },
      { id: 'cc_ncl', nameEn: 'OBC Non-Creamy Layer (NCL) Certificate', nameHi: 'ओबीसी नॉन-क्रीमी लेयर प्रमाण पत्र', description: 'Annual NCL certificate establishing family income is below ₹8 Lakhs threshold.' },
      { id: 'cc_verification', nameEn: 'Verify Caste Certificate Online', nameHi: 'जाति प्रमाण पत्र ऑनलाइन सत्यापन', description: 'Barcode verification of digital certificate authenticity.' }
    ],
    requiredDocuments: ['Paternal Relative Caste Certificate (Father / Uncle / Grandfather)', 'Genealogy Pedigree Chart (Vanshavali) signed by Pradhan', 'Proof of Residence before 1950 / 1993 cutoff', 'Aadhaar Card & Land Record Parcha'],
    eligibility: 'Citizens belonging to notified SC/ST/OBC communities.'
  },
  {
    id: 'residence_certificate',
    nameEn: 'Residence Certificate',
    nameHi: 'निवास प्रमाण पत्र',
    category: 'certificates',
    categoryLabel: 'Certificates',
    iconType: 'home',
    gradientClass: 'bg-gradient-to-b from-[#104b9e] via-[#0b336e] to-[#051c40]',
    borderClass: 'border-[#60a5fa] text-[#60a5fa]',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    description: 'Local residence / ordinary residence certificate establishing current living address within the municipality or gram panchayat.',
    officialAuthority: 'Revenue Department / Municipal Administration',
    officialUrl: 'https://edistrict.wb.gov.in/',
    subcategories: [
      { id: 'rc_apply', nameEn: 'Apply for Ordinary Residence Certificate', nameHi: 'स्थानीय निवास प्रमाण पत्र आवेदन', description: 'Attested residence proof for bank account, job application, and electricity connection.' },
      { id: 'rc_download', nameEn: 'Download Digital Residence Certificate', nameHi: 'डिजिटल निवास प्रमाण पत्र डाउनलोड', description: 'Download verified digital certificate with official QR code verification.' }
    ],
    requiredDocuments: ['Aadhaar Card', 'Electricity Bill / Water Bill / Gas Connection Slip', 'Ward Councillor / Gram Pradhan Residence Verification Letter', 'Passport-size Photo'],
    eligibility: 'Continuous residence at the given address for at least 6 months.'
  },
  {
    id: 'domicile_certificate',
    nameEn: 'Domicile Certificate',
    nameHi: 'मूल निवास प्रमाण पत्र',
    category: 'certificates',
    categoryLabel: 'Certificates',
    iconType: 'fileCheck',
    gradientClass: 'bg-gradient-to-b from-[#0a9e2d] via-[#077220] to-[#043d11]',
    borderClass: 'border-[#4ade80] text-[#4ade80]',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Permanent Domicile (Mool Niwas) certificate establishing permanent domicile in the state for state government quota, public service commission, and education.',
    officialAuthority: 'District Magistrate / Sub-Divisional Officer (SDO)',
    officialUrl: 'https://edistrict.wb.gov.in/',
    subcategories: [
      { id: 'dom_apply', nameEn: 'Apply for Permanent Domicile Certificate', nameHi: 'मूल निवास प्रमाण पत्र आवेदन', description: 'Establish state domicile by birth or continuous residence of 10-15 years.' },
      { id: 'dom_track', nameEn: 'Track Tehsildar & SDM Inquiry', nameHi: 'तहसीलदार व एसडीएम जांच ट्रैक करें', description: 'Real-time police and revenue patwari verification tracking.' }
    ],
    requiredDocuments: ['10+ Years Continuous Residence Proof (School certificates, Electoral Roll)', 'Land Records (Parcha / Khatian in ancestral name)', 'Father/Guardian Domicile Certificate', 'Aadhaar Card & Birth Certificate'],
    eligibility: 'Citizen having permanent home or continuous residence in the state as per state rules.'
  },
  {
    id: 'ews_certificate',
    nameEn: 'EWS Certificate',
    nameHi: 'ईडब्ल्यूएस प्रमाण पत्र (10% आरक्षण)',
    category: 'certificates',
    categoryLabel: 'Certificates',
    iconType: 'award',
    gradientClass: 'bg-gradient-to-b from-[#b8860b] via-[#8c6508] to-[#4d3704]',
    borderClass: 'border-[#facc15] text-[#facc15]',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description: 'Income and Asset Certificate for Economically Weaker Sections (EWS) to claim 10% reservation in civil posts and educational institutions under Constitution Amendment 103.',
    officialAuthority: 'District Magistrate / Additional District Magistrate / Tehsildar',
    officialUrl: 'https://edistrict.wb.gov.in/',
    subcategories: [
      { id: 'ews_apply', nameEn: 'Apply for EWS Income & Asset Certificate', nameHi: 'ईडब्ल्यूएस आय व संपत्ति प्रमाण पत्र', description: 'Annual family income below ₹8 Lakh and residential asset criteria check.' },
      { id: 'ews_download', nameEn: 'Download Central / State EWS Certificate', nameHi: 'केंद्रीय व राज्य ईडब्ल्यूएस डाउनलोड', description: 'Official valid certificate for UPSC, SSC, JEE, NEET, and banking exams.' }
    ],
    requiredDocuments: ['All Family Members Aadhaar Cards & ITR / Form 16', 'Agricultural Land Records (Khatian / Parcha)', 'Residential Flat / House Property deeds', 'Family Income Certificate issued by Revenue Authority'],
    eligibility: 'General category citizens not covered under SC/ST/OBC whose family gross annual income is below ₹8 Lakhs.'
  },
  {
    id: 'marriage_certificate',
    nameEn: 'Marriage Certificate',
    nameHi: 'विवाह पंजीकरण प्रमाण पत्र',
    category: 'certificates',
    categoryLabel: 'Certificates',
    iconType: 'heartHandshake',
    gradientClass: 'bg-gradient-to-b from-[#c4146e] via-[#8c0d4e] to-[#450525]',
    borderClass: 'border-[#f472b6] text-[#f472b6]',
    badgeColor: 'bg-pink-500/20 text-pink-300 border-pink-500/40',
    description: 'Legal registration under Hindu Marriage Act / Special Marriage Act for spouse visa, joint bank accounts, passport name change, and property succession.',
    officialAuthority: 'Registrar of Marriages / Sub-Registrar Office (IGR)',
    officialUrl: 'https://rgmwb.gov.in/',
    subcategories: [
      { id: 'mc_apply', nameEn: 'Apply for Marriage Registration', nameHi: 'विवाह पंजीकरण नया आवेदन', description: 'Online application with joint photograph, wedding card, and witness details.' },
      { id: 'mc_slot', nameEn: 'Book Sub-Registrar Office Slot', nameHi: 'सब-रजिस्ट्रार कार्यालय स्लॉट बुक करें', description: 'Select preferred physical appearance date for biometric verification.' },
      { id: 'mc_download', nameEn: 'Download Certified Marriage Certificate', nameHi: 'प्रमाणित विवाह प्रमाण पत्र डाउनलोड', description: 'Download government certified copy with unique registration number.' }
    ],
    requiredDocuments: ['Age Proof of Bride & Groom (Birth Certificate / Class 10 / Passport)', 'Address Proof of Both Parties', 'Wedding Card & 3 Joint Photographs', 'Identity & Address Proof of 3 Witnesses'],
    eligibility: 'Groom must have attained 21 years and bride 18 years of age.'
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // 4. OTHER SERVICES (6 Cards)
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'epfo_service',
    nameEn: 'EPFO Services',
    nameHi: 'कर्मचारी भविष्य निधि (EPFO)',
    category: 'other',
    categoryLabel: 'Other Services',
    iconType: 'building',
    gradientClass: 'bg-gradient-to-b from-[#104b9e] via-[#0b336e] to-[#061d42]',
    borderClass: 'border-[#60a5fa] text-[#60a5fa]',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    description: 'Employees Provident Fund: View member passbook balance, submit online PF advance withdrawal (Form 31), transfer PF (Form 13), and file e-Nomination.',
    officialAuthority: 'Employees Provident Fund Organisation (EPFO)',
    officialUrl: 'https://unifiedportal-mem.epfindia.gov.in/memberinterface/',
    subcategories: [
      { id: 'epf_passbook', nameEn: 'View EPF Member Passbook', nameHi: 'ईपीएफ पासबुक व बैलेंस जांचें', description: 'Real-time statement of employer and employee contributions with interest.' },
      { id: 'epf_claim', nameEn: 'Online PF Withdrawal (Form 31/19/10C)', nameHi: 'ऑनलाइन पीएफ निकासी क्लेम', description: 'Submit advance claim for illness, marriage, house purchase, or final settlement.' },
      { id: 'epf_uan', nameEn: 'Activate UAN & Update KYC', nameHi: 'यूएएन एक्टिवेशन व केवाईसी अपडेट', description: 'Seed Aadhaar, PAN, and Bank Account IFSC into member portal.' },
      { id: 'epf_nomination', nameEn: 'File e-Nomination', nameHi: 'ई-नामांकन दाखिल करें', description: 'Digital nomination for seamless settlement of PF and EDLI pension.' }
    ],
    requiredDocuments: ['12-Digit UAN Number', 'Aadhaar linked with UAN and Mobile', 'Cancelled Cheque showing Member Name & Account Number'],
    eligibility: 'Employees enrolled in EPF scheme.'
  },
  {
    id: 'esic_service',
    nameEn: 'ESIC Services',
    nameHi: 'कर्मचारी राज्य बीमा (ESIC)',
    category: 'other',
    categoryLabel: 'Other Services',
    iconType: 'heartPulse',
    gradientClass: 'bg-gradient-to-b from-[#0e8a4a] via-[#095e32] to-[#04331a]',
    borderClass: 'border-[#4ade80] text-[#4ade80]',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    description: 'Employees State Insurance: Social security health coverage, Pehchan identity card download, dispensary appointment, sickness benefit, and maternity relief.',
    officialAuthority: 'Employees State Insurance Corporation (ESIC)',
    officialUrl: 'https://www.esic.gov.in/',
    subcategories: [
      { id: 'esic_card', nameEn: 'Download e-Pehchan Identity Card', nameHi: 'ई-पहचान पत्र डाउनलोड', description: 'Digital health insurance card for insured person and dependent family.' },
      { id: 'esic_dispensary', nameEn: 'Find Empanelled ESIC Dispensaries', nameHi: 'निकटतम ईएसआईसी औषधालय खोजें', description: 'Free outpatient consultations, specialist referrals, and medicine dispensing.' },
      { id: 'esic_claims', nameEn: 'Maternity & Sickness Benefit Claims', nameHi: 'मातृत्व व बीमारी लाभ क्लेम', description: 'Direct cash benefit transfer for wage loss during certified medical leave.' }
    ],
    requiredDocuments: ['ESIC Insurance Number (IP Number)', 'Aadhaar Cards of Insured Person and Dependents', 'Medical Certificate issued by IMO / Dispensary'],
    eligibility: 'Employees earning up to ₹21,000/month (₹25,000 for persons with disability) in covered establishments.'
  },
  {
    id: 'govt_jobs',
    nameEn: 'Government Jobs',
    nameHi: 'सरकारी नौकरी अलर्ट व आवेदन',
    category: 'other',
    categoryLabel: 'Other Services',
    iconType: 'briefcase',
    gradientClass: 'bg-gradient-to-b from-[#b81d24] via-[#8c1218] to-[#4d070b]',
    borderClass: 'border-[#f87171] text-[#f87171]',
    badgeColor: 'bg-red-500/20 text-red-300 border-red-500/40',
    description: 'National Career Service & Central/State job notifications: UPSC, SSC, Railways, Banking (IBPS/SBI), Defence, Teaching, and State Public Service Commissions.',
    officialAuthority: 'National Career Service (NCS) / Staff Selection Commission',
    officialUrl: 'https://www.ncs.gov.in/',
    subcategories: [
      { id: 'job_notifications', nameEn: 'Latest Active Government Vacancies', nameHi: 'नवीनतम सरकारी भर्ती विज्ञापन', description: 'Notifications categorized by 10th pass, 12th pass, Graduate, and Technical.' },
      { id: 'job_admit', nameEn: 'Download Admit Card & Hall Ticket', nameHi: 'प्रवेश पत्र व हॉल टिकट डाउनलोड', description: 'Direct links for upcoming examination centers and roll numbers.' },
      { id: 'job_results', nameEn: 'Check Exam Results & Answer Keys', nameHi: 'परीक्षा परिणाम व उत्तर कुंजी', description: 'Official merit lists, cutoff marks, and scorecards.' }
    ],
    requiredDocuments: ['Educational Certificates & Marksheets', 'Category / EWS Certificate (if seeking relaxation)', 'Scanned Passport Photo & Signature'],
    eligibility: 'Indian citizens fulfilling minimum educational qualifications and age limits.'
  },
  {
    id: 'railway_services',
    nameEn: 'Railway Services',
    nameHi: 'भारतीय रेल सेवाएं (IRCTC)',
    category: 'other',
    categoryLabel: 'Other Services',
    iconType: 'train',
    gradientClass: 'bg-gradient-to-b from-[#0c4a9e] via-[#083272] to-[#041a40]',
    borderClass: 'border-[#38bdf8] text-[#38bdf8]',
    badgeColor: 'bg-sky-500/20 text-sky-300 border-sky-500/40',
    description: 'Indian Railways: IRCTC online ticket booking, real-time 10-digit PNR status enquiry, train live running status, coach seat maps, and UTS unreserved tickets.',
    officialAuthority: 'Indian Railway Catering & Tourism Corporation (IRCTC)',
    officialUrl: 'https://www.irctc.co.in/',
    subcategories: [
      { id: 'rail_pnr', nameEn: 'Check 10-Digit PNR Status', nameHi: '10 अंकों का पीएनआर स्टेटस', description: 'Real-time reservation confirmation status, coach, and berth allocation.' },
      { id: 'rail_live', nameEn: 'Live Train Running Status', nameHi: 'ट्रेन की लाइव स्थिति ट्रैक करें', description: 'GPS train tracker showing current station arrival, departure, and delays.' },
      { id: 'rail_booking', nameEn: 'Book General & Tatkal Tickets', nameHi: 'सामान्य व तत्काल टिकट बुकिंग', description: 'Instant reservation across Sleeper, 3AC, 2AC, 1AC, and Chair Car classes.' },
      { id: 'rail_uts', nameEn: 'UTS Unreserved & Platform Ticket', nameHi: 'यूटीएस अनारक्षित व प्लेटफॉर्म टिकट', description: 'Paperless mobile ticketing for local suburban trains and general coaches.' }
    ],
    requiredDocuments: ['Valid Government Photo ID (Aadhaar / Voter ID) for travel', 'IRCTC User ID for ticket booking'],
    eligibility: 'All railway passengers.'
  },
  {
    id: 'electricity_bill',
    nameEn: 'Electricity Bill',
    nameHi: 'बिजली बिल भुगतान',
    category: 'other',
    categoryLabel: 'Other Services',
    iconType: 'zap',
    gradientClass: 'bg-gradient-to-b from-[#e06602] via-[#a34a00] to-[#542500]',
    borderClass: 'border-[#fb923c] text-[#fb923c]',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    description: 'Bharat BillPay (BBPS) & WBSEDCL: View current month electricity bill, download statement, pay instantly across state power DISCOMs, and register power failure complaints.',
    officialAuthority: 'State Electricity Distribution Companies (WBSEDCL / DISCOMs)',
    officialUrl: 'https://www.wbsedcl.in/',
    subcategories: [
      { id: 'elec_pay', nameEn: 'View & Pay Electricity Bill', nameHi: 'बिजली बिल देखें व भुगतान करें', description: 'Instant payment receipt with BBPS transaction reference number.' },
      { id: 'elec_meter', nameEn: 'Apply for New Meter Connection', nameHi: 'नए बिजली मीटर हेतु आवेदन', description: 'Submit domestic or commercial connection request with load sanction.' },
      { id: 'elec_complaint', nameEn: 'Register Power Failure Complaint', nameHi: 'बिजली फॉल्ट व शिकायत दर्ज करें', description: '24x7 toll-free helpline and line fault complaint tracking.' }
    ],
    requiredDocuments: ['Electricity Consumer Number / CA Number', 'Subdivision / Division details'],
    eligibility: 'All electricity consumers across India.'
  },
  {
    id: 'water_bill',
    nameEn: 'Water Bill',
    nameHi: 'जल आपूर्ति बिल भुगतान',
    category: 'other',
    categoryLabel: 'Other Services',
    iconType: 'droplet',
    gradientClass: 'bg-gradient-to-b from-[#0277a8] via-[#015173] to-[#002738]',
    borderClass: 'border-[#38bdf8] text-[#38bdf8]',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40',
    description: 'Bharat BillPay (BBPS) & Municipal Water Tax: View water meter consumption, pay bills with zero surcharge, and apply for water connection repairs.',
    officialAuthority: 'Municipal Jal Board / Urban Local Bodies (ULBs) / BBPS',
    officialUrl: 'https://www.bharatbillpay.com/',
    subcategories: [
      { id: 'water_pay', nameEn: 'Pay Water Consumption Bill', nameHi: 'जल बिल भुगतान करें', description: 'Instant online bill settlement across Municipal Jal Boards.' },
      { id: 'water_conn', nameEn: 'Apply for New Water Connection', nameHi: 'नया जल कनेक्शन आवेदन', description: 'Domestic pipeline connection application with municipal inspection.' },
      { id: 'water_tanker', nameEn: 'Book Emergency Water Tanker', nameHi: 'आपातकालीन जल टैंकर बुकिंग', description: 'Request municipal potable water supply tanker in shortage areas.' }
    ],
    requiredDocuments: ['Water Consumer Identification Number (K-Number / Consumer No.)', 'Property Tax Receipt for new connections'],
    eligibility: 'All municipal water utility consumers.'
  }
];
