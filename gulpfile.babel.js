import gulp from 'gulp';
import wrap from 'gulp-wrap-umd';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import del from 'del';

export const clean = () => del(['dist/*']);

export function umd() {
	return gulp.src('strokeText.js')
		.pipe(wrap({
			namespace: 'StrokeText',
			exports: 'StrokeText'
		}))
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(gulp.dest('dist'));
}

gulp.task('clean', clean);
const build = gulp.series(clean, umd);
gulp.task('build', build);

export default build;