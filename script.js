// Scroll to top on page load
window.addEventListener('load', () => {
    window.scrollTo({
        top: 0,
        behavior: 'instant'
    });
    // Trigger Hero animations immediately
    document.querySelectorAll('.hero .slide-in').forEach((el, index) => {
        setTimeout(() => {
            el.classList.add('visible');
        }, index * 150);
    });
});

// Intersection Observer for animations
const elements = document.querySelectorAll('.slide-in');
const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
                // Letter-by-letter animation for About section
                if (entry.target.classList.contains('letter-anim')) {
                    const text = entry.target.textContent;
                    entry.target.textContent = '';
                    text.split('').forEach((char, i) => {
                        const span = document.createElement('span');
                        span.textContent = char;
                        entry.target.appendChild(span);
                        setTimeout(() => {
                            span.classList.add('visible');
                        }, i * 30);
                    });
                }
            }, index * 200);
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

elements.forEach(element => observer.observe(element));

// Smooth scroll for navigation
document.querySelectorAll('.nav-link').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        const navHeight = document.querySelector('.nav-container').offsetHeight;
        window.scrollTo({
            top: targetElement.offsetTop - navHeight - 20,
            behavior: 'smooth'
        });
    });
});

// Particles.js configuration
particlesJS('particles-js', {
    particles: {
        number: { value: 80, density: { enable: true, value_area: 800 } },
        color: { value: '#3B82F6' },
        shape: { type: 'circle' },
        opacity: { value: 0.5, random: true },
        size: { value: 3, random: true },
        line_linked: { enable: true, distance: 150, color: '#3B82F6', opacity: 0.4, width: 1 },
        move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out', bounce: false }
    },
    interactivity: {
        detect_on: 'canvas',
        events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
        modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
});

// Carousel auto-slide for project gallery
document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll('.carousel');
    carousels.forEach(carousel => {
        const images = carousel.querySelectorAll('img');
        if (images.length > 1) {
            let current = 0;
            setInterval(() => {
                current = (current + 1) % images.length;
                carousel.style.transform = `translateX(-${current * 420}px)`;
            }, 3000);
        }
    });
});