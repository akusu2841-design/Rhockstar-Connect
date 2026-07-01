// =======================================
// RHOCKSTAR CONNECT
// postRenderer.js
// Load & Render Feed
// =======================================

import { db } from "../firebase.js";

import {
    collection,
    query,
    orderBy,
    onSnapshot,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";


// =======================================
// ELEMENTS
// =======================================

const feedContainer = $("feedContainer");


// =======================================
// INITIALIZE
// =======================================

document.addEventListener("DOMContentLoaded", () => {

    initializeFeedRenderer();

});


// =======================================
// START
// =======================================

function initializeFeedRenderer() {

    if (!feedContainer) return;

    loadFeedRealtime();

}


// =======================================
// REALTIME FEED
// =======================================

function loadFeedRealtime() {

    const postsQuery = query(

        collection(db, "posts"),

        orderBy("createdAt", "desc")

    );

    onSnapshot(postsQuery,

        async(snapshot) => {

            feedContainer.innerHTML = "";

            if (snapshot.empty) {

                feedContainer.innerHTML = emptyFeed();

                return;

            }

            for (const postDoc of snapshot.docs) {

                const post = {

                    postId: postDoc.id,

                    ...postDoc.data()

                };

                const user = await loadUser(post.uid);

                feedContainer.insertAdjacentHTML(

                    "beforeend",

                    await createPost(post, user)

                );

            }

        }

    );

}


// =======================================
// LOAD USER
// =======================================

async function loadUser(uid) {

    try {

        const userRef = doc(db, "users", uid);

        const snapshot = await getDoc(userRef);

        if (!snapshot.exists()) {

            return null;

        }

        return snapshot.data();

    }

    catch (error) {

        console.error(error);

        return null;

    }

}


// =======================================
// CREATE POST
// =======================================

async function createPost(post, user) {

    if (!user) {

        return "";

    }

    return `

<div class="post-card"

     data-post-id="${post.postId}"

     data-user-id="${post.uid}">

    ${postHeader(post, user)}

    ${postContent(post)}

    ${postMedia(post)}

    ${postFooter(post)}

</div>

`;

      }
// =======================================
// POST STATS
// =======================================

function postStats(post) {

    return `

<div class="post-stats">

    <span>

        👍 ${post.likesCount || 0}

    </span>

    <span>

        💬 ${post.commentsCount || 0} Comments

    </span>

    <span>

        🔁 ${post.sharesCount || 0} Shares

    </span>

    <span>

        ⭐ ${post.savesCount || 0} Saves

    </span>

</div>

`;

}


// =======================================
// POST ACTIONS
// =======================================

function postActions(post) {

    return `

<div class="post-actions">

    <button

        class="like-btn"

        data-post-id="${post.postId}">

        👍 Like

    </button>

    <button

        class="love-btn"

        data-post-id="${post.postId}">

        ❤️ Love

    </button>

    <button

        class="comment-btn"

        data-post-id="${post.postId}">

        💬 Comment

    </button>

    <button

        class="share-btn"

        data-post-id="${post.postId}">

        🔁 Share

    </button>

    <button

        class="bookmark-btn"

        data-post-id="${post.postId}">

        ⭐ Save

    </button>

</div>

`;

}


// =======================================
// COMMENTS
// =======================================

function commentsBox(post) {

    return `

<div

class="comments-box"

id="comments-${post.postId}">

<div

class="comment-list">

</div>

<div class="comment-input">

<textarea

placeholder="Write a comment..."

data-post-id="${post.postId}">

</textarea>

<button

class="send-comment-btn"

data-post-id="${post.postId}">

Send

</button>

</div>

</div>

`;

}


// =======================================
// POST FOOTER
// =======================================

function postFooter(post) {

    return `

${postStats(post)}

${postActions(post)}

${commentsBox(post)}

`;

}
