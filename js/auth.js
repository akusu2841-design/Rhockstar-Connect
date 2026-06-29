// ===============================
// RHOCKSTAR CONNECT
// auth.js
// ===============================

"use strict";

// ===============================
// AUTH CLASS
// ===============================

class Auth {

    // ---------------------------
    // Register
    // ---------------------------

    static register(user) {

        const users = StorageManager.getArray(STORAGE_KEYS.USERS);

        const exists = users.find(u =>

            u.email.toLowerCase() === user.email.toLowerCase()

        );

        if (exists) {

            AppUtils.showToast(

                "Email already exists.",

                "error"

            );

            return false;

        }

        user.id = AppUtils.generateId();

        user.createdAt = new Date().toISOString();

        user.updatedAt = new Date().toISOString();

        user.verified = false;

        user.online = true;

        users.push(user);

        StorageManager.save(

            STORAGE_KEYS.USERS,

            users

        );

        StorageManager.save(

            STORAGE_KEYS.USER,

            user

        );

        return true;

    }

    // ---------------------------
    // Login
    // ---------------------------

    static login(email, password) {

        const users = StorageManager.getArray(

            STORAGE_KEYS.USERS

        );

        const user = users.find(u =>

            u.email.toLowerCase() === email.toLowerCase() &&

            u.password === password

        );

        if (!user) {

            AppUtils.showToast(

                "Invalid email or password.",

                "error"

            );

            return false;

        }

        user.online = true;

        user.lastLogin = new Date().toISOString();

        StorageManager.save(

            STORAGE_KEYS.USER,

            user

        );

        StorageManager.updateItem(

            STORAGE_KEYS.USERS,

            user.id,

            {

                online: true,

                lastLogin: user.lastLogin

            }

        );

        return true;

    }

    // ---------------------------
    // Logout
    // ---------------------------

    static logout() {

        const user = this.currentUser();

        if (user) {

            StorageManager.updateItem(

                STORAGE_KEYS.USERS,

                user.id,

                {

                    online: false

                }

            );

        }

        StorageManager.remove(

            STORAGE_KEYS.USER

        );

        window.location.href = "login.html";

    }

    // ---------------------------
    // Current User
    // ---------------------------

    static currentUser() {

        return StorageManager.get(

            STORAGE_KEYS.USER

        );

    }

    // ---------------------------
    // Logged In?
    // ---------------------------

    static isLoggedIn() {

        return this.currentUser() !== null;

    }

    // ---------------------------
    // Update Current User
    // ---------------------------

    static updateCurrentUser(data) {

        const user = this.currentUser();

        if (!user) return;

        const updated = {

            ...user,

            ...data,

            updatedAt: new Date().toISOString()

        };

        StorageManager.save(

            STORAGE_KEYS.USER,

            updated

        );

        StorageManager.updateItem(

            STORAGE_KEYS.USERS,

            updated.id,

            updated

        );

    }

    // ---------------------------
    // Require Login
    // ---------------------------

    static requireLogin() {

        if (!this.isLoggedIn()) {

            window.location.href =

                "login.html";

        }

    }

}

// ===============================
// AUTO PROTECT DASHBOARD
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    () => {

        if (

            window.location.pathname.includes(

                "dashboard"

            )

        ) {

            Auth.requireLogin();

        }

    }

);

// ===============================
// LOGOUT BUTTON
// ===============================

const logoutBtn = document.getElementById(

    "logoutBtn"

);

if (logoutBtn) {

    logoutBtn.addEventListener(

        "click",

        () => {

            if (

                confirm(

                    "Are you sure you want to logout?"

                )

            ) {

                Auth.logout();

            }

        }

    );

}
