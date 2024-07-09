// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWtk18Ggyb4zGHybiWl4HmU13_yMnoqw4",
  authDomain: "cura-corrosiva.firebaseapp.com",
  projectId: "cura-corrosiva",
  storageBucket: "cura-corrosiva.appspot.com",
  messagingSenderId: "806781857327",
  appId: "1:806781857327:web:05e0bc16ce3324c0b2e0da",
  measurementId: "G-VJPDEZMQVC",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);
export const auth = getAuth(app);
