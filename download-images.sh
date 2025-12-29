#!/bin/bash

# Create images directory if it doesn't exist
mkdir -p public/images

# Download placeholder images from Unsplash (bakery/food themed)
echo "Downloading product images..."

# Khari items
curl -L "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop" -o public/images/nargees-khari.jpg
curl -L "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&h=600&fit=crop" -o public/images/patti-khari.jpg
curl -L "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=600&fit=crop" -o public/images/samosa-khari.jpg
curl -L "https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&h=600&fit=crop" -o public/images/veg-puff.jpg
curl -L "https://images.unsplash.com/photo-1601050690117-d2f6e92eb4d8?w=600&h=600&fit=crop" -o public/images/samosa.jpg
curl -L "https://images.unsplash.com/photo-1626776877900-355ed2fae1bb?w=600&h=600&fit=crop" -o public/images/paneer-roll.jpg
curl -L "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop" -o public/images/jeera-butter.jpg
curl -L "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop" -o public/images/ajwain-butter.jpg

# Biscuits
curl -L "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop" -o public/images/ajwain-biscuit.jpg
curl -L "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop" -o public/images/kaju-biscuit.jpg
curl -L "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop" -o public/images/jam-biscuit.jpg
curl -L "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=600&h=600&fit=crop" -o public/images/milk-biscuit.jpg

# Bread
curl -L "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=600&h=600&fit=crop" -o public/images/milk-bread.jpg

# Sweets
curl -L "https://images.unsplash.com/photo-1571506165871-ee72a35bc9d4?w=600&h=600&fit=crop" -o public/images/nankat.jpg
curl -L "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=600&h=600&fit=crop" -o public/images/cream-roll.jpg

# Cakes
curl -L "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=600&h=600&fit=crop" -o public/images/chocolate-cake.jpg
curl -L "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=600&h=600&fit=crop" -o public/images/vanilla-cake.jpg
curl -L "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?w=600&h=600&fit=crop" -o public/images/black-forest.jpg
curl -L "https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=600&h=600&fit=crop" -o public/images/strawberry-cake.jpg

# Featured section placeholders
curl -L "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400&h=400&fit=crop" -o public/images/placeholder-cake.jpg
curl -L "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop" -o public/images/placeholder-bread.jpg
curl -L "https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=400&h=400&fit=crop" -o public/images/placeholder-cookies.jpg
curl -L "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&h=400&fit=crop" -o public/images/placeholder-pastry.jpg

# Hero background
curl -L "https://images.unsplash.com/photo-1517433670267-08bbd4be890f?w=1920&h=1080&fit=crop" -o public/images/hero-bakery-bg.jpg

echo "✅ All images downloaded successfully!"
echo "Images are in: public/images/"
