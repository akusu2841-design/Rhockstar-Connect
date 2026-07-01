// ======================================
// RHOCKSTAR CONNECT
// sidebar.js
// ======================================

document.addEventListener("DOMContentLoaded", () => {

    // ============================
    // DOM ELEMENTS
    // ============================

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");

    const navLinks = document.querySelectorAll(".nav-link");
    const pages = document.querySelectorAll(".page");

    // ============================
    // OPEN SIDEBAR
    // ============================

    function openSidebar() {

        sidebar.classList.add("show");
        overlay.classList.add("show");

        document.body.style.overflow = "hidden";

    }

    // ============================
    // CLOSE SIDEBAR
    // ============================

    function closeSidebar() {

        sidebar.classList.remove("show");
        overlay.classList.remove("show");

        document.body.style.overflow = "";

    }

    // ============================
    // BUTTON EVENTS
    // ============================

    if (menuToggle) {

        menuToggle.addEventListener("click", openSidebar);

    }

    if (closeMenu) {

        closeMenu.addEventListener("click", closeSidebar);

    }

    if (overlay) {

        overlay.addEventListener("click", closeSidebar);

    }

    // ============================
    // PAGE NAVIGATION
    // ============================

    navLinks.forEach(link => {

        link.addEventListener("click", e => {

            e.preventDefault();

            // Remove active link
            navLinks.forEach(nav => nav.classList.remove("active"));

            // Activate clicked link
            link.classList.add("active");

            // Hide all pages
            pages.forEach(page => {

                page.classList.remove("active");

            });

            // Show selected page
            const pageId = link.dataset.page;

            const targetPage = document.getElementById(pageId);

            if (targetPage) {

                targetPage.classList.add("active");

            }

            // Close sidebar on mobile
            if (window.innerWidth <= 992) {

                closeSidebar();

            }

        });

    });

    // ============================
    // AUTO CLOSE ON RESIZE
    // ============================

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            sidebar.classList.remove("show");
            overlay.classList.remove("show");

            document.body.style.overflow = "";

        }

    });

});
