// ======================================
// RHOCKSTAR CONNECT
// login.js
// ======================================

import { loginUser, resetPassword } from "./auth.js";
import { getEmailByUsername } from "./firestore.js";


// ===============================
// ELEMENTS
// ===============================

const form = document.getElementById("loginForm");
const loginId = document.getElementById("loginId");
const password = document.getElementById("password");
const rememberMe = document.getElementById("rememberMe");
const loginBtn = document.getElementById("loginBtn");
const forgotPassword = document.getElementById("forgotPassword");


// ===============================
// PASSWORD TOGGLE (from utils.js global)
// ===============================

setupPasswordToggle("togglePassword", "password");


// ===============================
// LOGIN
// ===============================

form?.addEventListener("submit", async (e) => {

    e.preventDefault();

    const id = loginId.value.trim();
    const pass = password.value;

    if (!id || !pass) {
        showMessage("Please fill in all fields.", "error");
        return;
    }

    setButtonLoading(loginBtn, true);

    try {

        let email = id;

        // Check if username or email
        if (!id.includes("@")) {

            const foundEmail = await getEmailByUsername(id);

            if (!foundEmail) {
                showMessage("Username not found.", "error");
                setButtonLoading(loginBtn, false);
                return;
            }

            email = foundEmail;
        }

        const result = await loginUser(email, pass);

        if (!result.success) {

            let message = "Login failed.";

            switch (result.code) {

                case "auth/user-not-found":
                    message = "No account found.";
                    break;

                case "auth/wrong-password":
                    message = "Incorrect password.";
                    break;

                case "auth/invalid-credential":
                    message = "Incorrect email/username or password.";
                    break;

                case "auth/too-many-requests":
                    message = "Too many attempts. Try again later.";
                    break;

                default:
                    message = result.error || message;

            }

            showMessage(message, "error");
            return;
        }

        // Remember Me
        if (rememberMe?.checked) {
            localStorage.setItem("rememberLogin", "true");
        } else {
            localStorage.removeItem("rememberLogin");
        }

        showMessage("Login successful!", "success");

        setTimeout(() => {
            window.location.href = "main.html";
        }, 1000);

    } catch (error) {
        showMessage("Something went wrong. Try again.", "error");
    }

    finally {
        setButtonLoading(loginBtn, false);
    }

});


// ===============================
// FORGOT PASSWORD
// ===============================

forgotPassword?.addEventListener("click", async (e) => {

    e.preventDefault();

    const id = loginId.value.trim();

    if (!id) {
        showMessage("Enter your email or username first.", "error");
        return;
    }

    let email = id;

    if (!id.includes("@")) {

        email = await getEmailByUsername(id);

        if (!email) {
            showMessage("Username not found.", "error");
            return;
        }
    }

    const result = await resetPassword(email);

    if (result.success) {
        showMessage("Password reset email sent.", "success");
    } else {
        showMessage(result.error || "Failed to send reset email.", "error");
    }

});


// ===============================
// AUTO REDIRECT IF LOGGED IN
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const remember = localStorage.getItem("rememberLogin");

    if (remember === "true") {
        // You can later auto-check Firebase auth state here
        console.log("Remembered session active");
    }

});
