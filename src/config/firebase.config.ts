import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  Auth,
} from "firebase/auth";
import { getEnv } from "./env.config";

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
const firebaseConfig: FirebaseConfig = {
  apiKey: getEnv().apiKey,
  authDomain: getEnv().authDomain,
  projectId: getEnv().projectId,
  storageBucket: getEnv().storageBucket,
  messagingSenderId: getEnv().messagingSenderId,
  appId: getEnv().appId,
  measurementId: getEnv().measurementId,
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
