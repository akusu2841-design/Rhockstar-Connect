// =======================================
// RHOCKSTAR CONNECT
// postUploader.js
// Upload & Publish Posts
// =======================================

import {
    auth,
    db,
    storage
} from "../firebase.js";

import {
    collection,
    addDoc,
    serverTimestamp,
    doc,
    getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import {
    ref,
    uploadBytes,
    getDownloadURL
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-storage.js";


// =======================================
// ELEMENTS
// =======================================

const postBtn = $("postBtn");

const textSpace = $("textSpace");

const postImages = $("postImages");

const postVideo = $("postVideo");

const cameraInput = $("cameraInput");

const privacy = $("privacy");

const feelingPreview = $("feelingPreview");

const locationPreview = $("locationPreview");

const pollContainer = $("pollContainer");

const pollQuestion = $("pollQuestion");

const pollOption1 = $("pollOption1");

const pollOption2 = $("pollOption2");

const pollOption3 = $("pollOption3");

const pollOption4 = $("pollOption4");


// =======================================
// INITIALIZE
// =======================================

document.addEventListener("DOMContentLoaded", initializePostUploader);


// =======================================
// START
// =======================================

function initializePostUploader() {

    postBtn?.addEventListener("click", publishPost);

}


// =======================================
// PUBLISH POST
// =======================================

async function publishPost() {

    const currentUser = auth.currentUser;

    if (!currentUser) {

        showMessage("Please login first.", "error");

        return;

    }

    try {

        setButtonLoading(postBtn, true);

        const profile = await loadUserProfile(currentUser.uid);

        const imageUrls = await uploadImages(currentUser.uid);

        const videoUrl = await uploadVideo(currentUser.uid);

        const poll = buildPoll();

        const post = buildPost({

            user: currentUser,

            profile,

            imageUrls,

            videoUrl,

            poll

        });

        if (!validatePost(post)) {

            setButtonLoading(postBtn, false);

            return;

        }

        const postRef = await addDoc(

            collection(db, "posts"),

            post

        );

        await updatePostId(postRef.id);

        clearPost();

        showMessage(

            "Post published successfully!",

            "success"

        );

    } catch (error) {

        console.error(error);

        showMessage(

            error.message ||

            "Failed to publish post.",

            "error"

        );

    } finally {

        setButtonLoading(postBtn, false);

    }

}


// =======================================
// LOAD USER PROFILE
// =======================================

async function loadUserProfile(uid) {

    const snapshot = await getDoc(

        doc(db, "users", uid)

    );

    if (!snapshot.exists()) {

        throw new Error("Profile not found.");

    }

    return snapshot.data();

            }
// =======================================
// IMAGE UPLOAD
// =======================================

async function uploadImages(uid) {

    const urls = [];

    if (!postImages?.files?.length) {

        return urls;

    }

    for (const file of postImages.files) {

        const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}_${file.name}`;

        const storageRef = ref(

            storage,

            `posts/${uid}/images/${fileName}`

        );

        await uploadBytes(storageRef, file);

        const downloadURL = await getDownloadURL(storageRef);

        urls.push(downloadURL);

    }

    return urls;

}


// =======================================
// VIDEO UPLOAD
// =======================================

async function uploadVideo(uid) {

    if (!postVideo?.files?.length) {

        return "";

    }

    const file = postVideo.files[0];

    const fileName = `${Date.now()}_${Math.random().toString(36).slice(2)}_${file.name}`;

    const storageRef = ref(

        storage,

        `posts/${uid}/videos/${fileName}`

    );

    await uploadBytes(storageRef, file);

    return await getDownloadURL(storageRef);

}


// =======================================
// BUILD POLL
// =======================================

function buildPoll() {

    if (!pollContainer) {

        return null;

    }

    const question = pollQuestion?.value.trim() || "";

    const options = [

        pollOption1?.value.trim(),

        pollOption2?.value.trim(),

        pollOption3?.value.trim(),

        pollOption4?.value.trim()

    ].filter(Boolean);

    if (!question || options.length < 2) {

        return null;

    }

    return {

        question,

        options: options.map(option => ({

            text: option,

            votes: 0

        })),

        totalVotes: 0

    };

}


// =======================================
// BUILD POST
// =======================================

function buildPost({

    user,

    profile,

    imageUrls,

    videoUrl,

    poll

}) {

    return {

        postId: "",

        uid: user.uid,

    

        text: textSpace.value.trim(),

        images: imageUrls,

        video: videoUrl,

        poll,

        feeling: feelingPreview?.dataset.feeling || "",

        location: locationPreview?.dataset.location || "",

        privacy: privacy?.value || "public",

        hashtags: extractHashtags(

            textSpace.value.trim()

        ),

        mentions: extractMentions(

            textSpace.value.trim()

        ),

        likesCount: 0,

        commentsCount: 0,

        sharesCount: 0,

        savesCount: 0,

        edited: false,

        pinned: false,

        archived: false,

        deleted: false,

        createdAt: serverTimestamp(),

        updatedAt: serverTimestamp()

    };

}


// =======================================
// EXTRACT HASHTAGS
// =======================================

function extractHashtags(text) {

    return text.match(/#\w+/g) || [];

}


// =======================================
// EXTRACT MENTIONS
// =======================================

function extractMentions(text) {

    return text.match(/@\w+/g) || [];

}
// =======================================
// VALIDATE POST
// =======================================

function validatePost(post) {

    const hasText = post.text.length > 0;

    const hasImages = post.images.length > 0;

    const hasVideo = post.video !== "";

    const hasPoll = post.poll !== null;

    if (!hasText && !hasImages && !hasVideo && !hasPoll) {

        showMessage(

            "Your post is empty.",

            "error"

        );

        return false;

    }

    if (post.text.length > 5000) {

        showMessage(

            "Maximum post length is 5000 characters.",

            "error"

        );

        return false;

    }

    if (post.images.length > 10) {

        showMessage(

            "You can upload a maximum of 10 images.",

            "error"

        );

        return false;

    }

    return true;

}


// =======================================
// UPDATE POST ID
// =======================================

async function updatePostId(postId) {

    const {
        updateDoc
    } = await import(

        "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js"

    );

    await updateDoc(

        doc(db, "posts", postId),

        {

            postId

        }

    );

}


// =======================================
// CLEAR POST
// =======================================

function clearPost() {

    if (textSpace) {

        textSpace.value = "";

    }

    if (postImages) {

        postImages.value = "";

    }

    if (postVideo) {

        postVideo.value = "";

    }

    if (cameraInput) {

        cameraInput.value = "";

    }

    resetPoll();

    resetFeeling();

    resetLocation();

    if (typeof updateCharacterCount === "function") {

        updateCharacterCount();

    }

    if (typeof updatePostButton === "function") {

        updatePostButton();

    }

    if (typeof renderMediaPreview === "function") {

        renderMediaPreview();

    }

}


// =======================================
// RESET POLL
// =======================================

function resetPoll() {

    if (!pollContainer) return;

    pollQuestion.value = "";

    pollOption1.value = "";

    pollOption2.value = "";

    pollOption3.value = "";

    pollOption4.value = "";

    pollContainer.style.display = "none";

}


// =======================================
// RESET FEELING
// =======================================

function resetFeeling() {

    if (!feelingPreview) return;

    feelingPreview.textContent = "";

    delete feelingPreview.dataset.feeling;

}


// =======================================
// RESET LOCATION
// =======================================

function resetLocation() {

    if (!locationPreview) return;

    locationPreview.textContent = "";

    delete locationPreview.dataset.location;

}


// =======================================
// PUBLIC EXPORTS
// =======================================

export {

    publishPost,

    buildPost,

    validatePost,

    clearPost

};
