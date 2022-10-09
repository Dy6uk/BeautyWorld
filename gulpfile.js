const { src, dest, series, watch, parallel } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const clean = require('gulp-clean');
const browserSync = require('browser-sync').create();

function buildSass() {
    return src('src/scss/**/*.scss')
        .pipe(sass({ includePaths: ['./node_modules'] }).on('error', sass.logError))
        .pipe(dest('src/css'))
        .pipe(dest('dist/css'));
       
}

function buildHtml() {
    return src('src/**/*.html').pipe(dest('dist'));
    
}

function copy() {
    return src(['src/images/**/*.*']).pipe(dest('dist/images'));
}

function cleanDist() {
    return src('dist', { allowEmpty: true }).pipe(clean());
}

function serve() {
    watch('src/scss/**/*.scss', buildSass);
    watch('src/**/*.html', buildHtml);
}

function createDevServer() {
    browserSync.init({
        server: 'src',
        notify: false
    })
}

exports.watch = serve;
exports.build = series(cleanDist, parallel( buildSass, buildHtml, copy));
exports.default = series(buildSass, parallel(createDevServer, serve));