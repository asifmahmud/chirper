
var gulp        = require('gulp');
var browserify  = require('gulp-browserify');
var concat      = require('gulp-concat');
var plumber     = require('gulp-plumber');

/*
* ----------------------------------------------------
* The 'browserify' task recursively builds all modules
* specified by the 'require' statements, starting from
* main.js file located in 'src' directory. It compiles
* them into a single main.js file and places it into
* the public folder.
* ----------------------------------------------------
*/

gulp.task('browserify', function(){
    gulp.src("src/main.js")
    .pipe(plumber())
    .pipe(browserify({transform: 'reactify', debug: true}))
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public'));
});

/*
* ----------------------------------------------------
* The 'default' task just calls the browserify task
* ----------------------------------------------------
*/

gulp.task('default', ['browserify']);

/*
* ----------------------------------------------------
* The 'watch' task continously watched for any changes
* made to any files in 'src' directory and re-builds
* them.
* ----------------------------------------------------
*/

gulp.task('watch', function(){
    gulp.watch('src/**/*.*', ['default']);
});
