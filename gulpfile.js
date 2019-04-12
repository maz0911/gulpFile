const gulp = require("gulp");
const uglify = require("gulp-uglify");
const babel = require("gulp-babel");
const cssMin = require("gulp-clean-css");
const sass = require("gulp-sass");
const server = require("gulp-webserver");

gulp.task("script", async() => {
    gulp.src("./src/js/*.js")
        .pipe(babel({
            presets: "es2015"
        }))
        .pipe(uglify())
        .pipe(gulp.dest("./dest/js"))
})
gulp.task("css", async() => {
    gulp.src("./src/css/*.css")
        .pipe(cssMin())
        .pipe(gulp.dest("./dest/css"))
})
gulp.task("sass", async() => {
    gulp.src("./src/css/sass/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("./dest/css"));
})

gulp.task("webserver", () => {
    gulp.src(".")
        .pipe(server({
            host: "localhost",
            port: 8888,
            livereload: true,
            open: true
        }))
})
gulp.task("dev", gulp.series("webserver"));

gulp.task("bulid", gulp.parallel("css", "script", "sass"));