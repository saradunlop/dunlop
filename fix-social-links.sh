#!/bin/bash

# Function to update social links in a file
update_social_links() {
    local file=$1
    # Remove Twitter link and update Instagram link
    sed -i '' '/<a href="https:\/\/twitter.com"/d' "$file"
    sed -i '' 's/<a href="https:\/\/instagram.com"/<a href="https:\/\/www.instagram.com\/saradunlop" target="_blank"/' "$file"
}

# Update commercial pages
for file in commercial/*.html; do
    update_social_links "$file"
done

# Update narrative pages
for file in narrative/*.html; do
    update_social_links "$file"
done

echo "Social links updated across all pages" 