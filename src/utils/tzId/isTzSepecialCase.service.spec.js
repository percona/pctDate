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


    it('should return true for all Etc/GMT* TimeZone Ids', function() {
        var result = isTzSpecialCase({
            region: 'Etc',
            subregion: 'GMT'
        });
        expect(result).toBe(true);

        var result = isTzSpecialCase({
            region: 'Etc',
            subregion: 'GMT-14'
        });
        expect(result).toBe(true);
    });


    // The correct one here is America/Argentina/Buenos_Aires that is why we dont
    // want to cover America/Buenos_Aires
    it('should return true for America/Buenos_Aires TimeZone Ids', function() {
        var result = isTzSpecialCase({
            region: 'America',
            subregion: 'Buenos Aires'
        });

        expect(result).toBe(true);
    });


    it('should return true for all US/* TimeZone Ids', function() {
        var result = isTzSpecialCase({
            region: 'US',
            subregion: 'Pacific'
        });
        expect(result).toBe(true);

        var result = isTzSpecialCase({
            region: 'US',
            subregion: 'Samoa'
        });
        expect(result).toBe(true);
    });

    it('should return true for all Canada/* TimeZone Ids', function() {
        var result = isTzSpecialCase({
            region: 'Canada',
            subregion: 'Central'
        });
        expect(result).toBe(true);

        var result = isTzSpecialCase({
            region: 'Canada',
            subregion: 'Yukon'
        });
        expect(result).toBe(true);
    });


});
