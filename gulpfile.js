var gulp      = require('gulp'),
watch         = require('gulp-watch'),
sass          = require('gulp-sass'),
browserSync   = require('browser-sync'),
reload        = browserSync.reload;

gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});


gulp.task('sass', function () {
  return gulp.src('./sass/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./css'))
    .pipe(reload({stream: true}))
});

gulp.task('watch', ['browser-sync'], function () {
  gulp.watch('./sass/**/*.scss', ['sass'])
  gulp.watch('index.html').on('change'.reload)
  gulp.watch('js\dom.js').on('change'.reload)
  gulp.watch('js\main.js').on('change'.reload)
  gulp.watch('js\mov.js').on('change'.reload)
});
