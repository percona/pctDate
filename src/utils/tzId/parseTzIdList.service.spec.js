describe('pctDate.utils.tzId.parseTzIdList module', function() {
    'use strict';

    var parseTzIdList;

    beforeEach(module('pctDate.utils.tzId.parseTzIdList'));

    beforeEach(inject(function(_parseTzIdList_) {
        parseTzIdList = _parseTzIdList_;
    }));


    var list = [
            'America/Los_Angeles',
            'America/Argentina/Buenos_Aires',
            'Europe/Rome'
     ];


    //Note "set", that means that it is a list with no repeated values
    it('should return a set of regions extracted from the original list', function() {

        var res = parseTzIdList(list);
        var regionList = res[0];

        expect(regionList.length).toBe(2);
        expect(regionList.indexOf('America') !== -1).toBe(true);
        expect(regionList.indexOf('Europe') !== -1).toBe(true);

    });


    it('should return a a list of parsed Time Zone Ids', function() {

        var res = parseTzIdList(list);
        var parsedList = res[1];

        expect(parsedList.length).toBe(3);
        expect(parsedList[1].id).toBe('America/Argentina/Buenos_Aires');
        expect(parsedList[1].region).toBe('America');
        expect(parsedList[1].subregion).toBe('Argentina / Buenos Aires');

    });
});
