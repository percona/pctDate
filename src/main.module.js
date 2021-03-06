(function() {
    'use strict';


    /*
     * @ngdoc module
     * @name pctDate
     *
     * @description
     * Date utility module for PCT!
     *
     * The intention behind this module is to provide
     * common date operations, integration with multi timezone
     * applications and separation of concerns while
     * trying to encourage native Date usage and native API's usage.
     *
     *
     */
    angular.module('pctDate', [
        'pctDate.config',
        'pctDate.toUnixTs',
        'pctDate.isDate',
        'pctDate.timezoneSelector',
        'pctDate.utils.jsTzDetect',
        'pctDate.utils.pctDateFilter',
        'pctDate.utils.pctDateFromFilter',
        'pctDate.utils.fancyDateRange',
        'pctDate.utils.parseDateInTz'
    ]);

}) ();
