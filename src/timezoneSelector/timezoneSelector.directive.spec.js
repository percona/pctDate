describe('pctDate.timezoneSelector.directive module', function() {
    'use strict';

    var $compile, $rootScope, element, isolateScope;

    beforeEach(module('pctDate.timezoneSelector.directive'));

    beforeEach(module(function($provide) {

        //Mock the list of Time Zones provided to the directive
        var getTzListMock = function() {
            var regionList = ['America', 'Europe'];
            var tzList = [{
                id: 'Europe/Rome',
                region: 'Europe',
                subregion: 'Rome'
            }, {
                id: 'America/Los_Angeles',
                region: 'America',
                subregion: 'Los Angeles'
            }];

            return {
                regionList: regionList,
                tzList: tzList
            };
        }


        $provide.value('getTzList', getTzListMock);
    }));

    beforeEach(inject(function($injector) {
        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
    }));


    beforeEach(function() {

        $rootScope.model = { tz: 'America/Los_Angeles' };

        element = $compile(
            '<pct-timezone-selector ng-model="model.tz"  class="c1 c2" autodetecttz="true">' +
            '</pct-timezone-selector>'
            )($rootScope);

        $rootScope.$digest();
        isolateScope = element.isolateScope();
    })


    it('should load the template correctly and all its html', function() {
        expect(element.find('select').length).toBe(2);
    });

    it('should interpolate the css classes to the select elements', function() {
        expect(element.find('.c1.c2').length).toBe(2);
    });

    it('should handle empty models gracefully', function() {
        //Note, if this secuence of statements does not throw an error
        // then it is all fine!
        $rootScope.model = { tz: '' };


        element = $compile(
            '<pct-timezone-selector ng-model="model.tz"  class="c1 c2"></pct-timezone-selector>'
            )($rootScope);

        $rootScope.$digest();

        isolateScope = element.isolateScope();
    });

    it('should accept enabling/disabling Auto Detect Tz functionality', function() {
        $rootScope.model = { tz: '' };

        var element = $compile(
            '<pct-timezone-selector ng-model="model.tz" autodetecttz="false">' +
            '</pct-timezone-selector>'
            )($rootScope);

        $rootScope.$digest();

        isolateScope = element.isolateScope();


        expect($rootScope.model.tz).toBe('');
    });

    describe('Region selector --> SubRegion selector (main select) sync', function() {
        it('should update the SubRegion list when another region is selected', function() {
            //Simulate a user Region selection
            isolateScope.filterTzList('Europe');
            $rootScope.$digest();
            expect(isolateScope.tzList).toEqual([{
                id: 'Europe/Rome',
                region: 'Europe',
                subregion: 'Rome'
            }]);


            //Simulate a user Region selection
            isolateScope.filterTzList('America');
            $rootScope.$digest();
            expect(isolateScope.tzList).toEqual([{
                id: 'America/Los_Angeles',
                region: 'America',
                subregion: 'Los Angeles'
            }]);

        });
    });

    describe('Directive --> Model sync', function() {
        it('should set the model with the selected Time Zone id', function() {

            //Simulate Time Zone selection
            isolateScope.ngModel = 'America/Los_Angeles';

            $rootScope.$digest();

            expect($rootScope.model.tz).toBe('America/Los_Angeles');


            //Simulate Time Zone selection
            isolateScope.ngModel  = 'Europe/Rome';

            $rootScope.$digest();

            expect($rootScope.model.tz).toBe('Europe/Rome');
        });
    });

    describe('Model --> Directive sync', function() {
        it('should update the selectors when the model is externally updated', function() {

            //Initialize to a known state
            $rootScope.model.tz = 'America/Los_Angeles';

            $rootScope.$digest();

            expect(isolateScope.ngModel).toBe('America/Los_Angeles');
            expect(isolateScope.selectedRegion).toBe('America');
            expect(isolateScope.tzList).toEqual([{
                id: 'America/Los_Angeles',
                region: 'America',
                subregion: 'Los Angeles'
            }]);


            // Programatically change the model from outside the directive
            $rootScope.model.tz = 'Europe/Rome';

            $rootScope.$digest();

            expect(isolateScope.ngModel).toBe('Europe/Rome');
            expect(isolateScope.selectedRegion).toBe('Europe');
            expect(isolateScope.tzList).toEqual([{
                id: 'Europe/Rome',
                region: 'Europe',
                subregion: 'Rome'
            }]);
        });
    });
});


