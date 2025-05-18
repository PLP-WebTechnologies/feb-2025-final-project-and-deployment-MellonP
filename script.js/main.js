// Smooth scrolling for anchor links
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').slice(1);
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });
});
function initializeAllFunctionalities() {
    // Add more initialization code here as needed
    initSearch();
    initResponsiveNav();
    initScrollAnimations();
    initSmoothScroll();
    initSwipeDetection(
)}
