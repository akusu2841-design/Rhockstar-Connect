"use strict";

/*====================================================
    RHOCKSTAR CONNECT
    PROFILE.JS
====================================================*/

// ==============================
// STORAGE KEY
// ==============================

const PROFILE_KEY = "rhockstarProfile";

// ==============================
// ELEMENTS
// ==============================

const profile = {};

// ==============================
// INITIALIZE
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    cacheElements();

    loadProfile();

    attachProfileEvents();

    updateProfileCompletion();

});

// ==============================
// CACHE ELEMENTS
// ==============================

function cacheElements() {

    // ==========================
    // PROFILE HEADER
    // ==========================

    profile.displayName = document.getElementById("displayName");

    profile.displayUsername = document.getElementById("displayUsername");

    profile.displayTitle = document.getElementById("displayTitle");

    profile.displayBio = document.getElementById("displayBio");

    profile.profileAvatar = document.getElementById("profileAvatar");

    profile.coverPhoto = document.getElementById("coverPhoto");

    profile.profilePicPreview = document.getElementById("profilePicPreview");

    profile.displayStatus = document.getElementById("displayStatus");



    // ==========================
    // PROFILE BUTTONS
    // ==========================

    profile.editButton = document.getElementById("profileEditBtn");

    profile.editBottomButton = document.getElementById("profileEditBottomBtn");

    profile.shareButton = document.getElementById("shareProfileBtn");

    profile.shareBottomButton = document.getElementById("shareProfileBottomBtn");

    profile.copyButton = document.getElementById("copyProfileBtn");

    profile.copyBottomButton = document.getElementById("copyProfileBottomBtn");

    profile.downloadProfileBtn = document.getElementById("downloadProfileBtn");

    profile.downloadCVBtn = document.getElementById("downloadCVBtn");



    // ==========================
    // EDIT PROFILE
    // ==========================

    profile.editSection = document.getElementById("profileEditSection");

    profile.saveButton = document.getElementById("saveBtn");

    profile.cancelButton = document.getElementById("cancel");



    // ==========================
    // EDIT INPUTS
    // ==========================

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



    // ==========================
    // IMAGE UPLOADS
    // ==========================

    profile.uploadPic = document.getElementById("uploadPic");

    profile.uploadCover = document.getElementById("uploadCover");



    // ==========================
    // PERSONAL INFO
    // ==========================

    profile.myName = document.getElementById("myN");

    profile.myUsername = document.getElementById("myUsername");

    profile.myEmail = document.getElementById("myE");

    profile.myPhone = document.getElementById("myPhone");

    profile.myGender = document.getElementById("myGender");

    profile.myDOB = document.getElementById("myDOB");

    profile.myCountry = document.getElementById("myCountry");

    profile.myLocation = document.getElementById("myLocation");

    profile.myRelationship = document.getElementById("myRelationship");

    profile.myOccupation = document.getElementById("myOccupation");

    profile.myCompany = document.getElementById("myCompany");

    profile.myWebsite = document.getElementById("myWebsite");

    profile.myLanguages = document.getElementById("myLanguages");

    profile.aboutMe = document.getElementById("abtMe");



    // ==========================
    // SOCIAL LINKS
    // ==========================

    profile.facebookLink = document.getElementById("facebookLink");

    profile.instagramLink = document.getElementById("instagramLink");

    profile.xLink = document.getElementById("xLink");

    profile.linkedinLink = document.getElementById("linkedinLink");

    profile.githubLink = document.getElementById("githubLink");

    profile.youtubeLink = document.getElementById("youtubeLink");

    profile.tiktokLink = document.getElementById("tiktokLink");

    profile.whatsappLink = document.getElementById("whatsappLink");



    // ==========================
    // SOCIAL INPUTS
    // ==========================

    profile.facebookInput = document.getElementById("facebookInput");

    profile.instagramInput = document.getElementById("instagramInput");

    profile.twitterInput = document.getElementById("twitterInput");

    profile.linkedinInput = document.getElementById("linkedinInput");

    profile.githubInput = document.getElementById("githubInput");

    profile.youtubeInput = document.getElementById("youtubeInput");

    profile.tiktokInput = document.getElementById("tiktokInput");

    profile.whatsappInput = document.getElementById("whatsappInput");



    // ==========================
    // SKILLS
    // ==========================

    profile.skillsContainer = document.getElementById("skillsContainer");



    // ==========================
    // PROFILE COMPLETION
    // ==========================

    profile.profileProgress = document.getElementById("profileProgress");

    profile.profilePercent = document.getElementById("profilePercent");

}

// ==============================
// DEFAULT PROFILE
// ==============================

const defaultProfile = {

    fullName: "Elijah Peter",

    username: "@rhockstar",

    email: "",

    phone: "",

    location: "Lagos",

    country: "Nigeria",

    gender: "",

    dob: "",

    relationship: "",

    occupation: "Web Developer",

    company: "Rhockstar Nation",

    website: "",

    education: "",

    languages: "English",

    title: "Web Developer • Digital Creator",

    bio: "Building meaningful connections through Rhockstar Connect.",

    skills: "HTML,CSS,JavaScript",

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

experience: [],

education: [],

certificates: [],

portfolio: [],

photos: [],

posts: 0,
followers: 0,
following: 0,
connections: 0,
views: 0,

likes: 0,
comments: 0,
shares: 0,
saved: 0,

todayVisitors: 0,
weekVisitors: 0,
monthVisitors: 0,

datingVisitors: 0,
likesReceived: 0,
likesSent: 0,
matches: 0,

jobsPosted: 0,
jobsApplied: 0,

};


// ==============================
// LOAD PROFILE
// ==============================

function loadProfile() {

    let savedProfile = localStorage.getItem(PROFILE_KEY);

    if (!savedProfile) {

        localStorage.setItem(
            PROFILE_KEY,
            JSON.stringify(defaultProfile)
        );

        savedProfile = JSON.stringify(defaultProfile);

    }

    const data = JSON.parse(savedProfile);

    displayProfile(data);

}


// ==============================
// GET PROFILE
// ==============================

function getProfile() {

    return JSON.parse(
        localStorage.getItem(PROFILE_KEY)
    ) || defaultProfile;

}


// ==============================
// SAVE PROFILE
// ==============================

function saveProfile() {

    const current = getProfile();

    current.fullName = profile.editFullName.value.trim();

    current.username = profile.editUsername.value.trim();

    current.email = profile.editEmail.value.trim();

    current.phone = profile.editPhone.value.trim();

    current.location = profile.editLocation.value.trim();

    current.website = profile.editWebsite.value.trim();

    current.dob = profile.editDOB.value;

    current.education = profile.editEducation.value.trim();

    current.title = profile.editTitle.value.trim();

    current.relationship = profile.editRelationship.value;

    current.bio = profile.editBio.value.trim();

    current.skills = profile.editSkills.value.trim();

    current.facebook = profile.facebookInput.value.trim();

    current.instagram = profile.instagramInput.value.trim();

    current.twitter = profile.twitterInput.value.trim();

    current.linkedin = profile.linkedinInput.value.trim();

    current.github = profile.githubInput.value.trim();

    current.youtube = profile.youtubeInput.value.trim();

    current.tiktok = profile.tiktokInput.value.trim();

    current.whatsapp = profile.whatsappInput.value.trim();

    current.avatar = profile.profileAvatar.src;

    current.cover = profile.coverPhoto.src;

    localStorage.setItem(
        PROFILE_KEY,
        JSON.stringify(current)
    );

    displayProfile(current);

    updateProfileCompletion();

    closeProfileEditor();

    alert("Profile updated successfully!");

}
/* ==========================================
   PART 4 - DISPLAY PROFILE DATA
========================================== */

function renderProfile() {

    // Header
    displayName.textContent = profileData.fullName;
    displayUsername.textContent = profileData.username;
    displayTitle.textContent = profileData.title;
    displayBio.textContent = profileData.bio;

    // Personal Information
    myN.textContent = profileData.fullName;
    myUsername.textContent = profileData.username;
    myE.textContent = profileData.email;
    myPhone.textContent = profileData.phone;
    myGender.textContent = profileData.gender;
    myDOB.textContent = profileData.dob;
    myCountry.textContent = profileData.country;
    myLocation.textContent = profileData.location;
    myRelationship.textContent = profileData.relationship;
    myOccupation.textContent = profileData.occupation;
    myCompany.textContent = profileData.company;
    myWebsite.textContent = profileData.website;
    myLanguages.textContent = profileData.languages;
    abtMe.textContent = profileData.about;

    // Availability
    availabilityStatus.textContent = profileData.availability;
    employmentType.textContent = profileData.employment;

    // Dating Profile
    relationshipStatus.textContent = profileData.relationship;
    lookingFor.textContent = profileData.lookingFor;
    myAge.textContent = profileData.age;
    myHeight.textContent = profileData.height;
    myReligion.textContent = profileData.religion;
    myState.textContent = profileData.state;
    smoking.textContent = profileData.smoking;
    drinking.textContent = profileData.drinking;
    personality.textContent = profileData.personality;

    agePreference.textContent = profileData.agePreference;
    distancePreference.textContent = profileData.distancePreference;
    genderPreference.textContent = profileData.genderPreference;

    favoriteQuote.textContent = profileData.quote;

    // Images
    if (profileData.avatar) {
        profileAvatar.src = profileData.avatar;
        profilePicPreview.src = profileData.avatar;
    }

    if (profileData.cover) {
        coverPhoto.src = profileData.cover;
    }

    // Social Links
    facebookLink.href = profileData.facebook || "#";
    instagramLink.href = profileData.instagram || "#";
    xLink.href = profileData.twitter || "#";
    linkedinLink.href = profileData.linkedin || "#";
    githubLink.href = profileData.github || "#";
    youtubeLink.href = profileData.youtube || "#";
    tiktokLink.href = profileData.tiktok || "#";
    whatsappLink.href = profileData.whatsapp || "#";

    // Settings Page Sync
    if (typeof settingsName !== "undefined")
        settingsName.value = profileData.fullName;

    if (typeof settingsUsername !== "undefined")
        settingsUsername.value = profileData.username;

    if (typeof settingsEmail !== "undefined")
        settingsEmail.value = profileData.email;

    if (typeof settingsPhone !== "undefined")
        settingsPhone.value = profileData.phone;

    if (typeof settingsLocation !== "undefined")
        settingsLocation.value = profileData.location;

    if (typeof settingsWebsite !== "undefined")
        settingsWebsite.value = profileData.website;

    if (typeof settingsBio !== "undefined")
        settingsBio.value = profileData.bio;

}


/* ==========================================
   PART 5 - EDIT PROFILE
========================================== */

// Open Edit Profile
profileEditBtn?.addEventListener("click", () => {

    profileEditSection.style.display = "block";

    editFullName.value = profileData.fullName;
    editUName.value = profileData.username;
    editE.value = profileData.email;
    editTel.value = profileData.phone;
    editL.value = profileData.location;
    editWebsite.value = profileData.website;
    editDOB.value = profileData.dob;
    editTitle.value = profileData.title;
    editRelationship.value = profileData.relationship;
    editBio.value = profileData.bio;

    editSkills.value = profileData.skills;

    facebookInput.value = profileData.facebook;
    instagramInput.value = profileData.instagram;
    twitterInput.value = profileData.twitter;
    linkedinInput.value = profileData.linkedin;
    githubInput.value = profileData.github;
    youtubeInput.value = profileData.youtube;
    tiktokInput.value = profileData.tiktok;
    whatsappInput.value = profileData.whatsapp;

    profilePrivacy.value = profileData.privacy;

});


// Cancel Editing
cancel?.addEventListener("click", () => {

    profileEditSection.style.display = "none";

});


// Save Profile
saveBtn?.addEventListener("click", () => {

    profileData.fullName = editFullName.value.trim();
    profileData.username = editUName.value.trim();
    profileData.email = editE.value.trim();
    profileData.phone = editTel.value.trim();
    profileData.location = editL.value.trim();
    profileData.website = editWebsite.value.trim();
    profileData.dob = editDOB.value;
    profileData.title = editTitle.value.trim();
    profileData.relationship = editRelationship.value;
    profileData.bio = editBio.value.trim();

    profileData.skills = editSkills.value.trim();

    profileData.facebook = facebookInput.value.trim();
    profileData.instagram = instagramInput.value.trim();
    profileData.twitter = twitterInput.value.trim();
    profileData.linkedin = linkedinInput.value.trim();
    profileData.github = githubInput.value.trim();
    profileData.youtube = youtubeInput.value.trim();
    profileData.tiktok = tiktokInput.value.trim();
    profileData.whatsapp = whatsappInput.value.trim();

    profileData.privacy = profilePrivacy.value;

    saveProfile(); profileEditSection.style.display = "none";
    renderProfile();

    profileEditSection.style.display = "none";

    showToast("✅ Profile updated successfully.");

});


/* ==========================================
   PART 6 - PROFILE & COVER PHOTO
========================================== */

// Profile Picture Upload
uploadPic?.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        profileData.avatar = event.target.result;

        profileAvatar.src = profileData.avatar;
        profilePicPreview.src = profileData.avatar;

        saveProfile();

        showToast("✅ Profile picture updated.");

    };

    reader.readAsDataURL(file);

});



// Cover Photo Upload
uploadCover?.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        profileData.cover = event.target.result;

        coverPhoto.src = profileData.cover;

        saveProfile();

        showToast("✅ Cover photo updated.");

    };

    reader.readAsDataURL(file);

});



/* ==========================================
   PROFILE SHARING
========================================== */

shareProfileBtn?.addEventListener("click", async () => {

    const shareData = {
        title: profileData.fullName,
        text: `${profileData.fullName} on Rhockstar Connect`,
        url: window.location.href
    };

    if (navigator.share) {

        try {

            await navigator.share(shareData);

        } catch (err) {
            console.log(err);
        }

    } else {

        navigator.clipboard.writeText(window.location.href);

        showToast("🔗 Profile link copied.");

    }

});



/* ==========================================
   COPY PROFILE LINK
========================================== */

copyProfileBtn?.addEventListener("click", () => {

    navigator.clipboard.writeText(window.location.href);

    showToast("🔗 Profile link copied.");

});



/* ==========================================
   DOWNLOAD PROFILE
========================================== */

downloadProfileBtn?.addEventListener("click", () => {

    const profileText = `
Rhockstar Connect Profile

Name: ${profileData.fullName}
Username: ${profileData.username}
Title: ${profileData.title}

Bio:
${profileData.bio}

Email:
${profileData.email}

Phone:
${profileData.phone}

Location:
${profileData.location}

Website:
${profileData.website}
`;

    const blob = new Blob([profileText], {
        type: "text/plain"
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;
    a.download = "profile.txt";

    document.body.appendChild(a);

    a.click();

    document.body.removeChild(a);

    URL.revokeObjectURL(url);

    showToast("📄 Profile downloaded.");

});



/* ==========================================
   DOWNLOAD CV
========================================== */

downloadCVBtn?.addEventListener("click", () => {

    if (!profileData.cv) {

        showToast("⚠ No CV uploaded.");

        return;

    }

    window.open(profileData.cv, "_blank");

});

/* ==========================================
   PART 7 - CV MANAGEMENT
========================================== */

// Upload CV
uploadCVBtn?.addEventListener("click", () => {
    cvUpload.click();
});


// Replace CV
replaceCVBtn?.addEventListener("click", () => {
    cvUpload.click();
});


// Select CV
cvUpload?.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        profileData.cv = event.target.result;
        profileData.cvName = file.name;

        saveProfile();

        showToast("✅ CV uploaded successfully.");

    };

    reader.readAsDataURL(file);

});


// Delete CV
deleteCVBtn?.addEventListener("click", () => {

    if (!profileData.cv) {

        showToast("⚠ No CV found.");

        return;

    }

    if (!confirm("Delete your CV?")) return;

    profileData.cv = "";
    profileData.cvName = "";

    saveProfile();

    showToast("🗑 CV deleted.");

});



/* ==========================================
   CERTIFICATE MANAGEMENT
========================================== */

// Open File Picker
uploadCertificateBtn?.addEventListener("click", () => {

    certificateUpload.click();

});


// Upload Certificate
certificateUpload?.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        profileData.certificates.push({

            name: file.name,
            file: event.target.result

        });

        saveProfile();

        renderCertificates();

        showToast("🏆 Certificate uploaded.");

    };

    reader.readAsDataURL(file);

});



function renderCertificates() {

    certificateContainer.innerHTML = "";

    if (profileData.certificates.length === 0) {

        certificateContainer.innerHTML = `
            <p>No certificates uploaded.</p>
        `;

        return;

    }

    profileData.certificates.forEach((certificate, index) => {

        const card = document.createElement("div");

        card.className = "certificate-card";

        card.innerHTML = `
            <h4>${certificate.name}</h4>

            <button class="viewCertificate">
                View
            </button>

            <button class="deleteCertificate">
                Delete
            </button>
        `;

        card.querySelector(".viewCertificate")
            .addEventListener("click", () => {

                window.open(certificate.file);

            });

        card.querySelector(".deleteCertificate")
            .addEventListener("click", () => {

                profileData.certificates.splice(index, 1);

                saveProfile();

                renderCertificates();

                showToast("🗑 Certificate removed.");

            });

        certificateContainer.appendChild(card);

    });

}

/* ==========================================
   PART 7 - CV MANAGEMENT
========================================== */

// Upload CV
uploadCVBtn?.addEventListener("click", () => {
    cvUpload.click();
});


// Replace CV
replaceCVBtn?.addEventListener("click", () => {
    cvUpload.click();
});


// Select CV
cvUpload?.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        profileData.cv = event.target.result;
        profileData.cvName = file.name;

        saveProfile();

        showToast("✅ CV uploaded successfully.");

    };

    reader.readAsDataURL(file);

});


// Delete CV
deleteCVBtn?.addEventListener("click", () => {

    if (!profileData.cv) {

        showToast("⚠ No CV found.");

        return;

    }

    if (!confirm("Delete your CV?")) return;

    profileData.cv = "";
    profileData.cvName = "";

    saveProfile();

    showToast("🗑 CV deleted.");

});



/* ==========================================
   CERTIFICATE MANAGEMENT
========================================== */

// Open File Picker
uploadCertificateBtn?.addEventListener("click", () => {

    certificateUpload.click();

});


// Upload Certificate
certificateUpload?.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

        profileData.certificates.push({

            name: file.name,
            file: event.target.result

        });

        saveProfile();

        renderCertificates();

        showToast("🏆 Certificate uploaded.");

    };

    reader.readAsDataURL(file);

});



function renderCertificates() {

    certificateContainer.innerHTML = "";

    if (profileData.certificates.length === 0) {

        certificateContainer.innerHTML = `
            <p>No certificates uploaded.</p>
        `;

        return;

    }

    profileData.certificates.forEach((certificate, index) => {

        const card = document.createElement("div");

        card.className = "certificate-card";

        card.innerHTML = `
            <h4>${certificate.name}</h4>

            <button class="viewCertificate">
                View
            </button>

            <button class="deleteCertificate">
                Delete
            </button>
        `;

        card.querySelector(".viewCertificate")
            .addEventListener("click", () => {

                window.open(certificate.file);

            });

        card.querySelector(".deleteCertificate")
            .addEventListener("click", () => {

                profileData.certificates.splice(index, 1);

                saveProfile();

                renderCertificates();

                showToast("🗑 Certificate removed.");

            });

        certificateContainer.appendChild(card);

    });

}

/* ==========================================
   PART 8 - PORTFOLIO MANAGEMENT
========================================== */

// Open Portfolio Picker
uploadPortfolioBtn?.addEventListener("click", () => {

    portfolioUpload.click();

});



// Upload Portfolio Files
portfolioUpload?.addEventListener("change", (e) => {

    const files = [...e.target.files];

    if (!files.length) return;

    files.forEach(file => {

        const reader = new FileReader();

        reader.onload = function (event) {

            profileData.portfolio.push({

                name: file.name,
                type: file.type,
                file: event.target.result

            });

            saveProfile();

            renderPortfolio();

        };

        reader.readAsDataURL(file);

    });

    showToast("✅ Portfolio updated.");

});



/* ==========================================
   RENDER PORTFOLIO
========================================== */

function renderPortfolio() {

    portfolioContainer.innerHTML = "";

    if (profileData.portfolio.length === 0) {

        portfolioContainer.innerHTML = `
            <p>No portfolio uploaded.</p>
        `;

        return;

    }

    profileData.portfolio.forEach((item, index) => {

        const card = document.createElement("div");

        card.className = "portfolio-card";

        let preview = "";

        if (item.type.startsWith("image")) {

            preview = `
                <img
                    src="${item.file}"
                    class="portfolio-preview"
                    alt="${item.name}"
                >
            `;

        } else if (item.type.startsWith("video")) {

            preview = `
                <video
                    class="portfolio-preview"
                    controls
                >
                    <source src="${item.file}">
                </video>
            `;

        } else {

            preview = `
                <div class="portfolio-file">
                    📄 PDF / Document
                </div>
            `;

        }

        card.innerHTML = `

            ${preview}

            <h4>${item.name}</h4>

            <div class="portfolio-actions">

                <button class="viewPortfolio">
                    👁 View
                </button>

                <button class="downloadPortfolio">
                    📥 Download
                </button>

                <button class="deletePortfolio">
                    🗑 Delete
                </button>

            </div>

        `;

        // View

        card.querySelector(".viewPortfolio")
            .addEventListener("click", () => {

                window.open(item.file);

            });

        // Download

        card.querySelector(".downloadPortfolio")
            .addEventListener("click", () => {

                const a = document.createElement("a");

                a.href = item.file;
                a.download = item.name;

                document.body.appendChild(a);

                a.click();

                document.body.removeChild(a);

            });

        // Delete

        card.querySelector(".deletePortfolio")
            .addEventListener("click", () => {

                if (!confirm("Delete this portfolio item?"))
                    return;

                profileData.portfolio.splice(index, 1);

                saveProfile();

                renderPortfolio();

                showToast("🗑 Portfolio item deleted.");

            });

        portfolioContainer.appendChild(card);

    });

/* ==========================================
   PART 8 - PORTFOLIO MANAGEMENT
========================================== */

// Open Portfolio Picker
uploadPortfolioBtn?.addEventListener("click", () => {

    portfolioUpload.click();

});



// Upload Portfolio Files
portfolioUpload?.addEventListener("change", (e) => {

    const files = [...e.target.files];

    if (!files.length) return;

    files.forEach(file => {

        const reader = new FileReader();

        reader.onload = function (event) {

            profileData.portfolio.push({

                name: file.name,
                type: file.type,
                file: event.target.result

            });

            saveProfile();

            renderPortfolio();

        };

        reader.readAsDataURL(file);

    });

    showToast("✅ Portfolio updated.");

});



/* ==========================================
   RENDER PORTFOLIO
========================================== */

function renderPortfolio() {

    portfolioContainer.innerHTML = "";

    if (profileData.portfolio.length === 0) {

        portfolioContainer.innerHTML = `
            <p>No portfolio uploaded.</p>
        `;

        return;

    }

    profileData.portfolio.forEach((item, index) => {

        const card = document.createElement("div");

        card.className = "portfolio-card";

        let preview = "";

        if (item.type.startsWith("image")) {

            preview = `
                <img
                    src="${item.file}"
                    class="portfolio-preview"
                    alt="${item.name}"
                >
            `;

        } else if (item.type.startsWith("video")) {

            preview = `
                <video
                    class="portfolio-preview"
                    controls
                >
                    <source src="${item.file}">
                </video>
            `;

        } else {

            preview = `
                <div class="portfolio-file">
                    📄 PDF / Document
                </div>
            `;

        }

        card.innerHTML = `

            ${preview}

            <h4>${item.name}</h4>

            <div class="portfolio-actions">

                <button class="viewPortfolio">
                    👁 View
                </button>

                <button class="downloadPortfolio">
                    📥 Download
                </button>

                <button class="deletePortfolio">
                    🗑 Delete
                </button>

            </div>

        `;

        // View

        card.querySelector(".viewPortfolio")
            .addEventListener("click", () => {

                window.open(item.file);

            });

        // Download

        card.querySelector(".downloadPortfolio")
            .addEventListener("click", () => {

                const a = document.createElement("a");

                a.href = item.file;
                a.download = item.name;

                document.body.appendChild(a);

                a.click();

                document.body.removeChild(a);

            });

        // Delete

        card.querySelector(".deletePortfolio")
            .addEventListener("click", () => {

                if (!confirm("Delete this portfolio item?"))
                    return;

                profileData.portfolio.splice(index, 1);

                saveProfile();

                renderPortfolio();

                showToast("🗑 Portfolio item deleted.");

            });

        portfolioContainer.appendChild(card);

    });

}

/* ==========================================
   PART 9 - PHOTO GALLERY
========================================== */

// Open Photo Picker
uploadPhotoBtn?.addEventListener("click", () => {

    photoUpload.click();

});



// Upload Photos
photoUpload?.addEventListener("change", (e) => {

    const files = [...e.target.files];

    if (!files.length) return;

    files.forEach(file => {

        const reader = new FileReader();

        reader.onload = function (event) {

            profileData.photos.push({

                name: file.name,
                src: event.target.result,
                date: new Date().toLocaleDateString()

            });

            saveProfile();

            renderPhotos();

            updateProfileStats();

        };

        reader.readAsDataURL(file);

    });

    showToast("📷 Photo uploaded.");

});



/* ==========================================
   RENDER PHOTOS
========================================== */

function renderPhotos() {

    recentPhotos.innerHTML = "";

    if (profileData.photos.length === 0) {

        recentPhotos.innerHTML = `
            <p>No photos uploaded.</p>
        `;

        return;

    }

    profileData.photos.forEach((photo, index) => {

        const card = document.createElement("div");

        card.className = "photo-card";

        card.innerHTML = `

            <img
                src="${photo.src}"
                alt="${photo.name}"
                class="gallery-photo"
            >

            <div class="photo-actions">

                <button class="viewPhotoBtn">
                    👁 View
                </button>

                <button class="downloadPhotoBtn">
                    📥 Download
                </button>

                <button class="deletePhotoBtn">
                    🗑 Delete
                </button>

            </div>

        `;

        // View

        card.querySelector(".viewPhotoBtn")
            .addEventListener("click", () => {

                window.open(photo.src);

            });

        // Download

        card.querySelector(".downloadPhotoBtn")
            .addEventListener("click", () => {

                const a = document.createElement("a");

                a.href = photo.src;
                a.download = photo.name;

                document.body.appendChild(a);

                a.click();

                document.body.removeChild(a);

            });

        // Delete

        card.querySelector(".deletePhotoBtn")
            .addEventListener("click", () => {

                if (!confirm("Delete this photo?")) return;

                profileData.photos.splice(index, 1);

                saveProfile();

                renderPhotos();

                updateProfileStats();

                showToast("🗑 Photo deleted.");

            });

        recentPhotos.appendChild(card);

    });

}



/* ==========================================
   UPDATE PHOTO STATISTICS
========================================== */

function updateProfileStats() {

    myPhotos.textContent = profileData.photos.length;

}

/* ==========================================
   PART 10 - SKILLS MANAGEMENT
========================================== */

// Render Skills
function renderSkills() {

    skillsContainer.innerHTML = "";

    if (!profileData.skills || profileData.skills.trim() === "") {

        skillsContainer.innerHTML = `
            <p>No skills added.</p>
        `;

        return;
    }

    const skills = profileData.skills
        .split(",")
        .map(skill => skill.trim())
        .filter(skill => skill !== "");

    skills.forEach((skill, index) => {

        const tag = document.createElement("span");

        tag.className = "skill-tag";

        tag.innerHTML = `
            ${skill}
            <button
                class="deleteSkillBtn"
                data-index="${index}"
            >
                ×
            </button>
        `;

        skillsContainer.appendChild(tag);

    });

    // Delete Skill

    document.querySelectorAll(".deleteSkillBtn")
        .forEach(btn => {

            btn.addEventListener("click", () => {

                const index = Number(btn.dataset.index);

                skills.splice(index, 1);

                profileData.skills = skills.join(", ");

                saveProfile();

                renderSkills();

                showToast("🗑 Skill removed.");

            });

        });

}



/* ==========================================
   ADD NEW SKILL
========================================== */

function addSkill(skill) {

    if (!skill) return;

    let skills = [];

    if (profileData.skills.trim() !== "") {

        skills = profileData.skills
            .split(",")
            .map(item => item.trim());

    }

    if (skills.includes(skill)) {

        showToast("⚠ Skill already exists.");

        return;

    }

    skills.push(skill);

    profileData.skills = skills.join(", ");

    saveProfile();

    renderSkills();

}



/* ==========================================
   IMPORT FROM EDIT PROFILE
========================================== */

saveBtn?.addEventListener("click", () => {

    renderSkills();

});

/* ==========================================
   PART 11 - EXPERIENCE & EDUCATION
========================================== */


/* ========= EXPERIENCE ========= */

// Render Experience
function renderExperience() {

    experienceContainer.innerHTML = "";

    if (profileData.experience.length === 0) {

        experienceContainer.innerHTML =
            "<p>No work experience added.</p>";

        return;
    }

    profileData.experience.forEach((job, index) => {

        const card = document.createElement("div");

        card.className = "experience-card";

        card.innerHTML = `
            <h4>${job.position}</h4>

            <p>${job.company}</p>

            <small>${job.period}</small>

            <div class="card-actions">

                <button class="deleteExperienceBtn">
                    🗑 Delete
                </button>

            </div>
        `;

        card.querySelector(".deleteExperienceBtn")
            .addEventListener("click", () => {

                if (!confirm("Delete this experience?"))
                    return;

                profileData.experience.splice(index, 1);

                saveProfile();

                renderExperience();

                showToast("Experience removed.");

            });

        experienceContainer.appendChild(card);

    });

}


// Add Experience
addExperienceBtn?.addEventListener("click", () => {

    const position = prompt("Job Position");

    if (!position) return;

    const company = prompt("Company");

    if (!company) return;

    const period = prompt("Duration (Example: 2024 - Present)");

    profileData.experience.push({

        position,
        company,
        period

    });

    saveProfile();

    renderExperience();

    showToast("Experience added.");

});



/* ========= EDUCATION ========= */

// Render Education

function renderEducation() {

    educationContainer.innerHTML = "";

    if (profileData.education.length === 0) {

        educationContainer.innerHTML =
            "<p>No education added.</p>";

        return;

    }

    profileData.education.forEach((school, index) => {

        const card = document.createElement("div");

        card.className = "education-card";

        card.innerHTML = `
            <h4>${school.course}</h4>

            <p>${school.school}</p>

            <small>${school.year}</small>

            <div class="card-actions">

                <button class="deleteEducationBtn">
                    🗑 Delete
                </button>

            </div>
        `;

        card.querySelector(".deleteEducationBtn")
            .addEventListener("click", () => {

                if (!confirm("Delete this education?"))
                    return;

                profileData.education.splice(index, 1);

                saveProfile();

                renderEducation();

                showToast("Education removed.");

            });

        educationContainer.appendChild(card);

    });

}


// Add Education
addEducationBtn?.addEventListener("click", () => {

    const course = prompt("Course");

    if (!course) return;

    const school = prompt("School");

    if (!school) return;

    const year = prompt("Year");

    profileData.education.push({

        course,
        school,
        year

    });

    saveProfile();

    renderEducation();

    showToast("Education added.");

});


/* ==========================================
   PART 12 - PROFILE STATISTICS
========================================== */

function updateProfileStats() {

    // Photos
    if (typeof myPhotos !== "undefined")
        myPhotos.textContent = profileData.photos.length;

    // Portfolio
    if (typeof myVideos !== "undefined") {
        const videos = profileData.portfolio.filter(item =>
            item.type.startsWith("video")
        ).length;

        myVideos.textContent = videos;
    }

    // Certificates
    if (typeof jobsPosted !== "undefined")
        jobsPosted.textContent = profileData.jobsPosted || 0;

    if (typeof jobsApplied !== "undefined")
        jobsApplied.textContent = profileData.jobsApplied || 0;

    // General Stats

    myPosts.textContent = profileData.posts || 0;
    myFollowers.textContent = profileData.followers || 0;
    myFollowing.textContent = profileData.following || 0;
    myConnections.textContent = profileData.connections || 0;
    myViews.textContent = profileData.views || 0;

    myLikes.textContent = profileData.likes || 0;
    myComments.textContent = profileData.comments || 0;
    myShares.textContent = profileData.shares || 0;

    // Visitors

    todayVisitors.textContent =
        profileData.todayVisitors || 0;

    weekVisitors.textContent =
        profileData.weekVisitors || 0;

    monthVisitors.textContent =
        profileData.monthVisitors || 0;

    // Dating

    datingVisitors.textContent =
        profileData.datingVisitors || 0;

    likesReceived.textContent =
        profileData.likesReceived || 0;

    likesSent.textContent =
        profileData.likesSent || 0;

    matchesCount.textContent =
        profileData.matches || 0;

    // Activity

    likesCount.textContent =
        profileData.likes || 0;

    commentsCount.textContent =
        profileData.comments || 0;

    sharesCount.textContent =
        profileData.shares || 0;

    savedCount.textContent =
        profileData.saved || 0;

}

 /* ==========================================
   PROFILE COMPLETION
========================================== */

function updateProfileCompletion() {

    const fields = [

        profileData.fullName,
        profileData.username,
        profileData.email,
        profileData.phone,
        profileData.location,
        profileData.bio,
        profileData.avatar,
        profileData.cover,
        profileData.website,
        profileData.title,
        profileData.skills,
        profileData.about,
        profileData.company,
        profileData.occupation,
        profileData.relationship,
        profileData.dob

    ];

    let completed = 0;

    fields.forEach(field => {

        if (
            field &&
            String(field).trim() !== ""
        ) {

            completed++;

        }

    });

    const percent = Math.round(
        (completed / fields.length) * 100
    );

    profilePercent.textContent =
        percent + "%";

    profileProgress.style.width =
        percent + "%";

}  


/* ==========================================
   BADGES
========================================== */

function updateBadges() {

    badgeContainer.innerHTML = "";

    if ((profileData.posts || 0) >= 1) {

        badgeContainer.innerHTML +=
        `<span class="badge">📝 First Post</span>`;

    }

    if ((profileData.connections || 0) >= 10) {

        badgeContainer.innerHTML +=
        `<span class="badge">🤝 Network Builder</span>`;

    }

    if ((profileData.followers || 0) >= 100) {

        badgeContainer.innerHTML +=
        `<span class="badge">⭐ Popular</span>`;

    }

    if (profileData.avatar) {

        badgeContainer.innerHTML +=
        `<span class="badge">📷 Profile Ready</span>`;

    }

    if (profileData.cover) {

        badgeContainer.innerHTML +=
        `<span class="badge">🖼 Cover Added</span>`;

    }

    if (profileData.cv) {

        badgeContainer.innerHTML +=
        `<span class="badge">📄 CV Uploaded</span>`;

    }

    if (profileData.certificates.length > 0) {

        badgeContainer.innerHTML +=
        `<span class="badge">🏆 Certified</span>`;

    }

}


/* ==========================================
   INITIALIZE PROFILE
========================================== */

renderProfile();
renderSkills();
renderExperience();
renderEducation();
renderPortfolio();
renderCertificates();
renderPhotos();

updateProfileStats();
updateProfileCompletion();
updateBadges();


/* ===========================================================
   PART 13 - EXPERIENCE, EDUCATION & UPLOADS
=========================================================== */

function renderExperience() {
    if (!experienceContainer) return;

    experienceContainer.innerHTML = "";

    if (!profile.experience.length) {
        experienceContainer.innerHTML = `
            <p class="empty-text">
                No experience added yet.
            </p>
        `;
        return;
    }

    profile.experience.forEach(job => {
        const card = document.createElement("div");
        card.className = "experience-card";

        card.innerHTML = `
            <h4>${job.title}</h4>
            <p>${job.company}</p>
            <small>${job.period}</small>
        `;

        experienceContainer.appendChild(card);
    });
}

function renderEducation() {
    if (!educationContainer) return;

    educationContainer.innerHTML = "";

    if (!profile.education.length) {
        educationContainer.innerHTML = `
            <p class="empty-text">
                No education added.
            </p>
        `;
        return;
    }

    profile.education.forEach(item => {
        const card = document.createElement("div");
        card.className = "education-card";

        card.innerHTML = `
            <h4>${item.course}</h4>
            <p>${item.school}</p>
        `;

        educationContainer.appendChild(card);
    });
}


/* ================= EXPERIENCE ================= */

if (addExperienceBtn) {

    addExperienceBtn.onclick = () => {

        const title = prompt("Job Title");

        if (!title) return;

        const company = prompt("Company");

        if (!company) return;

        const period = prompt("Period (Example: 2023 - Present)");

        profile.experience.push({
            title,
            company,
            period
        });

        saveProfile();

        renderExperience();

    };

}


/* ================= EDUCATION ================= */

if (addEducationBtn) {

    addEducationBtn.onclick = () => {

        const course = prompt("Course");

        if (!course) return;

        const school = prompt("School");

        if (!school) return;

        profile.education.push({
            course,
            school
        });

        saveProfile();

        renderEducation();

    };

}


/* ================= CERTIFICATES ================= */

if (uploadCertificateBtn && certificateUpload) {

    uploadCertificateBtn.onclick = () => {

        certificateUpload.click();

    };

    certificateUpload.onchange = e => {

        const file = e.target.files[0];

        if (!file) return;

        profile.certificates.push(file.name);

        saveProfile();

        alert("Certificate uploaded.");

    };

}


/* ================= PORTFOLIO ================= */

if (uploadPortfolioBtn && portfolioUpload) {

    uploadPortfolioBtn.onclick = () => {

        portfolioUpload.click();

    };

    portfolioUpload.onchange = e => {

        const file = e.target.files[0];

        if (!file) return;

        profile.portfolio.push(file.name);

        saveProfile();

        alert("Portfolio uploaded.");

    };

}


/* ================= PHOTOS ================= */

if (uploadPhotoBtn && photoUpload) {

    uploadPhotoBtn.onclick = () => {

        photoUpload.click();

    };

    photoUpload.onchange = e => {

        const file = e.target.files[0];

        if (!file) return;

        profile.photos.push(file.name);

        saveProfile();

        alert("Photo uploaded.");

    };

}


/* ================= INITIAL RENDER ================= */

renderExperience();
renderEducation();


/* ==========================================
   DYNAMIC PROFILE LISTS
========================================== */

function renderExperience() {
  const container = document.getElementById("experienceContainer");
  if (!container) return;

  container.innerHTML = "";

  if (!profileData.experience.length) {
    container.innerHTML = "<p>No experience added.</p>";
    return;
  }

  profileData.experience.forEach(exp => {
    container.innerHTML += `
      <div class="experience-card">
        <h4>${exp.position}</h4>
        <p>${exp.company}</p>
        <small>${exp.period}</small>
      </div>
    `;
  });
}

function renderEducation() {
  const container = document.getElementById("educationContainer");
  if (!container) return;

  container.innerHTML = "";

  if (!profileData.education.length) {
    container.innerHTML = "<p>No education added.</p>";
    return;
  }

  profileData.education.forEach(item => {
    container.innerHTML += `
      <div class="education-card">
        <h4>${item.course}</h4>
        <p>${item.school}</p>
        <small>${item.year}</small>
      </div>
    `;
  });
}

function renderCertificates() {
  const container = document.getElementById("certificateContainer");
  if (!container) return;

  container.innerHTML = "";

  if (!profileData.certificates.length) {
    container.innerHTML = "<p>No certificates uploaded.</p>";
    return;
  }

  profileData.certificates.forEach(cert => {
    container.innerHTML += `
      <div class="certificate-card">
        📄 ${cert.name}
      </div>
    `;
  });
}

function renderPortfolio() {
  const container = document.getElementById("portfolioContainer");
  if (!container) return;

  container.innerHTML = "";

  if (!profileData.portfolio.length) {
    container.innerHTML = "<p>No portfolio uploaded.</p>";
    return;
  }

  profileData.portfolio.forEach(item => {

    if (item.type.startsWith("image")) {

      container.innerHTML += `
        <img
          src="${item.url}"
          class="portfolio-item"
        >
      `;

    } else if (item.type.startsWith("video")) {

      container.innerHTML += `
        <video
          class="portfolio-item"
          controls
          src="${item.url}">
        </video>
      `;

    } else {

      container.innerHTML += `
        <a
          href="${item.url}"
          target="_blank"
          class="portfolio-file"
        >
          📄 ${item.name}
        </a>
      `;

    }

  });
}

function renderPhotos() {
  const container = document.getElementById("recentPhotos");
  if (!container) return;

  container.innerHTML = "";

  if (!profileData.photos.length) {
    container.innerHTML = "<p>No photos uploaded.</p>";
    return;
  }

  profileData.photos.forEach(photo => {

    container.innerHTML += `
      <img
        src="${photo}"
        class="photo-item"
      >
    `;

  });
}

function renderEverything() {

  renderExperience();

  renderEducation();

  renderCertificates();

  renderPortfolio();

  renderPhotos();

}

/* ==========================================
   FILE UPLOADS
========================================== */

const portfolioUpload = document.getElementById("portfolioUploadInput");
const certificateUpload = document.getElementById("certificateUpload");
const cvUpload = document.getElementById("cvUpload");
const photoUpload = document.getElementById("photoUpload");

const uploadPortfolioBtn = document.getElementById("uploadPortfolioBtn");
const uploadCertificateBtn = document.getElementById("uploadCertificateBtn");
const uploadCVBtn = document.getElementById("uploadCVBtn");
const replaceCVBtn = document.getElementById("replaceCVBtn");
const deleteCVBtn = document.getElementById("deleteCVBtn");
const uploadPhotoBtn = document.getElementById("uploadPhotoBtn");

/* ========= BUTTONS ========= */

uploadPortfolioBtn?.addEventListener("click", () => {
    portfolioUpload.click();
});

uploadCertificateBtn?.addEventListener("click", () => {
    certificateUpload.click();
});

uploadCVBtn?.addEventListener("click", () => {
    cvUpload.click();
});

replaceCVBtn?.addEventListener("click", () => {
    cvUpload.click();
});

uploadPhotoBtn?.addEventListener("click", () => {
    photoUpload.click();
});


portfolioUpload?.addEventListener("change", e => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

        profileData.portfolio.push({

            name: file.name,

            type: file.type,

            url: reader.result

        });

        saveProfile();

        renderPortfolio();

        showToast("Portfolio uploaded!");

    };

    reader.readAsDataURL(file);

});


certificateUpload?.addEventListener("change", e => {

    const file = e.target.files[0];

    if (!file) return;

    profileData.certificates.push({

        name: file.name

    });

    saveProfile();

    renderCertificates();

    showToast("Certificate uploaded!");

});


cvUpload?.addEventListener("change", e => {

    const file = e.target.files[0];

    if (!file) return;

    profileData.cv = file.name;

    saveProfile();

    showToast("CV uploaded successfully.");

});


deleteCVBtn?.addEventListener("click", () => {

    if (!profileData.cv) {

        alert("No CV uploaded.");

        return;

    }

    if (!confirm("Delete your CV?")) return;

    profileData.cv = "";

    saveProfile();

    showToast("CV deleted.");

});


photoUpload?.addEventListener("change", e => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

        profileData.photos.unshift(reader.result);

        saveProfile();

        renderPhotos();

        showToast("Photo uploaded.");

    };

    reader.readAsDataURL(file);

});
/* ==========================================
   ADD EXPERIENCE
========================================== */

const addExperienceBtn = document.getElementById("addExperienceBtn");

addExperienceBtn?.addEventListener("click", () => {

    const position = prompt("Job Title");

    if (!position) return;

    const company = prompt("Company Name");

    if (!company) return;

    const period = prompt("Duration (Example: 2024 - Present)");

    if (!period) return;

    profileData.experience.push({

        position,

        company,

        period

    });

    saveProfile();

    renderExperience();

    showToast("Experience added.");

});


/* ==========================================
   ADD EDUCATION
========================================== */

const addEducationBtn = document.getElementById("addEducationBtn");

addEducationBtn?.addEventListener("click", () => {

    const course = prompt("Course / Degree");

    if (!course) return;

    const school = prompt("School");

    if (!school) return;

    const year = prompt("Year");

    if (!year) return;

    profileData.education.push({

        course,

        school,

        year

    });

    saveProfile();

    renderEducation();

    showToast("Education added.");

});

/* ==========================================
   PROFILE ACTION BUTTONS
========================================== */

const profileEditBtn = document.getElementById("profileEditBtn");
const profileEditBottomBtn = document.getElementById("profileEditBottomBtn");
const shareProfileBtn = document.getElementById("shareProfileBtn");
const copyProfileBtn = document.getElementById("copyProfileBtn");
const downloadProfileBtn = document.getElementById("downloadProfileBtn");
const downloadCVBtn = document.getElementById("downloadCVBtn");
const qrProfileBtn = document.getElementById("qrProfileBtn");

const profileEditSection = document.getElementById("profileEditSection");
const profileCard = document.querySelector(".profile-card");

function openProfileEditor() {

    if (!profileEditSection) return;

    profileEditSection.style.display = "block";

    profileEditSection.scrollIntoView({
        behavior: "smooth"
    });

}

profileEditBtn?.addEventListener("click", openProfileEditor);

profileEditBottomBtn?.addEventListener("click", openProfileEditor);

});

const shareProfileBottomBtn =
document.getElementById("shareProfileBottomBtn");

async function shareMyProfile() {

    const profileLink =
        window.location.href + "#profile";

    if (navigator.share) {

        try {

            await navigator.share({

                title: profileData.fullName,

                text: "Check out my Rhockstar Connect profile.",

                url: profileLink

            });

        } catch (err) {}

    } else {

        navigator.clipboard.writeText(profileLink);

        showToast("Profile link copied.");

    }

}

shareProfileBtn?.addEventListener("click", shareMyProfile);

shareProfileBottomBtn?.addEventListener("click", shareMyProfile);

const copyProfileBottomBtn =
document.getElementById("copyProfileBottomBtn");

function copyMyProfileLink() {

    const profileLink =
        window.location.href + "#profile";

    navigator.clipboard.writeText(profileLink);

    showToast("Profile link copied.");

}

copyProfileBtn?.addEventListener("click", copyMyProfileLink);

copyProfileBottomBtn?.addEventListener("click", copyMyProfileLink);

downloadProfileBtn?.addEventListener("click", () => {

    const data = JSON.stringify(profileData, null, 2);

    const blob = new Blob([data], {

        type: "application/json"

    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");

    a.href = url;

    a.download = "my-profile.json";

    a.click();

    URL.revokeObjectURL(url);

    showToast("Profile downloaded.");

});

downloadCVBtn?.addEventListener("click", () => {

    if (!profileData.cv) {

        alert("No CV uploaded.");

        return;

    }

    alert("CV: " + profileData.cv);

});

qrProfileBtn?.addEventListener("click", () => {

    alert("QR Code feature coming soon.");

});

const cancel = document.getElementById("cancel");

cancel?.addEventListener("click", () => {

    profileEditSection.style.display = "none";

});

// =========================
// DATING PROFILE
// =========================

const datingGender = document.getElementById("datingGender");
const interestedIn = document.getElementById("interestedIn");
const relationshipStatus = document.getElementById("relationshipStatus");
const lookingFor = document.getElementById("lookingFor");
const myAge = document.getElementById("myAge");
const myHeight = document.getElementById("myHeight");
const myReligion = document.getElementById("myReligion");
const myState = document.getElementById("myState");
const datingCountry = document.getElementById("datingCountry");
const datingOccupation = document.getElementById("datingOccupation");
const myHobbies = document.getElementById("myHobbies");
const smoking = document.getElementById("smoking");
const drinking = document.getElementById("drinking");

function loadDatingProfile() {

    datingGender.textContent = profileData.datingGender || "Not Added";

    interestedIn.textContent = profileData.interestedIn || "Not Added";

    relationshipStatus.textContent =
        profileData.relationshipStatus || "Single";

    lookingFor.textContent =
        profileData.lookingFor || "Friendship";

    myAge.textContent =
        profileData.age || "Not Added";

    myHeight.textContent =
        profileData.height || "Not Added";

    myReligion.textContent =
        profileData.religion || "Not Added";

    myState.textContent =
        profileData.state || "Not Added";

    datingCountry.textContent =
        profileData.country || "Nigeria";

    datingOccupation.textContent =
        profileData.occupation || "Not Added";

    myHobbies.textContent =
        profileData.hobbies || "Not Added";

    smoking.textContent =
        profileData.smoking || "No";

    drinking.textContent =
        profileData.drinking || "Occasionally";

}
// =========================
// DATING GALLERY
// =========================

const uploadDatingPhotos = document.getElementById("uploadDatingPhotos");
const datingGallery = document.getElementById("datingGallery");

uploadDatingPhotos?.addEventListener("click", () => {

    photoUpload.click();

});

photoUpload?.addEventListener("change", (e) => {

    const file = e.target.files[0];

    if (!file) return;

    const reader = new FileReader();

    reader.onload = function () {

        if (!profileData.datingGallery) {

            profileData.datingGallery = [];

        }

        profileData.datingGallery.push(reader.result);

        saveProfile();

        loadDatingGallery();

        showToast("Dating photo uploaded successfully.");

    };

    reader.readAsDataURL(file);

});

function loadDatingGallery() {

    if (!datingGallery) return;

    datingGallery.innerHTML = "";

    if (!profileData.datingGallery ||
        profileData.datingGallery.length === 0) {

        datingGallery.innerHTML = `
            <p class="empty-state">
                No dating photos uploaded yet.
            </p>
        `;

        return;

    }

    profileData.datingGallery.forEach((photo, index) => {

        const card = document.createElement("div");

        card.className = "photo-card";

        card.innerHTML = `
            <img src="${photo}" alt="Dating Photo">

            <button class="danger-btn removeDatingPhoto"
                data-index="${index}">
                🗑 Delete
            </button>
        `;

        datingGallery.appendChild(card);

    });

    document.querySelectorAll(".removeDatingPhoto")
        .forEach(button => {

            button.addEventListener("click", () => {

                const index = Number(button.dataset.index);

                profileData.datingGallery.splice(index, 1);

                saveProfile();

                loadDatingGallery();

                showToast("Dating photo removed.");

            });

        });

}

loadDatingGallery();

// =========================
// PERSONALITY & MATCH PREFERENCES
// =========================

const personality = document.getElementById("personality");

const agePreference = document.getElementById("agePreference");
const distancePreference = document.getElementById("distancePreference");
const genderPreference = document.getElementById("genderPreference");

function loadDatingPreferences() {

    personality.textContent =
        profileData.personality ||
        "Tell people what makes you unique...";

    agePreference.textContent =
        profileData.agePreference ||
        "18 - 30";

    distancePreference.textContent =
        profileData.distancePreference ||
        "50 km";

    genderPreference.textContent =
        profileData.genderPreference ||
        "Female";

}

function updateDatingPreferences(data = {}) {

    profileData.personality =
        data.personality ??
        profileData.personality;

    profileData.agePreference =
        data.agePreference ??
        profileData.agePreference;

    profileData.distancePreference =
        data.distancePreference ??
        profileData.distancePreference;

    profileData.genderPreference =
        data.genderPreference ??
        profileData.genderPreference;

    saveProfile();

    loadDatingPreferences();

}

loadDatingPreferences();

// =========================
// PROFILE BOOST
// =========================

const boostProfileBtn = document.getElementById("boostProfileBtn");

boostProfileBtn?.addEventListener("click", () => {

    if (profileData.profileBoosted) {

        showToast("Your profile is already boosted.");

        return;

    }

    profileData.profileBoosted = true;

    profileData.boostDate = new Date().toISOString();

    saveProfile();

    boostProfileBtn.textContent = "🚀 Profile Boosted";

    boostProfileBtn.disabled = true;

    showToast("Your profile has been boosted.");

});

function loadProfileBoost() {

    if (!boostProfileBtn) return;

    if (profileData.profileBoosted) {

        boostProfileBtn.textContent = "🚀 Profile Boosted";

        boostProfileBtn.disabled = true;

    } else {

        boostProfileBtn.textContent = "Boost My Profile";

        boostProfileBtn.disabled = false;

    }

}

loadProfileBoost();

// =========================
// COMPATIBILITY & PROFILE COMPLETION
// =========================

const compatibilityScore = document.getElementById("compatibilityScore");

const profileProgress = document.getElementById("profileProgress");

const profilePercent = document.getElementById("profilePercent");

function calculateProfileCompletion() {

    const fields = [

        profileData.fullName,

        profileData.username,

        profileData.email,

        profileData.phone,

        profileData.location,

        profileData.bio,

        profileData.title,

        profileData.website,

        profileData.profilePicture,

        profileData.coverPhoto,

        profileData.skills?.length,

        profileData.education?.length,

        profileData.experience?.length,

        profileData.portfolio?.length,

        profileData.cv,

        profileData.country,

        profileData.relationshipStatus,

        profileData.personality,

        profileData.datingGallery?.length,

        profileData.interestedIn

    ];

    let completed = 0;

    fields.forEach(field => {

        if (field && field !== "Not Added") {

            completed++;

        }

    });

    const percent = Math.round(

        (completed / fields.length) * 100

    );

    profileProgress.style.width = percent + "%";

    profilePercent.textContent = percent + "%";

    compatibilityScore.innerHTML = `

        <h2>${percent}%</h2>

        <p>

            ${
                percent >= 90

                ? "Excellent profile. You're highly discoverable."

                : percent >= 70

                ? "Great profile. Add a few more details."

                : percent >= 40

                ? "Good start. Complete more sections."

                : "Complete your profile to improve matching."
            }

        </p>

    `;

}

calculateProfileCompletion();


renderEverything();
renderEducation();



