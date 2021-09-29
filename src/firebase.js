import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBv0ZClKlMeYoR0m5URmokwpUQmrSO9ZWQ",
  authDomain: "dissect-design.firebaseapp.com",
  databaseURL: "https://dissect-design-default-rtdb.firebaseio.com",
  projectId: "dissect-design",
  storageBucket: "dissect-design.appspot.com",
  messagingSenderId: "533129146971",
  appId: "1:533129146971:web:522d04b1b254ff88f9057e",
  measurementId: "G-WK6CPLK9K9",
};

initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export { db, auth };
