document.addEventListener("DOMContentLoaded", () => {

  const home = document.getElementById("home");
  const dashboard = document.getElementById("dashboard");
  const logoutBtn = document.getElementById("logout");

  const SESSION_KEY = "rhockstar_session";

  // ======================
  // CHECK LOGIN
  // ======================
  const session = JSON.parse(
    localStorage.getItem(SESSION_KEY)
  );

  if (session) {
    home.style.display = "none";
    dashboard.style.display = "flex";
  } else {
    home.style.display = "block";
    dashboard.style.display = "none";
  }

  // ======================
  // DASHBOARD PAGE SWITCHING
  // ======================
  const pages = document.querySelectorAll(".page");
  const links = document.querySelectorAll("[data-page]");

  function showPage(pageId) {

    pages.forEach(page => {
      page.style.display = "none";
    });

    const target = document.getElementById(pageId);

    if (target) {
      target.style.display = "block";
    }
  }

  links.forEach(link => {

    link.addEventListener("click", function(e) {

      e.preventDefault();

      const page = this.dataset.page;

      showPage(page);

    });

  });

  // Default page
  showPage("feed");

  // ======================
  // LOGOUT
  // ======================
  if (logoutBtn) {

  logoutBtn.addEventListener("click", () => {

    const confirmLogout = confirm(
      "Are you sure you want to log out?"
    );

    if (!confirmLogout) {
      return; // Cancel logout
    }

    localStorage.removeItem(SESSION_KEY);

    home.style.display = "block";
    dashboard.style.display = "none";

    location.reload();

  });

}

    });

  }

});
