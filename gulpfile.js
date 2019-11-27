const gulp = require('gulp');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass');
const concat = require('gulp-concat');
sass.compiler = require('node-sass');

gulp.task('serve', function() {
    browserSync.init({
        server: './src'
    });

    gulp.watch('./index.html').on('change', browserSync.reload);
});

gulp.task('sass', function () {
    return gulp.src('./src/**/*.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(concat('main.css'))
      .pipe(gulp.dest('./src'));
  });
