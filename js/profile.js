// =========================================
// profile.js
// Rhockstar Connect Profile Manager
// =========================================

const PROFILE_KEY = "rhockstar_profile";
const PROFILE_PHOTO = "profilePhoto";
const COVER_PHOTO = "coverPhoto";

/* ==========================
   Initialize
========================== */

function initProfile() {

    loadProfile();

    initProfileEditor();

    initProfilePhoto();

    initCoverPhoto();

}

/* ==========================
   Profile Editor
========================== */

function initProfileEditor() {

    const editBtn =
        document.getElementById("editProfileBtn") ||
        document.getElementById("profileEditBtn");

    const cancelBtn =
        document.getElementById("cancel");

    const saveBtn =
        document.getElementById("saveBtn");

    const profilePage =
        document.getElementById("profile");

    const editSection =
        document.getElementById("profileEditSection");

    if (editBtn) {

        editBtn.addEventListener("click", () => {

            if (profilePage)
                profilePage.style.display = "none";

            if (editSection)
                editSection.style.display = "block";

        });

    }

    if (cancelBtn) {

        cancelBtn.addEventListener("click", () => {

            if (editSection)
                editSection.style.display = "none";

            if (profilePage)
                profilePage.style.display = "block";

        });

    }

    if (saveBtn) {

        saveBtn.addEventListener("click", saveProfile);

    }

}

/* ==========================
   Save Profile
========================== */

function saveProfile() {

    const profile = {

        name: $("editFullName")?.value || "",

        username: $("editUName")?.value || "",

        email: $("editE")?.value || "",

        phone: $("editTel")?.value || "",

        location: $("editL")?.value || "",

        title: $("editTitle")?.value || "",

        bio: $("editBio")?.value || "",

        skills: $("editSkills")?.value || ""

    };

    Storage.set(PROFILE_KEY, profile);

    loadProfile();

    const profilePage =
        $("profile");

    const editSection =
        $("profileEditSection");

    if (editSection)
        editSection.style.display = "none";

    if (profilePage)
        profilePage.style.display = "block";

    alert("Profile updated successfully.");

}

/* ==========================
   Load Profile
========================== */

function loadProfile() {

    const profile = Storage.get(PROFILE_KEY);

    if (!profile) return;

    if ($("displayName"))
        $("displayName").textContent = profile.name;

    if ($("myN"))
        $("myN").textContent = profile.name;

    if ($("displayUsername"))
        $("displayUsername").textContent = profile.username;

    if ($("myE"))
        $("myE").textContent = profile.email;

    if ($("myPhone"))
        $("myPhone").textContent = profile.phone;

    if ($("myL"))
        $("myL").textContent = profile.location;

    if ($("displayTitle"))
        $("displayTitle").textContent = profile.title;

    if ($("myPT"))
        $("myPT").textContent = profile.title;

    if ($("displayBio"))
        $("displayBio").textContent = profile.bio;

    if ($("abtMe"))
        $("abtMe").textContent = profile.bio;

    if ($("mySkills"))
        $("mySkills").textContent = profile.skills;

    if ($("myS"))
        $("myS").textContent = profile.skills;

}

/* ==========================
   Upload Profile Picture
========================== */

function initProfilePhoto() {

    const upload =
        $("uploadPic");

    if (!upload) return;

    const saved =
        localStorage.getItem(PROFILE_PHOTO);

    if (saved) {

        if ($("profileAvatar"))
            $("profileAvatar").src = saved;

        if ($("profilePicPreview"))
            $("profilePicPreview").src = saved;

    }

    upload.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onload = function (e) {

            const image = e.target.result;

            if ($("profileAvatar"))
                $("profileAvatar").src = image;

            if ($("profilePicPreview"))
                $("profilePicPreview").src = image;

            localStorage.setItem(
                PROFILE_PHOTO,
                image
            );

        };

        reader.readAsDataURL(file);

    });

}

/* ==========================
   Upload Cover Photo
========================== */

function initCoverPhoto() {

    const upload =
        $("uploadCover");

    if (!upload) return;

    const saved =
        localStorage.getItem(COVER_PHOTO);

    if (saved && $("coverPhoto")) {

        $("coverPhoto").src = saved;

    }

    upload.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) return;

        const reader =
            new FileReader();

        reader.onload = function (e) {

            if ($("coverPhoto"))
                $("coverPhoto").src = e.target.result;

            localStorage.setItem(
                COVER_PHOTO,
                e.target.result
            );

        };

        reader.readAsDataURL(file);

    });

}
