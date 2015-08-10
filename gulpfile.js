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
						browsers: ['last 4 versions'],
						cascade: false
					}))
        	.pipe(gulp.dest('prod/assets/css/'))
});

//Jade Template
gulp.task('template', function(){
	gulp.src('dev/template/*.jade')
		.pipe(jade({
			pretty: true
		}))
		.pipe(gulp.dest('prod/'));
});

//BrowserSync Task
gulp.task('sass-watch', ['sass'], browserSync.reload);
gulp.task('template-watch', ['template'], browserSync.reload);


//Watch Task
gulp.task('watch', function(){
	browserSync({
		server: {
			baseDir: 'prod/'
		}
	})
	gulp.watch('dev/css/style.scss', ['sass-watch']);
	gulp.watch('dev/template/*.jade', ['template-watch']);
})


gulp.task('default', ['concat','watch']);









