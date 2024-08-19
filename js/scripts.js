
window.addEventListener('DOMContentLoaded', event => {

    /* ===============================================
        Preloader
    ============================================== */
    setTimeout(function () {
        $('.loader_bg').animate({
            height: 'toggle',
        });
    }, 1500);


    /* ===============================================
        Toggle Side Bar
    ============================================== */
    function openNav() {
        document.querySelector(".custom_menu-btn").classList.toggle("menu_btn-style");

        var navOverlay = document.querySelector(".navOverlay");
        var shareButtons = document.querySelector(".sharethis-inline-share-buttons");

        navOverlay.classList.toggle("menu_width");

        if (navOverlay.classList.contains("menu_width")) {
            shareButtons.style.display = "none";
        } else {
            shareButtons.style.display = "block";
        }
    }

    // Attach the openNav function to the button click event
    document.querySelector('.openbtn').addEventListener('click', openNav);
});

