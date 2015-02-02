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
     * Useful filter to render dates with a determined format, using `format` Moment method.
     * This filter uses the pctDateConfig.timeZone value to compute properly time zone setted dates.
     *
     * - `format` Moment API: http://momentjs.com/docs/#/displaying/format
     *
     * **Note**
     * This filter is stateful because it depends on the pctDateConfig.timeZone value
     * (only applicable to Angular 1.3+), see API https://docs.angularjs.org/guide/filter
     *
     * @example
     * {{ date | pctDate:format }} //=> A formated Date String in the pctDateConfig.timeZone
     *
     *
     * @param {Date} date - Javascript Native Date Object, the input date.
     * @param {string} format - A valid moment.js format string
     *
     * @returns {string} A formatted String that displays a date
     *
     */
    function pctDateFilterDef(moment, pctDateConfig) {
        //Mark this filter as stateful (Angular 1.3+)
        pctDateFilter.$stateful = true;
        function pctDateFilter(date, format) {
            var fromDate;

            return moment(date).tz(pctDateConfig.timeZone).format(format);
        }
        return pctDateFilter;
    }
})();
