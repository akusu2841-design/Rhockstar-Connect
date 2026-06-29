// ================= ELEMENTS (SAFE INIT) =================
const form = document.getElementById("registerForm");
const messageBox = document.getElementById("messageBox");
const registerBtn = document.getElementById("registerBtn");

const fullName = document.getElementById("fullName");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const strengthBar = document.getElementById("strengthBar");
const togglePassword = document.getElementById("togglePassword");

// ================= SAFETY CHECK =================
if (!form || !messageBox || !registerBtn) {
  console.error("Missing required HTML elements. Check IDs in your HTML.");
}

// ================= STORAGE KEY =================
const USERS_KEY = "rhockstarUsers";

// ================= SHOW MESSAGE =================
function showMessage(type, text) {
  if (!messageBox) return;

  messageBox.className = "message-box " + type;
  messageBox.innerText = text;
}

// ================= RESET BUTTON =================
function resetBtn() {
  registerBtn.classList.remove("loading");
  registerBtn.innerText = "Create Account";
}

// ================= PASSWORD STRENGTH =================
function checkStrength(pass) {
  if (!strengthBar) return;

  let strength = 0;

  if (pass.length >= 8) strength++;
  if (/[A-Z]/.test(pass)) strength++;
  if (/[a-z]/.test(pass)) strength++;
  if (/[0-9]/.test(pass)) strength++;
  if (/[@$!%*?&.#_-]/.test(pass)) strength++;

  strengthBar.style.width = strength * 20 + "%";

  if (strength <= 2) strengthBar.style.background = "#ef4444";
  else if (strength === 3 || strength === 4) strengthBar.style.background = "#f59e0b";
  else strengthBar.style.background = "#22c55e";
}

// ================= EVENTS (ONLY IF ELEMENT EXISTS) =================
if (password) {
  password.addEventListener("input", () => {
    checkStrength(password.value);
  });
}

if (togglePassword && password) {
  togglePassword.addEventListener("click", () => {
    password.type = password.type === "password" ? "text" : "password";
  });
}

// ================= REGISTER =================
if (form) {
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    registerBtn.classList.add("loading");
    registerBtn.innerText = "Creating Account...";

    const nameValue = fullName?.value.trim() || "";
    const usernameValue = username?.value.trim().toLowerCase() || "";
    const emailValue = email?.value.trim().toLowerCase() || "";
    const passwordValue = password?.value || "";
    const confirmValue = confirmPassword?.value || "";

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
        "Password must include uppercase, lowercase, number & symbol"
      );
      return resetBtn();
    }

    // ================= USERS =================
    let users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

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

    showMessage("success", "Account created successfully!");

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1200);
  });
}
