describe('pctDate.utils.pctDateFilter.pctDate module', function() {
    'use strict';

    var pctDate, moment, config;
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
        config = $injector.get('pctDateConfig');



        config.timeZone = timeZone1;
    }));


    it('should return a valid date formatted string', function() {
        expect(pctDate(d, format1)).toBe(moment(d).tz(timeZone1).format(format1));
    });



    it('should return a valid date formatted string when changin the global config', function() {
        expect(pctDate(d, format1)).toBe(moment(d).tz(timeZone1).format(format1));

        config.timeZone = timeZone2;
        expect(pctDate(d, format1)).toBe(moment(d).tz(timeZone2).format(format1));
    });

    it('should return a valid date formatted string when the format is empty', function() {
        expect(pctDate(d, format2)).toBe(moment(d).tz(timeZone1).format(format2));
    });
});
