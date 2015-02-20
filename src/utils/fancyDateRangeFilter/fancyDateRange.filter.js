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
     * The Fancy Date Range timerange has the following formats:
     * - Same day:   April 16 2014, 20:42 to 21:42
     * - Same month: Oct 2014, Sat 4 16:08 - Mon 6 15:07
     * - Same year:  March 16, 21:43 to April 16, 21:43 (2014)
     * - nothing is the same: December 3 2012, 13:44 to April 16 2014, 21:44
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
    function fancyDateRangeFilter(moment) {
        return function (start, end) {

            var sameYear = (start.getFullYear() === end.getFullYear());
            var sameMonth = (start.getMonth() === end.getMonth());
            var sameDay = (start.getDate() === end.getDate());

            //Moment.js wrappers for the start and end dates
            var mStart = moment(start);
            var mEnd = moment(end);

            // different time
            // ie: April 16 2014, 20:42 to 21:42
            if ( sameYear && sameMonth && sameDay) {
                return mStart.format('MMM D YYYY, HH:mm') +
                        ' to ' + mEnd.format('HH:mm');
            }

            // different day and time
            // ie: Oct 2014, Sat 4 16:08 - Mon 6 15:07 (PCT-981)
            if ( sameYear && sameMonth && !sameDay) {
                return mStart.format('MMM YYYY') +
                        ', ' + mStart.format('ddd D HH:mm') +
                        ' - ' + mEnd.format('ddd D HH:mm');
            }

            // only same year
            // ie: March 16, 21:43 to April 16, 21:43 (2014)
            if (sameYear && !sameMonth && !sameDay) {
                return mStart.format('MMM D, HH:mm') +
                        ' to ' + mEnd.format('MMM D, HH:mm (YYYY)');
            }

            // default
            // Everything different
            // ie: December 3 2012, 13:44 to April 16 2014, 21:44
            return mStart.format('MMM D YYYY, HH:mm') +
                        ' to ' + mEnd.format('MMM D YYYY, HH:mm');
        };
    }
}) ();
