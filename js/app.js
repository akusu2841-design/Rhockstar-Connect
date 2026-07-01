
// =====================================
// Rhockstar Connect - MASTER CONTROLLER
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("🚀 App Started");

    // ===============================
    // LANDING PAGE SMOOTH SCROLL
    // ===============================
    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", (e) => {

            const target = document.querySelector(link.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    // ===============================
    // INIT ALL MODULES (GLOBAL FUNCTIONS)
    // ===============================

    if (typeof initSidebar === "function") initSidebar();
    if (typeof initNavigation === "function") initNavigation();
    if (typeof initProfile === "function") initProfile();
    if (typeof initFeed === "function") initFeed();

});
