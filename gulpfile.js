var gulp = require('gulp'),
	less = require('gulp-less'),//less
    cssmin = require('gulp-minify-css'),//压缩css
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create();
var htmlPath = './view/*.html';
    //csso = require('gulp-csso'); //合并css属性
gulp.task('css',function () {
 	gulp.src('./src/css/*.less') //多个文件以数组形式传入
        .pipe(less())
        .pipe(autoprefixer()) //自动添加浏览器前缀
        .pipe(csslint()) //语法检测
  		.pipe(concat('global.css'))
        .pipe(gulp.dest('./dist/css/'))//将会在src/css下生成index.css以及detail.css 
		.pipe(cssmin()) //压缩css
		.pipe(browserSync.reload({stream: true}));
});
gulp.task('fileWatch', function () {
	  var files = [
        './view/*.html',
        './src/css/*.less',
    ];
    browserSync.init(files,{
        server: {
            base: "./view",
        },
        files: ["./view/*.html", "./src/css/*.less"],
        logPrefix: "操作提示:"
    });
    gulp.watch('./src/css/*.less', ['css']); 
    gulp.watch(htmlPath).on('change', browserSync.reload);
});
gulp.task('default', ['fileWatch']);
