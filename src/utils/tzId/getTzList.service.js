(function() {


    angular.module('pctDate.utils.tzId.getTzList', [
            'pctMoment',
            'pctDate.utils.tzId.parseTzIdList',
            'pctDate.utils.tzId.removeTzIdSpecialCases'
        ])
        .factory('getTzList', factory);


    factory.$inject = ['moment', 'parseTzIdList', 'removeTzIdSpecialCases'];

    //TODO: check that moment timezone is loaded
    function factory(moment, parseTzIdList, removeTzIdSpecialCases) {
        //http://momentjs.com/timezone/docs/#/data-loading/getting-zone-names/
        var tzListRaw = moment.tz.names();

        var aux = parseTzIdList(removeTzIdSpecialCases(tzListRaw));
        var tzRegionList = aux[0];
        var tzList = aux[1]

        return function getTzList() {

            return {
                regionList: aux[0],
                tzList: aux[1]
            }
        }
    }

})();
