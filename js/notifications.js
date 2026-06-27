// ===============================
// RHOCKSTAR CONNECT
// notifications.js
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    loadNotifications();

    updateNotificationCount();

    // ==========================
    // MARK ALL AS READ
    // ==========================

    const markAllReadBtn = document.getElementById("markAllReadBtn");

    if (markAllReadBtn) {

        markAllReadBtn.addEventListener("click", () => {

            document
                .querySelectorAll(".notification-card")
                .forEach(card => {

                    card.classList.remove("unread");

                });

            document
                .querySelectorAll(".markReadBtn")
                .forEach(btn => btn.remove());

            updateNotificationCount();

            saveNotifications();

        });

    }

    // ==========================
    // CLEAR ALL NOTIFICATIONS
    // ==========================

    const clearNotificationsBtn =
        document.getElementById("clearNotificationsBtn");

    if (clearNotificationsBtn) {

        clearNotificationsBtn.addEventListener("click", () => {

            const container =
                document.getElementById("notificationContainer");

            if (!container) return;

            const answer =
                confirm("Clear all notifications?");

            if (!answer) return;

            container.innerHTML = `
                <p class="empty-notification">
                    No notifications available.
                </p>
            `;

            updateNotificationCount();

            saveNotifications();

        });

    }

});


// ==========================
// SINGLE BUTTON ACTIONS
// ==========================

document.addEventListener("click", e => {

    // MARK AS READ

    if (e.target.classList.contains("markReadBtn")) {

        const card =
            e.target.closest(".notification-card");

        if (!card) return;

        card.classList.remove("unread");

        e.target.remove();

        updateNotificationCount();

        saveNotifications();

    }

    // DELETE NOTIFICATION

    if (e.target.classList.contains("deleteNotificationBtn")) {

        const card =
            e.target.closest(".notification-card");

        if (!card) return;

        card.remove();

        updateNotificationCount();

        saveNotifications();

    }

});


// ==========================
// UPDATE COUNTS
// ==========================

function updateNotificationCount() {

    const total =
        document.querySelectorAll(".notification-card").length;

    const unread =
        document.querySelectorAll(".notification-card.unread").length;

    const totalNotifications =
        document.getElementById("totalNotifications");

    const unreadNotifications =
        document.getElementById("unreadNotifications");

    if (totalNotifications)
        totalNotifications.textContent = total;

    if (unreadNotifications)
        unreadNotifications.textContent = unread;

}


// ==========================
// SAVE
// ==========================

function saveNotifications() {

    const container =
        document.getElementById("notificationContainer");

    if (!container) return;

    localStorage.setItem(

        "rhockstar_notifications",

        container.innerHTML

    );

}


// ==========================
// LOAD
// ==========================

function loadNotifications() {

    const container =
        document.getElementById("notificationContainer");

    if (!container) return;

    const saved =
        localStorage.getItem(

            "rhockstar_notifications"

        );

    if (saved) {

        container.innerHTML = saved;

    }

}


// ==========================
// ADD NOTIFICATION
// ==========================

function addNotification(title, message) {

    const container =
        document.getElementById("notificationContainer");

    if (!container) return;

    const card =
        document.createElement("div");

    card.className =
        "notification-card unread";

    card.innerHTML = `

        <h4>${title}</h4>

        <p>${message}</p>

        <small>Just now</small>

        <div class="notification-actions">

            <button class="markReadBtn">

                ✔ Mark Read

            </button>

            <button class="deleteNotificationBtn">

                🗑 Delete

            </button>

        </div>

    `;

    container.prepend(card);

    updateNotificationCount();

    saveNotifications();

}


// ==========================
// OPTIONAL GLOBAL ACCESS
// ==========================

window.addNotification = addNotification;
