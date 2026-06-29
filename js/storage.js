// ===============================
// RHOCKSTAR CONNECT
// storage.js
// Local Storage Manager
// ===============================

"use strict";

// ===============================
// STORAGE KEYS
// ===============================

const STORAGE_KEYS = {

    USER: "rc_user",

    USERS: "rc_users",

    POSTS: "rc_posts",

    COMMENTS: "rc_comments",

    LIKES: "rc_likes",

    CONNECTIONS: "rc_connections",

    REQUESTS: "rc_requests",

    MESSAGES: "rc_messages",

    CHATS: "rc_chats",

    JOBS: "rc_jobs",

    APPLICATIONS: "rc_applications",

    SAVED_JOBS: "rc_saved_jobs",

    NOTIFICATIONS: "rc_notifications",

    SETTINGS: "rc_settings",

    REPORTS: "rc_reports",

    BLOCKED_USERS: "rc_blocked_users",

    FOLLOWERS: "rc_followers",

    FOLLOWING: "rc_following",

    DATING_MATCHES: "rc_dating_matches",

    PROFILE_VISITS: "rc_profile_visits"

};

// ===============================
// STORAGE CLASS
// ===============================

class StorageManager {

    // ---------------------------
    // Save
    // ---------------------------

    static save(key, value) {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    }

    // ---------------------------
    // Get
    // ---------------------------

    static get(key) {

        const item = localStorage.getItem(key);

        return item ? JSON.parse(item) : null;

    }

    // ---------------------------
    // Remove
    // ---------------------------

    static remove(key) {

        localStorage.removeItem(key);

    }

    // ---------------------------
    // Clear Everything
    // ---------------------------

    static clear() {

        localStorage.clear();

    }

    // ---------------------------
    // Exists
    // ---------------------------

    static exists(key) {

        return localStorage.getItem(key) !== null;

    }

    // ---------------------------
    // Save Array
    // ---------------------------

    static saveArray(key, array) {

        this.save(key, array);

    }

    // ---------------------------
    // Get Array
    // ---------------------------

    static getArray(key) {

        return this.get(key) || [];

    }

    // ---------------------------
    // Add Item
    // ---------------------------

    static addItem(key, item) {

        const data = this.getArray(key);

        data.push(item);

        this.save(key, data);

        return data;

    }

    // ---------------------------
    // Update Item
    // ---------------------------

    static updateItem(key, id, updates) {

        const data = this.getArray(key);

        const index = data.findIndex(item => item.id === id);

        if (index === -1) return false;

        data[index] = {

            ...data[index],

            ...updates

        };

        this.save(key, data);

        return true;

    }

    // ---------------------------
    // Delete Item
    // ---------------------------

    static deleteItem(key, id) {

        const data = this.getArray(key);

        const filtered = data.filter(item => item.id !== id);

        this.save(key, filtered);

        return filtered
