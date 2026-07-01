// ======================================
// RHOCKSTAR CONNECT
// FEED LOADER (REAL-TIME POSTS)
// ======================================

import {
    collection,
    query,
    orderBy,
    onSnapshot
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "../firebase.js";

// ===============================
// LOAD POSTS IN REAL TIME
// ===============================

export function loadFeedPosts() {

    const feedContainer = document.getElementById("feedContainer");

    if (!feedContainer) return;

    const postsRef = collection(db, "posts");
    const postsQuery = query(postsRef, orderBy("createdAt", "desc"));

    onSnapshot(postsQuery, (snapshot) => {

        // Clear old hardcoded posts
        feedContainer.innerHTML = "";

        snapshot.forEach((doc) => {

            const post = doc.data();

            const postElement = createPostElement(post);
            feedContainer.appendChild(postElement);

        });

    });

}

// ===============================
// CREATE POST UI
// ===============================

function createPostElement(post) {

    const div = document.createElement("div");
    div.classList.add("post");

    div.innerHTML = `
        <div class="post-header">
            <img src="${post.userPhoto || 'images/default-avatar.png'}" />
            <div>
                <h4>${post.username || "Unknown User"}</h4>
                <small>${formatTime(post.createdAt)}</small>
            </div>
        </div>

        <div class="post-content">
            <p>${post.text || ""}</p>

            ${post.image ? `<img src="${post.image}" class="post-image"/>` : ""}
        </div>
    `;

    return div;
}

// ===============================
// FORMAT TIME
// ===============================

function formatTime(timestamp) {
    if (!timestamp) return "just now";

    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString();
}
