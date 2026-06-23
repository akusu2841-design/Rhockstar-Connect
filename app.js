// ELEMENTS
const home = document.getElementById("home");
const dashboard = document.getElementById("dashboard");
const logoutBtn = document.getElementById("logout");

// CHECK LOGIN STATE
window.addEventListener("DOMContentLoaded", () => {

    const loggedIn = localStorage.getItem("loggedIn");

    if(loggedIn === "true"){
        home.classList.add("hidden");

        dashboard.classList.remove("hidden");
        dashboard.style.display = "flex";

        showPage("feed");
    }
});

// PAGE SWITCHING
const navLinks = document.querySelectorAll("[data-page]");

navLinks.forEach(link => {

    link.addEventListener("click", (e) => {

        e.preventDefault();

        const pageId = link.dataset.page;

        showPage(pageId);
    });
});

function showPage(pageId){

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active");
    });

    const selectedPage = document.getElementById(pageId);

    if(selectedPage){
        selectedPage.classList.add("active");
    }
}

// LOGOUT
logoutBtn.addEventListener("click", () => {

    localStorage.removeItem("loggedIn");

    dashboard.classList.add("hidden");

    home.classList.remove("hidden");

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
});
