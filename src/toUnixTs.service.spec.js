describe('pctDate.toUnixTs module: toUnixTs service', function() {
    'use strict';

    var toUnixTs;

    beforeEach(module('pctDate.toUnixTs'));


    beforeEach(inject(function(_toUnixTs_) {
        toUnixTs = _toUnixTs_;
    }));


    describe('when @param date is a valid Js Date object', function() {

        it('should return a valid Unix Time Stamp', function() {

            //get the number of miliseconds from Unix Epoch
            //for Dec 5, 2014 3:23:23 (UTC)
            var unixms = Date.UTC(2014, 11, 5, 3, 23, 23);
            var date = new Date(unixms);

            var result = toUnixTs(date);

            // |0 is a bitwise or, and the final outcome of this operation
            // is the same as Math.floor.
            // Since we already use Math.floor in toUnixTs implementation
            // we are trying other alternatives in the test
            var expected = unixms / 1000 | 0;

            //Assert everything belongs to the right type
            expect(angular.isDate(date)).toBe(true);
            expect(typeof result).toBe('number');



            //toUnixTs should return a Unix Time Stamp!
            expect(result).toEqual(expected);

            //testing the inverse path way for coherency
            expect((new Date(result * 1000)).valueOf()).toEqual(unixms);

        })
    });


    describe('when @param data is not a valid Js Date object', function() {

        it('should throw a TypeError exception', function() {

            var badDate = 'not a date';
            expect(function() {
                toUnixTs(badDate);
            }).toThrow();


            var badDate = new Date('not a date');
            expect(function() {
                toUnixTs(badDate);
            }).toThrow();
        });
    });
});
