// ===============================
// RHOCKSTAR CONNECT
// jobs.js
// ===============================

document.addEventListener("DOMContentLoaded", () => {

    const jobsContainer = document.getElementById("jobsContainer");
    const postJobBtn = document.getElementById("postJobBtn");
    const totalJobs = document.getElementById("totalJobs");

    if (!jobsContainer) return;

    // ==========================
    // LOAD SAVED JOBS
    // ==========================

    const savedJobsHTML = localStorage.getItem("jobs");

    if (savedJobsHTML) {
        jobsContainer.innerHTML = savedJobsHTML;
    }

    updateJobCount();

    // ==========================
    // POST JOB
    // ==========================

    if (postJobBtn) {

        postJobBtn.addEventListener("click", () => {

            const title = document.getElementById("jobTitle").value.trim();
            const company = document.getElementById("companyName").value.trim();
            const location = document.getElementById("jobLocation").value.trim();
            const type = document.getElementById("jobType").value;
            const description = document.getElementById("jobDescription").value.trim();

            if (!title || !company || !location || !description) {

                alert("Complete all fields.");
                return;

            }

            const job = document.createElement("div");

            job.className = "job-card";

            job.innerHTML = `

                <h3>${title}</h3>

                <p><strong>🏢 Company:</strong> ${company}</p>

                <p><strong>📍 Location:</strong> ${location}</p>

                <p><strong>💼 Type:</strong> ${type}</p>

                <p>${description}</p>

                <small>Posted Just Now</small>

                <div class="job-actions">

                    <button class="viewBtn">
                        👁 View
                    </button>

                    <button class="saveBtn">
                        ⭐ Save
                    </button>

                    <button class="applyBtn">
                        📩 Apply
                    </button>

                </div>

            `;

            jobsContainer.prepend(job);

            saveJobs();

            updateJobCount();

            clearForm();

            alert("Job published successfully.");

        });

    }

    // ==========================
    // SEARCH JOBS
    // ==========================

    const searchJobs = document.getElementById("searchJobs");

    if (searchJobs) {

        searchJobs.addEventListener("keyup", () => {

            const value = searchJobs.value.toLowerCase();

            document.querySelectorAll(".job-card").forEach(job => {

                job.style.display = job.innerText
                    .toLowerCase()
                    .includes(value)
                    ? "block"
                    : "none";

            });

        });

    }

});

// ==========================
// SAVE JOBS
// ==========================

function saveJobs() {

    const jobsContainer = document.getElementById("jobsContainer");

    if (!jobsContainer) return;

    localStorage.setItem(
        "jobs",
        jobsContainer.innerHTML
    );

}

// ==========================
// UPDATE JOB COUNT
// ==========================

function updateJobCount() {

    const totalJobs = document.getElementById("totalJobs");

    if (!totalJobs) return;

    totalJobs.textContent =
        document.querySelectorAll(".job-card").length;

}

// ==========================
// CLEAR FORM
// ==========================

function clearForm() {

    const ids = [

        "jobTitle",
        "companyName",
        "jobLocation",
        "jobDescription"

    ];

    ids.forEach(id => {

        const input = document.getElementById(id);

        if (input) input.value = "";

    });

}

// ==========================
// JOB BUTTONS
// ==========================

document.addEventListener("click", e => {

    // SAVE JOB

    if (e.target.classList.contains("saveBtn")) {

        e.target.innerHTML = "✔ Saved";
        e.target.disabled = true;

        const count = document.getElementById("savedJobsCount");

        if (count) {

            count.textContent =
                Number(count.textContent) + 1;

        }

    }

    // APPLY JOB

    if (e.target.classList.contains("applyBtn")) {

        e.target.innerHTML = "✔ Applied";
        e.target.disabled = true;

        const count = document.getElementById("applicationsCount");

        if (count) {

            count.textContent =
                Number(count.textContent) + 1;

        }

        alert("Application submitted successfully.");

    }

    // VIEW JOB

    if (e.target.classList.contains("viewBtn")) {

        const card = e.target.closest(".job-card");

        if (card) {

            alert(card.innerText);

        }

    }

});
