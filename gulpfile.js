const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
sass.compiler = require('node-sass');

gulp.task('serve', () => {
  browserSync.init({
    server: './src',
  });

  gulp.watch('./index.html').on('change', browserSync.reload);
});

gulp.task('sass', () => gulp.src('./src/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(concat('main.css'))
  .pipe(gulp.dest('./src')));


gulp.task('scripts', () => gulp.src(['./src/**/*.js', '!./src/**/*.spec.js'])
  .pipe(concat('main.js'))
  .pipe(gulp.dest('./src')));
