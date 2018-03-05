const gulp = require('gulp');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');


var paths = {
  source: './src/*.scss',
  font: './src/fonts/*'
};

gulp.task('watch', function() {
  gulp.watch('./**/*.scss', ['build']);
  gulp.watch('./**/*.scss', ['docs']);
});

gulp.task('build', function() {
  gulp.src(paths.source)
    .pipe(sass({outputStyle: 'compact', precision: 10})
      .on('error', sass.logError)
    )
    .pipe(autoprefixer())
    .pipe(csscomb())
    .pipe(gulp.dest('./dist'))
    .pipe(cleancss())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('./dist'));
  gulp.src(paths.font)
  .pipe(gulp.dest('./dist/fonts'));
});

gulp.task('default', ['build']);