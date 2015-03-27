describe('pctDate.utils.parseDateInTz module', function() {
    'use strict';

    var parseDateInTz, moment, config;
    var date = '2015-03-27 16:55:13';
    var format = 'YYYY-MM-DD HH:mm:ss';
    var timeZone1 = 'Europe/Rome';
    var timeZone2 = 'America/Los_Angeles';

    // Include the main module
    beforeEach(module('pctDate.utils.parseDateInTz'));

    // Get a reference of the service to test
    beforeEach(inject(function($injector) {
        moment = $injector.get('moment');
        parseDateInTz = $injector.get('parseDateInTz');
        config = $injector.get('pctDateConfig');

        config.timeZone = timeZone1;
    }));


    it('should return a Date object', function() {
        expect(parseDateInTz(date, format)).toEqual(jasmine.any(Date));
    });

    it('should return a Date object parsed in the correct timezone', function() {
        expect(parseDateInTz(date, format).getTime())
            .toBe(moment.tz(date, format, timeZone1).valueOf());

        config.timeZone = timeZone2;
        expect(parseDateInTz(date, format).getTime())
            .toBe(moment.tz(date, format, timeZone2).valueOf());
    });
});
