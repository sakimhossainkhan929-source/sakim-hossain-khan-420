import { initializeApp, getApps, getApp } from 'firebase/app';
import { 
  getAuth, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithPopup, 
  GoogleAuthProvider, 
  signOut, 
  sendPasswordResetEmail,
  updateProfile,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc, 
  collection, 
  query, 
  where, 
  getDocs, 
  orderBy,
  getDocFromServer
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { PanApplication, UserProfile } from '../types';

// Initialize Firebase App instance
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

/* CRITICAL: The app requires firestoreDatabaseId from firebase-applet-config.json */
export const db = getFirestore(app, firebaseConfig.firestoreDatabaseId);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
  authInfo: {
    userId?: string | null;
    email?: string | null;
    emailVerified?: boolean | null;
    isAnonymous?: boolean | null;
    tenantId?: string | null;
    providerInfo?: {
      providerId?: string | null;
      email?: string | null;
    }[];
  };
}

export function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null): never {
  const errInfo: FirestoreErrorInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: auth.currentUser?.uid,
      email: auth.currentUser?.email,
      emailVerified: auth.currentUser?.emailVerified,
      isAnonymous: auth.currentUser?.isAnonymous,
      tenantId: auth.currentUser?.tenantId,
      providerInfo: auth.currentUser?.providerData?.map(provider => ({
        providerId: provider.providerId,
        email: provider.email,
      })) || []
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
  throw new Error(JSON.stringify(errInfo));
}

// Test connection on boot per Firebase skill guidelines
async function testConnection() {
  try {
    await getDocFromServer(doc(db, 'test', 'connection'));
  } catch (error) {
    if (error instanceof Error && error.message.includes('the client is offline')) {
      console.warn('Firebase connection check: Client currently offline or initial handshake pending.');
    }
  }
}
testConnection();

// Check if user has administrative privileges
export async function checkIsAdmin(user: FirebaseUser | null): Promise<boolean> {
  if (!user) return false;
  // Bootstrapped administrator email
  if (user.email && user.email.toLowerCase() === 'sakimhossaink@gmail.com') {
    return true;
  }
  try {
    const adminRef = doc(db, 'admins', user.uid);
    const snap = await getDoc(adminRef);
    return snap.exists();
  } catch {
    return false;
  }
}

// User Profile Service
export const FirebaseService = {
  // Real User Registration
  async registerUser(fullName: string, email: string, pass: string, phone: string = ''): Promise<UserProfile> {
    const userCredential = await createUserWithEmailAndPassword(auth, email, pass);
    const fbUser = userCredential.user;

    await updateProfile(fbUser, { displayName: fullName });

    const isAdminUser = email.toLowerCase() === 'sakimhossaink@gmail.com';

    const userProfile: UserProfile = {
      id: fbUser.uid,
      name: fullName,
      email: fbUser.email || email,
      mobile: phone || '',
      role: isAdminUser ? 'admin' : 'customer',
      state: 'India',
      createdAt: new Date().toISOString()
    };

    const userRef = doc(db, 'users', fbUser.uid);
    try {
      await setDoc(userRef, {
        id: fbUser.uid,
        fullName,
        email: fbUser.email || email,
        phone: phone || '',
        role: 'customer', // strictly write customer in public document
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `users/${fbUser.uid}`);
    }

    return userProfile;
  },

  // Real User Login
  async loginUser(email: string, pass: string): Promise<UserProfile> {
    const userCredential = await signInWithEmailAndPassword(auth, email, pass);
    const fbUser = userCredential.user;

    const isAdmin = await checkIsAdmin(fbUser);

    let profile: UserProfile = {
      id: fbUser.uid,
      name: fbUser.displayName || email.split('@')[0],
      email: fbUser.email || email,
      mobile: '',
      role: isAdmin ? 'admin' : 'customer',
      state: 'India',
      createdAt: new Date().toISOString()
    };

    try {
      const snap = await getDoc(doc(db, 'users', fbUser.uid));
      if (snap.exists()) {
        const data = snap.data();
        profile = {
          ...profile,
          name: data.fullName || profile.name,
          mobile: data.phone || profile.mobile,
          role: isAdmin ? 'admin' : (data.role || 'customer')
        };
      }
    } catch (err) {
      // Non-fatal if profile fetch fails
      console.warn('Profile read warning: ', err);
    }

    return profile;
  },

  // Google Popup Login
  async loginWithGoogle(): Promise<UserProfile> {
    const userCredential = await signInWithPopup(auth, googleProvider);
    const fbUser = userCredential.user;

    const isAdmin = await checkIsAdmin(fbUser);

    const userProfile: UserProfile = {
      id: fbUser.uid,
      name: fbUser.displayName || 'Google Citizen',
      email: fbUser.email || '',
      mobile: fbUser.phoneNumber || '',
      role: isAdmin ? 'admin' : 'customer',
      state: 'India',
      createdAt: new Date().toISOString()
    };

    // Ensure document exists in users collection
    try {
      const userRef = doc(db, 'users', fbUser.uid);
      const snap = await getDoc(userRef);
      if (!snap.exists()) {
        await setDoc(userRef, {
          id: fbUser.uid,
          fullName: userProfile.name,
          email: userProfile.email,
          phone: userProfile.mobile,
          role: 'customer',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        });
      }
    } catch (err) {
      console.warn('Google user sync warning: ', err);
    }

    return userProfile;
  },

  // Password Reset
  async sendPasswordReset(email: string): Promise<void> {
    await sendPasswordResetEmail(auth, email);
  },

  // Logout
  async logout(): Promise<void> {
    await signOut(auth);
  },

  // Listen to Auth State
  onAuthStateChange(callback: (user: FirebaseUser | null) => void) {
    return onAuthStateChanged(auth, callback);
  },

  // Fetch applications for current user
  async getUserApplications(userId: string): Promise<PanApplication[]> {
    try {
      const q = query(
        collection(db, 'applications'),
        where('userId', '==', userId)
      );
      const snapshot = await getDocs(q);
      const list: PanApplication[] = [];
      snapshot.forEach(docSnap => {
        list.push(docSnap.data() as PanApplication);
      });
      return list;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'applications');
    }
  },

  // Fetch all applications (Admin only)
  async getAllApplications(): Promise<PanApplication[]> {
    try {
      const snapshot = await getDocs(collection(db, 'applications'));
      const list: PanApplication[] = [];
      snapshot.forEach(docSnap => {
        list.push(docSnap.data() as PanApplication);
      });
      return list;
    } catch (err) {
      handleFirestoreError(err, OperationType.LIST, 'applications');
    }
  },

  // Save new or updated application
  async saveApplication(app: PanApplication): Promise<void> {
    const docRef = doc(db, 'applications', app.id);
    try {
      await setDoc(docRef, {
        ...app,
        userId: app.customerUserId,
        updatedAt: new Date().toISOString()
      }, { merge: true });
    } catch (err) {
      handleFirestoreError(err, OperationType.WRITE, `applications/${app.id}`);
    }
  },

  // Admin status update
  async updateApplicationStatus(appId: string, status: string, remarks: string): Promise<void> {
    const docRef = doc(db, 'applications', appId);
    try {
      await updateDoc(docRef, {
        status,
        statusRemarks: remarks,
        updatedAt: new Date().toISOString()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `applications/${appId}`);
    }
  }
};
