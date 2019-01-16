const gulp = require("gulp");
const minify = require("gulp-minify");
const babel = require("gulp-babel");
const del = require("del");
const concat = require("gulp-concat");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const sourcemaps = require('gulp-sourcemaps');

gulp.task("clean-all", function() {
  return del(["./dist", "./transpilled", "/build"], { force: true });
});

gulp.task("clean", function() {
  return del(["./transpilled", "./dist"], { force: true });
});

gulp.task("minify", function() {
  return gulp
    .src("./dist/*.js")
    .pipe(concat("chord.js"))
    .pipe(minify())
    .pipe(gulp.dest("./build"));
});

gulp.task("transpile", function() {
  return gulp
    .src("src/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel())
    .pipe(gulp.dest("./transpilled"));
});

gulp.task("watch", function() {
  gulp.watch("./src/*.js", gulp.series("clean-all", "transpile", "browserify", "minify", "clean"));
});

gulp.task("browserify", function() {
  return browserify("./transpilled/index.js")
    .bundle()
    .pipe(source("bundle.js"))
    .pipe(gulp.dest("./dist"));
});

gulp.task(
  "default",
  gulp.series("clean-all", "transpile", "browserify", "minify", "clean")
);
