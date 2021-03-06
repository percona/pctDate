describe('pctDate.utils.tzId.parseTzId module', function() {
    'use strict';

    var parseTzId;

    beforeEach(module('pctDate.utils.tzId.parseTzId'));

    beforeEach(inject(function(_parseTzId_) {
        parseTzId = _parseTzId_;
    }));



    it('should handle correctly region/subregion cases', function() {
        var id = 'America/Los_Angeles';
        var result = parseTzId(id);

        expect(result.id).toBe(id);
        expect(result.region).toBe('America'),
        expect(result.subregion).toBe('Los Angeles');
    });



    it('should handle correctly region/subregion/subsubregion cases', function() {
        var id = 'America/Argentina/Buenos_Aires';
        var result = parseTzId(id);

        expect(result.id).toBe(id);
        expect(result.region).toBe('America'),
        expect(result.subregion).toBe('Argentina / Buenos Aires');
    });


    it('should handle correctly region only special cases', function() {
        var id = 'Kongo';
        var result = parseTzId(id);

        expect(result.id).toBe(id);
        expect(result.region).toBe('Kongo'),
        expect(result.subregion).toBeFalsy();
    });

    it('should handle php & mysql default tz value and normalize it', function() {
        var id = '+00:00';
        var result = parseTzId(id);

        var expected = parseTzId('Etc/UTC');

        expect(result.id).toBe(expected.id);
        expect(result.region).toBe(expected.region),
        expect(result.subregion).toBe(expected.subregion);
    })
});
