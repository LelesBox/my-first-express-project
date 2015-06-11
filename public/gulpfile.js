/**
 * Created by 14062539 on 2015/5/11.
 */
var gulp = require('gulp');
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('default', function() {
    console.log("Helloworld")
});

gulp.task('jshint',function(){
    return gulp.src("js/*.js")
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 合并，压缩文件
gulp.task('scripts', function() {
    gulp.src('js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('js'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js'));
    gulp.src('js/controllers/*.js')
        .pipe(concat('controller.js'))
        .pipe(gulp.dest('js/controllers'))
        .pipe(rename('controller.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('js/controllers'));
});