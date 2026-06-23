document.addEventListener("DOMContentLoaded", function () {

  // ================= STORAGE =================
  const USERS_KEY = "rhockstar_users";
  const SESSION_KEY = "rhockstar_session";
  const PROFILE_KEY = "userProfile";

  const app = document.getElementById("app");
  const auth = document.getElementById("auth");

  const welcomeMessage = document.getElementById("welcome-message");

  // ================= SESSION =================
  function getSession(){
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  }

  function setSession(user){
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  }

  function clearSession(){
    localStorage.removeItem(SESSION_KEY);
  }

  // ================= PROTECT APP =================
  const user = getSession();

  if(!user){
    window.location.href = "login.html";
    return;
  }

  app.style.display = "flex";
  auth.style.display = "none";

  // ================= WELCOME MESSAGE =================
  if(welcomeMessage){
    welcomeMessage.textContent = `Hello, ${user.name} 👋`;
  }

  // ================= PAGE SWITCHING =================
  const pages = document.querySelectorAll(".page");
  const links = document.querySelectorAll("[data-page]");

  function showPage(id){
    pages.forEach(p => p.classList.remove("active"));

    const target = document.getElementById(id);
    if(target) target.classList.add("active");
  }

  links.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      showPage(link.dataset.page);
    });
  });

  // default page
  showPage("dashboard");

  // ================= LOGOUT =================
  const logout = document.getElementById("logout-link");

  if(logout){
    logout.addEventListener("click", (e) => {
      e.preventDefault();
      clearSession();
      window.location.href = "login.html";
    });
  }

  // ================= PROFILE =================
  const profileData = JSON.parse(localStorage.getItem(PROFILE_KEY)) || {};

  const nameEl = document.getElementById("profile-name");
  const usernameEl = document.getElementById("profile-username");
  const bioEl = document.getElementById("profile-bio");
  const skillsEl = document.getElementById("profile-skills");
  const locationEl = document.getElementById("profile-location");

  const editBtn = document.getElementById("edit-profile-btn");
  const form = document.getElementById("profile-edit-form");
  const cancelBtn = document.getElementById("cancelBtn");

  const nameInput = document.getElementById("edit-name");
  const emailInput = document.getElementById("edit-email");
  const bioInput = document.getElementById("edit-bio");
  const skillsInput = document.getElementById("edit-skills");
  const locationInput = document.getElementById("edit-location");

  const profilePic = document.getElementById("profile-pic");

  function loadProfile(){
    if(nameEl) nameEl.textContent = profileData.name || user.name;
    if(usernameEl) usernameEl.textContent = "@" + (user.name || "user");
    if(bioEl) bioEl.textContent = profileData.bio || "No bio yet";
    if(skillsEl) skillsEl.textContent = profileData.skills || "No skills";
    if(locationEl) locationEl.textContent = profileData.location || "No location";

    if(profilePic && profileData.profilePic){
      profilePic.src = profileData.profilePic;
    }
  }

  loadProfile();

  // OPEN EDIT
  if(editBtn){
    editBtn.addEventListener("click", () => {
      form.style.display = "flex";

      nameInput.value = profileData.name || "";
      emailInput.value = profileData.email || "";
      bioInput.value = profileData.bio || "";
      skillsInput.value = profileData.skills || "";
      locationInput.value = profileData.location || "";
    });
  }

  // CANCEL
  if(cancelBtn){
    cancelBtn.addEventListener("click", () => {
      form.style.display = "none";
    });
  }

  // SAVE
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const updated = {
      name: nameInput.value,
      email: emailInput.value,
      bio: bioInput.value,
      skills: skillsInput.value,
      location: locationInput.value,
      profilePic: profileData.profilePic || ""
    };

    localStorage.setItem(PROFILE_KEY, JSON.stringify(updated));
    location.reload();
  });

});
