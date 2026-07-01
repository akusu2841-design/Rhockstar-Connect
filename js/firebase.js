// ======================================
// RHOCKSTAR CONNECT
// firebase.js
// ======================================

// Firebase App
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

// Authentication
import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Firestore Database
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

// Firebase Storage
import { getStorage } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";

// Analytics
import {
    getAnalytics,
    isSupported
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";


// ======================================
// FIREBASE CONFIG
// ======================================

const firebaseConfig = {

    apiKey: "YOUR_API_KEY",

    authDomain: "YOUR_PROJECT.firebaseapp.com",

    projectId: "YOUR_PROJECT_ID",

    storageBucket: "YOUR_PROJECT.firebasestorage.app",

    messagingSenderId: "YOUR_SENDER_ID",

    appId: "YOUR_APP_ID",

    measurementId: "YOUR_MEASUREMENT_ID"

};


// ======================================
// INITIALIZE FIREBASE
// ======================================

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

const storage = getStorage(app);


// ======================================
// ANALYTICS
// ======================================

let analytics = null;

isSupported().then((supported) => {

    if (supported) {

        analytics = getAnalytics(app);

    }

});


// ======================================
// EXPORT
// ======================================

export {

    app,

    auth,

    db,

    storage,

    analytics

};
