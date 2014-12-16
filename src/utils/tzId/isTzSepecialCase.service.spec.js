describe('pctDate.utils.tzId.isTzSpecialCase module', function() {
    'use strict';


    var isTzSpecialCase;

    // Include the main module
    beforeEach(module('pctDate.utils.tzId.isTzSpecialCase'));

    // Get a reference of the service to test
    beforeEach(inject(function($injector) {

        isTzSpecialCase = $injector.get('isTzSpecialCase');
    }));



    it('should return true for all Time Zone Ids that have empty subregions', function() {
        var result = isTzSpecialCase({
            region: 'Kongo'
        });

        expect(result).toBe(true);
    });

    it('should return true for all Brazil/subregion TimeZone Ids', function() {
        var result = isTzSpecialCase({
            region: 'Brazil',
            subregion: 'SubRegion'
        });

        expect(result).toBe(true);
    });

    it('should return true for all Chile/subregion TimeZone Ids', function() {
        var result = isTzSpecialCase({
            region: 'Chile',
            subregion: 'SubRegion'
        });

        expect(result).toBe(true);
    });

    it('should return true for all Mexico/subregion TimeZone Ids', function() {
        var result = isTzSpecialCase({
            region: 'Brazil',
            subregion: 'SubRegion'
        });

        expect(result).toBe(true);
    });
});
