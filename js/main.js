// Simple slider functionality
document.addEventListener('DOMContentLoaded', function() {
    const sliderBtns = document.querySelectorAll('.slider-btn');
    let currentSlide = 0;
    const slides = document.querySelectorAll('.hero-slide');
    
    sliderBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            slides[currentSlide].classList.remove('active');
            
            if (this.classList.contains('next')) {
                currentSlide = (currentSlide + 1) % slides.length;
            } else {
                currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            }
            
            slides[currentSlide].classList.add('active');
        });
    });
    
    // Add to cart buttons
    const addToCartBtns = document.querySelectorAll('.btn-add-cart');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Animation feedback
            this.style.transform = 'scale(0.9)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Update cart badge (simulation)
            const badge = document.querySelector('.cart .badge');
            let count = parseInt(badge.textContent);
            badge.textContent = count + 1;
        });
    });
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});