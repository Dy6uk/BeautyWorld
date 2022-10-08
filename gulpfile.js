const {src, dest} = require('gulp');

function buildSass() {
    return src('src/scss/**/*.scss')
        .pipe(sass({ includePaths: ['./node_modules'] }).on('error', sass.logError))
        .pipe(dest('src/css'))
        .pipe(dest('dist/css'));

        exports.sass = buildSass;