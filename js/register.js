import { auth, db } from "./firebase.js";

import {
    createUserWithEmailAndPassword,
    updateProfile
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    doc,
    setDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


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
// PAGE SETUP
// =========================

setupPasswordToggle("togglePassword", "password");
setupStrengthBar("password", "strengthBar");


// =========================
// REGISTER
// =========================

form.addEventListener("submit", async (e) => {

    e.preventDefault();

    const name = fullName.value.trim();
    const user = username.value.trim().toLowerCase();
    const mail = email.value.trim().toLowerCase();
    const pass = password.value;
    const confirm = confirmPassword.value;

    if (!name) {
        return showMessage("Enter your full name.", "error");
    }

    if (!isValidUsername(user)) {
        return showMessage(
            "Username must be 3 to 20 characters and contain only letters, numbers and underscores.",
            "error"
        );
    }

    if (!isValidEmail(mail)) {
        return showMessage("Enter a valid email.", "error");
    }

    if (!isStrongPassword(pass)) {
        return showMessage(
            "Password is not strong enough.",
            "error"
        );
    }

    if (pass !== confirm) {
        return showMessage(
            "Passwords do not match.",
            "error"
        );
    }

    if (!terms.checked) {
        return showMessage(
            "Accept the Terms before continuing.",
            "error"
        );
    }

    try {

        setButtonLoading(registerBtn, true);

        // Firebase Auth
        const result = await createUserWithEmailAndPassword(
            auth,
            mail,
            pass
        );

        // Update profile
        await updateProfile(result.user, {
            displayName: name
        });

        // Firestore profile
        await setDoc(doc(db, "users", result.user.uid), {

            uid: result.user.uid,

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

            posts: 0,

            createdAt: serverTimestamp()

        });

        showMessage(
            "Account created successfully.",
            "success"
        );

        setTimeout(() => {

            window.location.href = "login.html";

        }, 1500);

    }

    catch (error) {

        let message = error.message;

        switch (error.code) {

            case "auth/email-already-in-use":
                message = "Email already exists.";
                break;

            case "auth/weak-password":
                message = "Password is too weak.";
                break;

            case "auth/invalid-email":
                message = "Invalid email.";
                break;

        }

        showMessage(message, "error");

    }

    finally {

        setButtonLoading(registerBtn, false);

    }

});
