const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
});

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
});
document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const loginForm = document.querySelector('.form-box.login form');

    // Toggle between Login and Register
    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });

    // Login Form Submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get input values
        const username = loginForm.querySelector('input[type="text"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        // Simple validation (you'd replace this with actual authentication)
        if (username && password) {
            // Redirect to home.html
            window.location.href = 'hp.html';
        } else {
            alert('Please enter username and password');
        }
    });

    // Social Login Placeholders
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Social login is not implemented in this version');
        });
    });

    // Forgot Password
    const forgotLink = document.querySelector('.forgot-link a');
    forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Forgot password functionality is not implemented');
    });
});