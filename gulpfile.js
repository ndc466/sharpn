var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var header = require('gulp-header');
var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');
var pkg = require('./package.json');
var wiredep = require('wiredep').stream;

// Set the banner content
var banner = ['/*!\n',
    ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n',
    ' * Copyright 2013-' + (new Date()).getFullYear(), ' <%= pkg.author %>\n',
    ' * Licensed under <%= pkg.license.type %> (<%= pkg.license.url %>)\n',
    ' \n',
    ''
].join('');

// Compile LESS files from /less into /css
gulp.task('less', function() {
    return gulp.src('less/*.less')
        .pipe(less())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(gulp.dest('css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify compiled CSS
gulp.task('minify-css', ['less'], function() {
    return gulp.src('public/style/css/main.css')
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/style/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Minify JS
gulp.task('minify-js', function() {
    return gulp.src('public/style/js/main.js')
        .pipe(uglify())
        .pipe(header(banner, { pkg: pkg }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/style/js'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Copy vendor libraries from /node_modules into /vendor
gulp.task('copy', function() {
    gulp.src([
        'bower_components/angular/angular.js', 
        'bower_components/angular/angular.min.js',
        'bower_components/angular-ui-router/release/angular-ui-router.js', 
        'bower_components/angular-ui-router/release/angular-ui-router.min.js',
        'bower_components/angular-input-masks/angular-input-masks-standalone.js'
    ])
    .pipe(gulp.dest('public/vendor/angular'))

    gulp.src([
        'bower_components/bootstrap/dist/**/*', 
        '!**/npm.js', 
        '!**/bootstrap-theme.*', 
        '!**/*.map'])
    .pipe(gulp.dest('public/vendor/bootstrap'))

    gulp.src([
        'bower_components/jquery/dist/jquery.js', 
        'bower_components/jquery/dist/jquery.min.js', 
        'bower_components/jquery-easing/jquery.easing.js', 
        'bower_components/jquery-easing/jquery.easing.min.js'
    ])
    .pipe(gulp.dest('public/vendor/jquery'))

    gulp.src([
        'bower_components/font-awesome/**',
        '!bower_components/font-awesome/**/*.map',
        '!bower_components/font-awesome/.npmignore',
        '!bower_components/font-awesome/*.txt',
        '!bower_components/font-awesome/*.md',
        '!bower_components/font-awesome/*.json'
    ])
    .pipe(gulp.dest('public/vendor/font-awesome'))
})

// Run everything
gulp.task('default', ['minify-css', 'minify-js', 'copy']);

// Configure the browserSync task
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

// Dev task with browserSync
gulp.task('dev', ['browserSync', 'less', 'minify-css', 'minify-js'], function() {
    gulp.watch('less/*.less', ['less']);
    gulp.watch('css/*.css', ['minify-css']);
    gulp.watch('js/*.js', ['minify-js']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('js/**/*.js', browserSync.reload);
});

gulp.task('bower', function () {
  gulp.src('./public/index.html')
    .pipe(wiredep({
      directory: './bower_components'
    }))
    .pipe(gulp.dest('./public'));
});
