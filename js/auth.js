// ======================================
// RHOCKSTAR CONNECT
// auth.js
// ======================================

"use strict";

// =========================
// REGISTER
// =========================

function registerUser(userData) {

    const users = getUsers();

    const emailExists = users.some(user =>
        user.email.toLowerCase() === userData.email.toLowerCase()
    );

    if (emailExists) {

        return {
            success: false,
            message: "Email already exists."
        };

    }

    userData.id = generateId();
    userData.createdAt = new Date().toISOString();

    userData.profilePhoto = "images/default-avatar.png";
    userData.coverPhoto = "images/default-cover.jpg";

    userData.posts = 0;
    userData.followers = 0;
    userData.following = 0;
    userData.connections = 0;

    addUser(userData);

    return {
        success: true,
        message: "Account created successfully."
    };

}

// =========================
// LOGIN
// =========================

function loginUser(email, password) {

    const user = findUserByEmail(email);

    if (!user) {

        return {
            success: false,
            message: "Account not found."
        };

    }

    if (user.password !== password) {

        return {
            success: false,
            message: "Incorrect password."
        };

    }

    setCurrentUser(user);

    return {
        success: true,
        user
    };

}

// =========================
// LOGOUT
// =========================

function logout() {

    logoutUser();

    window.location.href = "login.html";

}

// =========================
// CURRENT USER
// =========================

function currentUser() {

    return getCurrentUser();

}

// =========================
// CHECK LOGIN
// =========================

function requireLogin() {

    if (!isLoggedIn()) {

        window.location.href = "login.html";

    }

}

// =========================
// UPDATE SESSION
// =========================

function refreshCurrentUser() {

    const current = getCurrentUser();

    if (!current) return;

    const latest = findUserById(current.id);

    if (latest) {

        setCurrentUser(latest);

    }

}

// =========================
// AUTO REDIRECT
// =========================

document.addEventListener("DOMContentLoaded", () => {

    const page = location.pathname.toLowerCase();

    // Already logged in
    if (
        isLoggedIn() &&
        (
            page.includes("login") ||
            page.includes("register")
        )
    ) {

        window.location.href = "index.html";

    }

    // Dashboard protection
    if (
        page.includes("index") &&
        document.getElementById("dashboard")
    ) {

        requireLogin();

    }

});

// =========================
// LOGOUT BUTTON
// =========================

document.addEventListener("click", e => {

    if (e.target.id === "logout") {

        logout();

    }

});
