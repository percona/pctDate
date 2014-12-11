/*
 *
 *
 * Important Karma files
 *
 *
 *
 */
var files = {};


files.libs = [
    'bower_components/angular/angular.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/moment/moment.js',
    'bower_components/moment-timezone/builds/moment-timezone-with-data-2010-2020.js',
    'bower_components/pct-moment/dist/pctMoment.js'

];



files.tests = 'src/**/*.spec.js';


files.srcPlain = 'src/**/!(*.spec).js';


files.srcMinified = 'dist/*.min.js';



module.exports = files;
