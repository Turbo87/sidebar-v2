var gulp = require('gulp');
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
gulp.task('watch', gulp.series('minify', function() {
  gulp.watch('js/*.js', ['minify:js']);
  gulp.watch('scss/*.scss', ['minify:css']);
}));

// Default
gulp.task('default', gulp.series('minify'));
