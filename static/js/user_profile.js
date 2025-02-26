document.getElementById('file-upload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(event) {
            document.getElementById('preview-image').src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Handle form submission
document.getElementById('save-profile').addEventListener('click', function() {
    // Collect form data
    const formData = {
        displayName: document.getElementById('display-name').value,
        email: document.getElementById('user-email').value,
        age: document.getElementById('user-age').value,
        gender: document.getElementById('user-gender').value,
        firstName: document.getElementById('first-name').value,
        surname: document.getElementById('surname').value,
        mobile: document.getElementById('mobile').value,
        bloodgroup: document.getElementById('blood-group').value,
        address: document.getElementById('address').value,
        country: document.getElementById('country').value,
        stateRegion: document.getElementById('state-region').value
    };
    
    console.log('Form data:', formData);
    alert('Profile saved successfully!');
});

// Sync name fields (optional feature)
document.getElementById('display-name').addEventListener('input', function() {
    const names = this.value.split(' ');
    if (names.length > 0) {
        document.getElementById('first-name').value = names[0];
        if (names.length > 1) {
            document.getElementById('surname').value = names.slice(1).join(' ');
        }
    }
});