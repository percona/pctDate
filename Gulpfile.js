var gulp = require('gulp');
var karma = require('karma').server;
var del = require('del');

//Load automatically all gulp plugins and access them
//as attributes of `$` variable
var $ = require('gulp-load-plugins')();


/*
 * Src and important locations
 */
var DIR = {
    src: 'src/**/!(*.spec).js',
    test: 'src/**/*.spec.js',
    templates: 'src/**/*.tpl.html',
    karma:{
        plain: 'karma.conf.plain.js',
        minified: 'karma.conf.minified.js'
    },
    otherVendor: [
        'other_vendor/jstimezonedetect/jstz.min.js'
    ],
    gulp: 'Gulpfile.js',

    dist: 'dist/'
};

//Other config parameters
var distName = 'pctDate';



/**
 *
 * Run karma tests over the plain raw source
 *
 */
gulp.task('test:plain', function(done) {
    karma.start({
        configFile: __dirname + '/' + DIR.karma.plain,
        singleRun: true
    }, done);
});



/**
 *
 * Run karma tests over the concatenated minified source
 *
 */
gulp.task('test:minified', ['dist'], function(done) {
    karma.start({
        configFile: __dirname + '/' + DIR.karma.minified,
        singleRun: true
    }, done);
});



/**
 *
 * Run jscs (Javascript Code Style checker)
 * over all the js files.
 *
 * Checkout .jscsrc for config parameters
 *
 */
gulp.task('jscs', function() {
    return gulp.src([
            DIR.src,
            DIR.test,
            DIR.gulp,
            DIR.karma.plain,
            DIR.karma.minified
        ])
        .pipe($.jscs());
});


/*
 *
 * Continuous Integration service default task
 *
 *
 */
gulp.task('continuous', [
        'test:plain',
        'test:minified',
        'jscs'
    ]);


var templateCacheOptions = {

                    root: 'src/',
                    module: 'pctDate.templates',
                    standalone: true
        };


gulp.task('templates', function() {
    return gulp.src(DIR.templates)
            .pipe($.angularTemplatecache('templates.js', templateCacheOptions))
            .pipe(gulp.dest(DIR.dist));
});


/*
 * Build pctMoment.js and pctMoment.min.js
 *
 * Respectively, these files are the concatenated
 * version of the lib and the minified version
 *
 *
 * In this task we are also processing html angular
 * templates into Angular's template Cache
 *
 */
gulp.task('dist', ['clean:dist'], function() {
    //Grab all the sources! Lib src, templates and otherVendors
    return gulp.src([].concat(DIR.src, DIR.templates, DIR.otherVendor))

        // Convert Angular html templates into Js strings in the $templateCache service
        .pipe($.if('*.tpl.html', $.angularTemplatecache(templateCacheOptions)))

        //Concat everything in a single file
        .pipe($.concat(distName + '.js'))

        // Move a copy of the single file into dist
        .pipe(gulp.dest(DIR.dist))

        // Minify
        .pipe($.uglify())

        // Rename
        .pipe($.rename(distName + '.min.js'))

        // Create a second minified copy of the original
        // concatenated file
        .pipe(gulp.dest(DIR.dist));
});




/*
 * Clean the dist directory (where the built files are located)
 */
gulp.task('clean:dist', function(cb) {
    del([DIR.dist + '*'], cb);
});


gulp.task('default', []);
