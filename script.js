document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splashScreen');
    const onboardingSlider = document.getElementById('onboardingSlider');
    const slidesWrapper = document.getElementById('slidesWrapper'); // Изменил ID
    const slides = document.querySelectorAll('.slide'); // Получаем все элементы слайдов
    const nextButton = document.getElementById('nextButton');
    const paginationDotsContainer = document.getElementById('paginationDots');

    const totalSlides = slides.length; // Количество слайдов определяем динамически
    let currentSlide = 0;

    // --- Логика загрузочного экрана (без изменений) ---
    function hideSplashScreen() {
        splashScreen.classList.add('fade-out');
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            onboardingSlider.classList.remove('hidden');
            updateSlider(); // Показываем первый слайд после загрузочного экрана
        }, 500);
    }
    setTimeout(hideSplashScreen, 3000);

    // --- Логика слайдшоу ---

    // Создаем точки пагинации динамически (без изменений)
    function createPaginationDots() {
        paginationDotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(i));
            paginationDotsContainer.appendChild(dot);
        }
    }

    // Обновляет видимость слайдов и активную точку пагинации
    function updateSlider() {
        // Скрываем все слайды
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            slide.classList.add('hidden'); // Убедимся, что скрыт и через display: none
        });

        // Показываем текущий слайд
        slides[currentSlide].classList.remove('hidden');
        slides[currentSlide].classList.add('active');

        updatePaginationDots();
        updateButtonText();
    }

    // Обновляет активную точку пагинации (без изменений)
    function updatePaginationDots() {
        const dots = paginationDotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Обновляет текст кнопки "Далее" / "Начать" (без изменений)
    function updateButtonText() {
        if (currentSlide === totalSlides - 1) {
            nextButton.textContent = 'Начать';
        } else {
            nextButton.textContent = 'Далее';
        }
    }

    // Переход к следующему слайду или завершение слайдшоу (без изменений)
    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        } else {
            alert('Слайдшоу завершено! Начинаем работу с VIVEKA ASTRO GPT.');
            // Дополнительные действия после завершения
        }
    }

    // Переход к определенному слайду (без изменений)
    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    // --- Инициализация ---
    createPaginationDots();
    // updateSlider() вызывается после hideSplashScreen
    
    // Добавляем слушатель события на кнопку (без изменений)
    nextButton.addEventListener('click', nextSlide);

    // Изначально скрываем все слайды, кроме первого, чтобы они не мерцали
    slides.forEach((slide, index) => {
        if (index !== currentSlide) {
            slide.classList.add('hidden');
        }
    });
});