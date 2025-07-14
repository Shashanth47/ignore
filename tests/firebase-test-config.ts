import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Test Firebase configuration (using your project)
const testFirebaseConfig = {
  apiKey: "AIzaSyBPDKayR3ukklFpdfIkTNJg9qIcQBcDBfo",
  authDomain: "tibzee-5b507.firebaseapp.com",
  projectId: "tibzee-5b507",
  storageBucket: "tibzee-5b507.firebasestorage.app",
  messagingSenderId: "767578095978",
  appId: "1:767578095978:web:664755fa25541f6a566513"
};

// Initialize Firebase for testing (without window dependencies)
const testApp = initializeApp(testFirebaseConfig, 'test-app');
export const testAuth = getAuth(testApp);
export const testDb = getFirestore(testApp);
export const testStorage = getStorage(testApp);

export default testApp;
