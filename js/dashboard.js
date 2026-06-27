// ===============================
// RHOCKSTAR CONNECT
// dashboard.js
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    updateDashboardStats();

    // Update every second
    setInterval(updateDashboardStats, 1000);

});

// ===============================
// UPDATE DASHBOARD STATS
// ===============================

function updateDashboardStats() {

    updatePosts();

    updateJobs();

    updateConnections();

    updateSavedJobs();

    updateApplications();

    updateNotifications();

}

// ===============================
// POSTS
// ===============================

function updatePosts() {

    const posts =
        document.querySelectorAll(".post-card").length;

    setText("myPosts", posts);

    setText("totalPosts", posts);

}

// ===============================
// JOBS
// ===============================

function updateJobs() {

    const jobs =
        document.querySelectorAll(".job-card").length;

    setText("totalJobs", jobs);

}

// ===============================
// CONNECTIONS
// ===============================

function updateConnections() {

    const connections =
        document.querySelectorAll(
            "#connections .remove-btn"
        ).length;

    setText("myConnections", connections);

    setText("settingsConnections", connections);

    setText("totalConnections", connections);

}

// ===============================
// SAVED JOBS
// ===============================

function updateSavedJobs() {

    const saved =
        document.querySelectorAll(
            ".saveBtn:disabled"
        ).length;

    setText("savedJobsCount", saved);

}

// ===============================
// APPLICATIONS
// ===============================

function updateApplications() {

    const applied =
        document.querySelectorAll(
            ".applyBtn:disabled"
        ).length;

    setText("applicationsCount", applied);

}

// ===============================
// NOTIFICATIONS
// ===============================

function updateNotifications() {

    const total =
        document.querySelectorAll(
            ".notification-card"
        ).length;

    const unread =
        document.querySelectorAll(
            ".notification-card.unread"
        ).length;

    setText("totalNotifications", total);

    setText("unreadNotifications", unread);

}

// ===============================
// HELPER FUNCTION
// ===============================

function setText(id, value) {

    const element =
        document.getElementById(id);

    if (element) {

        element.textContent = value;

    }

}

// ===============================
// REFRESH STATS
// (Can be called by other JS files)
// ===============================

window.refreshDashboard = updateDashboardStats;
