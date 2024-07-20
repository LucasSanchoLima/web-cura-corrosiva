import { getApp, initializeApp } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDWtk18Ggyb4zGHybiWl4HmU13_yMnoqw4",
  authDomain: "cura-corrosiva.firebaseapp.com",
  projectId: "cura-corrosiva",
  storageBucket: "cura-corrosiva.appspot.com",
  messagingSenderId: "806781857327",
  appId: "1:806781857327:web:05e0bc16ce3324c0b2e0da",
  measurementId: "G-VJPDEZMQVC",
};

// if (firestore.length == 0) {
//   initializeApp(firebaseConfig, "Admin");
// }
try {
  initializeApp(firebaseConfig, "Admin");
} catch {}

export const authAdmin = getAuth(getApp("Admin"));
