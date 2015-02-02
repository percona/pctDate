(function() {
    'use strict';


    angular.module('pctDate.config', [
        'pctMoment'
    ])
        .factory('pctDateConfig', pctDateConfigFactory);


    pctDateConfigFactory.$inject = ['moment'];

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
