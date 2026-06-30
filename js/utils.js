// ===============================
// RHOCKSTAR CONNECT
// utils.js
// Global Utility Functions
// ===============================

"use strict";

// ===============================
// DOM SELECTORS
// ===============================

const $ = selector => document.querySelector(selector);

const $$ = selector => document.querySelectorAll(selector);

// ===============================
// RANDOM ID
// ===============================

function generateId(length = 20) {

    const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    let id = "";

    for (let i = 0; i < length; i++) {

        id += chars.charAt(

            Math.floor(Math.random() * chars.length)

        );

    }

    return id;

}

// ===============================
// UNIVERSAL UUID
// ===============================

function uuid() {

    if (

        window.crypto &&

        typeof crypto.randomUUID === "function"

    ) {

        return crypto.randomUUID();

    }

    return generateId(36);

}

// ===============================
// DATE
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

function timestamp() {

    return Date.now();

}

// ===============================
// FORMATTERS
// ===============================

function formatNumber(number = 0) {

    return Number(number).toLocaleString();

}

function formatMoney(amount = 0) {

    return "₦" + Number(amount).toLocaleString();

}

function capitalize(text = "") {

    if (!text) return "";

    return text.charAt(0).toUpperCase()

        + text.slice(1);

}

function capitalizeWords(text = "") {

    return text

        .split(" ")

        .map(word => capitalize(word))

        .join(" ");

}

// ===============================
// VALIDATION
// ===============================

function isEmpty(value) {

    return (

        value === null ||

        value === undefined ||

        value.toString().trim() === ""

    );

}

function isValidEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        .test(email);

}

function isValidPhone(phone) {

    return /^[0-9+\-()\s]{7,20}$/

        .test(phone);

}

function passwordStrength(password) {

    let score = 0;

    if (password.length >= 8)

        score++;

    if (/[A-Z]/.test(password))

        score++;

    if (/[a-z]/.test(password))

        score++;

    if (/[0-9]/.test(password))

        score++;

    if (/[^A-Za-z0-9]/.test(password))

        score++;

    return score;

}
// ===============================
// TOAST NOTIFICATIONS
// ===============================

function showToast(

    message,

    type = "success",

    duration = 3000

) {

    let container = document.getElementById(

        "toastContainer"

    );

    if (!container) {

        container = document.createElement("div");

        container.id = "toastContainer";

        document.body.appendChild(container);

    }

    const toast = document.createElement("div");

    toast.className = `toast ${type}`;

    toast.textContent = message;

    container.appendChild(toast);

    requestAnimationFrame(() => {

        toast.classList.add("show");

    });

    setTimeout(() => {

        toast.classList.remove("show");

        setTimeout(() => {

            toast.remove();

        }, 300);

    }, duration);

}

// ===============================
// BUTTON LOADING
// ===============================

function setButtonLoading(

    button,

    loading = true,

    text = "Loading..."

) {

    if (!button) return;

    if (loading) {

        if (!button.dataset.originalText) {

            button.dataset.originalText =

                button.innerHTML;

        }

        button.disabled = true;

        button.innerHTML = text;

    } else {

        button.disabled = false;

        button.innerHTML =

            button.dataset.originalText ||

            button.innerHTML;

    }

}

// ===============================
// COPY TEXT
// ===============================

async function copyText(text) {

    try {

        await navigator.clipboard.writeText(text);

        showToast(

            "Copied successfully."

        );

        return true;

    }

    catch {

        showToast(

            "Copy failed.",

            "error"

        );

        return false;

    }

}

// ===============================
// IMAGE PREVIEW
// ===============================

function previewImage(

    input,

    image

) {

    if (

        !input ||

        !input.files ||

        !input.files.length ||

        !image

    ) {

        return;

    }

    const reader = new FileReader();

    reader.onload = e => {

        image.src = e.target.result;

    };

    reader.readAsDataURL(

        input.files[0]

    );

}

// ===============================
// FILE TO DATA URL
// ===============================

function fileToDataURL(file) {

    return new Promise(

        (resolve, reject) => {

            const reader = new FileReader();

            reader.onload = () =>

                resolve(reader.result);

            reader.onerror = reject;

            reader.readAsDataURL(file);

        }

    );

}

// ===============================
// DOWNLOAD FILE
// ===============================

function downloadFile(

    filename,

    content,

    type = "text/plain"

) {

    const blob = new Blob(

        [content],

        {

            type

        }

    );

    const url =

        URL.createObjectURL(blob);

    const a =

        document.createElement("a");

    a.href = url;

    a.download = filename;

    a.click();

    URL.revokeObjectURL(url);

}

// ===============================
// SCROLL HELPERS
// ===============================

function scrollTopSmooth() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}

function scrollBottomSmooth() {

    window.scrollTo({

        top: document.body.scrollHeight,

        behavior: "smooth"

    });

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

    const value = localStorage.getItem(key);

    return value

        ? JSON.parse(value)

        : null;

}

function removeLocal(key) {

    localStorage.removeItem(key);

}

function clearLocal() {

    localStorage.clear();

}

// ===============================
// SESSION STORAGE HELPERS
// ===============================

function saveSession(key, value) {

    sessionStorage.setItem(

        key,

        JSON.stringify(value)

    );

}

function getSession(key) {

    const value = sessionStorage.getItem(key);

    return value

        ? JSON.parse(value)

        : null;

}

function removeSession(key) {

    sessionStorage.removeItem(key);

}

function clearSession() {

    sessionStorage.clear();

}

// ===============================
// FUNCTION HELPERS
// ===============================

function debounce(

    callback,

    delay = 300

) {

    let timer;

    return (...args) => {

        clearTimeout(timer);

        timer = setTimeout(() => {

            callback(...args);

        }, delay);

    };

}

function throttle(

    callback,

    delay = 300

) {

    let waiting = false;

    return (...args) => {

        if (waiting) return;

        callback(...args);

        waiting = true;

        setTimeout(() => {

            waiting = false;

        }, delay);

    };

}

function sleep(ms) {

    return new Promise(resolve => {

        setTimeout(resolve, ms);

    });

}

// ===============================
// RANDOM HELPERS
// ===============================

function randomNumber(

    min,

    max

) {

    return Math.floor(

        Math.random() *

        (max - min + 1)

    ) + min;

}

function randomItem(array) {

    if (

        !Array.isArray(array) ||

        !array.length

    ) {

        return null;

    }

    return array[

        randomNumber(

            0,

            array.length - 1

        )

    ];

}

// ===============================
// NETWORK
// ===============================

function isOnline() {

    return navigator.onLine;

}

window.addEventListener(

    "online",

    () => {

        showToast(

            "Back online."

        );

    }

);

window.addEventListener(

    "offline",

    () => {

        showToast(

            "No internet connection.",

            "error"

        );

    }

);

// ===============================
// GLOBAL APP OBJECT
// ===============================

window.AppUtils = {

    $,
    $$,

    generateId,
    uuid,

    currentDate,
    currentTime,
    currentDateTime,
    timestamp,

    formatNumber,
    formatMoney,

    capitalize,
    capitalizeWords,

    isEmpty,
    isValidEmail,
    isValidPhone,
    passwordStrength,

    showToast,
    setButtonLoading,

    copyText,

    previewImage,
    fileToDataURL,
    downloadFile,

    scrollTopSmooth,
    scrollBottomSmooth,

    saveLocal,
    getLocal,
    removeLocal,
    clearLocal,

    saveSession,
    getSession,
    removeSession,
    clearSession,

    debounce,
    throttle,
    sleep,

    randomNumber,
    randomItem,

    isOnline

};
