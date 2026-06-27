// ===============================
// RHOCKSTAR CONNECT
// connections.js
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    updateConnectionStats();

    // ==========================
    // SEARCH CONNECTIONS
    // ==========================

    const searchInput = document.getElementById("searchInput");

    if (searchInput) {

        searchInput.addEventListener("keyup", () => {

            const value = searchInput.value.toLowerCase();

            document
                .querySelectorAll("#connections .user-card")
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
// CONNECTION BUTTONS
// ==========================

document.addEventListener("click", e => {

    // --------------------------
    // ACCEPT REQUEST
    // --------------------------

    if (e.target.classList.contains("accept-btn")) {

        const card = e.target.closest(".user-card");

        if (!card) return;

        alert("Connection accepted.");

        card.remove();

        updateConnectionStats();

    }

    // --------------------------
    // DECLINE REQUEST
    // --------------------------

    if (e.target.classList.contains("decline-btn")) {

        const card = e.target.closest(".user-card");

        if (!card) return;

        card.remove();

        updateConnectionStats();

    }

    // --------------------------
    // CONNECT
    // --------------------------

    if (e.target.classList.contains("connect-btn")) {

        e.target.innerHTML = "✔ Connected";

        e.target.disabled = true;

        updateConnectionStats();

    }

    // --------------------------
    // REMOVE CONNECTION
    // --------------------------

    if (e.target.classList.contains("remove-btn")) {

        if (!confirm("Remove this connection?")) return;

        const card = e.target.closest(".user-card");

        if (card) {

            card.remove();

            updateConnectionStats();

        }

    }

    // --------------------------
    // MESSAGE USER
    // --------------------------

    if (e.target.classList.contains("message-btn")) {

        if (typeof showPage === "function") {

            showPage("messages");

        }

    }

});


// ==========================
// UPDATE CONNECTION STATS
// ==========================

function updateConnectionStats() {

    const totalConnections =
        document.querySelectorAll(
            "#connections .remove-btn"
        ).length;

    const pendingRequests =
        document.querySelectorAll(
            "#connections .accept-btn"
        ).length;

    const suggestedUsers =
        document.querySelectorAll(
            "#connections .connect-btn:not(:disabled)"
        ).length;

    const total =
        document.getElementById("totalConnections");

    const pending =
        document.getElementById("pendingRequests");

    const suggested =
        document.getElementById("suggestedUsers");

    const settingsConnections =
        document.getElementById("settingsConnections");

    const myConnections =
        document.getElementById("myConnections");

    if (total)
        total.textContent = totalConnections;

    if (pending)
        pending.textContent = pendingRequests;

    if (suggested)
        suggested.textContent = suggestedUsers;

    if (settingsConnections)
        settingsConnections.textContent = totalConnections;

    if (myConnections)
        myConnections.textContent = totalConnections;

}


// ==========================
// SAVE CONNECTIONS
// ==========================

function saveConnections() {

    const container = document.getElementById("connections");

    if (!container) return;

    localStorage.setItem(

        "rhockstar_connections",

        container.innerHTML

    );

}


// ==========================
// LOAD CONNECTIONS
// ==========================

function loadConnections() {

    const container = document.getElementById("connections");

    if (!container) return;

    const saved = localStorage.getItem(

        "rhockstar_connections"

    );

    if (saved) {

        container.innerHTML = saved;

    }

    updateConnectionStats();

}


// ==========================
// AUTO SAVE
// ==========================

document.addEventListener("click", e => {

    if (

        e.target.classList.contains("accept-btn") ||

        e.target.classList.contains("decline-btn") ||

        e.target.classList.contains("connect-btn") ||

        e.target.classList.contains("remove-btn")

    ) {

        saveConnections();

    }

});


// ==========================
// LOAD WHEN PAGE OPENS
// ==========================

window.addEventListener("load", () => {

    loadConnections();

});
