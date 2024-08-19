$(document).ready(function() {
    $('.slider').slick({
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: true,
        centerPadding: '0',
        focusOnSelect: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
});


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

            // Check if user has already submitted the form
            var storedFeedback = localStorage.getItem('feedbacks');
            var feedbacks = storedFeedback ? JSON.parse(storedFeedback) : [];

            var userAlreadySubmitted = feedbacks.some(function(item) {
                return item.email === email;
            });

            if (userAlreadySubmitted) {
                alert('You have already submitted the feedback form.');
                return;
            }

            // Store feedback data
            var feedbackData = {
                name: name,
                email: email,
                feedback: feedback,
                rating: rating,
                date: new Date().toISOString()
            };

            feedbacks.push(feedbackData);
            localStorage.setItem('feedbacks', JSON.stringify(feedbacks));

            alert('Submission has been received!');
            form.reset();
        });
    }
});

function initMap() {
    var userLocation = { lat: 4.3192, lng: 101.1540}; 

    var map = new google.maps.Map(document.getElementById('map'), {
        center: userLocation,
        zoom: 15
    });

    var places = [
        { name: 'Orange Fitness Centre', lat: 4.3156, lng: 101.1475, address: '49-G & 51-G, 26, Jalan Kampar Barat 1, Taman Kampar Barat, 31900 Kampar, Perak' },
        { name: 'Feex Fitness Kampar', lat: 4.3180, lng: 101.1476, address: 'level 1, no 126029, Jalan Hala Timah 4, Taman Bandar Baru, 31900 Kampar, Perak' },
        { name: 'Sixbase Sport Arena', lat: 4.3129, lng: 101.1500, address: '1st Floor, Tin Village, Jalan Batu Karang, 31900 Kampar, Perak' },
        { name: 'Sport Complex Grand Kampar', lat: 4.3178, lng: 101.1467, address: 'Lot 17813, Jalan Batu Karang, Taman Bandar Baru, 31900 Kampar, Perak' },
        { name: 'FatAway Fitness', lat: 4.3190, lng: 101.1473, address: '2377, Jalan Hala Timah 3, Taman Bandar Baru, 31900 Kampar, Perak' },
        { name: 'Sport Complex UTAR Kampar', lat: 4.3194, lng: 101.1812, address: '31900 Kampar, Perak' }
    ];

    places.forEach(function(place) {
        var marker = new google.maps.Marker({
            map: map,
            position: { lat: place.lat, lng: place.lng },
            title: place.name
        });

        var infowindow = new google.maps.InfoWindow({
            content: '<div style="color: #000000; font-family: Arial, sans-serif; font-size: 14px;">' +
                     '<strong>' + place.name + '</strong><br>' +
                     place.address +
                     '</div>'
        });

        marker.addListener('click', function() {
            infowindow.open(map, marker);
        });
    });
}

document.addEventListener("DOMContentLoaded", function() {
    initMap();
});
