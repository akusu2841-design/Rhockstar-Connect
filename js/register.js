alert("register.js loaded");

const form = document.getElementById("registerForm");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    alert("Submit button works!");
});
