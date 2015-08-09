var gulp = require('gulp');
var	uglify = require('gulp-uglify');
var	jade = require('gulp-jade');
var	sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var minifycss = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');

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
	return sass('dev/css/style.scss', { style: 'expanded' })
					.pipe(autoprefixer({
						browsers: ['last 2 versions'],
						cascade: false
					}))
        	.pipe(gulp.dest('prod/assets/css/'))
});

gulp.task('sass-watch', ['sass'], browserSync.reload);

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
	browserSync({
		server: {
			baseDir: 'prod/'
		}
	})
	gulp.watch('dev/css/style.scss', ['sass-watch']);
	gulp.watch('dev/template/*.jade', ['template']);
})


gulp.task('default', ['concat','watch']);









