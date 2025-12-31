#!/bin/bash

# Image Optimization Script for Gurudev Bakery
# This script optimizes all images in the public/images directory

echo "🖼️  Starting image optimization..."
echo ""

# Check if imagemagick is installed
if ! command -v convert &> /dev/null; then
    echo "❌ ImageMagick not found. Installing..."
    echo "Run: brew install imagemagick"
    exit 1
fi

# Navigate to images directory
cd "$(dirname "$0")/../public/images" || exit 1

# Create backup directory
BACKUP_DIR="../../image-backups-$(date +%Y%m%d-%H%M%S)"
echo "📦 Creating backup at: $BACKUP_DIR"
mkdir -p "$BACKUP_DIR"
cp *.jpg *.png "$BACKUP_DIR/" 2>/dev/null

echo ""
echo "🔧 Optimizing images..."
echo ""

# Optimize hero image (largest file - needs aggressive compression)
if [ -f "hero-bakery-bg.jpg" ]; then
    echo "  📸 Optimizing hero-bakery-bg.jpg (829KB → ~150KB)"
    convert hero-bakery-bg.jpg \
        -resize 1920x1080^ \
        -gravity center \
        -extent 1920x1080 \
        -quality 75 \
        -sampling-factor 4:2:0 \
        -strip \
        hero-bakery-bg-optimized.jpg
    mv hero-bakery-bg-optimized.jpg hero-bakery-bg.jpg
fi

# Optimize about/story images (large files)
for img in about-bakery.jpg bakery-story.jpg; do
    if [ -f "$img" ]; then
        echo "  📸 Optimizing $img"
        convert "$img" \
            -resize 800x600^ \
            -gravity center \
            -extent 800x600 \
            -quality 80 \
            -sampling-factor 4:2:0 \
            -strip \
            "${img%.jpg}-optimized.jpg"
        mv "${img%.jpg}-optimized.jpg" "$img"
    fi
done

# Optimize cake images (product pages)
for img in chocolate-cake.jpg vanilla-cake.jpg black-forest.jpg strawberry-cake.jpg; do
    if [ -f "$img" ]; then
        echo "  📸 Optimizing $img"
        convert "$img" \
            -resize 800x800^ \
            -gravity center \
            -extent 800x800 \
            -quality 82 \
            -sampling-factor 4:2:0 \
            -strip \
            "${img%.jpg}-optimized.jpg"
        mv "${img%.jpg}-optimized.jpg" "$img"
    fi
done

# Optimize product images (biscuits, khari, etc.) - smaller size
for img in *.jpg; do
    # Skip if already processed or is hero/about
    if [[ "$img" == "hero-bakery-bg.jpg" ]] || \
       [[ "$img" == "about-bakery.jpg" ]] || \
       [[ "$img" == "bakery-story.jpg" ]] || \
       [[ "$img" == *"-cake.jpg" ]]; then
        continue
    fi
    
    if [ -f "$img" ]; then
        echo "  📸 Optimizing $img"
        convert "$img" \
            -resize 600x600^ \
            -gravity center \
            -extent 600x600 \
            -quality 82 \
            -sampling-factor 4:2:0 \
            -strip \
            "${img%.jpg}-optimized.jpg"
        mv "${img%.jpg}-optimized.jpg" "$img"
    fi
done

# Optimize PNG files (convert to JPG where appropriate)
for img in *.png; do
    if [ -f "$img" ]; then
        echo "  📸 Converting $img to JPG"
        convert "$img" \
            -resize 600x600^ \
            -gravity center \
            -extent 600x600 \
            -quality 82 \
            -background white \
            -alpha remove \
            -strip \
            "${img%.png}.jpg"
        rm "$img"
    fi
done

echo ""
echo "✅ Optimization complete!"
echo ""
echo "📊 Size comparison:"
du -sh "$BACKUP_DIR" | awk '{print "  Before: " $1}'
du -sh . | awk '{print "  After:  " $1}'
echo ""
echo "💾 Original images backed up to: $BACKUP_DIR"
echo ""
echo "🚀 Next steps:"
echo "  1. Review the optimized images"
echo "  2. If satisfied, commit and push: git add public/images && git commit -m 'perf: optimize images' && git push"
echo "  3. If not satisfied, restore: cp $BACKUP_DIR/* public/images/"
