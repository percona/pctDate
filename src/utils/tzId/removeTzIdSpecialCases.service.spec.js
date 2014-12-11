describe('pctDate.utils.tzId.removeTzIdSpecialCases module', function() {

    var removeTzIdSpecialCases;

    beforeEach(module('pctDate.utils.tzId.removeTzIdSpecialCases'));

    beforeEach(inject(function(_removeTzIdSpecialCases_) {
        removeTzIdSpecialCases = _removeTzIdSpecialCases_;
    }));


    describe('what type of special cases we want to handle and how', function() {
        var list = [
            'America/Los_Angeles',
            'Kongo',
            'America/Argentina/Buenos_Aires'
        ];




        it('should allow region/subregion Time Zone ID type', function() {
            var result = removeTzIdSpecialCases(list);
            expect(result.indexOf('America/Los_Angeles') !== -1).toBe(true);
        });

        it('should allow region/subregion/subregion Time Zone ID types', function() {
            var result = removeTzIdSpecialCases(list);
            expect(result.indexOf('America/Argentina/Buenos_Aires') !== -1).toBe(true);
        });



        it('should remove single word Time Zone Ids', function() {
            //they only make sense for historical reasons, no one
            //in modern time will select them

            var result = removeTzIdSpecialCases(list);
            expect(result.indexOf('kongo') !== -1).toBe(false);
        });
    });


});
