/*
 *
 * Karma conf for compiled and minified sources
 *
 */
var files = require('./config/karma.files.js');




module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],

        files: [].concat(

                files.libs,
                files.srcMinified,
                files.tests
            )
    });
};
