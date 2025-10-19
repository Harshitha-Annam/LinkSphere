// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configurationnpm
const firebaseConfig = {
  apiKey: "AIzaSyC45LJYjsFEC6gHBCSzdxWOB8-bLcS0CvU",
  authDomain: "linksphere-b0be2.firebaseapp.com",
  projectId: "linksphere-b0be2",
  storageBucket: "linksphere-b0be2.firebasestorage.app",
  messagingSenderId: "1061579437145",
  appId: "1:1061579437145:web:74b66024a64ae7cc086d48"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);