"use strict";

/* ==========================================
   PROFILE.JS
   Rhockstar Connect
========================================== */

// Wait until the page loads
document.addEventListener("DOMContentLoaded", () => {
    initializeProfile();
});

function initializeProfile() {
    cacheElements();
    loadProfile();
    attachProfileEvents();
    updateProfileCompletion();
}
