// Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

const firebaseConfig = {

   // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA-HL4-Cr5tAYZH7GTEZKKMZpHfg42beDY",
  authDomain: "rhockstar-connect.firebaseapp.com",
  projectId: "rhockstar-connect",
  storageBucket: "rhockstar-connect.firebasestorage.app",
  messagingSenderId: "1015640312772",
  appId: "1:1015640312772:web:15c2497a29720b23c33291",
  measurementId: "G-24LGXEWZL6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

};

export const app = initializeApp(firebaseConfig);
