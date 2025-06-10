#!/bin/bash

# Fix paths in commercial pages
find commercial -name "*.html" -type f -exec sed -i '' 's|href="/commercial/|href="./|g' {} +
find commercial -name "*.html" -type f -exec sed -i '' 's|href="/narrative/|href="../narrative/|g' {} +
find commercial -name "*.html" -type f -exec sed -i '' 's|href="/info/|href="../info/|g' {} +
find commercial -name "*.html" -type f -exec sed -i '' 's|href="/index.html|href="../index.html|g' {} +
find commercial -name "*.html" -type f -exec sed -i '' 's|src="/images/|src="../images/|g' {} +
find commercial -name "*.html" -type f -exec sed -i '' 's|data-component="header"|data-component="../components/header.html"|g' {} +

# Fix paths in narrative pages
find narrative -name "*.html" -type f -exec sed -i '' 's|href="/narrative/|href="./|g' {} +
find narrative -name "*.html" -type f -exec sed -i '' 's|href="/commercial/|href="../commercial/|g' {} +
find narrative -name "*.html" -type f -exec sed -i '' 's|href="/info/|href="../info/|g' {} +
find narrative -name "*.html" -type f -exec sed -i '' 's|href="/index.html|href="../index.html|g' {} +
find narrative -name "*.html" -type f -exec sed -i '' 's|src="/images/|src="../images/|g' {} +
find narrative -name "*.html" -type f -exec sed -i '' 's|data-component="header"|data-component="../components/header.html"|g' {} +

# Fix paths in info pages
find info -name "*.html" -type f -exec sed -i '' 's|href="/info/|href="./|g' {} +
find info -name "*.html" -type f -exec sed -i '' 's|href="/commercial/|href="../commercial/|g' {} +
find info -name "*.html" -type f -exec sed -i '' 's|href="/narrative/|href="../narrative/|g' {} +
find info -name "*.html" -type f -exec sed -i '' 's|href="/index.html|href="../index.html|g' {} +
find info -name "*.html" -type f -exec sed -i '' 's|src="/images/|src="../images/|g' {} +
find info -name "*.html" -type f -exec sed -i '' 's|data-component="header"|data-component="../components/header.html"|g' {} +

# Fix paths in root index.html
sed -i '' 's|href="/commercial/|href="./commercial/|g' index.html
sed -i '' 's|href="/narrative/|href="./narrative/|g' index.html
sed -i '' 's|href="/info/|href="./info/|g' index.html
sed -i '' 's|src="/images/|src="./images/|g' index.html
sed -i '' 's|data-component="header"|data-component="./components/header.html"|g' index.html

# Fix paths in header component
sed -i '' 's|href="/index.html"|href="../index.html"|g' components/header.html
sed -i '' 's|href="/narrative/|href="../narrative/|g' components/header.html
sed -i '' 's|href="/commercial/|href="../commercial/|g' components/header.html
sed -i '' 's|href="/info/|href="../info/|g' components/header.html 