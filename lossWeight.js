document.addEventListener("DOMContentLoaded", function() {
    // Slideshow functionality
    let slideIndex = 1;
    showSlides(slideIndex);

    function showSlides(n) {
        let slides = document.getElementsByClassName("mainfade");
        let dots = document.getElementsByClassName("dot");

        if (n > slides.length) { slideIndex = 1 }
        if (n < 1) { slideIndex = slides.length }

        for (let i = 0; i < slides.length; i++) {
            slides[i].style.display = "none";
        }
        for (let i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }

        slides[slideIndex-1].style.display = "block";
        dots[slideIndex-1].className += " active";
    }

    function currentSlide(n) {
        showSlides(slideIndex = n);
    }

    function plusSlides(n) {
        showSlides(slideIndex += n);
    }

    // Expose these functions globally
    window.currentSlide = currentSlide;
    window.plusSlides = plusSlides;

    // Handle exercise icon clicks
    document.querySelector('.icon').addEventListener('click', function(event) {
        const targetIcon = event.target.closest('.exercise-icon');
        if (!targetIcon) return;

        const targetId = targetIcon.dataset.exercise;
        const contentArea = document.getElementById('content-area');

        contentArea.innerHTML = ''; // Clear previous content

        if (targetId === "running") {
            showRunningVideo(contentArea);
        } else if (targetId === "swimming") {
            showSwimmingStyles(contentArea);
        } else if (targetId === "zumbaDance") {
            showDancingVideo(contentArea);
        } else if (targetId === "jumpingRope") {
            showJumpingVideo(contentArea);
        }
    });

    function showRunningVideo(contentArea) {
        contentArea.innerHTML = `
            <h3>Running</h3>
            <p>Running is a high-impact cardio exercise that burns calories efficiently...</p>
            <h4>Choose a Level:</h4>
            <div id="running-levels">
                <div class="running-level" onclick="showRunningLevel('easy')">
                    <img src="./assets/img/EASY.png" alt="Easy Running">
                    <p>Easy</p>
                </div>
                <div class="running-level" onclick="showRunningLevel('medium')">
                    <img src="./assets/img/MEDIUM.png" alt="Medium Running">
                    <p>Medium</p>
                </div>
                <div class="running-level" onclick="showRunningLevel('hard')">
                    <img src="./assets/img/HARD.png" alt="Hard Running">
                    <p>Hard</p>
                </div>
            </div>
            <div id="level-details"></div>
        `;
    }

    window.showRunningLevel = function(level) {
        const contentArea = document.getElementById('level-details');
        let videoCode;
        let levelInfo;

        switch(level) {
            case 'easy':
                videoCode = 'kVnyY17VS9Y';
                levelInfo = 'Easy running involves a slow pace, allowing you to build endurance gradually.';
                break;
            case 'medium':
                videoCode = 'lWWZQpwKjhs';
                levelInfo = 'Medium running is moderately paced, challenging your stamina while still being manageable.';
                break;
            case 'hard':
                videoCode = '7FRWXrdmKl8';
                levelInfo = 'Hard running is fast-paced, pushing your limits and improving your speed and endurance.';
                break;
            default:
                videoCode = '';
                levelInfo = 'Unknown level';
        }

        contentArea.innerHTML = `
            <h3>${level.charAt(0).toUpperCase() + level.slice(1)} Running Technique Video</h3>
            <p>${levelInfo}</p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoCode}" frameborder="0" allowfullscreen></iframe>
        `;
    }

    function showSwimmingStyles(contentArea) {
        const swimmingInfo = "Swimming is a full-body workout that's gentle on your joints. It improves cardiovascular fitness, builds muscle strength, and enhances flexibility. The buoyancy of water makes it an ideal exercise for people of all ages and fitness levels, including those with injuries or chronic conditions.";

        const swimmingStyles = [
            { name: "Butterfly", image: "./assets/img/butterflystroke_swim.gif" },
            { name: "Freestyle", image: "./assets/img/frontCrawl_swim.gif" },
            { name: "Breaststroke", image: "./assets/img/breaststroke_swim.gif" },
            { name: "Backstroke", image: "./assets/img/backstroke_swim.gif" }
        ];

        let stylesHTML = `
            <h3>Swimming</h3>
            <p>${swimmingInfo}</p>
            <h4>Choose a Swimming Style:</h4>
            <div id="swimming-styles">
        `;

        swimmingStyles.forEach(style => {
            stylesHTML += `
                <div class="swimming-style" onclick="showSwimmingStyle('${style.name}')">
                    <img src="${style.image}" alt="${style.name}">
                    <p>${style.name}</p>
                </div>
            `;
        });
        stylesHTML += '</div><div id="style-details"></div>';
        contentArea.innerHTML = stylesHTML;
    }

    window.showSwimmingStyle = function(style) {
        const contentArea = document.getElementById('style-details');
        let videoCode;
        let styleInfo;

        switch(style.toLowerCase()) {
            case 'freestyle':
                videoCode = 'gnu4AnI2nqg';
                styleInfo = 'Freestyle is the fastest and most efficient swimming stroke. It \'s characterized by alternating arm movements and a flutter kick.';
                break;
            case 'backstroke':
                videoCode = 'MrFt6JHii8w';
                styleInfo = 'Backstroke is swum on the back, using alternating circular arm motions and a flutter kick. It \'s excellent for improving posture and back strength.';
                break;
            case 'breaststroke':
                videoCode = 'EElzlIMjk_c';
                styleInfo = 'Breaststroke involves simultaneous arm and leg movements. It\'s a slower stroke but provides an excellent workout for the whole body.';
                break;
            case 'butterfly':
                videoCode = 'riIyImmuB_M';
                styleInfo = 'Butterfly is the most demanding stroke, requiring strong shoulders and perfect timing. It involves simultaneous arm motion and a dolphin kick.';
                break;
            default:
                videoCode = 'VIDEOCODE';
                styleInfo = 'Information about this swimming technique...';
        }

        contentArea.innerHTML = `
            <h3>${style} Swimming Style</h3>
            <p>${styleInfo}</p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/${videoCode}" frameborder="0" allowfullscreen></iframe>
        `;
    }

    function showDancingVideo(contentArea) {
        contentArea.innerHTML = `
            <h3>Zumba Dance Workout</h3>
                <p>Zumba is a fun, high-energy dance workout that combines Latin and international music with dance moves. It targets your whole body, improving coordination, balance, and flexibility. 
                    Zumba is an excellent way to burn calories, reduce stress, and boost your confidence while enjoying upbeat music.</p>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/e5rW7qjd3BY" frameborder="0" allowfullscreen></iframe>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/mZeFvX3ALKY" frameborder="0" allowfullscreen></iframe>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/opAL9UPg2d0" frameborder="0" allowfullscreen></iframe>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/oRSZ0aELPbw" frameborder="0" allowfullscreen></iframe>
                <iframe width="560" height="315" src="https://www.youtube.com/embed/CpsDgAADnp8" frameborder="0" allowfullscreen></iframe>
            `;
    }

    function showJumpingVideo(contentArea) {
        contentArea.innerHTML = `
            <h3>Jump Rope Techniques</h3>
            <p>Jumping rope is a simple yet highly effective cardiovascular exercise. It improves coordination, boosts stamina, and burns calories rapidly. 
                This low-cost, portable exercise option also enhances bone density, agility, and balance. It's an excellent addition to any fitness routine for both beginners and advanced athletes.</p>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/u3zgHI8QnqE" frameborder="0" allowfullscreen></iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/MqUhcwDV_fc" frameborder="0" allowfullscreen></iframe>
            <iframe width="560" height="315" src="https://www.youtube.com/embed/DTdaiqR9now" frameborder="0" allowfullscreen></iframe>
        `;
    }
});
