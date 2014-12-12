(function() {

    /*
     * @ngdoc module
     * @name pctDate.utils.tzId
     *
     *
     * @description
     * This module contains a couple of useful
     * services to interact with Time Zone Ids,
     * for example "Europe/Rome" and with lists
     * of Time Zone ids
     *
     *
     */
    angular.module('pctDate.utils.tzId', [
            'pctDate.utils.tzId.parseTzId',
            'pctDate.utils.tzId.parseTzIdList',
            'pctDate.utils.tzId.removeTzIdSpecialCases',
            'pctDate.utils.tzId.filterTzByRegion',
            'pctDate.utils.tzId.getTzList'
        ]);


}) ();
