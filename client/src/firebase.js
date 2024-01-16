// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-e4797.firebaseapp.com",
  projectId: "mern-estate-e4797",
  storageBucket: "mern-estate-e4797.appspot.com",
  messagingSenderId: "402109718109",
  appId: "1:402109718109:web:ca721151241e7a3080f7b4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);