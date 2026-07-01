function initFeed() {
    console.log("Feed ready");
}

window.initFeed = initFeed;

// js/main.js (or js/feed.js)

import { loadFeedPosts } from "./feed/feedLoader.js";

document.addEventListener("DOMContentLoaded", () => {
    loadFeedPosts();
});

// =======================================
// RHOCKSTAR CONNECT
// feed.js
// Feed Initializer
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    initializeFeed();

});


// =======================================
// INITIALIZE FEED
// =======================================

function initializeFeed() {

    console.log("Feed Initialized");

    loadFeed();

}


// =======================================
// LOAD FEED
// =======================================

function loadFeed() {

    // Firebase loading comes later

    console.log("Loading posts...");

}
