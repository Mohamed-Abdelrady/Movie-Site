var gulp = require('gulp'),
  concat = require('gulp-concat'),
  sass = require('gulp-sass')(require('sass')),
  autoprefixer = require('gulp-autoprefixer'),
  pug = require('gulp-pug'),
  livereload = require('gulp-livereload'),
  sourcemaps = require('gulp-sourcemaps'),
  minify = require('gulp-minify');

// Html Task
gulp.task('html', function () {
  return gulp
    .src('stage/html/*.pug')
    .pipe(
      pug({
        pretty: true,
      })
    )
    .pipe(gulp.dest('dist'))
    .pipe(livereload());
});

// Css Task
gulp.task('css', function () {
  return gulp
    .src(['stage/css/libs/*.css', 'stage/css/*.scss'])
    .pipe(sourcemaps.init())
    .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('./map'))
    .pipe(gulp.dest('dist/css'))
    .pipe(livereload());
});

// JS Task
gulp.task('jsMain', function () {
  return gulp
    .src('stage/js/*.js')
    .pipe(
      minify({
        noSource: true,
        ext: {
          min: '.min.js',
        },
      })
    )
    .pipe(gulp.dest('dist/js'))
    .pipe(livereload());
});
gulp.task('jsLibs', function () {
  return gulp
    .src('stage/js/libs/*.js')
    .pipe(
      minify({
        noSource: true,
        ext: {
          min: '.min.js',
        },
      })
    )
    .pipe(gulp.dest('dist/js/libs'))
    .pipe(livereload());
});

// Watch Tasks
gulp.task('watch', function () {
  require('./server.js');
  livereload.listen();
  gulp.watch('stage/html/**/*.pug', gulp.series('html'));
  gulp.watch(['stage/css/**/*.css', 'stage/css/**/*.scss'], gulp.series('css'));
  gulp.watch('stage/**/*.js', gulp.series(['jsMain', 'jsLibs']));
});
