// ===============================
// RHOCKSTAR CONNECT
// navigation.js
// ===============================

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    initializeNavigation();

});

// ===============================
// INITIALIZE
// ===============================

function initializeNavigation() {

    setupSidebarNavigation();

    setupHashNavigation();

    openDefaultPage();

}

// ===============================
// SIDEBAR LINKS
// ===============================

function setupSidebarNavigation() {

    const navLinks = document.querySelectorAll("[data-page]");

    navLinks.forEach(link => {

        link.addEventListener("click", function (e) {

            e.preventDefault();

            const page = this.dataset.page;

            openPage(page);

        });

    });

}

// ===============================
// OPEN PAGE
// ===============================

function openPage(pageId) {

    document.querySelectorAll(".page").forEach(page => {

        page.classList.remove("active");

    });

    document.querySelectorAll("[data-page]").forEach(link => {

        link.classList.remove("active");

    });

    const selectedPage = document.getElementById(pageId);

    if (selectedPage) {

        selectedPage.classList.add("active");

    }

    const activeLink = document.querySelector(

        `[data-page="${pageId}"]`

    );

    if (activeLink) {

        activeLink.classList.add("active");

    }

    history.replaceState(

        null,

        "",

        "#" + pageId

    );

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

// ===============================
// HASH SUPPORT
// ===============================

function setupHashNavigation() {

    window.addEventListener("hashchange", () => {

        const page = location.hash.replace("#", "");

        if (page !== "") {

            openPage(page);

        }

    });

}

// ===============================
// DEFAULT PAGE
// ===============================

function openDefaultPage() {

    const page = location.hash.replace("#", "");

    if (page) {

        openPage(page);

        return;

    }

    const firstPage = document.querySelector(".page");

    if (!firstPage) return;

    openPage(firstPage.id);

}

// ===============================
// MOBILE MENU
// ===============================

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.getElementById("sidebar");

if (menuBtn && sidebar) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("show");

    });

}

// ===============================
// CLOSE MOBILE MENU
// ===============================

document.querySelectorAll("[data-page]").forEach(link => {

    link.addEventListener("click", () => {

        if (window.innerWidth <= 768 && sidebar) {

            sidebar.classList.remove("show");

        }

    });

});

// ===============================
// ESC CLOSE MENU
// ===============================

document.addEventListener("keydown", e => {

    if (e.key === "Escape") {

        if (sidebar) {

            sidebar.classList.remove("show");

        }

    }

});

// ===============================
// ACTIVE PAGE NAME
// ===============================

function currentPage() {

    const active = document.querySelector(".page.active");

    return active ? active.id : "";

}

// ===============================
// PUBLIC
// ===============================

window.Navigation = {

    openPage,

    currentPage

};
