describe('pctDate.utils.pctDateFromFilter.pctDateFrom module', function() {
    'use strict';

    var pctDateFrom, moment, config;
    var d = new Date();
    // Random date that points to September 2014
    var fromDate = new Date(1412052562440);
    var timeZone1 = 'Europe/Rome';
    var timeZone2 = 'America/Los_Angeles';
    var format1 = 'dddd, MMMM Do YYYY, h:mm:ss a';
    var format2 = '';
    // Include the main module
    beforeEach(module('pctDate.utils.pctDateFromFilter'));

    // Get a reference of the service to test
    beforeEach(inject(function($injector) {
        moment = $injector.get('moment');
        pctDateFrom = $injector.get('pctDateFromFilter');
        config = $injector.get('pctDateConfig');


        config.timeZone = timeZone1;
    }));


    it('should return a "From" String', function() {
        expect(pctDateFrom(d, fromDate)).toBe(moment(d).tz(timeZone1).from(fromDate));
    });


    it('should return a "From" String when changing the Time Zone!', function() {
        expect(pctDateFrom(d, fromDate)).toBe(moment(d).tz(timeZone1).from(fromDate));

        config.timeZone = timeZone2;
        expect(pctDateFrom(d, fromDate)).toBe(moment(d).tz(timeZone2).from(fromDate));
    });

    it('should return a "FromNow" String when the fromNow parameter is null', function() {
        expect(pctDateFrom(d)).toBe(moment(d).tz(timeZone1).fromNow());
    });

    describe('invalid parameteres', function() {
        it('should throw an error when "fromDate" is not a Date object or null', function() {
            expect(function() { pctDateFrom(d, 'not a Date') }).toThrow();
        });
    });

});
