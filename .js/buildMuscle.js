document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed'); 

    var form = document.getElementById('feedback-form');
    
    if (form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault(); 

            // Get form values
            var name = document.getElementById('name').value;
            var email = document.getElementById('email').value;
            var feedback = document.getElementById('feedback').value;
            var rating = document.getElementById('rating').value;

            // Log form values to console
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Feedback:', feedback);
            console.log('Rating:', rating);

            // Check if user has already submitted the form
            var storedFeedback = localStorage.getItem('feedbacks');
            var feedbacks = storedFeedback ? JSON.parse(storedFeedback) : [];

            // Check for existing submission using email as a unique identifier
            var userAlreadySubmitted = feedbacks.some(function(feedback) {
                return feedback.email === email;
            });

            if (userAlreadySubmitted) {
                alert('You have already submitted the feedback form.');
                return; // Prevent further processing
            }

            // Create an object to store in local storage
            var feedbackData = {
                name: name,
                email: email,
                feedback: feedback,
                rating: rating,
                date: new Date().toISOString()
            };

            // Log feedbackData object to console
            console.log('Feedback Data:', feedbackData);

            // Store feedback data in local storage
            feedbacks.push(feedbackData);
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

            // Log local storage content to console
            console.log('Stored Feedbacks:', localStorage.getItem('feedbacks'));

            // Show alert
            alert('Submission has been received!');
            
            // Reset form
            form.reset();
        });
    }
});


document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded and parsed');

    const carouselElement = document.querySelector('#exerciseCarousel');
    if (carouselElement) {
        console.log('Initializing carousel');
        const carousel = new bootstrap.Carousel(carouselElement, {
            interval: false, // Disable automatic sliding
            ride: false
        });

        // Function to pause the video
        function pauseVideo(iframe) {
            const iframeWindow = iframe.contentWindow;
            iframeWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }

        // Handle pausing videos on carousel slide events
        function pauseCurrentVideo() {
            const activeItem = carouselElement.querySelector('.carousel-item.active');
            const iframe = activeItem.querySelector('iframe');
            if (iframe) {
                console.log('Pausing video');
                pauseVideo(iframe);
            }
        }

        // Pause video when the carousel item changes
        carouselElement.addEventListener('slide.bs.carousel', function() {
            console.log('Carousel is sliding');
            pauseCurrentVideo();
        });

        // Pause video when navigating via the control buttons
        carouselElement.querySelectorAll('.carousel-control-prev, .carousel-control-next').forEach(button => {
            button.addEventListener('click', function() {
                console.log('Control button clicked');
                // Pause video after a short delay to ensure the carousel has started sliding
                setTimeout(pauseCurrentVideo, 100); // Adjust timeout if needed
            });
        });
    } else {
        console.log('Carousel element not found');
    }
});