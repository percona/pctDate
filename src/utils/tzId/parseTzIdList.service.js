(function() {
    'use strict';

    angular.module('pctDate.utils.tzId.parseTzIdList', [
            'pctDate.utils.tzId.parseTzId'
        ])
        .factory('parseTzIdList', factory);



    factory.$inject = ['parseTzId']

    function factory(parseTzId) {

        return function parseTzIdList(tzListRaw) {

            var tzList = [];
            var regionList = [];
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
