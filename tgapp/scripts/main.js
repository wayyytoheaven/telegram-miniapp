document.addEventListener('DOMContentLoaded', () => {
    const userNameElement = document.getElementById('userName');
    const userAvatarElement = document.getElementById('userAvatar');
    const storedUserName = localStorage.getItem('userName');

    if (storedUserName) {
        userNameElement.textContent = storedUserName;
        userAvatarElement.textContent = storedUserName.charAt(0).toUpperCase();
    } else {
        userNameElement.textContent = 'Гость';
        userAvatarElement.textContent = 'Г';
    }
    const addPersonButton = document.querySelector('.add-person-button');
    if (addPersonButton) {
        addPersonButton.addEventListener('click', () => {
            window.location.href = 'register.html';
        });
    }
    const analysisCard = document.getElementById('analysisCard');
    if (analysisCard) {
        analysisCard.addEventListener('click', () => {
            window.location.href = 'analysis_page.html';
        });
    }
});