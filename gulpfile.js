var gulp = require('gulp'),
	gulpif = require('gulp-if'),
	uglify = require('gulp-uglify'),
	connect = require('gulp-connect'),
	sass = require('gulp-sass'),
	cssmin = require('gulp-minify-css'),
	concat = require('gulp-concat-css'),
	useref = require('gulp-useref'),
	jshint = require('gulp-jshint');

gulp.task("build:styles", function () {
	gulp.src("src/assets/scss/**/*.scss")
		.pipe(sass())
        .pipe(concat("all.min.css"))
        .pipe(cssmin())
        .pipe(gulp.dest("build/css/")) 
        .pipe(connect.reload());
});

gulp.task("build:app", function () {
	var assets = useref.assets();

	return gulp.src("src/index.html")
			   .pipe(assets)
			   .pipe(gulpif('*.js', uglify()))
			   .pipe(assets.restore())
		       .pipe(useref())
        	   .pipe(gulp.dest('build'))
        	   .pipe(connect.reload());
});

gulp.task('lint', function() {
  return gulp.src('src/app/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task("server:run", ["build:styles","build:app","watch", "lint"], function () {

	connect.server({
		root: "build",
		livereload : true
	});
})

gulp.task("watch", function () {
	gulp.watch("src/index.html", ["build:app"]);
	gulp.watch("src/assets/scss/**/*.scss",["build:styles","build:app"]);
	gulp.watch("src/app/**/*.js",["lint", "build:app"]);
});


