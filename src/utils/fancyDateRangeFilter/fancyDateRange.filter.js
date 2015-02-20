(function() {
    'use strict';

    angular.module('pctDate.utils.fancyDateRangeFilter', [

    ])
        .filter('fancyDateRange', fancyDateRangeFilter);

    fancyDateRangeFilter.$inject = ['$filter'];

    /**
     * Returns a Fancy Formatted Date/Time Range.
     *
     * The Fancy Date Range timerange has the following formats:
     * - Same day:   April 16 2014, 20:42 to 21:42
     * - Same month: Oct 2014, Sat 4 16:08 - Mon 6 15:07
     * - Same year:  March 16, 21:43 to April 16, 21:43 (2014)
     *
     * Depending if start and end are in the same year, same month
     * and / or same day the return value: timerange will change according to the
     * the list above.
     *
     * @param {Date} start - Lower limit Date object
     * @param {Date} end   - Upper limit Date object
     *
     * @return {String} timerange - Fancy Date Range
     */
    function fancyDateRangeFilter($filter) {
        return function (start, end) {
            var same_month = false;
            var same_day = false;
            var same_year = false;
            var timerange = '';

            // check for same year
            var yearFrom = $filter('date')(start, 'yyyy');
            var yearTo = $filter('date')(end, 'yyyy');
            if (yearFrom === yearTo) {
                same_year = true;
            }

            // check for same month
            var monthFrom = $filter('date')(start, 'MMM');
            var monthTo = $filter('date')(end, 'MMM');
            if (monthFrom === monthTo && same_year) {
                same_month = true;
            }

            // check for same day
            var dayFrom = $filter('date')(start, 'd');
            var dayTo = $filter('date')(end, 'd');
            if (dayFrom === dayTo && same_month) {
                same_day = true;
            }

            // custom date filters
            if (same_day) {
                // same day (only the time is different)
                // ie: April 16 2014, 20:42 to 21:42
                timerange += $filter('date')(start, 'MMM d yyyy, HH:mm') +
                ' to ' + $filter('date')(end, 'HH:mm');
            } else if (same_month) {
                // same month (day and time different)
                // Format changed to: Oct 2014, Sat 4 16:08 - Mon 6 15:07 (PCT-981)
                timerange += $filter('date')(start, 'MMM yyyy') +
                ', ' + $filter('date')(start, 'EEE d HH:mm') +
                ' - ' + $filter('date')(end, 'EEE d HH:mm');
            } else if (same_year) {
                // only same year
                // ie: March 16, 21:43 to April 16, 21:43 (2014)
                timerange += $filter('date')(start, 'MMM d, HH:mm') +
                ' to ' + $filter('date')(end, 'MMM d, HH:mm (yyyy)');
            } else {
                // other cases (everything is different, full ts info)
                // ie: December 3 2012, 13:44 to April 16 2014, 21:44
                timerange += $filter('date')(start, 'MMM d yyyy, HH:mm') +
                ' to ' + $filter('date')(end, 'MMM d yyyy, HH:mm');
            }
            return timerange;
        };
    }
}) ();
