document.addEventListener('DOMContentLoaded', () => {
    const userAvatar = document.getElementById('userAvatar');
    const userNameElement = document.getElementById('userName');
    const dotsButton = document.getElementById('dotsButton'); // Кнопка "..."
    const analysisCard = document.getElementById('analysisCard');
    const luckyDatesCard = document.getElementById('luckyDatesCard');
    const compatibilityAnalysisCard = document.getElementById('compatibilityAnalysisCard'); // Получаем новую карточку

    // Функция для обновления отображаемого пользователя
    function updateDisplayedUser() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const selectedUserId = localStorage.getItem('selectedUserId');
        
        let displayUser = users.find(user => user.id === selectedUserId);

        // Если выбранный пользователь не найден или нет пользователей, берем первого или "Андрея"
        if (!displayUser && users.length > 0) {
            displayUser = users[0];
            localStorage.setItem('selectedUserId', users[0].id); // Автоматически выбираем первого
        } else if (!displayUser && users.length === 0) {
            displayUser = { name: 'Андрей', id: 'default', location: 'Минск', birthDate: '01.01.2000' }; // Дефолтный Андрей, если нет пользователей
            // Добавим дефолтного Андрея в localStorage, если его нет
            if (!users.some(user => user.id === 'default')) {
                users.push(displayUser);
                localStorage.setItem('users', JSON.stringify(users));
            }
            localStorage.setItem('selectedUserId', 'default');
        }

        if (userNameElement) {
            userNameElement.textContent = displayUser.name;
        }
        if (userAvatar) {
            userAvatar.textContent = displayUser.name.charAt(0).toUpperCase();
        }
    }

    // Вызываем при загрузке страницы для отображения актуального пользователя
    updateDisplayedUser();

    // Обработчик для кнопки "..."
    if (dotsButton) {
        dotsButton.addEventListener('click', () => {
            window.location.href = 'user_cards.html'; // Переход на страницу списка карт
        });
    }
    
    // Обработчик для кнопки "+" рядом с именем пользователя
    const addPersonButton = document.querySelector('.action-button.add-person-button');
    if (addPersonButton) {
        addPersonButton.addEventListener('click', () => {
            localStorage.removeItem('selectedUserId'); // Очищаем, чтобы форма ввода была пустой для новой карты
            window.location.href = 'input_form.html';
        });
    }

    // Обработчики для основных карточек контента
    if (analysisCard) {
        analysisCard.addEventListener('click', () => {
            window.location.href = 'analysis_page.html'; // Пример страницы
        });
    }
    if (luckyDatesCard) {
        luckyDatesCard.addEventListener('click', () => {
            window.location.href = 'favorable_dates.html'; // Пример страницы
        });
    }
    if (compatibilityAnalysisCard) { // Добавляем обработчик для новой карточки
        compatibilityAnalysisCard.addEventListener('click', () => {
            window.location.href = 'compatibility_selection.html'; // Переход на новую страницу выбора карт для совместимости
        });
    }
});