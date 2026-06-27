// =========================================
// navigation.js
// Rhockstar Connect Navigation
// =========================================

let pages = [];
let links = [];

/**
 * Show selected page
 */
function showPage(pageId) {

    pages.forEach(page => {

        page.classList.remove("active");
        page.style.display = "none";

    });

    const target = document.getElementById(pageId);

    if (!target) return;

    target.style.display = "block";

    setTimeout(() => {

        target.classList.add("active");

    }, 10);

}

/**
 * Open Sidebar
 */
function openSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("sidebarOverlay");

    if (sidebar)
        sidebar.classList.add("active");

    if (overlay)
        overlay.classList.add("active");

}

/**
 * Close Sidebar
 */
function closeSidebar() {

    const sidebar =
        document.getElementById("sidebar");

    const overlay =
        document.getElementById("sidebarOverlay");

    if (sidebar)
        sidebar.classList.remove("active");

    if (overlay)
        overlay.classList.remove("active");

}

/**
 * Highlight active menu item
 */
function setActiveLink(linkClicked) {

    links.forEach(link => {

        link.classList.remove("active");

    });

    linkClicked.classList.add("active");

}

/**
 * Initialize Navigation
 */
function initNavigation() {

    pages =
        document.querySelectorAll(".page");

    links =
        document.querySelectorAll("[data-page]");

    const menuToggle =
        document.getElementById("menuToggle");

    const closeMenu =
        document.getElementById("closeMenu");

    const overlay =
        document.getElementById("sidebarOverlay");

    // Sidebar

    if (menuToggle)
        menuToggle.addEventListener(
            "click",
            openSidebar
        );

    if (closeMenu)
        closeMenu.addEventListener(
            "click",
            closeSidebar
        );

    if (overlay)
        overlay.addEventListener(
            "click",
            closeSidebar
        );

    // Page Links

    links.forEach(link => {

        link.addEventListener(
            "click",
            function (e) {

                e.preventDefault();

                const page =
                    this.dataset.page;

                showPage(page);

                setActiveLink(this);

                closeSidebar();

            }
        );

    });

    // Default page

    if (document.getElementById("feed")) {

        showPage("feed");

    }

}
