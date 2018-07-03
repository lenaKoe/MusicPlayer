//REQUIRED MODULES
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create();

//GULP TASKS
gulp.task('sass', function() {
  return gulp.src('src/styles/index.scss') 
    .pipe(sass()) 
    .pipe (gulp.dest('build/css')) 
    .pipe(browserSync.reload({
      stream:true
    }))
});

gulp.task('browserSync', function(){
  browserSync.init({
    server: {
      baseDir:'./'
    },
  })
})

gulp.task('babel', function () {
  return gulp.src("src/es6/app.js")
    .pipe(babel())
    .pipe(gulp.dest("es5"));
});

//WATCH
gulp.task('watch', function(){
  gulp.watch('src/styles/*.scss', ['sass']);
  gulp.watch('index.html', browserSync.reload);
});

//DEFAULT
gulp.task('default', ['sass', 'watch', 'babel','browserSync']);