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
            scope: {
                ngModel: '=ngModel'
            }

        }
    }



}) ();
