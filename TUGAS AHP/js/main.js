/* ===================================
   AHP Mobil - Main JavaScript
   Navigation, Tabs, Interactions
   =================================== */

(function () {
    'use strict';

    // ===== LOADER =====
    window.addEventListener('load', () => {
        const loader = document.getElementById('loader');
        setTimeout(() => {
            if (loader) loader.classList.add('hidden');
        }, 1500);
    });

    document.addEventListener('DOMContentLoaded', () => {

        // ===== NAVBAR =====
        const navbar = document.getElementById('navbar');
        const navToggle = document.getElementById('navToggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Scroll effect for navbar
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.scrollY;

            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        });

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
                document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
            });
        }

        // Close mobile menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Active nav link on scroll
        const sections = document.querySelectorAll('section[id]');

        function updateActiveNav() {
            const scrollY = window.scrollY + 150;

            sections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveNav);

        // ===== TABS =====
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabContents = document.querySelectorAll('.tab-content');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const tabId = btn.dataset.tab;

                // Remove active from all
                tabBtns.forEach(b => b.classList.remove('active'));
                tabContents.forEach(c => c.classList.remove('active'));

                // Add active to clicked
                btn.classList.add('active');
                const targetTab = document.getElementById(`tab-${tabId}`);
                if (targetTab) {
                    targetTab.classList.add('active');

                    // Re-trigger animations for elements inside the new tab
                    targetTab.querySelectorAll('.animate-on-scroll').forEach(el => {
                        el.classList.remove('visible');
                        setTimeout(() => el.classList.add('visible'), 100);
                    });
                }
            });
        });

        // ===== BACK TO TOP =====
        const backToTop = document.getElementById('backToTop');

        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.classList.add('visible');
            } else {
                backToTop.classList.remove('visible');
            }
        });

        if (backToTop) {
            backToTop.addEventListener('click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }

        // ===== SMOOTH SCROLL FOR ANCHOR LINKS =====
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // ===== TILT EFFECT ON CARDS =====
        const tiltCards = document.querySelectorAll('.ranking-card, .stat-card, .about-card');

        tiltCards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / centerY * -5;
                const rotateY = (x - centerX) / centerX * 5;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });

        // ===== TYPING EFFECT FOR WINNER =====
        const winnerName = document.querySelector('.winner-name');
        if (winnerName) {
            const text = winnerName.textContent;
            const winnerObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        winnerName.textContent = '';
                        let i = 0;
                        const typeInterval = setInterval(() => {
                            if (i < text.length) {
                                winnerName.textContent += text.charAt(i);
                                i++;
                            } else {
                                clearInterval(typeInterval);
                            }
                        }, 100);
                        winnerObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.5 });
            winnerObserver.observe(winnerName);
        }

        // ===== TOOLTIP ON MATRIX CELLS =====
        const matrixCells = document.querySelectorAll('.input-val, .reciprocal');
        matrixCells.forEach(cell => {
            cell.style.cursor = 'help';
            cell.title = cell.classList.contains('input-val')
                ? 'Nilai input perbandingan dari soal'
                : 'Kebalikan (1/nilai) dari sel pasangannya';
        });

        // ===== KEYBOARD NAVIGATION =====
        document.addEventListener('keydown', (e) => {
            // Press 'T' to toggle theme (placeholder for future feature)
            if (e.key === 'Escape' && navMenu.classList.contains('active')) {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // ===== PRINT BUTTON (Ctrl+P enhancement) =====
        window.addEventListener('beforeprint', () => {
            // Ensure all animations are visible when printing
            document.querySelectorAll('.animate-on-scroll').forEach(el => {
                el.classList.add('visible');
            });
            document.querySelectorAll('.tab-content').forEach(tab => {
                tab.style.display = 'block';
            });
        });

        window.addEventListener('afterprint', () => {
            document.querySelectorAll('.tab-content').forEach(tab => {
                if (!tab.classList.contains('active')) {
                    tab.style.display = '';
                }
            });
        });

        // ===== LAZY LOAD ENHANCEMENT =====
        // Ensure legend bars animate when visible
        const legendObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.querySelectorAll('.legend-bar-fill').forEach(bar => {
                        bar.style.width = bar.style.width; // trigger reflow
                    });
                    legendObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const chartLegend = document.querySelector('.chart-legend');
        if (chartLegend) legendObserver.observe(chartLegend);

        // ===== CONSOLE EASTER EGG =====
        console.log(
            '%c🚗 AHP Mobil Analysis %c v1.0 ',
            'background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 8px 12px; border-radius: 4px 0 0 4px; font-weight: bold;',
            'background: #12122a; color: #667eea; padding: 8px 12px; border-radius: 0 4px 4px 0;'
        );
        console.log(
            '%c🏆 Hasil: Ertiga (48.14%) adalah mobil terpilih!',
            'color: #ffd700; font-size: 14px; font-weight: bold;'
        );
    });
})();

