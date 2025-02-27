// Wait for the DOM to fully load before attaching event listeners
document.addEventListener('DOMContentLoaded', function() {
    // Image upload preview functionality
    const fileUpload = document.getElementById('file-upload');
    const previewImage = document.getElementById('preview-image');
    
    // Check if elements exist before adding event listeners
    if (fileUpload && previewImage) {
        fileUpload.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(event) {
                    previewImage.src = event.target.result;
                };
                reader.readAsDataURL(file);
                
                // Log successful upload to console for debugging
                console.log('File loaded:', file.name);
            }
        });
    } else {
        console.error('Image upload elements not found in the DOM');
    }

    // Handle form submission
    const saveButton = document.getElementById('save-profile');
    if (saveButton) {
        saveButton.addEventListener('click', function() {
            // Collect form data with error handling
            try {
                const formData = {
                    displayName: getInputValue('display-name'),
                    email: getInputValue('user-email'),
                    age: getInputValue('user-age'),
                    gender: getInputValue('user-gender'),
                    firstName: getInputValue('first-name'),
                    surname: getInputValue('surname'),
                    mobile: getInputValue('mobile'),
                    bloodGroup: getInputValue('blood-group'),
                    address: getInputValue('address'),
                    country: getInputValue('country'),
                    stateRegion: getInputValue('state-region'),
                    profileImage: previewImage ? previewImage.src : null
                };
                
                console.log('Form data:', formData);
                
                // Here you would typically make an AJAX call to save the data
                // For demonstration, just show success message
                alert('Profile saved successfully!');
            } catch (error) {
                console.error('Error saving profile:', error);
                alert('There was an error saving your profile. Please try again.');
            }
        });
    }

    // Sync name fields (optional feature)
    const displayNameField = document.getElementById('display-name');
    if (displayNameField) {
        displayNameField.addEventListener('input', function() {
            const names = this.value.split(' ');
            if (names.length > 0) {
                setInputValue('first-name', names[0]);
                if (names.length > 1) {
                    setInputValue('surname', names.slice(1).join(' '));
                }
            }
        });
    }
    
    // Helper function to safely get input values
    function getInputValue(id) {
        const element = document.getElementById(id);
        return element ? element.value : '';
    }
    
    // Helper function to safely set input values
    function setInputValue(id, value) {
        const element = document.getElementById(id);
        if (element) {
            element.value = value;
        }
    }
});