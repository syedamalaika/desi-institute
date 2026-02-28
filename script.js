// ==========================================
// DESI INSTITUTE - JAVASCRIPT
// Interactive features and animations
// ==========================================

// ==========================================
// NAVIGATION
// ==========================================
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

// Navbar scroll effect
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Active link highlighting on scroll
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            if (navLink) {
                navLink.classList.add('active');
            }
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// ==========================================
// SMOOTH SCROLLING
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// SCROLL ANIMATIONS
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all feature cards
document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Observe about feature items
document.querySelectorAll('.about-feature-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// Observe contact items
document.querySelectorAll('.contact-item').forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateX(-30px)';
    item.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(item);
});

// ==========================================
// FORM HANDLING
// ==========================================
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        program: document.getElementById('program').value,
        message: document.getElementById('message').value
    };

    // Show success message
    showNotification('Thank you for your interest! We will contact you soon. ☕', 'success');

    // Reset form
    contactForm.reset();

    // Log form data (in production, this would be sent to a server)
    console.log('Form submitted:', formData);
});

// ==========================================
// NOTIFICATION SYSTEM
// ==========================================
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1rem 2rem',
        background: type === 'success' ? 'linear-gradient(135deg, #4CAF50 0%, #45a049 100%)' : 'linear-gradient(135deg, #FF6B35 0%, #F44336 100%)',
        color: 'white',
        borderRadius: '16px',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.2)',
        zIndex: '10000',
        animation: 'slideInRight 0.5s ease',
        fontWeight: '600'
    });

    // Add to document
    document.body.appendChild(notification);

    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 500);
    }, 5000);
}

// Add notification animations to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ==========================================
// FLOATING CARDS PARALLAX EFFECT
// ==========================================
const floatingCards = document.querySelectorAll('.floating-card');

window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    floatingCards.forEach((card, index) => {
        const speed = (index + 1) * 10;
        const x = (mouseX - 0.5) * speed;
        const y = (mouseY - 0.5) * speed;

        card.style.transform = `translate(${x}px, ${y}px)`;
    });
});

// ==========================================
// COUNTER ANIMATION FOR STATS
// ==========================================
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target + '+';
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current) + '+';
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            const targetValue = parseInt(statNumber.textContent);
            animateCounter(statNumber, targetValue);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});

// ==========================================
// CTA BUTTONS FUNCTIONALITY
// ==========================================
const ctaButtons = document.querySelectorAll('.cta-btn, .btn-primary');

ctaButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        // If it's not a form submit button
        if (e.target.type !== 'submit') {
            e.preventDefault();

            // Scroll to contact section
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                const offsetTop = contactSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });

                // Focus on the name input
                setTimeout(() => {
                    document.getElementById('name').focus();
                }, 800);
            }
        }
    });
});

// ==========================================
// LOADING ANIMATION
// ==========================================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// ==========================================
// EASTER EGG - CHAI EMOJI RAIN
// ==========================================
let clickCount = 0;
const logo = document.querySelector('.logo');

logo.addEventListener('click', () => {
    clickCount++;

    if (clickCount === 5) {
        createChaiRain();
        clickCount = 0;
        showNotification('Chai time! ☕🎉', 'success');
    }
});

function createChaiRain() {
    const emojis = ['☕', '🥟', '🫓'];

    for (let i = 0; i < 30; i++) {
        setTimeout(() => {
            const emoji = document.createElement('div');
            emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            emoji.style.position = 'fixed';
            emoji.style.left = Math.random() * 100 + 'vw';
            emoji.style.top = '-50px';
            emoji.style.fontSize = '2rem';
            emoji.style.zIndex = '9999';
            emoji.style.pointerEvents = 'none';
            emoji.style.animation = 'fall 3s linear';

            document.body.appendChild(emoji);

            setTimeout(() => {
                document.body.removeChild(emoji);
            }, 3000);
        }, i * 100);
    }
}

// Add fall animation
const fallStyle = document.createElement('style');
fallStyle.textContent = `
    @keyframes fall {
        to {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(fallStyle);

// ==========================================
// FORM VALIDATION
// ==========================================
const formInputs = document.querySelectorAll('.contact-form input, .contact-form select, .contact-form textarea');

formInputs.forEach(input => {
    input.addEventListener('blur', () => {
        if (input.value.trim() === '' && input.hasAttribute('required')) {
            input.style.borderColor = '#F44336';
        } else {
            input.style.borderColor = '#4CAF50';
        }
    });

    input.addEventListener('focus', () => {
        input.style.borderColor = '#FF6B35';
    });
});

// ==========================================
// CONSOLE MESSAGE
// ==========================================
console.log('%c🎓 Welcome to Desi Institute! ☕', 'font-size: 20px; font-weight: bold; color: #FF6B35;');
console.log('%cWhere Culture Meets Education', 'font-size: 14px; color: #6D4C41;');
console.log('%cTip: Click the logo 5 times for a surprise! 🎉', 'font-size: 12px; color: #FFB300;');

// ==========================================
// GALLERY FILTERING
// ==========================================
const filterBtns = document.querySelectorAll('.filter-btn');
const galleryItems = document.querySelectorAll('.gallery-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        // Add active class to clicked button
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        galleryItems.forEach(item => {
            if (filter === 'all' || item.getAttribute('data-category') === filter) {
                item.classList.remove('hidden');
                item.style.animation = 'fadeInUp 0.5s ease';
            } else {
                item.classList.add('hidden');
            }
        });
    });
});

// ==========================================
// REVIEWS CAROUSEL
// ==========================================
const reviewCards = document.querySelectorAll('.review-card');
const prevBtn = document.getElementById('prevReview');
const nextBtn = document.getElementById('nextReview');
const indicators = document.querySelectorAll('.indicator');
let currentReview = 0;

function showReview(index) {
    // Remove active class from all cards
    reviewCards.forEach(card => {
        card.classList.remove('active', 'prev');
    });
    
    // Remove active class from all indicators
    indicators.forEach(ind => ind.classList.remove('active'));
    
    // Add active class to current card and indicator
    reviewCards[index].classList.add('active');
    indicators[index].classList.add('active');
}

function nextReview() {
    reviewCards[currentReview].classList.add('prev');
    currentReview = (currentReview + 1) % reviewCards.length;
    showReview(currentReview);
}

function prevReview() {
    reviewCards[currentReview].classList.add('prev');
    currentReview = (currentReview - 1 + reviewCards.length) % reviewCards.length;
    showReview(currentReview);
}

// Event listeners for carousel buttons
if (nextBtn && prevBtn) {
    nextBtn.addEventListener('click', nextReview);
    prevBtn.addEventListener('click', prevReview);
}

// Event listeners for indicators
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => {
        reviewCards[currentReview].classList.add('prev');
        currentReview = index;
        showReview(currentReview);
    });
});

// Auto-play carousel
let autoPlayInterval = setInterval(nextReview, 5000);

// Pause auto-play on hover
const reviewsCarousel = document.querySelector('.reviews-carousel');
if (reviewsCarousel) {
    reviewsCarousel.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });
    
    reviewsCarousel.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextReview, 5000);
    });
}

// Initialize first review
showReview(0);

// ==========================================
// GALLERY LIGHTBOX (Optional Enhancement)
// ==========================================
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const category = item.getAttribute('data-category');
        const title = item.querySelector('.gallery-overlay h4').textContent;
        showNotification(??  - , 'info');
    });
});
