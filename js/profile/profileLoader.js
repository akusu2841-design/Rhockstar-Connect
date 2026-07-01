// =======================================
// RHOCKSTAR CONNECT
// profileLoader.js
// Firebase Profile Loader
// =======================================

import { auth, db } from "../firebase.js";

import {
    doc,
    getDoc,
    setDoc,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

window.profileData = {};
window.profileElements = {};


// =======================================
// INITIALIZE
// =======================================

export function initProfileLoader() {

    cacheProfileElements();

    onAuthStateChanged(auth, async (user) => {

        if (!user) {

            window.location.href = "login.html";

            return;

        }

        await loadProfile(user.uid);

    });

}


// =======================================
// CACHE ELEMENTS
// =======================================

function cacheProfileElements() {

    profileElements.displayName =
        document.getElementById("displayName");

    profileElements.displayUsername =
        document.getElementById("displayUsername");

    profileElements.displayTitle =
        document.getElementById("displayTitle");

    profileElements.displayBio =
        document.getElementById("displayBio");

    profileElements.profileAvatar =
        document.getElementById("profileAvatar");

    profileElements.profilePicPreview =
        document.getElementById("profilePicPreview");

    profileElements.coverPhoto =
        document.getElementById("coverPhoto");

}


// =======================================
// LOAD PROFILE
// =======================================

async function loadProfile(uid) {

    const profileRef = doc(db, "users", uid);

    const snapshot = await getDoc(profileRef);

    if (!snapshot.exists()) {

        await setDoc(profileRef, {

            fullName: auth.currentUser.displayName || "",

            username: "",

            title: "",

            bio: "",

            avatar: auth.currentUser.photoURL || "images/default-avatar.png",

            cover: "images/default-cover.jpg",

            website: "",

            phone: "",

            location: "",

            skills: [],

            experience: [],

            education: [],

            certificates: [],

            portfolio: [],

            gallery: [],

            datingGallery: [],

            followers: 0,

            following: 0,

            connections: 0,

            posts: 0,

            likes: 0,

            comments: 0,

            shares: 0,

            saved: 0,

            createdAt: new Date()

        });

    }

    onSnapshot(profileRef, (docSnap) => {

        window.profileData = docSnap.data();

        renderProfile();

    });

}


// =======================================
// RENDER PROFILE
// =======================================

function renderProfile() {

    if (!profileData) return;

    profileElements.displayName.textContent =
        profileData.fullName || "";

    profileElements.displayUsername.textContent =
        profileData.username || "";

    profileElements.displayTitle.textContent =
        profileData.title || "";

    profileElements.displayBio.textContent =
        profileData.bio || "";

    profileElements.profileAvatar.src =
        profileData.avatar || "images/default-avatar.png";

    profileElements.profilePicPreview.src =
        profileData.avatar || "images/default-avatar.png";

    profileElements.coverPhoto.src =
        profileData.cover || "images/default-cover.jpg";

    }
