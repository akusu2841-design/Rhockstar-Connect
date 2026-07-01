// ======================================
// RHOCKSTAR CONNECT
// auth.js
// Firebase Authentication
// ======================================

import { auth } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail,
    sendEmailVerification,
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// ======================================
// REGISTER USER
// ======================================

async function registerUser(email, password) {

    try {

        const userCredential = await createUserWithEmailAndPassword(
            auth,
            email,
            password
        );

        await sendEmailVerification(userCredential.user);

        return {
            success: true,
            user: userCredential.user
        };

    } catch (error) {

        return {
    success: false,
    code: error.code,
    error: error.message
};

    }

}


// ======================================
// LOGIN USER
// ======================================

async function loginUser(email, password) {

    try {

        const userCredential = await signInWithEmailAndPassword(
            auth,
            email,
            password
        );

        return {
            success: true,
            user: userCredential.user
        };

    } catch (error) {

        return {
            success: false,
            error: error.message
        };

    }

}


// ======================================
// LOGOUT USER
// ======================================

async function logoutUser() {

    try {

        await signOut(auth);

        return {
            success: true
        };

    } catch (error) {

        return {
            success: false,
            error: error.message
        };

    }

}


// ======================================
// RESET PASSWORD
// ======================================

async function resetPassword(email) {

    try {

        await sendPasswordResetEmail(auth, email);

        return {
            success: true
        };

    } catch (error) {

        return {
            success: false,
            error: error.message
        };

    }

}


// ======================================
// SEND EMAIL VERIFICATION
// ======================================

async function verifyCurrentUser() {

    try {

        if (!auth.currentUser) {

            return {
                success: false,
                error: "No user is logged in."
            };

        }

        await sendEmailVerification(auth.currentUser);

        return {
            success: true
        };

    } catch (error) {

        return {
            success: false,
            error: error.message
        };

    }

}


// ======================================
// CURRENT USER
// ======================================

function getCurrentUser() {

    return auth.currentUser;

}


// ======================================
// AUTH STATE LISTENER
// ======================================

function observeAuthState(callback) {

    return onAuthStateChanged(auth, callback);

}


// ======================================
// EXPORTS
// ======================================

export {

    registerUser,
    loginUser,
    logoutUser,
    resetPassword,
    verifyCurrentUser,
    getCurrentUser,
    observeAuthState

};
