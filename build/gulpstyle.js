/*eslint no-undef: "error"*/
/*eslint-env node*/

const gulp = require('gulp')
const sass = require('gulp-sass')
const cleancss = require('gulp-clean-css')
const csscomb = require('gulp-csscomb')
const rename = require('gulp-rename')
const autoprefixer = require('gulp-autoprefixer')

const paths = {
	source: '../packages/kotti-style/src/*.scss',
}

gulp.task('watch', function() {
	gulp.watch('../packages/kotti-style/src/**/*.scss', ['build'])
})

gulp.task('build', function() {
	gulp
		.src(paths.source)
		.pipe(
			sass({
				outputStyle: 'compact',
				precision: 10,
			}).on('error', sass.logError),
		)
		.pipe(autoprefixer())
		.pipe(csscomb())
		.pipe(cleancss())
		.pipe(
			rename({
				suffix: '.min',
			}),
		)
		.pipe(gulp.dest('../packages/kotti-style/dist'))
		.pipe(gulp.dest('../dist/kotti-style'))
})

gulp.task('default', ['build'])
