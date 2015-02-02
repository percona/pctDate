describe('pctDate.config.pctDateConfig module', function() {
    'use strict';

    var config;

    // Include the main module
    beforeEach(module('pctDate.config'));

    // Get a reference of the service to test
    beforeEach(inject(function($injector) {
        config = $injector.get('pctDateConfig');
    }));


    it('should return an object', function() {
        expect(config).toEqual(jasmine.any(Object));
    });


    it('should ', function() {
        expect(config).toEqual(jasmine.any(Object));
    });


    describe('timeZone attribute', function() {
        it('should set a default timeZone value', function() {
            expect(config.timeZone).toBe('Etc/UTC');
        });

        it('should enable to set and get the timeZone Value', function() {
            config.timeZone = 'Europe/Rome'
            expect(config.timeZone).toBe('Europe/Rome');
        });


        it('should throw an error when an setting invalid TimeZone', function() {
            expect(function() {config.timeZone = 'Not a Valid TZ'}).toThrow();
        });
    });
});
