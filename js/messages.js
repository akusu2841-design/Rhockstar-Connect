// ===============================
// RHOCKSTAR CONNECT
// messages.js
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const sendMessageBtn = document.getElementById("sendMessageBtn");
    const chatMessage = document.getElementById("chatMessage");
    const chatBody = document.getElementById("chatBody");
    const searchMessages = document.getElementById("searchMessages");

    // ==========================
    // LOAD CHAT
    // ==========================

    loadMessages();

    // ==========================
    // SEND MESSAGE
    // ==========================

    if (sendMessageBtn && chatMessage && chatBody) {

        sendMessageBtn.addEventListener("click", sendMessage);

        chatMessage.addEventListener("keypress", function (e) {

            if (e.key === "Enter" && !e.shiftKey) {

                e.preventDefault();

                sendMessage();

            }

        });

    }

    function sendMessage() {

        const text = chatMessage.value.trim();

        if (!text) return;

        const message = document.createElement("div");

        message.className = "message sent";

        message.innerHTML = `

            <p>${text}</p>

            <small>${currentTime()}</small>

        `;

        chatBody.appendChild(message);

        chatBody.scrollTop = chatBody.scrollHeight;

        chatMessage.value = "";

        saveMessages();

    }

    // ==========================
    // SEARCH CONVERSATIONS
    // ==========================

    if (searchMessages) {

        searchMessages.addEventListener("keyup", () => {

            const value = searchMessages.value.toLowerCase();

            document
                .querySelectorAll(".conversation-card")
                .forEach(card => {

                    card.style.display =
                        card.innerText
                        .toLowerCase()
                        .includes(value)
                            ? "flex"
                            : "none";

                });

        });

    }

});


// ==========================
// SAVE CHAT
// ==========================

function saveMessages() {

    const chatBody = document.getElementById("chatBody");

    if (!chatBody) return;

    localStorage.setItem(

        "rhockstar_messages",

        chatBody.innerHTML

    );

}


// ==========================
// LOAD CHAT
// ==========================

function loadMessages() {

    const chatBody = document.getElementById("chatBody");

    if (!chatBody) return;

    const saved = localStorage.getItem(

        "rhockstar_messages"

    );

    if (saved) {

        chatBody.innerHTML = saved;

        chatBody.scrollTop = chatBody.scrollHeight;

    }

}


// ==========================
// CURRENT TIME
// ==========================

function currentTime() {

    const now = new Date();

    return now.toLocaleTimeString([], {

        hour: "2-digit",

        minute: "2-digit"

    });

}


// ==========================
// DELETE MESSAGE
// (Optional Feature)
// ==========================

document.addEventListener("dblclick", e => {

    const message = e.target.closest(".message");

    if (!message) return;

    const confirmDelete = confirm(

        "Delete this message?"

    );

    if (!confirmDelete) return;

    message.remove();

    saveMessages();

});


// ==========================
// AUTO SCROLL
// ==========================

window.addEventListener("load", () => {

    const chatBody = document.getElementById("chatBody");

    if (chatBody) {

        chatBody.scrollTop = chatBody.scrollHeight;

    }

});
