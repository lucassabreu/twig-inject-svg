'use strict';

const gulp = require('gulp');
const gulpLoadPlugins = require('gulp-load-plugins');
const twigInjectSvg = require('../index.js');

const $ = gulpLoadPlugins();

gulp.task('default', () => {
    return gulp.src('./templates/*.twig')
        .pipe(twigInjectSvg('./templates'))
        .pipe(gulp.dest('./dist/'));
});