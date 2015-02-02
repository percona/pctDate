(function() {
    'use strict';

    angular.module('pctDate.utils.pctDateFromFilter', [
        'pctDate.config',
        'pctMoment'
    ])
        .filter('pctDateFrom', pctDateFromFilterDef);

    pctDateFromFilterDef.$inject = ['moment', 'pctDateConfig'];

    /**
     * @name pctDateFrom
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
     *
     *
     *        - If the parameter is a Date Object then this filter will switch it's functionality
     *          to the Moment's `from()` API http://momentjs.com/docs/#/displaying/from/
     *          Use a `new Date()` object to achieve the same as Moment's  `fromNow()` API
     *
     * @example
     * {{ date | pctDate:fromDate }} //=> Something like "A year ago"
     *
     *
     * @param {Date} date - Javascript Native Date Object, the input date.
     * @param {Date|null} fromDate - A Javascript Native Date Object.
     *
     * @returns {string} A formatted String that displays a date
     *
     */
    function pctDateFromFilterDef(moment, pctDateConfig) {
        return function pctDateFromFilter(date, fromDate) {

            // If fromDate is not null and it is not a Date object then throw!
            if (fromDate &&  toString.call(fromDate) !== '[object Date]') {
                throw 'pctDateFromFilter: format should be a Native Date object';
            }

            //If fromDate is null the return fromNow() (see Moment.js API)
            if (!fromDate) {
                return moment(date).tz(pctDateConfig.timeZone).fromNow();
            }

            return moment(date).tz(pctDateConfig.timeZone).from(fromDate);
        }
    }
})();
