// =======================================
// RHOCKSTAR CONNECT
// postComposer.js
// Handles Post Composer Only
// =======================================


// ===============================
// ELEMENTS
// ===============================

const textSpace = $("textSpace");

const postBtn = $("postBtn");

const clearPostBtn = $("clearPostBtn");

const charCount = $("charCount");

const MAX_CHARACTERS = 500;


// ===============================
// INITIALIZE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    initializePostComposer();

});


// ===============================
// START
// ===============================

function initializePostComposer() {

    if (!textSpace) return;

    updateCharacterCount();

    updatePostButton();

    textSpace.addEventListener("input", () => {

        updateCharacterCount();

        updatePostButton();

    });

    clearPostBtn?.addEventListener("click", clearComposer);

}


// ===============================
// CHARACTER COUNTER
// ===============================

function updateCharacterCount() {

    const length = textSpace.value.length;

    charCount.textContent = `${length}/${MAX_CHARACTERS}`;

    if (length >= MAX_CHARACTERS) {

        charCount.style.color = "#ff3b30";

    } else {

        charCount.style.color = "";

    }

}


// ===============================
// ENABLE / DISABLE POST BUTTON
// ===============================

function updatePostButton() {

    const text = textSpace.value.trim();

    postBtn.disabled = text.length === 0;

}


// ===============================
// CLEAR POST
// ===============================

function clearComposer() {

    textSpace.value = "";

    updateCharacterCount();

    updatePostButton();

    showMessage("Post cleared.", "info");

}
