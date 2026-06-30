// ===========================================
// UTILS.JS
// Common Helper Functions
// ===========================================


// ===========================================
// SELECTORS
// ===========================================

export function $(selector) {
    return document.querySelector(selector);
}

export function $$(selector) {
    return document.querySelectorAll(selector);
}

export function byId(id) {
    return document.getElementById(id);
}


// ===========================================
// SHOW
// ===========================================

export function show(element) {

    if (!element) return;

    element.classList.remove("hidden");

}


// ===========================================
// HIDE
// ===========================================

export function hide(element) {

    if (!element) return;

    element.classList.add("hidden");

}


// ===========================================
// TOGGLE
// ===========================================

export function toggle(element) {

    if (!element) return;

    element.classList.toggle("hidden");

}


// ===========================================
// ENABLE BUTTON
// ===========================================

export function enable(button) {

    if (!button) return;

    button.disabled = false;

}


// ===========================================
// DISABLE BUTTON
// ===========================================

export function disable(button) {

    if (!button) return;

    button.disabled = true;

}


// ===========================================
// SET BUTTON LOADING
// ===========================================

export function setLoading(button, text = "Loading...") {

    if (!button) return;

    button.dataset.original = button.innerHTML;

    button.disabled = true;

    button.innerHTML = text;

}


// ===========================================
// REMOVE BUTTON LOADING
// ===========================================

export function stopLoading(button) {

    if (!button) return;

    button.disabled = false;

    if (button.dataset.original) {

        button.innerHTML = button.dataset.original;

    }

}


// ===========================================
// TOAST
// ===========================================

export function toast(message) {

    alert(message);

}


// ===========================================
// FORMAT DATE
// ===========================================

export function formatDate(date) {

    return new Date(date).toLocaleString();

}


// ===========================================
// CURRENT DATE
// ===========================================

export function now() {

    return new Date();

}


// ===========================================
// RANDOM ID
// ===========================================

export function generateId() {

    return crypto.randomUUID();

}


// ===========================================
// TRIM STRING
// ===========================================

export function clean(text) {

    return text.trim();

}


// ===========================================
// CHECK EMPTY
// ===========================================

export function isEmpty(text) {

    return clean(text) === "";

}


// ===========================================
// EMAIL VALIDATION
// ===========================================

export function isEmail(email) {

    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

}


// ===========================================
// PASSWORD VALIDATION
// ===========================================

export function strongPassword(password) {

    return password.length >= 6;

}


// ===========================================
// COPY TEXT
// ===========================================

export async function copy(text) {

    await navigator.clipboard.writeText(text);

}


// ===========================================
// SCROLL TOP
// ===========================================

export function scrollTopSmooth() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


// ===========================================
// PREVIEW IMAGE
// ===========================================

export function previewImage(file, img) {

    if (!file || !img) return;

    const reader = new FileReader();

    reader.onload = e => {

        img.src = e.target.result;

    };

    reader.readAsDataURL(file);

}
