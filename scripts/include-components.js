// Function to include HTML components
async function includeHTML() {
    // Load header component
    const headerElement = document.querySelector('[data-component="header"]');
    if (headerElement) {
        try {
            const response = await fetch('/components/header.html');
            const html = await response.text();
            headerElement.innerHTML = html;
            // Dispatch event when components are loaded
            document.dispatchEvent(new Event('componentsLoaded'));
        } catch (error) {
            console.error('Error loading header component:', error);
        }
    }
}

// Run when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', includeHTML); 