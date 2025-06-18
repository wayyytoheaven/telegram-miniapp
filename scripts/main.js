document.addEventListener('DOMContentLoaded', () => {
    const userAvatar = document.getElementById('userAvatar');
    const userNameElement = document.getElementById('userName');
    const dotsButton = document.getElementById('dotsButton'); // Новая кнопка "..."
    const analysisCard = document.getElementById('analysisCard');
    const luckyDatesCard = document.getElementById('luckyDatesCard');

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
            displayUser = { name: 'Андрей', id: 'default' }; // Дефолтный Андрей, если нет пользователей
            localStorage.removeItem('selectedUserId'); // Убедимся, что нет выбранного ID
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
            window.location.href = 'user_cards.html'; // Переход на новую страницу со списком карт
        });
    }

    // Обработчики для основных карточек контента
    if (analysisCard) {
        analysisCard.addEventListener('click', () => {
            window.location.href = 'analysis_page.html';
        });
    }
    if (luckyDatesCard) {
        luckyDatesCard.addEventListener('click', () => {
            window.location.href = 'favorable_dates.html';
        });
    }
});