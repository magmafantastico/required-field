const _PROJECTNAME = '';

var gulp = require('gulp'),
	concat = require('gulp-concat-css'),
	jshint = require('gulp-jshint'),
	minifycss = require('gulp-minify-css'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify'),
	imageResize = require('gulp-image-resize'),
	tinypng = require('gulp-tinypng'),
	browserSync = require('browser-sync').create();

/*
 * To use the gulp-image-resize, it needs of some dependencies:
 * https://www.npmjs.com/package/gulp-image-resize
 *
 * Or, install:
 *
 * Ubuntu:
 * apt-get install imagemagick
 * apt-get install graphicsmagick
 *
 * Mac:
 * brew install imagemagick
 * brew install graphicsmagick
 *
 * Windows & others:
 * http://www.imagemagick.org/script/binary-releases.php
 * */

var tinypngToken = 'hHrU0V0DGG3tNna6R1sqNNOqqU-x1S4u';

// Content structure

var source = {
	content: '*',
	location: './'
};

source.css = {
	content: '*.css',
	location: 'css/'
};

source.js = {
	content: '*.js',
	location: 'js/'
};

source.index = {
	content: '*.html',
	location: './'
};

source.images = {
	content: '*.*',
	location: 'img/'
};

source.images.largePhotos = {
	content: '*.*',
	location: source.images.location + 'largePhotos/'
};

var dist = {
	content: '*',
	location: 'dist/'
};

dist.css = source.css;
dist.css.location = dist.location + dist.css.location;

dist.js = source.js;
dist.js.location = dist.location + dist.js.location;

// CSS

gulp.task('css', function() {
	gulp.src(css.location + css.content)
		.pipe(concat(_PROJECTNAME + '.css'))
		.pipe(gulp.dest(dist.css.location))
		.pipe(minifycss())
		.pipe(rename({
			extname: '.min.css'
		}))
		.pipe(gulp.dest(dist.css.location));
});

// Watch scss AND html files, doing different things with each.
gulp.task('serve', function () {

	// Serve files from the root of this project
	browserSync.init({
		server: {
			baseDir: "./"
		}
	});

	gulp.watch(source.index.content).on("change", browserSync.reload);

});

gulp.task('default', ['serve']);