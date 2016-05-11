'use strict';

//   Libraries
var argv = require('yargs').argv,
    fs = require('fs'),

    gulp = require('gulp'),
    jade = require('gulp-jade'),
    sass = require('gulp-sass'),
    wrap = require('gulp-wrap'),
    gulpif = require('gulp-if'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    rimraf = require('gulp-rimraf'),
    sourcemaps = require('gulp-sourcemaps');

//   Paths and configurations

var config = require('./app/config');

var paths = {
    js : [
        `src/modules/app.js`,
        `src/modules/**/*.module.js`,
        `src/modules/**/*.js`
    ],
    libs : [
        `vendor/jquery/dist/jquery.js`,
        `vendor/angular/angular.js`,
        `vendor/angular-ui-router/release/angular-ui-router.js`,
        `vendor/angular-animate/angular-animate.js`,
        `vendor/angular-bootstrap/ui-bootstrap-tpls.js`,
        `vendor/angular-permission/dist/angular-permission.js`,
        `vendor/angular-file-upload/dist/angular-file-upload.js`,
        `vendor/angular-toastr/dist/angular-toastr.tpls.js`,
        'vendor/lodash/dist/lodash.js',
        'vendor/angular-simple-logger/dist/angular-simple-logger.js',
        'vendor/angular-google-maps/dist/angular-google-maps.js'
    ],
    styles : [
        `vendor/bootstrap/dist/css/bootstrap.css`, 
        `vendor/font-awesome/scss/font-awesome.scss`,
        `vendor/angular-toastr/dist/angular-toastr.css`
    ],
    fonts : [
        'vendor/bootstrap/fonts/*.*',
        'vendor/font-awesome/fonts/*.*',
        'src/fonts/*.*'
    ]
};

//
//   Layout
//
gulp.task('templates', function() {
    return gulp
        .src('src/modules/**/*.jade')
        .pipe(jade({
            doctype : 'html',
            pretty : true,
            locals : {
                config : config
            }
        }))
        .pipe(gulp.dest('dist'))
});

//
//   CSS related tasks
//
gulp.task('sass-app', function() {
    return gulp
        .src('src/styles/styles.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('sass-vendor', function() {
    return gulp
        .src(paths.styles)
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(concat('vendor.css'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/css'))
});

gulp.task('styles', ['sass-app', 'sass-vendor']);

//
//   JS related tasks
//
gulp.task('js-app', function() {
    return gulp
        .src(paths.js)
        .pipe(wrap("\n(function(){\n<%= contents %>\n})();"))
        .pipe(babel({}))
        .pipe(concat('all.js'))
        .pipe(gulpif(argv.minify, uglify()))
        .pipe(gulp.dest('dist/js'))
});

gulp.task('js-libs', function() {
    return gulp
        .src(paths.libs)
        .pipe(concat('vendor.js'))
        .pipe(gulpif(argv.minify, uglify()))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('js', ['js-app', 'js-libs']);

//
//   Common tasks
//
gulp.task('copy-images', function () {
    return gulp
        .src('src/images/**/*.*')
        .pipe(gulp.dest('dist/images/'));
});

gulp.task('copy-fonts', function() {
    return gulp
        .src(paths.fonts)
        .pipe(gulp.dest('dist/fonts/'))
});


gulp.task('install', [
    'copy-images',
    'copy-fonts',
    'js',
    'styles',
    'templates'
]);

gulp.task('watch', function () {
    gulp.watch(['src/**/*.jade'], ['templates']);
    gulp.watch(['src/**/*.js'], ['js-app']);
    gulp.watch(['src/styles/**/*.scss'], ['sass-app']);
    gulp.watch(['src/images/**/*.*'], ['copy-images']);
});