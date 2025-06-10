document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded');

    // Initialize theme from localStorage
    function initTheme() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', savedTheme);
        console.log('Theme initialized:', savedTheme);
    }

    // Initialize theme switcher
    function initThemeSwitcher() {
        const themeToggle = document.querySelector('.theme-toggle');
        if (!themeToggle) {
            console.log('Theme toggle not found');
            return false;
        }
        
        // Toggle theme
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            console.log('Theme toggled to:', newTheme);
        });
        
        console.log('Theme switcher initialized');
        return true;
    }

    // Initialize theme immediately
    initTheme();

    // Try to initialize theme switcher after components are loaded
    document.addEventListener('componentsLoaded', function() {
        console.log('Components loaded, initializing theme switcher');
        if (!initThemeSwitcher()) {
            // If failed, retry a few times with increasing delays
            let retries = 0;
            const maxRetries = 5;
            const retryInterval = setInterval(() => {
                retries++;
                console.log(`Retrying theme switcher initialization (${retries}/${maxRetries})`);
                if (initThemeSwitcher() || retries >= maxRetries) {
                    clearInterval(retryInterval);
                }
            }, 100);
        }
    });

    // First ensure all images are loaded
    document.querySelectorAll('img').forEach(img => {
        if (img.complete) {
            img.classList.add('loaded');
            console.log('Image already loaded:', img.src);
        } else {
            img.onload = function() {
                img.classList.add('loaded');
                console.log('Image loaded:', img.src);
            }
            img.onerror = function() {
                console.log('Image failed to load:', img.src);
                img.classList.add('load-error');
            }
        }
    });

    // Initialize animations with a more generous threshold
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                console.log('Element in view:', entry.target.className);
            }
        });
    }, {
        root: null,
        threshold: 0.1,
        rootMargin: '50px'
    });

    // Observe all elements that should animate
    const elementsToAnimate = document.querySelectorAll('[data-scroll]');
    console.log('Found elements to animate:', elementsToAnimate.length);
    
    elementsToAnimate.forEach((element, index) => {
        // Only add delay to projects, not hero text
        if (element.classList.contains('project')) {
            element.style.transitionDelay = `${index * 0.1}s`;
        } else if (element.classList.contains('hero-text')) {
            element.style.transitionDelay = '0.2s'; // Slight delay for hero text
        }
        observer.observe(element);
        console.log('Observing element:', element.className);
    });

    // Handle video hover effects
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        const video = project.querySelector('video');
        if (!video) return;

        project.addEventListener('mouseenter', () => {
            video.play().catch(function(error) {
                console.log("Video play failed:", error);
            });
        });

        project.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // Add smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
}); 