document.addEventListener('DOMContentLoaded', () => {
    const splashScreen = document.getElementById('splashScreen');
    const onboardingSlider = document.getElementById('onboardingSlider');
    const slidesWrapper = document.getElementById('slidesWrapper');
    const slides = document.querySelectorAll('.slide');
    const nextButton = document.getElementById('nextButton');
    const paginationDotsContainer = document.getElementById('paginationDots');
    const totalSlides = slides.length;
    let currentSlide = 0;

    function hideSplashScreen() {
        splashScreen.classList.add('fade-out');
        setTimeout(() => {
            splashScreen.classList.add('hidden');
            onboardingSlider.classList.remove('hidden');
            updateSlider();
        }, 500);
    }

    setTimeout(hideSplashScreen, 3000);

    function createPaginationDots() {
        paginationDotsContainer.innerHTML = '';
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('span');
            dot.classList.add('dot');
            dot.addEventListener('click', () => goToSlide(i));
            paginationDotsContainer.appendChild(dot);
        }
    }

    function updateSlider() {
        slides.forEach((slide, index) => {
            slide.classList.remove('active');
            slide.classList.add('hidden');
        });
        slides[currentSlide].classList.remove('hidden');
        slides[currentSlide].classList.add('active');

        updatePaginationDots();
    }

    function updatePaginationDots() {
        const dots = paginationDotsContainer.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function updateButtonText() {
        nextButton.textContent = 'Далее';
    }

    function nextSlide() {
        if (currentSlide < totalSlides - 1) {
            currentSlide++;
            updateSlider();
        } else {
            window.location.href = 'register.html';
        }
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
    }

    createPaginationDots();
    nextButton.addEventListener('click', nextSlide);
    updateButtonText();
    slides.forEach((slide, index) => {
        if (index !== currentSlide) {
            slide.classList.add('hidden');
        }
    });
});