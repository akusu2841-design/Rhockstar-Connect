// ===============================
// RHOCKSTAR CONNECT
// auth.js
// ===============================

"use strict";

// ===============================
// AUTH CLASS
// ===============================

class Auth {

    // ===========================
    // REGISTER
    // ===========================

    static register(user) {

        const users = StorageManager.getArray(
            STORAGE_KEYS.USERS
        );

        const exists = users.find(u =>

            u.email.toLowerCase() === user.email.toLowerCase() ||

            u.username.toLowerCase() === user.username.toLowerCase()

        );

        if (exists) {

            AppUtils.showToast(
                "Email or username already exists.",
                "error"
            );

            return false;

        }

        const newUser = {

            id: AppUtils.generateId(),

            fullName: user.fullName,

            username: user.username,

            email: user.email,

            password: user.password,

            avatar: "images/default-avatar.png",

            cover: "images/default-cover.jpg",

            verified: false,

            online: false,

            createdAt: new Date().toISOString(),

            updatedAt: new Date().toISOString(),

            lastLogin: null,

            profileCompleted: false

        };

        users.push(newUser);

        StorageManager.save(
            STORAGE_KEYS.USERS,
            users
        );

        return true;

    }

    // ===========================
    // LOGIN
    // ===========================

    static login(loginId, password) {

        const users = StorageManager.getArray(
            STORAGE_KEYS.USERS
        );

        const user = users.find(u =>

            (
                u.email.toLowerCase() === loginId.toLowerCase() ||

                u.username.toLowerCase() === loginId.toLowerCase()
            )

            &&

            u.password === password

        );

        if (!user) {

            AppUtils.showToast(
                "Invalid email/username or password.",
                "error"
            );

            return false;

        }

        user.online = true;

        user.lastLogin = new Date().toISOString();

        user.updatedAt = new Date().toISOString();

        StorageManager.updateItem(

            STORAGE_KEYS.USERS,

            user.id,

            {

                online: true,

                lastLogin: user.lastLogin,

                updatedAt: user.updatedAt

            }

        );

        StorageManager.save(

            STORAGE_KEYS.USER,

            user

        );

        return true;

    }
        // ===========================
    // LOGOUT
    // ===========================

    static logout() {

        const user = this.currentUser();

        if (user) {

            user.online = false;

            user.updatedAt = new Date().toISOString();

            StorageManager.updateItem(

                STORAGE_KEYS.USERS,

                user.id,

                {

                    online: false,

                    updatedAt: user.updatedAt

                }

            );

        }

        StorageManager.remove(

            STORAGE_KEYS.USER

        );

        window.location.href = "login.html";

    }

    // ===========================
    // CURRENT USER
    // ===========================

    static currentUser() {

        return StorageManager.get(

            STORAGE_KEYS.USER

        );

    }

    // ===========================
    // IS LOGGED IN
    // ===========================

    static isLoggedIn() {

        return this.currentUser() !== null;

    }

    // ===========================
    // UPDATE CURRENT USER
    // ===========================

    static updateCurrentUser(data) {

        const currentUser = this.currentUser();

        if (!currentUser) return false;

        const updatedUser = {

            ...currentUser,

            ...data,

            updatedAt: new Date().toISOString()

        };

        StorageManager.save(

            STORAGE_KEYS.USER,

            updatedUser

        );

        StorageManager.updateItem(

            STORAGE_KEYS.USERS,

            updatedUser.id,

            updatedUser

        );

        return true;

    }

    // ===========================
    // CHANGE PASSWORD
    // ===========================

    static changePassword(

        currentPassword,

        newPassword

    ) {

        const user = this.currentUser();

        if (!user) return false;

        if (user.password !== currentPassword) {

            AppUtils.showToast(

                "Current password is incorrect.",

                "error"

            );

            return false;

        }

        this.updateCurrentUser({

            password: newPassword

        });

        AppUtils.showToast(

            "Password changed successfully.",

            "success"

        );

        return true;

    }
        // ===========================
    // DELETE ACCOUNT
    // ===========================

    static deleteAccount() {

        const user = this.currentUser();

        if (!user) return false;

        StorageManager.deleteItem(

            STORAGE_KEYS.USERS,

            user.id

        );

        StorageManager.remove(

            STORAGE_KEYS.USER

        );

        AppUtils.showToast(

            "Account deleted.",

            "success"

        );

        setTimeout(() => {

            window.location.href = "register.html";

        }, 1000);

        return true;

    }

    // ===========================
    // REQUIRE LOGIN
    // ===========================

    static requireLogin() {

        if (!this.isLoggedIn()) {

            window.location.href = "login.html";

            return;

        }

    }

    // ===========================
    // GET ALL USERS
    // ===========================

    static getAllUsers() {

        return StorageManager.getArray(

            STORAGE_KEYS.USERS

        );

    }

    // ===========================
    // FIND USER BY ID
    // ===========================

    static findUserById(id) {

        return StorageManager.findItem(

            STORAGE_KEYS.USERS,

            user => user.id === id

        );

    }

}
