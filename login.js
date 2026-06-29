const loginForm = document.getElementById("loginForm");
const messageBox = document.getElementById("messageBox");
const togglePassword = document.getElementById("togglePassword");
const password = document.getElementById("password");

if (togglePassword) {
  togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
      password.type = "text";
      togglePassword.textContent = "🙈";
    } else {
      password.type = "password";
      togglePassword.textContent = "👁";
    }
  });
}

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const loginId = document.getElementById("loginId").value.trim();
  const passwordValue = password.value.trim();
  const rememberMe = document.getElementById("rememberMe").checked;

  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(
    u =>
      (u.email === loginId || u.username === loginId) &&
      u.password === passwordValue
  );

  if (!user) {
    messageBox.textContent = "Invalid username/email or password.";
    messageBox.style.color = "red";
    return;
  }

  if (rememberMe) {
    localStorage.setItem("currentUser", JSON.stringify(user));
  } else {
    sessionStorage.setItem("currentUser", JSON.stringify(user));
  }

  messageBox.textContent = "Login successful!";
  messageBox.style.color = "green";

  setTimeout(() => {
    window.location.href = "dashboard.html"; // Change if your dashboard has another name
  }, 1000);
});
