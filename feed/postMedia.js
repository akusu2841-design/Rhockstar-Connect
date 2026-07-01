// =======================================
// RHOCKSTAR CONNECT
// postMedia.js
// Handles Images, Videos & Camera
// =======================================


// ===============================
// ELEMENTS
// ===============================

const postImages = $("postImages");

const postVideo = $("postVideo");

const cameraBtn = $("cameraBtn");

const cameraInput = $("cameraInput");

const mediaPreview = $("mediaPreview");

const postPreview = $("postPreview");


// ===============================
// INITIALIZE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    initializePostMedia();

});


// ===============================
// START
// ===============================

function initializePostMedia() {

    setupImageUpload();

    setupVideoUpload();

    setupCamera();

}


// ===============================
// IMAGE UPLOAD
// ===============================

function setupImageUpload() {

    if (!postImages) return;

    postImages.addEventListener("change", previewImages);

}

function previewImages() {

    const files = postImages.files;

    if (!files || files.length === 0) return;

    mediaPreview.innerHTML = "";

    [...files].forEach(file => {

        const image = document.createElement("img");

        image.src = URL.createObjectURL(file);

        image.className = "post-preview-image";

        mediaPreview.appendChild(image);

    });

    show(mediaPreview);

}


// ===============================
// VIDEO UPLOAD
// ===============================

function setupVideoUpload() {

    if (!postVideo) return;

    postVideo.addEventListener("change", previewVideo);

}

function previewVideo() {

    const file = postVideo.files[0];

    if (!file) return;

    mediaPreview.innerHTML = "";

    const video = document.createElement("video");

    video.src = URL.createObjectURL(file);

    video.controls = true;

    video.className = "post-preview-video";

    mediaPreview.appendChild(video);

    show(mediaPreview);

}


// ===============================
// CAMERA
// ===============================

function setupCamera() {

    cameraBtn?.addEventListener("click", () => {

        cameraInput?.click();

    });

    cameraInput?.addEventListener("change", () => {

        const file = cameraInput.files[0];

        if (!file) return;

        mediaPreview.innerHTML = "";

        const image = document.createElement("img");

        image.src = URL.createObjectURL(file);

        image.className = "post-preview-image";

        mediaPreview.appendChild(image);

        show(mediaPreview);

    });

}
