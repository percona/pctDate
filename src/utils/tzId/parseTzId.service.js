(function() {
    'use strict';

    angular.module('pctDate.utils.tzId.parseTzId', [])
        .factory('parseTzId', factory);

    function factory() {
        var aux;

        return function(tzId) {
            aux = tzId.match(/(^[^\/]*)\/(.*)/);

            return {

                id: tzId,
                region: aux[1],
                subregion: aux[2]
            };
        }
    }

})();
