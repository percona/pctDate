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
        expect(pctDate(d, timeZone1, format1)).toBe(moment.tz(timeZone1).format(format1));
        expect(pctDate(d, timeZone2, format1)).toBe(moment.tz(timeZone2).format(format1));
    });

    it('should return a valid date formatted string when the format is empty', function() {
        expect(pctDate(d, timeZone1, format2)).toBe(moment.tz(timeZone1).format(format2));
    });

    describe('invalid parameteres', function() {
        it('should throw an error when "timeZone" is not specified', function() {
            expect(function() { pctDate(d) }).toThrow();
        });

    });

});
