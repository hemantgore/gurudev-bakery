# 🖼️ Image Optimization Guide

## ✅ Results (Just Completed!)

**Total Size Reduction: 33.2%**
- **Before:** 2.5 MB (2,380 KB)
- **After:** 1.7 MB (1,590 KB)  
- **Saved:** 790 KB

### Key Wins:
- 🏆 **hero-bakery-bg.jpg**: 829KB → 301KB (**63.7% smaller!**)
- 📸 **bakery-story.jpg**: 192KB → 117KB (38.9% smaller)
- 🎂 **black-forest.jpg**: 90KB → 55KB (38.7% smaller)
- 🍰 **cream-roll.jpg**: 84KB → 38KB (55% smaller)

---

## 🚀 Quick Start

### Run Optimization (Future Images)
```bash
npm run optimize-images
```

This will:
1. ✅ Create automatic backup
2. ✅ Optimize all images in `public/images/`
3. ✅ Convert PNGs to JPG
4. ✅ Show before/after comparison

---

## 📐 Optimization Settings

### Hero Images (1920x1080, Quality 75%)
- `hero-bakery-bg.jpg`
- Large background images
- **Result:** ~70% size reduction

### About/Story Images (800x600, Quality 80%)
- `about-bakery.jpg`
- `bakery-story.jpg`
- **Result:** ~40% size reduction

### Cake Images (800x800, Quality 82%)
- `chocolate-cake.jpg`, `vanilla-cake.jpg`, etc.
- Product detail pages
- **Result:** ~20-40% size reduction

### Product Images (600x600, Quality 82%)
- Biscuits, khari, breads
- Card thumbnails
- **Result:** ~30-50% size reduction

---

## 📝 Manual Optimization (Alternative Tools)

### Option 1: Online Tools (No Install)
1. **Squoosh** (Best Quality): https://squoosh.app/
   - Upload image
   - Select "MozJPEG" format
   - Set quality: 75-82
   - Download optimized

2. **TinyPNG**: https://tinypng.com/
   - Upload up to 20 images
   - Auto-optimization
   - Download all

3. **ImageOptim** (Mac): https://imageoptim.com/
   - Drag & drop images
   - Automatic optimization
   - No quality loss

### Option 2: ImageMagick (CLI)
```bash
# Install
brew install imagemagick

# Optimize single image
convert input.jpg -resize 800x800^ -quality 82 -strip output.jpg

# Batch optimize all JPGs
for img in public/images/*.jpg; do
  convert "$img" -resize 600x600^ -quality 82 -strip "$img"
done
```

### Option 3: Sharp CLI
```bash
# Install
npm install -g sharp-cli

# Optimize single image
sharp -i input.jpg -o output.jpg resize 800 800 --quality 82

# Batch process
for img in public/images/*.jpg; do
  sharp -i "$img" resize 600 600 --quality 82 -o "$img"
done
```

---

## 🎯 Best Practices

### When Adding New Images:

1. **Start with High Quality**
   - Use original/source images (not web downloads)
   - Prefer JPG over PNG for photos
   - PNG only for logos/icons with transparency

2. **Resize Before Upload**
   ```bash
   # Hero: 1920x1080
   # Products: 600x600 or 800x800
   # About: 800x600
   ```

3. **Run Optimization**
   ```bash
   npm run optimize-images
   ```

4. **Test Locally**
   ```bash
   npm run dev
   # Check images look good
   ```

5. **Commit & Deploy**
   ```bash
   git add public/images
   git commit -m "feat: add new product images"
   git push
   ```

---

## 📊 Image Size Guidelines

### Target File Sizes:
| Image Type | Max Size | Optimal |
|------------|----------|---------|
| Hero Background | 300KB | 200KB |
| Product Cards | 50KB | 30KB |
| Product Detail | 100KB | 60KB |
| About/Story | 120KB | 80KB |

### Recommended Dimensions:
| Usage | Dimensions | Aspect Ratio |
|-------|-----------|--------------|
| Hero | 1920x1080 | 16:9 |
| Product Card | 600x600 | 1:1 |
| Product Detail | 800x800 | 1:1 |
| About Section | 800x600 | 4:3 |

---

## 🔍 Checking Image Performance

### Check Individual Image Size
```bash
ls -lh public/images/*.jpg
```

### Check Total Directory Size
```bash
du -sh public/images
```

### Analyze on PageSpeed Insights
1. Deploy your site
2. Go to: https://pagespeed.web.dev/
3. Enter: `gurudevbakery.com`
4. Look for "Properly size images" section
5. Check "Serve images in next-gen formats"

---

## 🛠️ Advanced: WebP Conversion

For even better performance, convert to WebP:

```bash
# Using cwebp (Google's WebP encoder)
brew install webp

for img in public/images/*.jpg; do
  cwebp -q 80 "$img" -o "${img%.jpg}.webp"
done
```

Then update your Next.js config:
```typescript
// next.config.ts
images: {
  formats: ['image/webp', 'image/avif'],
}
```

Next.js Image component will automatically serve WebP when supported!

---

## 📦 Backup & Restore

### Backups are Automatic
Every time you run `npm run optimize-images`, a backup is created:
```
/image-backups-{timestamp}/
```

### Restore from Backup
```bash
cp image-backups-*/​* public/images/
```

### Delete Old Backups
```bash
rm -rf image-backups-*
```

---

## 🎯 Expected Performance Impact

After image optimization:
- ✅ **LCP (Largest Contentful Paint):** Improved by 30-40%
- ✅ **Page Load Time:** Reduced by 1-2 seconds
- ✅ **Mobile Score:** +5-10 points
- ✅ **Bandwidth Saved:** ~800KB per page load

---

## 📋 Checklist for New Images

- [ ] Image is appropriate format (JPG for photos)
- [ ] Image resolution is correct (not larger than needed)
- [ ] Run `npm run optimize-images`
- [ ] Test locally with `npm run dev`
- [ ] Check file size is under target (see guidelines)
- [ ] Commit and deploy
- [ ] Test on PageSpeed Insights

---

## 🚨 Common Issues

### "Image quality is too low"
- Increase quality in `scripts/optimize-images.js`
- Change `quality: 82` to `quality: 85-90`

### "Images are blurry"
- Check source image quality
- Increase dimensions in optimization config
- Use higher quality setting

### "Some images not optimized"
- Check file extension (only .jpg and .png supported)
- Check for corrupted images
- Review script output for errors

---

**Last Run:** January 1, 2026  
**Next Run:** When adding new images

💡 **Pro Tip:** Always optimize images before committing them to git!
