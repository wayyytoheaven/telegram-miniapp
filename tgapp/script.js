document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splashScreen');
    const onboardingSlider = document.getElementById('onboardingSlider');
    const slideWrapper = document.getElementById('slideWrapper');
    const nextButton = document.getElementById('nextButton');
    const paginationDotsContainer = document.getElementById('paginationDots');

    const totalSlides = 5; // Всего 5 слайдов
    let currentSlide = 0;

    // --- Логика загрузочного экрана ---
    // Функция для скрытия загрузочного экрана и показа слайдшоу
    function hideSplashScreen() {
        // Добавляем класс для плавного исчезновения
        splashScreen.classList.add('fade-out');
        // Через некоторое время после начала исчезновения, полностью скрываем элемент
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            onboardingSlider.classList.remove('hidden'); // Показываем слайдшоу
            // Принудительно обновляем слайдер, чтобы убедиться, что он отображается корректно
            updateSlider();
        }, 500); // Соответствует длительности transition в CSS
    }

    // Показываем загрузочный экран на 3 секунды, затем скрываем
    setTimeout(hideSplashScreen, 3000); // Можно настроить время отображения

    // --- Логика слайдшоу (без изменений) ---

    // Создаем точки пагинации динамически
    function createPaginationDots() {
        paginationDotsContainer.innerHTML = ''; // Очищаем существующие
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            if (i === 0) {
                dot.classList.add('active');
            }
            dot.addEventListener('click', () => goToSlide(i));
            paginationDotsContainer.appendChild(dot);
        }
    }

    // Обновляет положение слайдера и активную точку пагинации
    function updateSlider() {
        const offset = -currentSlide * (100 / totalSlides); // Вычисляем смещение
        slideWrapper.style.transform = `translateX(${offset}%)`;
        updatePaginationDots();
        updateButtonText();
    }

    // Обновляет активную точку пагинации
    function updatePaginationDots() {
        const dots = paginationDotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Обновляет текст кнопки "Далее" / "Начать"
    function updateButtonText() {
        if (currentSlide === totalSlides - 1) {
            nextButton.textContent = 'Начать';
        } else {
            nextButton.textContent = 'Далее';
        }
    }

    // Переход к следующему слайду или завершение слайдшоу
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
        } else {
            // Если это последний слайд, можно выполнить действие
            alert('Слайдшоу завершено! Начинаем работу с VIVEKA ASTRO GPT.');
            // В реальном Telegram Web App здесь могла бы быть команда:
            // Telegram.WebApp.close();
            // Telegram.WebApp.openLink('https://ваше_приложение.com/main');
            // Telegram.WebApp.sendData(JSON.stringify({ event: 'onboarding_finished' }));
        }
        updateSlider();
    }

    // Переход к определенному слайду
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    // Инициализация слайдшоу (вызывается только после скрытия splash screen)
    // Эти функции будут вызваны при старте слайдшоу
    createPaginationDots();
    // updateSlider() вызывается после hideSplashScreen
    
    // Добавляем слушатель события на кнопку
    nextButton.addEventListener('click', nextSlide);
});