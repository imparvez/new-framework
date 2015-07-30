var gulp = require('gulp');
var	uglify = require('gulp-uglify');
var	jade = require('gulp-jade');
var	sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');

//Concat and Minify
gulp.task('concat', function(){
	return gulp.src('dev/script/*.js')
			.pipe(concat('main.js'))
			.pipe(rename({suffix:'.min'}))
			.pipe(uglify())
			.pipe(gulp.dest('prod/assets/script/'));
});

//Sass
gulp.task('sass', function(){
	return gulp.src('dev/css/*.scss')
			.pipe(sass({ style: 'expanded'}))
			.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8','ie 9', 'opera 12.1'))
			.pipe(gulp.dest('prod/assets/css'))
			.pipe(rename({suffix:'.min'}))
			.pipe(minifycss())
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
	gulp.watch('dev/css/style.scss', ['sass']);
	gulp.watch('dev/template/*.jade', ['template']);
})


gulp.task('default', ['concat','sass','template','watch']);









