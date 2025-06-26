document.addEventListener('DOMContentLoaded', () => {
    const userAvatar = document.getElementById('userAvatar');
    const userNameElement = document.getElementById('userName');
    const dotsButton = document.getElementById('dotsButton');
    const analysisCard = document.getElementById('analysisCard');
    const luckyDatesCard = document.getElementById('luckyDatesCard');
    const compatibilityAnalysisCard = document.getElementById('compatibilityAnalysisCard');
    function updateDisplayedUser() {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const selectedUserId = localStorage.getItem('selectedUserId');
        
        let displayUser = users.find(user => user.id === selectedUserId);
        if (!displayUser && users.length > 0) {
            displayUser = users[0];
            localStorage.setItem('selectedUserId', users[0].id);
        } else if (!displayUser && users.length === 0) {
            displayUser = { name: 'Андрей', id: 'default', location: 'Минск', birthDate: '01.01.2000' };
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
    updateDisplayedUser();
    if (dotsButton) {
        dotsButton.addEventListener('click', () => {
            window.location.href = 'user_cards.html';
        });
    }
    const addPersonButton = document.querySelector('.action-button.add-person-button');
    if (addPersonButton) {
        addPersonButton.addEventListener('click', () => {
            localStorage.removeItem('selectedUserId');
            window.location.href = 'input_form.html';
        });
    }
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
    if (compatibilityAnalysisCard) {
        compatibilityAnalysisCard.addEventListener('click', () => {
            window.location.href = 'compatibility_selection.html';
        });
    }
});