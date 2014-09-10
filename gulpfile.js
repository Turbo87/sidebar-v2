var gulp = require('gulp');
var clean = require('gulp-clean');
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var minifyCSS = require('gulp-minify-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');

var pkg = require('./package.json');
var basename = pkg.name + '-' + pkg.version;

// SASS compilation
gulp.task('sass', function () {
    gulp.src('scss/*sidebar.scss')
        .pipe(sass({
          includePaths: require('node-bourbon').includePaths,
          sourceComments: 'map'
        }))
        .pipe(gulp.dest('css'));
});

// Lint JS + CSS
gulp.task('lint', ['lint:js', 'lint:css']);

gulp.task('lint:js', function() {
  return gulp.src('js/*sidebar.js')
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('lint:css', ['sass'], function() {
  return gulp.src('css/*sidebar.css')
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
  return gulp.src('js/*sidebar.js')
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('minify:css', ['sass'], function() {
  return gulp.src('css/*sidebar.css')
    .pipe(rename({ suffix: '.min' }))
    .pipe(minifyCSS())
    .pipe(gulp.dest('css'));
});

// Package for distribution
gulp.task('zip', ['minify'], function() {
  return gulp.src([
    'README.md',
    'LICENSE',
    'css/*-sidebar.min.css',
    'js/*-sidebar.min.js',
  ])
  .pipe(rename(function (path) {
    path.dirname = '';
  }))
  .pipe(zip(basename + '.zip'))
  .pipe(gulp.dest('dist'));
});

// Watch JS + CSS Files
gulp.task('watch', ['lint', 'minify'], function(){
  gulp.watch('js/*.js', ['lint:js', 'minify:js']);
  gulp.watch('scss/*.scss', ['lint:css', 'minify:css']);
});

// Default
gulp.task('default', ['lint', 'minify']);
