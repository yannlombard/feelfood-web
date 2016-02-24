'use strict';

var gulp = require('gulp');
var glob = require('glob');
var gulpicon = require('gulpicon/tasks/gulpicon');

var config = require('./config.js');
config.dest = 'src/assets/';

module.exports = function(options) {
    gulp.task('gulpicon', function() {

        // grab the file paths
        var files = glob.sync(options.src + '/assets/svg/*.svg');

        console.log('files', files);

        console.log('config', config);

        gulpicon(files, config);

        // set up the gulp task
        //gulp.task("icons", gulpicon(files, config));

    });
};
