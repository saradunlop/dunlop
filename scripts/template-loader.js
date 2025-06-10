// Template loader and renderer
class TemplateLoader {
    constructor() {
        this.templates = {};
        this.cache = {};
    }

    // Load a template from a file
    async loadTemplate(name, path) {
        if (this.templates[name]) {
            return this.templates[name];
        }

        try {
            const response = await fetch(path);
            const template = await response.text();
            this.templates[name] = template;
            return template;
        } catch (error) {
            console.error(`Error loading template ${name}:`, error);
            throw error;
        }
    }

    // Replace variables in template with actual data
    render(template, data) {
        // Handle conditional blocks
        template = template.replace(/{{#(\w+)}}([\s\S]*?){{\/\1}}/g, (match, key, content) => {
            if (data[key]) {
                // If it's an array, iterate over it
                if (Array.isArray(data[key])) {
                    return data[key].map(item => this.render(content, item)).join('');
                }
                // If it's truthy, render the content
                return this.render(content, data);
            }
            return ''; // Remove block if condition is false
        });

        // Replace variables
        return template.replace(/{{(\w+)}}/g, (match, key) => {
            return data[key] !== undefined ? data[key] : '';
        });
    }

    // Load and render a project page
    async loadProject(projectData) {
        try {
            // Load base page template
            const pageTemplate = await this.loadTemplate('page', '/components/page-template.html');
            
            // Load project template
            const projectTemplate = await this.loadTemplate('project', '/components/project-template.html');

            // Render project content first
            const projectContent = this.render(projectTemplate, projectData);

            // Render full page with project content
            const pageData = {
                title: projectData.title,
                page_class: 'project-page'
            };

            let fullPage = this.render(pageTemplate, pageData);
            
            // Replace content placeholder with project content
            fullPage = fullPage.replace('<div data-component="content"></div>', projectContent);

            return fullPage;
        } catch (error) {
            console.error('Error loading project:', error);
            throw error;
        }
    }
}

// Example project data structure
const projectDataExample = {
    title: "Project Title",
    category: "Commercial",
    client: "Client Name",
    agency: "Agency Name",
    year: "2023",
    description: "Project description goes here.",
    vimeo_id: "123456789",
    gallery_images: [
        { url: "image1.jpg", alt: "Image 1 description" },
        { url: "image2.jpg", alt: "Image 2 description" }
    ],
    has_credits: true,
    credits: [
        { role: "Director", name: "Sara Dunlop" },
        { role: "DOP", name: "Cinematographer Name" }
    ],
    has_awards: true,
    awards: [
        { award: "Award 1 Description" },
        { award: "Award 2 Description" }
    ],
    prev_project: {
        url: "/projects/previous.html",
        title: "Previous Project"
    },
    next_project: {
        url: "/projects/next.html",
        title: "Next Project"
    }
}; 