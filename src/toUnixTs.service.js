(function(angular) {
    'use strict';

    angular.module('pctDate.toUnixTs', [])
        .factory('toUnixTs', toUnixTsService);


    /**
     *  @ngdoc factory
     *  @name toUnixTs
     *
     *  @description
     *  This function takes a Date object and returns
     *  its associated Unix Time Stamp value.
     *
     *  # Unix Time Stamp
     *  The Unix Time Stamp is the number of **seconds**
     *  since the Unix Epoch
     *
     *  For more info, visit [Wikipedia](https://en.wikipedia.org/wiki/Unix_time)
     *
     *  @param {Date} date
     *  @returns {Integer} unixTs
     *
     *
     *
     */
    function toUnixTsService() {

        return function toUnixTs(date) {

            if (!angular.isDate(date) || isNaN(date.valueOf())) {
                throw new TypeError('toUnixTs: date parameter should be a Native Date js object');
            }

            // Date casted as a number returns the number
            // of **miliseconds** from the Unix Epoch
            //
            // It is divided by 1000 to turn it into seconds
            // and then it's decimal numbers are truncated
            // with [Math.floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
            return Math.floor(date / 1000);
        };
    }


})(angular);
