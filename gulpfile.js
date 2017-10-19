var gulp        = require('gulp');
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
var harp        = require('harp');
var prefixer    = require('gulp-autoprefixer');

gulp.task('autoPrefix', function() {
  return gulp.src(path.autoPrefix.src)
    .pipe(autoPrefixer())
    .pipe(gulp.dest(path.autoPrefix.dest));
});

/**
 * Serve the Harp Site from the src directory
 */
gulp.task('serve', function () {
  harp.server(__dirname + '/app', {
    port: 9000
  }, function () {
    browserSync({
      proxy: "localhost:9000",
      open: false,
      /* Hide the notification. It gets annoying */
      notify: {
        styles: ['opacity: 1', 'position: absolute']
      }
    });
    /**
     * Watch for scss changes, tell BrowserSync to refresh main.css
     */
    gulp.watch(["app/css/**/*.sass"], function () {
      reload("css/main.css", {stream: true});
    });
    /**
     * Watch for all other changes, reload the whole page
     */
    gulp.watch(["./**/*.ejs", "./**/*.js", "./**/*.json", "./**/*.md"], function () {
      reload();
    });
  })
});

/**
 * Default task, running `gulp` will fire up the Harp site,
 * launch BrowserSync & watch files.
 */
gulp.task('default', ['serve']);
