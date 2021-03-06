(function() {
    'use strict';

    angular.module('pctDate.utils.tzId.isTzSpecialCase', [])
        .factory('isTzSpecialCase', isTzSpecialCaseFactory);


    isTzSpecialCaseFactory.$inject = [];



    /**
     * @ngdoc service
     * @name isTzSpecialCase
     * @description
     * Simple helper function that evaluates parsedTz
     * data structure (see parseTzId service) and
     * returns true if they are considered special cases.
     *
     * The criteria behind special cases is mostly related
     * to special, historically only relevant, timezone ids.
     *
     * The following Time Zones will be considered as special cases:
     *
     * - 'Region' (empty subregion)
     * - 'Brazil/Subregion'
     * - 'Chile/Subregion'
     * - 'Mexico/Subregion'
     * - 'Etc/GMT*'
     * - 'America/Buenos_Aires' (the correct one is 'America/Argentina/Buenos_Aires')
     * - US/*
     * - Canada/*
     *
     * Where Region and Subregion could be any string representing them
     * such as Brazil, Chile, Mexico, America, Africa for Region and
     * Montevideo, Los Angeles, Rome, for subregion.
     *
     * @param {Object} parsedTz (see parseTzId service)
     * @returns {Boolean}
     *
     */
    function isTzSpecialCaseFactory() {

        return function isTzSpecialCase(parsedTz) {
            var region = parsedTz.region;
            var subregion = parsedTz.subregion;

            return !subregion ||
                region === 'Brazil' ||
                region === 'Chile' ||
                region === 'Mexico' ||
                region === 'US' ||
                region === 'Canada' ||
                /^Buenos Aires/.test(subregion) ||
                /^GMT/.test(subregion);
        }
    }

})();
