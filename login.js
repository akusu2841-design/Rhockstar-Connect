const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const showPassword = document.getElementById("showPassword");
const rememberMe = document.getElementById("rememberMe");
const loginBtn = document.getElementById("loginBtn");

/* ================= SHOW / HIDE PASSWORD ================= */
showPassword.addEventListener("change", () => {
  passwordInput.type = showPassword.checked ? "text" : "password";
});

/* ================= LOGIN HANDLER ================= */
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // basic validation
  if (!email || !password) {
    message.style.color = "red";
    message.textContent = "Please fill in all fields.";
    return;
  }

  // fake loading effect
  loginBtn.textContent = "Logging in...";
  loginBtn.disabled = true;

  setTimeout(() => {
    // fake success condition....
    if (password.length >= 8) {

      message.style.color = "lightgreen";
      message.textContent = "Login successful! Redirecting...";

      // save remember me 
      if (rememberMe.checked) {
        localStorage.setItem("rhockstarUser", email);
      }

      // redirect to homepage
      setTimeout(() => {
        window.location.href = "index.html";
      }, 1500);

    } else {
      message.style.color = "red";
      message.textContent = "Incorrect password.";
    }

    loginBtn.textContent = "Login";
    loginBtn.disabled = false;

  }, 1000);
});
