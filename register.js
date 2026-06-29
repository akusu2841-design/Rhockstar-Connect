// ================= ELEMENTS =================
const form = document.getElementById("registerForm");
const messageBox = document.getElementById("messageBox");
const registerBtn = document.getElementById("registerBtn");

const fullName = document.getElementById("fullName");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

// ================= STORAGE KEY =================
const USERS_KEY = "rhockstarUsers";

// ================= SHOW MESSAGE =================
function showMessage(type, text) {
  messageBox.className = "message-box " + type;
  messageBox.innerText = text;
}

// ================= PASSWORD STRENGTH =================
function checkStrength(pass) {
  let strength = 0;

  if (pass.length >= 8) strength++;
  if (/[A-Z]/.test(pass)) strength++;
  if (/[a-z]/.test(pass)) strength++;
  if (/[0-9]/.test(pass)) strength++;
  if (/[@$!%*?&.#_-]/.test(pass)) strength++;

  const bar = document.getElementById("strengthBar");
  if (!bar) return;

  bar.style.width = (strength * 20) + "%";

  if (strength <= 2) bar.style.background = "#ef4444";
  else if (strength === 3 || strength === 4) bar.style.background = "#f59e0b";
  else bar.style.background = "#22c55e";
}

// live strength check
password.addEventListener("input", () => {
  checkStrength(password.value);
});

// ================= TOGGLE PASSWORD =================
document.getElementById("togglePassword").addEventListener("click", () => {
  password.type = password.type === "password" ? "text" : "password";
});

// ================= REGISTER =================
form.addEventListener("submit", function (e) {
  e.preventDefault();

  registerBtn.classList.add("loading");
  registerBtn.innerText = "Creating Account...";

  const nameValue = fullName.value.trim();
  const usernameValue = username.value.trim().toLowerCase();
  const emailValue = email.value.trim().toLowerCase();
  const passwordValue = password.value;
  const confirmValue = confirmPassword.value;

  // reset message
  messageBox.style.display = "block";

  // ================= VALIDATION =================

  if (nameValue.length < 3) {
    showMessage("error", "Name must be at least 3 characters");
    return resetBtn();
  }

  if (usernameValue.length < 3) {
    showMessage("error", "Username must be at least 3 characters");
    return resetBtn();
  }

  if (!emailValue.includes("@")) {
    showMessage("error", "Enter a valid email address");
    return resetBtn();
  }

  if (passwordValue !== confirmValue) {
    showMessage("error", "Passwords do not match");
    return resetBtn();
  }

  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-]).{8,}$/;

  if (!passwordPattern.test(passwordValue)) {
    showMessage(
      "error",
      "Password is too weak. Use uppercase, lowercase, number & symbol."
    );
    return resetBtn();
  }

  // ================= LOAD USERS =================
  let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  // ================= DUPLICATE CHECK =================
  const emailExists = users.find(u => u.email === emailValue);
  const usernameExists = users.find(u => u.username === usernameValue);

  if (emailExists) {
    showMessage("error", "Email already exists");
    return resetBtn();
  }

  if (usernameExists) {
    showMessage("error", "Username already taken");
    return resetBtn();
  }

  // ================= CREATE USER =================
  const newUser = {
    id: Date.now(),
    name: nameValue,
    username: usernameValue,
    email: emailValue,
    password: passwordValue,

    title: "Member",
    bio: "Welcome to Rhockstar Connect.",

    profileImage:
      "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(nameValue) +
      "&background=0D8ABC&color=fff",

    joinedAt: new Date().toISOString()
  };

  users.push(newUser);
  localStorage.setItem(USERS_KEY, JSON.stringify(users));

  // ================= SUCCESS =================
  showMessage("success", "Account created successfully!");

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1200);

});

// ================= RESET BUTTON =================
function resetBtn() {
  registerBtn.classList.remove("loading");
  registerBtn.innerText = "Create Account";
}
