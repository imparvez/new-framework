var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	jade = require('gulp-jade'),
	sass = require('gulp-ruby-sass');

//Sass
gulp.task('sass', function(){
	return sass('dev/css/style.scss')
				.on('error', function(err){
					console.log('Error!',err.message);
				})
			.pipe(gulp.dest('prod/assets/css/'))
});

//Uglify
gulp.task('uglify', function(){
	gulp.src('dev/script/*.js')
			.pipe(uglify())
			.pipe(gulp.dest('prod/assets/script/'));
	gulp.src('dev/css/style.scss')
			.pipe(uglify())
			.pipe(gulp.dest('prod/assets/css/'));
});

//Jade Template
gulp.task('template', function(){
	gulp.src('dev/template/*.jade')
				.pipe(jade({
					pretty: true
				}))
				.pipe(gulp.dest('prod/'));
});

//Watch Task
gulp.task('watch', function(){
	gulp.watch('dev/script/*.js', ['uglify']);
	gulp.watch('dev/css/style.scss', ['sass']);
	gulp.watch('dev/template/*.jade', ['template']);
})


gulp.task('default', ['watch']);









