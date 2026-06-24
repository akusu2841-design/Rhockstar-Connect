// ================= ELEMENTS =================
const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const showPassword = document.getElementById("showPassword");
const rememberMe = document.getElementById("rememberMe");
const loginBtn = document.getElementById("loginBtn");

// ================= STORAGE KEYS =================
const USERS_KEY = "rhockstarUsers";
const SESSION_KEY = "rhockstar_session";

// ================= LOAD REMEMBERED EMAIL =================
const savedEmail = localStorage.getItem("rememberedEmail");

if (savedEmail) {
  emailInput.value = savedEmail;
  rememberMe.checked = true;
}

// ================= SHOW / HIDE PASSWORD =================
showPassword.addEventListener("change", () => {
  passwordInput.type = showPassword.checked ? "text" : "password";
});

// ================= CHECK EXISTING SESSION =================
const currentUser = JSON.parse(
  localStorage.getItem(SESSION_KEY)
);

if (currentUser) {
  window.location.href = "index.html";
}

// ================= LOGIN =================
loginForm.addEventListener("submit", (e) => {

  e.preventDefault();

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    message.style.color = "red";
    message.textContent = "Please fill in all fields.";
    return;
  }

  loginBtn.disabled = true;
  loginBtn.textContent = "Logging in...";

  setTimeout(() => {

    const users =
      JSON.parse(localStorage.getItem(USERS_KEY)) || [];

    const user = users.find(
      u =>
        u.email.toLowerCase() === email &&
        u.password === password
    );

    if (!user) {

      message.style.color = "red";
      message.textContent =
        "Invalid email or password.";

      loginBtn.disabled = false;
      loginBtn.textContent = "Login";

      return;
    }

    // ================= SAVE SESSION =================
    localStorage.setItem(
      SESSION_KEY,
      JSON.stringify(user)
    );

    // ================= REMEMBER EMAIL =================
    if (rememberMe.checked) {
      localStorage.setItem(
        "rememberedEmail",
        email
      );
    } else {
      localStorage.removeItem(
        "rememberedEmail"
      );
    }

    message.style.color = "lightgreen";
    message.textContent =
      "Login successful! Redirecting...";

    setTimeout(() => {
      window.location.href = "index.html";
    }, 1000);

  }, 1000);

});
