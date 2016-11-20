var gulp = require('gulp');
var pump = require('pump');

gulp.task('sass:docs', function (cb) {
    var sassdoc = require('sassdoc');

    pump([
        gulp.src('sass/*.scss'),
        sassdoc()
    ], cb);
});