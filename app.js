
document.addEventListener("DOMContentLoaded", function () {

  // ==============================
  // STORAGE KEYS
  // ==============================
  const USERS_KEY = "rhockstar_users";
  const SESSION_KEY = "rhockstar_session";
  const PROFILE_KEY = "userProfile";

  // ==============================
  // GET ELEMENTS (SAFE)
  // ==============================
  const welcomeMessage = document.getElementById("welcome-message");

  const editBtn = document.getElementById("editBtn");
  const form = document.getElementById("profile-edit-form");
  const cancelBtn = document.getElementById("cancelBtn");

  const nameEl = document.getElementById("display-name");
  const usernameEl = document.getElementById("display-username");
  const bioEl = document.getElementById("display-bio");
  const skillsEl = document.getElementById("display-skills");
  const locationEl = document.getElementById("display-location");

  const profilePic = document.getElementById("profile-pic");

  const nameInput = document.getElementById("edit-name");
  const emailInput = document.getElementById("edit-email");
  const bioInput = document.getElementById("edit-bio");
  const skillsInput = document.getElementById("edit-skills");
  const locationInput = document.getElementById("edit-location");

  const logoutBtn = document.getElementById("logout-link");

  // ==============================
  // USERS FUNCTIONS
  // ==============================
  function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  }

  function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  }

  function setSession(user) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }

  function getSession() {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  }

  function clearSession() {
    localStorage.removeItem(SESSION_KEY);
  }

  // ==============================
  // SIGNUP
  // ==============================
  const registerBtn = document.getElementById("register-btn");

  if (registerBtn) {
    registerBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const name = document.getElementById("reg-name").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const password = document.getElementById("reg-password").value.trim();

      if (!name || !email || !password) return alert("All fields required");

      let users = getUsers();

      if (users.find(u => u.email === email)) {
        return alert("User already exists");
      }

      users.push({ name, email, password });
      saveUsers(users);

      alert("Account created!");
      window.location.href = "login.html";
    });
  }

  // ==============================
  // LOGIN
  // ==============================
  const loginBtn = document.getElementById("login-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();

      const user = getUsers().find(u => u.email === email && u.password === password);

      if (!user) return alert("Invalid login");

      setSession(user);

      window.location.href = "index.html";
    });
  }

  // ==============================
  // SESSION WELCOME
  // ==============================
  const sessionUser = getSession();

  if (sessionUser && welcomeMessage) {
    welcomeMessage.textContent = `Hello, ${sessionUser.name} 👋`;
  }

  // ==============================
  // LOGOUT
  // ==============================
  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();
      clearSession();
      window.location.href = "login.html";
    });
  }

  // ==============================
  // PASSWORD TOGGLE
  // ==============================
  const togglePassword = document.getElementById("toggle-password");

  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      const passInput = document.getElementById("login-password");

      passInput.type = passInput.type === "password" ? "text" : "password";
      this.textContent = passInput.type === "password" ? "Show" : "Hide";
    });
  }

  // ==============================
  // PROFILE LOAD
  // ==============================
  function loadProfile() {
    const data = JSON.parse(localStorage.getItem(PROFILE_KEY));

    if (!data) return;

    if (nameEl) nameEl.textContent = data.name || "Your Name?";
    if (usernameEl) usernameEl.textContent = "@" + (data.username || "username");
    if (bioEl) bioEl.textContent = data.bio || "";
    if (skillsEl) skillsEl.textContent = data.skills || "";
    if (locationEl) locationEl.textContent = data.location || "";

    if (profilePic && data.profilePic) {
      profilePic.src = data.profilePic;
    }
  }

  // ==============================
  // PROFILE FORM OPEN
  // ==============================
  if (editBtn) {
    editBtn.addEventListener("click", () => {

      const data = JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};

      nameInput.value = data.name || "";
      emailInput.value = data.email || "";
      bioInput.value = data.bio || "";
      skillsInput.value = data.skills || "";
      locationInput.value = data.location || "";

      form.style.display = "flex";
    });
  }

  // ==============================
  // CANCEL FORM
  // ==============================
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      form.style.display = "none";
    });
  }

  // ==============================
  // SAVE PROFILE
  // ==============================
  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      const old = JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};

      const updated = {
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        bio: bioInput.value.trim(),
        skills: skillsInput.value.trim(),
        location: locationInput.value.trim(),
        username: old.username || "username",
        profilePic: old.profilePic || (profilePic ? profilePic.src : "")
      };

      localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));

      loadProfile();

      form.style.display = "none";

      alert("Profile updated!");
    });
  }

  // ==============================
  // PAGE SWITCH SYSTEM (IMPORTANT)
  // ==============================
  const pages = document.querySelectorAll(".page");
  const links = document.querySelectorAll("[data-page]");

  function showPage(id) {

    pages.forEach(p => p.classList.remove("active"));

    const target = document.getElementById(id);

    if (target) target.classList.add("active");
  }

  links.forEach(link => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const page = this.getAttribute("data-page");

      if (page) showPage(page);
    });
  });

  // ==============================
  // AUTO INIT
  // ==============================
  loadProfile();

  if (sessionUser && document.getElementById("app")) {
    showPage("dashboard");
  }

});
