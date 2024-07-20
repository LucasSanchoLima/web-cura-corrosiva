// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY_FIREBASE,
  authDomain: "cura-corrosiva.firebaseapp.com",
  projectId: "cura-corrosiva",
  storageBucket: "cura-corrosiva.appspot.com",
  measurementId: "G-VJPDEZMQVC",
  messagingSenderId: process.env.NEXT_PUBLIC_MES_SENDER_ID_FIREBASE,
  appId: process.env.NEXT_PUBLIC_APP_ID_FIREBASE,
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
