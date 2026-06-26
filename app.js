document.addEventListener("DOMContentLoaded", () => {

  const home = document.getElementById("home");
  const dashboard = document.getElementById("dashboard");
  const footer = document.querySelector(".footer");
  const logoutBtn = document.getElementById("logout");

  const SESSION_KEY = "rhockstar_session";

  // ======================
  // CHECK LOGIN STATUS
  // ======================
  const session = JSON.parse(
    localStorage.getItem(SESSION_KEY)
  );

  if (session) {

    if (home) home.style.display = "none";

    if (dashboard)
      dashboard.style.display = "flex";

    if (footer)
      footer.style.display = "none";

  } else {

    if (home)
      home.style.display = "block";

    if (dashboard)
      dashboard.style.display = "none";

    if (footer)
      footer.style.display = "block";

  }

  // ======================
  // PAGE SWITCHING
  // ======================
  const pages =
    document.querySelectorAll(".page");

  const links =
    document.querySelectorAll("[data-page]");

function showPage(pageId){

    pages.forEach(page=>{

        page.classList.remove("active");
        page.style.display="none";

    });

    const target=document.getElementById(pageId);

    if(target){

        target.style.display="block";

        setTimeout(()=>{

            target.classList.add("active");

        },10);

    }

}

  links.forEach(link => {

    link.addEventListener("click", e => {

      e.preventDefault();

      showPage(
        link.dataset.page
      );

    });

  });

  // Default page
  showPage("feed");

  // ======================
// SIDEBAR MENU
// ======================

const menuToggle = document.getElementById("menuToggle");
const closeMenu = document.getElementById("closeMenu");
const sidebar = document.getElementById("sidebar");
const sidebarOverlay = document.getElementById("sidebarOverlay");

function openSidebar() {

    if (!sidebar) return;

    sidebar.classList.add("active");

    if (sidebarOverlay)
        sidebarOverlay.classList.add("active");

}

function closeSidebar() {

    if (!sidebar) return;

    sidebar.classList.remove("active");

    if (sidebarOverlay)
        sidebarOverlay.classList.remove("active");

}

if (menuToggle)
menuToggle.addEventListener("click", openSidebar);

if (closeMenu)
closeMenu.addEventListener("click", closeSidebar);

if (sidebarOverlay)
sidebarOverlay.addEventListener("click", closeSidebar);


// Close sidebar automatically after selecting a page

links.forEach(link=>{

    link.addEventListener("click",()=>{

        closeSidebar();

    });

});


  // ======================
// PROFILE EDIT
// ======================

const editBtn =
document.getElementById("editProfileBtn") ||
document.getElementById("profileEditBtn");

const editSection =
document.getElementById("profileEditSection");

const profilePage =
document.getElementById("profile");

const cancelBtn =
document.getElementById("cancel");

if(editBtn){

editBtn.addEventListener("click",()=>{

profilePage.style.display="none";

editSection.style.display="block";

});

}

if(cancelBtn){

cancelBtn.addEventListener("click",()=>{

editSection.style.display="none";

profilePage.style.display="block";

});

}


// ======================
// SAVE PROFILE
// ======================

const saveBtn=document.getElementById("saveBtn");

if(saveBtn){

saveBtn.addEventListener("click",()=>{

const profile={

name:editFullName.value,

username:editUName.value,

email:editE.value,

phone:editTel.value,

location:editL.value,

title:editTitle.value,

bio:editBio.value,

skills:editSkills.value

};

localStorage.setItem(

"rhockstar_profile",

JSON.stringify(profile)

);

loadProfile();

editSection.style.display="none";

profilePage.style.display="block";

alert("Profile updated successfully.");

});

}

// ======================
// LOAD PROFILE
// ======================

function loadProfile(){

const profile=JSON.parse(

localStorage.getItem("rhockstar_profile")

);

if(!profile) return;

displayName.textContent=profile.name||displayName.textContent;

myN.textContent=profile.name||myN.textContent;

displayUsername.textContent=profile.username||displayUsername.textContent;

myE.textContent=profile.email||myE.textContent;

myPhone.textContent=profile.phone||myPhone.textContent;

myL.textContent=profile.location||myL.textContent;

displayTitle.textContent=profile.title||displayTitle.textContent;

myPT.textContent=profile.title||myPT.textContent;

displayBio.textContent=profile.bio||displayBio.textContent;

abtMe.textContent=profile.bio||abtMe.textContent;

mySkills.textContent=profile.skills||mySkills.textContent;

myS.textContent=profile.skills||myS.textContent;

}

loadProfile();


// ======================
// PROFILE PHOTO
// ======================

const uploadPic=document.getElementById("uploadPic");

if(uploadPic){

uploadPic.addEventListener("change",function(){

const file=this.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=function(e){

profileAvatar.src=e.target.result;

profilePicPreview.src=e.target.result;

localStorage.setItem(

"profilePhoto",

e.target.result

);

};

reader.readAsDataURL(file);

});

}

const savedPhoto=

localStorage.getItem("profilePhoto");

if(savedPhoto){

profileAvatar.src=savedPhoto;

profilePicPreview.src=savedPhoto;

}


// ======================
// COVER PHOTO
// ======================

const uploadCover=document.getElementById("uploadCover");

if(uploadCover){

uploadCover.addEventListener("change",function(){

const file=this.files[0];

if(!file) return;

const reader=new FileReader();

reader.onload=function(e){

coverPhoto.src=e.target.result;

localStorage.setItem(

"coverPhoto",

e.target.result

);

};

reader.readAsDataURL(file);

});

}

const savedCover=

localStorage.getItem("coverPhoto");

if(savedCover){

coverPhoto.src=savedCover;

}

  // ======================
// SEND MESSAGE
// ======================

const sendMessageBtn = document.getElementById("sendMessageBtn");
const chatMessage = document.getElementById("chatMessage");
const chatBody = document.getElementById("chatBody");

if (sendMessageBtn && chatMessage && chatBody) {

    function sendMessage() {

        const text = chatMessage.value.trim();

        if (!text) return;

        const msg = document.createElement("div");

        msg.className = "message sent";

        msg.innerHTML = `
            <p>${text}</p>
            <small>Just now</small>
        `;

        chatBody.appendChild(msg);

        chatMessage.value = "";

        chatBody.scrollTop = chatBody.scrollHeight;

    }

    sendMessageBtn.addEventListener("click", sendMessage);

    chatMessage.addEventListener("keypress", e => {

        if (e.key === "Enter" && !e.shiftKey) {

            e.preventDefault();

            sendMessage();

        }

    });

}


// ======================
// POST JOB
// ======================

const postJobBtn = document.getElementById("postJobBtn");

const jobsContainer = document.getElementById("jobsContainer");

const totalJobs = document.getElementById("totalJobs");

function updateJobCount(){

const count=document.querySelectorAll(".job-card").length;

if(totalJobs) totalJobs.textContent=count;

}

updateJobCount();

if(postJobBtn){

postJobBtn.addEventListener("click",()=>{

const title=document.getElementById("jobTitle").value.trim();

const company=document.getElementById("companyName").value.trim();

const location=document.getElementById("jobLocation").value.trim();

const type=document.getElementById("jobType").value;

const desc=document.getElementById("jobDescription").value.trim();

if(!title || !company || !location || !desc){

alert("Complete all job fields.");

return;

}

const card=document.createElement("div");

card.className="job-card";

card.innerHTML=`

<h3>${title}</h3>

<p><strong>🏢 Company:</strong> ${company}</p>

<p><strong>📍 Location:</strong> ${location}</p>

<p><strong>💼 Type:</strong> ${type}</p>

<p>${desc}</p>

<small>Posted Just Now</small>

<div class="job-actions">

<button class="viewBtn">👁 View</button>

<button class="saveBtn">⭐ Save</button>

<button class="applyBtn">📩 Apply</button>

</div>

`;

jobsContainer.prepend(card);

saveJobs();

updateJobCount();

document.getElementById("jobTitle").value="";

document.getElementById("companyName").value="";

document.getElementById("jobLocation").value="";

document.getElementById("jobDescription").value="";

});

}


// ======================
// SAVE JOBS
// ======================

function saveJobs(){

localStorage.setItem(

"jobs",

jobsContainer.innerHTML

);

}

const storedJobs=

localStorage.getItem("jobs");

if(storedJobs){

jobsContainer.innerHTML=storedJobs;

}

updateJobCount();


// ======================
// SAVE JOB
// ======================

document.addEventListener("click",e=>{

const btn=e.target.closest(".saveBtn");

if(!btn) return;

btn.innerHTML="✅ Saved";

btn.disabled=true;

const saved=document.getElementById("savedJobsCount");

if(saved){

saved.textContent=

Number(saved.textContent)+1;

}

});


  // ======================
// APPLY JOB
// ======================

document.addEventListener("click",e=>{

const btn=e.target.closest(".applyBtn");

if(!btn) return;

btn.innerHTML="✅ Applied";

btn.disabled=true;

const count=document.getElementById("applicationsCount");

if(count){

count.textContent=

Number(count.textContent)+1;

}

});


// ======================
// VIEW JOB
// ======================

document.addEventListener("click",e=>{

const btn=e.target.closest(".viewBtn");

if(!btn) return;

const card=btn.closest(".job-card");

alert(card.innerText);

});


  // ======================
// NOTIFICATIONS
// ======================

const markAllReadBtn=document.getElementById("markAllReadBtn");
const clearNotificationsBtn=document.getElementById("clearNotificationsBtn");

if(markAllReadBtn){

markAllReadBtn.addEventListener("click",()=>{

document.querySelectorAll(".notification-card").forEach(card=>{

card.classList.remove("unread");

});

const unread=document.getElementById("unreadNotifications");

if(unread) unread.textContent="0";

});

}

if(clearNotificationsBtn){

clearNotificationsBtn.addEventListener("click",()=>{

const container=document.getElementById("notificationContainer");

if(container){

container.innerHTML="<p>No notifications available.</p>";

}

const total=document.getElementById("totalNotifications");
const unread=document.getElementById("unreadNotifications");

if(total) total.textContent="0";
if(unread) unread.textContent="0";

});

}


  
  // ======================
  // LOGOUT
  // ======================
  if (logoutBtn) {

    logoutBtn.addEventListener(
      "click",
      () => {

        const confirmLogout =
          confirm(
            "Are you sure you want to log out?"
          );

        if (!confirmLogout) return;

        localStorage.removeItem(
          SESSION_KEY
        );

        location.reload();

      }
    );

  }

  // ======================
  // CREATE POST
  // ======================
  const postBtn =
    document.getElementById("postBtn");

  const textSpace =
    document.getElementById("textSpace");

  const postsContainer =
    document.getElementById(
      "postsContainer"
    );

  if (
    postBtn &&
    textSpace &&
    postsContainer
  ) {

    postBtn.addEventListener(
      "click",
      () => {

        const text =
          textSpace.value.trim();

        if (!text) {

          alert(
            "Write something first."
          );

          return;

        }

        const post =
          document.createElement(
            "article"
          );

        post.className =
          "post-card";

        post.innerHTML = `

          <div class="post-header">

            <img
              src="images/profile.jpg"
              class="post-profile"
              alt="Profile"
            >

            <div>
              <h4>Elijah Peter</h4>
              <small>Just now</small>
            </div>

          </div>

          <p>${text}</p>

          <div class="post-actions">

            <button class="like-btn">
              ❤️ <span class="like-count">0</span>
            </button>

            <button class="comment-btn-toggle">
              💬 Comment
            </button>

            <button class="share-btn">
              🔁 Share
            </button>

          </div>

          <div
            class="comments-section"
            style="display:none;"
          >

            <input
              type="text"
              class="comment-input"
              placeholder="Write a comment..."
            >

            <button class="comment-btn">
              Post
            </button>

            <div class="comments-list"></div>

          </div>

        `;

        postsContainer.prepend(post);

        textSpace.value = "";

      }
    );

  }

});

// ======================
// LIKE
// ======================
document.addEventListener(
  "click",
  e => {

    const btn =
      e.target.closest(".like-btn");

    if (!btn) return;

    const count =
      btn.querySelector(
        ".like-count"
      );

    count.textContent =
      Number(count.textContent) + 1;

  }
);

// ======================
// SHOW COMMENTS
// ======================
document.addEventListener(
  "click",
  e => {

    if (
      e.target.classList.contains(
        "comment-btn-toggle"
      )
    ) {

      const post =
        e.target
          .closest(".post-card");

      const section =
        post.querySelector(
          ".comments-section"
        );

      section.style.display =
        section.style.display ===
        "none"
          ? "block"
          : "none";

    }

  }
);

// ======================
// ADD COMMENT
// ======================
document.addEventListener(
  "click",
  e => {

    if (
      !e.target.classList.contains(
        "comment-btn"
      )
    )
      return;

    const section =
      e.target.closest(
        ".comments-section"
      );

    const input =
      section.querySelector(
        ".comment-input"
      );

    const commentsList =
      section.querySelector(
        ".comments-list"
      );

    const text =
      input.value.trim();

    if (!text) return;

    const comment =
      document.createElement(
        "div"
      );

    comment.className =
      "comment";

    comment.innerHTML = `

      <p class="comment-text">
        ${text}
      </p>

      <button class="reply-btn">
        Reply
      </button>

      <div
        class="reply-form"
        style="display:none;"
      >

        <input
          type="text"
          class="reply-input"
          placeholder="Write a reply..."
        >

        <button
          class="send-reply-btn"
        >
          Send
        </button>

      </div>

      <div class="replies"></div>

    `;

    commentsList.prepend(
      comment
    );

    input.value = "";

  }
);

// ======================
// REPLY SYSTEM
// ======================
document.addEventListener(
  "click",
  e => {

    if (
      e.target.classList.contains(
        "reply-btn"
      )
    ) {

      const form =
        e.target.nextElementSibling;

      form.style.display =
        form.style.display ===
        "none"
          ? "block"
          : "none";

    }

    if (
      e.target.classList.contains(
        "send-reply-btn"
      )
    ) {

      const form =
        e.target.parentElement;

      const input =
        form.querySelector(
          ".reply-input"
        );

      const text =
        input.value.trim();

      if (!text) return;

      const replies =
        form.nextElementSibling;

      const reply =
        document.createElement(
          "div"
        );

      reply.className =
        "reply";

      reply.textContent =
        text;

      replies.prepend(reply);

      input.value = "";

      form.style.display =
        "none";

    }

  }
);

// ======================
// SHARE BUTTON
// ======================
document.addEventListener(
  "click",
  e => {

    if (
      e.target.classList.contains(
        "share-btn"
      )
    ) {

      alert(
        "Post shared successfully!"
      );

    }

  }
);
document.addEventListener("click",(e)=>{

if(e.target.classList.contains("markReadBtn")){

const card=e.target.closest(".notification-card");

card.classList.remove("unread");

e.target.remove();

const unread=document.getElementById("unreadNotifications");

if(unread){

let num=parseInt(unread.textContent)||0;

if(num>0) unread.textContent=num-1;

}

}

if(e.target.classList.contains("deleteNotificationBtn")){

const card=e.target.closest(".notification-card");

card.remove();

const total=document.getElementById("totalNotifications");

if(total){

let num=parseInt(total.textContent)||0;

if(num>0) total.textContent=num-1;

}

}

});


// ======================
// DARK MODE
// ======================

const darkMode=document.getElementById("darkMode");

if(darkMode){

const savedTheme=localStorage.getItem("theme");

if(savedTheme==="light"){

document.body.classList.remove("dark");

darkMode.checked=false;

}else{

document.body.classList.add("dark");

}

darkMode.addEventListener("change",()=>{

if(darkMode.checked){

document.body.classList.add("dark");

localStorage.setItem("theme","dark");

}else{

document.body.classList.remove("dark");

localStorage.setItem("theme","light");

}

});

}



// ======================
// SAVE ACCOUNT SETTINGS
// ======================

const saveAccountBtn=document.getElementById("saveAccountBtn");

if(saveAccountBtn){

saveAccountBtn.addEventListener("click",()=>{

localStorage.setItem("settingsName",settingsName.value);

localStorage.setItem("settingsEmail",settingsEmail.value);

localStorage.setItem("settingsUsername",settingsUsername.value);

alert("Settings saved successfully.");

});

}

if(settingsName)
settingsName.value=localStorage.getItem("settingsName")||"";

if(settingsEmail)
settingsEmail.value=localStorage.getItem("settingsEmail")||"";

if(settingsUsername)
settingsUsername.value=localStorage.getItem("settingsUsername")||"";


// ======================
// DOWNLOAD DATA
// ======================

const downloadDataBtn=document.getElementById("downloadDataBtn");

if(downloadDataBtn){

downloadDataBtn.addEventListener("click",()=>{

const data={

profile:localStorage.getItem("rhockstar_profile"),

jobs:localStorage.getItem("jobs"),

theme:localStorage.getItem("theme")

};

const blob=new Blob(

[JSON.stringify(data,null,2)],

{type:"application/json"}

);

const a=document.createElement("a");

a.href=URL.createObjectURL(blob);

a.download="RhockstarData.json";

a.click();

});

}


// ======================
// DELETE ACCOUNT
// ======================

const deleteAccountBtn=document.getElementById("deleteAccountBtn");

if(deleteAccountBtn){

deleteAccountBtn.addEventListener("click",()=>{

const confirmDelete=confirm(

"This will permanently delete your local account. Continue?"

);

if(!confirmDelete) return;

localStorage.clear();

location.reload();

});

}



// ======================
// UPDATE STATS
// ======================

function updateStats(){

const posts=document.querySelectorAll(".post-card").length;

const jobs=document.querySelectorAll(".job-card").length;

if(totalPosts)
totalPosts.textContent=posts;

if(myPosts)
myPosts.textContent=posts;

if(savedJobs)
savedJobs.textContent=savedJobsCount.textContent;

if(settingsConnections)
settingsConnections.textContent=myConnections.textContent;

}

updateStats();

// ======================
// CONNECTION REQUESTS
// ======================

document.addEventListener("click", (e) => {

    // Accept Request
    if (e.target.classList.contains("accept-btn")) {

        const card = e.target.closest(".user-card");

        alert("Connection accepted.");

        card.remove();

        updateConnectionStats();

    }

    // Decline Request
    if (e.target.classList.contains("decline-btn")) {

        const card = e.target.closest(".user-card");

        card.remove();

        updateConnectionStats();

    }

    // Connect
    if (e.target.classList.contains("connect-btn")) {

        e.target.textContent = "✔ Connected";
        e.target.disabled = true;

        updateConnectionStats();

    }

    // Remove Connection
    if (e.target.classList.contains("remove-btn")) {

        if (!confirm("Remove this connection?")) return;

        e.target.closest(".user-card").remove();

        updateConnectionStats();

    }

    // Message Button
    if (e.target.classList.contains("message-btn")) {

        showPage("messages");

    }

});

function updateConnectionStats() {

    const total =
        document.querySelectorAll(
            "#connections .remove-btn"
        ).length;

    const pending =
        document.querySelectorAll(
            "#connections .accept-btn"
        ).length;

    const suggested =
        document.querySelectorAll(
            "#connections .connect-btn:not(:disabled)"
        ).length;

    if (document.getElementById("totalConnections"))
        document.getElementById("totalConnections").textContent = total;

    if (document.getElementById("pendingRequests"))
        document.getElementById("pendingRequests").textContent = pending;

    if (document.getElementById("suggestedUsers"))
        document.getElementById("suggestedUsers").textContent = suggested;

}


// ======================
// SEARCH CONNECTIONS
// ======================

const searchInput =
document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("keyup",()=>{

const value =
searchInput.value.toLowerCase();

document
.querySelectorAll("#connections .user-card")
.forEach(card=>{

card.style.display =
card.innerText
.toLowerCase()
.includes(value)
?
"flex"
:
"none";

});

});

}


// ======================
// SEND MESSAGE
// ======================

const sendMessageBtn =
document.getElementById("sendMessageBtn");

const chatMessage =
document.getElementById("chatMessage");

const chatBody =
document.getElementById("chatBody");

if(sendMessageBtn){

sendMessageBtn.addEventListener("click",sendChat);

chatMessage.addEventListener("keypress",(e)=>{

if(e.key==="Enter" && !e.shiftKey){

e.preventDefault();

sendChat();

}

});

}

function sendChat(){

const text =
chatMessage.value.trim();

if(!text) return;

const div =
document.createElement("div");

div.className="message sent";

div.innerHTML=`
<p>${text}</p>
<small>Just now</small>
`;

chatBody.appendChild(div);

chatBody.scrollTop =
chatBody.scrollHeight;

chatMessage.value="";

}


// ======================
// SEARCH MESSAGES
// ======================

const searchMessages =
document.getElementById("searchMessages");

if(searchMessages){

searchMessages.addEventListener("keyup",()=>{

const value =
searchMessages.value.toLowerCase();

document
.querySelectorAll(".conversation-card")
.forEach(card=>{

card.style.display=
card.innerText
.toLowerCase()
.includes(value)
?
"flex"
:
"none";

});

});

}


// ======================
// JOB SEARCH
// ======================

const searchJobs =
document.getElementById("searchJobs");

if(searchJobs){

searchJobs.addEventListener("keyup",()=>{

const value=
searchJobs.value.toLowerCase();

document
.querySelectorAll(".job-card")
.forEach(job=>{

job.style.display=
job.innerText
.toLowerCase()
.includes(value)
?
"block"
:
"none";

});

});

}


// ======================
// POST JOB
// ======================

const postJobBtn =
document.getElementById("postJobBtn");

if(postJobBtn){

postJobBtn.addEventListener("click",()=>{

const title =
document.getElementById("jobTitle").value.trim();

const company =
document.getElementById("companyName").value.trim();

const location =
document.getElementById("jobLocation").value.trim();

const type =
document.getElementById("jobType").value;

const desc =
document.getElementById("jobDescription").value.trim();

if(
!title ||
!company ||
!location ||
!desc
){

alert("Complete all fields.");

return;

}

const job =
document.createElement("div");

job.className="job-card";

job.innerHTML=`

<h3>${title}</h3>

<p><strong>🏢 Company:</strong> ${company}</p>

<p><strong>📍 Location:</strong> ${location}</p>

<p><strong>💼 Type:</strong> ${type}</p>

<p>${desc}</p>

<small>Posted Just Now</small>

<div class="job-actions">

<button class="viewBtn">👁 View</button>

<button class="saveBtn">⭐ Save</button>

<button class="applyBtn">📩 Apply</button>

</div>

`;

document
.getElementById("jobsContainer")
.prepend(job);

document
.getElementById("totalJobs")
.textContent =
document.querySelectorAll(".job-card").length;

alert("Job published successfully.");

document.getElementById("jobTitle").value="";
document.getElementById("companyName").value="";
document.getElementById("jobLocation").value="";
document.getElementById("jobDescription").value="";

});

}


// ======================
// JOB BUTTONS
// ======================

document.addEventListener("click",(e)=>{

if(e.target.classList.contains("saveBtn")){

e.target.innerHTML="✔ Saved";

e.target.disabled=true;

const count=
document.getElementById("savedJobsCount");

count.textContent=
Number(count.textContent)+1;

}

if(e.target.classList.contains("applyBtn")){

alert("Application submitted.");

const count=
document.getElementById("applicationsCount");

count.textContent=
Number(count.textContent)+1;

}

if(e.target.classList.contains("viewBtn")){

alert("Job details feature coming soon.");

}

});


// ======================
// NOTIFICATIONS
// ======================

document.addEventListener("click",(e)=>{

if(e.target.classList.contains("markReadBtn")){

const card=
e.target.closest(".notification-card");

card.classList.remove("unread");

e.target.remove();

updateNotificationCount();

}

if(e.target.classList.contains("deleteNotificationBtn")){

e.target.closest(".notification-card").remove();

updateNotificationCount();

}

});


const markAllReadBtn=
document.getElementById("markAllReadBtn");

if(markAllReadBtn){

markAllReadBtn.onclick=()=>{

document
.querySelectorAll(".notification-card")
.forEach(card=>{

card.classList.remove("unread");

});

document
.querySelectorAll(".markReadBtn")
.forEach(btn=>btn.remove());

updateNotificationCount();

};

}


const clearNotificationsBtn=
document.getElementById("clearNotificationsBtn");

if(clearNotificationsBtn){

clearNotificationsBtn.onclick=()=>{

document
.getElementById("notificationContainer")
.innerHTML="";

updateNotificationCount();

};

}

function updateNotificationCount(){

const total=
document.querySelectorAll(".notification-card").length;

const unread=
document.querySelectorAll(".notification-card.unread").length;

document.getElementById("totalNotifications").textContent=total;

document.getElementById("unreadNotifications").textContent=unread;

}


// ======================
// SETTINGS
// ======================

// SAVE ACCOUNT SETTINGS

const saveAccountBtn =
document.getElementById("saveAccountBtn");

if(saveAccountBtn){

saveAccountBtn.addEventListener("click",()=>{

const name =
document.getElementById("settingsName").value.trim();

const email =
document.getElementById("settingsEmail").value.trim();

const username =
document.getElementById("settingsUsername").value.trim();

if(name){

document.getElementById("displayName").textContent=name;
document.getElementById("myN").textContent=name;

}

if(email){

document.getElementById("myE").textContent=email;

}

if(username){

document.getElementById("displayUsername").textContent=username;

}

alert("Account settings updated successfully.");

});

}


// ======================
// CHANGE PASSWORD
// ======================

const changePasswordBtn =
document.getElementById("changePasswordBtn");

if(changePasswordBtn){

changePasswordBtn.addEventListener("click",()=>{

const current =
document.getElementById("currentPassword").value;

const password =
document.getElementById("newPassword").value;

const confirmPassword =
document.getElementById("confirmPassword").value;

if(
!current ||
!password ||
!confirmPassword
){

alert("Complete all password fields.");

return;

}

if(password.length<6){

alert("Password must be at least 6 characters.");

return;

}

if(password!==confirmPassword){

alert("Passwords do not match.");

return;

}

alert("Password changed successfully.");

document.getElementById("currentPassword").value="";
document.getElementById("newPassword").value="";
document.getElementById("confirmPassword").value="";

});

}


// ======================
// DARK MODE
// ======================

const darkMode =
document.getElementById("darkMode");

if(darkMode){

darkMode.addEventListener("change",()=>{

document.body.classList.toggle(
"light-mode",
!darkMode.checked
);

localStorage.setItem(
"darkMode",
darkMode.checked
);

});

const saved =
localStorage.getItem("darkMode");

if(saved!==null){

darkMode.checked=(saved==="true");

document.body.classList.toggle(
"light-mode",
!darkMode.checked
);

}

}


// ======================
// ANIMATIONS
// ======================

const animations =
document.getElementById("animations");

if(animations){

animations.addEventListener("change",()=>{

if(animations.checked){

document.body.classList.remove("no-animation");

}else{

document.body.classList.add("no-animation");

}

});

}


// ======================
// PRIVACY SETTINGS
// ======================

const privateProfile =
document.getElementById("privateProfile");

const showEmail =
document.getElementById("showEmail");

const showPhone =
document.getElementById("showPhone");

if(privateProfile){

privateProfile.addEventListener("change",()=>{

alert(
privateProfile.checked
?
"Your profile is now private."
:
"Your profile is now public."
);

});

}

if(showEmail){

showEmail.addEventListener("change",()=>{

document.getElementById("myE").style.display=
showEmail.checked
?
"inline"
:
"none";

});

}

if(showPhone){

showPhone.addEventListener("change",()=>{

document.getElementById("myPhone").style.display=
showPhone.checked
?
"inline"
:
"none";

});

}


// ======================
// DOWNLOAD DATA
// ======================

const downloadDataBtn =
document.getElementById("downloadDataBtn");

if(downloadDataBtn){

downloadDataBtn.addEventListener("click",()=>{

const data={

name:
document.getElementById("displayName").textContent,

username:
document.getElementById("displayUsername").textContent,

email:
document.getElementById("myE").textContent,

posts:
document.querySelectorAll(".post-card").length,

connections:
document.querySelectorAll(".remove-btn").length

};

const blob=
new Blob(
[
JSON.stringify(data,null,2)
],
{
type:"application/json"
}
);

const url=
URL.createObjectURL(blob);

const a=
document.createElement("a");

a.href=url;

a.download="RhockstarConnectData.json";

a.click();

URL.revokeObjectURL(url);

});

}


// ======================
// DELETE ACCOUNT
// ======================

const deleteAccountBtn =
document.getElementById("deleteAccountBtn");

if(deleteAccountBtn){

deleteAccountBtn.addEventListener("click",()=>{

const answer=
confirm(
"This will permanently delete your account. Continue?"
);

if(!answer) return;

localStorage.clear();

alert("Account deleted.");

location.reload();

});

}


// ======================
// UPDATE STATISTICS
// ======================

function updateDashboardStats(){

const posts=
document.querySelectorAll(".post-card").length;

const jobs=
document.querySelectorAll(".job-card").length;

const connections=
document.querySelectorAll(".remove-btn").length;

if(document.getElementById("myPosts"))
document.getElementById("myPosts").textContent=posts;

if(document.getElementById("totalPosts"))
document.getElementById("totalPosts").textContent=posts;

if(document.getElementById("settingsConnections"))
document.getElementById("settingsConnections").textContent=connections;

if(document.getElementById("totalJobs"))
document.getElementById("totalJobs").textContent=jobs;

}

setInterval(updateDashboardStats,1000);


// ======================
// PAGE LOADER
// ======================

document.querySelectorAll("button,a").forEach(item=>{

item.addEventListener("click",()=>{

document.body.classList.add("loading");

setTimeout(()=>{

document.body.classList.remove("loading");

},300);

});

});








