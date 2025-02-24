document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const loginForm = document.querySelector('.form-box.login form');
    const registerForm = document.querySelector('.form-box.register form');

    // Toggle between Login and Register
    registerBtn.addEventListener('click', () => {
        container.classList.add('active');
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove('active');
    });

    // ========== LOGIN FORM SUBMISSION ==========
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get input values
        const email = loginForm.querySelector('input[type="email"]').value;
        const password = loginForm.querySelector('input[type="password"]').value;

        if (!email || !password) {
            alert('Please enter both email and password.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.status === "success") {
                alert('Login successful!');
                window.location.href = 'hp.html'; // Redirect after successful login
            } else {
                alert('Invalid credentials. Please try again.');
            }
        } catch (error) {
            console.error("Error during login:", error);
            alert('Server error. Try again later.');
        }
    });

    // ========== REGISTER FORM SUBMISSION ==========
    registerForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get input values
        const email = registerForm.querySelector('input[type="email"]').value;
        const password = registerForm.querySelector('input[type="password"]').value;

        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }

        try {
            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.message === "User registered successfully") {
                alert('Registration successful! You can now log in.');
                container.classList.remove('active'); // Switch to login view
            } else {
                alert('Registration failed. Try again.');
            }
        } catch (error) {
            console.error("Error during registration:", error);
            alert('Server error. Try again later.');
        }
    });

    // Forgot Password
    const forgotLink = document.querySelector('.forgot-link a');
    forgotLink.addEventListener('click', (e) => {
        e.preventDefault();
        alert('Forgot password functionality is not implemented yet.');
    });

    // Social Login Placeholders
    const socialIcons = document.querySelectorAll('.social-icons a');
    socialIcons.forEach(icon => {
        icon.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Social login is not implemented in this version.');
        });
    });
});
