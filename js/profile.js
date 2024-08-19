window.onload = function() {
    // Set the theme from cookies
    const theme = getTheme();
    if (theme) {
        document.body.className = theme;
    }

    // Retrieve the username, gender, and phone from cookies or fallback to other sources
    const cookieUsername = getCookie('username');
    const username = cookieUsername || localStorage.getItem('username') || sessionStorage.getItem('username');
    const gender = getCookie('gender') || localStorage.getItem('gender');
    const phone = getCookie('phone') || localStorage.getItem('phone');
    const weight = getCookie('weight')|| localStorage.getItem('weight');
    const height = getCookie('height')|| localStorage.getItem('height');
    const profileImgSrc = getCookie('profileImgSrc'); // Get profile image src from cookie

    // Update the 'name' element with the username from cookies or fallback to other sources
    const nameElement = document.getElementById('name');
    if (nameElement) {
        nameElement.value = username || 'Guest'; // Use value for input fields
    }

    if (gender) {
        document.getElementById('gender').value = gender;
    }

    if (phone) {
        document.getElementById('phone').value = phone;
    }

    if (weight){
        document.getElementById('weight').value = weight;
    }

    if (height){
        document.getElementById('height').value = height;
    }

    if (profileImgSrc) {
        document.getElementById('profile-img').src = '../assets/img/' + profileImgSrc; // Update profile image source
    }

    const savedSteps = sessionStorage.getItem('userSteps');
    if (savedSteps) {
        document.getElementById('steps-input').value = savedSteps;
        updateProgress();
    }
};

function saveChanges() {
    const username = document.getElementById('name').value;
    const gender = document.getElementById('gender').value;
    const phone = document.getElementById('phone').value;
    const weight = document.getElementById ('weight').value;
    const height = document.getElementById ('height').value;

    // Store the user data in cookies
    setCookie('username', username, 7); // Cookie expires in 7 days
    setCookie('gender', gender, 7);
    setCookie('phone', phone, 7);
    setCookie('weight', weight, 7);
    setCookie('height', height, 7);

    alert('Changes saved successfully!');
}

// Function to set a cookie
function setCookie(name, value, days) {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
}

function updateProgress() {
    const steps = parseInt(document.getElementById('steps-input').value, 10);
    sessionStorage.setItem('userSteps', steps);  // Store steps in session storage
    const goal = 10000;
    const progress = (steps / goal) * 100;
    const circle = document.querySelector('.circle');
    const progressValue = document.getElementById('progress-value');
    
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (progress / 100) * circumference;
    
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    circle.style.strokeDashoffset = offset;
    
    progressValue.textContent = `${Math.min(progress, 100).toFixed(2)}%`;
}

function showIconOptions() {
    document.getElementById('icon-options').style.display = 'block';
}

function changeProfilePic(src) {
    document.getElementById('profile-img').src = '../assets/img/' + src;
    // Save the selected profile picture to cookie
    setCookie('profileImgSrc', src, 7); // Cookie expires in 7 days
}

function updateProfilePic() {
    document.getElementById('icon-options').style.display = 'none';
}

function cancelSelection() {
    document.getElementById('icon-options').style.display = 'none';
}

function setTheme(theme) {
    document.cookie = "theme=" + theme + "; path=/; expires=" + new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString(); // Cookie expires in 7 days
    document.body.className = theme;
}

function getTheme() {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const parts = cookies[i].split('=');
        if (parts[0] === 'theme') {
            return parts[1];
        }
    }
    return null;
}

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null; // Return null if cookie is not found
}

function logout() {
    // Clear session storage
    sessionStorage.clear();
    
    // Redirect to login page
    window.location.href = 'fitnessLogin.html';
}
