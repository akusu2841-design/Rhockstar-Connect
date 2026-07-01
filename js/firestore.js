// ======================================
// RHOCKSTAR CONNECT
// firestore.js
// Firestore Database Functions
// ======================================

import { db } from "./firebase.js";

import {
    doc,
    setDoc,
    getDoc,
    updateDoc,
    deleteDoc,
    collection,
    getDocs,
    query,
    where,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// ======================================
// CREATE USER PROFILE
// ======================================

async function createUserProfile(uid, userData) {

    try {

        await setDoc(doc(db, "users", uid), {

            ...userData,

            createdAt: serverTimestamp(),

            updatedAt: serverTimestamp()

        });

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}


// ======================================
// GET USER PROFILE
// ======================================

async function getUserProfile(uid) {

    try {

        const snapshot = await getDoc(doc(db, "users", uid));

        if (snapshot.exists()) {

            return snapshot.data();

        }

        return null;

    } catch (error) {

        console.error(error);

        return null;

    }

}


// ======================================
// UPDATE USER PROFILE
// ======================================

async function updateUserProfile(uid, updates) {

    try {

        await updateDoc(doc(db, "users", uid), {

            ...updates,

            updatedAt: serverTimestamp()

        });

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}


// ======================================
// DELETE USER PROFILE
// ======================================

async function deleteUserProfile(uid) {

    try {

        await deleteDoc(doc(db, "users", uid));

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}


// ======================================
// CHECK USERNAME
// ======================================

async function usernameExists(username) {

    try {

        const q = query(
            collection(db, "users"),
            where("username", "==", username)
        );

        const snapshot = await getDocs(q);

        return !snapshot.empty;

    } catch (error) {

        console.error(error);

        return false;

    }

}


// ======================================
// GET EMAIL BY USERNAME
// ======================================

async function getEmailByUsername(username) {

    try {

        const q = query(
            collection(db, "users"),
            where("username", "==", username)
        );

        const snapshot = await getDocs(q);

        if (snapshot.empty) {

            return null;

        }

        return snapshot.docs[0].data().email;

    } catch (error) {

        console.error(error);

        return null;

    }

}


// ======================================
// EXPORTS
// ======================================

export {

    createUserProfile,

    getUserProfile,

    updateUserProfile,

    deleteUserProfile,

    usernameExists,

    getEmailByUsername

};
