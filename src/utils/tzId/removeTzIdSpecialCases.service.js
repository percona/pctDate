(function() {
    'use strict';


    angular.module('pctDate.utils.tzId.removeTzIdSpecialCases', [])
        .factory('removeTzIdSpecialCases', factory);


    /**
     * @ngdoc service
     * @name removeTzIdSpecialCases
     * @description
     * This function takes a list of timezone id strings
     * (typically gotten from moment API) and filters out
     * the weird, historically only, time zone Ids.
     *
     * This function will exclude:
     *
     * - All TzIDs that don't have the form: "Region/SubRegion[/SubSubRegion]"
     *
     *
     * We might add more exclusion rules in the future.
     *
     *
     *
     *
     * @param {Array of String} tzListRaw (Array of String Time Zone ids)
     * @returns {Array of String} (Filtered Array of String Time Zone ids)
     *
     *
     */
    function factory() {

        return function removeTzIdSpecialCases(tzListRaw) {
            return tzListRaw.filter(function(el) {

                return /^[^\/]+\/.+/.test(el)
            });
        };

    };

})();
