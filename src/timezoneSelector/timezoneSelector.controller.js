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
