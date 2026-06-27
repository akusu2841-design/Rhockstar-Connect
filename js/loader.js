// ======================
// LOADER
// ======================

(() => {

    function showLoader() {
        document.body.classList.add("loading");
    }

    function hideLoader() {
        document.body.classList.remove("loading");
    }

    window.showLoader = showLoader;
    window.hideLoader = hideLoader;

    document.addEventListener("DOMContentLoaded", () => {

        document.querySelectorAll("button,a").forEach(item => {

            item.addEventListener("click", () => {

                showLoader();

                setTimeout(hideLoader, 300);

            });

        });

    });

})();
