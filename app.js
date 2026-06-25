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

  function showPage(pageId) {

    pages.forEach(page => {
      page.style.display = "none";
    });

    const target =
      document.getElementById(pageId);

    if (target) {
      target.style.display = "block";
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
