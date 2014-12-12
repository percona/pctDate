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
