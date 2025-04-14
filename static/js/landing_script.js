document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const predictionForm = document.getElementById('prediction-form');
    const predictionResult = document.getElementById('prediction-result');

    // Navigation logic
    if (navItems.length > 0 && pages.length > 0) {
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                // Handle logout
                if (item.classList.contains('logout')) {
                    window.location.href = 'hp.html';
                    return;
                }

                // Page navigation
                const targetPage = item.dataset.page;
                if (targetPage) {
                    navItems.forEach(n => n.classList.remove('active'));
                    pages.forEach(p => p.classList.remove('active'));

                    item.classList.add('active');
                    const targetElement = document.getElementById(targetPage);
                    if (targetElement) {
                        targetElement.classList.add('active');
                    }
                }
            });
        });
    }

    // Prediction form submission
    if (predictionForm && predictionResult) {
        predictionForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const inputs = Array.from(predictionForm.querySelectorAll('input, select'))
                                .map(input => input.value.trim());

            if (inputs.some(value => value === '')) {
                predictionResult.innerHTML = `<p style="color: red;">Please fill out all fields before submitting.</p>`;
                return;
            }

            // Simulated prediction logic
            const riskCategories = [
                { risk: 'Low Risk', color: 'green', message: 'Your heart health looks good!' },
                { risk: 'Moderate Risk', color: 'orange', message: 'Consider consulting a healthcare professional.' },
                { risk: 'High Risk', color: 'red', message: 'Urgent medical consultation recommended.' }
            ];

            const randomRisk = riskCategories[Math.floor(Math.random() * riskCategories.length)];

            predictionResult.innerHTML = `
                <h2 style="color:${randomRisk.color}">Risk Assessment: ${randomRisk.risk}</h2>
                <p>${randomRisk.message}</p>
                <small>Disclaimer: This is a simulated prediction. Always consult a medical professional.</small>
            `;
        });
    }
});
