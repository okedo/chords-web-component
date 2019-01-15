const gulp = require("gulp");
const minify = require("gulp-minify");
const babel = require("gulp-babel");
const del = require("del");
const concat = require("gulp-concat");
const browserify = require("browserify");
const source = require("vinyl-source-stream");

gulp.task("clean-all", function() {
  return del(["./dist/**", "./transpilled/**"], { force: true });
});

gulp.task("clean", function() {
  return del(["./transpilled/**", "./dist/bundle.js"], { force: true });
});

gulp.task("minify", function() {
  return gulp
    .src("./dist/*.js")
    .pipe(concat("chord.js"))
    .pipe(minify())
    .pipe(gulp.dest("./dist"));
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

gulp.task("browserify", function() {
  return browserify("./transpilled/chord.js")
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./dist"));
});

gulp.task(
  "default",
  gulp.series("clean", "transpile", "browserify", "minify", "clean")
);
