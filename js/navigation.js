// ======================================
// RHOCKSTAR CONNECT
// navigation.js
// ======================================
function initNavigation() {
    console.log("Navigation ready");

    document.querySelectorAll("[data-page]").forEach(btn => {
        btn.addEventListener("click", () => {

            const page = btn.getAttribute("data-page");

            document.querySelectorAll(".page").forEach(p => {
                p.classList.remove("active");
            });

            document.getElementById(page).classList.add("active");
        });
    });
}

window.initNavigation = initNavigation;
"use strict";

// =======================
// ELEMENTS
// =======================

const pages = document.querySelectorAll(".page");
const navLinks = document.querySelectorAll(".nav-link");

const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

const menuToggle = document.getElementById("menuToggle");
const closeMenu = document.getElementById("closeMenu");

// =======================
// SHOW PAGE
// =======================

function showPage(pageId) {

    pages.forEach(page => {

        page.classList.remove("active");

    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {

        selectedPage.classList.add("active");

    }

    navLinks.forEach(link => {

        link.classList.remove("active");

        if (link.dataset.page === pageId) {

            link.classList.add("active");

        }

    });

}

// =======================
// NAVIGATION
// =======================

navLinks.forEach(link => {

    link.addEventListener("click", function (e) {

        e.preventDefault();

        const page = this.dataset.page;

        showPage(page);

        closeSidebar();

    });

});

// =======================
// SIDEBAR
// =======================

function openSidebar() {

    if (!sidebar) return;

    sidebar.classList.add("show");

    if (sidebarOverlay) {

        sidebarOverlay.classList.add("show");

    }

}

function closeSidebar() {

    if (!sidebar) return;

    sidebar.classList.remove("show");

    if (sidebarOverlay) {

        sidebarOverlay.classList.remove("show");

    }

}

// =======================
// MOBILE MENU
// =======================

if (menuToggle) {

    menuToggle.addEventListener("click", openSidebar);

}

if (closeMenu) {

    closeMenu.addEventListener("click", closeSidebar);

}

if (sidebarOverlay) {

    sidebarOverlay.addEventListener("click", closeSidebar);

}

// =======================
// DEFAULT PAGE
// =======================

document.addEventListener("DOMContentLoaded", () => {

    showPage("feed");

});

// =======================
// PUBLIC FUNCTIONS
// =======================

window.showPage = showPage;
window.openSidebar = openSidebar;
window.closeSidebar = closeSidebar;
