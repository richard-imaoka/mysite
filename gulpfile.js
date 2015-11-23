var gulp = require('gulp');
var browserSync = require('browser-sync').create();
var fs = require("fs");
var jade = require("gulp-jade");
var rename = require("gulp-rename");
var change = require("gulp-change");

// Static server
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./"
    }
  });
});

gulp.task('jade', function () {
  var files = fs.readdirSync(".");
  console.log(files);
  gulp.src("jade/toc.jade")
      .pipe(jade({
        locals: files,
        data: files,
        pretty: true
      }))
      .pipe(gulp.dest('./dist/'));
})

gulp.task('jadify', function () {
  gulp.src("html/articles/*.html")
      .pipe(change(function(content){
        return this.fname;
      }))
      .pipe(rename(function (path) {
        path.extname = ".jade";
        return path;
      }))
      .pipe(gulp.dest('./dist/'));
})