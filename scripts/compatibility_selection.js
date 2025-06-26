document.addEventListener('DOMContentLoaded', () => {
    const cardsList = document.getElementById('cardsList');
    const addCardButton = document.getElementById('addCardButton');
    const calculateCompatibilityButton = document.getElementById('calculateCompatibilityButton');

    let selectedCards = []; // Массив для хранения выбранных ID карт

    // Функция для загрузки пользователей из localStorage
    function loadUsers() {
        return JSON.parse(localStorage.getItem('users')) || [];
    }

    // Функция для рендера списка карт
    function renderCards() {
        cardsList.innerHTML = ''; // Очищаем список перед рендером
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
            card.dataset.userId = user.id; // Сохраняем ID пользователя в data-атрибуте

            // Проверяем, выбрана ли эта карта
            if (selectedCards.includes(user.id)) {
                card.classList.add('selected');
            }

            // Форматируем дату и время
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
                    // Если карта уже выбрана, убираем ее из выбранных
                    selectedCards = selectedCards.filter(id => id !== userId);
                    card.classList.remove('selected');
                } else {
                    // Если карта не выбрана, и если выбрано меньше 2 карт, добавляем ее
                    if (selectedCards.length < 2) {
                        selectedCards.push(userId);
                        card.classList.add('selected');
                    } else {
                        // Если уже выбрано 2 карты, ничего не делаем или показываем сообщение
                        alert('Вы можете выбрать только 2 карты для анализа совместимости.');
                    }
                }
                updateCalculateButtonState();
            });

            cardsList.appendChild(card);
        });
        updateCalculateButtonState(); // Обновляем состояние кнопки после рендера
    }

    // Функция для обновления состояния кнопки "Рассчитать совместимость"
    function updateCalculateButtonState() {
        if (selectedCards.length === 2) {
            calculateCompatibilityButton.classList.remove('disabled');
            calculateCompatibilityButton.disabled = false;
        } else {
            calculateCompatibilityButton.classList.add('disabled');
            calculateCompatibilityButton.disabled = true;
        }
    }

    // Обработчик для кнопки "Добавить карту"
    if (addCardButton) {
        addCardButton.addEventListener('click', () => {
            // Перенаправляем на страницу input_form.html для добавления новой карты
            localStorage.removeItem('selectedUserId'); // Очищаем, чтобы форма была пустой для новой карты
            window.location.href = 'input_form.html';
        });
    }

    // Обработчик для кнопки "Рассчитать совместимость"
    if (calculateCompatibilityButton) {
        calculateCompatibilityButton.addEventListener('click', () => {
            if (selectedCards.length === 2) {
                // Сохраняем выбранные ID карт для дальнейшего использования
                localStorage.setItem('selectedCompatibilityCards', JSON.stringify(selectedCards));
                // Перенаправляем на страницу результатов совместимости
                // Здесь вы должны указать актуальную страницу результатов, например, 'compatibility_results.html'
                alert('Рассчитываем совместимость для: ' + selectedCards.join(' и '));
                // window.location.href = 'compatibility_results.html'; 
            } else {
                alert('Пожалуйста, выберите ровно 2 карты для расчета совместимости.');
            }
        });
    }

    // Рендерим карты при загрузке страницы
    renderCards();
});