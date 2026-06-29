// ===============================
// RHOCKSTAR CONNECT
// utils.js
// Global Utility Functions
// ===============================

"use strict";

// ===============================
// SELECTORS
// ===============================

const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);

// ===============================
// RANDOM ID
// ===============================

function generateId(length = 20) {
    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let result = "";

    for (let i = 0; i < length; i++) {
        result += chars.charAt(
            Math.floor(Math.random() * chars.length)
        );
    }

    return result;
}

// ===============================
// DATE & TIME
// ===============================

function currentDate() {
    return new Date().toLocaleDateString();
}

function currentTime() {
    return new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit"
    });
}

function currentDateTime() {
    return new Date().toLocaleString();
}

// ===============================
// FORMAT NUMBERS
// ===============================

function formatNumber(number) {

    return Number(number).toLocaleString();

}

// ===============================
// SHOW MESSAGE
// ===============================

function showToast(message, type = "success") {

    let toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.innerHTML = message;

    document.body.appendChild(toast);

    requestAnimationFrame(() => {
        toast.classList.add("show");
    });

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, 3000);

}

// ===============================
// LOADING BUTTON
// ===============================

function setButtonLoading(button, loading = true) {

    if (!button) return;

    if (loading) {

        button.dataset.original = button.innerHTML;

        button.disabled = true;

        button.innerHTML = "Loading...";

    } else {

        button.disabled = false;

        button.innerHTML = button.dataset.original || button.innerHTML;

    }

}

// ===============================
// EMPTY CHECK
// ===============================

function isEmpty(value) {

    return value === null ||
           value === undefined ||
           value.toString().trim() === "";

}

// ===============================
// EMAIL VALIDATION
// ===============================

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}

// ===============================
// PHONE VALIDATION
// ===============================

function isValidPhone(phone) {

    return /^[0-9+\-()\s]{7,20}$/.test(phone);

}

// ===============================
// PASSWORD STRENGTH
// ===============================

function passwordStrength(password) {

    let score = 0;

    if (password.length >= 8) score++;

    if (/[A-Z]/.test(password)) score++;

    if (/[a-z]/.test(password)) score++;

    if (/[0-9]/.test(password)) score++;

    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;

}

// ===============================
// COPY TEXT
// ===============================

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(text);

        showToast("Copied successfully.");

    }

    catch {

        showToast("Copy failed.", "error");

    }

}

// ===============================
// SCROLL TO TOP
// ===============================

function scrollTopSmooth() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

// ===============================
// IMAGE PREVIEW
// ===============================

function previewImage(input, imageElement) {

    if (!input.files.length) return;

    const reader = new FileReader();

    reader.onload = function (e) {

        imageElement.src = e.target.result;

    };

    reader.readAsDataURL(input.files[0]);

}

// ===============================
// LOCAL STORAGE HELPERS
// ===============================

function saveLocal(key, value) {

    localStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function getLocal(key) {

    const data = localStorage.getItem(key);

    return data ? JSON.parse(data) : null;

}

function removeLocal(key) {

    localStorage.removeItem(key);

}

// ===============================
// SESSION STORAGE
// ===============================

function saveSession(key, value) {

    sessionStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function getSession(key) {

    const data = sessionStorage.getItem(key);

    return data ? JSON.parse(data) : null;

}

function removeSession(key) {

    sessionStorage.removeItem(key);

}

// ===============================
// DEBOUNCE
// ===============================

function debounce(callback, delay = 300) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

// ===============================
// CAPITALIZE
// ===============================

function capitalize(text) {

    if (isEmpty(text)) return "";

    return text.charAt(0).toUpperCase() + text.slice(1);

}

// ===============================
// UUID
// ===============================

function uuid() {

    return crypto.randomUUID();

}

// ===============================
// NETWORK STATUS
// ===============================

window.addEventListener("online", () => {

    showToast("Back online.");

});

window.addEventListener("offline", () => {

    showToast("No internet connection.", "error");

});

// ===============================
// GLOBAL APP OBJECT
// ===============================

window.AppUtils = {

    $,
    $$,
    generateId,
    currentDate,
    currentTime,
    currentDateTime,
    formatNumber,
    showToast,
    setButtonLoading,
    isEmpty,
    isValidEmail,
    isValidPhone,
    passwordStrength,
    copyText,
    scrollTopSmooth,
    previewImage,
    saveLocal,
    getLocal,
    removeLocal,
    saveSession,
    getSession,
    removeSession,
    debounce,
    capitalize,
    uuid

};
