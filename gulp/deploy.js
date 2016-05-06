'use strict';

var gulp = require('gulp');
var keys = require('../keys.js');
var ftp = require('vinyl-ftp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function() {

  gulp.task('deploy', ['build'], function() {

    var conn = ftp.create(keys.ftp);

    var globs = ['./dist/**'];

    return gulp.src(globs, {base: './dist/', buffer: false})
      .pipe(conn.differentSize(keys.ftp.path))
      .pipe(conn.dest(keys.ftp.path));
  });

};
