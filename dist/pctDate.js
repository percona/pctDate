(function() {

    angular.module('pctDate.isDate', [])
        .factory('isDate', isDateService);


    /*
     * @ngdoc factory
     * @name isDate
     * @kind functions
     *
     * @description
     * Helper function that evaluates if its only @param
     * is a Native Js Valid Date Object.
     *
     * We use angular.isDate to assert that the input
     * is a Date object and we also use date.valueOf
     * to evaluate if it is a valid Date Object
     *
     *
     * @param {*} value
     * @returns {Boolean}
     *
     */
    function isDateService() {

        return function isDate(value) {
            return angular.isDate(value) && !isNaN(value.valueOf());
        }
    }
})();

(function() {
    'use strict';


    /*
     * @ngdoc module
     * @name pctDate
     *
     * @description
     * Date utility module for PCT!
     *
     * The intention behind this module is to provide
     * common date operations, integration with multi timezone
     * applications and separation of concerns while
     * trying to encourage native Date usage and native API's usage.
     *
     *
     */
    angular.module('pctDate', [
        'pctDate.toUnixTs',
        'pctDate.isDate'
    ]);

}) ();

(function() {
    'use strict';

    angular.module('pctDate.toUnixTs', ['pctDate.isDate'])
        .factory('toUnixTs', toUnixTsService);


    toUnixTsService.$inject = ['isDate'];


    /**
     *  @ngdoc factory
     *  @name toUnixTs
     *
     *  @description
     *  This function takes a Date object and returns
     *  its associated Unix Time Stamp value.
     *
     *  # Unix Time Stamp
     *  The Unix Time Stamp is the number of **seconds**
     *  since the Unix Epoch
     *
     *  For more info, visit [Wikipedia](https://en.wikipedia.org/wiki/Unix_time)
     *
     *  @param {Date} date
     *  @returns {Integer} unixTs
     *
     *
     *
     */
    function toUnixTsService(isDate) {

        return function toUnixTs(date) {

            if (!isDate(date)) {
                throw new TypeError('toUnixTs: date parameter should be a Native Date js object');
            }

            // Date casted as a number returns the number
            // of **miliseconds** from the Unix Epoch
            //
            // It is divided by 1000 to turn it into seconds
            // and then it's decimal numbers are truncated
            // with [Math.floor](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor)
            return Math.floor(date / 1000);
        };
    }


})();

(function() {
    'use strict';

    angular.module('pctDate.timezoneSelector.controller', [
        'pctDate.utils.tzId'
        ])
        .controller('_pctTimezoneSelectorDirectiveController', controller);



    controller.$inject = ['$scope', 'getTzList', 'filterTzByRegion']


    function controller($scope, getTzList, filterTzByRegion) {

        this.selectedRegion = 'America';

        this.tzRegionList = getTzList().regionList;

        var tzList = getTzList().tzList;

        this.getTzListForRegion = filterTzByRegion(tzList);


        //explain why ngModel in the tpl is used with the scope instead of the ctrl

    }

}) ();

(function() {

    angular.module('pctDate.timezoneSelector.directive', [
        //Auto generated template module for testing and distribution purporses
        'pctDate.templates',
        'pctDate.timezoneSelector.controller'
        ])
        .directive('pctTimezoneSelector', directiveDef);


    function directiveDef() {




        function link(scope, element, attrs, ngModelCtrl) {

        }

        return {
            restrict: 'E',
            require: 'ngModel',
            controller: '_pctTimezoneSelectorDirectiveController',
            controllerAs: 'ctrl',
            templateUrl: 'src/timezoneSelector/timezoneSelector.tpl.html',
            link: link,

            //TODO: explain why we use two way data binding for ngModel (=) and text binding
            //for class (@)
            //https://umur.io/angularjs-directives-using-isolated-scope-with-attributes/
            scope: {
                ngModel: '=ngModel',
                clazz: '@class'
            }

        }
    }



}) ();

(function() {

    angular.module('pctDate.timezoneSelector', [
            'pctDate.timezoneSelector.directive'
        ]);

}) ();

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

(function() {


    angular.module('pctDate.utils.tzId.getTzList', [
            'pctMoment',
            'pctDate.utils.tzId.parseTzIdList',
            'pctDate.utils.tzId.removeTzIdSpecialCases'
        ])
        .factory('getTzList', factory);


    factory.$inject = ['moment', 'parseTzIdList', 'removeTzIdSpecialCases'];

    //TODO: check that moment timezone is loaded
    function factory(moment, parseTzIdList, removeTzIdSpecialCases) {
        //http://momentjs.com/timezone/docs/#/data-loading/getting-zone-names/
        var tzListRaw = moment.tz.names();

        var aux = parseTzIdList(removeTzIdSpecialCases(tzListRaw));
        var tzRegionList = aux[0];
        var tzList = aux[1]

        return function getTzList() {

            return {
                regionList: aux[0],
                tzList: aux[1]
            }
        }
    }

})();

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

(function() {

    angular.module('pctDate.utils.tzId', [
            'pctDate.utils.tzId.parseTzId',
            'pctDate.utils.tzId.parseTzIdList',
            'pctDate.utils.tzId.removeTzIdSpecialCases',
            'pctDate.utils.tzId.filterTzByRegion',
            'pctDate.utils.tzId.getTzList'
        ]);


}) ();

angular.module("pctDate.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("src/timezoneSelector/timezoneSelector.tpl.html","<select ng-model=\"ctrl.selectedRegion\" ng-options=\"region for region in ctrl.tzRegionList\" class=\"{{clazz}}\">\n</select>\n\n\n<select ng-model=\"ngModel\" ng-options=\"tz.id as tz.subregion for tz in ctrl.getTzListForRegion(ctrl.selectedRegion) \" class=\"{{clazz}}\">\n</select>\n");}]);