import Image from "@11ty/eleventy-img";
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const svgPath = path.join(__dirname, '../src/images/icons/favicon.svg');
const outputDir = path.join(__dirname, '../src/images/icons');

async function generateFavicons() {
  try {
    console.log('Generating favicons from SVG...');

    // Generate favicon-32x32.png
    await Image(svgPath, {
      widths: [32],
      formats: ['png'],
      outputDir: outputDir,
      filenameFormat: function() {
        return 'favicon-32x32.png';
      }
    });
    console.log('✓ Generated favicon-32x32.png');

    // Generate favicon-16x16.png
    await Image(svgPath, {
      widths: [16],
      formats: ['png'],
      outputDir: outputDir,
      filenameFormat: function() {
        return 'favicon-16x16.png';
      }
    });
    console.log('✓ Generated favicon-16x16.png');

    // Generate apple-touch-icon.png (180x180)
    await Image(svgPath, {
      widths: [180],
      formats: ['png'],
      outputDir: outputDir,
      filenameFormat: function() {
        return 'apple-touch-icon.png';
      }
    });
    console.log('✓ Generated apple-touch-icon.png');

    // Also generate favicon.ico (32x32 is standard)
    await Image(svgPath, {
      widths: [32],
      formats: ['png'],
      outputDir: outputDir,
      filenameFormat: function() {
        return 'favicon.ico';
      }
    });
    console.log('✓ Generated favicon.ico');

    console.log('\n✅ All favicons generated successfully!');
    console.log('Next steps:');
    console.log('1. Uncomment the favicon links in src/_includes/layouts/base.njk');
    console.log('2. Uncomment lines 661-662 in eleventy.config.js to copy favicon files');
    console.log('3. Update src/site.webmanifest to include the icon references');
  } catch (error) {
    console.error('Error generating favicons:', error);
    process.exit(1);
  }
}

generateFavicons();
