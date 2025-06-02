document.addEventListener('DOMContentLoaded', () => {
    const calculateButton = document.getElementById('calculateButton');
    const confirmationModal = document.getElementById('confirmationModal');
    const editButton = document.getElementById('editButton');
    const confirmButton = document.getElementById('confirmButton');
    const loadingOverlay = document.getElementById('loadingOverlay');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const nameInput = document.getElementById('name');

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
            const userName = nameInput.value.trim();
            if (userName) {
                localStorage.setItem('userName', userName);
            } else {
                localStorage.removeItem('userName');
            }

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
});