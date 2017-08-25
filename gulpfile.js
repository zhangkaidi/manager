var gulp = require('gulp'),
	less = require('gulp-less'),//less
    cssmin = require('gulp-minify-css'),//压缩css
    csslint = require('gulp-csslint'),
    concat = require('gulp-concat'),
    watch = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    browserSync = require('browser-sync').create(),
    spritesmith= require('gulp.spritesmith');
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
gulp.task('img', function () {
    gulp.src('./src/images/*.png')//需要合并的图片地址
        .pipe(spritesmith({
            imgName: 'sprite.png',//保存合并后图片的地址
            cssName: 'sprite.css',//保存合并后对于css样式的地址
            padding:5,//合并时两个图片的间距
            algorithm: 'binary-tree',//注释1
            cssTemplate:"./src/css/handlebarsStr.css"//注释2
        }))
        .pipe(gulp.dest('./dist/images'))
        .pipe(browserSync.reload({stream: true}));
});
gulp.task('fileWatch', function () {
	var files = [
        './view/*.html',
        './src/css/*.less',
        './src/images/*.png'
    ];
    browserSync.init({
        server: {
            base: "/"
        },
        files: ["./*.html", "./src/css/*.less",'./src/images/*.png'],
        logPrefix: "操作提示:"
    });
    gulp.watch('./src/css/*.less', ['css']);
    gulp.watch('./src/images/*.png', ['img']); 
    gulp.watch('/view/*.html').on('change', browserSync.reload);
});
gulp.task('default', ['fileWatch','img','css']);
