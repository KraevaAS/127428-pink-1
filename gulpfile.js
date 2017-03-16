var gulp = require('gulp'),
  connect = require('gulp-connect'),
  sass = require('gulp-sass'),
  concat = require('gulp-concat'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify'),
  image = require('gulp-image'),
  fontgen = require('gulp-fontgen');

gulp.task('connect', function() {
  connect.server({
    port: 8081,
    root: 'dist',
    livereload: true
  });
});

gulp.task('html', function () {
  return gulp.src('./*.html')
  .pipe(gulp.dest('./dist'))
  .pipe(connect.reload());
})

gulp.task('sass', function() {
  return gulp.src('./css/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest('./dist/css'))
  .pipe(connect.reload());
})

gulp.task('scripts', function() {
  return gulp.src('./js/*.js')
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('./dist/scripts'))
  .pipe(connect.reload());
})

gulp.task('image', function () {
  return gulp.src('./img/*')
    .pipe(image())
    .pipe(gulp.dest('./dist'))
    .pipe(connect.reload());
})

gulp.task('fontgen', function() {
  return gulp.src("./fonts/*.{ttf,woff,eot}")
    .pipe(gulp.dest('./dist/fonts'))
});


gulp.task('watch', function () {
  gulp.watch(['./**/*.scss'], ['sass']);
  gulp.watch(['./**/*.html'], ['html']);
  gulp.watch(['./**/*.js'], ['scripts']);
})

gulp.task('font-awesome-fonts', function() {
    return gulp.src(['./node_modules/font-awesome/fonts/*'])
            .pipe(gulp.dest('./dist/fonts'));
})

gulp.task('font-awesome-css', function() {
    return gulp.src(['./node_modules/font-awesome/css/*'])
            .pipe(gulp.dest('./dist/css'));
})

gulp.task('default', ['font-awesome-fonts', 'font-awesome-css', 'sass', 'html', 'connect', 'watch', 'scripts', 'image', 'fontgen']);
