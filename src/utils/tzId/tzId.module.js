(function() {

    angular.module('pctDate.utils.tzId', [
            'pctDate.utils.tzId.parseTzId',
            'pctDate.utils.tzId.parseTzIdList',
            'pctDate.utils.tzId.removeTzIdSpecialCases',
            'pctDate.utils.tzId.filterTzByRegion',
            'pctDate.utils.tzId.getTzList'
        ]);


}) ();
