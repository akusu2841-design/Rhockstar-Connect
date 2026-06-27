// utils.js

function $(id) {
    return document.getElementById(id);
}

function $all(selector) {
    return document.querySelectorAll(selector);
}

function save(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

function load(key) {
    return JSON.parse(localStorage.getItem(key));
}

function alertMessage(message) {
    alert(message);
}
