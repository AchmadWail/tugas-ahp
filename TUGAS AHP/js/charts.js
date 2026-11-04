/* ===================================
   AHP Mobil - Chart.js Visualizations
   =================================== */

(function () {
    'use strict';

    // Wait for Chart.js to load
    function waitForChartJS() {
        return new Promise((resolve) => {
            if (typeof Chart !== 'undefined') {
                resolve();
                return;
            }
            const interval = setInterval(() => {
                if (typeof Chart !== 'undefined') {
                    clearInterval(interval);
                    resolve();
                }
            }, 100);
        });
    }

    // Chart.js global config
    function configureChartDefaults() {
        Chart.defaults.color = 'rgba(255, 255, 255, 0.7)';
        Chart.defaults.font.family = "'Inter', 'Poppins', sans-serif";
        Chart.defaults.plugins.legend.labels.padding = 16;
        Chart.defaults.plugins.legend.labels.usePointStyle = true;
    }

    // Criteria Donut Chart
    function createCriteriaChart() {
        const ctx = document.getElementById('criteriaChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Style (S)', 'Keandalan (K)', 'Konsumsi BBM (B)'],
                datasets: [{
                    data: [32.02, 55.71, 12.26],
                    backgroundColor: [
                        'rgba(102, 126, 234, 0.9)',
                        'rgba(240, 147, 251, 0.9)',
                        'rgba(79, 172, 254, 0.9)'
                    ],
                    borderColor: [
                        'rgba(102, 126, 234, 1)',
                        'rgba(240, 147, 251, 1)',
                        'rgba(79, 172, 254, 1)'
                    ],
                    borderWidth: 2,
                    hoverOffset: 12,
                    hoverBorderWidth: 3
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                cutout: '65%',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(18, 18, 42, 0.95)',
                        titleColor: '#fff',
                        bodyColor: 'rgba(255, 255, 255, 0.8)',
                        borderColor: 'rgba(102, 126, 234, 0.3)',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 10,
                        displayColors: true,
                        callbacks: {
                            label: function (context) {
                                return `${context.label}: ${context.parsed.toFixed(2)}%`;
                            }
                        }
                    }
                },
                animation: {
                    animateRotate: true,
                    animateScale: true,
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    // Ranking Bar Chart
    function createRankingChart() {
        const ctx = document.getElementById('rankingChart');
        if (!ctx) return;

        const gradient1 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient1.addColorStop(0, 'rgba(102, 126, 234, 0.9)');
        gradient1.addColorStop(1, 'rgba(102, 126, 234, 0.3)');

        const gradient2 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient2.addColorStop(0, 'rgba(240, 147, 251, 0.9)');
        gradient2.addColorStop(1, 'rgba(240, 147, 251, 0.3)');

        const gradient3 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient3.addColorStop(0, 'rgba(255, 215, 0, 0.9)');
        gradient3.addColorStop(1, 'rgba(255, 215, 0, 0.3)');

        const gradient4 = ctx.getContext('2d').createLinearGradient(0, 0, 0, 400);
        gradient4.addColorStop(0, 'rgba(79, 172, 254, 0.9)');
        gradient4.addColorStop(1, 'rgba(79, 172, 254, 0.3)');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: ['Ertiga', 'Grand Livina', 'Avanza', 'Xenia'],
                datasets: [{
                    label: 'Skor Akhir',
                    data: [0.4814, 0.2753, 0.1480, 0.0952],
                    backgroundColor: [gradient3, gradient4, gradient1, gradient2],
                    borderColor: [
                        'rgba(255, 215, 0, 1)',
                        'rgba(79, 172, 254, 1)',
                        'rgba(102, 126, 234, 1)',
                        'rgba(240, 147, 251, 1)'
                    ],
                    borderWidth: 2,
                    borderRadius: 8,
                    borderSkipped: false
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                indexAxis: 'y',
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(18, 18, 42, 0.95)',
                        titleColor: '#fff',
                        bodyColor: 'rgba(255, 255, 255, 0.8)',
                        borderColor: 'rgba(102, 126, 234, 0.3)',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 10,
                        callbacks: {
                            label: function (context) {
                                return `Skor: ${context.parsed.x.toFixed(4)} (${(context.parsed.x * 100).toFixed(2)}%)`;
                            }
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 0.55,
                        grid: {
                            color: 'rgba(255, 255, 255, 0.05)',
                            drawBorder: false
                        },
                        ticks: {
                            callback: function (value) {
                                return (value * 100).toFixed(0) + '%';
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false,
                            drawBorder: false
                        },
                        ticks: {
                            font: {
                                family: "'Poppins', sans-serif",
                                weight: 600,
                                size: 13
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart',
                    delay: function (context) {
                        return context.dataIndex * 300;
                    }
                }
            }
        });
    }

    // Radar Chart
    function createRadarChart() {
        const ctx = document.getElementById('radarChart');
        if (!ctx) return;

        new Chart(ctx, {
            type: 'radar',
            data: {
                labels: ['Style', 'Keandalan', 'Konsumsi BBM'],
                datasets: [
                    {
                        label: 'Ertiga',
                        data: [0.4365, 0.5256, 0.3977],
                        backgroundColor: 'rgba(255, 215, 0, 0.15)',
                        borderColor: 'rgba(255, 215, 0, 0.8)',
                        borderWidth: 2.5,
                        pointBackgroundColor: 'rgba(255, 215, 0, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 5,
                        pointHoverRadius: 7
                    },
                    {
                        label: 'Grand Livina',
                        data: [0.3543, 0.2728, 0.0806],
                        backgroundColor: 'rgba(79, 172, 254, 0.1)',
                        borderColor: 'rgba(79, 172, 254, 0.7)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(79, 172, 254, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Avanza',
                        data: [0.1292, 0.1243, 0.3052],
                        backgroundColor: 'rgba(102, 126, 234, 0.1)',
                        borderColor: 'rgba(102, 126, 234, 0.7)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(102, 126, 234, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    },
                    {
                        label: 'Xenia',
                        data: [0.0800, 0.0772, 0.2165],
                        backgroundColor: 'rgba(240, 147, 251, 0.1)',
                        borderColor: 'rgba(240, 147, 251, 0.7)',
                        borderWidth: 2,
                        pointBackgroundColor: 'rgba(240, 147, 251, 1)',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 4,
                        pointHoverRadius: 6
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            padding: 20,
                            font: {
                                family: "'Poppins', sans-serif",
                                size: 12,
                                weight: 500
                            }
                        }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(18, 18, 42, 0.95)',
                        titleColor: '#fff',
                        bodyColor: 'rgba(255, 255, 255, 0.8)',
                        borderColor: 'rgba(102, 126, 234, 0.3)',
                        borderWidth: 1,
                        padding: 12,
                        cornerRadius: 10,
                        callbacks: {
                            label: function (context) {
                                return `${context.dataset.label}: ${context.parsed.r.toFixed(4)}`;
                            }
                        }
                    }
                },
                scales: {
                    r: {
                        beginAtZero: true,
                        max: 0.6,
                        ticks: {
                            stepSize: 0.1,
                            backdropColor: 'transparent',
                            color: 'rgba(255, 255, 255, 0.4)',
                            font: { size: 10 }
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.08)',
                            circular: true
                        },
                        angleLines: {
                            color: 'rgba(255, 255, 255, 0.08)'
                        },
                        pointLabels: {
                            color: 'rgba(255, 255, 255, 0.8)',
                            font: {
                                family: "'Poppins', sans-serif",
                                size: 13,
                                weight: 600
                            }
                        }
                    }
                },
                animation: {
                    duration: 2000,
                    easing: 'easeOutQuart'
                }
            }
        });
    }

    // Initialize all charts when visible
    const chartObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const chartId = entry.target.querySelector('canvas')?.id;

                waitForChartJS().then(() => {
                    configureChartDefaults();

                    if (chartId === 'criteriaChart') createCriteriaChart();
                    if (chartId === 'rankingChart') createRankingChart();
                    if (chartId === 'radarChart') createRadarChart();
                });

                chartObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('.chart-section, .donut-chart-wrapper').forEach(section => {
            const closest = section.closest('.chart-section') || section;
            chartObserver.observe(closest);
        });

        // Also observe standalone chart wrappers
        const donutWrapper = document.querySelector('.donut-chart-wrapper');
        if (donutWrapper) {
            const chartSection = donutWrapper.closest('.chart-section');
            if (chartSection) chartObserver.observe(chartSection);
        }
    });
})();

