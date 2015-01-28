(function() {
    'use strict';

    angular.module('pctDate.utils.pctDateFilter', [
        'pctMoment'
    ])
        .filter('pctDate', pctDateFilterDef);

    pctDateFilterDef.$inject = ['moment'];

    /**
     * @name pctDate
     * @description
     * Useful filter to render dates with a determined format and time zone.
     * Time Zone parameter should be always present.
     * The reasons behind the Time Zone parameter being a parameter and not
     * a state of the filter are the following:
     * - Making this filter stateless will provide performance improvements when using Angular 1.3+
     * - Time Zone can change dynamically so this filter abstracts from that and provides maximum flexibility
     *
     * @example
     * {{ aDate | pctDate:format:timeZone}}
     *
     * @param {Date} date - Javascript Native Date Object, the date to be converted
     * @param {string} timeZone - A valid IANA Time Zone Id, for example "Europe/Rome"
     * @param {string} format - A valid moment.js format string http://momentjs.com/docs/#/displaying/format
     *
     * @returns {string} A formatted String that displays a date
     *
     */
    function pctDateFilterDef(moment) {
        return function pctDateFilter(date, timeZone, format) {
            if (!timeZone) {
                throw TypeError('pctDateFilter: timeZone parameter is required');
            }

            return moment(date).tz(timeZone).format(format);
        }
    }
})();
