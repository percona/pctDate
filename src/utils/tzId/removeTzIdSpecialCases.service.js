(function() {
    'use strict';


    angular.module('pctDate.utils.tzId.removeTzIdSpecialCases', [])
        .factory('removeTzIdSpecialCases', factory);


    function factory() {

        return function removeTzIdSpecialCases(tzListRaw) {
            return tzListRaw.filter(function(el) {

                return /^[^\/]+\/.+/.test(el)
            });
        };

    };

})();
