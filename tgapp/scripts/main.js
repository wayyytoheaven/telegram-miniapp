document.addEventListener('DOMContentLoaded', () => {
    const userNameElement = document.getElementById('userName'); // Элемент с именем
    const userAvatarElement = document.getElementById('userAvatar'); // Элемент с аватаром (буквой)

    // Получаем имя пользователя из localStorage
    const storedUserName = localStorage.getItem('userName');

    if (storedUserName) {
        userNameElement.textContent = storedUserName;
        userAvatarElement.textContent = storedUserName.charAt(0).toUpperCase(); // Первая буква в верхнем регистре
    } else {
        // Если имя не найдено, можно установить значения по умолчанию
        userNameElement.textContent = 'Гость';
        userAvatarElement.textContent = 'Г';
    }

    // Добавляем обработчик для кнопки "Добавить нового человека"
    const addPersonButton = document.querySelector('.add-person-button');
    if (addPersonButton) {
        addPersonButton.addEventListener('click', () => {
            // Перенаправляем на страницу регистрации (или ввода данных нового человека)
            // Предположим, что это register.html или input_form.html
            window.location.href = 'register.html'; // Или 'input_form.html'
        });
    }

    // Здесь можно добавить другие обработчики событий для main.html, если потребуется
});