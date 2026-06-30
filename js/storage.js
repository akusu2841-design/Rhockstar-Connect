// =======================================
// RHOCKSTAR CONNECT
// storage.js
// Local Storage Manager
// =======================================

"use strict";

// ================= STORAGE KEYS =================

const STORAGE_KEYS = {

    USERS: "rc_users",

    CURRENT_USER: "rc_current_user",

    POSTS: "rc_posts",

    CONNECTIONS: "rc_connections",

    MESSAGES: "rc_messages",

    NOTIFICATIONS: "rc_notifications",

    JOBS: "rc_jobs",

    SETTINGS: "rc_settings"

};

// ================= SAVE =================

function saveData(key, value) {

    try {

        localStorage.setItem(key, JSON.stringify(value));

        return true;

    } catch (error) {

        console.error(error);

        return false;

    }

}

// ================= LOAD =================

function loadData(key, defaultValue = null) {

    try {

        const data = localStorage.getItem(key);

        if (!data) return defaultValue;

        return JSON.parse(data);

    } catch (error) {

        console.error(error);

        return defaultValue;

    }

}

// ================= REMOVE =================

function removeData(key) {

    localStorage.removeItem(key);

}

// ================= CLEAR =================

function clearStorage() {

    localStorage.clear();

}

// ================= USERS =================

function getUsers() {

    return loadData(STORAGE_KEYS.USERS, []);

}

function saveUsers(users) {

    saveData(STORAGE_KEYS.USERS, users);

}

function addUser(user) {

    const users = getUsers();

    users.push(user);

    saveUsers(users);

}

function updateUser(updatedUser) {

    let users = getUsers();

    users = users.map(user =>

        user.id === updatedUser.id ? updatedUser : user

    );

    saveUsers(users);

}

function findUserByEmail(email) {

    return getUsers().find(user =>

        user.email.toLowerCase() === email.toLowerCase()

    );

}

function findUserById(id) {

    return getUsers().find(user => user.id === id);

}

// ================= CURRENT USER =================

function setCurrentUser(user) {

    saveData(STORAGE_KEYS.CURRENT_USER, user);

}

function getCurrentUser() {

    return loadData(STORAGE_KEYS.CURRENT_USER);

}

function logoutUser() {

    removeData(STORAGE_KEYS.CURRENT_USER);

}

function isLoggedIn() {

    return getCurrentUser() !== null;

}

// ================= POSTS =================

function getPosts() {

    return loadData(STORAGE_KEYS.POSTS, []);

}

function savePosts(posts) {

    saveData(STORAGE_KEYS.POSTS, posts);

}

function addPost(post) {

    const posts = getPosts();

    posts.unshift(post);

    savePosts(posts);

}

function updatePost(updatedPost) {

    let posts = getPosts();

    posts = posts.map(post =>

        post.id === updatedPost.id ? updatedPost : post

    );

    savePosts(posts);

}

function deletePost(postId) {

    const posts = getPosts().filter(post => post.id !== postId);

    savePosts(posts);

}

// ================= CONNECTIONS =================

function getConnections() {

    return loadData(STORAGE_KEYS.CONNECTIONS, []);

}

function saveConnections(data) {

    saveData(STORAGE_KEYS.CONNECTIONS, data);

}

// ================= MESSAGES =================

function getMessages() {

    return loadData(STORAGE_KEYS.MESSAGES, []);

}

function saveMessages(messages) {

    saveData(STORAGE_KEYS.MESSAGES, messages);

}

// ================= NOTIFICATIONS =================

function getNotifications() {

    return loadData(STORAGE_KEYS.NOTIFICATIONS, []);

}

function saveNotifications(notifications) {

    saveData(STORAGE_KEYS.NOTIFICATIONS, notifications);

}

// ================= JOBS =================

function getJobs() {

    return loadData(STORAGE_KEYS.JOBS, []);

}

function saveJobs(jobs) {

    saveData(STORAGE_KEYS.JOBS, jobs);

}

// ================= SETTINGS =================

function getSettings() {

    return loadData(STORAGE_KEYS.SETTINGS, {});

}

function saveSettings(settings) {

    saveData(STORAGE_KEYS.SETTINGS, settings);

}

// ================= RESET APP =================

function resetApplication() {

    Object.values(STORAGE_KEYS).forEach(key => {

        removeData(key);

    });

}

// ================= FIRST TIME SETUP =================

(function () {

    if (!loadData(STORAGE_KEYS.USERS)) {

        saveUsers([]);

    }

    if (!loadData(STORAGE_KEYS.POSTS)) {

        savePosts([]);

    }

    if (!loadData(STORAGE_KEYS.CONNECTIONS)) {

        saveConnections([]);

    }

    if (!loadData(STORAGE_KEYS.MESSAGES)) {

        saveMessages([]);

    }

    if (!loadData(STORAGE_KEYS.NOTIFICATIONS)) {

        saveNotifications([]);

    }

    if (!loadData(STORAGE_KEYS.JOBS)) {

        saveJobs([]);

    }

    if (!loadData(STORAGE_KEYS.SETTINGS)) {

        saveSettings({});

    }

})();
