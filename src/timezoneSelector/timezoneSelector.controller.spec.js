(function() {

    angular.module('pctDate.timezoneSelector', ['pctMoment'])
        .directive('pctTimezoneSelector', directiveDef);


    function directiveDef(moment) {


        //TODO: check that moment timezone is loaded


        function link(scope, element, attrs, ngModelCtrl) {
            //http://momentjs.com/timezone/docs/#/data-loading/getting-zone-names/
            scope.timezoneList = moment.tz.names();

        }

        return {
            restrict: 'E',
            require: 'ngModel',
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
