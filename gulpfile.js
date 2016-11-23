var gulp = require('gulp'),
    del = require('del'),
    runSequence = require('run-sequence'),
    sass = require('gulp-sass'),
    ts = require('gulp-typescript'),
    typescript = require('typescript'),
    fileInclude = require('gulp-file-include');

var DEST = 'build/public/';

var SRC = 'src/'
var SCSS = SRC + 'stylesheets/';
var TS = SRC + 'js/';
var IMG = SRC + 'img/';
var LOCALES = SRC + 'locale/**/*.json';

var JS_ASSETS = ['node_modules/obs-websocket-js/dist/obs-websocket.js', SRC + 'assets/js/**/*.js'];


/* Clean destination directory */
gulp.task('clean', function() {
  return del([DEST + '*']);
});



/* Static File Copy */
gulp.task('statics', function() {
  return gulp.src([IMG + "**/*.*", LOCALES], { base: SRC })
    .pipe(gulp.dest(DEST));
});



/* node_modules assets */
gulp.task('assets', function() {
  return gulp.src(JS_ASSETS)
    .pipe(gulp.dest(DEST + '/assets/js/'));
});



/* HTML with gulp-file-include */
gulp.task('html', function() {
  gulp.src(SRC + '*.html')
    .pipe(fileInclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(gulp.dest(DEST));
});



/* SCSS Compilation */
gulp.task('sass', function() {
  return gulp.src(SCSS + '*.scss')
    .pipe(sass({ style: 'expanded' }))
    .pipe(gulp.dest(DEST + 'css/'));
});



/* Typescript Compilation */
gulp.task('typescript', function() {
  var tsProject = ts.createProject('tsconfig.json', {
    typescript: typescript
  });

  var tsReturn = gulp.src([TS + '**/*.ts', 'typings/**/*.d.ts'])
    .pipe(tsProject());

  return tsReturn
    // .pipe(gulp.dest(DEST + 'js/'));
    // There's some inconsistency using tsconfig.json,
    // so setting the full path there seems to be the most reasonable solution.
    .pipe(gulp.dest('.'));
});



gulp.task('watch', function() {
  gulp.watch(SCSS + '**/*.scss', ['sass']);
  gulp.watch(TS + '**/*.ts', ['typescript']);
  gulp.watch(SRC + '**/*.html', ['html']);
});


gulp.task('default', function() {
  runSequence('clean', 'statics', 'assets', 'html', 'sass', 'typescript');
});
