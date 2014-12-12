(function() {
    'use strict';

    angular.module('pctDate.utils.jsTzDetect', [])
        .factory('jsTzDetect', factory);


    factory.$inject = ['$window'];

    /**
     * @ngdoc service
     * @name jsTzDetect
     * @description
     *
     * Wrapper for jstimezonedetect library.
     * It's API is pretty slim and you can check it out here:
     * https://bitbucket.org/pellepim/jstimezonedetect
     *
     * @returns {Object} jstz reference
     *
     *
     */
    function factory($window) {
        //Since jstz will be concatenated with pctDate we dont need to check
        //if it has been loaded correctly
        return $window.jstz;
    }
})();
