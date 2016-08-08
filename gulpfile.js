var gulp = require('gulp');
var livereload = require('gulp-livereload'); //自动刷新页面
var del = require('del'); //清除文件
var rename = require('gulp-rename');
var cssWrap = require('gulp-css-wrap');
var mainBowerFiles = require('main-bower-files');
var bowerNormalizer = require('gulp-bower-normalize');

gulp.task('bower', function () {
    gulp.src(mainBowerFiles(), { base: './bower_components' })
        .pipe(bowerNormalizer({ bowerJson: './bower.json' }))
        .pipe(gulp.dest('dist/vendor'));
});

gulp.task('styles', function () {
    return gulp.src('src/styles/**/*')
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('scripts', function () {
    return gulp.src('src/scripts/**/*')
        .pipe(gulp.dest('dist/scripts'));
});

gulp.task('views', function () {
    return gulp.src('src/views/**/*')
        .pipe(gulp.dest('dist/views'));
});

gulp.task('clean', function (cb) {
    del(['dist/*'], cb)
});

gulp.task('default', ['bower', 'styles', 'scripts', 'views']);

// Watch
gulp.task('watch', function () {
    // Watch .scss files
    gulp.watch('src/styles/**/*', ['styles']);
    gulp.watch('src/views/**/*', ['views']);
	gulp.watch('src/scripts/**/*', ['scripts']);
    // Create LiveReload server
    //livereload.listen();
    // Watch any files in dist/, reload on change
    //gulp.watch(['dist/**']).on('change', livereload.changed);
});
