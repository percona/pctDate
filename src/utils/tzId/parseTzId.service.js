(function() {
    'use strict';

    angular.module('pctDate.utils.tzId.parseTzId', [])
        .factory('parseTzId', factory);




    /**
     * @ngdoc service
     * @name parseTzId
     *
     * @description
     * Parse a given Time Zone Id and return an
     * object with semantic fields:
     * - id: Time Zone Id ("Region/SubRegion")
     * - region: region part of the ID
     * - subregion: subregion part of the ID
     *
     * The objective of this function is to
     * provide help when manipulating Time Zone Ids.
     *
     *
     * @param {String} tzId
     * @returns {Object}
     *
     */
    function factory() {
        //TODO: Check that tzId is a valid timezone Id
        var aux, subregion;

        return function(tzId) {
            aux = tzId.match(/(^[^\/]*)\/(.*)/);


            // Make the subregion be more human friendly
            // by replacing '_' with simple spaces
            // and '/' for ' / '.
            subregion = aux[2];
            subregion = subregion.replace('_', ' ')
                .replace('/', ' / ');


            return {

                id: tzId,
                region: aux[1],
                subregion: subregion
            };
        }
    }

})();
