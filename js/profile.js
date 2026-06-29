"use strict";

/* ==========================================
   PROFILE.JS
   Rhockstar Connect
========================================== */

// Wait until the page loads
document.addEventListener("DOMContentLoaded", () => {
    initializeProfile();
});

function initializeProfile() {
    cacheElements();
    loadProfile();
    attachProfileEvents();
    updateProfileCompletion();
}


// ==============================
// ELEMENTS
// ==============================

let profile = {};

function cacheElements() {

    profile.displayName = document.getElementById("displayName");
    profile.displayUsername = document.getElementById("displayUsername");
    profile.displayTitle = document.getElementById("displayTitle");
    profile.displayBio = document.getElementById("displayBio");

    profile.profileAvatar = document.getElementById("profileAvatar");
    profile.coverPhoto = document.getElementById("coverPhoto");

    profile.profilePicPreview = document.getElementById("profilePicPreview");

    profile.editSection = document.getElementById("profileEditSection");

    profile.editButton = document.getElementById("profileEditBtn");
    profile.editBottomButton = document.getElementById("profileEditBottomBtn");

    profile.saveButton = document.getElementById("saveBtn");
    profile.cancelButton = document.getElementById("cancel");

    profile.uploadPic = document.getElementById("uploadPic");
    profile.uploadCover = document.getElementById("uploadCover");

    profile.editFullName = document.getElementById("editFullName");
    profile.editUsername = document.getElementById("editUName");
    profile.editEmail = document.getElementById("editE");
    profile.editPhone = document.getElementById("editTel");
    profile.editLocation = document.getElementById("editL");
    profile.editWebsite = document.getElementById("editWebsite");
    profile.editDOB = document.getElementById("editDOB");
    profile.editEducation = document.getElementById("editEducation");
    profile.editTitle = document.getElementById("editTitle");
    profile.editRelationship = document.getElementById("editRelationship");
    profile.editBio = document.getElementById("editBio");
    profile.editSkills = document.getElementById("editSkills");

    profile.facebookInput = document.getElementById("facebookInput");
    profile.instagramInput = document.getElementById("instagramInput");
    profile.twitterInput = document.getElementById("twitterInput");
    profile.linkedinInput = document.getElementById("linkedinInput");
    profile.githubInput = document.getElementById("githubInput");
    profile.youtubeInput = document.getElementById("youtubeInput");
    profile.tiktokInput = document.getElementById("tiktokInput");
    profile.whatsappInput = document.getElementById("whatsappInput");

    profile.profileProgress = document.getElementById("profileProgress");
    profile.profilePercent = document.getElementById("profilePercent");
}

const defaultProfile = {

    fullName: "Elijah Peter",
    username: "@rhockstar",
    email: "",
    phone: "",
    location: "",
    website: "",
    dob: "",
    education: "",
    title: "Web Developer • Digital Creator",
    relationship: "",
    bio: "Building meaningful connections through Rhockstar Connect.",
    skills: "",

    facebook: "",
    instagram: "",
    twitter: "",
    linkedin: "",
    github: "",
    youtube: "",
    tiktok: "",
    whatsapp: "",

    avatar: "images/profile.jpg",
    cover: "images/cover.jpg"

};

const PROFILE_KEY = "rhockstarProfile";

function loadProfile() {

    const saved = localStorage.getItem(PROFILE_KEY);

    const data = saved
        ? JSON.parse(saved)
        : defaultProfile;

    displayProfile(data);

}
function displayProfile(data) {

    profile.displayName.textContent = data.fullName;
    profile.displayUsername.textContent = data.username;
    profile.displayTitle.textContent = data.title;
    profile.displayBio.textContent = data.bio;

    profile.profileAvatar.src = data.avatar;
    profile.profilePicPreview.src = data.avatar;
    profile.coverPhoto.src = data.cover;

}

function attachProfileEvents() {

}


function updateProfileCompletion() {

    profile.profileProgress.style.width = "0%";
    profile.profilePercent.textContent = "0%";

}







