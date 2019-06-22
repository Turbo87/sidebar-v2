var gulp = require('gulp');
var clean = require('gulp-clean');
var csslint = require('gulp-csslint');
var jshint = require('gulp-jshint');
var cleanCSS = require('gulp-clean-css');
var sass = require('gulp-sass');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var zip = require('gulp-zip');

var pkg = require('./package.json');
var basename = pkg.name + '-' + pkg.version;

// SASS compilation
gulp.task('sass', function() {
    return gulp.src('scss/*sidebar.scss')
        .pipe(sass())
        .on('error', sass.logError)
        .pipe(gulp.dest('css'));
});

// Lint JS + CSS
gulp.task('lint:js', function() {
  return gulp.src('js/*sidebar.js')
    .pipe(jshint())
    .pipe(jshint.reporter());
});

gulp.task('lint:css', gulp.series('sass', function() {
  return gulp.src('css/*sidebar.css')
    .pipe(csslint({
      'adjoining-classes': false,
      'order-alphabetical': false,
      'box-sizing': false,
      'fallback-colors': false,
      'important': false,
      'regex-selectors': false,
    }))
    .pipe(csslint.formatter());
}));

gulp.task('lint', gulp.parallel('lint:js', 'lint:css'));

// Minify JS + CSS
gulp.task('minify:js', function() {
  return gulp.src('js/*sidebar.js')
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('js'));
});

gulp.task('minify:css', gulp.series('sass', function() {
  return gulp.src('css/*sidebar.css')
    .pipe(rename({ suffix: '.min' }))
    .pipe(cleanCSS({level: 2}))
    .pipe(gulp.dest('css'));
}));

gulp.task('minify', gulp.parallel('minify:js', 'minify:css'));

// Package for distribution
gulp.task('zip', gulp.series('minify', function() {
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
}));

// Watch JS + CSS Files
gulp.task('watch', gulp.series('lint', 'minify', function() {
  gulp.watch('js/*.js', ['lint:js', 'minify:js']);
  gulp.watch('scss/*.scss', ['lint:css', 'minify:css']);
}));

// Default
gulp.task('default', gulp.series('lint', 'minify'));
