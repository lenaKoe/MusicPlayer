//REQUIRED MODULES
const gulp = require('gulp'),
      sass = require('gulp-sass'),
      browserSync = require('browser-sync').create();
      babelify = require('babelify'),
      browserify = require ('browserify'),
      source = require ('vinyl-source-stream'),
      buffer = require ('vinyl-buffer');
    

//GULP TASKS
gulp.task('sass', function() {
  return gulp.src('src/styles/index.scss') 
    .pipe(sass()) 
    .pipe (gulp.dest('build/css')) 
    .pipe(browserSync.reload({
      stream:true
    }))
});

gulp.task('browserSync', () =>
  browserSync.init({
    server: {
      baseDir:'./'
    },
  })
);

gulp.task("es6", () =>  {
  browserify('./src/es6/app.js')
    .transform("babelify", {
      presets: ["es2015"]
    })
    .bundle()
    .pipe(source("app.js"))
    .pipe(buffer())
    .pipe(gulp.dest("./build/es5/"));
});

//WATCH
gulp.task('watch', () => {
  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('index.html', browserSync.reload);
});

//DEFAULT 
gulp.task('default', ['sass', 'es6', 'browserSync', 'watch']);

