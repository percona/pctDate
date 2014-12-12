describe('pctDate.timezoneSelector.controller module', function() {
    'use strict';

    var ctrl, getTzListMock, filterTzByRegionMock;


    beforeEach(module('pctDate.timezoneSelector.controller'));


    beforeEach(inject(function($injector, $controller) {

        getTzListMock = jasmine.createSpy('getTzList')
                                .and.returnValue({
                                    regionList: 'regionList',
                                    tzList: 'tzList'
                                });

        filterTzByRegionMock = jasmine.createSpy('filterTzByRegion');

        ctrl = $controller('_pctTimezoneSelectorDirectiveController', {
            $scope:  $injector.get('$rootScope').$new(),
            getTzList: getTzListMock,
            filterTzByRegion: filterTzByRegionMock
        })

    }));


    it('should set the selectedRegion as "America" by default', function() {

        expect(ctrl.selectedRegion).toBe('America');

    });


    it('should use getTzList service to populate its own tzRegionList attribute', function() {

        expect(getTzListMock).toHaveBeenCalled()

        expect(ctrl.tzRegionList).toBe('regionList');

    });


    it('should set its attr getTzListForRegion from an external service', function() {

        expect(filterTzByRegionMock).toHaveBeenCalled();

    });




});
