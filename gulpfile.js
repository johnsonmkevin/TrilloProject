const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const concat = require("gulp-concat");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");

function compileSass() {
  return src("sass/**/*.scss") // Source folder containing Sass files
    .pipe(sass().on("error", sass.logError)) // Compile Sass and log errors
    .pipe(postcss([autoprefixer()]))
    .pipe(concat("all.css")) // Concatenate all CSS files into all.css
    .pipe(dest("css")); // Destination folder for compiled CSS
}

function compressCSS() {
  return src("css/all.css")
    .pipe(cleanCSS({ compatibility: "ie8" }))
    .pipe(rename({ suffix: ".min" }))
    .pipe(dest("css"));
}

// Watch task to monitor changes in Sass files and recompile
function watchSass() {
  watch(["sass/**/*.scss"], series(compileSass, compressCSS));
}

// Define default task
exports.default = series(compileSass, compressCSS, watchSass);
