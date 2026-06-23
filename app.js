document.addEventListener("DOMContentLoaded", function () {

  // ==============================
  // LOCAL STORAGE KEYS
  // ==============================
  const USERS_KEY = "rhockstar_users";
  const SESSION_KEY = "rhockstar_session";

  // ==============================
  // GET ELEMENTS
  // ==============================
  const welcomeMessage = document.getElementById("welcome-message");

  // ==============================
  // LOAD USERS
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
  // SIGN UP FUNCTION
  // ==============================
  const registerBtn = document.getElementById("register-btn");

  if (registerBtn) {
    registerBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const name = document.getElementById("reg-name").value.trim();
      const email = document.getElementById("reg-email").value.trim();
      const password = document.getElementById("reg-password").value.trim();

      if (!name || !email || !password) {
        alert("All fields are required");
        return;
      }

      let users = getUsers();

      const userExists = users.find(u => u.email === email);

      if (userExists) {
        alert("User already exists");
        return;
      }

      const newUser = { name, email, password };
      users.push(newUser);

      saveUsers(users);

      alert("Account created successfully!");
      window.location.href = "login.html";
    });
  }

  // ==============================
  // LOGIN FUNCTION
  // ==============================
  const loginBtn = document.getElementById("login-btn");

  if (loginBtn) {
    loginBtn.addEventListener("click", function (e) {
      e.preventDefault();

      const email = document.getElementById("login-email").value.trim();
      const password = document.getElementById("login-password").value.trim();

      const users = getUsers();

      const user = users.find(u => u.email === email && u.password === password);

      if (!user) {
        alert("Invalid email or password");
        return;
      }

      setSession(user);

      alert("Login successful!");
      window.location.href = "index.html";
    });
  }

  // ==============================
  // LOAD USER SESSION (WELCOME MESSAGE)
  // ==============================
  const sessionUser = getSession();

  if (sessionUser && welcomeMessage) {
    welcomeMessage.textContent = `Hello, ${sessionUser.name} 👋`;
  }

  // ==============================
  // LOGOUT
  // ==============================
  const logoutBtn = document.getElementById("logout-link");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", function (e) {
      e.preventDefault();

      clearSession();

      alert("Logged out successfully!");
      window.location.href = "login.html";
    });
  }

  // ==============================
  // SHOW / HIDE PASSWORD
  // ==============================
  const togglePassword = document.getElementById("toggle-password");

  if (togglePassword) {
    togglePassword.addEventListener("click", function () {
      const passInput = document.getElementById("login-password");

      if (passInput.type === "password") {
        passInput.type = "text";
        this.textContent = "Hide";
      } else {
        passInput.type = "password";
        this.textContent = "Show";
      }
    });
  }

  // ==============================
  // AUTO REDIRECT IF NOT LOGGED IN
  // ==============================
  const protectedPages = ["index.html"];

  if (protectedPages.includes(window.location.pathname.split("/").pop())) {
    if (!sessionUser) {
      window.location.href = "login.html";
    }
  }

});




// ================= ELEMENTS =================
const editBtn = document.getElementById("editBtn");
const form = document.getElementById("profile-edit-form");
const cancelBtn = document.getElementById("cancelBtn");

const nameEl = document.getElementById("display-name");
const usernameEl = document.getElementById("display-username");
const bioEl = document.getElementById("display-bio");
const skillsEl = document.getElementById("display-skills");
const locationEl = document.getElementById("display-location");

const profilePic = document.getElementById("profile-pic");

// INPUTS
const nameInput = document.getElementById("edit-name");
const emailInput = document.getElementById("edit-email");
const bioInput = document.getElementById("edit-bio");
const skillsInput = document.getElementById("edit-skills");
const locationInput = document.getElementById("edit-location");

// ================= STORAGE KEY =================
const STORAGE_KEY = "userProfile";

// ================= LOAD PROFILE =================
function loadProfile() {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY));

  if (!data) return;

  nameEl.textContent = data.name || "Your Name?";
  usernameEl.textContent = "@" + (data.username || "username");
  bioEl.textContent = data.bio || "Say something about yourself.";
  skillsEl.textContent = data.skills || "List your skills.";
  locationEl.textContent = data.location || "Where is your current location?";

  if (data.profilePic) {
    profilePic.src = data.profilePic;
  }
}

// ================= SAVE PROFILE =================
function saveProfile(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// ================= OPEN FORM =================
editBtn.addEventListener("click", () => {
  const data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  nameInput.value = data.name || "";
  emailInput.value = data.email || "";
  bioInput.value = data.bio || "";
  skillsInput.value = data.skills || "";
  locationInput.value = data.location || "";

  form.style.display = "flex";
});

// ================= CANCEL =================
cancelBtn.addEventListener("click", () => {
  form.style.display = "none";
});

// ================= SAVE FORM =================
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const oldData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};

  const newData = {
    name: nameInput.value.trim() || oldData.name || "",
    email: emailInput.value.trim() || oldData.email || "",
    bio: bioInput.value.trim() || oldData.bio || "",
    skills: skillsInput.value.trim() || oldData.skills || "",
    location: locationInput.value.trim() || oldData.location || "",
    username: oldData.username || "username",
    profilePic: oldData.profilePic || profilePic.src
  };

  saveProfile(newData);
  loadProfile();

  form.style.display = "none";

  alert("Profile updated successfully!");
});

// ================= INIT =================
window.addEventListener("DOMContentLoaded", loadProfile);
