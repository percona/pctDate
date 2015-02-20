describe('pctDate.utils.fancyDateRangeFilter module', function () {
    'use strict';

    var filter;

    beforeEach(module('pctDate.utils.fancyDateRangeFilter'));

    beforeEach(inject(function($injector){
        filter = $injector.get('fancyDateRangeFilter');
    }));


    it('should show the correct fancy range for several days from different months', function () {
        var start = new Date(2014, 7, 27, 18, 26, 13);
        var end   = new Date(2014, 8, 2, 11, 20 , 7);
        var fancy = filter(start, end);


        expect(fancy).toBe('Aug 27, 18:26 to Sep 2, 11:20 (2014)');
    });

    it('should show the correct fancy range for the same day', function () {
        var start = new Date(2014, 7, 31, 0, 24, 31);
        var end   = new Date(2014, 7, 31, 8, 54, 41);
        var fancy = filter(start, end);

        expect(fancy).toBe('Aug 31 2014, 00:24 to 08:54');
    });

    it('should show the correct fancy range for several days from the same month', function () {
        var start = new Date(2014, 1, 13, 16, 24, 10);
        var end   = new Date(2014, 1, 24, 16, 10, 21);
        var fancy = filter(start, end);

        expect(fancy).toBe('Feb 2014, Thu 13 16:24 - Mon 24 16:10');
    });
});
