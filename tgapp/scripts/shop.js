document.addEventListener('DOMContentLoaded', () => {
    const subscribeButton = document.querySelector('.subscribe-button');
    const buyStarsButtons = document.querySelectorAll('.buy-stars-button');
    const confirmationModal = document.getElementById('confirmationModal');
    const confirmMessage = document.getElementById('confirmMessage');
    const confirmYesButton = document.getElementById('confirmYes');
    const confirmNoButton = document.getElementById('confirmNo');

    const successModal = document.getElementById('successModal');
    const successOkButton = document.getElementById('successOk');

    let currentStarsAmount = 0;
    let currentPrice = '';
    let currentPurchaseType = null;
    function getStars() {
        return parseInt(localStorage.getItem('userStars') || '100', 10);
    }
    function updateStars(amount) {
        let currentStars = getStars();
        currentStars += amount;
        localStorage.setItem('userStars', currentStars.toString());
        console.log(`Ваш баланс звезд: ${currentStars}`);
    }
    function showModal(modalElement) {
        modalElement.classList.remove('hidden');
    }
    function hideModal(modalElement) {
        modalElement.classList.add('hidden');
    }
    if (subscribeButton) {
        subscribeButton.addEventListener('click', () => {
            currentPurchaseType = 'subscription';
            confirmMessage.textContent = 'Вы уверены, что хотите оформить ежемесячную подписку за €15?';
            showModal(confirmationModal);
        });
    }
    buyStarsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const starsCard = event.target.closest('.stars-card');
            if (starsCard) {
                currentPurchaseType = 'stars';
                const starsAmountText = starsCard.querySelector('.stars-amount').textContent;
                currentStarsAmount = parseInt(starsAmountText.split(' ')[0], 10);
                currentPrice = event.target.textContent;
                confirmMessage.textContent = `Вы уверены, что хотите купить ${currentStarsAmount} звезд за ${currentPrice}?`;
                showModal(confirmationModal);
            }
        });
    });
    if (confirmYesButton) {
        confirmYesButton.addEventListener('click', () => {
            hideModal(confirmationModal);

            if (currentPurchaseType === 'subscription') {
                updateStars(100);
                localStorage.setItem('hasSubscription', 'true');
                successModal.querySelector('.modal-message').textContent = 'Подписка успешно оформлена! Доступ к разделам разблокирован и добавлено 100 звезд.';
            } else if (currentPurchaseType === 'stars') {
                updateStars(currentStarsAmount);
                successModal.querySelector('.modal-message').textContent = 'Покупка успешно совершена!';
            }
            
            showModal(successModal);
            currentPurchaseType = null;
        });
    }
    if (confirmNoButton) {
        confirmNoButton.addEventListener('click', () => {
            hideModal(confirmationModal);
            currentPurchaseType = null;
        });
    }

    if (successOkButton) {
        successOkButton.addEventListener('click', () => {
            hideModal(successModal);
        });
    }
    if (confirmationModal) {
        confirmationModal.addEventListener('click', (event) => {
            if (event.target === confirmationModal) {
                hideModal(confirmationModal);
                currentPurchaseType = null;
            }
        });
    }
    if (successModal) {
        successModal.addEventListener('click', (event) => {
            if (event.target === successModal) {
                hideModal(successModal);
            }
        });
    }
});