// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator, enableNetwork, disableNetwork, enableMultiTabIndexedDbPersistence } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBPDKayR3ukklFpdfIkTNJg9qIcQBcDBfo",
  authDomain: "tibzee-5b507.firebaseapp.com",
  projectId: "tibzee-5b507",
  storageBucket: "tibzee-5b507.firebasestorage.app",
  messagingSenderId: "767578095978",
  appId: "1:767578095978:web:664755fa25541f6a566513"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Enable offline persistence
try {
  enableMultiTabIndexedDbPersistence(db);
} catch (err: any) {
  if (err.code === 'failed-precondition') {
    // Multiple tabs open, persistence can only be enabled in one tab at a time
    console.warn('Multiple tabs open, persistence disabled');
  } else if (err.code === 'unimplemented') {
    // The current browser does not support persistence
    console.warn('Browser does not support persistence');
  }
}

// Error handling for network issues
window.addEventListener('online', () => {
  enableNetwork(db).catch(console.error);
});

window.addEventListener('offline', () => {
  disableNetwork(db).catch(console.error);
});

export default app;
