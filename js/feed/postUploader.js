// =======================================
// RHOCKSTAR CONNECT
// postUploader.js
// Upload & Publish Posts
// =======================================


// ===============================
// ELEMENTS
// ===============================

const postBtn = $("postBtn");

const textSpace = $("textSpace");


// ===============================
// INITIALIZE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    initializePostUploader();

});


// ===============================
// START
// ===============================

function initializePostUploader() {

    postBtn?.addEventListener("click", publishPost);

}


// ===============================
// PUBLISH POST
// ===============================

async function publishPost() {

    const post = buildPost();

    if (!validatePost(post)) return;

    try {

        setButtonLoading(postBtn, true);

        // Firebase upload comes later

        console.log(post);

        showMessage("Post published successfully!", "success");

        clearPost();

    } catch (error) {

        console.error(error);

        showMessage("Failed to publish post.", "error");

    } finally {

        setButtonLoading(postBtn, false);

    }

}


// ===============================
// BUILD POST OBJECT
// ===============================

function buildPost() {

    return {

        text: textSpace.value.trim(),

        createdAt: new Date().toISOString()

    };

}


// ===============================
// VALIDATE POST
// ===============================

function validatePost(post) {

    if (!post.text) {

        showMessage("Write something before posting.", "error");

        return false;

    }

    return true;

}


// ===============================
// CLEAR POST
// ===============================

function clearPost() {

    textSpace.value = "";

    if (typeof updateCharacterCount === "function") {

        updateCharacterCount();

    }

    if (typeof updatePostButton === "function") {

        updatePostButton();

    }

}
