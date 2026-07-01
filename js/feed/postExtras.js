// =======================================
// RHOCKSTAR CONNECT
// postExtras.js
// Handles Emoji, GIF, Feeling,
// Location, Poll & Voice
// =======================================


// ===============================
// ELEMENTS
// ===============================

const emojiBtn = $("emojiBtn");

const gifBtn = $("gifBtn");

const feelingBtn = $("feelingBtn");

const locationBtn = $("locationBtn");

const pollBtn = $("pollBtn");

const voiceBtn = $("voiceBtn");

const feelingPreview = $("feelingPreview");

const locationPreview = $("locationPreview");


// ===============================
// INITIALIZE
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    initializePostExtras();

});


// ===============================
// START
// ===============================

function initializePostExtras() {

    setupEmoji();

    setupGif();

    setupFeeling();

    setupLocation();

    setupPoll();

    setupVoice();

}


// ===============================
// EMOJI
// ===============================

function setupEmoji() {

    emojiBtn?.addEventListener("click", () => {

        showMessage("Emoji picker coming soon.", "info");

    });

}


// ===============================
// GIF
// ===============================

function setupGif() {

    gifBtn?.addEventListener("click", () => {

        showMessage("GIF picker coming soon.", "info");

    });

}


// ===============================
// FEELING
// ===============================

function setupFeeling() {

    feelingBtn?.addEventListener("click", () => {

        const feeling = prompt("How are you feeling?");

        if (!feeling) return;

        feelingPreview.textContent = `😊 Feeling: ${feeling}`;

        show(feelingPreview);

    });

}


// ===============================
// LOCATION
// ===============================

function setupLocation() {

    locationBtn?.addEventListener("click", () => {

        const location = prompt("Enter your location");

        if (!location) return;

        locationPreview.textContent = `📍 ${location}`;

        show(locationPreview);

    });

}


// ===============================
// POLL
// ===============================

function setupPoll() {

    pollBtn?.addEventListener("click", () => {

        showMessage("Poll creator coming soon.", "info");

    });

}


// ===============================
// VOICE
// ===============================

function setupVoice() {

    voiceBtn?.addEventListener("click", () => {

        showMessage("Voice recording coming soon.", "info");

    });

}
