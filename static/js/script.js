document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const loginForm = document.querySelector('.form-box.login form');
    const registerForm = document.querySelector('.form-box.register form');
    const forgotLink = document.querySelector('.forgot-link a');
    const socialIcons = document.querySelectorAll('.social-icons a');

    // Ensure elements exist before adding event listeners
    if (registerBtn && loginBtn && container) {
        registerBtn.addEventListener('click', () => container.classList.add('active'));
        loginBtn.addEventListener('click', () => container.classList.remove('active'));
    }

    // ========== LOGIN FORM SUBMISSION ==========
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get input values
            const email = loginForm.querySelector('input[type="email"]').value.trim();
            const password = loginForm.querySelector('input[type="password"]').value.trim();

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

                if (response.ok && data.status === "success") {
                    alert('Login successful!');
                    window.location.href = 'hp.html'; // Redirect after successful login
                } else {
                    alert(data.message || 'Invalid credentials. Please try again.');
                }
            } catch (error) {
                console.error("Error during login:", error);
                alert('Server error. Try again later.');
            }
        });
    }

    // ========== REGISTER FORM SUBMISSION ==========
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get input values
            const username = registerForm.querySelector('input[type="text"]').value.trim(); // Add username
            const email = registerForm.querySelector('input[type="email"]').value.trim();
            const password = registerForm.querySelector('input[type="password"]').value.trim();

            if (!username || !email || !password) {
                alert('Please fill in all fields.');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:5000/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username, email, password }) // Send username
                });

                const data = await response.json();

                if (response.ok && data.message === "User registered successfully") {
                    alert('Registration successful! You can now log in.');
                    if (container) container.classList.remove('active'); // Switch to login view
                } else {
                    alert(data.message || 'Registration failed. Try again.');
                }
            } catch (error) {
                console.error("Error during registration:", error);
                alert('Server error. Try again later.');
            }
        });
    }

    // ========== FORGOT PASSWORD PLACEHOLDER ==========
    if (forgotLink) {
        forgotLink.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Forgot password functionality is not implemented yet.');
        });
    }

    // ========== SOCIAL LOGIN PLACEHOLDERS ==========
    if (socialIcons.length > 0) {
        socialIcons.forEach(icon => {
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                alert('Social login is not implemented in this version.');
            });
        });
    }
});
