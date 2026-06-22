//hamburger 
const hamburger = document.querySelector(".hamburger");
const sidebar = document.querySelector(".sidebar");
const body = document.body;
const links = document.querySelectorAll(".sidebar ul li a");

// open/close hamburger
hamburger.addEventListener("click", () => {
    sidebar.classList.toggle("show");
    body.classList.toggle("sidebar-open");
});

// AUTO-CLOSE when any link is clicked (mobile only behavior)
links.forEach(link => {
    link.addEventListener("click", () => {
        sidebar.classList.remove("show");
        body.classList.remove("sidebar-open");
    });
});

// ================= LOGIN CHECK =================
const user = JSON.parse(localStorage.getItem("rhockstarUser"));

if (!user) {
  window.location.href = "login.html";
}

// ================= LOAD USER DATA =================
function loadUser() {
  const welcomeMessage = document.getElementById("welcome-message");
  const profileName = document.getElementById("profile-name");
  const profileTitle = document.getElementById("profile-title");
  const profileBio = document.getElementById("profile-bio");
  const topProfile = document.getElementById("top-profile");
  const profilePicture = document.getElementById("profile-picture");

  if (welcomeMessage)
    welcomeMessage.textContent = `Hello, ${user.name} 👋`;

  if (profileName)
    profileName.textContent = user.name;

  if (profileTitle)
    profileTitle.textContent = user.title;

  if (profileBio)
    profileBio.textContent = user.bio;

  if (topProfile)
    topProfile.src = user.profileImage;

  if (profilePicture)
    profilePicture.src = user.profileImage;
}

loadUser();

// ================= DATE =================
const currentDate = document.getElementById("current-date");

if (currentDate) {
  currentDate.textContent = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric"
  });
}

// ================= NOTIFICATIONS =================
let notifications = 0;

const notificationContainer =
  document.getElementById("notification-container");

const topNotificationCount =
  document.getElementById("top-notification-count");

const sectionNotificationCount =
  document.getElementById("notification-section-count");

function addNotification(text) {
  notifications++;

  if (topNotificationCount)
    topNotificationCount.textContent = notifications;

  if (sectionNotificationCount)
    sectionNotificationCount.textContent = notifications;

  if (
    notificationContainer &&
    notificationContainer.innerHTML.includes("No new notifications.")
  ) {
    notificationContainer.innerHTML = "";
  }

  if (notificationContainer) {
    const p = document.createElement("p");
    p.textContent = text;
    notificationContainer.prepend(p);
  }
}

// ================= CREATE POST =================
const postBtn = document.getElementById("post-btn");
const postContent = document.getElementById("post-content");
const feedContainer = document.getElementById("feed-container");

if (postBtn) {
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
}

// ================= CONNECTIONS =================
let connections = 0;

const connectionCount =
  document.getElementById("connections-count");

document.querySelectorAll(".connect-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.disabled) return;

    connections++;

    if (connectionCount) {
      connectionCount.textContent = connections;
    }

    btn.textContent = "Connected";
    btn.disabled = true;

    addNotification("New connection added.");
  });
});

// ================= PROFILE EDIT =================
const editBtn = document.getElementById("edit-profile-btn");

if (editBtn) {
  editBtn.addEventListener("click", () => {
    const newName = prompt("Enter new name:", user.name);
    if (!newName) return;

    const newTitle = prompt("Enter new title:", user.title);
    const newBio = prompt("Enter new bio:", user.bio);

    user.name = newName;
    user.title = newTitle || user.title;
    user.bio = newBio || user.bio;

    localStorage.setItem(
      "rhockstarUser",
      JSON.stringify(user)
    );

    // Update user inside users array
    const users =
      JSON.parse(localStorage.getItem("rhockstarUsers")) || [];

    const index = users.findIndex(
      (u) => u.email === user.email
    );

    if (index !== -1) {
      users[index] = user;

      localStorage.setItem(
        "rhockstarUsers",
        JSON.stringify(users)
      );
    }

    loadUser();

    addNotification("Profile updated successfully.");
  });
}

// ================= SEARCH =================
const searchInput = document.getElementById("search-input");

if (searchInput) {
  searchInput.addEventListener("keyup", () => {
    const value = searchInput.value.toLowerCase();

    document
      .querySelectorAll(".post, .card, .suggestion-card")
      .forEach((el) => {
        el.style.display = el.textContent
          .toLowerCase()
          .includes(value)
          ? ""
          : "none";
      });
  });
}

// ================= LOGOUT =================
const logoutLink = document.getElementById("logout-link");

if (logoutLink) {
  logoutLink.addEventListener("click", (e) => {
    e.preventDefault();

    const confirmLogout = confirm(
      "Are you sure you want to logout?"
    );

    if (confirmLogout) {
      localStorage.removeItem("rhockstarUser");

      alert("You have been logged out.");

      window.location.href = "login.html";
    }
  });
}
