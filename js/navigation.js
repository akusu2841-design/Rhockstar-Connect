// =======================================
// RHOCKSTAR CONNECT
// navigation.js
// =======================================

export function initNavigation() {

    console.log("✅ Navigation Ready");

    const navLinks = document.querySelectorAll(".nav-link");
    const pages = document.querySelectorAll(".page");

    if (!navLinks.length || !pages.length) return;

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

    navLinks.forEach(link => {

        link.addEventListener("click", event => {

            event.preventDefault();

            const pageId = link.dataset.page;

            showPage(pageId);

        });

    });

    showPage("feed");

}
