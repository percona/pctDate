(function() {
    'use strict';


    angular.module('pctDate.utils.tzId.filterTzByRegion', [])
        .factory('filterTzByRegion', factory);


    function factory() {


        return function filterTzByRegionFactory(tzList) {

            if (!angular.isArray(tzList)) {
                throw new TypeError('pctDate.filterTzByRegion expects 1 argument type Array');
            }


            return function filterTzByRegion(selectedRegion) {
                return tzList.filter(function(element) {
                    return element.region === selectedRegion
                });

            };
        }



    }


})();
