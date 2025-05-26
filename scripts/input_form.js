document.addEventListener('DOMContentLoaded', () => {
    const calculateButton = document.getElementById('calculateButton');
    const confirmationModal = document.getElementById('confirmationModal');
    const editButton = document.getElementById('editButton');
    const confirmButton = document.getElementById('confirmButton');

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
            alert('Данные подтверждены!');
            confirmationModal.classList.add('hidden');
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