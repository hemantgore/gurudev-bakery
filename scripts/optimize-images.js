/**
 * Image Optimization Script using Sharp
 * Optimizes all images in public/images directory
 * 
 * Usage: node scripts/optimize-images.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const IMAGES_DIR = path.join(__dirname, '../public/images');
const BACKUP_DIR = path.join(__dirname, `../image-backups-${Date.now()}`);

const OPTIMIZATION_CONFIGS = {
    hero: {
        width: 1920,
        height: 1080,
        quality: 75,
        pattern: /hero.*\.jpg$/i
    },
    about: {
        width: 800,
        height: 600,
        quality: 80,
        pattern: /(about|story).*\.jpg$/i
    },
    cakes: {
        width: 800,
        height: 800,
        quality: 82,
        pattern: /.*cake\.jpg$/i
    },
    products: {
        width: 600,
        height: 600,
        quality: 82,
        pattern: /\.(jpg|png)$/i
    }
};

async function createBackup() {
    console.log('📦 Creating backup directory...');
    if (!fs.existsSync(BACKUP_DIR)) {
        fs.mkdirSync(BACKUP_DIR, { recursive: true });
    }

    const files = fs.readdirSync(IMAGES_DIR);
    for (const file of files) {
        if (file.match(/\.(jpg|png)$/i)) {
            fs.copyFileSync(
                path.join(IMAGES_DIR, file),
                path.join(BACKUP_DIR, file)
            );
        }
    }
    console.log(`✅ Backup created at: ${BACKUP_DIR}\n`);
}

function getConfigForFile(filename) {
    for (const [key, config] of Object.entries(OPTIMIZATION_CONFIGS)) {
        if (config.pattern.test(filename) && key !== 'products') {
            return config;
        }
    }
    return OPTIMIZATION_CONFIGS.products; // default
}

async function optimizeImage(filename) {
    const inputPath = path.join(IMAGES_DIR, filename);
    const config = getConfigForFile(filename);

    try {
        const info = await sharp(inputPath).metadata();
        const originalSize = fs.statSync(inputPath).size;

        console.log(`  📸 Optimizing ${filename} (${(originalSize / 1024).toFixed(1)}KB)`);

        await sharp(inputPath)
            .resize(config.width, config.height, {
                fit: 'cover',
                position: 'center'
            })
            .jpeg({
                quality: config.quality,
                progressive: true,
                mozjpeg: true
            })
            .toFile(inputPath + '.optimized');

        // Replace original with optimized
        fs.renameSync(inputPath + '.optimized', inputPath);

        const newSize = fs.statSync(inputPath).size;
        const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);

        console.log(`    ✅ ${(newSize / 1024).toFixed(1)}KB (${savings}% smaller)`);

        return { original: originalSize, optimized: newSize };
    } catch (error) {
        console.error(`    ❌ Error: ${error.message}`);
        return { original: 0, optimized: 0 };
    }
}

async function main() {
    console.log('🖼️  Starting image optimization with Sharp...\n');

    // Check if sharp is installed
    try {
        require.resolve('sharp');
    } catch (e) {
        console.error('❌ Sharp not found. Installing...');
        console.error('Run: npm install --save-dev sharp');
        process.exit(1);
    }

    // Create backup
    await createBackup();

    // Get all image files
    const files = fs.readdirSync(IMAGES_DIR)
        .filter(file => file.match(/\.(jpg|png)$/i))
        .sort();

    console.log(`🔧 Found ${files.length} images to optimize\n`);

    let totalOriginal = 0;
    let totalOptimized = 0;

    // Optimize each image
    for (const file of files) {
        const result = await optimizeImage(file);
        totalOriginal += result.original;
        totalOptimized += result.optimized;
    }

    // Convert PNGs to JPG
    const pngFiles = fs.readdirSync(IMAGES_DIR)
        .filter(file => file.match(/\.png$/i));

    if (pngFiles.length > 0) {
        console.log('\n📋 Converting PNGs to JPG...');
        for (const pngFile of pngFiles) {
            const inputPath = path.join(IMAGES_DIR, pngFile);
            const outputPath = path.join(IMAGES_DIR, pngFile.replace(/\.png$/i, '.jpg'));

            try {
                await sharp(inputPath)
                    .flatten({ background: '#ffffff' })
                    .jpeg({ quality: 82, progressive: true })
                    .toFile(outputPath);

                fs.unlinkSync(inputPath);
                console.log(`  ✅ Converted ${pngFile} → ${path.basename(outputPath)}`);
            } catch (error) {
                console.error(`  ❌ Error converting ${pngFile}: ${error.message}`);
            }
        }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('✅ Optimization Complete!\n');
    console.log('📊 Size Comparison:');
    console.log(`  Before:  ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
    console.log(`  After:   ${(totalOptimized / 1024 / 1024).toFixed(2)} MB`);
    const saved = ((totalOriginal - totalOptimized) / 1024 / 1024).toFixed(2);
    const percent = ((totalOriginal - totalOptimized) / totalOriginal * 100).toFixed(1);
    console.log(`  Saved:   ${saved} MB (${percent}%)`);
    console.log(`\n💾 Backup: ${BACKUP_DIR}`);
    console.log('\n🚀 Next Steps:');
    console.log('  1. Review optimized images in public/images');
    console.log('  2. Test your site locally: npm run dev');
    console.log('  3. Commit: git add public/images && git commit -m "perf: optimize images"');
    console.log('  4. Deploy: git push origin main');
    console.log('  5. Delete backup if satisfied: rm -rf ' + BACKUP_DIR);
    console.log('='.repeat(60) + '\n');
}

main().catch(console.error);
