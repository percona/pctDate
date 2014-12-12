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



    /**
     * @ngdoc controller
     * @name _pctTimezoneSelectorDirectiveController
     * **note** about the name: The underscore and the
     * weird long and too detaily name are deliberated.
     * First of all this is a private controller and should
     * not be used alone.
     * It main purpose is to server pctTimezoneSelector directive.
     * And so that's why we don't want to pollute the global
     * Angular name space, and this our way to try not to.
     *
     *
     * @description
     * This controller concentrates little to none logic for
     * the pctTimezoneSelector directive
     *
     *
     *
     * **Note** about controllerAs and Scope.
     * We are using as much as we can the controllerAs syntax for
     * every View-Model attributes (check out the this.attrs in the controllers
     * body). But, since we need to support Angular 1.2.*, then we need
     * to bind ngModel the isolated Scope of the directive to achieve
     * two way data binding.
     *
     */
    function controller($scope, getTzList, filterTzByRegion) {

        this.selectedRegion = 'America';

        this.tzRegionList = getTzList().regionList;

        var tzList = getTzList().tzList;

        this.getTzListForRegion = filterTzByRegion(tzList);
    }

}) ();

(function() {

    angular.module('pctDate.timezoneSelector.directive', [
        //Auto generated template module for testing and distribution purposes
        'pctDate.templates',
        'pctDate.timezoneSelector.controller'
        ])
        .directive('pctTimezoneSelector', directiveDef);


    /**
     * @ngdoc directive
     * @name pctTimezoneSelector
     * @description
     * Reusable component-like directive to select Time Zones.
     * It is well suited for angular forms.
     *
     * Attribute / parameters
     * - ngModel: the angular model to use. It will be two way data bind.
     * - class: The directive is smart enough to apply the same classes applied to the
     *     custom element to the inner select elements. Feel free to use any bootstrap
     *     or any other framework or custom css classes.
     *
     *
     */
    function directiveDef() {


        return {
            restrict: 'E',
            require: 'ngModel',
            controller: '_pctTimezoneSelectorDirectiveController',
            controllerAs: 'ctrl',
            templateUrl: 'src/timezoneSelector/timezoneSelector.tpl.html',

            // Here we are binding in two different ways the directive attributes:
            //
            // - ngModel is bind with `=` because we need it to two way data bind.
            // - class is bind with `@` because we are only interested in the text, which
            //      represents the css classes applied to the elements.
            //
            // For more information check the angular official doc or this nice
            // post about it
            // https://umur.io/angularjs-directives-using-isolated-scope-with-attributes/
            scope: {
                ngModel: '=ngModel',
                clazz: '@class'
            }

        }
    }



}) ();

(function() {

    /**
     * @ngdoc module
     * @name pctDate.timezoneSelector
     * @description
     * Module for the timezone Selector directive
     *
     */
    angular.module('pctDate.timezoneSelector', [
            'pctDate.timezoneSelector.directive'
        ]);

}) ();

(function() {
    'use strict';


    angular.module('pctDate.utils.tzId.filterTzByRegion', [])
        .factory('filterTzByRegion', factory);


    /**
     *
     * @ngdoc service
     * @name filterTzByRegionFactory
     * @description
     * Factory function that returns a utility method that filters
     * a given Time Zone Parsed list (see parseTzIdList)
     * by a given Region.
     *
     * This method is mostly used for displaying the two select
     * directive that correspond to the Time Zone selector.
     *
     *
     * @param {Array} tzList: Array of Parsed Time Zone Ids
     * @returns {Function}
     *
     *
     *
     */
    function factory() {


        return function filterTzByRegionFactory(tzList) {

            if (!angular.isArray(tzList)) {
                throw new TypeError('pctDate.filterTzByRegion expects 1 argument type Array');
            }


            /**
             *
             * @name filterTzByRegion
             * @description
             * Filter the tzList inside the closure by the selectedRegion parameter
             *
             * @param {String} selectedRegion
             * @returns {Array}: subset of tzList, filtered by the selectedRegion param
             *
             */
            return function filterTzByRegion(selectedRegion) {
                return tzList.filter(function(element) {
                    return element.region === selectedRegion
                });

            };
        }



    }


})();

(function() {
    'use strict';


    angular.module('pctDate.utils.tzId.getTzList', [
            'pctMoment',
            'pctDate.utils.tzId.parseTzIdList',
            'pctDate.utils.tzId.removeTzIdSpecialCases'
        ])
        .factory('getTzList', factory);


    factory.$inject = ['moment', 'parseTzIdList', 'removeTzIdSpecialCases'];

    /**
     *
     * @ngdoc service
     * @name getTzList
     *
     * @returns {Object}
     *
     * @description
     * The main purpose of this function is to read all the Time Zones
     * loaded inside Moment-timezone.js, filter special cases and
     * create and return a data structure.
     *
     * This function will return an object containing two attributes
     * - regionList: contains a set of regions (none repeated).
     * - tzList: a list of Time Zones data structures (id, region and subregion fields)
     *
     *
     * It's handy to know that Time Zone Ids have the form of:
     * "Region/SubRegion"
     *
     * for example:
     * "Europe/Rome"
     *
     * @requires pctMoment
     *
     */
    function factory(moment, parseTzIdList, removeTzIdSpecialCases) {
        //TODO: check that moment timezone is loaded



        //For more information about what this method returns check out
        //its API doc: http://momentjs.com/timezone/docs/#/data-loading/getting-zone-names/
        var tzListRaw = moment.tz.names();

        var aux = parseTzIdList(removeTzIdSpecialCases(tzListRaw));
        var tzRegionList = aux[0];
        var tzList = aux[1];

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

(function() {
    'use strict';


    angular.module('pctDate.utils.tzId.removeTzIdSpecialCases', [])
        .factory('removeTzIdSpecialCases', factory);


    /**
     * @ngdoc service
     * @name removeTzIdSpecialCases
     * @description
     * This function takes a list of timezone id strings
     * (typically gotten from moment API) and filters out
     * the weird, historically only, time zone Ids.
     *
     * This function will exclude:
     *
     * - All TzIDs that don't have the form: "Region/SubRegion[/SubSubRegion]"
     *
     *
     * We might add more exclusion rules in the future.
     *
     *
     *
     *
     * @param {Array of String} tzListRaw (Array of String Time Zone ids)
     * @returns {Array of String} (Filtered Array of String Time Zone ids)
     *
     *
     */
    function factory() {

        return function removeTzIdSpecialCases(tzListRaw) {
            return tzListRaw.filter(function(el) {

                return /^[^\/]+\/.+/.test(el)
            });
        };

    };

})();

(function() {

    /*
     * @ngdoc module
     * @name pctDate.utils.tzId
     *
     *
     * @description
     * This module contains a couple of useful
     * services to interact with Time Zone Ids,
     * for example "Europe/Rome" and with lists
     * of Time Zone ids
     *
     *
     */
    angular.module('pctDate.utils.tzId', [
            'pctDate.utils.tzId.parseTzId',
            'pctDate.utils.tzId.parseTzIdList',
            'pctDate.utils.tzId.removeTzIdSpecialCases',
            'pctDate.utils.tzId.filterTzByRegion',
            'pctDate.utils.tzId.getTzList'
        ]);


}) ();

angular.module("pctDate.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("src/timezoneSelector/timezoneSelector.tpl.html","<select ng-model=\"ctrl.selectedRegion\" ng-options=\"region for region in ctrl.tzRegionList\" class=\"{{clazz}}\">\n</select>\n\n\n<select ng-model=\"ngModel\" ng-options=\"tz.id as tz.subregion for tz in ctrl.getTzListForRegion(ctrl.selectedRegion) \" class=\"{{clazz}}\">\n</select>\n");}]);