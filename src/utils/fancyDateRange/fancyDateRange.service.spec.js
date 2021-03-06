describe('pctDate.utils.fancyDateRange module', function() {
    'use strict';

    var service;

    beforeEach(module('pctDate.utils.fancyDateRange'));

    beforeEach(inject(function($injector) {
        service = $injector.get('fancyDateRange');

        var config = $injector.get('pctDateConfig');
        // This parameter is really important!
        // If you change it, it **will** break all the tests,
        // that is because all the expected strings are hardcoded
        // and cannot be created automatically
        config.timeZone = 'Etc/UTC';
    }));


    describe('when year, month and day are the same', function() {
        it('should show the correct fancy range', function() {
            // The dates are created in UTC to have a defined point from where
            // to do the tests
            var start = new Date(Date.UTC(2014, 7, 28, 0, 24, 31));
            var end   = new Date(Date.UTC(2014, 7, 28, 8, 54, 41));

            expect(service(start, end)).toBe('Aug 28 2014, 00:24 to 08:54');
        });
    });

    describe('when year and month are the same and the day is different', function() {
        it('should show the correct fancy range', function() {
            var start = new Date(Date.UTC(2014, 1, 13, 16, 24, 10));
            var end   = new Date(Date.UTC(2014, 1, 24, 16, 10, 21));

            expect(service(start, end)).toBe('Feb 2014, Thu 13 16:24 - Mon 24 16:10');
        });
    });

    describe('when year is the same and month is different', function() {
        it('should show the correct fancy range when days are different', function() {
            var start = new Date(Date.UTC(2014, 7, 27, 18, 26, 13));
            var end   = new Date(Date.UTC(2014, 8, 2, 11, 20, 7));

            expect(service(start, end)).toBe('Aug 27, 18:26 to Sep 2, 11:20 (2014)');
        });

        it('should show the correct fancy range when days are the same', function() {
            var start = new Date(Date.UTC(2014, 7, 2, 18, 26, 13));
            var end   = new Date(Date.UTC(2014, 8, 2, 11, 20, 7));

            expect(service(start, end)).toBe('Aug 2, 18:26 to Sep 2, 11:20 (2014)');
        });
    });

    describe('when year is different', function() {
        it('should show the correct fancy range when month are different', function() {
            var start = new Date(Date.UTC(2014, 7, 2, 18, 26, 13));
            var end   = new Date(Date.UTC(2015, 8, 2, 11, 20, 7));

            expect(service(start, end)).toBe('Aug 2 2014, 18:26 to Sep 2 2015, 11:20');
        });

        it('should show the correct fancy range when month are the same', function() {
            var start = new Date(Date.UTC(2014, 8, 2, 18, 26, 13));
            var end   = new Date(Date.UTC(2015, 8, 2, 11, 20, 7));

            expect(service(start, end)).toBe('Sep 2 2014, 18:26 to Sep 2 2015, 11:20');
        });
    });
});
