// Function to check if an element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Function to handle loading of a single image
function handleImageLoad(imgElement) {
    return new Promise((resolve) => {
        if (imgElement.complete) {
            resolve();
        } else {
            imgElement.onload = () => resolve();
            imgElement.onerror = () => resolve(); // Resolve even on error to prevent blocking
        }
    });
}

// Function to handle all images in a container
async function handleImagesInContainer(container) {
    const images = container.querySelectorAll('img');
    const loadPromises = Array.from(images).map(img => handleImageLoad(img));
    
    // Hide the container initially
    container.style.opacity = '0';
    container.style.transition = 'opacity 0.5s ease-in-out';
    
    // Wait for all images to load
    await Promise.all(loadPromises);
    
    // Show the container and trigger animation
    container.style.opacity = '1';
    container.classList.add('animate');
}

// Function to initialize loading and animations for all project items
async function initializeProjectItems() {
    const projectItems = document.querySelectorAll('[data-scroll]');
    
    projectItems.forEach(item => {
        // Initially hide all items
        item.style.opacity = '0';
        item.style.transition = 'opacity 0.5s ease-in-out, transform 0.5s ease-in-out';
        
        // If the item contains images, handle them specially
        if (item.querySelectorAll('img').length > 0) {
            handleImagesInContainer(item);
        } else {
            // For non-image items, just add animation if in viewport
            if (isInViewport(item)) {
                item.style.opacity = '1';
                item.classList.add('animate');
            }
        }
    });

    // Add scroll listener for items that come into view later
    window.addEventListener('scroll', () => {
        projectItems.forEach(item => {
            if (isInViewport(item) && !item.classList.contains('animate')) {
                item.style.opacity = '1';
                item.classList.add('animate');
            }
        });
    }, { passive: true });
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeProjectItems); 