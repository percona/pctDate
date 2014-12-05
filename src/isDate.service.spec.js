describe('pctDate.isDate module: isDate service', function() {
    'use strict';

    var isDate;

    beforeEach(module('pctDate.isDate'));


    beforeEach(inject(function(_isDate_) {
        isDate = _isDate_;
    }));

    it('should return true when @param value is a **valid** Date object', function() {

        var date = new Date();

        expect(isDate(date)).toBe(true);
    });


    it('should return false when @param value is an **invalid** Date object', function() {

        var invalidDate = new Date('not a date!');

        expect(isDate(invalidDate)).toBe(false);
    });


    it('should return false when @param value is an **invalid** Date object', function() {

        var notDate1 = 'not a date!';
        var notDate2 = 123;
        var notDate3 = {};

        expect(isDate(notDate1)).toBe(false);
        expect(isDate(notDate2)).toBe(false);
        expect(isDate(notDate3)).toBe(false);
    });
});
