#!/bin/bash
 
# Find all HTML files and update the header component path
find . -name "*.html" -type f -exec sed -i '' 's|data-component="\.\./components/header\.html"|data-component="/dunlop/components/header.html"|g' {} +
find . -name "*.html" -type f -exec sed -i '' 's|data-component="\./components/header\.html"|data-component="/dunlop/components/header.html"|g' {} + 