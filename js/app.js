// =====================================
// Rhockstar Connect
// app.js
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    // Initialize Authentication first
    if (typeof initAuth === "function") {
        initAuth();
    }

    // Navigation
    if (typeof initNavigation === "function") {
        initNavigation();
    }

    // Dashboard
    if (typeof initDashboard === "function") {
        initDashboard();
    }

    // Feed
    if (typeof initFeed === "function") {
        initFeed();
    }

    // Profile
    if (typeof initProfile === "function") {
        initProfile();
    }

    // Connections
    if (typeof initConnections === "function") {
        initConnections();
    }

    // Messages
    if (typeof initMessages === "function") {
        initMessages();
    }

    // Jobs
    if (typeof initJobs === "function") {
        initJobs();
    }

    // Notifications
    if (typeof initNotifications === "function") {
        initNotifications();
    }

    // Settings
    if (typeof initSettings === "function") {
        initSettings();
    }

});
