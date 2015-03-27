(function() {
    'use strict';

    angular.module('pctDate.utils.parseDateInTz', [
        'pctDate.config'
    ])
        .factory('parseDateInTz', parseDateInTzFactory);

    parseDateInTzFactory.$inject = ['pctDateConfig'];

    /**
     * @description
     * Takes a stringDate, a format and a time zone to create a date
     * representing that string relative to that time zone.
     *
     * Nice reference to parsing:
     * http://momentjs.com/docs/#/parsing
     *
     * @param {string} dateString - Any string representing a date, a date and a time, a time,
     *      etc. The only condition is that can be parse by moment with the correct format string.
     * @param {string} format - The moment js format string that represents the format that the dateString
     *      has, indicating where and how it exposes the years, days, months, hours, etc.
     *
     * @return {Date}
     */
    function parseDateInTzFactory(pctDateConfig) {
        return function parseDateinTz(dateString, format) {
            return moment.tz(dateString, format, pctDateConfig.timeZone).toDate();
        };
    }

}) ();
