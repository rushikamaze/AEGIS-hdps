document.addEventListener('DOMContentLoaded', () => {
    const container = document.querySelector('.container');
    const registerBtn = document.querySelector('.register-btn');
    const loginBtn = document.querySelector('.login-btn');
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');

    if (container && registerBtn && loginBtn) {
        registerBtn.addEventListener('click', () => {
            container.classList.add('active');
        });

        loginBtn.addEventListener('click', () => {
            container.classList.remove('active');
        });
    } else {
        console.error("One or more elements are missing from the DOM.");
    }

    // Register User
    if (registerForm) {
        registerForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;

            const response = await fetch('http://127.0.0.1:5000/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();
            alert(result.message);
        });
    }

    // Login User
    if (loginForm) {
        loginForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;

            const response = await fetch('http://127.0.0.1:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();
            alert(result.message);

            if (result.status === 'success') {
                window.location.href = 'dashboard.html';  // Redirect on success
            }
        });
    }
});
