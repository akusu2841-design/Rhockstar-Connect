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










/* ================= USERS ================= */
let currentUser = null;

/* ================= SIGNUP ================= */
function signup(){
  const name = document.getElementById("signup-name").value;
  const email = document.getElementById("signup-email").value;
  const pass = document.getElementById("signup-pass").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  users.push({
    name,
    email,
    pass,
    posts:[]
  });

  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created!");
}

/* ================= LOGIN ================= */
function login(){
  const email = document.getElementById("login-email").value;
  const pass = document.getElementById("login-pass").value;

  let users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.email === email && u.pass === pass);

  if(!user){
    alert("Invalid login");
    return;
  }

  currentUser = user;

  localStorage.setItem("activeUser", JSON.stringify(user));

  document.getElementById("auth").style.display = "none";
  document.getElementById("app").style.display = "block";

  loadProfile();
  renderPosts();
  showPage("dashboard");
}

/* ================= LOGOUT ================= */
function logout(){
  localStorage.removeItem("activeUser");
  location.reload();
}

/* ================= PROFILE ================= */
function loadProfile(){
  const user = JSON.parse(localStorage.getItem("activeUser"));

  if(!user) return;

  document.getElementById("p-name").innerText = user.name;
  document.getElementById("p-email").innerText = user.email;
}

/* ================= POSTS ================= */
function addPost(){
  const text = document.getElementById("post-text").value;

  let users = JSON.parse(localStorage.getItem("users"));
  let active = JSON.parse(localStorage.getItem("activeUser"));

  users = users.map(u=>{
    if(u.email === active.email){
      u.posts.push(text);
      active = u;
    }
    return u;
  });

  localStorage.setItem("users", JSON.stringify(users));
  localStorage.setItem("activeUser", JSON.stringify(active));

  renderPosts();
}

/* render posts */
function renderPosts(){
  const user = JSON.parse(localStorage.getItem("activeUser"));
  const box = document.getElementById("post-list");

  box.innerHTML = "";

  user.posts.forEach(p=>{
    box.innerHTML += `<div class="post">${p}</div>`;
  });
}

/* ================= PAGE SWITCH ================= */
function showPage(pageId){

  document.querySelectorAll(".page").forEach(p=>{
    p.classList.remove("active");
  });

  document.getElementById(pageId).classList.add("active");
}

/* sidebar click */
document.querySelectorAll(".sidebar a").forEach(link=>{
  link.addEventListener("click", function(e){
    e.preventDefault();

    const page = this.getAttribute("data-page");

    if(page){
      showPage(page);
    }
  });
});

/* ================= AUTO LOGIN ================= */
window.onload = function(){
  const user = localStorage.getItem("activeUser");

  if(user){
    document.getElementById("auth").style.display = "none";
    document.getElementById("app").style.display = "block";

    loadProfile();
    renderPosts();
    showPage("dashboard");
  }
};
