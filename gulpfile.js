var gulp        = require('gulp'),
    gutil       = require('gulp-util'),
    uglify      = require('gulp-uglify'),
    sourcemaps  = require('gulp-sourcemaps'),
    imagemin    = require('gulp-imagemin'),
    pngquant    = require('imagemin-pngquant'),
    concat      = require('gulp-concat'),
    sass        = require('gulp-sass'),
    cssnano     = require('gulp-cssnano'),
    csslint     = require('gulp-csslint'),
    jasmine     = require('gulp-jasmine'),
    jshint      = require('gulp-jshint'),
    child       = require('child_process'),
    browserSync = require('browser-sync').create(),
    del         = require('del'),
    rename      = require('gulp-rename'),
    neat        = require('node-neat').includePaths,
    bourbon     = require('node-bourbon').includePaths;

var   siteRoot  = '_site';

gulp.task('clean', function(){
  return del([siteRoot]);
});

gulp.task('sass', function(){
  return gulp.src('src/sass/**/*.**')
    .pipe(sourcemaps.init())
    .pipe(sass({
      includePaths: bourbon,
      includePaths: neat
    }).on('error', sass.logError))
    .pipe(cssnano())
    .pipe(rename({suffix:'.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(siteRoot + '/css'));
});

gulp.task('images', function(){
  return gulp.src('src/img/*')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [
        {removeViewBox: false},
        {cleanupIDs: false}
      ],
      use: [pngquant()]
    }))
    .pipe(gulp.dest(siteRoot + '/img'));
});

gulp.task('uglify', function(){
  return gulp.src('src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(siteRoot + '/js'));
});

gulp.task('jekyll-serve', function(){
  const jekyll = child.spawn('jekyll', [
    'build',
    '--watch',
    '--incremental',
    '--drafts']);
  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };
  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('jekyll-build', function(){
  const jekyll = child.spawn('jekyll', [
    'build',
    '--incremental',
    '--drafts']);
  const jekyllLogger = (buffer) => {
    buffer.toString()
      .split(/\n/)
      .forEach((message) => gutil.log('Jekyll: ' + message));
  };
  jekyll.stdout.on('data', jekyllLogger);
  jekyll.stderr.on('data', jekyllLogger);
});

gulp.task('serve', ['sass', 'jekyll-serve', 'uglify', 'images'], () => {
  browserSync.init({
    files: [siteRoot + '/**'],
    port: 4000,
    server: {
      baseDir: siteRoot
    }
  });
  gulp.watch('src/sass/**/*', ['sass']);
  gulp.watch('src/js/**/*', ['uglify']);
});

gulp.task('sass-test', function(){
  return gulp.src('src/sass/**/*.**')
    .pipe(csslint())
    .pipe(csslint.reporter());
});

gulp.task('jshint', function(){
  return gulp.src('src/js/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('default',['jekyll-build', 'sass', 'images', 'uglify']);
gulp.task('build',['jekyll-build', 'sass', 'images', 'uglify']);
gulp.task('minify',['sass', 'images', 'uglify']);
gulp.task('test', ['sass-test', 'jshint']);
