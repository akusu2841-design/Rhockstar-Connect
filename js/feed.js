// =====================================
// FEED.JS
// =====================================

document.addEventListener("DOMContentLoaded", () => {

    initCharacterCounter();
    initClearButton();
    initImagePreview();
    initVideoPreview();

});


// =====================================
// ELEMENTS
// =====================================

const textSpace = document.getElementById("textSpace");
const charCount = document.getElementById("charCount");

const clearPostBtn = document.getElementById("clearPostBtn");

const imageInput = document.getElementById("postImages");
const videoInput = document.getElementById("postVideo");

const mediaPreview = document.getElementById("mediaPreview");


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

    clearPostBtn.addEventListener("click", () => {

        textSpace.value = "";

        charCount.textContent = "0";

        mediaPreview.innerHTML = "";

        imageInput.value = "";

        videoInput.value = "";

    });

}


// =====================================
// IMAGE PREVIEW
// =====================================

function initImagePreview() {

    if (!imageInput) return;

    imageInput.addEventListener("change", () => {

        mediaPreview.innerHTML = "";

        const files = [...imageInput.files];

        files.forEach(file => {

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

        video.controls = true;

        video.className = "preview-video";

        video.src = URL.createObjectURL(file);

        mediaPreview.appendChild(video);

    });

}
