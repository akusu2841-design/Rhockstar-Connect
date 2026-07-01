// ======================================
// RHOCKSTAR CONNECT
// utils.js
// Shared UI Helpers (GLOBAL SAFE)
// ======================================


// =========================
// MESSAGE BOX
// =========================

function showMessage(message, type = "info") {

    const box = document.getElementById("messageBox");

    if (!box) return;

    box.textContent = message;

    box.className = `message-box ${type}`;

    box.style.display = "block";

    clearTimeout(box.timer);

    box.timer = setTimeout(() => {
        box.style.display = "none";
    }, 4000);
}


// =========================
// BUTTON LOADING
// =========================

function setButtonLoading(button, loading = true) {

    if (!button) return;

    if (loading) {

        button.dataset.original = button.innerHTML;

        button.disabled = true;

        button.innerHTML = "Please wait...";

    } else {

        button.disabled = false;

        button.innerHTML = button.dataset.original || "Submit";
    }
}


// =========================
// PASSWORD TOGGLE
// =========================

function setupPasswordToggle(buttonId, inputId) {

    const button = document.getElementById(buttonId);
    const input = document.getElementById(inputId);

    if (!button || !input) return;

    button.addEventListener("click", () => {

        if (input.type === "password") {
            input.type = "text";
            button.textContent = "🙈";
        } else {
            input.type = "password";
            button.textContent = "👁";
        }

    });
}


// =========================
// PASSWORD STRENGTH
// =========================

function getPasswordStrength(password) {

    let score = 0;

    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[a-z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    return score;
}


// =========================
// STRENGTH BAR
// =========================

function setupStrengthBar(inputId, barId) {

    const input = document.getElementById(inputId);
    const bar = document.getElementById(barId);

    if (!input || !bar) return;

    input.addEventListener("input", () => {

        const score = getPasswordStrength(input.value);

        let width = "0%";
        let color = "#ff3b30";

        switch (score) {

            case 1:
                width = "20%";
                break;

            case 2:
                width = "40%";
                color = "#ff9500";
                break;

            case 3:
                width = "60%";
                color = "#ffd60a";
                break;

            case 4:
                width = "80%";
                color = "#32d74b";
                break;

            case 5:
                width = "100%";
                color = "#00c853";
                break;
        }

        bar.style.width = width;
        bar.style.background = color;
    });
}


// =========================
// VALIDATION
// =========================

function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidUsername(username) {
    return /^[a-zA-Z0-9_]{3,20}$/.test(username);
}

function isStrongPassword(password) {
    return password.length >= 8 &&
        /[A-Z]/.test(password) &&
        /[a-z]/.test(password) &&
        /[0-9]/.test(password) &&
        /[^A-Za-z0-9]/.test(password);
}


// =========================
// EXPORT TO GLOBAL (IMPORTANT)
// =========================

window.showMessage = showMessage;
window.setButtonLoading = setButtonLoading;
window.setupPasswordToggle = setupPasswordToggle;
window.setupStrengthBar = setupStrengthBar;
window.getPasswordStrength = getPasswordStrength;
window.isValidEmail = isValidEmail;
window.isValidUsername = isValidUsername;
window.isStrongPassword = isStrongPassword;
