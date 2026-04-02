const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const postcss = require('gulp-postcss')
const autoprefixer = require('autoprefixer')
const browserSync = require('browser-sync').create()
const plumber = require('gulp-plumber')
const sourcemaps = require('gulp-sourcemaps')

const paths = {
  scss: {
    src: 'src/scss/main.scss',
    watch: 'src/scss/**/*.scss',
    dest: 'docs/css',
  },
  html: {
    src: 'src/**/*.html',
    dest: 'docs',
  },
  js: {
    src: 'src/js/**/*.js',
    dest: 'docs/js',
  },
  images: {
    src: 'src/images/**/*',
    dest: 'docs/images',
  },
}

function styles() {
  return gulp
    .src(paths.scss.src)
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(
      sass({ outputStyle: 'expanded' }).on('error', sass.logError)
    )
    .pipe(postcss([autoprefixer()]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.scss.dest))
    .pipe(browserSync.stream())
}

function copyHtml() {
  return gulp.src(paths.html.src).pipe(gulp.dest(paths.html.dest))
}

function copyJs() {
  return gulp.src(paths.js.src).pipe(gulp.dest(paths.js.dest))
}

function copyImages() {
  return gulp.src(paths.images.src, { allowEmpty: true }).pipe(gulp.dest(paths.images.dest))
}

function serve() {
  browserSync.init({
    server: {
      baseDir: 'docs',
    },
    notify: false,
    open: true,
  })

  gulp.watch(paths.scss.watch, styles)
  gulp.watch(paths.html.src, gulp.series(copyHtml, reload))
  gulp.watch(paths.js.src, gulp.series(copyJs, reload))
  gulp.watch(paths.images.src, gulp.series(copyImages, reload))
}

const assets = gulp.parallel(copyHtml, copyJs, copyImages)
const build = gulp.series(assets, styles)

function reload(done) {
  browserSync.reload()
  done()
}

exports.styles = styles
exports.copyHtml = copyHtml
exports.copyJs = copyJs
exports.copyImages = copyImages
exports.build = build
exports.default = gulp.series(build, serve)
