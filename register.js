// ================= ELEMENTS =================
const form = document.getElementById("registerForm");

// ================= STORAGE KEY =================
const USERS_KEY = "rhockstarUsers";

// ================= REGISTER =================
form.addEventListener("submit", function (e) {

  e.preventDefault();

  const name = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim().toLowerCase();
  const password = document.getElementById("password").value;

  // ================= PASSWORD RULE =================
  const passwordPattern =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&.#_-])[A-Za-z\d@$!%*?&.#_-]{8,}$/;

  // ================= NAME VALIDATION =================
  if (name.length < 3) {
    alert("Please enter a valid full name.");
    return;
  }

  // ================= EMAIL VALIDATION =================
  if (!email.includes("@")) {
    alert("Please enter a valid email address.");
    return;
  }

  // ================= PASSWORD VALIDATION =================
  if (!passwordPattern.test(password)) {

    alert(
      "Password must contain:\n\n" +
      "• At least 8 characters\n" +
      "• One uppercase letter\n" +
      "• One lowercase letter\n" +
      "• One number\n" +
      "• One special character"
    );

    return;
  }

  // ================= LOAD USERS =================
  let users =
    JSON.parse(localStorage.getItem(USERS_KEY)) || [];

  // ================= CHECK EXISTING EMAIL =================
  const existingUser = users.find(
    user => user.email === email
  );

  if (existingUser) {
    alert("An account with this email already exists.");
    return;
  }

  // ================= CREATE USER =================
  const newUser = {
    id: Date.now(),
    name: name,
    email: email,
    password: password,

    title: "Member",

    bio: "Welcome to Rhockstar Connect.",

    profileImage:
      "https://ui-avatars.com/api/?name=" +
      encodeURIComponent(name) +
      "&background=0D8ABC&color=fff",

    joinedAt: new Date().toISOString()
  };

  // ================= SAVE USER =================
  users.push(newUser);

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify(users)
  );

  // ================= SUCCESS =================
  alert("Registration successful!");

  form.reset();

  // ================= REDIRECT =================
  window.location.href = "login.html";

});
