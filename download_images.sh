#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p images

# Download images
curl -o images/nike-victory-swim.jpg "https://thecornershop.tv/wp-content/uploads/2023/nike-victory-swim.jpg"
curl -o images/dreamlands.jpg "https://thecornershop.tv/wp-content/uploads/2023/dreamlands-film.jpg"
curl -o images/apple-fitness.jpg "https://thecornershop.tv/wp-content/uploads/2023/apple-fitness.jpg"
curl -o images/pg-always-there.jpg "https://thecornershop.tv/wp-content/uploads/2023/pg-always-there.jpg"

echo "Images downloaded successfully" 