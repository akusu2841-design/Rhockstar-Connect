// ===============================
// RHOCKSTAR CONNECT
// register.js
// ===============================

"use strict";

// ===============================
// ELEMENTS
// ===============================

const registerForm = document.getElementById("registerForm");

const messageBox = document.getElementById("messageBox");

const fullName = document.getElementById("fullName");

const username = document.getElementById("username");

const email = document.getElementById("email");

const password = document.getElementById("password");

const confirmPassword = document.getElementById("confirmPassword");

const togglePassword = document.getElementById("togglePassword");

const strengthBar = document.getElementById("strengthBar");

// ===============================
// SHOW / HIDE PASSWORD
// ===============================

togglePassword?.addEventListener("click", () => {

    if (password.type === "password") {

        password.type = "text";

        togglePassword.textContent = "🙈";

    } else {

        password.type = "password";

        togglePassword.textContent = "👁";

    }

});

// ===============================
// PASSWORD STRENGTH
// ===============================

password?.addEventListener("input", () => {

    let strength = 0;

    const value = password.value;

    if (value.length >= 8) strength++;

    if (/[A-Z]/.test(value)) strength++;

    if (/[a-z]/.test(value)) strength++;

    if (/\d/.test(value)) strength++;

    if (/[^A-Za-z0-9]/.test(value)) strength++;

    strengthBar.style.width = `${strength * 20}%`;

});

// ===============================
// REGISTER
// ===============================

registerForm?.addEventListener("submit", e => {

    e.preventDefault();

    if (

        !fullName.value.trim() ||

        !username.value.trim() ||

        !email.value.trim() ||

        !password.value.trim()

    ) {

        messageBox.textContent =

            "Please fill in all fields.";

        messageBox.style.color = "red";

        return;

    }

    if (

        password.value !==

        confirmPassword.value

    ) {

        messageBox.textContent =

            "Passwords do not match.";

        messageBox.style.color = "red";

        return;

    }

    const success = Auth.register({

        fullName:

            fullName.value.trim(),

        username:

            username.value.trim(),

        email:

            email.value.trim(),

        password:

            password.value

    });

    if (!success) {

        messageBox.textContent =

            "Email or username already exists.";

        messageBox.style.color = "red";

        return;

    }

    messageBox.textContent =

        "Registration successful!";

    messageBox.style.color = "lime";

    registerForm.reset();

    strengthBar.style.width = "0%";

    setTimeout(() => {

        window.location.href =

            "login.html";

    }, 1000);

});
