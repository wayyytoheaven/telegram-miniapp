document.addEventListener('DOMContentLoaded', (event) => {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlideIndex = 0;
    let autoSlideInterval;
    const slideDuration = 4000; // 4 секунды

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.classList.remove('active');
            dots[i].classList.remove('active');
        });
        slides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlideIndex = index;
    }
    function nextSlide() {
        clearInterval(autoSlideInterval);
        currentSlideIndex++;
        if (currentSlideIndex >= slides.length) {
            console.log("Онбординг завершен!");
            currentSlideIndex = 0;
        }
        showSlide(currentSlideIndex);
        startAutoSlide();
    }
    function startAutoSlide() {
        clearInterval(autoSlideInterval);
        autoSlideInterval = setInterval(() => {
            if (currentSlideIndex < slides.length - 1) {
                nextSlide();
            } else {
                clearInterval(autoSlideInterval);
            }
        }, slideDuration);
    }
    window.Telegram.WebApp.ready();
    showSlide(0);
    startAutoSlide();
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
            startAutoSlide();
        });
    });
    window.nextSlide = nextSlide;
});