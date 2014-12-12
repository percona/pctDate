(function() {
    'use strict';


    angular.module('pctDate.utils.tzId.getTzList', [
            'pctMoment',
            'pctDate.utils.tzId.parseTzIdList',
            'pctDate.utils.tzId.removeTzIdSpecialCases'
        ])
        .factory('getTzList', factory);


    factory.$inject = ['moment', 'parseTzIdList', 'removeTzIdSpecialCases'];

    /**
     *
     * @ngdoc service
     * @name getTzList
     *
     * @returns {Object}
     *
     * @description
     * The main purpose of this function is to read all the Time Zones
     * loaded inside Moment-timezone.js, filter special cases and
     * create and return a data structure.
     *
     * This function will return an object containing two attributes
     * - regionList: contains a set of regions (none repeated).
     * - tzList: a list of Time Zones data structures (id, region and subregion fields)
     *
     *
     * It's handy to know that Time Zone Ids have the form of:
     * "Region/SubRegion"
     *
     * for example:
     * "Europe/Rome"
     *
     * @requires pctMoment
     *
     */
    function factory(moment, parseTzIdList, removeTzIdSpecialCases) {
        //TODO: check that moment timezone is loaded



        //For more information about what this method returns check out
        //its API doc: http://momentjs.com/timezone/docs/#/data-loading/getting-zone-names/
        var tzListRaw = moment.tz.names();

        var aux = parseTzIdList(removeTzIdSpecialCases(tzListRaw));
        var tzRegionList = aux[0];
        var tzList = aux[1];

        return function getTzList() {

            return {
                regionList: aux[0],
                tzList: aux[1]
            }
        }
    }

})();
