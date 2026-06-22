// ================= CHECK LOGIN =================
const user = JSON.parse(localStorage.getItem("rhockstarUser"));

if (!user) {
  window.location.href = "login.html";
}

// ================= LOAD USER DATA =================
function loadUser() {
  document.getElementById("welcome-message").textContent =
    `Hello, ${user.name} 👋`;

  document.getElementById("profile-name").textContent =
    user.name;

  document.getElementById("profile-title").textContent =
    user.title;

  document.getElementById("profile-bio").textContent =
    user.bio;

  document.getElementById("top-profile").src =
    user.profileImage;

  document.getElementById("profile-picture").src =
    user.profileImage;
}

loadUser();

// ================= DATE =================
const currentDate = document.getElementById("current-date");

currentDate.textContent = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
});

// ================= NOTIFICATIONS =================
let notifications = 0;

const notificationContainer = document.getElementById("notification-container");
const topNotificationCount = document.getElementById("top-notification-count");
const sectionNotificationCount = document.getElementById("notification-section-count");

function addNotification(message) {
  notifications++;

  topNotificationCount.textContent = notifications;
  sectionNotificationCount.textContent = notifications;

  if (notificationContainer.innerHTML.includes("No new notifications.")) {
    notificationContainer.innerHTML = "";
  }

  const p = document.createElement("p");
  p.textContent = message;

  notificationContainer.prepend(p);
}

// ================= CREATE POST =================
const postBtn = document.getElementById("post-btn");
const postContent = document.getElementById("post-content");
const feedContainer = document.getElementById("feed-container");

postBtn.addEventListener("click", () => {
  const text = postContent.value.trim();

  if (!text) {
    alert("Write something before posting.");
    return;
  }

  const post = document.createElement("article");
  post.classList.add("post");

  post.innerHTML = `
    <h3>${user.name}</h3>
    <p>${text}</p>
    <small>Just now</small>
  `;

  feedContainer.prepend(post);
  postContent.value = "";

  addNotification("You created a new post.");
});

// ================= CONNECTIONS =================
let connections = 0;

const connectionCount = document.getElementById("connections-count");

document.querySelectorAll(".connect-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;

    connections++;
    connectionCount.textContent = connections;

    btn.textContent = "Connected";
    btn.disabled = true;

    addNotification("New connection added.");
  });
});

// ================= PROFILE EDIT =================
const editBtn = document.getElementById("edit-profile-btn");

editBtn.addEventListener("click", () => {
  const newName = prompt("Enter new name:", user.name);
  const newTitle = prompt("Enter new title:", user.title);
  const newBio = prompt("Enter new bio:", user.bio);

  if (!newName) return;

  user.name = newName;
  user.title = newTitle || user.title;
  user.bio = newBio || user.bio;

  localStorage.setItem("rhockstarUser", JSON.stringify(user));

  loadUser();

  addNotification("Profile updated successfully.");
});

// ================= SEARCH =================
const searchInput = document.getElementById("search-input");

searchInput.addEventListener("keyup", () => {
  const value = searchInput.value.toLowerCase();

  document.querySelectorAll(".post, .card, .suggestion-card").forEach((el) => {
    el.style.display = el.textContent.toLowerCase().includes(value)
      ? ""
      : "none";
  });
});

// ================= LOGOUT =================
document.getElementById("logout-link").addEventListener("click", (e) => {
  e.preventDefault();

  const confirmLogout = confirm("Are you sure you want to logout?");

  if (confirmLogout) {
    localStorage.removeItem("rhockstarUser");
    window.location.href = "login.html";
  }
});
