/*
 * Karma conf for plain, not compiled sourcers
 *
 *
 */
var files = require('./config/karma.files.js');



module.exports = function(config) {
    config.set({
        browsers: ['PhantomJS'],
        frameworks: ['jasmine'],

        // coverage reporter generates the coverage
        reporters: ['progress', 'coverage', 'coveralls'],

        preprocessors: {
            // source files, that you wanna generate coverage for
            // do not include tests or libraries
            // (these files will be instrumented by Istanbul)
            'src/**/!(*.spec).js': ['coverage'],


            // Use karma plugin to deal with Angular templates
            'src/**/*.tpl.html': ['ng-html2js']
        },

        coverageReporter: {
            type: 'lcov', // lcov or lcovonly are required for generating lcov.info files
            dir: 'coverage/'
        },

        ngHtml2JsPreprocessor: {
            // setting this option will create only a single module that contains templates
            // from all the files, so you can load them all with module('foo')
            moduleName: 'pctDate.templates'
        },

        files: [].concat(

                files.libs,
                files.srcPlain,
                files.tests
            )

    });
};
