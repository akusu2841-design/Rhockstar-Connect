// ======================================
// FIREBASE CONFIG
// ======================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";


// ======================================
// CONFIG
// ======================================

const firebaseConfig = {

    apiKey: "AIzaSyA-HL4-Cr5tAYZH7GTEZKKMZpHfg42beDY",

    authDomain: "rhockstar-connect.firebaseapp.com",

    projectId: "rhockstar-connect",

    storageBucket: "rhockstar-connect.firebasestorage.app",

    messagingSenderId: "1015640312772",

    appId: "1:1015640312772:web:15c2497a29720b23c33291"

};


// ======================================
// INITIALIZE
// ======================================

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);
