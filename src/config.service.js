(function() {
    'use strict';


    angular.module('pctDate.config', [
        'pctMoment'
    ])
        .factory('pctDateConfig', pctDateConfigFactory);


    pctDateConfigFactory.$inject = ['moment'];

    /**
     * @description
     * Global configuration for pctDate utils
     *
     * For now the only available configuration is timeZone.
     * This config object has been created with special getters and setters
     * to enable shared global state.
     * Also, on set, the config object will validate that the newTimezone is
     * a valid one, if not, throwing an exception.
     *
     * @example
     * //Set
     * pctDateConfig.timeZone = 'Europe/Rome'
     * //Get
     * pctDateConfig.timeZone // => 'Europe/Rome'
     *
     *
     * @returns {Object}
     *
     *
     */
    function pctDateConfigFactory(moment) {

        var _timeZone = 'Etc/UTC';


        var config = {
            get timeZone() {
                return _timeZone;
            },

            set timeZone(newTz) {

                if (!moment.tz.zone(newTz)) {
                    throw 'pctDateConfig: ' + newTz + ' is not a valid Time Zone ID'
                }
                _timeZone = newTz;
            }
        };

        return config;
    }
})();
