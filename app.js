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
