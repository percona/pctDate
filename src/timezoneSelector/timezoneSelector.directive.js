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
     * @description
     * Reusable component-like directive to select Time Zones.
     * It is well suited for angular forms.
     *
     * Attribute / parameters
     * - ng-model {String Time Zone Id}: the angular model to use. It will be two way data bind.
     *      you can use it as and output as an input, just like a regular angular input element
     * - class: The directive is smart enough to apply the same classes applied to the
     *      custom element to the inner select elements. Feel free to use any bootstrap
     *      or any other framework or custom css classes.
     * - autodetecttz {Boolean}: Instruct the directive if you want to attempt
     *      to auto guess the user's timezone or not. Useful for editing modes.
     *      The default is false.
     * - ng-required {Boolean}: mark if the time zone selector is a required field or not.
     * - name {String}: Select input name
     *
     *
     * Example
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
     *
     */
    function directiveDef(getTzList, filterTzByRegionFactory, jstz, parseTzId) {

        function link(scope, element, attrs, ngModelController) {
            //TODO: change filterTz... name
            var filterTzByRegion = filterTzByRegionFactory(getTzList().tzList);

            // autodetecttz attribute logic
            var autodetectTzFlag =  attrs.autodetecttz === 'true' ? true : false;

            //Initialize where filtered Timezone list will be stored
            scope.tzList;

            //Initialize where the current selected Region will be stored
            scope.selectedRegion;

            //Initialize the List of Regions available
            scope.tzRegionList = getTzList().regionList;


            /**
             * @description
             * Implement ngModel watch.
             * This enables the directive to respond correctly to
             * the ngModel changes originated from the outside of this directive
             * (by another controller for example) or from inside
             * of this directive (by the main select element).
             *
             * **Note1: **
             * We need to use a $watch over an ng-change directive
             * because the latter only responds to user input and we also
             * need to respond to changes by other components.
             *
             * **Note2: **
             * ngModelController.$render was the first choice over the $watch
             * but we couldn't make it work.
             *
             */
            scope.$watch(
                function() {
                    return ngModelController.$modelValue
                },
                function(tzId) {
                    var tzId = parseTzId(scope.ngModel);
                    scope.filterTzList(tzId.region);
                    scope.setSelectedRegion(tzId.id);
                }
            );


            /**
             * @name filterTzList
             * @param {String} Region where TimeZone Id = "Region/SubRegion"
             *
             * @description
             * Main handler for filtering the main select element
             * list of options by the selected Region
             *
             */
            scope.filterTzList = function(region) {
                scope.tzList = filterTzByRegion(region)
            }

            /**
             * @name setSelectedRegion
             * @param {String} tzId
             *
             * @description
             * Setter for the selectedRegion.
             * It extracts the selected Region from the TzId
             * selected in the main select element (ngModel)
             *
             */
            scope.setSelectedRegion = function(tzId) {
                scope.selectedRegion = parseTzId(tzId).region;
            }

            if (autodetectTzFlag) {
                //Use js timezone detect javascript library to auto detect the current
                //user's timezone.
                //Use that auto detected Time Zone as the default
                //(already selected) option in the time zone selection directive
                scope.ngModel = parseTzId(jstz.determine().name()).id;
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
