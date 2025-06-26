document.addEventListener('DOMContentLoaded', () => {
    const calculateButton = document.getElementById('calculateButton');
    const confirmationModal = document.getElementById('confirmationModal');
    const editButton = document.getElementById('editButton');
    const confirmButton = document.getElementById('confirmButton');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingSpinner = document.getElementById('loadingSpinner');  
    const nameInput = document.getElementById('name');
    const birthDateInput = document.getElementById('birthDate');
    const birthTimeInput = document.getElementById('birthTime');
    const locationInput = document.getElementById('birthPlace');
    const commentInput = document.getElementById('comment');

    const loadingImages = [
        'load/Step 1.png',
        'load/Step 2.png',
        'load/Step 3.png',
        'load/Step 4.png',
        'load/Step 5.png',
        'load/Step 6.png'
    ];
    let currentImageIndex = 0;
    let loadingAnimationInterval;

    function startLoadingAnimation() {
        loadingSpinner.innerHTML = '';
        const img = document.createElement('img');
        img.src = loadingImages[currentImageIndex];
        loadingSpinner.appendChild(img);

        loadingAnimationInterval = setInterval(() => {
            currentImageIndex = (currentImageIndex + 1) % loadingImages.length;
            img.src = loadingImages[currentImageIndex];
        }, 150);
    }

    function stopLoadingAnimation() {
        clearInterval(loadingAnimationInterval);
        loadingSpinner.innerHTML = '';
    }

    if (calculateButton) {
        calculateButton.addEventListener('click', () => {
            confirmationModal.classList.remove('hidden');
        });
    }

    if (editButton) {
        editButton.addEventListener('click', () => {
            confirmationModal.classList.add('hidden');
        });
    }

    if (confirmButton) {
        confirmButton.addEventListener('click', () => {
            const newUser = {
                id: '_' + Math.random().toString(36).substr(2, 9), 
                name: nameInput.value.trim(),
                birthDate: birthDateInput.value.trim(),
                birthTime: birthTimeInput.value.trim(),
                location: locationInput.value.trim(),
                comment: commentInput ? commentInput.value.trim() : '' 
            };

            let users = JSON.parse(localStorage.getItem('users')) || [];
            users.push(newUser);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('selectedUserId', newUser.id);

            confirmationModal.classList.add('hidden');
            loadingOverlay.classList.remove('hidden');
            startLoadingAnimation();

            setTimeout(() => {
                stopLoadingAnimation();
                window.location.href = 'main.html';
            }, 3000);
        });
    }

    if (confirmationModal) {
        confirmationModal.addEventListener('click', (event) => {
            if (event.target === confirmationModal) {
                confirmationModal.classList.add('hidden');
            }
        });
    }

    function loadSelectedUserData() {
        const selectedUserId = localStorage.getItem('selectedUserId');
        if (selectedUserId && selectedUserId !== 'default') {
            const users = JSON.parse(localStorage.getItem('users')) || [];
            const userToEdit = users.find(user => user.id === selectedUserId);

            if (userToEdit) {
                nameInput.value = userToEdit.name || '';
                birthDateInput.value = userToEdit.birthDate || '';
                birthTimeInput.value = userToEdit.birthTime || '';
                locationInput.value = userToEdit.location || '';
                if (commentInput) {
                    commentInput.value = userToEdit.comment || '';
                }
            }
        } else {
            nameInput.value = '';
            birthDateInput.value = '';
            birthTimeInput.value = '';
            locationInput.value = '';
            if (commentInput) {
                    commentInput.value = '';
                }
        }
    }

    loadSelectedUserData();
});