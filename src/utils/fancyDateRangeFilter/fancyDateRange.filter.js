(function() {
    'use strict';

    angular.module('pctDate.utils.fancyDateRangeFilter', [
        'pctMoment'
    ])
        .filter('fancyDateRange', fancyDateRangeFilter);

    fancyDateRangeFilter.$inject = ['moment'];

    /**
     * Returns a Fancy Formatted Date/Time Range.
     *
     * The Fancy Date Range timerange has the following formats according to
     * the relationship between start and end parameters:
     * - Different time:
     *      - April 16 2014, 20:42 to 21:42
     * - Different time and day:
     *      - Oct 2014, Sat 4 16:08 - Mon 6 15:07
     * - Same year only:
     *      - March 16, 21:43 to April 16, 21:43 (2014)
     * - Different everything:
     *      - December 3 2012, 13:44 to April 16 2014, 21:44
     *
     * Depending if start and end are in the same year, same month
     * and / or same day the return value: timerange will change according to the
     * the list above.
     *
     * @param {Date} start - Lower limit Javascript Native Date object
     * @param {Date} end   - Upper limit Javascript Native Date object
     *
     * @return {String}
     */
    function fancyDateRangeFilter(moment) {
        return function (start, end) {

            var sameYear = (start.getFullYear() === end.getFullYear());
            var sameMonth = (start.getMonth() === end.getMonth());
            var sameDay = (start.getDate() === end.getDate());

            //Moment.js wrappers for the start and end dates
            var mStart = moment(start);
            var mEnd = moment(end);

            // Same year, month and day
            // ie: April 16 2014, 20:42 to 21:42
            if ( sameYear && sameMonth && sameDay) {
                return mStart.format('MMM D YYYY, HH:mm') +
                        ' to ' + mEnd.format('HH:mm');
            }

            // Same year and month and different day
            // ie: Oct 2014, Sat 4 16:08 - Mon 6 15:07 (PCT-981)
            if ( sameYear && sameMonth && !sameDay) {
                return mStart.format('MMM YYYY') +
                        ', ' + mStart.format('ddd D HH:mm') +
                        ' - ' + mEnd.format('ddd D HH:mm');
            }

            // Same year, different month (day does not matter)
            // ie: March 16, 21:43 to April 16, 21:43 (2014)
            if (sameYear && !sameMonth) {
                return mStart.format('MMM D, HH:mm') +
                        ' to ' + mEnd.format('MMM D, HH:mm (YYYY)');
            }

            // default
            // Different year, (month and day does not matter)
            // ie: December 3 2012, 13:44 to April 16 2014, 21:44
            return mStart.format('MMM D YYYY, HH:mm') +
                        ' to ' + mEnd.format('MMM D YYYY, HH:mm');
        };
    }
}) ();
