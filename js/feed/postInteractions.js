// =======================================
// RHOCKSTAR CONNECT
// postInteractions.js
// Handles Post Interactions
// =======================================


// ===============================
// INITIALIZE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    initializePostInteractions();

});


// ===============================
// START
// ===============================

function initializePostInteractions() {

    setupLikes();

    setupComments();

    setupShares();

    setupSaves();

}


// ===============================
// LIKE
// ===============================

function setupLikes() {

    document.addEventListener("click", (event) => {

        const button = event.target.closest(".likeBtn");

        if (!button) return;

        toggleLike(button);

    });

}


function toggleLike(button) {

    button.classList.toggle("liked");

    const count = button.querySelector(".likeCount");

    if (!count) return;

    let likes = Number(count.textContent);

    if (button.classList.contains("liked")) {

        likes++;

    } else {

        likes--;

    }

    count.textContent = likes;

}


// ===============================
// COMMENT
// ===============================

function setupComments() {

    document.addEventListener("click", (event) => {

        const button = event.target.closest(".commentBtn");

        if (!button) return;

        showMessage("Comments will be connected to Firebase later.", "info");

    });

}


// ===============================
// SHARE
// ===============================

function setupShares() {

    document.addEventListener("click", (event) => {

        const button = event.target.closest(".shareBtn");

        if (!button) return;

        showMessage("Share feature coming soon.", "info");

    });

}


// ===============================
// SAVE
// ===============================

function setupSaves() {

    document.addEventListener("click", (event) => {

        const button = event.target.closest(".saveBtn");

        if (!button) return;

        button.classList.toggle("saved");

        showMessage("Post saved.", "success");

    });

                                       }
