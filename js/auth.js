// =========================================
// auth.js
// Rhockstar Connect Authentication Manager
// =========================================

const SESSION_KEY = "rhockstar_session";

/**
 * Save login session
 * Call this from login.js after successful login.
 */
function loginUser(userData) {

    if (!userData) return;

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(userData)
    );

}

/**
 * Get current logged in user
 */
function getCurrentUser() {

    return JSON.parse(
        localStorage.getItem(SESSION_KEY)
    );

}

/**
 * Check if user is logged in
 */
function isLoggedIn() {

    return getCurrentUser() !== null;

}

/**
 * Show Home or Dashboard
 * Runs only on index.html
 */
function checkSession() {

    const home = document.getElementById("home");
    const dashboard = document.getElementById("dashboard");
    const footer = document.querySelector(".footer");

    if (!home && !dashboard) return;

    if (isLoggedIn()) {

        if (home)
            home.style.display = "none";

        if (dashboard)
            dashboard.style.display = "flex";

        if (footer)
            footer.style.display = "none";

    } else {

        if (home)
            home.style.display = "block";

        if (dashboard)
            dashboard.style.display = "none";

        if (footer)
            footer.style.display = "block";

    }

}

/**
 * Logout
 */
function logoutUser() {

    const confirmLogout = confirm(
        "Are you sure you want to log out?"
    );

    if (!confirmLogout) return;

    localStorage.removeItem(SESSION_KEY);

    location.href = "index.html";

}

/**
 * Protect pages that require login
 *
 * Example:
 * requireLogin();
 */
function requireLogin() {

    if (!isLoggedIn()) {

        location.href = "login.html";

    }

}

/**
 * Prevent logged in users from opening
 * login or register pages.
 */
function redirectIfLoggedIn() {

    if (isLoggedIn()) {

        location.href = "index.html";

    }

}

/**
 * Initialize Authentication
 */
function initAuth() {

    const page = window.location.pathname
        .split("/")
        .pop();

    // Login page
    if (
        page === "login.html" ||
        page === "register.html"
    ) {

        redirectIfLoggedIn();
        return;

    }

    // Main website
    checkSession();

    const logoutBtn =
        document.getElementById("logout");

    if (logoutBtn) {

        logoutBtn.addEventListener(
            "click",
            logoutUser
        );

    }

}
