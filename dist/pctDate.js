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
        'pctDate.isDate',
        'pctDate.timezoneSelector',
        'pctDate.utils.jsTzDetect',
        'pctDate.utils.pctDateFilter'
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

    angular.module('pctDate.timezoneSelector.directive', [
        //Auto generated template module for testing and distribution purposes
        'pctDate.templates',
        'pctDate.utils.tzId',
        'pctDate.utils.jsTzDetect',
        'pctDate.utils.tzId.parseTzId'
        ])
        .directive('pctTimezoneSelector', directiveDef);

    directiveDef.$inject = ['getTzList', 'filterTzByRegion', 'jsTzDetect', 'parseTzId'];

    /**
     * @ngdoc directive
     * @name pctTimezoneSelector
     * @restrict E
     * @description
     * Reusable component-like directive to select Time Zones.
     * It is well suited for angular forms.
     * It is integrated with Time Zone auto detection.
     *
     * ## Arguments
     * @param {String Time Zone Id} ng-model:
     *      Assign the angular model to use. It will be two way data bound.
     *      You can use it as and output as an input, just like a regular angular input element
     * @param {String} class:
     *      The directive is smart enough to apply the same classes applied to the
     *      custom element to the inner select elements. Feel free to use any bootstrap
     *      or any other framework or custom css classes.
     * @param {Bool} autodetecttz:
     *      Instruct the directive if you want to attempt
     *      to auto guess the user's timezone or not. Useful for editing modes.
     *      The default is false.
     * @param {Bool} ng-required:
     *      mark if the time zone selector is a required field or not.
     * @param {String} name:
     *      Select input name
     *
     *
     * ## Example
     * ```html
     * <pct-timezone-selector
     *      ng-model="model.tz"
     *      autodetecttz="true"
     *      class="c1 c2"
     *      ng-required="true"
     *      name="timezone"
     * >
     * </pct-timezone-selector>
     * ```
     *
     * This directive works correctly with Native HTML Form implementations.
     *
     */
    function directiveDef(getTzList, filterTzByRegionFactory, jstz, parseTzId) {

        function link(scope, element, attrs, ngModelController) {
            // autodetecttz attribute logic
            var autodetectTzFlag =  attrs.autodetecttz === 'true' ? true : false;

            //Initialize where filtered Timezone list will be stored
            scope.tzList;
            //Initialize where the current selected Region will be stored
            scope.selectedRegion;

            // Props
            // =====
            // Here it is stored all the data that does not change over time
            // and it's provided at the start of the directive (the link function
            // is executed)
            scope.props = {
                //Initialize the List of Regions available
                tzRegionList: getTzList().regionList,
                //Autodetect the current user's timezone
                autoDetectedTz: parseTzId(jstz.determine().name())
            }


            // State
            // ====
            // All the data that changes over time, it is not derived from
            // any other piece of data and it's not a prop.
            //
            // For this simple directive the only piece of data is the
            // parsed Timezone object that represents the currently selected
            // time zone.
            scope.state = {
                selectedTz: {},

                /**
                 * @description
                 * This function concentrates all the logic that should
                 * be executed when, from whatever source, the currently
                 * selected Time zone is changed.
                 *
                 * It updates the state, the selected region and region list
                 * and updates the Directive's Model provided by the user.
                 *
                 * @param {Object} tz A parsed timezone object. (see parseTz.service.js)
                 *
                 */
                setSelectedTz: function(tz) {
                    // This prevents the directive from generating an error
                    // when the user clicks on the default option inside the select
                    if (!tz) {
                        return;
                    }
                    this.selectedTz = tz;
                    scope.setSelectedRegion(tz.region);
                    ngModelController.$setViewValue(tz.id, 'pctTimezoneSelector:user-select')
                }

            }

            //TODO: change filterTz... name
            var filterTzByRegion = filterTzByRegionFactory(getTzList().tzList);

            /**
             * @description
             * This deals with selectedRegion changes.
             * It updates the scope variable and the tzList with
             * the currently selectedRegion.
             *
             * @param {String} region The region string, as provided by a parsed Timezone
             *  object. (see parseTz.service.js)
             */
            scope.setSelectedRegion = function(region) {
                scope.selectedRegion = region;
                scope.tzList = filterTzByRegion(region)
            }


            /**
             * @description
             * Implement ngModel watch.
             * This enables the directive to respond correctly to
             * the ngModel changes originated from the outside of this directive
             * (by another controller for example).
             *
             * **Note1: **
             * We need to use a $watch over an ng-change directive
             * because the latter only responds to user input and we also
             * need to respond to changes by other components.
             *
             */
            scope.$watch(
                // Value to be watched
                function() {
                    return ngModelController.$modelValue
                },
                // Change handler
                function(tzId) {
                    // If the tzId is null then don't do anything
                    // Useful for the first time this function runs
                    if (!tzId) {
                        return;
                    }

                    scope.state.setSelectedTz(parseTzId(tzId))
                }
            );


            if (autodetectTzFlag) {
                //Use js timezone detect javascript library to auto detect the current
                //user's timezone.
                //Use that auto detected Time Zone as the default
                //(already selected) option in the time zone selection directive
                scope.state.setSelectedTz(scope.props.autoDetectedTz);
            }


        }

        return {
            restrict: 'E',
            require: 'ngModel',
            templateUrl: 'src/timezoneSelector/timezoneSelector.tpl.html',
            link: link,

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
                clazz: '@class',
                ngRequired: '@ngRequired',
                name: '@name'
            }
        };
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

    angular.module('pctDate.utils.pctDateFilter', [
        'pctMoment'
    ])
        .filter('pctDate', pctDateFilterDef);

    pctDateFilterDef.$inject = ['moment'];

    /**
     * @name pctDate
     * @description
     * Useful filter to render dates with a determined format and time zone.
     * If the format parameter is a Date then it will return a "From" string,
     * i.e "A few seconds ago"
     *
     * Time Zone parameter should be always present.
     * The reasons behind the Time Zone being a parameter and not
     * a state of the filter are the following:
     * - Making this filter stateless will provide performance
     *      improvements when using Angular 1.3+
     * - Time Zone can change dynamically so this filter abstracts
     *      from that and provides maximum flexibility
     *
     * @example
     * {{ date | pctDate:timeZone:format }} //=> A formated Date String
     * {{ date | pctDate:timeZone:fromNow }} //=> Something like "A year ago"
     *
     *
     * @param {Date} date - Javascript Native Date Object, the input date.
     * @param {string} timeZone - A valid IANA Time Zone Id, for example "Europe/Rome"
     * @param {string|Date} format - A valid moment.js format string
     *      http://momentjs.com/docs/#/displaying/format or a Javascript Native Date Object.
     *       - If it is a Moment's format string then this filter will just format the date input
     *          with the correct time zone.
     *       - If the parameter is a Date Object then this filter will switch it's functionality
     *          to the Moment's `from()` API http://momentjs.com/docs/#/displaying/from/
     *          Use a `new Date()` object to achieve the same as Moment's  `fromNow()` API
     *
     * @returns {string} A formatted String that displays a date
     *
     */
    function pctDateFilterDef(moment) {
        return function pctDateFilter(date, timeZone, format) {
            var fromDate;

            if (!timeZone) {
                throw TypeError('pctDateFilter: timeZone parameter is required');
            }

            // if format is date then this filter is being used
            // to express a moment's "from" String
            // i.e: "a year ago"
            if (toString.call(format) === '[object Date]') {
                fromDate = format;
                return moment(date).tz(timeZone).from(fromDate);
            }

            return moment(date).tz(timeZone).format(format);
        }
    }
})();

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
            'pctDate.utils.tzId.parseTzIdList'
        ])
        .factory('getTzList', factory);


    factory.$inject = [
        'moment',
        'isMomentTimezoneLoaded',
        'parseTzIdList'
    ];

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
    function factory(moment, isMomentTimezoneLoaded, parseTzIdList) {

        // Since this factory depends on moment-timezone, assert that it has been loaded
        // correctly
        if (!isMomentTimezoneLoaded()) {
            throw new ReferenceError('pctDate.getTzList: please include moment-timezone.js files');
        }

        //For more information about what this method returns check out
        //its API doc: http://momentjs.com/timezone/docs/#/data-loading/getting-zone-names/
        var tzListRaw = moment.tz.names();

        var aux = parseTzIdList(tzListRaw);
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
                /^Buenos Aires/.test(subregion) ||
                /^GMT/.test(subregion);
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
        var aux, subregion;

        return function(tzId) {

            // Cover the default mysql & php time zone value
            tzId = tzId === '+00:00' ? 'Etc/UTC' : tzId;

            aux = tzId.match(/(^[^\/]*)\/?(.*)/);


            subregion = aux[2];

            // subregions might be empty
            if (subregion) {
                // Make the subregion be more human friendly
                subregion = subregion.replace('_', ' ')
                    .replace('/', ' / ');
            }

            return {

                id: tzId,
                region: aux[1],
                subregion: subregion
            };
        }
    }

})();

(function() {
    'use strict';

    angular.module('pctDate.utils.tzId.parseTzIdList', [
            'pctDate.utils.tzId.parseTzId',
            'pctDate.utils.tzId.isTzSpecialCase'
        ])
        .factory('parseTzIdList', factory);



    factory.$inject = ['parseTzId', 'isTzSpecialCase'];




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
    function factory(parseTzId, isTzSpecialCase) {



        return function parseTzIdList(tzListRaw) {

            var tzList = [];
            var regionList = [];


            //To keep track of repeated Region values
            var seen = {};


            var len = tzListRaw.length;
            var i, aux;


            for (i = 0; i < len; i++) {

                var parsedTz = parseTzId(tzListRaw[i]);


                //If the timezone is a "special case" then
                //dont include it on the return array
                if (isTzSpecialCase(parsedTz)) {
                    continue;
                }


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
            'pctDate.utils.tzId.filterTzByRegion',
            'pctDate.utils.tzId.getTzList'
        ]);


}) ();

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

/*! jstz - v1.0.4 - 2012-12-12 */
(function(e){var t=function(){"use strict";var e="s",n=function(e){var t=-e.getTimezoneOffset();return t!==null?t:0},r=function(e,t,n){var r=new Date;return e!==undefined&&r.setFullYear(e),r.setDate(n),r.setMonth(t),r},i=function(e){return n(r(e,0,2))},s=function(e){return n(r(e,5,2))},o=function(e){var t=e.getMonth()>7?s(e.getFullYear()):i(e.getFullYear()),r=n(e);return t-r!==0},u=function(){var t=i(),n=s(),r=i()-s();return r<0?t+",1":r>0?n+",1,"+e:t+",0"},a=function(){var e=u();return new t.TimeZone(t.olson.timezones[e])};return{determine:a,date_is_dst:o}}();t.TimeZone=function(e){"use strict";var n=null,r=function(){return n},i=function(){var e=t.olson.ambiguity_list[n],r=e.length,i=0,s=e[0];for(;i<r;i+=1){s=e[i];if(t.date_is_dst(t.olson.dst_start_dates[s])){n=s;return}}},s=function(){return typeof t.olson.ambiguity_list[n]!="undefined"};return n=e,s()&&i(),{name:r}},t.olson={},t.olson.timezones={"-720,0":"Etc/GMT+12","-660,0":"Pacific/Pago_Pago","-600,1":"America/Adak","-600,0":"Pacific/Honolulu","-570,0":"Pacific/Marquesas","-540,0":"Pacific/Gambier","-540,1":"America/Anchorage","-480,1":"America/Los_Angeles","-480,0":"Pacific/Pitcairn","-420,0":"America/Phoenix","-420,1":"America/Denver","-360,0":"America/Guatemala","-360,1":"America/Chicago","-360,1,s":"Pacific/Easter","-300,0":"America/Bogota","-300,1":"America/New_York","-270,0":"America/Caracas","-240,1":"America/Halifax","-240,0":"America/Santo_Domingo","-240,1,s":"America/Santiago","-210,1":"America/St_Johns","-180,1":"America/Godthab","-180,0":"America/Argentina/Buenos_Aires","-180,1,s":"America/Montevideo","-120,0":"Etc/GMT+2","-120,1":"Etc/GMT+2","-60,1":"Atlantic/Azores","-60,0":"Atlantic/Cape_Verde","0,0":"Etc/UTC","0,1":"Europe/London","60,1":"Europe/Berlin","60,0":"Africa/Lagos","60,1,s":"Africa/Windhoek","120,1":"Asia/Beirut","120,0":"Africa/Johannesburg","180,0":"Asia/Baghdad","180,1":"Europe/Moscow","210,1":"Asia/Tehran","240,0":"Asia/Dubai","240,1":"Asia/Baku","270,0":"Asia/Kabul","300,1":"Asia/Yekaterinburg","300,0":"Asia/Karachi","330,0":"Asia/Kolkata","345,0":"Asia/Kathmandu","360,0":"Asia/Dhaka","360,1":"Asia/Omsk","390,0":"Asia/Rangoon","420,1":"Asia/Krasnoyarsk","420,0":"Asia/Jakarta","480,0":"Asia/Shanghai","480,1":"Asia/Irkutsk","525,0":"Australia/Eucla","525,1,s":"Australia/Eucla","540,1":"Asia/Yakutsk","540,0":"Asia/Tokyo","570,0":"Australia/Darwin","570,1,s":"Australia/Adelaide","600,0":"Australia/Brisbane","600,1":"Asia/Vladivostok","600,1,s":"Australia/Sydney","630,1,s":"Australia/Lord_Howe","660,1":"Asia/Kamchatka","660,0":"Pacific/Noumea","690,0":"Pacific/Norfolk","720,1,s":"Pacific/Auckland","720,0":"Pacific/Tarawa","765,1,s":"Pacific/Chatham","780,0":"Pacific/Tongatapu","780,1,s":"Pacific/Apia","840,0":"Pacific/Kiritimati"},t.olson.dst_start_dates=function(){"use strict";var e=new Date(2010,6,15,1,0,0,0);return{"America/Denver":new Date(2011,2,13,3,0,0,0),"America/Mazatlan":new Date(2011,3,3,3,0,0,0),"America/Chicago":new Date(2011,2,13,3,0,0,0),"America/Mexico_City":new Date(2011,3,3,3,0,0,0),"America/Asuncion":new Date(2012,9,7,3,0,0,0),"America/Santiago":new Date(2012,9,3,3,0,0,0),"America/Campo_Grande":new Date(2012,9,21,5,0,0,0),"America/Montevideo":new Date(2011,9,2,3,0,0,0),"America/Sao_Paulo":new Date(2011,9,16,5,0,0,0),"America/Los_Angeles":new Date(2011,2,13,8,0,0,0),"America/Santa_Isabel":new Date(2011,3,5,8,0,0,0),"America/Havana":new Date(2012,2,10,2,0,0,0),"America/New_York":new Date(2012,2,10,7,0,0,0),"Asia/Beirut":new Date(2011,2,27,1,0,0,0),"Europe/Helsinki":new Date(2011,2,27,4,0,0,0),"Europe/Istanbul":new Date(2011,2,28,5,0,0,0),"Asia/Damascus":new Date(2011,3,1,2,0,0,0),"Asia/Jerusalem":new Date(2011,3,1,6,0,0,0),"Asia/Gaza":new Date(2009,2,28,0,30,0,0),"Africa/Cairo":new Date(2009,3,25,0,30,0,0),"Pacific/Auckland":new Date(2011,8,26,7,0,0,0),"Pacific/Fiji":new Date(2010,11,29,23,0,0,0),"America/Halifax":new Date(2011,2,13,6,0,0,0),"America/Goose_Bay":new Date(2011,2,13,2,1,0,0),"America/Miquelon":new Date(2011,2,13,5,0,0,0),"America/Godthab":new Date(2011,2,27,1,0,0,0),"Europe/Moscow":e,"Asia/Yekaterinburg":e,"Asia/Omsk":e,"Asia/Krasnoyarsk":e,"Asia/Irkutsk":e,"Asia/Yakutsk":e,"Asia/Vladivostok":e,"Asia/Kamchatka":e,"Europe/Minsk":e,"Australia/Perth":new Date(2008,10,1,1,0,0,0)}}(),t.olson.ambiguity_list={"America/Denver":["America/Denver","America/Mazatlan"],"America/Chicago":["America/Chicago","America/Mexico_City"],"America/Santiago":["America/Santiago","America/Asuncion","America/Campo_Grande"],"America/Montevideo":["America/Montevideo","America/Sao_Paulo"],"Asia/Beirut":["Asia/Beirut","Europe/Helsinki","Europe/Istanbul","Asia/Damascus","Asia/Jerusalem","Asia/Gaza"],"Pacific/Auckland":["Pacific/Auckland","Pacific/Fiji"],"America/Los_Angeles":["America/Los_Angeles","America/Santa_Isabel"],"America/New_York":["America/Havana","America/New_York"],"America/Halifax":["America/Goose_Bay","America/Halifax"],"America/Godthab":["America/Miquelon","America/Godthab"],"Asia/Dubai":["Europe/Moscow"],"Asia/Dhaka":["Asia/Yekaterinburg"],"Asia/Jakarta":["Asia/Omsk"],"Asia/Shanghai":["Asia/Krasnoyarsk","Australia/Perth"],"Asia/Tokyo":["Asia/Irkutsk"],"Australia/Brisbane":["Asia/Yakutsk"],"Pacific/Noumea":["Asia/Vladivostok"],"Pacific/Tarawa":["Asia/Kamchatka"],"Africa/Johannesburg":["Asia/Gaza","Africa/Cairo"],"Asia/Baghdad":["Europe/Minsk"]},typeof exports!="undefined"?exports.jstz=t:e.jstz=t})(this);
angular.module("pctDate.templates", []).run(["$templateCache", function($templateCache) {$templateCache.put("src/timezoneSelector/timezoneSelector.tpl.html","<select \n    ng-model=\"selectedRegion\" \n    ng-options=\"region for region in props.tzRegionList\" \n    ng-change=\"setSelectedRegion(selectedRegion)\"\n    class=\"{{clazz}}\"\n>\n</select>\n\n\n<select \n    ng-model=\"state.selectedTz\" \n    ng-options=\"tz.subregion for tz in tzList track by tz.id\" \n    ng-change=\"state.setSelectedTz(state.selectedTz)\"\n    class=\"{{clazz}}\"\n    ng-required=\"{{ngRequired}}\"\n    name=\"{{name}}\"\n>\n    <option></option>\n</select>\n");}]);