// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword, sendPasswordResetEmail, confirmPasswordReset, updateProfile } from "firebase/auth"; // Import Firebase Auth
// import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCz1o0zmaTH3ZR1FnAA0cv8VAakLPeOA2s",
  authDomain: "manifest-8a55f.firebaseapp.com",
  projectId: "manifest-8a55f",
  storageBucket: "manifest-8a55f.firebasestorage.app",
  messagingSenderId: "775418469095",
  appId: "1:775418469095:web:4689a7b7f61edd60992042",
  measurementId: "G-3VYFMSWF7R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
// const firestore = getFirestore(app); // Initialize Firestore


export { auth, signInWithEmailAndPassword, signInWithPopup, createUserWithEmailAndPassword, provider, sendPasswordResetEmail, confirmPasswordReset, updateProfile }