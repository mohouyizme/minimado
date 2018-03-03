const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const uglify = require('gulp-uglify');
const rename = require('gulp-rename');
const browserSync = require('browser-sync');

gulp.task('serve', ['css', 'js'], () => {
  browserSync.init({
    server: './'
  });
  gulp.watch('css/main.scss', ['css']);
  gulp.watch('index.html').on('change', browserSync.reload);
  gulp.watch('js/main.js', ['js']);
  gulp.watch('js/main.min.js').on('change', browserSync.reload);
});

gulp.task('css', () => {
  gulp
    .src('css/main.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest('css'))
    .pipe(browserSync.stream());
});

gulp.task('js', () => {
  gulp
    .src('js/main.js')
    .pipe(uglify())
    .pipe(
      rename({
        suffix: '.min'
      })
    )
    .pipe(gulp.dest('js'));
});

gulp.task('default', ['serve']);
