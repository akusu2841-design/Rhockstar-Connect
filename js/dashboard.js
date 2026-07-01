// ================================
// RHOCKSTAR CONNECT
// dashboard.js
// ================================

import { auth } from "./firebase.js";

import {
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";


// ================================
// ELEMENTS
// ================================

const dashboard = $("dashboard");

const sidebar = $("sidebar");

const menuToggle = $("menuToggle");

const closeMenu = $("closeMenu");

const overlay = $("sidebarOverlay");

const logoutBtn = $("logout");

const navLinks = $$(".nav-link");

const pages = $$(".page");


// ================================
// AUTH CHECK
// ================================

onAuthStateChanged(auth, (user) => {

    if (!user) {

        window.location.href = "login.html";
        return;

    }

    show(dashboard);

    initializeDashboard();

});


// ================================
// INITIALIZE DASHBOARD
// ================================

function initializeDashboard() {

    setupSidebar();

    setupNavigation();

    setupLogout();

}


// ================================
// SIDEBAR
// ================================

function openSidebar() {

    sidebar?.classList.add("show");

    overlay?.classList.add("show");

}

function closeSidebar() {

    sidebar?.classList.remove("show");

    overlay?.classList.remove("show");

}

function setupSidebar() {

    menuToggle?.addEventListener("click", openSidebar);

    closeMenu?.addEventListener("click", closeSidebar);

    overlay?.addEventListener("click", closeSidebar);

}


// ================================
// NAVIGATION
// ================================

function switchPage(pageId) {

    pages.forEach(page => {

        deactivate(page);

    });

    navLinks.forEach(link => {

        deactivate(link);

    });

    activate($(pageId));

    activate(document.querySelector(`[data-page="${pageId}"]`));

    localStorage.setItem("activePage", pageId);

    closeSidebar();

}

function setupNavigation() {

    navLinks.forEach(link => {

        link.addEventListener("click", (event) => {

            event.preventDefault();

            switchPage(link.dataset.page);

        });

    });

    const lastPage = localStorage.getItem("activePage") || "feed";

    switchPage(lastPage);

}


// ================================
// LOGOUT
// ================================

function setupLogout() {

    logoutBtn?.addEventListener("click", async () => {

        const confirmed = confirm("Logout now?");

        if (!confirmed) return;

        try {

            await signOut(auth);

            window.location.href = "login.html";

        } catch (error) {

            showMessage(error.message, "error");

        }

    });

}
