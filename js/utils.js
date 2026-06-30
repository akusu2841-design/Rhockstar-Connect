"use strict";

/* =========================================================
   RHOCKSTAR CONNECT
   utils.js
   Shared helper functions
========================================================= */

const Utils = (() => {

    /* ================= SELECTORS ================= */

    const $ = (selector, parent = document) => parent.querySelector(selector);

    const $$ = (selector, parent = document) =>
        [...parent.querySelectorAll(selector)];

    /* ================= EVENTS ================= */

    const on = (element, event, callback, options = false) => {
        if (!element) return;
        element.addEventListener(event, callback, options);
    };

    const off = (element, event, callback) => {
        if (!element) return;
        element.removeEventListener(event, callback);
    };

    /* ================= SHOW / HIDE ================= */

    const show = element => {
        if (!element) return;
        element.classList.remove("hidden");
    };

    const hide = element => {
        if (!element) return;
        element.classList.add("hidden");
    };

    const toggle = element => {
        if (!element) return;
        element.classList.toggle("hidden");
    };

    /* ================= CLASS HELPERS ================= */

    const addClass = (element, className) => {
        if (!element) return;
        element.classList.add(className);
    };

    const removeClass = (element, className) => {
        if (!element) return;
        element.classList.remove(className);
    };

    const toggleClass = (element, className) => {
        if (!element) return;
        element.classList.toggle(className);
    };

    /* ================= HTML ================= */

    const escapeHTML = text => {

        const div = document.createElement("div");

        div.textContent = text;

        return div.innerHTML;

    };

    /* ================= CREATE ELEMENT ================= */

    const create = (tag, className = "", html = "") => {

        const element = document.createElement(tag);

        if (className)
            element.className = className;

        if (html)
            element.innerHTML = html;

        return element;

    };

    /* ================= RANDOM ID ================= */

    const randomID = (length = 12) => {

        const chars =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        let id = "";

        for (let i = 0; i < length; i++) {

            id += chars.charAt(
                Math.floor(Math.random() * chars.length)
            );

        }

        return id;

    };

    /* ================= UUID ================= */

    const uuid = () => {

        return crypto.randomUUID
            ? crypto.randomUUID()
            : randomID(30);

    };

    /* ================= DATE ================= */

    const formatDate = date => {

        return new Date(date).toLocaleDateString();

    };

    const formatTime = date => {

        return new Date(date).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });

    };

    const timeAgo = timestamp => {

        const seconds =
            Math.floor((Date.now() - timestamp) / 1000);

        if (seconds < 60)
            return "Just now";

        if (seconds < 3600)
            return `${Math.floor(seconds / 60)} mins ago`;

        if (seconds < 86400)
            return `${Math.floor(seconds / 3600)} hrs ago`;

        return `${Math.floor(seconds / 86400)} days ago`;

    };

    /* ================= VALIDATION ================= */

    const validateEmail = email => {

        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    };

    const validateUsername = username => {

        return /^[a-zA-Z0-9_]{3,20}$/.test(username);

    };

    const validatePassword = password => {

        return password.length >= 6;

    };

    /* ================= COPY ================= */

    const copy = async text => {

        try {

            await navigator.clipboard.writeText(text);

            toast("Copied successfully.");

            return true;

        } catch {

            toast("Unable to copy.", "error");

            return false;

        }

    };

    /* ================= FILE SIZE ================= */

    const formatBytes = bytes => {

        if (bytes === 0)
            return "0 Bytes";

        const k = 1024;

        const sizes = [
            "Bytes",
            "KB",
            "MB",
            "GB"
        ];

        const i = Math.floor(
            Math.log(bytes) / Math.log(k)
        );

        return (
            parseFloat((bytes / Math.pow(k, i)).toFixed(2)) +
            " " +
            sizes[i]
        );

    };

    /* ================= IMAGE PREVIEW ================= */

    const previewImage = (file, imgElement) => {

        if (!file || !imgElement)
            return;

        const reader = new FileReader();

        reader.onload = e => {

            imgElement.src = e.target.result;

        };

        reader.readAsDataURL(file);

    };

    /* ================= DOWNLOAD ================= */

    const download = (url, filename = "") => {

        const link = document.createElement("a");

        link.href = url;

        link.download = filename;

        link.click();

    };

    /* ================= DEBOUNCE ================= */

    const debounce = (callback, delay = 300) => {

        let timer;

        return (...args) => {

            clearTimeout(timer);

            timer = setTimeout(() => {

                callback(...args);

            }, delay);

        };

    };

    /* ================= THROTTLE ================= */

    const throttle = (callback, limit = 300) => {

        let waiting = false;

        return (...args) => {

            if (waiting)
                return;

            callback(...args);

            waiting = true;

            setTimeout(() => {

                waiting = false;

            }, limit);

        };

    };

    /* ================= TOAST ================= */

    const toast = (
        message,
        type = "success"
    ) => {

        let toastBox = $("#toast");

        if (!toastBox) {

            toastBox = document.createElement("div");

            toastBox.id = "toast";

            document.body.appendChild(toastBox);

        }

        toastBox.className = `toast ${type}`;

        toastBox.textContent = message;

        toastBox.classList.add("show");

        setTimeout(() => {

            toastBox.classList.remove("show");

        }, 3000);

    };

    /* ================= NETWORK ================= */

    const isOnline = () => navigator.onLine;

    /* ================= CHARACTER COUNT ================= */

    const updateCounter = (
        input,
        counter,
        max
    ) => {

        if (!input || !counter)
            return;

        counter.textContent = input.value.length;

        if (input.value.length > max) {

            counter.style.color = "red";

        } else {

            counter.style.color = "";

        }

    };

    /* ================= RETURN ================= */

    return {

        $,
        $$,

        on,
        off,

        show,
        hide,
        toggle,

        addClass,
        removeClass,
        toggleClass,

        escapeHTML,

        create,

        randomID,
        uuid,

        formatDate,
        formatTime,
        timeAgo,

        validateEmail,
        validateUsername,
        validatePassword,

        copy,

        formatBytes,

        previewImage,

        download,

        debounce,
        throttle,

        toast,

        isOnline,

        updateCounter

    };

})();
