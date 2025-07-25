/**
 * Afric Prudent Tourism & Media Website JavaScript
 * Main script for handling interactive elements 
 */

// DOM Elements
const header = document.getElementById('header');
const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
const mainNav = document.querySelector('.main-nav');
const currentYearElement = document.getElementById('current-year');
const testimonialSlider = document.querySelector('.testimonials-slider');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
const dots = document.querySelectorAll('.dot');
const newsletterForms = document.querySelectorAll('.newsletter-form, .footer-newsletter-form');

// Set current year in footer
if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
}

// Mobile menu toggle
if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        mobileMenuToggle.classList.toggle('active');
        mainNav.classList.toggle('active');
    });
}

// Header scroll effect
function handleHeaderScroll() {
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
}

window.addEventListener('scroll', handleHeaderScroll);

// Testimonials slider
let currentSlide = 0;
const testimonials = document.querySelectorAll('.testimonial');

function showSlide(n) {
    // Hide all testimonials
    testimonials.forEach(testimonial => {
        testimonial.style.display = 'none';
    });

    // Remove active class from all dots
    dots.forEach(dot => {
        dot.classList.remove('active');
    });

    // Show the selected testimonial and activate the corresponding dot
    if (testimonials.length > 0) {
        currentSlide = (n + testimonials.length) % testimonials.length;
        testimonials[currentSlide].style.display = 'block';
        if (dots[currentSlide]) {
            dots[currentSlide].classList.add('active');
        }
    }
}

// Initialize the slider
if (testimonials.length > 0) {
    // Show the first slide initially
    showSlide(0);

    // Next button click
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            showSlide(currentSlide + 1);
        });
    }

    // Previous button click
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            showSlide(currentSlide - 1);
        });
    }

    // Dot clicks
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto advance slides every 5 seconds
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 5000);
}

// Handle newsletter form submissions
newsletterForms.forEach(form => {
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');

            if (emailInput && emailInput.value) {
                // In a real application, you would send this to your server
                alert('Thank you for subscribing to our newsletter!');
                emailInput.value = '';
            }
        });
    }
});

// Handle search form submission
const searchForm = document.querySelector('.search-form');
if (searchForm) {
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const destination = document.getElementById('destination').value;
        const date = document.getElementById('travel-date').value;

        // In a real application, you would redirect to search results
        alert(`Searching for trips to ${destination} on ${date}`);
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');

        if (href !== '#') {
            e.preventDefault();

            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Image lazy loading
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');

    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });

        lazyImages.forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for browsers that don't support IntersectionObserver
        lazyImages.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    }
});