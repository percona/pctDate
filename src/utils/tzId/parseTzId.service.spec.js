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
});
