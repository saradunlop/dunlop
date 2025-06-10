// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme from localStorage or set default to 'light'
    const savedTheme = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Load the theme toggle template
    const template = document.getElementById('theme-toggle-template');
    if (!template) {
        console.error('Theme toggle template not found');
        return;
    }

    // Clone and insert the theme toggle into the navigation
    const nav = document.querySelector('nav');
    if (nav) {
        const themeToggle = template.content.cloneNode(true);
        nav.appendChild(themeToggle);
    }

    // Theme toggle click handler
    const toggleButton = document.querySelector('.theme-toggle');
    if (toggleButton) {
        toggleButton.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    // Initialize animations
    const animateElements = document.querySelectorAll('[data-scroll]');
    animateElements.forEach(element => {
        element.classList.add('in-view');
    });

    // Preload and initialize images
    const images = document.querySelectorAll('img');
    const imagePromises = Array.from(images).map(img => {
        return new Promise((resolve, reject) => {
            if (img.complete) {
                img.classList.add('loaded');
                resolve();
            } else {
                img.onload = () => {
                    img.classList.add('loaded');
                    resolve();
                };
                img.onerror = () => {
                    img.classList.add('load-error');
                    reject();
                };
            }
        });
    });

    // Start loading all images immediately
    Promise.all(imagePromises).catch(() => {
        console.log('Some images failed to load');
    });

    // Initialize video previews if they exist
    const videos = document.querySelectorAll('video');
    videos.forEach(video => {
        if (video.readyState >= 2) { // Has enough data to play
            video.play().catch(() => {
                // Autoplay failed, which is fine
            });
        } else {
            video.addEventListener('canplay', () => {
                video.play().catch(() => {
                    // Autoplay failed, which is fine
                });
            });
        }
    });
}); 