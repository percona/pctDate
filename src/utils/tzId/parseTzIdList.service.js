(function() {
    'use strict';

    angular.module('pctDate.utils.tzId.parseTzIdList', [
            'pctDate.utils.tzId.parseTzId'
        ])
        .factory('parseTzIdList', factory);



    factory.$inject = ['parseTzId']




    /**
     *
     * @ngdoc service
     * @name parseTzIdList
     * @description
     * The objective of this function is to process an Array of
     * Time Zone Ids (typically extracted from Moment's API) and
     * return an array of Time Zone Ids data structures (see parseTzId service)
     * and to return an array of Time Zone Regions (without repeats).
     *
     * Inside this function we take a mix approach to accomplish
     * performance since we are processing an array of 500 elements roughly.
     *
     * We use a kind of hash unique search algorithm, thats why you will see
     * a `seen` object to remember which Regions are already being returned.
     *
     * This function uses a semi weird pattern which is return an array
     * of two rather independent data structures. This is done basically to
     * only traverse the Id array only once and thus increase performance.
     * Also, we have been reading a lot of ES6 material and this will be fantastic
     * with destructured assignment, [x, y] = [1,2];
     *
     *
     * @param {Array of String} tzListRaw (String Time Zone Id array)
     * @returns {Array}
     *
     * Details about the return value:
     *
     * - return_value[0]: its a Region Set (no duplicated values)
     * - return_value[1]: the parsed Time Zone Ids list
     *
     *
     *
     */
    function factory(parseTzId) {

        return function parseTzIdList(tzListRaw) {

            var tzList = [];
            var regionList = [];


            //To keep track of repeated Region values
            var seen = {};


            var len = tzListRaw.length;
            var i, aux;


            for (i = 0; i < len; i++) {

                var parsedTz = parseTzId(tzListRaw[i]);

                tzList.push(parsedTz)

                if (!seen.hasOwnProperty(parsedTz.region)) {

                    seen[parsedTz.region] = true;
                    regionList.push(parsedTz.region);
                }

            }


            return [regionList, tzList];
        }
    }

})();
