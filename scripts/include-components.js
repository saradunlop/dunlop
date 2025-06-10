// Function to include HTML components
async function includeHTML() {
    const elements = document.querySelectorAll('[data-component]');
    console.log('Found components:', elements.length);
    
    for (const element of elements) {
        try {
            const file = element.getAttribute('data-component');
            console.log('Loading component:', file);
            const response = await fetch(file);
            
            if (response.ok) {
                const html = await response.text();
                element.innerHTML = html;
                console.log('Component loaded:', file);
                
                // Execute any scripts in the component
                const scripts = element.getElementsByTagName('script');
                Array.from(scripts).forEach(script => {
                    const newScript = document.createElement('script');
                    Array.from(script.attributes).forEach(attr => {
                        newScript.setAttribute(attr.name, attr.value);
                    });
                    newScript.textContent = script.textContent;
                    script.parentNode.replaceChild(newScript, script);
                });
            } else {
                console.error('Failed to load component:', file, 'Status:', response.status);
            }
        } catch (error) {
            console.error('Error loading component:', error);
        }
    }
    
    // Dispatch event when all components are loaded
    document.dispatchEvent(new Event('componentsLoaded'));
}

// Run when the DOM is loaded
document.addEventListener('DOMContentLoaded', includeHTML); 