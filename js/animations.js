/* ===================================
   AHP Mobil - Scroll Animations
   Intersection Observer Based
   =================================== */

(function () {
    'use strict';

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const delay = parseInt(el.dataset.delay) || 0;

                setTimeout(() => {
                    el.classList.add('visible');
                }, delay);

                observer.unobserve(el);
            }
        });
    }, observerOptions);

    // Observe all animated elements
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.animate-on-scroll').forEach(el => {
            observer.observe(el);
        });
    });

    // Counter animation for stats
    function animateCounter(element, target, suffix = '') {
        const duration = 2000;
        const start = 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Ease out cubic
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(start + (target - suffix ? target : target) * ease);

            element.textContent = current;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Stats counter observer
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.stat-number');
                counters.forEach(counter => {
                    const target = parseInt(counter.dataset.count);
                    animateCounter(counter, target);
                });
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.addEventListener('DOMContentLoaded', () => {
        const heroStats = document.querySelector('.hero-stats');
        if (heroStats) {
            statsObserver.observe(heroStats);
        }
    });

    // Smooth reveal for table rows
    const tableObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const rows = entry.target.querySelectorAll('tbody tr');
                rows.forEach((row, i) => {
                    row.style.animationDelay = `${i * 0.1}s`;
                    row.style.animationPlayState = 'running';
                });
                tableObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.data-table').forEach(table => {
            tableObserver.observe(table);
        });
    });

    // Parallax effect on mouse move (hero section only)
    let ticking = false;
    document.addEventListener('mousemove', (e) => {
        if (ticking) return;
        ticking = true;

        requestAnimationFrame(() => {
            const hero = document.querySelector('.hero-content');
            if (hero && window.scrollY < window.innerHeight) {
                const x = (e.clientX / window.innerWidth - 0.5) * 10;
                const y = (e.clientY / window.innerHeight - 0.5) * 10;
                hero.style.transform = `translate(${x}px, ${y}px)`;
            }
            ticking = false;
        });
    });
})();

