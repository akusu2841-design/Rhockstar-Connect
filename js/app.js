// ======================
// RHOCKSTAR CONNECT
// MAIN APP
// ======================

document.addEventListener("DOMContentLoaded", () => {

    // Initialize every module

    if (typeof checkSession === "function")
        checkSession();

    if (typeof initNavigation === "function")
        initNavigation();

    if (typeof initProfile === "function")
        initProfile();

    if (typeof initFeed === "function")
        initFeed();

    if (typeof initJobs === "function")
        initJobs();

    if (typeof initMessages === "function")
        initMessages();

    if (typeof initConnections === "function")
        initConnections();

    if (typeof initNotifications === "function")
        initNotifications();

    if (typeof initSettings === "function")
        initSettings();

    if (typeof initDashboard === "function")
        initDashboard();

});
