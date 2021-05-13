const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const terser = require('gulp-terser');
const cleanCSS = require('gulp-clean-css');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const autoprefixer = require('gulp-autoprefixer');
const notify = require("gulp-notify");

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: 'src'
    },
    notify: false,
  })
});

gulp.task('scss', function () {
  return gulp.src('src/scss/**/*.scss')
    .pipe(sass({outputStyle: 'expanded'}).on("error", notify.onError()))
    .pipe(rename({suffix: '.min', prefix: ''}))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 10 versions']
    }))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.stream())
});

gulp.task('js', function () {
  return gulp.src('src/js-modules/index.js')
    //.pipe(terser())
    .pipe(gulp.dest('./'))
    .pipe(browserSync.reload({stream: true}));
});

gulp.task('imagemin', function () {
  return gulp.src('src/img/**/*')
    .pipe(cache(imagemin()))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('removedist', function () {
  return del(['dist'], {force: true})
});
gulp.task('clearcache', function () {
  return cache.clearAll();
});

gulp.task('buildFiles', function () {
  return gulp.src(['src/*.html']).pipe(gulp.dest('dist'))
});
gulp.task('buildCss', function () {
  return gulp.src(['src/css/main.min.css']).pipe(gulp.dest('dist/css'))
});
gulp.task('buildJs', function () {
  return gulp.src(['src/js/index.js']).pipe(gulp.dest('dist/js'))
});
//gulp.task('buildFonts', function() { return gulp.src(['src/fonts/**/*']).pipe(gulp.dest('dist/fonts')) });

gulp.task('build', gulp.series('removedist', 'imagemin', 'scss', 'js', 'buildFiles', 'buildCss', 'buildJs'));

gulp.task('code', function () {
  return gulp.src('src/**/*.html')
    .pipe(browserSync.reload({stream: true}))
});

gulp.task('watch', function () {
  gulp.watch('src/scss/**/*.scss', gulp.parallel('scss'));
  gulp.watch('src/js-modules/**/*.js', gulp.parallel('js'));
  gulp.watch('src/*.html', gulp.parallel('code'));
});

gulp.task('default', gulp.parallel('scss', 'js', 'browser-sync', 'watch'));
