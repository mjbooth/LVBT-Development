var gulp = require('gulp'),
	uglify = require('gulp-uglify');,
	minifyHTML = require('gulp-minify-html');

// Scripts tasks
// Uglifies

gulp.task('scripts', function(){
	gulp.src('assets/js/*.js')
	.pipe(uglify())
	.pipe(gulp.dest('build/assets'));
});

// Watch tasks
// Watches

gulp.task('watch', function(){
	gulp.watch('assets/js/*.js', ['scripts']);
});

gulp.task('default', ['scripts', 'watch']);