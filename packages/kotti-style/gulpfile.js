const gulp = require('gulp');
const sass = require('gulp-sass');
const cleancss = require('gulp-clean-css');
const csscomb = require('gulp-csscomb');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');

const paths = {
	source: './src/*.scss',
};

gulp.task('watch', function() {
	gulp.watch('./**/*.scss', ['build']);
});

gulp.task('build', function() {
	gulp
		.src(paths.source)
		.pipe(
			sass({ outputStyle: 'compact', precision: 10 }).on('error', sass.logError)
		)
		.pipe(autoprefixer())
		.pipe(csscomb())
		.pipe(gulp.dest('./lib'))
		.pipe(cleancss())
		.pipe(
			rename({
				suffix: '.min',
			})
		)
		.pipe(gulp.dest('./lib'));
});

gulp.task('default', ['build']);
