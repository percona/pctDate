(function() {
    'use strict';

    angular.module('pctDate.utils.pctDateFilter', [
        'pctDate.config',
        'pctMoment'
    ])
        .filter('pctDate', pctDateFilterDef);

    pctDateFilterDef.$inject = ['moment', 'pctDateConfig'];

    /**
     * @name pctDate
     * @description
     * Useful filter to render dates with a determined format and time zone.
     * If the format parameter is a Date then it will return a "From" string,
     * i.e "A few seconds ago"
     *
     * Time Zone parameter should be always present.
     * The reasons behind the Time Zone being a parameter and not
     * a state of the filter are the following:
     * - Making this filter stateless will provide performance
     *      improvements when using Angular 1.3+
     * - Time Zone can change dynamically so this filter abstracts
     *      from that and provides maximum flexibility
     *
     * @example
     * {{ date | pctDate:timeZone:format }} //=> A formated Date String
     *
     *
     * @param {Date} date - Javascript Native Date Object, the input date.
     * @param {string} timeZone - A valid IANA Time Zone Id, for example "Europe/Rome"
     * @param {string|Date} format - A valid moment.js format string
     *      http://momentjs.com/docs/#/displaying/format or a Javascript Native Date Object.
     *       - If it is a Moment's format string then this filter will just format the date input
     *          with the correct time zone.
     *       - If the parameter is a Date Object then this filter will switch it's functionality
     *          to the Moment's `from()` API http://momentjs.com/docs/#/displaying/from/
     *          Use a `new Date()` object to achieve the same as Moment's  `fromNow()` API
     *
     * @returns {string} A formatted String that displays a date
     *
     */
    function pctDateFilterDef(moment, pctDateConfig) {
        return function pctDateFilter(date, format) {
            var fromDate;

            return moment(date).tz(pctDateConfig.timeZone).format(format);
        }
    }
})();
