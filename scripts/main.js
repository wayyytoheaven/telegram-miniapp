document.addEventListener('DOMContentLoaded', () => {
    const analysisCard = document.getElementById('analysisCard');
    const luckyDatesCard = document.getElementById('luckyDatesCard');
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