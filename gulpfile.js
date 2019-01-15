var gulp = require("gulp");
var uglify = require("gulp-uglify");
var babel = require("gulp-babel");

gulp.task("minify", function() {
  return gulp
    .src("./transpilled/*.js")
    .pipe(uglify())
    .pipe(gulp.dest("/dist"));
});

gulp.task("transpile", function() {
  return gulp
    .src("src/*.js")
    .pipe(babel())
    .pipe(gulp.dest("./transpilled"));
});

gulp.task("watch", function() {
  gulp.watch("./src/*.js", gulp.series("transpile", "minify"));
});

gulp.task(
  "default",
  gulp.series("transpile", "minify", function() {
    console.log("Completed");
  })
);
