document.addEventListener('DOMContentLoaded', () => {
    const cardsList = document.getElementById('cardsList');
    const addCardButton = document.getElementById('addCardButton');
    const calculateCompatibilityButton = document.getElementById('calculateCompatibilityButton');

    let selectedCards = [];
    function loadUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }
    function renderCards() {
        cardsList.innerHTML = '';
        const users = loadUsers();

        if (users.length === 0) {
            cardsList.innerHTML = '<p class="no-cards-message">У вас пока нет сохраненных карт. Добавьте первую!</p>';
            calculateCompatibilityButton.classList.add('disabled');
            calculateCompatibilityButton.disabled = true;
            return;
        }

        users.forEach(user => {
            const card = document.createElement('div');
            card.classList.add('user-card');
            card.dataset.userId = user.id;
            if (selectedCards.includes(user.id)) {
                card.classList.add('selected');
            }
            const birthDate = user.birthDate || '';
            const birthTime = user.birthTime || '';
            const location = user.location || '';
            const details = `${birthDate}, ${birthTime}, ${location}`;

            card.innerHTML = `
                <div class="avatar-circle">${user.name.charAt(0).toUpperCase()}</div>
                <div class="card-info">
                    <span class="card-name">${user.name}</span>
                    <span class="card-details">${details}</span>
                </div>
                <div class="radio-icon"></div>
            `;

            card.addEventListener('click', () => {
                const userId = card.dataset.userId;

                if (selectedCards.includes(userId)) {
                    selectedCards = selectedCards.filter(id => id !== userId);
                    card.classList.remove('selected');
                } else {
                    if (selectedCards.length < 2) {
                        selectedCards.push(userId);
                        card.classList.add('selected');
                    } else {
                        alert('Вы можете выбрать только 2 карты для анализа совместимости.');
                    }
                }
                updateCalculateButtonState();
            });

            cardsList.appendChild(card);
        });
        updateCalculateButtonState();
    }

    function updateCalculateButtonState() {
        if (selectedCards.length === 2) {
            calculateCompatibilityButton.classList.remove('disabled');
            calculateCompatibilityButton.disabled = false;
        } else {
            calculateCompatibilityButton.classList.add('disabled');
            calculateCompatibilityButton.disabled = true;
        }
    }

    if (addCardButton) {
        addCardButton.addEventListener('click', () => {
            localStorage.removeItem('selectedUserId');
            window.location.href = 'input_form.html';
        });
    }

    if (calculateCompatibilityButton) {
        calculateCompatibilityButton.addEventListener('click', () => {
            if (selectedCards.length === 2) {
                localStorage.setItem('selectedCompatibilityCards', JSON.stringify(selectedCards));
                alert('Рассчитываем совместимость для: ' + selectedCards.join(' и '));
            } else {
                alert('Пожалуйста, выберите ровно 2 карты для расчета совместимости.');
            }
        });
    }
    renderCards();
});