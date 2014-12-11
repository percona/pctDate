(function() {

    angular.module('pctDate.timezoneSelector.controller', [
        'pctDate.utils.tzId'
        ])
        .controller('_pctTimezoneSelectorDirectiveController', controller);



    controller.$inject = ['$scope', 'getTzList']


    function controller($scope, getTzList) {

        this.selectedRegion = 'America';

        this.tzRegionList = getTzList().regionList;

        var tzList = getTzList().tzList;

        this.getTzListForRegion = function(selectedRegion) {

            return tzList.filter(function(element) {
                return element.region === selectedRegion
            });

        };


        //explain why ngModel in the tpl is used with the scope instead of the ctrl

    }

}) ();
