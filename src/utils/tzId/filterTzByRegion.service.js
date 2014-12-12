(function() {
    'use strict';


    angular.module('pctDate.utils.tzId.filterTzByRegion', [])
        .factory('filterTzByRegion', factory);


    /**
     *
     * @ngdoc service
     * @name filterTzByRegionFactory
     * @description
     * Factory function that returns a utility method that filters
     * a given Time Zone Parsed list (see parseTzIdList)
     * by a given Region.
     *
     * This method is mostly used for displaying the two select
     * directive that correspond to the Time Zone selector.
     *
     *
     * @param {Array} tzList: Array of Parsed Time Zone Ids
     * @returns {Function}
     *
     *
     *
     */
    function factory() {


        return function filterTzByRegionFactory(tzList) {

            if (!angular.isArray(tzList)) {
                throw new TypeError('pctDate.filterTzByRegion expects 1 argument type Array');
            }


            /**
             *
             * @name filterTzByRegion
             * @description
             * Filter the tzList inside the closure by the selectedRegion parameter
             *
             * @param {String} selectedRegion
             * @returns {Array}: subset of tzList, filtered by the selectedRegion param
             *
             */
            return function filterTzByRegion(selectedRegion) {
                return tzList.filter(function(element) {
                    return element.region === selectedRegion
                });

            };
        }



    }


})();
