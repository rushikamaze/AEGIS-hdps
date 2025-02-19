document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const pages = document.querySelectorAll('.page');
    const predictionForm = document.getElementById('prediction-form');
    const predictionResult = document.getElementById('prediction-result');

    // Navigation logic
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            // Handle logout
            if (item.classList.contains('logout')) {
                window.location.href = 'hp.html';
                return;
            }

            // Page navigation
            const targetPage = item.dataset.page;
            
            navItems.forEach(n => n.classList.remove('active'));
            pages.forEach(p => p.classList.remove('active'));
            
            item.classList.add('active');
            document.getElementById(targetPage).classList.add('active');
        });
    });

    // Prediction form submission
    predictionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Simulated prediction logic
        const inputs = Array.from(predictionForm.querySelectorAll('input, select'))
                             .map(input => input.value);
        
        // This would normally involve sending data to a backend/ML model
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
});