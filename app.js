document.addEventListener("DOMContentLoaded", () => {

  // ================= ELEMENTS =================
  const links = document.querySelectorAll(".sidebar a[data-page]");
  const pages = document.querySelectorAll(".page");
  const welcomeText = document.getElementById("welcome");
  const logoutBtn = document.getElementById("logout");
  const searchInput = document.querySelector(".topbar input");

  // ================= PAGE SWITCHER =================
  function showPage(pageId) {

    // hide all pages
    pages.forEach(page => {
      page.classList.remove("active");
    });

    // show selected page
    const target = document.getElementById(pageId);
    if (target) {
      target.classList.add("active");
    }

    // update active link
    links.forEach(link => {
      link.classList.remove("active");

      if (link.dataset.page === pageId) {
        link.classList.add("active");
      }
    });

    // update welcome text dynamically
    if (welcomeText) {
      welcomeText.textContent = `Welcome to ${pageId.charAt(0).toUpperCase() + pageId.slice(1)} 👋`;
    }
  }

  // ================= CLICK NAVIGATION =================
  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const page = link.dataset.page;
      showPage(page);
    });
  });

  // ================= DEFAULT PAGE =================
  showPage("home");

  // ================= SEARCH HANDLER =================
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      const value = e.target.value.toLowerCase();

      console.log("Searching:", value);

      // later we will connect this to feed/users/posts
    });
  }

  // ================= LOGOUT =================
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault();

      const confirmLogout = confirm("Are you sure you want to logout?");

      if (confirmLogout) {
        alert("Logged out successfully!");

        // later: redirect to login page
        // window.location.href = "login.html";
      }
    });
  }

});
