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
