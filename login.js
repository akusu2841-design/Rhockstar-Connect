const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const showPassword = document.getElementById("showPassword");
const rememberMe = document.getElementById("rememberMe");
const loginBtn = document.getElementById("loginBtn");

/* ================= LOAD REMEMBERED EMAIL ================= */
const savedEmail = localStorage.getItem("rememberedEmail");

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

  const email = emailInput.value.trim().toLowerCase();
  const password = passwordInput.value.trim();

  if (!email || !password) {
    message.style.color = "red";
    message.textContent = "Please fill in all fields.";
    return;
  }

  loginBtn.textContent = "Logging in...";
  loginBtn.disabled = true;

  setTimeout(() => {
    // Demo password validation
    if (password.length >= 8) {

      let users =
        JSON.parse(localStorage.getItem("rhockstarUsers")) || [];

      // Check if user exists
      let user = users.find(
        (u) => u.email.toLowerCase() === email
      );

      // Create user if not found
      if (!user) {
        user = {
          id: Date.now(),
          name: email.split("@")[0],
          email: email,
          password: password, // demo only
          title: "Member",
          bio: "Welcome to Rhockstar.",
          profileImage:
            "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(email.split("@")[0]) +
            "&background=0D8ABC&color=fff",
          joinedAt: new Date().toISOString()
        };

        users.push(user);
        localStorage.setItem(
          "rhockstarUsers",
          JSON.stringify(users)
        );
      }

      // Save current logged-in user
      localStorage.setItem(
        "rhockstarUser",
        JSON.stringify(user)
      );

      // Remember email
      if (rememberMe.checked) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      message.style.color = "lightgreen";
      message.textContent =
        "Login successful! Redirecting...";

      setTimeout(() => {
        window.location.href = "dashboard.html";
      }, 1500);

    } else {
      message.style.color = "red";
      message.textContent =
        "Password must be at least 8 characters.";

      loginBtn.textContent = "Login";
      loginBtn.disabled = false;
    }
  }, 1000);
});
