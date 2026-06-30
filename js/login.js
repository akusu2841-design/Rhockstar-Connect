// ===============================
// RHOCKSTAR CONNECT
// login.js
// ===============================

"use strict";

// ===============================
// ELEMENTS
// ===============================

const loginForm = document.getElementById("loginForm");

const messageBox = document.getElementById("messageBox");

const loginId = document.getElementById("loginId");

const password = document.getElementById("password");

const rememberMe = document.getElementById("rememberMe");

const togglePassword = document.getElementById("togglePassword");

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
// LOGIN
// ===============================

loginForm?.addEventListener("submit", e => {

    e.preventDefault();

    if (

        !loginId.value.trim() ||

        !password.value.trim()

    ) {

        messageBox.textContent =

            "Please enter your login details.";

        messageBox.style.color = "red";

        return;

    }

    const success = Auth.login(

        loginId.value.trim(),

        password.value

    );

    if (!success) {

        messageBox.textContent =

            "Invalid email/username or password.";

        messageBox.style.color = "red";

        return;

    }

    // Remember Me
    if (rememberMe?.checked) {

        localStorage.setItem(

            "rememberLogin",

            "true"

        );

    } else {

        localStorage.removeItem(

            "rememberLogin"

        );

    }

    messageBox.textContent =

        "Login successful.";

    messageBox.style.color = "lime";

    setTimeout(() => {

        window.location.href = "index.html";

    }, 800);

});

// ===============================
// AUTO LOGIN
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        if (

            Auth.isLoggedIn()

        ) {

            if (

                window.location.pathname.includes(

                    "login"

                )

            ) {

                window.location.href =

                    "index.html";

            }

        }

    }

);
