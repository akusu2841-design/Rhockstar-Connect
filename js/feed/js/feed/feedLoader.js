// =======================================
// RHOCKSTAR CONNECT
// feedLoader.js
// Loads Feed Posts
// =======================================


// ===============================
// ELEMENTS
// ===============================

const feedContainer = $("feedContainer");


// ===============================
// INITIALIZE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    initializeFeedLoader();

});


// ===============================
// START
// ===============================

function initializeFeedLoader() {

    loadPosts();

}


// ===============================
// LOAD POSTS
// ===============================

async function loadPosts() {

    try {

        showLoading();

        // ===================================
        // FIREBASE FETCH COMES LATER
        // ===================================

        console.log("Loading posts...");

        hideLoading();

    } catch (error) {

        console.error(error);

        showMessage("Unable to load posts.", "error");

    }

}


// ===============================
// RENDER POSTS
// ===============================

function renderPosts(posts) {

    if (!feedContainer) return;

    feedContainer.innerHTML = "";

    posts.forEach(post => {

        feedContainer.appendChild(createPostCard(post));

    });

}


// ===============================
// CREATE POST CARD
// ===============================

function createPostCard(post) {

    const card = document.createElement("article");

    card.className = "feed-post";

    card.innerHTML = `
        <h4>${post.author || "Unknown User"}</h4>
        <p>${post.text}</p>
    `;

    return card;

}


// ===============================
// LOADING
// ===============================

function showLoading() {

    console.log("Loading...");

}

function hideLoading() {

    console.log("Finished.");

}
