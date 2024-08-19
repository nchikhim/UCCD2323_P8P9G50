document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');

    // Function to safely get elements by ID
    function getElement(id) {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with id "${id}" not found`);
        }
        return element;
    }

    const loginForm = getElement('loginForm');
    const signupForm = getElement('signupForm');
    const loginBox = getElement('loginBox');
    const signupBox = getElement('signupBox');
    const showSignupLink = getElement('showSignup');
    const showLoginLink = getElement('showLogin');
    const loadingIcon = getElement('loading-icon');

    console.log('Elements loaded:', { loginForm, signupForm, loginBox, signupBox, showSignupLink, showLoginLink, loadingIcon });

    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    if (signupForm) {
        signupForm.addEventListener('submit', handleSignup);
    }

    if (showSignupLink) {
        showSignupLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Show signup clicked');
            if (loginBox && signupBox) {
                loginBox.style.display = 'none';
                signupBox.style.display = 'block';
            } else {
                console.error('loginBox or signupBox not found');
            }
        });
    }

    if (showLoginLink) {
        showLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            console.log('Show login clicked');
            if (signupBox && loginBox) {
                signupBox.style.display = 'none';
                loginBox.style.display = 'block';
            } else {
                console.error('signupBox or loginBox not found');
            }
        });
    }

    function handleLogin(e) {
        e.preventDefault();
        showLoading();
    
        const username = document.getElementById('loginUsername').value.trim();
        const password = document.getElementById('loginPassword').value;
    
        if (!username || !password) {
            alert('Please fill in all fields');
            hideLoading();
            return;
        }
    
        // Simulating API call
        setTimeout(() => {
            try {
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                const user = users.find(u => u.name === username && u.password === password);
    
                if (user) {
                    const rememberMe = document.querySelector('input[type="checkbox"]').checked;
                    if (rememberMe) {
                        localStorage.setItem('isLoggedIn', 'true');
                        localStorage.setItem('username', username); // Store the username
                        setCookie('username', username, 30); // Set the cookie with a 30-day expiration
                    } else {
                        sessionStorage.setItem('isLoggedIn', 'true');
                        sessionStorage.setItem('username', username); // Store the username
                        sessionStorage.setItem('loginTimestamp', new Date().getTime().toString()); // Store login timestamp
                    }
                    
                    setCookie('lastLogin', new Date().toUTCString(), 30);
                    window.location.href = 'index.html';
                } else {
                    alert('Invalid credentials');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred during login');
            } finally {
                hideLoading();
            }
        }, 1500);
    }
    

    function handleSignup(e) {
        e.preventDefault();
        showLoading();
    
        const username = document.getElementById('signupName').value.trim(); // Username input
        const password = document.getElementById('signupPassword').value;
        const confirmPassword = document.getElementById('signupConfirmPassword').value;
    
        if (!username || !password || !confirmPassword) {
            alert('Please fill in all fields');
            hideLoading();
            return;
        }
    
        if (password !== confirmPassword) {
            alert("Passwords don't match");
            hideLoading();
            return;
        }
    
        // Simulating API call
        setTimeout(() => {
            try {
                // Store user data in localStorage
                const users = JSON.parse(localStorage.getItem('users') || '[]');
                users.push({ name: username, password }); // Save username instead of email
                localStorage.setItem('users', JSON.stringify(users));
    
                alert('Account created successfully. Please log in.');
                clearFormFields(signupForm);
                signupBox.style.display = 'none';
                loginBox.style.display = 'block';
            } catch (error) {
                console.error('Error during signup:', error);
                alert('An error occurred during signup');
            } finally {
                hideLoading();
            }
        }, 1500);
    }

    function showLoading() {
        if (loadingIcon) loadingIcon.style.display = 'flex';
    }

    function hideLoading() {
        if (loadingIcon) loadingIcon.style.display = 'none';
    }

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value || "")  + expires + "; path=/";
    }

    function clearFormFields(form) {
        form.reset();
        const inputs = form.querySelectorAll('input:not([type="submit"])');
        inputs.forEach(input => input.value = '');
    }

    function logout() {
        localStorage.removeItem('isLoggedIn');
        sessionStorage.removeItem('isLoggedIn');
        localStorage.removeItem('username');
        sessionStorage.removeItem('username');
        sessionStorage.removeItem('loginTimestamp'); // Remove login timestamp
        window.location.href = 'login.html';
    }

    function checkLoginStatus() {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const sessionLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
        const loginTimestamp = parseInt(sessionStorage.getItem('loginTimestamp') || '0');
        const now = new Date().getTime();
        const timeDiff = now - loginTimestamp;
        const tenMinutes = 10 * 60 * 1000;
    
        if ((isLoggedIn || sessionLoggedIn) && timeDiff < tenMinutes) {
            if (!window.location.pathname.includes('login.html')) {
                console.log('User is logged in, redirecting...');
                window.location.href = 'index.html';
            }
        } else if (sessionLoggedIn) {
            // Session has expired
            alert('Your session has expired. Please log in again.');
            logout();
        }
    }

    // Set the session login timestamp and start session status check
    sessionStorage.setItem('loginTimestamp', new Date().getTime().toString());
    document.addEventListener('DOMContentLoaded', checkLoginStatus);
    setInterval(checkLoginStatus, 5 * 60 * 1000);

    // Set a cookie with the username
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + encodeURIComponent(value || "") + expires + "; path=/";
    }

    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }
    
    // Read the username cookie on page load
    const username = getCookie('username');

});
