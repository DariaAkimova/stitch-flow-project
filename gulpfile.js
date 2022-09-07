import gulp from "gulp";
import plumber from "gulp-plumber";
import less from "gulp-less";
import postcss from "gulp-postcss";
import csso from "postcss-csso";
import rename from "gulp-rename";
import autoprefixer from "autoprefixer";
import htmlmin from "gulp-htmlmin";
import webpack from "webpack-stream";
// import phpmin from "@cedx/gulp-php-minify";
import squoosh from "gulp-libsquoosh";
import svgo from "gulp-svgmin";
import svgstore from "gulp-svgstore";
import del from "del";
import browser from "browser-sync";

// Styles

export const styles = () => {
  return gulp
    .src("source/less/style.less", { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([autoprefixer(), csso()]))

    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("build/css", { sourcemaps: "." }))
    .pipe(browser.stream());
};

//html

const html = () => {
  return gulp
    .src("source/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest("build"));
};

//scripts

let webpackConfig = {
  output: {
    filename: "script.bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node__modules/",
      },
    ],
  },
};

export const scripts = () => {
  return gulp
    .src("source/js/*.js")
    .pipe(webpack(webpackConfig))
    .pipe(gulp.dest("build/js"));
};

//php

// export const php = () => {
//   return gulp
//     .src("source/*.php", {read: false})
//     .pipe(phpmin())
//     .pipe(gulp.dest("build"));  
//   }

//images

// const optimizeImages = () => {
//   return gulp
//     .src("source/img/**/*.{jpg,png}")
//     .pipe(squoosh())
//     .pipe(gulp.dest("build/img"));
// };

const copyImages = () => {
  return gulp.src("source/img/**/*.{png,jpg}").pipe(gulp.dest("build/img"));
};

//webp

const createWebp = () => {
  return gulp
    .src(["source/img/**/*.{jpg,png}", "!source/img/favicons/*.png"])
    .pipe(
      squoosh({
        webp: {},
      })
    )
    .pipe(gulp.dest("build/img"));
};

// SVG

const svg = () =>
  gulp
    .src(["source/img/**/*.svg", "!source/img/icons/*.svg"])
    .pipe(svgo())
    .pipe(gulp.dest("build/img"));

const sprite = () => {
  return gulp
    .src("source/img/icons/*.svg")
    .pipe(svgo())
    .pipe(
      svgstore({
        inlineSvg: true,
      })
    )
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"));
};

// Copy

export const copy = (done) => {
  gulp
    .src(["source/fonts/*.{woff2,woff}", "source/*.php", "source/*.ico"], {
      base: "source",
    })
    .pipe(gulp.dest("build"));
  done();
};

//Clean

export const clean = () => {
  return del("build");
};

// Server

export const server = (done) => {
  browser.init({
    server: {
      baseDir: "build",
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
};

// Reload

export const reload = (done) => {
  browser.reload();
  done();
};

// Watcher

const watcher = () => {
  gulp.watch("source/less/**/*.less", gulp.series(styles));
  gulp.watch("source/js/*.js", gulp.series(scripts));
  gulp.watch("source/*.html", gulp.series(html, reload));
};

// export const watcher = () => {
//   gulp.watch("source/less/**/*.less", gulp.series(styles));
//   gulp.watch("source/*.html", gulp.series(reload));
// };

//Build

export const build = gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(styles, html, scripts, svg, sprite, createWebp)
);

// Default

export default gulp.series(
  clean,
  copy,
  copyImages,
  gulp.parallel(styles, html, scripts, svg, sprite, createWebp),
  gulp.series(server, watcher)
);

// export default (
//   gulp.parallel(styles),
// gulp.series(server, watcher));
