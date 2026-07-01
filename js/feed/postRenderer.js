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
