import { PanApplication, UserProfile, AppNotification, ApplicationStatus, ServiceType } from '../types';

const STORAGE_KEY_APPLICATIONS = 'sakim_pan_applications_v1';
const STORAGE_KEY_CURRENT_USER = 'sakim_pan_current_user_v1';
const STORAGE_KEY_USERS = 'sakim_pan_users_v1';
const STORAGE_KEY_NOTIFICATIONS = 'sakim_pan_notifications_v1';
const STORAGE_KEY_DRAFT_PREFIX = 'sakim_pan_draft_';

// Initial realistic seed applications
const SEED_APPLICATIONS: PanApplication[] = [
  {
    id: 'SKM-2026-89412',
    acknowledgementNo: '881029384756102',
    serviceType: 'new_pan',
    status: 'completed',
    statusRemarks: 'PAN Card successfully allocated and dispatched via Speed Post. E-PAN is ready to download.',
    createdAt: '2026-11-02T10:15:00Z',
    updatedAt: '2026-11-08T16:30:00Z',
    customerUserId: 'user-default-1',
    customerEmail: 'sakimhossaink@gmail.com',
    customerMobile: '9876543210',
    isDraft: false,
    applicant: {
      title: 'Shri',
      firstName: 'Rahul',
      middleName: 'Kumar',
      lastName: 'Sharma',
      fullNameOnCard: 'RAHUL KUMAR SHARMA',
      gender: 'Male',
      dob: '1995-08-14',
      fatherName: 'RAMESHWAR SHARMA',
      parentToPrint: 'Father',
      aadhaarNumber: 'XXXX-XXXX-4819',
      aadhaarName: 'Rahul Kumar Sharma'
    },
    contact: {
      mobile: '9876543210',
      email: 'sakimhossaink@gmail.com',
      addressType: 'Residence',
      flatNo: 'Flat 402, Royal Residency',
      premises: 'Near Metro Station Pillar 114',
      road: 'Park Street Extension',
      area: 'Koramangala 4th Block',
      city: 'Bengaluru',
      state: 'Karnataka',
      pincode: '560034',
      country: 'India'
    },
    documents: {
      idProofType: 'Aadhaar Card (UIDAI)',
      idProofFileName: 'aadhaar_front_back.pdf',
      addressProofType: 'Aadhaar Card (UIDAI)',
      addressProofFileName: 'aadhaar_front_back.pdf',
      dobProofType: 'Birth Certificate issued by Municipal Authority',
      dobProofFileName: 'birth_cert_rahul.pdf',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
      signatureUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><text x="10" y="40" font-family="cursive" font-size="28" fill="%231e3a8a">R. K. Sharma</text></svg>'
    },
    consentAccepted: true,
    payment: {
      amount: 107,
      status: 'verified',
      method: 'upi_qr',
      transactionId: 'TXN-SKM-889012',
      utrNumber: '431526987412',
      paidAt: '2026-11-02T10:20:00Z',
      receiptNumber: 'RCPT-2026-00481',
      verifiedByAdmin: true
    },
    allocatedPan: 'BLRPS7812M',
    speedPostTracking: 'EK948172901IN',
    history: [
      {
        id: 'h-1',
        status: 'submitted',
        timestamp: '2026-11-02T10:22:00Z',
        note: 'Application submitted with payment of ₹107 confirmed.',
        actor: 'Customer'
      },
      {
        id: 'h-2',
        status: 'under_review',
        timestamp: '2026-11-03T11:45:00Z',
        note: 'Assisted verification of Identity and Address proof passed.',
        actor: 'Admin SAKIM'
      },
      {
        id: 'h-3',
        status: 'processing',
        timestamp: '2026-11-05T14:10:00Z',
        note: 'Transmitted to Income Tax Department PAN allocation server.',
        actor: 'System Integration'
      },
      {
        id: 'h-4',
        status: 'completed',
        timestamp: '2026-11-08T16:30:00Z',
        note: 'Permanent Account Number BLRPS7812M allocated. Physical card dispatched via India Post.',
        actor: 'Admin SAKIM'
      }
    ]
  },
  {
    id: 'SKM-2026-77319',
    acknowledgementNo: '881029384756789',
    serviceType: 'minor_pan',
    status: 'under_review',
    statusRemarks: 'Minor application under representative assessee scrutiny. Verification in progress.',
    createdAt: '2026-11-07T14:20:00Z',
    updatedAt: '2026-11-08T09:15:00Z',
    customerUserId: 'user-default-1',
    customerEmail: 'sakimhossaink@gmail.com',
    customerMobile: '9876543210',
    isDraft: false,
    applicant: {
      title: 'Kumari',
      firstName: 'Aarav',
      middleName: '',
      lastName: 'Kumar',
      fullNameOnCard: 'AARAV KUMAR (MINOR)',
      gender: 'Male',
      dob: '2015-06-22',
      fatherName: 'RAJESH KUMAR',
      parentToPrint: 'Father',
      aadhaarNumber: 'XXXX-XXXX-9102',
      aadhaarName: 'Aarav Kumar'
    },
    minorDetails: {
      isMinor: true,
      guardianTitle: 'Shri',
      guardianName: 'Rajesh Kumar',
      guardianRelationship: 'Father',
      guardianAddress: 'H-52, Sector 18, Noida, Uttar Pradesh - 201301',
      guardianMobile: '9876543210',
      guardianAadhaar: 'XXXX-XXXX-1144',
      schoolOrInstitute: 'Delhi Public School, Noida'
    },
    contact: {
      mobile: '9876543210',
      email: 'sakimhossaink@gmail.com',
      addressType: 'Residence',
      flatNo: 'H-52, Sector 18',
      premises: 'Near Atta Market',
      road: 'Captain Vijayant Thapar Marg',
      area: 'Sector 18',
      city: 'Noida',
      state: 'Uttar Pradesh',
      pincode: '201301',
      country: 'India'
    },
    documents: {
      idProofType: 'Aadhaar Card (UIDAI) of Minor',
      idProofFileName: 'minor_aadhaar.pdf',
      addressProofType: 'Aadhaar Card of Parent (Representative Assessee)',
      addressProofFileName: 'father_aadhaar.pdf',
      dobProofType: 'Birth Certificate issued by Municipal Authority',
      dobProofFileName: 'minor_birth_cert.pdf',
      photoUrl: 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=300&q=80',
      signatureUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><text x="10" y="40" font-family="cursive" font-size="26" fill="%231e3a8a">Rajesh Kumar (Father)</text></svg>'
    },
    consentAccepted: true,
    payment: {
      amount: 107,
      status: 'verified',
      method: 'gpay',
      transactionId: 'TXN-SKM-911428',
      utrNumber: '551248963214',
      paidAt: '2026-11-07T14:25:00Z',
      receiptNumber: 'RCPT-2026-00512',
      verifiedByAdmin: true
    },
    history: [
      {
        id: 'h-11',
        status: 'submitted',
        timestamp: '2026-11-07T14:26:00Z',
        note: 'Minor PAN application submitted along with Parent declaration.',
        actor: 'Customer'
      },
      {
        id: 'h-12',
        status: 'under_review',
        timestamp: '2026-11-08T09:15:00Z',
        note: 'Representative Assessee details matched with Minor birth record.',
        actor: 'Admin SAKIM'
      }
    ]
  },
  {
    id: 'SKM-2026-62104',
    acknowledgementNo: '881029384759901',
    serviceType: 'correction',
    status: 'document_required',
    statusRemarks: 'Additional proof required: Please upload self-attested Marriage Certificate or Gazette notification for Surname change.',
    createdAt: '2026-11-06T12:00:00Z',
    updatedAt: '2026-11-08T11:20:00Z',
    customerUserId: 'user-default-1',
    customerEmail: 'sakimhossaink@gmail.com',
    customerMobile: '9876543210',
    isDraft: false,
    applicant: {
      title: 'Smt',
      firstName: 'Priya',
      middleName: '',
      lastName: 'Mukherjee Banerjee',
      fullNameOnCard: 'PRIYA MUKHERJEE BANERJEE',
      gender: 'Female',
      dob: '1992-11-04',
      fatherName: 'SUBHASH MUKHERJEE',
      parentToPrint: 'Father',
      existingPan: 'CALPM5501K',
      aadhaarNumber: 'XXXX-XXXX-6632',
      aadhaarName: 'Priya Mukherjee'
    },
    correctionFields: {
      changeName: true,
      changeDob: false,
      changeFatherName: false,
      changePhoto: true,
      changeSignature: true,
      changeAddress: false,
      remarks: 'Surname updated post marriage and updated photograph & signature'
    },
    contact: {
      mobile: '9876543210',
      email: 'sakimhossaink@gmail.com',
      addressType: 'Residence',
      flatNo: 'Flat B-3, Block 2',
      premises: 'Greenwood Heights',
      road: 'EM Bypass Road',
      area: 'Salt Lake Sector V',
      city: 'Kolkata',
      state: 'West Bengal',
      pincode: '700091',
      country: 'India'
    },
    documents: {
      idProofType: 'Aadhaar Card with Updated Name',
      idProofFileName: 'priya_aadhaar.pdf',
      addressProofType: 'Voter Identity Card',
      addressProofFileName: 'priya_voter.pdf',
      dobProofType: 'Passport of India',
      dobProofFileName: 'priya_passport.pdf',
      photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      signatureUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><text x="10" y="40" font-family="cursive" font-size="26" fill="%231e3a8a">P. M. Banerjee</text></svg>'
    },
    consentAccepted: true,
    payment: {
      amount: 107,
      status: 'verified',
      method: 'phonepe',
      transactionId: 'TXN-SKM-774910',
      utrNumber: '882314569871',
      paidAt: '2026-11-06T12:05:00Z',
      receiptNumber: 'RCPT-2026-00499',
      verifiedByAdmin: true
    },
    history: [
      {
        id: 'h-21',
        status: 'submitted',
        timestamp: '2026-11-06T12:06:00Z',
        note: 'PAN Correction application submitted.',
        actor: 'Customer'
      },
      {
        id: 'h-22',
        status: 'under_review',
        timestamp: '2026-11-07T10:15:00Z',
        note: 'Scrutiny initiated for name correction.',
        actor: 'Admin SAKIM'
      },
      {
        id: 'h-23',
        status: 'document_required',
        timestamp: '2026-11-08T11:20:00Z',
        note: 'Marriage certificate copy or gazette notification requested.',
        actor: 'Admin SAKIM'
      }
    ]
  },
  {
    id: 'SKM-2026-51009',
    acknowledgementNo: '881029384752200',
    serviceType: 'major_pan',
    status: 'processing',
    statusRemarks: 'Minor to Major PAN conversion in process. Adult photo and signature biometric record updating.',
    createdAt: '2026-11-05T09:40:00Z',
    updatedAt: '2026-11-08T15:00:00Z',
    customerUserId: 'user-default-1',
    customerEmail: 'sakimhossaink@gmail.com',
    customerMobile: '9876543210',
    isDraft: false,
    applicant: {
      title: 'Shri',
      firstName: 'Arjun',
      middleName: '',
      lastName: 'Verma',
      fullNameOnCard: 'ARJUN VERMA',
      gender: 'Male',
      dob: '2008-10-15',
      fatherName: 'DEVENDRA VERMA',
      parentToPrint: 'Father',
      existingPan: 'DELPV4419P',
      aadhaarNumber: 'XXXX-XXXX-8921',
      aadhaarName: 'Arjun Verma'
    },
    majorDetails: {
      previousMinorPan: 'DELPV4419P',
      employmentStatus: 'Student / Young Professional',
      sourceOfIncome: 'Salary / Stipend',
      declarationAgreed: true
    },
    contact: {
      mobile: '9876543210',
      email: 'sakimhossaink@gmail.com',
      addressType: 'Residence',
      flatNo: 'House No 14/B',
      premises: 'Shivalik Enclave',
      road: 'Ring Road',
      area: 'Lajpat Nagar IV',
      city: 'New Delhi',
      state: 'Delhi',
      pincode: '110024',
      country: 'India'
    },
    documents: {
      idProofType: 'Aadhaar Card (UIDAI)',
      idProofFileName: 'arjun_aadhaar.pdf',
      addressProofType: 'Electricity Bill',
      addressProofFileName: 'elec_bill_delhi.pdf',
      dobProofType: 'Matriculation Certificate',
      dobProofFileName: 'class_10_cert.pdf',
      photoUrl: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
      signatureUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><text x="10" y="40" font-family="cursive" font-size="28" fill="%231e3a8a">Arjun Verma</text></svg>'
    },
    consentAccepted: true,
    payment: {
      amount: 107,
      status: 'verified',
      method: 'paytm',
      transactionId: 'TXN-SKM-551044',
      utrNumber: '662410887410',
      paidAt: '2026-11-05T09:45:00Z',
      receiptNumber: 'RCPT-2026-00465',
      verifiedByAdmin: true
    },
    history: [
      {
        id: 'h-31',
        status: 'submitted',
        timestamp: '2026-11-05T09:46:00Z',
        note: 'Major PAN conversion request submitted.',
        actor: 'Customer'
      },
      {
        id: 'h-32',
        status: 'under_review',
        timestamp: '2026-11-06T14:30:00Z',
        note: 'Age verification verified as completed 18 years.',
        actor: 'Admin SAKIM'
      },
      {
        id: 'h-33',
        status: 'processing',
        timestamp: '2026-11-08T15:00:00Z',
        note: 'Forwarded to Central PAN Service for new signature upload.',
        actor: 'Admin SAKIM'
      }
    ]
  }
];

// Seed sample notifications
const SEED_NOTIFICATIONS: AppNotification[] = [
  {
    id: 'notif-1',
    userId: 'all',
    title: 'Welcome to SAKIM Digital Seva Kendra',
    message: 'Your trusted partner for 100% genuine citizen facilitation, government welfare schemes, PAN services, and certificates.',
    date: '2026-11-01T08:00:00Z',
    read: false,
    type: 'general'
  },
  {
    id: 'notif-2',
    userId: 'user-default-1',
    title: 'PAN Card Allocated & Dispatched!',
    message: 'Congratulations! Your PAN BLRPS7812M is ready. Speed Post Tracking: EK948172901IN.',
    date: '2026-11-08T16:30:00Z',
    read: false,
    type: 'status',
    linkToApplicationId: 'SKM-2026-89412'
  },
  {
    id: 'notif-3',
    userId: 'user-default-1',
    title: 'Action Required: Additional Document Needed',
    message: 'For Application SKM-2026-62104, please upload proof of surname change.',
    date: '2026-11-08T11:20:00Z',
    read: false,
    type: 'document',
    linkToApplicationId: 'SKM-2026-62104'
  }
];

// Default demo users
const DEFAULT_USERS: UserProfile[] = [
  {
    id: 'user-default-1',
    name: 'Sakim Hossain',
    email: 'sakimhossaink@gmail.com',
    mobile: '9876543210',
    role: 'customer',
    state: 'West Bengal',
    createdAt: '2026-10-15T09:00:00Z'
  },
  {
    id: 'admin-default-1',
    name: 'SAKIM Master Admin',
    email: 'admin@sakim.com',
    mobile: '9876500000',
    role: 'admin',
    state: 'National Portal',
    createdAt: '2026-10-01T00:00:00Z'
  }
];

export const StorageService = {
  // Initialize storage
  init(): void {
    if (!localStorage.getItem(STORAGE_KEY_APPLICATIONS)) {
      localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(SEED_APPLICATIONS));
    }
    if (!localStorage.getItem(STORAGE_KEY_USERS)) {
      localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(DEFAULT_USERS));
    }
    if (!localStorage.getItem(STORAGE_KEY_NOTIFICATIONS)) {
      localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
    }
  },

  // Users & Auth
  getUsers(): UserProfile[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_USERS);
      return data ? JSON.parse(data) : DEFAULT_USERS;
    } catch {
      return DEFAULT_USERS;
    }
  },

  saveUser(user: UserProfile): void {
    const users = this.getUsers();
    const index = users.findIndex(u => u.id === user.id || u.email === user.email);
    if (index >= 0) {
      users[index] = user;
    } else {
      users.push(user);
    }
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(users));
  },

  getCurrentUser(): UserProfile | null {
    try {
      const data = localStorage.getItem(STORAGE_KEY_CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  setCurrentUser(user: UserProfile | null): void {
    if (user) {
      localStorage.setItem(STORAGE_KEY_CURRENT_USER, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY_CURRENT_USER);
    }
  },

  // Applications
  getApplications(): PanApplication[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_APPLICATIONS);
      return data ? JSON.parse(data) : SEED_APPLICATIONS;
    } catch {
      return SEED_APPLICATIONS;
    }
  },

  getUserApplications(userId: string, email?: string): PanApplication[] {
    const all = this.getApplications();
    return all.filter(app => 
      app.customerUserId === userId || 
      (email && app.customerEmail.toLowerCase() === email.toLowerCase())
    );
  },

  getApplicationById(id: string): PanApplication | undefined {
    const all = this.getApplications();
    return all.find(a => a.id.toLowerCase() === id.toLowerCase() || a.acknowledgementNo === id);
  },

  saveApplication(app: PanApplication): void {
    const apps = this.getApplications();
    const index = apps.findIndex(a => a.id === app.id);
    if (index >= 0) {
      apps[index] = { ...app, updatedAt: new Date().toISOString() };
    } else {
      apps.unshift(app);
    }
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(apps));
  },

  deleteApplication(id: string): void {
    const apps = this.getApplications().filter(a => a.id !== id);
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(apps));
  },

  // Drafts / Virtual Memory
  saveDraft(serviceType: ServiceType, userId: string, draftData: Partial<PanApplication>): void {
    const key = `${STORAGE_KEY_DRAFT_PREFIX}${userId}_${serviceType}`;
    localStorage.setItem(key, JSON.stringify({
      ...draftData,
      savedAt: new Date().toISOString()
    }));
  },

  getDraft(serviceType: ServiceType, userId: string): Partial<PanApplication> | null {
    const key = `${STORAGE_KEY_DRAFT_PREFIX}${userId}_${serviceType}`;
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  },

  clearDraft(serviceType: ServiceType, userId: string): void {
    const key = `${STORAGE_KEY_DRAFT_PREFIX}${userId}_${serviceType}`;
    localStorage.removeItem(key);
  },

  // Admin Actions
  updateStatus(appId: string, newStatus: ApplicationStatus, remarks: string, actor: string = 'Admin SAKIM'): PanApplication | null {
    const apps = this.getApplications();
    const app = apps.find(a => a.id === appId);
    if (!app) return null;

    app.status = newStatus;
    app.statusRemarks = remarks;
    app.updatedAt = new Date().toISOString();

    if (newStatus === 'completed' && !app.allocatedPan) {
      // Allocate simulated permanent account number
      const randomChars = Math.random().toString(36).substring(2, 6).toUpperCase();
      const lastChar = String.fromCharCode(65 + Math.floor(Math.random() * 26));
      app.allocatedPan = `SKM${app.applicant.lastName[0] || 'P'}${randomChars[0]}${Math.floor(1000 + Math.random() * 9000)}${lastChar}`;
      if (!app.speedPostTracking) {
        app.speedPostTracking = `EK${Math.floor(100000000 + Math.random() * 900000000)}IN`;
      }
    }

    app.history.push({
      id: `h-${Date.now()}`,
      status: newStatus,
      timestamp: new Date().toISOString(),
      note: remarks,
      actor
    });

    // Notify customer
    this.addNotification({
      id: `notif-${Date.now()}`,
      userId: app.customerUserId,
      title: `Application ${app.id} Status: ${newStatus.toUpperCase()}`,
      message: remarks,
      date: new Date().toISOString(),
      read: false,
      type: 'status',
      linkToApplicationId: app.id
    });

    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(apps));
    return app;
  },

  verifyPayment(appId: string, verified: boolean): PanApplication | null {
    const apps = this.getApplications();
    const app = apps.find(a => a.id === appId);
    if (!app) return null;

    app.payment.verifiedByAdmin = verified;
    app.payment.status = verified ? 'verified' : 'pending';
    app.updatedAt = new Date().toISOString();

    app.history.push({
      id: `h-pay-${Date.now()}`,
      status: app.status,
      timestamp: new Date().toISOString(),
      note: verified ? 'Payment verified and confirmed by SAKIM Accounts Admin.' : 'Payment marked pending verification.',
      actor: 'Admin SAKIM'
    });

    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(apps));
    return app;
  },

  // Notifications
  getNotifications(userId: string): AppNotification[] {
    try {
      const data = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
      const all: AppNotification[] = data ? JSON.parse(data) : SEED_NOTIFICATIONS;
      return all.filter(n => n.userId === 'all' || n.userId === userId || (userId === 'admin-default-1' && n.userId === 'admin'));
    } catch {
      return SEED_NOTIFICATIONS;
    }
  },

  addNotification(notif: AppNotification): void {
    try {
      const data = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
      const all: AppNotification[] = data ? JSON.parse(data) : SEED_NOTIFICATIONS;
      all.unshift(notif);
      localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(all));
    } catch (e) {
      console.error(e);
    }
  },

  markNotificationAsRead(notifId: string): void {
    try {
      const data = localStorage.getItem(STORAGE_KEY_NOTIFICATIONS);
      const all: AppNotification[] = data ? JSON.parse(data) : SEED_NOTIFICATIONS;
      const target = all.find(n => n.id === notifId);
      if (target) {
        target.read = true;
        localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(all));
      }
    } catch (e) {
      console.error(e);
    }
  },

  // Database Reset & Export
  resetDatabase(): void {
    localStorage.setItem(STORAGE_KEY_APPLICATIONS, JSON.stringify(SEED_APPLICATIONS));
    localStorage.setItem(STORAGE_KEY_USERS, JSON.stringify(DEFAULT_USERS));
    localStorage.setItem(STORAGE_KEY_NOTIFICATIONS, JSON.stringify(SEED_NOTIFICATIONS));
  }
};
