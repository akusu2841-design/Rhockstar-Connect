"use strict";

/* =========================================================
   RHOCKSTAR CONNECT
   storage.js
   Handles all localStorage operations
========================================================= */

const Storage = (() => {

    /* ================= STORAGE KEYS ================= */

    const KEYS = {

        USERS: "rc_users",

        CURRENT_USER: "rc_current_user",

        POSTS: "rc_posts",

        MESSAGES: "rc_messages",

        CONNECTIONS: "rc_connections",

        NOTIFICATIONS: "rc_notifications",

        JOBS: "rc_jobs",

        SETTINGS: "rc_settings"

    };

    /* ================= BASIC STORAGE ================= */

    const get = key => {

        try {

            const data = localStorage.getItem(key);

            return data ? JSON.parse(data) : null;

        } catch (error) {

            console.error(error);

            return null;

        }

    };

    const set = (key, value) => {

        localStorage.setItem(

            key,

            JSON.stringify(value)

        );

    };

    const remove = key => {

        localStorage.removeItem(key);

    };

    const clear = () => {

        localStorage.clear();

    };

    /* ================= USERS ================= */

    const getUsers = () => {

        return get(KEYS.USERS) || [];

    };

    const saveUsers = users => {

        set(KEYS.USERS, users);

    };

    const addUser = user => {

        const users = getUsers();

        users.push(user);

        saveUsers(users);

    };

    const updateUser = user => {

        const users = getUsers();

        const index = users.findIndex(

            u => u.id === user.id

        );

        if (index !== -1) {

            users[index] = user;

            saveUsers(users);

        }

    };

    const findUserByEmail = email => {

        return getUsers().find(

            user =>

                user.email.toLowerCase() ===

                email.toLowerCase()

        );

    };

    const findUserByUsername = username => {

        return getUsers().find(

            user =>

                user.username.toLowerCase() ===

                username.toLowerCase()

        );

    };

    /* ================= CURRENT USER ================= */

    const setCurrentUser = user => {

        set(KEYS.CURRENT_USER, user);

    };

    const getCurrentUser = () => {

        return get(KEYS.CURRENT_USER);

    };

    const logout = () => {

        remove(KEYS.CURRENT_USER);

    };

    /* ================= POSTS ================= */

    const getPosts = () => {

        return get(KEYS.POSTS) || [];

    };

    const savePosts = posts => {

        set(KEYS.POSTS, posts);

    };

    const addPost = post => {

        const posts = getPosts();

        posts.unshift(post);

        savePosts(posts);

    };

    /* ================= MESSAGES ================= */

    const getMessages = () => {

        return get(KEYS.MESSAGES) || [];

    };

    const saveMessages = messages => {

        set(KEYS.MESSAGES, messages);

    };

    /* ================= CONNECTIONS ================= */

    const getConnections = () => {

        return get(KEYS.CONNECTIONS) || [];

    };

    const saveConnections = connections => {

        set(KEYS.CONNECTIONS, connections);

    };

    /* ================= NOTIFICATIONS ================= */

    const getNotifications = () => {

        return get(KEYS.NOTIFICATIONS) || [];

    };

    const saveNotifications = notifications => {

        set(KEYS.NOTIFICATIONS, notifications);

    };

    /* ================= JOBS ================= */

    const getJobs = () => {

        return get(KEYS.JOBS) || [];

    };

    const saveJobs = jobs => {

        set(KEYS.JOBS, jobs);

    };

    /* ================= SETTINGS ================= */

    const getSettings = () => {

        return get(KEYS.SETTINGS) || {};

    };

    const saveSettings = settings => {

        set(KEYS.SETTINGS, settings);

    };

    /* ================= EXPORT ================= */

    return {

        KEYS,

        get,
        set,
        remove,
        clear,

        getUsers,
        saveUsers,
        addUser,
        updateUser,
        findUserByEmail,
        findUserByUsername,

        setCurrentUser,
        getCurrentUser,
        logout,

        getPosts,
        savePosts,
        addPost,

        getMessages,
        saveMessages,

        getConnections,
        saveConnections,

        getNotifications,
        saveNotifications,

        getJobs,
        saveJobs,

        getSettings,
        saveSettings

    };

})();
