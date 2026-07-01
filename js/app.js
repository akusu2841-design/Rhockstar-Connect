// =======================================
// RHOCKSTAR CONNECT
// app.js
// Master Controller
// =======================================

// Firebase
import "./firebase.js";

// Navigation
import { initSidebar } from "./sidebar.js";
import { initNavigation } from "./navigation.js";

// Feed
import { initFeed } from "./feed/feedLoader.js";
import "./feed/postUploader.js";
import "./feed/postInteractions.js";

// Profile
import { initProfileLoader } from "./profile/profileLoader.js";

// =======================================
// START APPLICATION
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("🚀 Rhockstar Connect Started");

    initSidebar();

    initNavigation();

    initFeed();

    initProfileLoader();

});
