module.exports = function(eleventyConfig) {
  
  // Copy CSS files
  eleventyConfig.addPassthroughCopy("src/css");
  
  // Copy JS files
  eleventyConfig.addPassthroughCopy("src/js");
  
  // Copy images (if you have them)
  eleventyConfig.addPassthroughCopy("src/images");
  
  // Or copy multiple static assets at once
  eleventyConfig.addPassthroughCopy("srec/assets");
  
  return {
    dir: {
      input: "src",
      output: "_site"
    }
  };
};