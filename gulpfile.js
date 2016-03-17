var pkg = require('./package.json'),
	gulp = require('gulp'),
	plugins = require('gulp-load-plugins')({
		pattern: ['gulp-*', 'gulp.*'],
		replaceString: /\bgulp[\-.]/
	}),
	// header = require('gulp-header'),
	// connect = require('gulp-connect'),
	// jshint = require('gulp-jshint'),
	// concat = require('gulp-concat'),
	// uglify = require('gulp-uglify'),
	// watch = require('gulp-watch'),
	// rename = require('gulp-rename'),
	// tmpl2js = require('gulp-tmpl2js'),
	// insert = require('gulp-insert'),
	// babel = require('gulp-babel'),
	dateFormat = require('dateformat'),
	path = require('path');

var banner = ['/**', 
	' * @name : <%= pkg.name %>',
	' * @version : v<%= pkg.version %>',
	' * @author : <%= pkg.author %>',
	' */',
	''].join('\n');

gulp.task('connect', function() {
	plugins.connect.server({
		root: './',
		port: 8080,
		livereload: false
	});
});

gulp.task('lint', function() {
	return gulp.src('js/src/*.js')
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default'));
});

gulp.task('concat', function() {
	return gulp.src(['js/lib/doT.js', 'js/template/sample.tmpl.js', 'js/template/test.tmpl.js','js/src/util.js', 'js/src/object.js'])
		.pipe(plugins.concat('BUILD_FILE_NAME.js'))

		// transcompile es2015 by babel
		.pipe( plugins.babel({
			presets: ['es2015']
		}) )
		.pipe(plugins.insert.transform(function(contents, file) {
			var prefix = '(function(){\n',
				suffix = '\n}());';
			return prefix + contents + suffix;
		}))

		.pipe( plugins.header(banner, {pkg: pkg}) )
		.pipe(gulp.dest('build'));
});

gulp.task('custom-backup', function() {
	var date = new Date(),
		prefix = dateFormat(date, 'yyyymmdd-HH-MM'),
		dir = 'backup/' + dateFormat(date, 'yyyy') + '/' + dateFormat(date, 'mmdd');
	
	return gulp.src('build/BUILD_FILE_NAME.js')
		.pipe( plugins.rename({prefix: prefix + '_'}) )
		.pipe( gulp.dest(dir) );
});

gulp.task('uglify', function() {
	return gulp.src('build/BUILD_FILE_NAME.js')
		.pipe(plugins.rename({suffix: '.min'}))
		.pipe(plugins.uglify())
		.pipe( plugins.header(banner, {pkg: pkg}) )
		.pipe(gulp.dest('build'));
});

gulp.task('tmpl', function() {
	return gulp.src('template/*.tmpl.html')
		.pipe( plugins.tmpl2js({
			mode: 'format',
			wrap: false
		}) )
		.pipe(plugins.insert.transform(function(contents, file) {
			var fileName = path.basename(file.path).split('.').shift();

			var prefix = '(function(){\n    if(!window.nc) window.nc = {};\n    if(!nc.PROJECT_NAME) nc.PROJECT_NAME = {};\n    if(!nc.PROJECT_NAME.tmpl) nc.PROJECT_NAME.tmpl = {};\n    \n    var tmpl = ',
				suffix = ';\n    \n    nc.PROJECT_NAME.tmpl["' + fileName + '"] = tmpl;\n}());\n';
			return prefix + contents + suffix;
		}))
		.pipe( plugins.rename({
			extname:'.js'
		}) )
		.pipe( gulp.dest('js/template/') ); //Output folder
});

/*
 * use tasks
 */
gulp.task('watch', function() {
	gulp.watch(['js/src/*.js'], ['lint']);
});

gulp.task('build', plugins.sequence('tmpl', 'lint', 'concat', 'custom-backup', 'uglify') );
