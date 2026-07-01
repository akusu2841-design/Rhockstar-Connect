// ======================================
// RHOCKSTAR CONNECT
// register.js
// ======================================

import { registerUser } from "./auth.js";
import { createUserProfile, usernameExists } from "./firestore.js";


// =========================
// ELEMENTS
// =========================

const form = document.getElementById("registerForm");

const fullName = document.getElementById("fullName");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const terms = document.getElementById("terms");
const registerBtn = document.getElementById("registerBtn");


// =========================
// UI SETUP (utils.js global)
// =========================

setupPasswordToggle("togglePassword", "password");
setupStrengthBar("password", "strengthBar");


// =========================
// REGISTER
// =========================

form?.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = fullName.value.trim();
    const user = username.value.trim().toLowerCase();
    const mail = email.value.trim().toLowerCase();
    const pass = password.value;
    const confirm = confirmPassword.value;

    // VALIDATION
    if (!name) return showMessage("Enter your full name.", "error");

    if (!isValidUsername(user))
        return showMessage("Invalid username format.", "error");

    if (!isValidEmail(mail))
        return showMessage("Enter a valid email.", "error");

    if (!isStrongPassword(pass))
        return showMessage("Password is too weak.", "error");

    if (pass !== confirm)
        return showMessage("Passwords do not match.", "error");

    if (!terms.checked)
        return showMessage("You must accept terms.", "error");

    try {

        setButtonLoading(registerBtn, true);

        // CHECK USERNAME
        if (await usernameExists(user)) {
            showMessage("Username already taken.", "error");
            return;
        }

        // CREATE AUTH USER
        const result = await registerUser(mail, pass);

        if (!result.success) {
            showMessage(result.error || "Registration failed.", "error");
            return;
        }

        const uid = result.user.uid;

        // CREATE FIRESTORE PROFILE
        await createUserProfile(uid, {

            uid,
            fullName: name,
            username: user,
            email: mail,
            photoURL: "",
            coverURL: "",
            bio: "",
            title: "",
            country: "",
            location: "",
            verified: false,
            followers: 0,
            following: 0,
            connections: 0,
            posts: 0

        });

        showMessage("Account created successfully!", "success");

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1200);

    }

    catch (error) {
        showMessage("Something went wrong.", "error");
    }

    finally {
        setButtonLoading(registerBtn, false);
    }

});
