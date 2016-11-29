var gulp = require('gulp');
var path = require('path');
var pump = require('pump');

gulp.task('sass:docs', function (cb) {
    var sassdoc = require('sassdoc');

    pump([
        gulp.src('sass/*.scss'),
        sassdoc()
    ], cb);
});

gulp.task('sass:tests', function (cb) {
    var sass = require('gulp-sass');
    var eyeglass = require('eyeglass');

    pump([
        gulp.src('tests/tests.scss'),
        sass(eyeglass({
            includePaths: 'node_modules/sass-true/sass/',
            eyeglass: {
                modules: [
                    {
                        path: path.join(__dirname)
                    }
                ]
            }
        }))
    ], cb);
});
