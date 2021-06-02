'use strict';

let gulp = require('gulp'),
    watch = require('gulp-watch'),
//     autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    rigger = require('gulp-rigger'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    rimraf = require('rimraf'),
    concat = require('gulp-concat'),
    browserSync = require("browser-sync").create();

gulp.task('sass', function () {
    return gulp.src('./src/style/main.sass')
        .pipe(sourcemaps.init())
//         .pipe(autoprefixer())
        .pipe(rigger())
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/css'))
        .pipe(browserSync.stream());
});

gulp.task('js', function() {
    return gulp.src('./src/js/**/*.js')
        .pipe(rigger())
        .pipe(concat('main.js', {newLine: ';'}))
        .pipe(gulp.dest('./build/js/'))
        .pipe(browserSync.stream())
});

gulp.task('img', function() {
    return gulp.src('./src/img/**/*.*')
        .pipe(imagemin({ 
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()],
            interlaced: true
        }))
        .pipe(gulp.dest('./build/img'))
        .pipe(browserSync.stream())
});

gulp.task('fonts', function() {
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest('build/fonts'))
        .pipe(browserSync.stream())
});

gulp.task('html', function(){
    return gulp.src('./src/**/*.html')
        .pipe(rigger())
        .pipe(gulp.dest('./build'))
        .pipe(browserSync.stream())
});

gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    });
    gulp.watch('./src/fonts/**/*.*', gulp.series('fonts'));
    gulp.watch('./src/img/**/*.*', gulp.series('img'));
    gulp.watch('./src/style/**/*.sass', gulp.series('sass'));
    gulp.watch('./src/js/**/*.js', gulp.series('js'));
    gulp.watch('./src/*.html', gulp.series('html')).on('change', browserSync.reload);
});

gulp.task('clean', function (cb) {
    rimraf('./build/img/.', cb);
    rimraf('./build/fonts/.', cb);
});

gulp.task('build', gulp.series('html', 'sass', 'js', 'img', 'fonts'));

gulp.task('default', gulp.series('clean', 'build', 'watch'));
