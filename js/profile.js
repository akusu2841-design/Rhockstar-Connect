// ===============================
// RHOCKSTAR CONNECT
// profile.js
// ===============================

"use strict";

document.addEventListener("DOMContentLoaded", () => {

    initializeProfile();

});

// ===============================
// INITIALIZE
// ===============================

function initializeProfile() {

    loadProfile();

    initializeAvatarUpload();

    initializeProfileButtons();

}

// ===============================
// LOAD PROFILE
// ===============================

function loadProfile() {

    const user = Auth.currentUser();

    if (!user) return;

    setValue("profileName", user.fullName);
    setValue("profileUsername", user.username);
    setValue("profileEmail", user.email);
    setValue("profilePhone", user.phone);
    setValue("profileLocation", user.location);
    setValue("profileBio", user.bio);
    setValue("profileProfession", user.profession);
    setValue("profileWebsite", user.website);

    setImage("profileAvatar", user.photo);
    setImage("settingsAvatar", user.photo);

}

// ===============================
// SAVE PROFILE
// ===============================

function saveProfile() {

    const user = Auth.currentUser();

    if (!user) return;

    const updated = {

        fullName: getValue("profileName"),

        username: getValue("profileUsername"),

        email: getValue("profileEmail"),

        phone: getValue("profilePhone"),

        location: getValue("profileLocation"),

        bio: getValue("profileBio"),

        profession: getValue("profileProfession"),

        website: getValue("profileWebsite")

    };

    Auth.updateCurrentUser(updated);

    AppUtils.showToast(

        "Profile updated successfully."

    );

}

// ===============================
// AVATAR UPLOAD
// ===============================

function initializeAvatarUpload() {

    const input = document.getElementById(

        "profileImageInput"

    );

    if (!input) return;

    input.addEventListener("change", () => {

        if (!input.files.length) return;

        const reader = new FileReader();

        reader.onload = e => {

            setImage(

                "profileAvatar",

                e.target.result

            );

            setImage(

                "settingsAvatar",

                e.target.result

            );

            Auth.updateCurrentUser({

                photo: e.target.result

            });

        };

        reader.readAsDataURL(

            input.files[0]

        );

    });

}

// ===============================
// BUTTONS
// ===============================

function initializeProfileButtons() {

    const saveBtn = document.getElementById(

        "saveProfileBtn"

    );

    if (saveBtn) {

        saveBtn.addEventListener(

            "click",

            saveProfile

        );

    }

}

// ===============================
// HELPERS
// ===============================

function getValue(id) {

    const el = document.getElementById(id);

    return el ? el.value.trim() : "";

}

function setValue(id, value) {

    const el = document.getElementById(id);

    if (el) {

        el.value = value || "";

    }

}

function setImage(id, src) {

    const img = document.getElementById(id);

    if (!img) return;

    if (src && src !== "") {

        img.src = src;

    }

}

// ===============================
// PROFILE COUNTERS
// ===============================

function updateProfileStats() {

    setText(

        "postsCount",

        StorageManager.getArray(

            STORAGE_KEYS.POSTS

        ).length

    );

    setText(

        "connectionsCount",

        StorageManager.getArray(

            STORAGE_KEYS.CONNECTIONS

        ).length

    );

    setText(

        "followersCount",

        StorageManager.getArray(

            STORAGE_KEYS.FOLLOWERS

        ).length

    );

    setText(

        "followingCount",

        StorageManager.getArray(

            STORAGE_KEYS.FOLLOWING

        ).length

    );

}

// ===============================
// TEXT
// ===============================

function setText(id, value) {

    const el = document.getElementById(id);

    if (el) {

        el.textContent = value;

    }

}

// ===============================
// PUBLIC
// ===============================

window.Profile = {

    loadProfile,

    saveProfile,

    updateProfileStats

};
