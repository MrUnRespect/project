const gulp = require("gulp");
const spritesmith = require("gulp.spritesmith");
const clean = require("gulp-clean");
const uglify = require("gulp-uglify")
const stylus = require("gulp-stylus");
const babel = require("gulp-babel");
gulp.task("default", ["sprite", "css", "html", "image", "js"], function () {
    gulp.watch("./src/styles/css/**/*.styl", () => { gulp.run("css") })
    gulp.watch("./src/pages/**/*.html", () => { gulp.run("html") })
    gulp.watch("./src/scripts/**/*.js", () => { gulp.run("js") })
})
// html
gulp.task("html", function () {
    gulp.src("src/pages/**/*.html")
        .pipe(gulp.dest("dist/pages"))
})
// js
gulp.task("js", function () {
    gulp.src("./src/scripts/**/*.js")
        .pipe(babel())
        .pipe(gulp.dest("dist/scripts"))
})
// css
gulp.task("css", ["sprite",], function () {
    gulp.src("./src/styles/css/**/*.styl")
        .pipe(stylus())
        .pipe(gulp.dest("dist/styles/css"))
})
gulp.task("image", ["sprite",], function () {
    gulp.src("./src/styles/images/**/*")
        .pipe(gulp.dest("dist/styles/images"))
})
// sprite
gulp.task('sprite', function () {
    gulp.src("./src/styles/images/icon/*.png")
        .pipe(spritesmith({
            imgName: 'images/sprite/sprite.png', //合并后大图的名称
            cssName: 'css/_sprite.styl',
            padding: 2,// 每个图片之间的间距，默认为0px
            cssTemplate: (data) => {
                // data为对象，保存合成前小图和合成打大图的信息包括小图在大图之中的信息
                let arr = [],
                    width = data.spritesheet.px.width,
                    height = data.spritesheet.px.height,
                    url = data.spritesheet.image
                data.sprites.forEach(function (sprite) {
                    arr.push(
                        ".icon-" + sprite.name +
                        "{" +
                        "background: url('" + url + "') " +
                        "no-repeat " +
                        sprite.px.offset_x + " " + sprite.px.offset_y + ";" +
                        "background-size: " + width + " " + height + ";" +
                        "width: " + sprite.px.width + ";" +
                        "height: " + sprite.px.height + ";" +
                        "}\n"
                    )
                })
                return arr.join("")
            }
        }))
        .pipe(gulp.dest("./src/styles"))
})
// clean
gulp.task("clean", function () {
    gulp.src("dist", { read: false }).pipe(clean());
});