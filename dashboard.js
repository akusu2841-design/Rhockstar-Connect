// ================= DATE =================
const currentDate = document.getElementById("current-date");

const today = new Date();

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric"
};

currentDate.textContent = today.toLocaleDateString(
  "en-US",
  options
);

// ================= CREATE POST =================
const postBtn = document.getElementById("post-btn");
const postContent = document.getElementById("post-content");
const feedContainer = document.getElementById("feed-container");

postBtn.addEventListener("click", () => {
  const text = postContent.value.trim();

  if (text === "") {
    alert("Please write something before posting.");
    return;
  }

  const post = document.createElement("article");
  post.classList.add("post");

  post.innerHTML = `
    <h3>Elijah Peter</h3>
    <p>${text}</p>
    <small>Just now</small>
  `;

  feedContainer.prepend(post);
  postContent.value = "";

  addNotification("You created a new post.");
});

// ================= NOTIFICATIONS =================
const notificationContainer =
  document.getElementById("notification-container");

const notificationCount =
  document.getElementById("notification-section-count");

const topNotificationCount =
  document.getElementById("top-notification-count");

let notifications = 0;

function addNotification(message) {
  notifications++;

  notificationCount.textContent = notifications;
  topNotificationCount.textContent = notifications;

  if (
    notificationContainer.innerHTML.includes(
      "No new notifications."
    )
  ) {
    notificationContainer.innerHTML = "";
  }

  const p = document.createElement("p");
  p.textContent = message;

  notificationContainer.prepend(p);
}

// ================= CONNECTIONS =================
const connectButtons =
  document.querySelectorAll(".connect-btn");

const connectionsCount =
  document.getElementById("connections-count");

let connections = 0;

connectButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (button.textContent === "Connected") {
      return;
    }

    connections++;
    connectionsCount.textContent = connections;

    button.textContent = "Connected";
    button.disabled = true;

    addNotification("You made a new connection.");
  });
});

// ================= PROFILE VIEWS =================
const profileViews =
  document.getElementById("profile-views-count");

let views = 1;
profileViews.textContent = views;

// ================= JOB MATCHES =================
const jobMatches =
  document.getElementById("job-matches-count");

let jobs = 5;
jobMatches.textContent = jobs;

// ================= MESSAGES =================
const messagesCount =
  document.getElementById("messages-count");

let messages = 0;
messagesCount.textContent = messages;

// ================= SEARCH =================
const searchInput =
  document.getElementById("search-input");

searchInput.addEventListener("keyup", () => {
  const search = searchInput.value.toLowerCase();

  const sections =
    document.querySelectorAll(
      ".post, .suggestion-card, .card"
    );

  sections.forEach((item) => {
    const text =
      item.textContent.toLowerCase();

    if (text.includes(search)) {
      item.style.display = "";
    } else {
      item.style.display = "none";
    }
  });
});

// ================= EDIT PROFILE =================
const editProfileBtn =
  document.getElementById("edit-profile-btn");

editProfileBtn.addEventListener("click", () => {
  const name = prompt(
    "Enter your new name:"
  );

  if (name && name.trim() !== "") {
    document.getElementById(
      "profile-name"
    ).textContent = name;

    document.getElementById(
      "welcome-message"
    ).textContent =
      `Welcome Back, ${name} 👋`;

    addNotification(
      "Your profile was updated."
    );
  }
});

// ================= LOGOUT =================
const logout =
  document.getElementById("logout-link");

logout.addEventListener("click", (e) => {
  e.preventDefault();

  const confirmLogout =
    confirm("Are you sure you want to logout?");

  if (confirmLogout) {
    alert("Logged out successfully.");
    window.location.href = "index.html";
  }
});
