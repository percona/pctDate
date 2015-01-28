 describe('pctDate.utils.pctDateFilter.pctDate module', function() {
    'use strict';

    var pctDate, moment;
    var d = new Date();
    var timeZone1 = 'Europe/Rome';
    var timeZone2 = 'America/Los_Angeles';
    var format1 = 'dddd, MMMM Do YYYY, h:mm:ss a';
    var format2 = '';
    // Include the main module
    beforeEach(module('pctDate.utils.pctDateFilter'));

    // Get a reference of the service to test
    beforeEach(inject(function($injector) {
        moment = $injector.get('moment');
        pctDate = $injector.get('pctDateFilter');
    }));


    it('should return a valid date formatted string', function() {
        expect(pctDate(d, timeZone1, format1)).toBe(moment(d).tz(timeZone1).format(format1));
        expect(pctDate(d, timeZone2, format1)).toBe(moment(d).tz(timeZone2).format(format1));
    });

    it('should return a valid date formatted string when the format is empty', function() {
        expect(pctDate(d, timeZone1, format2)).toBe(moment(d).tz(timeZone1).format(format2));
    });

    it('should return a "From" String when the format parameter is a Date', function() {
        // Random date that points to September 2014
        var fromDate = new Date(1412052562440);
        expect(pctDate(d, timeZone1, fromDate)).toBe(moment(d).tz(timeZone1).from(fromDate));
    });

    it('should return a "FromNow" String when the format parameter is the current Date', function() {
        expect(pctDate(d, timeZone1, d)).toBe(moment(d).tz(timeZone1).fromNow());
    });

    describe('invalid parameteres', function() {
        it('should throw an error when "timeZone" is not specified', function() {
            expect(function() { pctDate(d) }).toThrow();
        });
    });

});
