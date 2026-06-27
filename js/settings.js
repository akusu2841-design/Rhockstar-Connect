// ===============================
// RHOCKSTAR CONNECT
// settings.js
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    loadSettings();

    initializeDarkMode();

    initializeAnimations();

    initializePrivacy();

    initializeAccountSettings();

    initializePassword();

    initializeDownload();

    initializeDeleteAccount();

});

// ===============================
// LOAD SETTINGS
// ===============================

function loadSettings() {

    const settingsName = document.getElementById("settingsName");
    const settingsEmail = document.getElementById("settingsEmail");
    const settingsUsername = document.getElementById("settingsUsername");

    if (settingsName)
        settingsName.value =
            localStorage.getItem("settingsName") || "";

    if (settingsEmail)
        settingsEmail.value =
            localStorage.getItem("settingsEmail") || "";

    if (settingsUsername)
        settingsUsername.value =
            localStorage.getItem("settingsUsername") || "";

}

// ===============================
// ACCOUNT SETTINGS
// ===============================

function initializeAccountSettings() {

    const saveBtn =
        document.getElementById("saveAccountBtn");

    if (!saveBtn) return;

    saveBtn.addEventListener("click", () => {

        const name =
            document.getElementById("settingsName").value.trim();

        const email =
            document.getElementById("settingsEmail").value.trim();

        const username =
            document.getElementById("settingsUsername").value.trim();

        localStorage.setItem("settingsName", name);
        localStorage.setItem("settingsEmail", email);
        localStorage.setItem("settingsUsername", username);

        const profile =
            JSON.parse(
                localStorage.getItem("rhockstar_profile")
            ) || {};

        profile.name = name;
        profile.email = email;
        profile.username = username;

        localStorage.setItem(
            "rhockstar_profile",
            JSON.stringify(profile)
        );

        if (document.getElementById("displayName"))
            document.getElementById("displayName").textContent = name;

        if (document.getElementById("displayUsername"))
            document.getElementById("displayUsername").textContent = username;

        if (document.getElementById("myN"))
            document.getElementById("myN").textContent = name;

        if (document.getElementById("myE"))
            document.getElementById("myE").textContent = email;

        alert("Account settings updated.");

    });

}

// ===============================
// CHANGE PASSWORD
// ===============================

function initializePassword() {

    const btn =
        document.getElementById("changePasswordBtn");

    if (!btn) return;

    btn.addEventListener("click", () => {

        const current =
            document.getElementById("currentPassword").value;

        const password =
            document.getElementById("newPassword").value;

        const confirmPassword =
            document.getElementById("confirmPassword").value;

        if (!current || !password || !confirmPassword) {

            alert("Complete all fields.");

            return;

        }

        if (password.length < 6) {

            alert("Password must be at least 6 characters.");

            return;

        }

        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;

        }

        alert("Password changed successfully.");

        document.getElementById("currentPassword").value = "";
        document.getElementById("newPassword").value = "";
        document.getElementById("confirmPassword").value = "";

    });

}

// ===============================
// DARK MODE
// ===============================

function initializeDarkMode() {

    const darkMode =
        document.getElementById("darkMode");

    if (!darkMode) return;

    const saved =
        localStorage.getItem("darkMode");

    if (saved !== null) {

        darkMode.checked = saved === "true";

    }

    document.body.classList.toggle(
        "light-mode",
        !darkMode.checked
    );

    darkMode.addEventListener("change", () => {

        document.body.classList.toggle(
            "light-mode",
            !darkMode.checked
        );

        localStorage.setItem(
            "darkMode",
            darkMode.checked
        );

    });

}

// ===============================
// ANIMATIONS
// ===============================

function initializeAnimations() {

    const animations =
        document.getElementById("animations");

    if (!animations) return;

    const saved =
        localStorage.getItem("animations");

    if (saved !== null) {

        animations.checked = saved === "true";

    }

    document.body.classList.toggle(
        "no-animation",
        !animations.checked
    );

    animations.addEventListener("change", () => {

        document.body.classList.toggle(
            "no-animation",
            !animations.checked
        );

        localStorage.setItem(
            "animations",
            animations.checked
        );

    });

}

// ===============================
// PRIVACY
// ===============================

function initializePrivacy() {

    const privateProfile =
        document.getElementById("privateProfile");

    const showEmail =
        document.getElementById("showEmail");

    const showPhone =
        document.getElementById("showPhone");

    if (privateProfile) {

        privateProfile.checked =
            localStorage.getItem("privateProfile") === "true";

        privateProfile.addEventListener("change", () => {

            localStorage.setItem(
                "privateProfile",
                privateProfile.checked
            );

            alert(
                privateProfile.checked
                    ? "Profile is now private."
                    : "Profile is now public."
            );

        });

    }

    if (showEmail) {

        showEmail.checked =
            localStorage.getItem("showEmail") !== "false";

        toggleEmail(showEmail.checked);

        showEmail.addEventListener("change", () => {

            localStorage.setItem(
                "showEmail",
                showEmail.checked
            );

            toggleEmail(showEmail.checked);

        });

    }

    if (showPhone) {

        showPhone.checked =
            localStorage.getItem("showPhone") !== "false";

        togglePhone(showPhone.checked);

        showPhone.addEventListener("change", () => {

            localStorage.setItem(
                "showPhone",
                showPhone.checked
            );

            togglePhone(showPhone.checked);

        });

    }

}

function toggleEmail(show) {

    const email =
        document.getElementById("myE");

    if (email)
        email.style.display =
            show ? "inline" : "none";

}

function togglePhone(show) {

    const phone =
        document.getElementById("myPhone");

    if (phone)
        phone.style.display =
            show ? "inline" : "none";

}

// ===============================
// DOWNLOAD DATA
// ===============================

function initializeDownload() {

    const btn =
        document.getElementById("downloadDataBtn");

    if (!btn) return;

    btn.addEventListener("click", () => {

        const data = {

            profile:
                JSON.parse(
                    localStorage.getItem("rhockstar_profile")
                ),

            jobs:
                JSON.parse(
                    localStorage.getItem("jobs") || "[]"
                ),

            theme:
                localStorage.getItem("darkMode"),

            notifications:
                localStorage.getItem("rhockstar_notifications")

        };

        const blob =
            new Blob(

                [
                    JSON.stringify(
                        data,
                        null,
                        2
                    )
                ],

                {
                    type:
                        "application/json"
                }

            );

        const url =
            URL.createObjectURL(blob);

        const a =
            document.createElement("a");

        a.href = url;

        a.download =
            "RhockstarConnectData.json";

        a.click();

        URL.revokeObjectURL(url);

    });

}

// ===============================
// DELETE ACCOUNT
// ===============================

function initializeDeleteAccount() {

    const btn =
        document.getElementById("deleteAccountBtn");

    if (!btn) return;

    btn.addEventListener("click", () => {

        const answer =
            confirm(
                "This will permanently delete all your local data. Continue?"
            );

        if (!answer) return;

        localStorage.clear();

        alert("Account deleted.");

        location.reload();

    });

}
