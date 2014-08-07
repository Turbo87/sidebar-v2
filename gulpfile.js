var gulp = require('gulp');
var clean = require('gulp-clean');
var csslint = require('gulp-csslint');
var header = require('gulp-header');
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');

var pkg = require('./package.json');
var basename = pkg.name + '-' + pkg.version;
var banner = '/*! ${pkg.name} v${pkg.version} */\n\n';

// SASS compilation
gulp.task('sass', function () {
    gulp.src('src/*-sidebar.scss')
        .pipe(sass({
          includePaths: require('node-bourbon').includePaths
        }))
        .pipe(gulp.dest('src'));
});

// Lint JS + CSS
gulp.task('lint', ['lint:js', 'lint:css']);

gulp.task('lint:js', function() {
  return gulp.src('src/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('lint:css', ['sass'], function() {
  return gulp.src('src/*.css')
    .pipe(csslint({
      'adjoining-classes': false,
      'box-sizing': false,
      'fallback-colors': false,
      'important': false,
    }))
    .pipe(csslint.reporter());
});

// Minify JS + CSS
gulp.task('minify', ['minify:js', 'minify:css']);

gulp.task('minify:js', function() {
  return gulp.src('src/*.js')
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(uglify({
      preserveComments: 'some'
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('minify:css', ['sass'], function() {
  return gulp.src('src/*.css')
    .pipe(rename({ suffix: '.min' }))
    .pipe(header(banner, { pkg : pkg } ))
    .pipe(minifyCSS())
    .pipe(gulp.dest('dist'));
});

// Package for distribution
gulp.task('zip', ['minify'], function() {
  return gulp.src([
    'README.md',
    'LICENSE',
    'dist/*-sidebar.min.css',
    'dist/*-sidebar.min.js',
  ])
  .pipe(rename(function (path) {
    path.dirname = '';
  }))
  .pipe(zip(basename + '.zip'))
  .pipe(gulp.dest('dist'));
});

// Cleanup
gulp.task('clean', function() {
  return gulp.src('dist', {read: false})
    .pipe(clean());
});

// Watch JS + CSS Files
gulp.task('watch', ['lint'], function(){
  gulp.watch('src/*.js', ['lint:js']);
  gulp.watch('src/*.scss', ['lint:css']);
});

// Default
gulp.task('default', ['lint', 'minify']);
