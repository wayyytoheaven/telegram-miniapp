document.addEventListener('DOMContentLoaded', () => {
    const userCardsList = document.getElementById('userCardsList');
    const addNewCardButton = document.getElementById('addNewCardButton');
    const selectCardButton = document.getElementById('selectCardButton');

    function renderUserCards() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const selectedUserId = localStorage.getItem('selectedUserId');

        if (userCardsList) {
            userCardsList.innerHTML = ''; // Очищаем контейнер перед отрисовкой

            if (users.length === 0) {
                userCardsList.innerHTML = '<p class="no-cards-message">У вас пока нет добавленных карт. Нажмите "Добавить карту" ниже.</p>';
                // Деактивируем кнопку "Выбрать", если нет карт
                if (selectCardButton) {
                    selectCardButton.disabled = true;
                    selectCardButton.classList.add('disabled');
                }
                return;
            } else {
                if (selectCardButton) {
                    selectCardButton.disabled = false;
                    selectCardButton.classList.remove('disabled');
                }
            }

            users.forEach(user => {
                const label = document.createElement('label');
                label.className = 'user-card';

                const input = document.createElement('input');
                input.type = 'radio';
                input.name = 'selectedUser';
                input.value = user.id;
                // Устанавливаем checked, если это текущая выбранная карта, или если это первая карта и ничего не выбрано
                if (user.id === selectedUserId || (!selectedUserId && users.indexOf(user) === 0)) {
                    input.checked = true;
                    // Если ничего не выбрано, но есть первая карта, сохраняем её как выбранную
                    if (!selectedUserId && users.indexOf(user) === 0) {
                         localStorage.setItem('selectedUserId', user.id);
                    }
                }
                
                input.addEventListener('change', (event) => {
                    localStorage.setItem('selectedUserId', event.target.value);
                });

                const contentDiv = document.createElement('div');
                contentDiv.className = 'user-card-content';

                const avatarSpan = document.createElement('span');
                avatarSpan.className = 'user-avatar';
                avatarSpan.textContent = user.name.charAt(0).toUpperCase();

                const infoDiv = document.createElement('div');
                infoDiv.className = 'user-info';

                const nameSpan = document.createElement('span');
                nameSpan.className = 'user-name';
                nameSpan.textContent = user.name + (user.birthPlace ? ', ' + user.birthPlace : '');

                const detailsSpan = document.createElement('span');
                detailsSpan.className = 'user-details';
                detailsSpan.textContent = (user.birthDate || '') + (user.birthTime ? ', ' + user.birthTime : '');

                infoDiv.appendChild(nameSpan);
                infoDiv.appendChild(detailsSpan);
                contentDiv.appendChild(avatarSpan);
                contentDiv.appendChild(infoDiv);
                label.appendChild(input);
                label.appendChild(contentDiv);

                userCardsList.appendChild(label);
            });
        }
    }

    // Рендерим карты при загрузке страницы
    renderUserCards();

    // Обработчик для кнопки "Добавить карту" на этой странице
    if (addNewCardButton) {
        addNewCardButton.addEventListener('click', () => {
            window.location.href = 'input_form.html';
        });
    }

    // Обработчик для кнопки "Выбрать"
    if (selectCardButton) {
        selectCardButton.addEventListener('click', () => {
            const selectedRadio = document.querySelector('input[name="selectedUser"]:checked');
            if (selectedRadio) {
                // ID уже сохранен в localStorage через обработчик change
                window.location.href = 'main.html'; // Возвращаемся на главную
            } else {
                alert('Пожалуйста, выберите карту для анализа.');
            }
        });
    }
});