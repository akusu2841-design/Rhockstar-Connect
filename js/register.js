const registerForm = document.getElementById("registerForm");
const messageBox = document.getElementById("messageBox");

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const togglePassword = document.getElementById("togglePassword");
const strengthBar = document.getElementById("strengthBar");

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

// Password Strength
password.addEventListener("input", () => {
    let strength = 0;

    if (password.value.length >= 8) strength++;
    if (/[A-Z]/.test(password.value)) strength++;
    if (/[a-z]/.test(password.value)) strength++;
    if (/\d/.test(password.value)) strength++;
    if (/[^A-Za-z0-9]/.test(password.value)) strength++;

    strengthBar.style.width = (strength * 20) + "%";
});

// Register
registerForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = document.getElementById("fullName").value.trim();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();

    if (password.value !== confirmPassword.value) {
        messageBox.textContent = "Passwords do not match.";
        messageBox.style.color = "red";
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some(user =>
        user.email === email || user.username === username
    );

    if (exists) {
        messageBox.textContent = "Username or email already exists.";
        messageBox.style.color = "red";
        return;
    }

    users.push({
        fullName,
        username,
        email,
        password: password.value
    });

    localStorage.setItem("users", JSON.stringify(users));

    messageBox.textContent = "Registration successful!";
    messageBox.style.color = "green";

    setTimeout(() => {
        window.location.href = "login.html";
    }, 1000);
});
