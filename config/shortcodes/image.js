/**
 * Image shortcode for optimized responsive images
 */

import Image from "@11ty/eleventy-img";
import { CONSTANTS } from '../helpers/index.js';

/**
 * Image shortcode for optimized responsive images
 * @param {string} src - Source path to the image
 * @param {string} alt - Alt text for the image
 * @param {string} sizes - Sizes attribute for responsive images
 * @returns {Promise<string>} HTML string with optimized image
 */
export async function imageShortcode(src, alt, sizes = "100vw") {
  // Check if image exists, return empty string if not
  try {
    let metadata = await Image(src, {
      widths: CONSTANTS.IMAGE_WIDTHS,
      formats: ["avif", "webp", "jpeg"],
      outputDir: "./_site/img/",
      urlPath: "/img/",
    });

    let imageAttributes = {
      alt,
      sizes,
      loading: "lazy",
      decoding: "async",
    };

    return Image.generateHTML(metadata, imageAttributes);
  } catch (error) {
    // If image doesn't exist, return empty string silently
    if (process.env.ELEVENTY_ENV !== 'production') {
      console.warn(`Image not found: ${src}`);
    }
    return '';
  }
}
