var gulp    = require('gulp');
var compass = require('gulp-compass');

gulp.task('compass', function () {
    gulp.src('./src/sass/*.scss')
        .pipe(compass({
            sass: './src/sass/'
        }))
        .on('error', function (error) {
            // Would like to catch the error here
            console.log(error);

        })
        .pipe(gulp.dest('./build/styles/'));
});