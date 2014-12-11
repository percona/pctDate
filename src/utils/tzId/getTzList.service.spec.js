describe('pctDate.utils.tzId.getTzList module', function() {
    'use strict';

    var getTzList;
    beforeEach(module('pctDate.utils.tzId.getTzList'));


    beforeEach(module(function($provide) {

        $provide.value('moment', {
            tz: {
                names: function() {
                    return [
                        'America/Los_Angeles',
                        'America/Argentina/Buenos_Aires',
                        'Europe/Rome'
                    ];
                }
            }
        });

    }));



    beforeEach(inject(function(_getTzList_) {
        getTzList = _getTzList_;
    }));


    it('should return a region list', function() {

        var regionList = getTzList().regionList ;

        expect(regionList.length).toBe(2);
        expect(regionList[1]).toBe('Europe');
    });

    it('should return a parsed Tz List', function() {

        var tzList = getTzList().tzList;


        expect(tzList.length).toBe(3);
        expect(tzList[1].region).toBe('America');
        expect(tzList[1].subregion).toBe('Argentina/Buenos_Aires');
    });
});
