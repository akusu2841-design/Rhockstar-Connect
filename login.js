// ================= ELEMENTS =================
const loginForm = document.getElementById("loginForm");
const loginId = document.getElementById("loginId");
const passwordInput = document.getElementById("password");
const messageBox = document.getElementById("messageBox");

const showPassword = document.getElementById("showPassword");
const rememberMe = document.getElementById("rememberMe");
const loginBtn = document.getElementById("loginBtn");

// ================= STORAGE KEYS =================
const USERS_KEY = "rhockstarUsers";
const SESSION_KEY = "rhockstar_session";
const REMEMBER_KEY = "rhockstar_remember";

// ================= SHOW MESSAGE =================
function showMessage(type, text) {
  messageBox.className = "message-box " + type;
  messageBox.innerText = text;
  messageBox.style.display = "block";
}

// ================= RESET BUTTON =================
function resetBtn() {
  loginBtn.classList.remove("loading");
  loginBtn.innerText = "Login";
  loginBtn.disabled = false;
}

// ================= AUTO LOGIN CHECK =================
const savedSession =
  JSON.parse(localStorage.getItem(SESSION_KEY)) ||
  JSON.parse(sessionStorage.getItem(SESSION_KEY));

if (savedSession) {
  window.location.href = "index.html";
}

// ================= LOAD REMEMBERED USER =================
const remembered = localStorage.getItem(REMEMBER_KEY);
if (remembered) {
  loginId.value = remembered;
  rememberMe.checked = true;
}

// ================= SHOW / HIDE PASSWORD =================
showPassword.addEventListener("change", () => {
  passwordInput.type = showPassword.checked ? "text" : "password";
});

// ================= LOGIN =================
loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  loginBtn.classList.add("loading");
  loginBtn.innerText = "Logging in...";
  loginBtn.disabled = true;

  const idValue = loginId.value.trim().toLowerCase();
  const passValue = passwordInput.value.trim();

  if (!idValue || !passValue) {
    showMessage("error", "Please fill in all fields");
    return resetBtn();
  }

  const users = JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  // ================= FIND USER (EMAIL OR USERNAME) =================
  const user = users.find(
    u =>
      u.email.toLowerCase() === idValue ||
      (u.username && u.username.toLowerCase() === idValue)
  );

  if (!user) {
    showMessage("error", "User not found");
    return resetBtn();
  }

  if (user.password !== passValue) {
    showMessage("error", "Incorrect password");
    return resetBtn();
  }

  // ================= SESSION DATA =================
  const sessionData = {
    id: user.id,
    name: user.name,
    username: user.username || null,
    email: user.email,
    profileImage: user.profileImage,
    loginTime: new Date().toISOString()
  };

  // ================= SAVE SESSION =================
  if (rememberMe.checked) {
    localStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  } else {
    sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionData));
  }

  // ================= REMEMBER LOGIN ID =================
  if (rememberMe.checked) {
    localStorage.setItem(REMEMBER_KEY, idValue);
  } else {
    localStorage.removeItem(REMEMBER_KEY);
  }

  showMessage("success", "Login successful! Redirecting...");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1200);
});
