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
     * Useful filter to render From strings using `from` Moment method.
     * If the fromDate parameter is null then this filter will render `fromNow` Moment method.
     * This filter uses the pctDateConfig.timeZone value to properly shift formatted dates with a time zone.
     *
     * - `from` Moment API: http://momentjs.com/docs/#/displaying/from
     * - `fromNow` Moment API: http://momentjs.com/docs/#/displaying/fromNow
     *
     * **Note**
     * This filter is stateful because it depends on the pctDateConfig.timeZone value
     * (only applicable to Angular 1.3+), see API https://docs.angularjs.org/guide/filter
     *
     *
     * @example
     * {{ date | pctDate:fromDate }} //=> Something like "A year ago"
     *
     *
     * @param {Date} date - Javascript Native Date Object, the input date.
     * @param {Date|null} fromDate - A Javascript Native Date Object.
     *
     * @returns {string} A formatted From String
     *
     */
    function pctDateFromFilterDef(moment, pctDateConfig) {

        //Mark this filter as stateful (only for Angular 1.3)
        pctDateFromFilter.$stateful = true;

        function pctDateFromFilter(date, fromDate) {

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

        return pctDateFromFilter;
    }
})();
