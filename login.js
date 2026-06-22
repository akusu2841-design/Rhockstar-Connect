const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const showPassword = document.getElementById("showPassword");
const rememberMe = document.getElementById("rememberMe");
const loginBtn = document.getElementById("loginBtn");

/* ================= LOAD REMEMBERED EMAIL ================= */
const savedEmail = localStorage.getItem("rhockstarUser");

if (savedEmail) {
  emailInput.value = savedEmail;
  rememberMe.checked = true;
}

/* ================= SHOW / HIDE PASSWORD ================= */
showPassword.addEventListener("change", () => {
  passwordInput.type = showPassword.checked ? "text" : "password";
});

/* ================= LOGIN HANDLER ================= */
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  // Basic validation
  if (!email || !password) {
    message.style.color = "red";
    message.textContent = "Please fill in all fields.";
    return;
  }

  // Loading state
  loginBtn.textContent = "Logging in...";
  loginBtn.disabled = true;

  setTimeout(() => {
    // Example login check
    if (password.length >= 8) {

      message.style.color = "lightgreen";
      message.textContent = "Login successful! Redirecting...";

      // Save current logged-in user
      const currentUser = {
        email: email,
        loginTime: new Date().toISOString()
      };

      localStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );

      // Remember email if checkbox checked
      if (rememberMe.checked) {
        localStorage.setItem("rhockstarUser", email);
      } else {
        localStorage.removeItem("rhockstarUser");
      }

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);

    } else {
      message.style.color = "red";
      message.textContent = "Incorrect password. Must be at least 8 characters.";

      loginBtn.textContent = "Login";
      loginBtn.disabled = false;
    }
  }, 1000);
});
