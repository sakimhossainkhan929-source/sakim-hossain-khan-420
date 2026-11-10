/**
 * SAKIM Digital Seva Kendra - Core Types
 */

export type ServiceType = 
  | 'new_pan' 
  | 'minor_pan' 
  | 'major_pan' 
  | 'correction' 
  | 'reprint';

export type ApplicationStatus = 
  | 'submitted' 
  | 'under_review' 
  | 'document_required' 
  | 'processing' 
  | 'completed' 
  | 'rejected';

export type UserRole = 'customer' | 'admin';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  mobile: string;
  role: UserRole;
  state: string;
  avatar?: string;
  createdAt: string;
}

export interface ApplicantInfo {
  title: 'Shri' | 'Smt' | 'Kumari';
  firstName: string;
  middleName?: string;
  lastName: string;
  fullNameOnCard: string;
  gender: 'Male' | 'Female' | 'Transgender';
  dob: string;
  fatherName: string;
  motherName?: string;
  parentToPrint: 'Father' | 'Mother';
  existingPan?: string; // For correction / reprint
  aadhaarNumber?: string;
  aadhaarName?: string;
}

export interface MinorDetails {
  isMinor: boolean;
  guardianTitle: string;
  guardianName: string;
  guardianRelationship: 'Father' | 'Mother' | 'Legal Guardian';
  guardianAddress: string;
  guardianMobile: string;
  guardianAadhaar?: string;
  schoolOrInstitute?: string;
}

export interface MajorConversionDetails {
  previousMinorPan: string;
  employmentStatus: string;
  sourceOfIncome: string;
  declarationAgreed: boolean;
}

export interface CorrectionFields {
  changeName: boolean;
  changeDob: boolean;
  changeFatherName: boolean;
  changePhoto: boolean;
  changeSignature: boolean;
  changeAddress: boolean;
  remarks: string;
}

export interface ContactAndAddress {
  mobile: string;
  email: string;
  addressType: 'Residence' | 'Office';
  flatNo: string;
  premises: string;
  road: string;
  area: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
}

export interface DocumentUploads {
  idProofType: string;
  idProofFileName?: string;
  addressProofType: string;
  addressProofFileName?: string;
  dobProofType: string;
  dobProofFileName?: string;
  photoUrl?: string;
  signatureUrl?: string;
}

export interface PaymentDetails {
  amount: number;
  status: 'pending' | 'paid' | 'verified' | 'failed';
  method: 'upi_qr' | 'gpay' | 'phonepe' | 'paytm' | 'razorpay' | 'netbanking';
  transactionId: string;
  utrNumber: string;
  paidAt?: string;
  receiptNumber?: string;
  verifiedByAdmin?: boolean;
}

export interface StatusHistoryItem {
  id: string;
  status: ApplicationStatus;
  timestamp: string;
  note: string;
  actor: string;
}

export interface PanApplication {
  id: string;
  acknowledgementNo: string;
  serviceType: ServiceType;
  status: ApplicationStatus;
  statusRemarks: string;
  createdAt: string;
  updatedAt: string;
  customerUserId: string;
  customerEmail: string;
  customerMobile: string;
  isDraft: boolean;
  
  applicant: ApplicantInfo;
  minorDetails?: MinorDetails;
  majorDetails?: MajorConversionDetails;
  correctionFields?: CorrectionFields;
  contact: ContactAndAddress;
  documents: DocumentUploads;
  consentAccepted: boolean;
  
  payment: PaymentDetails;
  allocatedPan?: string; // Generated once completed, e.g. ABCPS1234F
  speedPostTracking?: string;
  history: StatusHistoryItem[];
}

export interface AppNotification {
  id: string;
  userId: string; // 'all' or specific user id or 'admin'
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: 'status' | 'payment' | 'document' | 'alert' | 'general';
  linkToApplicationId?: string;
}
