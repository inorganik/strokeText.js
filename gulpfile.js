var gulp = require('gulp');
var wrap = require('gulp-wrap-umd');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var del = require('del');
var pump = require('pump');

gulp.task('clean', function(cb) {
	del(['dist/*']);
	return cb();
});

gulp.task('umd', ['clean'], function(cb) {
	pump([
		gulp.src('strokeText.js'),
		wrap({
			namespace: 'StrokeText',
			exports: 'StrokeText'
		}),
		uglify(),
		rename({
			suffix: '.min'
		}),
		gulp.dest('dist')
	],
	cb);
});

gulp.task('build', ['umd']);
gulp.task('default', ['build']);