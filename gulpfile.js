import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import csso from 'postcss-csso';
import rename from 'gulp-rename';
import htmlmin from 'gulp-htmlmin';
import squoosh from 'gulp-libsquoosh';
import svgstore from 'gulp-svgstore';
import svgo from 'gulp-svgo';
import { deleteAsync } from 'del';

// Styles

export const styles = () => {
  return  gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
    done()
}

// HTML

const html = () => {
  return  gulp.src("source/*.html")
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest("build"));
  done()
  }

// Images

const optimizeImages = () => {
  return  gulp.src("source/img/**/*.{png,jpg}")
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'))
  done()
}

const copyImages = () => {
  return  gulp.src("source/img/**/*.{png,jpg}")
  .pipe(gulp.dest("build/img"))
  done()
  }

// Scripts

const scripts = () => {
  return  gulp.src("source/js/*.js")
  .pipe(gulp.dest("build/js"))
  done()
  }

// WebP

const createWebp = () => {
  return  gulp.src("source/img/**/*.{jpg,png}")
  .pipe(squoosh({webp: {}
  }))
  .pipe(gulp.dest("build/img"));
  done()
  }

 // Svg

 const svgTask = () => {
  return  gulp.src(['source/img/**/*.svg'])
  .pipe(svgo())
  .pipe(gulp.dest("build/img"));
  done()
 }

 const sprite = () => {
  return  gulp.src("source/img/icon/*")
  .pipe(svgo())
  .pipe(svgstore({
  inlineSvg: true
  }))
  .pipe(rename("sprite.svg"))
  .pipe(gulp.dest("build/img/sprite"));
  done()
  }

// Copy

const copy = (done) => {
  gulp.src([
  "source/fonts/**/*.{woff2,woff}",
  "source/*.ico",
  "source/manifest.webmanifest",
  "!source/img/icons/*.svg",
  ], {
  base: "source"
  })
  .pipe(gulp.dest("build"))
  done();
  }

// Clean

const clean = async (done) => {
  await deleteAsync("build")
  done()
  }

// Server

const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
    browser: "chrome"
  });
  done();
}

// Reload

const reload = (done) => {
  browser.reload();
  done();
  }

// Watcher

const watcher = (done) => {
  gulp.watch('source/sass/**/*.scss', gulp.series(styles));
  gulp.watch('source/js/*', gulp.series(scripts));
  gulp.watch('source/*.html', gulp.series(html, reload));
  done()
}

// Build

export const build = gulp.series(
  clean,
  copy,
  optimizeImages,
  gulp.parallel(
  styles,
  html,
  scripts,
  svgTask,
  sprite,
  createWebp
  ),
  );


// Default

export default  gulp.series(
  clean,
  copy,
  copyImages,
  html,
  gulp.parallel(
  styles,
  scripts,
  svgTask,
  sprite,
  createWebp
  ),
  gulp.series(
  server,
  watcher
  ));
