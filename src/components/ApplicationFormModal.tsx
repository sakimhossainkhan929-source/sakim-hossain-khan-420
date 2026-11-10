import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  CheckCircle2, 
  ArrowRight, 
  ArrowLeft, 
  Upload, 
  FileText, 
  ShieldCheck, 
  Save, 
  CreditCard, 
  QrCode, 
  User, 
  MapPin, 
  Calendar, 
  Phone, 
  Mail, 
  Sparkles,
  AlertTriangle,
  PenTool,
  Check
} from 'lucide-react';
import { 
  ServiceType, 
  PanApplication, 
  ApplicantInfo, 
  MinorDetails, 
  MajorConversionDetails, 
  CorrectionFields, 
  ContactAndAddress, 
  DocumentUploads,
  UserProfile
} from '../types';
import { StorageService } from '../services/storageService';
import { FirebaseService } from '../services/firebase';

interface ApplicationFormModalProps {
  serviceType: ServiceType;
  currentUser: UserProfile;
  initialApplication?: PanApplication | null;
  onClose: () => void;
  onSubmitSuccess: (application: PanApplication) => void;
}

export const ApplicationFormModal: React.FC<ApplicationFormModalProps> = ({
  serviceType,
  currentUser,
  initialApplication,
  onClose,
  onSubmitSuccess
}) => {
  const [step, setStep] = useState<number>(1);
  const [lastSavedTime, setLastSavedTime] = useState<string>('');
  const [saveToast, setSaveToast] = useState(false);

  // Form State
  const [applicant, setApplicant] = useState<ApplicantInfo>({
    title: serviceType === 'minor_pan' ? 'Kumari' : 'Shri',
    firstName: initialApplication?.applicant.firstName || currentUser.name.split(' ')[0] || '',
    middleName: initialApplication?.applicant.middleName || '',
    lastName: initialApplication?.applicant.lastName || currentUser.name.split(' ')[1] || '',
    fullNameOnCard: initialApplication?.applicant.fullNameOnCard || currentUser.name.toUpperCase() || '',
    gender: 'Male',
    dob: initialApplication?.applicant.dob || (serviceType === 'minor_pan' ? '2016-05-12' : '1998-04-10'),
    fatherName: initialApplication?.applicant.fatherName || '',
    motherName: initialApplication?.applicant.motherName || '',
    parentToPrint: 'Father',
    existingPan: initialApplication?.applicant.existingPan || '',
    aadhaarNumber: initialApplication?.applicant.aadhaarNumber || '',
    aadhaarName: initialApplication?.applicant.aadhaarName || ''
  });

  const [minorDetails, setMinorDetails] = useState<MinorDetails>({
    isMinor: true,
    guardianTitle: 'Shri',
    guardianName: '',
    guardianRelationship: 'Father',
    guardianAddress: '',
    guardianMobile: currentUser.mobile,
    guardianAadhaar: '',
    schoolOrInstitute: ''
  });

  const [majorDetails, setMajorDetails] = useState<MajorConversionDetails>({
    previousMinorPan: '',
    employmentStatus: 'Salaried / Professional',
    sourceOfIncome: 'Salary / Business Income',
    declarationAgreed: true
  });

  const [correctionFields, setCorrectionFields] = useState<CorrectionFields>({
    changeName: false,
    changeDob: false,
    changeFatherName: false,
    changePhoto: true,
    changeSignature: true,
    changeAddress: false,
    remarks: 'Update required in PAN record'
  });

  const [contact, setContact] = useState<ContactAndAddress>({
    mobile: currentUser.mobile || '9876543210',
    email: currentUser.email || 'user@sakim.com',
    addressType: 'Residence',
    flatNo: '',
    premises: '',
    road: '',
    area: '',
    city: '',
    state: currentUser.state || 'Maharashtra',
    pincode: '',
    country: 'India'
  });

  const [documents, setDocuments] = useState<DocumentUploads>({
    idProofType: 'Aadhaar Card (UIDAI)',
    idProofFileName: 'aadhaar_doc.pdf',
    addressProofType: 'Aadhaar Card (UIDAI)',
    addressProofFileName: 'aadhaar_doc.pdf',
    dobProofType: serviceType === 'minor_pan' ? 'Birth Certificate by Municipal Authority' : 'Aadhaar Card (UIDAI)',
    dobProofFileName: 'dob_proof.pdf',
    photoUrl: serviceType === 'minor_pan' 
      ? 'https://images.unsplash.com/photo-1543269865-cbf427effbad?auto=format&fit=crop&w=300&q=80' 
      : 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    signatureUrl: 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="200" height="60"><text x="10" y="40" font-family="cursive" font-size="28" fill="%231e3a8a">Digital Sign</text></svg>'
  });

  const [consentAccepted, setConsentAccepted] = useState(true);

  // Payment section state
  const [paymentMethod, setPaymentMethod] = useState<'upi_qr' | 'gpay' | 'phonepe' | 'paytm' | 'razorpay' | 'netbanking'>('upi_qr');
  const [utrNumber, setUtrNumber] = useState('');
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Canvas for drawing signature
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Auto-fill full name on card when first/last name changes
  useEffect(() => {
    if (!initialApplication) {
      const full = [applicant.firstName, applicant.middleName, applicant.lastName].filter(Boolean).join(' ').toUpperCase();
      if (full) {
        setApplicant(prev => ({ ...prev, fullNameOnCard: full }));
      }
    }
  }, [applicant.firstName, applicant.middleName, applicant.lastName]);

  // Load draft if available
  useEffect(() => {
    if (!initialApplication) {
      const draft = StorageService.getDraft(serviceType, currentUser.id);
      if (draft) {
        if (draft.applicant) setApplicant(draft.applicant);
        if (draft.contact) setContact(draft.contact);
        if (draft.documents) setDocuments(draft.documents);
        if (draft.minorDetails) setMinorDetails(draft.minorDetails);
        if (draft.majorDetails) setMajorDetails(draft.majorDetails);
        if (draft.correctionFields) setCorrectionFields(draft.correctionFields);
        setLastSavedTime('Loaded from Virtual Memory');
      }
    }
  }, [serviceType, currentUser.id]);

  // Virtual memory auto-saver
  const handleSaveDraft = () => {
    const draftPayload: Partial<PanApplication> = {
      serviceType,
      applicant,
      contact,
      documents,
      minorDetails,
      majorDetails,
      correctionFields,
      customerUserId: currentUser.id,
      customerEmail: currentUser.email,
      customerMobile: currentUser.mobile
    };
    StorageService.saveDraft(serviceType, currentUser.id, draftPayload);
    const timeStr = new Date().toLocaleTimeString();
    setLastSavedTime(timeStr);
    setSaveToast(true);
    setTimeout(() => setSaveToast(false), 2500);
  };

  // Drawing signature logic
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    setIsDrawing(true);
    ctx.lineWidth = 2.5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#1e3a8a';
    const rect = canvas.getBoundingClientRect();
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (canvas) {
      setDocuments(prev => ({ ...prev, signatureUrl: canvas.toDataURL() }));
    }
  };

  const clearSignatureCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Service Name helper
  const getServiceTitle = () => {
    switch (serviceType) {
      case 'new_pan': return 'New PAN Card Application (Form 49A)';
      case 'minor_pan': return 'Minor PAN Card Application (Under 18 Years)';
      case 'major_pan': return 'Major PAN Card Application (Minor to Adult Upgrade)';
      case 'correction': return 'PAN Card Correction & Data Update';
      case 'reprint': return 'Reprint / Duplicate PAN Card Request';
    }
  };

  // Submit Application
  const handleFinalSubmit = () => {
    setIsProcessingPayment(true);

    setTimeout(() => {
      const generatedId = `SKM-2026-${Math.floor(10000 + Math.random() * 90000)}`;
      const generatedAck = `881029${Math.floor(100000000 + Math.random() * 900000000)}`;
      const generatedTxn = `TXN-SKM-${Math.floor(100000 + Math.random() * 900000)}`;
      const generatedUtr = utrNumber.trim() || `4${Math.floor(10000000000 + Math.random() * 90000000000)}`;

      const newApp: PanApplication = {
        id: generatedId,
        acknowledgementNo: generatedAck,
        serviceType,
        status: 'submitted',
        statusRemarks: 'Application submitted successfully with assisted verification. Forwarding to government service node.',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        customerUserId: currentUser.id,
        customerEmail: currentUser.email,
        customerMobile: currentUser.mobile,
        isDraft: false,
        applicant,
        minorDetails: serviceType === 'minor_pan' ? minorDetails : undefined,
        majorDetails: serviceType === 'major_pan' ? majorDetails : undefined,
        correctionFields: serviceType === 'correction' ? correctionFields : undefined,
        contact,
        documents,
        consentAccepted,
        payment: {
          amount: 107,
          status: 'paid',
          method: paymentMethod,
          transactionId: generatedTxn,
          utrNumber: generatedUtr,
          paidAt: new Date().toISOString(),
          receiptNumber: `RCPT-2026-${Math.floor(1000 + Math.random() * 9000)}`,
          verifiedByAdmin: false
        },
        history: [
          {
            id: `h-${Date.now()}`,
            status: 'submitted',
            timestamp: new Date().toISOString(),
            note: `Application submitted with payment of ₹107 (${paymentMethod.toUpperCase()}).`,
            actor: 'Customer'
          }
        ]
      };

      StorageService.saveApplication(newApp);
      FirebaseService.saveApplication(newApp).catch(err => console.warn('Firestore application sync:', err));
      StorageService.clearDraft(serviceType, currentUser.id);

      // Notification
      StorageService.addNotification({
        id: `notif-${Date.now()}`,
        userId: currentUser.id,
        title: `PAN Application Submitted (${generatedId})`,
        message: `Your ${getServiceTitle()} has been received. Acknowledgement: ${generatedAck}.`,
        date: new Date().toISOString(),
        read: false,
        type: 'status',
        linkToApplicationId: generatedId
      });

      setIsProcessingPayment(false);
      onSubmitSuccess(newApp);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl my-auto rounded-3xl bg-gradient-to-b from-[#0c1f52] via-[#09153a] to-[#050e26] border-2 border-amber-400/80 shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Top Header */}
        <div className="bg-[#050f2b] border-b border-amber-500/30 p-4 sm:px-6 flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded bg-amber-400 text-slate-950">
                {serviceType.replace('_', ' ')}
              </span>
              <h2 className="text-base sm:text-lg font-bold text-white truncate">
                {getServiceTitle()}
              </h2>
            </div>
            <p className="text-xs text-amber-300">
              Form Step {step} of 4 • Assisted Legal Digital Process
            </p>
          </div>

          <div className="flex items-center gap-2">
            {/* Virtual Memory Save Button */}
            <button
              onClick={handleSaveDraft}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-amber-300 border border-amber-400/40 text-xs font-bold transition shadow"
              title="Save current progress to persistent Virtual Memory"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Draft</span>
            </button>

            <button
              onClick={onClose}
              className="p-1.5 rounded-xl bg-blue-950 hover:bg-rose-950 text-slate-300 hover:text-white border border-blue-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Step Indicator Bar */}
        <div className="bg-[#040b20] px-4 py-2.5 border-b border-blue-900/60 shrink-0">
          <div className="flex items-center justify-between max-w-2xl mx-auto text-xs">
            {[
              { num: 1, label: 'Applicant Details' },
              { num: 2, label: 'Address & Contact' },
              { num: 3, label: 'Documents & Sign' },
              { num: 4, label: 'Review & Pay (₹107)' }
            ].map(s => (
              <div 
                key={s.num} 
                onClick={() => s.num < step && setStep(s.num)}
                className={`flex items-center gap-1.5 font-semibold cursor-pointer ${
                  step === s.num 
                    ? 'text-amber-400' 
                    : step > s.num 
                    ? 'text-emerald-400' 
                    : 'text-slate-500'
                }`}
              >
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                  step === s.num 
                    ? 'bg-amber-400 text-slate-950 shadow-md' 
                    : step > s.num 
                    ? 'bg-emerald-500 text-slate-950' 
                    : 'bg-blue-950 text-slate-400 border border-blue-800'
                }`}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Virtual memory saved indicator */}
        {saveToast && (
          <div className="bg-emerald-900/90 text-emerald-200 text-xs py-1.5 px-4 text-center border-b border-emerald-600 font-semibold animate-in fade-in flex items-center justify-center gap-1.5">
            <Check className="w-4 h-4 text-emerald-300" />
            <span>Virtual Memory: Application progress safely auto-saved locally!</span>
          </div>
        )}

        {/* Form Body Scrollable Area */}
        <div className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1 text-slate-200">
          {/* STEP 1: Applicant Information */}
          {step === 1 && (
            <div className="space-y-5 animate-in fade-in">
              {/* Service specific guidance banner */}
              {serviceType === 'minor_pan' && (
                <div className="p-3.5 rounded-2xl bg-amber-500/15 border border-amber-500/50 flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-amber-300">Minor PAN Requirements:</p>
                    <p className="text-slate-300">
                      Applicant is under 18 years of age. A Parent or Legal Guardian must act as the Representative Assessee and provide their signature. The physical PAN card will feature the minor's photo without their direct signature.
                    </p>
                  </div>
                </div>
              )}

              {serviceType === 'major_pan' && (
                <div className="p-3.5 rounded-2xl bg-blue-500/15 border border-blue-500/50 flex items-start gap-3">
                  <User className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <p className="font-bold text-blue-300">Major Conversion Requirements:</p>
                    <p className="text-slate-300">
                      Upgrades existing minor PAN records upon turning 18. New biometric adult photograph and signature will replace old records.
                    </p>
                  </div>
                </div>
              )}

              {serviceType === 'correction' && (
                <div className="p-4 rounded-2xl bg-[#071333] border border-amber-500/40 space-y-3">
                  <p className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                    Select Fields to Correct in PAN Record:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs">
                    {[
                      { key: 'changeName', label: 'Applicant Name' },
                      { key: 'changeDob', label: 'Date of Birth' },
                      { key: 'changeFatherName', label: "Father's Name" },
                      { key: 'changePhoto', label: 'Photo Update' },
                      { key: 'changeSignature', label: 'Signature Update' },
                      { key: 'changeAddress', label: 'Address Change' }
                    ].map(field => (
                      <label key={field.key} className="flex items-center gap-2 p-2 rounded-xl bg-blue-950/60 border border-blue-800/60 cursor-pointer hover:border-amber-400">
                        <input
                          type="checkbox"
                          checked={(correctionFields as any)[field.key]}
                          onChange={(e) => setCorrectionFields({
                            ...correctionFields,
                            [field.key]: e.target.checked
                          })}
                          className="rounded text-amber-500 focus:ring-amber-400"
                        />
                        <span className="font-medium text-slate-200">{field.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {(serviceType === 'correction' || serviceType === 'reprint' || serviceType === 'major_pan') && (
                <div>
                  <label className="block text-xs font-semibold text-amber-300 mb-1">
                    Existing Permanent Account Number (PAN) *
                  </label>
                  <input
                    type="text"
                    maxLength={10}
                    value={applicant.existingPan}
                    onChange={(e) => setApplicant({ ...applicant, existingPan: e.target.value.toUpperCase() })}
                    placeholder="e.g. ABCDE1234F"
                    className="w-full max-w-sm px-4 py-2.5 rounded-xl bg-[#06112e] border border-amber-500/60 font-mono text-base uppercase font-bold text-amber-300 placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-amber-400"
                  />
                </div>
              )}

              {/* Title & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Title *</label>
                  <select
                    value={applicant.title}
                    onChange={(e) => setApplicant({ ...applicant, title: e.target.value as any })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Shri">Shri (Male)</option>
                    <option value="Smt">Smt (Married Female)</option>
                    <option value="Kumari">Kumari (Unmarried / Minor)</option>
                  </select>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">First Name *</label>
                  <input
                    type="text"
                    value={applicant.firstName}
                    onChange={(e) => setApplicant({ ...applicant, firstName: e.target.value })}
                    placeholder="First Name"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Middle Name</label>
                  <input
                    type="text"
                    value={applicant.middleName}
                    onChange={(e) => setApplicant({ ...applicant, middleName: e.target.value })}
                    placeholder="Middle Name (Optional)"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Last Name / Surname *</label>
                  <input
                    type="text"
                    value={applicant.lastName}
                    onChange={(e) => setApplicant({ ...applicant, lastName: e.target.value })}
                    placeholder="Last Name"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Full Name on Card */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Name Printed on PAN Card
                </label>
                <input
                  type="text"
                  value={applicant.fullNameOnCard}
                  onChange={(e) => setApplicant({ ...applicant, fullNameOnCard: e.target.value.toUpperCase() })}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 font-mono text-sm uppercase font-bold text-amber-300 focus:outline-none focus:border-amber-400"
                />
              </div>

              {/* Gender and DOB */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Gender *</label>
                  <div className="flex gap-4 pt-1">
                    {['Male', 'Female', 'Transgender'].map(g => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer text-xs font-semibold">
                        <input
                          type="radio"
                          name="gender"
                          checked={applicant.gender === g}
                          onChange={() => setApplicant({ ...applicant, gender: g as any })}
                          className="text-amber-500 focus:ring-amber-400"
                        />
                        <span>{g}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Date of Birth (DOB) *
                  </label>
                  <input
                    type="date"
                    value={applicant.dob}
                    onChange={(e) => setApplicant({ ...applicant, dob: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl bg-[#06112e] border border-blue-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Father's Name & Mother's Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Father's Full Name *</label>
                  <input
                    type="text"
                    value={applicant.fatherName}
                    onChange={(e) => setApplicant({ ...applicant, fatherName: e.target.value })}
                    placeholder="Enter Father's Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Mother's Full Name (Optional)</label>
                  <input
                    type="text"
                    value={applicant.motherName}
                    onChange={(e) => setApplicant({ ...applicant, motherName: e.target.value })}
                    placeholder="Enter Mother's Name"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              {/* Minor PAN Specific: Representative Assessee */}
              {serviceType === 'minor_pan' && (
                <div className="p-4 rounded-2xl bg-[#071333] border border-amber-500/40 space-y-4">
                  <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <User className="w-4 h-4 text-amber-400" />
                    Representative Assessee Details (Parent / Guardian)
                  </h4>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-slate-300 mb-1">Relationship</label>
                      <select
                        value={minorDetails.guardianRelationship}
                        onChange={(e) => setMinorDetails({ ...minorDetails, guardianRelationship: e.target.value as any })}
                        className="w-full px-3 py-2 rounded-xl bg-[#06112e] border border-blue-800 text-xs text-white"
                      >
                        <option value="Father">Father</option>
                        <option value="Mother">Mother</option>
                        <option value="Legal Guardian">Legal Court Guardian</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-slate-300 mb-1">Guardian Full Name *</label>
                      <input
                        type="text"
                        value={minorDetails.guardianName}
                        onChange={(e) => setMinorDetails({ ...minorDetails, guardianName: e.target.value })}
                        placeholder="Parent / Guardian Name"
                        className="w-full px-3 py-2 rounded-xl bg-[#06112e] border border-blue-800 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-300 mb-1">Guardian Residential Address</label>
                    <input
                      type="text"
                      value={minorDetails.guardianAddress}
                      onChange={(e) => setMinorDetails({ ...minorDetails, guardianAddress: e.target.value })}
                      placeholder="Complete Address of Parent"
                      className="w-full px-3 py-2 rounded-xl bg-[#06112e] border border-blue-800 text-xs text-white"
                    />
                  </div>
                </div>
              )}

              {/* Aadhaar Number */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  12-Digit Aadhaar Card Number
                </label>
                <input
                  type="text"
                  maxLength={14}
                  value={applicant.aadhaarNumber}
                  onChange={(e) => setApplicant({ ...applicant, aadhaarNumber: e.target.value })}
                  placeholder="XXXX-XXXX-XXXX (Optional or Masked)"
                  className="w-full max-w-sm px-4 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 font-mono text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>
          )}

          {/* STEP 2: Address & Contact */}
          {step === 2 && (
            <div className="space-y-4 animate-in fade-in">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-400" />
                Communication & Dispatch Address
              </h3>

              <div className="flex gap-4">
                {['Residence', 'Office'].map(type => (
                  <label key={type} className="flex items-center gap-2 text-xs font-semibold cursor-pointer">
                    <input
                      type="radio"
                      name="addressType"
                      checked={contact.addressType === type}
                      onChange={() => setContact({ ...contact, addressType: type as any })}
                      className="text-amber-500 focus:ring-amber-400"
                    />
                    <span>{type} Address</span>
                  </label>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Flat / Door / Block No. *</label>
                  <input
                    type="text"
                    value={contact.flatNo}
                    onChange={(e) => setContact({ ...contact, flatNo: e.target.value })}
                    placeholder="e.g. Flat 302, Block B"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Premises / Building Name</label>
                  <input
                    type="text"
                    value={contact.premises}
                    onChange={(e) => setContact({ ...contact, premises: e.target.value })}
                    placeholder="e.g. Royal Heights Apartments"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Road / Street / Lane</label>
                  <input
                    type="text"
                    value={contact.road}
                    onChange={(e) => setContact({ ...contact, road: e.target.value })}
                    placeholder="e.g. MG Road, Near City Mall"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Area / Locality / Sub-division *</label>
                  <input
                    type="text"
                    value={contact.area}
                    onChange={(e) => setContact({ ...contact, area: e.target.value })}
                    placeholder="e.g. Indiranagar Sector 2"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Town / City / District *</label>
                  <input
                    type="text"
                    value={contact.city}
                    onChange={(e) => setContact({ ...contact, city: e.target.value })}
                    placeholder="e.g. Bengaluru / Kolkata"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">State / Union Territory *</label>
                  <input
                    type="text"
                    value={contact.state}
                    onChange={(e) => setContact({ ...contact, state: e.target.value })}
                    placeholder="e.g. West Bengal / Delhi"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">PIN Code *</label>
                  <input
                    type="text"
                    maxLength={6}
                    value={contact.pincode}
                    onChange={(e) => setContact({ ...contact, pincode: e.target.value })}
                    placeholder="6-digit Indian PIN"
                    className="w-full px-3 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 font-mono text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Country</label>
                  <input
                    type="text"
                    disabled
                    value={contact.country}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#04091a] border border-blue-900 text-sm text-slate-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3 border-t border-blue-900/60">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Mobile Number (For SMS Updates) *</label>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-xs font-bold text-amber-400">+91</span>
                    <input
                      type="tel"
                      maxLength={10}
                      value={contact.mobile}
                      onChange={(e) => setContact({ ...contact, mobile: e.target.value })}
                      className="w-full pl-12 pr-3 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 font-mono text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">Email Address (For e-PAN Dispatch) *</label>
                  <input
                    type="email"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                    className="w-full px-3 py-2.5 rounded-xl bg-[#06112e] border border-blue-800 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Documents, Photo & Signature */}
          {step === 3 && (
            <div className="space-y-5 animate-in fade-in">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <FileText className="w-4 h-4 text-amber-400" />
                Supporting Proofs & Digital Biometrics
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {/* Proof of Identity */}
                <div className="p-3 rounded-2xl bg-[#06112e] border border-blue-800/80 space-y-2">
                  <label className="block text-xs font-bold text-amber-300">Proof of Identity (POI) *</label>
                  <select
                    value={documents.idProofType}
                    onChange={(e) => setDocuments({ ...documents, idProofType: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#040a1c] border border-blue-800 text-xs text-white"
                  >
                    <option value="Aadhaar Card (UIDAI)">Aadhaar Card (UIDAI)</option>
                    <option value="Voter ID Card">Voter ID Card</option>
                    <option value="Passport of India">Passport of India</option>
                    <option value="Driving License">Driving License</option>
                    {serviceType === 'minor_pan' && <option value="School ID Card">School Photo ID Card</option>}
                  </select>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Self-attested copy required</span>
                  </div>
                </div>

                {/* Proof of Address */}
                <div className="p-3 rounded-2xl bg-[#06112e] border border-blue-800/80 space-y-2">
                  <label className="block text-xs font-bold text-amber-300">Proof of Address (POA) *</label>
                  <select
                    value={documents.addressProofType}
                    onChange={(e) => setDocuments({ ...documents, addressProofType: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#040a1c] border border-blue-800 text-xs text-white"
                  >
                    <option value="Aadhaar Card (UIDAI)">Aadhaar Card (UIDAI)</option>
                    <option value="Electricity Bill (Last 3 Months)">Electricity Bill</option>
                    <option value="Bank Account Passbook">Bank Account Statement</option>
                    <option value="Passport of India">Passport of India</option>
                    <option value="Domicile Certificate">Domicile Certificate</option>
                  </select>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Address will be verified</span>
                  </div>
                </div>

                {/* Proof of DOB */}
                <div className="p-3 rounded-2xl bg-[#06112e] border border-blue-800/80 space-y-2">
                  <label className="block text-xs font-bold text-amber-300">Proof of Date of Birth (DOB) *</label>
                  <select
                    value={documents.dobProofType}
                    onChange={(e) => setDocuments({ ...documents, dobProofType: e.target.value })}
                    className="w-full px-2.5 py-1.5 rounded-lg bg-[#040a1c] border border-blue-800 text-xs text-white"
                  >
                    <option value="Birth Certificate by Municipal Authority">Birth Certificate</option>
                    <option value="Aadhaar Card (UIDAI)">Aadhaar Card (UIDAI)</option>
                    <option value="Matriculation Certificate (Class 10)">Class 10 Certificate</option>
                    <option value="Passport of India">Passport</option>
                  </select>
                  <div className="text-[11px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Matches DOB exactly</span>
                  </div>
                </div>
              </div>

              {/* Photo & Signature Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                {/* Photo Preview & Selection */}
                <div className="p-4 rounded-2xl bg-[#071333] border border-amber-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      Applicant Photograph (3.5cm x 2.5cm)
                    </span>
                    <span className="text-[10px] text-amber-400">White background</span>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="w-20 h-24 rounded-xl border-2 border-amber-400 bg-slate-900 overflow-hidden shadow-md shrink-0 flex items-center justify-center">
                      <img 
                        src={documents.photoUrl} 
                        alt="Applicant Preview" 
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="space-y-2 text-xs flex-1">
                      <p className="text-slate-300 text-[11px]">
                        Front-facing color photograph with clear visibility of facial features.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <label className="px-3 py-1.5 rounded-xl bg-blue-900/60 hover:bg-blue-800 text-amber-300 border border-blue-700 text-xs font-bold cursor-pointer transition flex items-center gap-1">
                          <Upload className="w-3.5 h-3.5" />
                          <span>Choose Photo</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                const reader = new FileReader();
                                reader.onload = () => {
                                  setDocuments(prev => ({ ...prev, photoUrl: reader.result as string }));
                                };
                                reader.readAsDataURL(file);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Signature Upload or Draw */}
                <div className="p-4 rounded-2xl bg-[#071333] border border-amber-500/40 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white">
                      {serviceType === 'minor_pan' ? "Guardian's Signature" : "Applicant's Signature"}
                    </span>
                    <button
                      type="button"
                      onClick={clearSignatureCanvas}
                      className="text-[10px] text-rose-300 hover:text-rose-200 underline"
                    >
                      Clear Pad
                    </button>
                  </div>

                  <div className="space-y-2">
                    {/* Draw Canvas */}
                    <div className="rounded-xl border-2 border-dashed border-blue-600 bg-white p-1">
                      <canvas
                        ref={canvasRef}
                        width={300}
                        height={90}
                        onMouseDown={startDrawing}
                        onMouseMove={draw}
                        onMouseUp={stopDrawing}
                        onMouseLeave={stopDrawing}
                        className="w-full h-20 bg-white cursor-crosshair rounded touch-none"
                      />
                    </div>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1">
                      <PenTool className="w-3 h-3 text-amber-400" />
                      Sign directly on the box above using mouse/finger, or choose upload.
                    </p>
                  </div>
                </div>
              </div>

              {/* Consent Box (Requirement: Include consent before collecting personal information) */}
              <div className="p-3.5 rounded-2xl bg-blue-950/80 border border-emerald-500/50 space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-200">
                  <input
                    type="checkbox"
                    checked={consentAccepted}
                    onChange={(e) => setConsentAccepted(e.target.checked)}
                    className="mt-0.5 rounded text-amber-500 focus:ring-amber-400"
                  />
                  <span>
                    <strong className="text-emerald-400 font-bold">Mandatory Consent & Legal Declaration:</strong> I hereby declare that the details provided are true and accurate to the best of my knowledge. I authorize SAKIM Digital Seva Kendra to process and submit my application to the authorized facilities on my behalf in compliance with the Digital Personal Data Protection (DPDP) Act.
                  </span>
                </label>
              </div>
            </div>
          )}

          {/* STEP 4: Review Application & Payment */}
          {step === 4 && (
            <div className="space-y-5 animate-in fade-in">
              <h3 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <CreditCard className="w-4 h-4 text-amber-400" />
                Review Application & Fee Payment
              </h3>

              {/* Summary Card */}
              <div className="p-4 rounded-2xl bg-[#06112e] border border-amber-500/40 text-xs space-y-3">
                <div className="flex items-center justify-between border-b border-blue-900 pb-2">
                  <span className="text-slate-400 font-semibold uppercase">Service Category:</span>
                  <span className="text-amber-300 font-bold">{getServiceTitle()}</span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="text-slate-400 block">Applicant Name:</span>
                    <strong className="text-white">{applicant.fullNameOnCard || `${applicant.firstName} ${applicant.lastName}`}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Date of Birth:</span>
                    <strong className="text-white">{applicant.dob}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Father's Name:</span>
                    <strong className="text-white">{applicant.fatherName || 'Not Specified'}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Mobile:</span>
                    <strong className="text-white">+91 {contact.mobile}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Dispatch City & State:</span>
                    <strong className="text-white">{contact.city || 'Kolkata'}, {contact.state}</strong>
                  </div>
                  <div>
                    <span className="text-slate-400 block">PIN Code:</span>
                    <strong className="text-white font-mono">{contact.pincode || '700091'}</strong>
                  </div>
                </div>
              </div>

              {/* Payment Section (Requirement 6: Payment system with UPI QR, status, receipt) */}
              <div className="p-5 rounded-3xl bg-gradient-to-br from-[#0c2054] to-[#06102c] border-2 border-amber-400 shadow-2xl space-y-4">
                <div className="flex items-center justify-between border-b border-blue-800 pb-3">
                  <div>
                    <h4 className="text-base font-black text-white">Official PAN Application Fee</h4>
                    <p className="text-xs text-slate-300">Includes Govt ITD PAN Fee, Assisted Verification, & Speed Post Dispatch</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-black text-amber-400">₹107.00</span>
                    <span className="block text-[10px] text-emerald-400 font-bold uppercase">All Taxes & GST Included</span>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                  {/* Left: Dynamic QR Code */}
                  <div className="md:col-span-5 flex flex-col items-center justify-center p-3 rounded-2xl bg-white text-slate-950 shadow-lg">
                    <QrCode className="w-36 h-36 text-slate-900" />
                    <span className="text-[10px] font-mono font-bold text-slate-700 mt-1">UPI: sakimpan@icici</span>
                    <span className="text-[9px] text-slate-500">Scan with any UPI App</span>
                  </div>

                  {/* Right: Payment Apps & UTR Entry */}
                  <div className="md:col-span-7 space-y-3">
                    <label className="block text-xs font-bold text-amber-300">Select Instant Payment Mode:</label>
                    <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                      {[
                        { id: 'upi_qr', name: 'Instant UPI' },
                        { id: 'gpay', name: 'Google Pay' },
                        { id: 'phonepe', name: 'PhonePe' },
                        { id: 'paytm', name: 'Paytm' },
                        { id: 'razorpay', name: 'Razorpay Gateway' }
                      ].map(p => (
                        <button
                          key={p.id}
                          type="button"
                          onClick={() => setPaymentMethod(p.id as any)}
                          className={`p-2.5 rounded-xl border text-center transition ${
                            paymentMethod === p.id 
                              ? 'bg-amber-400 text-slate-950 border-amber-400 shadow-md' 
                              : 'bg-blue-950/60 text-slate-200 border-blue-800 hover:border-amber-400'
                          }`}
                        >
                          {p.name}
                        </button>
                      ))}
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-300 mb-1">
                        UPI Transaction Reference / UTR Number (Optional for instant simulation)
                      </label>
                      <input
                        type="text"
                        value={utrNumber}
                        onChange={(e) => setUtrNumber(e.target.value)}
                        placeholder="e.g. 431526987412 (12-digit UTR)"
                        className="w-full px-3 py-2 rounded-xl bg-[#040b20] border border-blue-800 font-mono text-xs text-amber-300 placeholder-slate-600 focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="bg-[#050f2b] border-t border-blue-900/80 p-4 sm:px-6 flex items-center justify-between shrink-0">
          <div>
            {step > 1 && (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 rounded-xl bg-blue-950 hover:bg-blue-900 text-slate-200 border border-blue-800 text-xs font-bold flex items-center gap-1.5 transition"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            <span className="text-[11px] text-slate-400 hidden sm:inline">
              {lastSavedTime ? `Virtual Memory: ${lastSavedTime}` : 'Auto-save enabled'}
            </span>

            {step < 4 ? (
              <button
                type="button"
                onClick={() => {
                  if (step === 1 && !applicant.lastName) {
                    alert('Please enter applicant Last Name / Surname');
                    return;
                  }
                  setStep(step + 1);
                }}
                className="gold-btn px-6 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md"
              >
                <span>Continue</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="button"
                disabled={isProcessingPayment || !consentAccepted}
                onClick={handleFinalSubmit}
                className="gold-btn px-7 py-2.5 rounded-xl text-xs font-black flex items-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
              >
                {isProcessingPayment ? (
                  <span>Processing Payment & Filing...</span>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pay ₹107 & Submit Application</span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
