// Compiled JavaScript for Car Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all functionalities
    initSearch();
    initResponsiveNav();
    initScrollAnimations();
    initSmoothScroll();
    initSwipeDetection();
    
    // Initialize optional functionalities based on page
    if (document.querySelector('.filter-form')) {
        initFilters();
    }
    
    if (document.querySelector('.car-detail-slider')) {
        initImageSlider();
    }
    
    if (document.getElementById('contact-form')) {
        initFormValidation();
    }
});

// Search functionality
function initSearch() {
    const searchInput = document.getElementById('search-input');
    const searchResults = document.querySelector('.search-results');
    
    if (!searchInput) return;
    
    searchInput.addEventListener('input', debounce(function() {
        const query = searchInput.value.trim();
        
        if (query.length < 2) {
            searchResults.style.display = 'none';
            return;
        }
        
        // Fetch search results
        fetch(`/search?query=${encodeURIComponent(query)}`)
            .then(response => response.json())
            .then(data => {
                // Display results
                if (data.length > 0) {
                    let resultsHtml = '';
                    data.forEach(car => {
                        resultsHtml += `
                            <a href="/cars/${car.id}" class="search-result-item text-decoration-none text-dark">
                                <img src="${car.image}" class="search-result-img" alt="${car.title}">
                                <div>
                                    <div>${car.title}</div>
                                    <div class="car-price">$${car.price.toLocaleString()}</div>
                                </div>
                            </a>
                        `;
                    });
                    searchResults.innerHTML = resultsHtml;
                    searchResults.style.display = 'block';
                } else {
                    searchResults.innerHTML = '<div class="p-3">No cars found</div>';
                    searchResults.style.display = 'block';
                }
            })
            .catch(error => {
                console.error('Search error:', error);
            });
    }, 300));
    
    // Hide search results when clicking outside
    document.addEventListener('click', function(event) {
        if (!searchInput.contains(event.target) && !searchResults.contains(event.target)) {
            searchResults.style.display = 'none';
        }
    });
    
    // Show results again when focusing on input if there's text
    searchInput.addEventListener('focus', function() {
        if (searchInput.value.trim().length >= 2) {
            searchResults.style.display = 'block';
        }
    });
}

// Responsive navigation menu
function initResponsiveNav() {
    const navbarToggler = document.querySelector('.navbar-toggler');
    
    if (navbarToggler) {
        navbarToggler.addEventListener('click', function() {
            document.querySelector('.navbar-collapse').classList.toggle('show');
        });
    }
}

// Filter functionality for cars page
function initFilters() {
    const filterForm = document.querySelector('.filter-form');
    const clearFilterBtn = document.getElementById('clear-filters');
    
    if (clearFilterBtn) {
        clearFilterBtn.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Reset all form fields
            const typeSelect = document.getElementById('type-filter');
            const minPrice = document.getElementById('min-price');
            const maxPrice = document.getElementById('max-price');
            
            if (typeSelect) typeSelect.selectedIndex = 0;
            if (minPrice) minPrice.value = '';
            if (maxPrice) maxPrice.value = '';
            
            // Submit the form with cleared filters
            filterForm.submit();
        });
    }
    
    // Price range validation
    const minPrice = document.getElementById('min-price');
    const maxPrice = document.getElementById('max-price');
    
    if (minPrice && maxPrice) {
        minPrice.addEventListener('change', validatePriceRange);
        maxPrice.addEventListener('change', validatePriceRange);
    }
    
    function validatePriceRange() {
        const min = parseInt(minPrice.value) || 0;
        const max = parseInt(maxPrice.value) || Infinity;
        
        if (min > max && max !== 0) {
            alert('Minimum price cannot be greater than maximum price');
            minPrice.value = '';
            maxPrice.value = '';
        }
    }
}

// Image slider for car detail page
function initImageSlider() {
    const slider = document.querySelector('.car-detail-slider');
    
    if (!slider) return;
    
    const images = slider.querySelectorAll('.slider-image');
    const dots = slider.querySelectorAll('.slider-dot');
    const prevBtn = slider.querySelector('.slider-prev');
    const nextBtn = slider.querySelector('.slider-next');
    
    let currentIndex = 0;
    const totalImages = images.length;
    
    // Initialize slider
    updateSlider();
    
    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateSlider();
        });
    });
    
    // Event listeners for prev/next buttons
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSlider();
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlider();
        });
    }
    
    // Auto advance slider every 5 seconds
    let intervalId = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalImages;
        updateSlider();
    }, 5000);
    
    // Pause auto-advance on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(intervalId);
    });
    
    // Resume auto-advance on mouse leave
    slider.addEventListener('mouseleave', () => {
        intervalId = setInterval(() => {
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlider();
        }, 5000);
    });
    
    // Touch support for mobile
    let touchStartX = 0;
    let touchEndX = 0;
    
    slider.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);
    
    slider.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);
    
    function handleSwipe() {
        if (touchEndX < touchStartX - 50) {
            // Swipe left, show next
            currentIndex = (currentIndex + 1) % totalImages;
            updateSlider();
        } else if (touchEndX > touchStartX + 50) {
            // Swipe right, show previous
            currentIndex = (currentIndex - 1 + totalImages) % totalImages;
            updateSlider();
        }
    }
    
    // Update slider display
    function updateSlider() {
        // Hide all images
        images.forEach(image => {
            image.style.display = 'none';
        });
        
        // Show current image
        images[currentIndex].style.display = 'block';
        
        // Update dots
        dots.forEach((dot, index) => {
            if (index === currentIndex) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }
    
    // Color selection functionality
    const colorOptions = document.querySelectorAll('.color-option');
    if (colorOptions.length > 0) {
        colorOptions.forEach(option => {
            option.addEventListener('click', function() {
                // Remove selected class from all options
                colorOptions.forEach(opt => opt.classList.remove('selected'));
                
                // Add selected class to clicked option
                this.classList.add('selected');
                
                // Update the selected color text
                const colorName = this.getAttribute('data-color');
                const colorText = document.getElementById('selected-color');
                if (colorText) {
                    colorText.textContent = colorName;
                }
            });
        });
    }
}

// Form validation for contact form
function initFormValidation() {
    const contactForm = document.getElementById('contact-form');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', function(event) {
        // Prevent form submission initially
        event.preventDefault();
        
        // Get form fields
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const phoneInput = document.getElementById('phone');
        const messageInput = document.getElementById('message');
        const carInterestInput = document.getElementById('car-interest');
        
        // Reset previous error messages
        const errorElements = document.querySelectorAll('.invalid-feedback');
        errorElements.forEach(element => {
            element.style.display = 'none';
        });
        
        const formInputs = contactForm.querySelectorAll('.form-control');
        formInputs.forEach(input => {
            input.classList.remove('is-invalid');
        });
        
        // Flag to track validation status
        let isValid = true;
        
        // Validate name (required, at least 2 characters)
        if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
            showError(nameInput, 'Please enter your name (at least 2 characters)');
            isValid = false;
        }
        
        // Validate email (required, valid format)
        if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, 'Please enter a valid email address');
            isValid = false;
        }
        
        // Validate phone (optional, but must be valid if provided)
        if (phoneInput.value.trim() && !validatePhone(phoneInput.value.trim())) {
            showError(phoneInput, 'Please enter a valid phone number');
            isValid = false;
        }
        
        // Validate message (required, at least 10 characters)
        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
            showError(messageInput, 'Please enter your message (at least 10 characters)');
            isValid = false;
        }
        
        // If all validations pass, submit the form
        if (isValid) {
            contactForm.submit();
        }
    });
    
    // Helper function to show validation errors
    function showError(inputElement, errorMessage) {
        inputElement.classList.add('is-invalid');
        
        // Get associated error message element or create one
        let errorElement = inputElement.nextElementSibling;
        
        if (!errorElement || !errorElement.classList.contains('invalid-feedback')) {
            errorElement = document.createElement('div');
            errorElement.className = 'invalid-feedback';
            inputElement.parentNode.insertBefore(errorElement, inputElement.nextSibling);
        }
        
        errorElement.textContent = errorMessage;
        errorElement.style.display = 'block';
    }
    
    // Email validation function
    function validateEmail(email) {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
    // Phone validation function
    function validatePhone(phone) {
        // Accept various formats like (123) 456-7890, 123-456-7890, 123.456.7890, etc.
        const re = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
        return re.test(phone);
    }
}

// Scroll animations
function initScrollAnimations() {
    // Get all elements that should be animated on scroll
    const elementsToAnimate = document.querySelectorAll('.scroll-fade-in, .scroll-fade-in-left, .scroll-fade-in-right');
    
    // Add classes to elements that are already in viewport on page load
    checkElementsInViewport(elementsToAnimate);
    
    // Add scroll event listener to animate elements on scroll
    window.addEventListener('scroll', function() {
        checkElementsInViewport(elementsToAnimate);
    });
    
    // Add load event listener to ensure animations run when images are loaded
    window.addEventListener('load', function() {
        checkElementsInViewport(elementsToAnimate);
    });
}

// Check which elements are in viewport
function checkElementsInViewport(elements) {
    elements.forEach(element => {
        if (isInViewport(element)) {
            element.classList.add('visible');
        }
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    const offset = 100; // Show element when it's 100px from entering the viewport
    
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) + offset &&
        rect.bottom >= 0 - offset
    );
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]:not([href="#"])');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                // Get the target's position relative to the viewport
                const rect = targetElement.getBoundingClientRect();
                const offset = window.pageYOffset || document.documentElement.scrollTop;
                const targetPosition = rect.top + offset;
                
                // Scroll to the target element smoothly
                window.scrollTo({
                    top: targetPosition - 80, // Adjust for fixed header
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Add swipe detection for touch devices
function initSwipeDetection() {
    const swipeContainers = document.querySelectorAll('.swipe-container');
    
    swipeContainers.forEach(container => {
        let startX, startY, endX, endY;
        const wrapper = container.querySelector('.swipe-wrapper');
        const slides = container.querySelectorAll('.swipe-slide');
        const slideCount = slides.length;
        let currentSlide = 0;
        
        // Touch start event
        container.addEventListener('touchstart', function(e) {
            startX = e.changedTouches[0].screenX;
            startY = e.changedTouches[0].screenY;
        }, false);
        
        // Touch end event
        container.addEventListener('touchend', function(e) {
            endX = e.changedTouches[0].screenX;
            endY = e.changedTouches[0].screenY;
            
            // Calculate horizontal and vertical distance moved
            const distX = endX - startX;
            const distY = endY - startY;
            
            // If horizontal swipe is greater than vertical swipe
            if (Math.abs(distX) > Math.abs(distY)) {
                // Left swipe
                if (distX < -50 && currentSlide < slideCount - 1) {
                    currentSlide++;
                    updateSlides();
                }
                // Right swipe
                else if (distX > 50 && currentSlide > 0) {
                    currentSlide--;
                    updateSlides();
                }
            }
        }, false);
        
        // Update slides position
        function updateSlides() {
            wrapper.style.transform = `translateX(-${currentSlide * 100}%)`;
        }
    });
}

// Utility function for debouncing
function debounce(func, delay) {
    let timeout;
    return function() {
        const context = this;
        const args = arguments;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), delay);
    };
}