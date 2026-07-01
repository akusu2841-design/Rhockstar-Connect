// ================================
// DASHBOARD
// ================================

import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// ================================
// ELEMENTS
// ================================

const dashboard = document.getElementById("dashboard");

const sidebar = document.getElementById("sidebar");

const menuToggle = document.getElementById("menuToggle");

const closeMenu = document.getElementById("closeMenu");

const overlay = document.getElementById("sidebarOverlay");

const logoutBtn = document.getElementById("logout");

const navLinks = document.querySelectorAll(".nav-link");

const pages = document.querySelectorAll(".page");


// ================================
// AUTH CHECK
// ================================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";

        return;

    }

    dashboard.classList.remove("hidden");

});


// ================================
// SIDEBAR
// ================================

function openSidebar() {

    sidebar.classList.add("show");

    overlay.classList.add("show");

}

function closeSidebar() {

    sidebar.classList.remove("show");

    overlay.classList.remove("show");

}

menuToggle?.addEventListener("click", openSidebar);

closeMenu?.addEventListener("click", closeSidebar);

overlay?.addEventListener("click", closeSidebar);


// ================================
// PAGE SWITCHING
// ================================

navLinks.forEach(link => {

    link.addEventListener("click", e => {

        e.preventDefault();

        navLinks.forEach(item =>
            item.classList.remove("active")
        );

        link.classList.add("active");

        const page = link.dataset.page;

        pages.forEach(section =>
            section.classList.remove("active")
        );

        document
            .getElementById(page)
            ?.classList.add("active");

        closeSidebar();

    });

});


// ================================
// LOGOUT
// ================================

logoutBtn?.addEventListener("click", async () => {

    if (!confirm("Logout now?")) return;

    await signOut(auth);

    window.location.href = "login.html";

});
