const loginForm = document.getElementById("loginForm");
const messageBox = document.getElementById("messageBox");

const loginId = document.getElementById("loginId");
const password = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");
const togglePassword = document.getElementById("togglePassword");

// Show / Hide Password
togglePassword.addEventListener("click", () => {
    if (password.type === "password") {
        password.type = "text";
        togglePassword.textContent = "🙈";
    } else {
        password.type = "password";
        togglePassword.textContent = "👁";
    }
});

// Login
loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(user =>
        (user.email === loginId.value.trim() ||
         user.username === loginId.value.trim()) &&
        user.password === password.value
    );

    if (!user) {
        messageBox.textContent = "Invalid email/username or password.";
        messageBox.style.color = "red";
        return;
    }

    // Save logged in user
    if (rememberMe.checked) {
        localStorage.setItem("currentUser", JSON.stringify(user));
    } else {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
    }

    messageBox.textContent = "Login successful!";
    messageBox.style.color = "green";

    setTimeout(() => {
        window.location.href = "index.html"; // Change if your app page has a different name
    }, 1000);
});
