// ===============================
// RHOCKSTAR CONNECT
// storage.js
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

    static save(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    static get(key) {
        const item = localStorage.getItem(key);
        return item ? JSON.parse(item) : null;
    }

    static remove(key) {
        localStorage.removeItem(key);
    }

    static clear() {
        localStorage.clear();
    }

    static exists(key) {
        return localStorage.getItem(key) !== null;
    }

    static saveArray(key, array) {
        this.save(key, array);
    }

    static getArray(key) {
        return this.get(key) || [];
    }

    static addItem(key, item) {
        const data = this.getArray(key);
        data.push(item);
        this.save(key, data);
        return data;
    }

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

    static deleteItem(key, id) {

        const data = this.getArray(key);

        const filtered = data.filter(item => item.id !== id);

        this.save(key, filtered);

        return filtered;
    }

    // Find one item
    static findItem(key, callback) {
        return this.getArray(key).find(callback);
    }

    // Replace an entire array
    static replaceArray(key, array) {
        this.save(key, array);
    }

            }
