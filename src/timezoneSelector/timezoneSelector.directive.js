(function() {

    angular.module('pctDate.timezoneSelector.directive', [
        'pctDate.timezoneSelector.controller',
        'pctMoment'

        ])
        .directive('pctTimezoneSelector', directiveDef);


    function directiveDef(moment) {




        function link(scope, element, attrs, ngModelCtrl) {

        }

        return {
            restrict: 'E',
            require: 'ngModel',
            controller: '_pctTimezoneSelectorDirectiveController',
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
