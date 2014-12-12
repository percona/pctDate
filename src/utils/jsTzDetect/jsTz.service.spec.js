describe('pctDate.utils.jsTzDetect module', function() {
    'use strict';


    var jsTz;

    beforeEach(module('pctDate.utils.jsTzDetect'));


    beforeEach(inject(function($injector) {
        jsTz = $injector.get('jsTzDetect');
    }));


    it('should provide access to jstz lib API', function() {

        expect(jsTz.determine).toEqual(jasmine.any(Function))

        var tz = jsTz.determine(); // Determines the time zone of the browser client
        expect(tz.name).toEqual(jasmine.any(Function))
    });



});
