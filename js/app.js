// =====================================
// Rhockstar Connect
// app.js
// Landing Page
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    console.log("Rhockstar Connect Landing Page Loaded");

    // Smooth scroll for internal links
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

});
