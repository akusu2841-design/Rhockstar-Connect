// =====================================
// FEED.JS
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    initCharacterCounter();
    initClearButton();
    initImagePreview();
    initVideoPreview();
    initPublishPost();

});

// =====================================
// ELEMENTS
// =====================================

const textSpace = document.getElementById("textSpace");
const charCount = document.getElementById("charCount");

const clearPostBtn = document.getElementById("clearPostBtn");
const postBtn = document.getElementById("postBtn");

const imageInput = document.getElementById("postImages");
const videoInput = document.getElementById("postVideo");

const mediaPreview = document.getElementById("mediaPreview");
const postsContainer = document.getElementById("postsContainer");


// =====================================
// CHARACTER COUNTER
// =====================================

function initCharacterCounter() {

    if (!textSpace || !charCount) return;

    textSpace.addEventListener("input", () => {

        charCount.textContent = textSpace.value.length;

    });

}


// =====================================
// CLEAR POST
// =====================================

function initClearButton() {

    if (!clearPostBtn) return;

    clearPostBtn.addEventListener("click", clearComposer);

}

function clearComposer() {

    textSpace.value = "";
    charCount.textContent = "0";

    imageInput.value = "";
    videoInput.value = "";

    mediaPreview.innerHTML = "";

}


// =====================================
// IMAGE PREVIEW
// =====================================

function initImagePreview() {

    if (!imageInput) return;

    imageInput.addEventListener("change", () => {

        mediaPreview.innerHTML = "";

        [...imageInput.files].forEach(file => {

            const reader = new FileReader();

            reader.onload = e => {

                const img = document.createElement("img");

                img.src = e.target.result;

                img.className = "preview-image";

                mediaPreview.appendChild(img);

            };

            reader.readAsDataURL(file);

        });

    });

}


// =====================================
// VIDEO PREVIEW
// =====================================

function initVideoPreview() {

    if (!videoInput) return;

    videoInput.addEventListener("change", () => {

        mediaPreview.innerHTML = "";

        const file = videoInput.files[0];

        if (!file) return;

        const video = document.createElement("video");

        video.src = URL.createObjectURL(file);

        video.controls = true;

        video.className = "preview-video";

        mediaPreview.appendChild(video);

    });

}


// =====================================
// PUBLISH POST
// =====================================

function initPublishPost() {

    if (!postBtn) return;

    postBtn.addEventListener("click", publishPost);

}

function publishPost() {

    const text = textSpace.value.trim();

    if (
        text === "" &&
        imageInput.files.length === 0 &&
        videoInput.files.length === 0
    ) {

        alert("Write something first.");

        return;

    }

    const card = document.createElement("div");

    card.className = "post-card";

    let mediaHTML = "";

    // Images
    if (imageInput.files.length > 0) {

        mediaHTML += `<div class="post-gallery">`;

        [...imageInput.files].forEach(file => {

            mediaHTML += `
                <img src="${URL.createObjectURL(file)}">
            `;

        });

        mediaHTML += `</div>`;

    }

    // Video
    if (videoInput.files.length > 0) {

        mediaHTML += `
        <video controls class="feed-video">
            <source src="${URL.createObjectURL(videoInput.files[0])}">
        </video>
        `;

    }

    card.innerHTML = `

        <div class="post-header">

            <img
                src="images/profile.jpg"
                class="post-avatar"
                onerror="this.src='images/default-avatar.png'"
            >

            <div class="post-user">

                <h3>You</h3>

                <small>Just now • 🌍 Public</small>

            </div>

        </div>

        <div class="post-content">

            <p>${text.replace(/\n/g,"<br>")}</p>

            ${mediaHTML}

        </div>

        <div class="post-actions">

            <button class="like-btn">👍 Like</button>

            <button class="love-btn">❤️ Love</button>

            <button class="comment-btn">💬 Comment</button>

            <button class="share-btn">🔁 Share</button>

            <button class="bookmark-btn">⭐ Save</button>

        </div>

    `;

    postsContainer.prepend(card);

    clearComposer();

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}
