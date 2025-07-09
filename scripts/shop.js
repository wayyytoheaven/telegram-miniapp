document.addEventListener('DOMContentLoaded', () => {
    const subscribeButton = document.querySelector('.subscribe-button');
    const buyStarsButtons = document.querySelectorAll('.buy-stars-button');
    function getStars() {
        return parseInt(localStorage.getItem('userStars') || '100', 10);
    }
    function updateStars(amount) {
        let currentStars = getStars();
        currentStars += amount;
        localStorage.setItem('userStars', currentStars.toString());
        alert(`Ваш баланс звезд: ${currentStars}`);
    }
    if (subscribeButton) {
        subscribeButton.addEventListener('click', () => {
            alert('Вы успешно подписались на ежемесячную подписку! Доступ к разделам разблокирован и добавлено 100 звезд.');
            updateStars(100);
            localStorage.setItem('hasSubscription', 'true');
        });
    }
    buyStarsButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const starsCard = event.target.closest('.stars-card');
            if (starsCard) {
                const starsAmountText = starsCard.querySelector('.stars-amount').textContent;
                const starsToBuy = parseInt(starsAmountText.split(' ')[0], 10);
                const price = event.target.textContent;

                alert(`Вы купили ${starsToBuy} звезд за ${price}!`);
                updateStars(starsToBuy);
            }
        });
    });
});