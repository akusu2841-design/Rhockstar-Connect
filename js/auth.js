// =========================================
// auth.js
// Rhockstar Connect Authentication Manager
// =========================================

const SESSION_KEY = "rhockstar_session";

/* ==========================
   SAVE LOGIN SESSION
========================== */
function loginUser(userData) {

    if (!userData) return;

    localStorage.setItem(
        SESSION_KEY,
        JSON.stringify(userData)
    );

}

/* ==========================
   GET CURRENT USER
========================== */
function getCurrentUser() {

    const user = localStorage.getItem(SESSION_KEY);

    return user ? JSON.parse(user) : null;

}

/* ==========================
   CHECK LOGIN STATUS
========================== */
function isLoggedIn() {

    return getCurrentUser() !== null;

}

/* ==========================
   SHOW HOME OR DASHBOARD
========================== */
function checkSession() {

    const home = document.getElementById("home");
    const dashboard = document.getElementById("dashboard");
    const footer = document.querySelector(".footer");

    if (isLoggedIn()) {

        if (home) home.style.display = "none";

        if (dashboard) dashboard.style.display = "flex";

        if (footer) footer.style.display = "none";

    } else {

        if (home) home.style.display = "block";

        if (dashboard) dashboard.style.display = "none";

        if (footer) footer.style.display = "block";

    }

}

/* ==========================
   LOGOUT
========================== */
function logoutUser() {

    const answer = confirm(
        "Are you sure you want to log out?"
    );

    if (!answer) return;

    localStorage.removeItem(SESSION_KEY);

    sessionStorage.clear();

    location.href = "index.html";

}

/* ==========================
   REQUIRE LOGIN
========================== */
function requireLogin() {

    if (!isLoggedIn()) {

        location.replace("login.html");

    }

}

/* ==========================
   REDIRECT IF ALREADY LOGGED IN
========================== */
function redirectIfLoggedIn() {

    if (isLoggedIn()) {

        location.replace("index.html");

    }

}

/* ==========================
   INITIALIZE AUTH
========================== */
function initAuth() {

    const page = window.location.pathname
        .split("/")
        .pop();

    // Prevent logged in users from opening login/register
    if (
        page === "login.html" ||
        page === "register.html"
    ) {

        redirectIfLoggedIn();
        return;

    }

    // Show correct page
    checkSession();

    // Logout Button
    const logoutBtn = document.getElementById("logout");

    if (logoutBtn) {

        logoutBtn.removeEventListener(
            "click",
            logoutUser
        );

        logoutBtn.addEventListener(
            "click",
            logoutUser
        );

    }

}

/* ==========================
   START AUTH
========================== */
document.addEventListener(
    "DOMContentLoaded",
    initAuth
);
