import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  Auth,
} from "firebase/auth";

// Define the type for the Firebase configuration object
interface FirebaseConfig {
  apiKey: string;
  authDomain: string;
  projectId: string;
  storageBucket: string;
  messagingSenderId: string;
  appId: string;
  measurementId?: string;
}

// Your web app's Firebase configuration
const firebaseConfig:FirebaseConfig = {
  apiKey: "AIzaSyClTF2T7gxptE0_gL9MZCyksGtSuQnbazs",
  authDomain: "riwi-centinela-prod.firebaseapp.com",
  projectId: "riwi-centinela-prod",
  storageBucket: "riwi-centinela-prod.appspot.com",
  messagingSenderId: "510954057846",
  appId: "1:510954057846:web:49cb7bf49fc9857c016f57",
  measurementId: "G-L1QXQYPX8S"
};


// Initialize Firebase application with the provided configuration
const app = initializeApp(firebaseConfig);

// Obtain the Firebase authentication instance
const auth: Auth = getAuth(app);

// Create an instance of GoogleAuthProvider for Google Sign-In
const googleProvider = new GoogleAuthProvider();

// Create an instance of OAuthProvider for Microsoft Sign-In
const microsoftProvider = new OAuthProvider("microsoft.com");

// Export the auth instance, googleProvider, microsoftProvider, and signInWithPopup function for use in other parts of the application
export { auth, googleProvider, microsoftProvider, signInWithPopup };
