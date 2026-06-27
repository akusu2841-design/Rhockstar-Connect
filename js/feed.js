// ===============================
// RHOCKSTAR CONNECT
// feed.js
// Handles Posts, Likes, Comments,
// Replies and Shares
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const postBtn = document.getElementById("postBtn");
    const textSpace = document.getElementById("textSpace");
    const postsContainer = document.getElementById("postsContainer");

    if (!postBtn || !textSpace || !postsContainer) return;

    // ==========================
    // LOAD POSTS
    // ==========================

    loadPosts();

    // ==========================
    // CREATE POST
    // ==========================

    postBtn.addEventListener("click", () => {

        const text = textSpace.value.trim();

        if (!text) {
            alert("Write something first.");
            return;
        }

        const profilePhoto =
            localStorage.getItem("profilePhoto") ||
            "images/profile.jpg";

        const profile =
            JSON.parse(localStorage.getItem("rhockstar_profile")) || {};

        const username =
            profile.name || "Rhockstar User";

        const post = document.createElement("article");

        post.className = "post-card";

        post.innerHTML = `

            <div class="post-header">

                <img
                    src="${profilePhoto}"
                    class="post-profile"
                    alt="Profile">

                <div>

                    <h4>${username}</h4>

                    <small>Just now</small>

                </div>

            </div>

            <p>${text}</p>

            <div class="post-actions">

                <button class="like-btn">
                    ❤️ <span class="like-count">0</span>
                </button>

                <button class="comment-btn-toggle">
                    💬 Comment
                </button>

                <button class="share-btn">
                    🔁 Share
                </button>

            </div>

            <div class="comments-section" style="display:none;">

                <input
                    type="text"
                    class="comment-input"
                    placeholder="Write a comment...">

                <button class="comment-btn">
                    Post
                </button>

                <div class="comments-list"></div>

            </div>

        `;

        postsContainer.prepend(post);

        textSpace.value = "";

        savePosts();

        updatePostStats();

    });

});


// ==========================
// SAVE POSTS
// ==========================

function savePosts() {

    const container =
        document.getElementById("postsContainer");

    if (!container) return;

    localStorage.setItem(
        "feedPosts",
        container.innerHTML
    );

}


// ==========================
// LOAD POSTS
// ==========================

function loadPosts() {

    const container =
        document.getElementById("postsContainer");

    if (!container) return;

    const saved =
        localStorage.getItem("feedPosts");

    if (saved) {

        container.innerHTML = saved;

    }

    updatePostStats();

}


// ==========================
// UPDATE POST STATS
// ==========================

function updatePostStats() {

    const posts =
        document.querySelectorAll(".post-card").length;

    const totalPosts =
        document.getElementById("totalPosts");

    const myPosts =
        document.getElementById("myPosts");

    if (totalPosts)
        totalPosts.textContent = posts;

    if (myPosts)
        myPosts.textContent = posts;

}


// ==========================
// LIKE POST
// ==========================

document.addEventListener("click", e => {

    const btn = e.target.closest(".like-btn");

    if (!btn) return;

    const count =
        btn.querySelector(".like-count");

    count.textContent =
        Number(count.textContent) + 1;

    savePosts();

});


// ==========================
// SHOW COMMENTS
// ==========================

document.addEventListener("click", e => {

    if (!e.target.classList.contains("comment-btn-toggle"))
        return;

    const post =
        e.target.closest(".post-card");

    const section =
        post.querySelector(".comments-section");

    section.style.display =
        section.style.display === "none"
            ? "block"
            : "none";

});


// ==========================
// ADD COMMENT
// ==========================

document.addEventListener("click", e => {

    if (!e.target.classList.contains("comment-btn"))
        return;

    const section =
        e.target.closest(".comments-section");

    const input =
        section.querySelector(".comment-input");

    const comments =
        section.querySelector(".comments-list");

    const text =
        input.value.trim();

    if (!text) return;

    const comment =
        document.createElement("div");

    comment.className = "comment";

    comment.innerHTML = `

        <p class="comment-text">

            ${text}

        </p>

        <button class="reply-btn">

            Reply

        </button>

        <div class="reply-form" style="display:none;">

            <input
                type="text"
                class="reply-input"
                placeholder="Write a reply...">

            <button class="send-reply-btn">

                Send

            </button>

        </div>

        <div class="replies"></div>

    `;

    comments.prepend(comment);

    input.value = "";

    savePosts();

});


// ==========================
// REPLY SYSTEM
// ==========================

document.addEventListener("click", e => {

    if (e.target.classList.contains("reply-btn")) {

        const form =
            e.target.nextElementSibling;

        form.style.display =
            form.style.display === "none"
                ? "block"
                : "none";

    }

    if (e.target.classList.contains("send-reply-btn")) {

        const form =
            e.target.parentElement;

        const input =
            form.querySelector(".reply-input");

        const text =
            input.value.trim();

        if (!text) return;

        const replies =
            form.nextElementSibling;

        const reply =
            document.createElement("div");

        reply.className = "reply";

        reply.textContent = text;

        replies.prepend(reply);

        input.value = "";

        form.style.display = "none";

        savePosts();

    }

});


// ==========================
// SHARE POST
// ==========================

document.addEventListener("click", e => {

    if (!e.target.classList.contains("share-btn"))
        return;

    alert("Post shared successfully!");

});
