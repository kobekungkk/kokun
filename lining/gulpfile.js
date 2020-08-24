const gulp = require('gulp');
//实现html拷贝
gulp.task('copy-html',function(){
    return gulp.src(['html/*.html'])
    .pipe(gulp.dest('dist/'))
    .pipe(connect.reload())
})
gulp.task('copy-index',function(){
    return gulp.src('index.html')
    .pipe(gulp.dest('dist/'))
})
const sass = require('gulp-sass');
const minicss = require('gulp-minify-css')
const rename = require('gulp-rename')
//实现css压缩拷贝
gulp.task('minicss1',function(){
    return gulp.src('scss/index.{scss,sass}')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minicss())
    .pipe(rename('index.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
gulp.task('minicss2',function(){
    return gulp.src('scss/detail.{scss,sass}')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minicss())
    .pipe(rename('detail.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
gulp.task('minicss3',function(){
    return gulp.src('scss/register.{scss,sass}')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minicss())
    .pipe(rename('register.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
gulp.task('minicss4',function(){
    return gulp.src('scss/login.{scss,sass}')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minicss())
    .pipe(rename('login.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
gulp.task('minicss5',function(){
    return gulp.src('scss/shoppingCart.{scss,sass}')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minicss())
    .pipe(rename('shoppingCart.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
gulp.task('minicss6',function(){
    return gulp.src('scss/list.{scss,sass}')
    .pipe(sass())
    .pipe(gulp.dest('dist/css'))
    .pipe(minicss())
    .pipe(rename('shoppingCart.min.css'))
    .pipe(gulp.dest('dist/css'))
    .pipe(connect.reload())
})
//实现js拷贝
const uglify = require('gulp-uglify')
gulp.task('copy-js',function(){
    return gulp.src(['*.js','!gulpfile.js'])
    .pipe(gulp.dest('dist/js'))
    .pipe(connect.reload())

})
//实现img拷贝
gulp.task('copy-img',function(){
    return gulp.src('images/*.{png,jpg}')
    .pipe(gulp.dest('dist/images'))
    .pipe(connect.reload())
})
//实现json数据拷贝
gulp.task('copy-json',function(){
    return gulp.src(['json/*.json','!package.json'])
    .pipe(gulp.dest('dist/json'))
    .pipe(connect.reload())
})
//实现php拷贝
// gulp.task('copy-php',function(){
//     return gulp.src('php/*.php')
//     .pipe(gulp.dest('dist/php'))
//     .pipe(connect.reload())
// })
gulp.task('build',['copy-index','copy-html','minicss1','minicss2','minicss3','minicss5','minicss4','minicss6','copy-js','copy-js','copy-img','copy-json'])
//实现监听
gulp.task('watch',function(){
    gulp.watch('index.html',['copy-index'])
    gulp.watch(['html/*.html'],['copy-html'])
    gulp.watch('scss/index.{scss,sass}',['minicss1'])
    gulp.watch('scss/detail.{scss,sass}',['minicss2'])
    gulp.watch('scss/register.{scss,sass}',['minicss3'])
    gulp.watch('scss/login.{scss,sass}',['minicss4'])
    gulp.watch(['*.js','!gulpfile.js'],['copy-js'])
    gulp.watch('images/*.{png,jpg}',['copy-img'])
    gulp.watch(['*.json','!package.json'],['copy-json'])
    // gulp.watch('php/*.php',['copy-php'])
    gulp.watch('scss/shoppingCart.{scss,sass}',['minicss5'])
    gulp.watch('scss/list.scss',['minicss6'])

})
//开服务器
const connect = require('gulp-connect')
gulp.task('server',function(){
    connect.server({
        root:'dist',
        port:8888,
        livereload:true
    })
})
gulp.task('default',['watch','server'])
