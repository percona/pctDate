describe('pctDate.timezoneSelector.controller module', function() {
    'use strict';

    var ctrl, getTzListMock, filterTzByRegionMock, jsTzDetectMock;


    beforeEach(module('pctDate.timezoneSelector.controller'));


    beforeEach(inject(function($injector, $controller) {

        getTzListMock = jasmine.createSpy('getTzList')
                                .and.returnValue({
                                    regionList: 'regionList',
                                    tzList: 'tzList'
                                });

        filterTzByRegionMock = jasmine.createSpy('filterTzByRegion');


        // Mock jsTzDetect service.
        // Use the base implementation, spy on it and
        // forcefully make it return a Time Zone ID
        // (This will make tests independent of the
        // time zone they are run in)
        jsTzDetectMock = $injector.get('jsTzDetect');
        spyOn(jsTzDetectMock, 'determine').and.returnValue({
                        name: function() {
                            return 'America/Los_Angeles'
                        }
                    });

        ctrl = $controller('_pctTimezoneSelectorDirectiveController', {
            $scope:  $injector.get('$rootScope').$new(),
            getTzList: getTzListMock,
            filterTzByRegion: filterTzByRegionMock,
            jsTzDetect: jsTzDetectMock
        })

    }));


    it('should set the selectedRegion as "America" by default', function() {

        //The controller should try to auto detect the user's time zone
        expect(jsTzDetectMock.determine).toHaveBeenCalled();

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
