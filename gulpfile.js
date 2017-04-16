var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var watchify = require('watchify');
var babel = require('babelify');
var templateCompile = require('gulp-template-compile');
var concat = require('gulp-concat');
var debug = require('gulp-debug');
var minifyCss = require('gulp-clean-css');
var sass = require('gulp-sass');
var webserver = require('gulp-webserver');
var es = require('event-stream');

var TemplateFiles = './src/tpl/*.html';
var SassFiles = [
    './src/sass/common/*.sass',
    './src/sass/*.sass'
];
var CssFiles = [
  './node_modules/bootstrap/dist/css/bootstrap.css',
  './node_modules/bootstrap-modal-carousel/dist/css/bootstrap-modal-carousel.css',
  './node_modules/jointjs/dist/joint.css',
  './node_modules/toastr/build/toastr.css',
  './node_modules/TweenTime/dist/styles/editor.css',
  './src/css/darkstrap.css',
  './src/css/styles.css'
];

function compileJs(watch) {
  var bundler = watchify(
    browserify('./src/js/app.js', {
      debug: true,
      ignoreMissing: true,
      detectGlobals: false,
      builtins: []
    })
    .on('log', function (time) { console.log(time); })
  );

  function rebundle() {
    bundler.bundle()
      .on('error', function (err) { console.error(err); this.emit('end'); })
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./docs/dist/'));
  }

  if (watch) {
    bundler.on('update', function() {
      console.log('-> bundling...');
      rebundle();
    });
  }

  rebundle();
}

function compileTemplate() {
  gulp.src(TemplateFiles)
      .pipe(templateCompile())
      .pipe(concat('templates.js'))
      .pipe(gulp.dest('./docs/dist/'))
      .on('end', function () { console.log('template compiled'); });
}

function compileSass() {
  return es.concat(
      gulp.src(SassFiles)
      .pipe(sass.sync().on('error', sass.logError)),
      gulp.src(CssFiles)
    ).pipe(sourcemaps.init())
    .pipe(minifyCss())
    .pipe(concat('styles.css'))
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest('./docs/dist/'))
    .on('end', function () { console.log('css compiled'); });
}

gulp.task('build', ['sass', 'template'], function() { return compileJs(false); });
gulp.task('watchify', function() { return compileJs(true); });
gulp.task('watch', ['watchify', 'sass', 'template'], function() {
  gulp.watch(SassFiles, ['sass']);
  gulp.watch(TemplateFiles, ['template']);
});
gulp.task('template', function () { return compileTemplate(); });
gulp.task('sass',function() { return compileSass(); });
gulp.task('webserver', function() {
  gulp.src('docs')
    .pipe(webserver({
      host: '0.0.0.0',
      livereload: true
    }));
});

gulp.task('default', ['watch', 'webserver']);
