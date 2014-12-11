(function() {

    angular.module('pctDate.timezoneSelector.controller', ['pctMoment'])
        .controller('_pctTimezoneSelectorDirectiveController', controller);




    function tzIdListRemoveSpecialCases(tzListRaw) {
        return tzListRaw.filter(function(el) {
            return /^[^\/]+\/.+/.test(el)
        })
    };


    function tzIdListToParsedList(tzListRaw) {

        var tzList = [];
        var regionList = [];
        var aux;

        var seen = {};

        for (var tzId in tzListRaw) {

            aux = tzListRaw[tzId].match(/(^[^\/]*)\/(.*)/)

            tzList.push({
                id: aux[0],
                region: aux[1],
                subregion: aux[2]
            });


            if (!seen.hasOwnProperty(aux[1])) {

                seen[aux[1]] = true;
                regionList.push(aux[1]);
            }

        }


        return [regionList, tzList];
    }

    //TODO: check that moment timezone is loaded
    function controller($scope, moment) {


        //http://momentjs.com/timezone/docs/#/data-loading/getting-zone-names/
        var tzListRaw = moment.tz.names();

        var aux = tzIdListToParsedList(tzIdListRemoveSpecialCases(tzListRaw));
        var tzRegionList = aux[0];
        var tzList = aux[1]


        $scope.selectedRegion = 'America';

        $scope.tzRegionList = tzRegionList;

        $scope.getTzListForRegion = function(selectedRegion) {

            return tzList.filter(function(element) {
                return element.region === selectedRegion
            });

        };

    }

}) ();
