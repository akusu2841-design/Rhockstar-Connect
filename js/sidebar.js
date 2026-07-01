// =======================================
// RHOCKSTAR CONNECT
// sidebar.js
// =======================================

export function initSidebar() {

    console.log("✅ Sidebar Ready");

    const sidebar = document.getElementById("sidebar");
    const overlay = document.getElementById("sidebarOverlay");

    const menuToggle = document.getElementById("menuToggle");
    const closeMenu = document.getElementById("closeMenu");

    if (!sidebar) return;

    function openSidebar() {

        sidebar.classList.add("show");

        overlay?.classList.add("show");

        document.body.style.overflow = "hidden";

    }

    function closeSidebar() {

        sidebar.classList.remove("show");

        overlay?.classList.remove("show");

        document.body.style.overflow = "";

    }

    menuToggle?.addEventListener("click", openSidebar);

    closeMenu?.addEventListener("click", closeSidebar);

    overlay?.addEventListener("click", closeSidebar);

    window.addEventListener("resize", () => {

        if (window.innerWidth > 992) {

            closeSidebar();

        }

    });

}
