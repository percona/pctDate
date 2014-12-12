describe('pctDate.timezoneSelector.directive module', function() {
    'use strict';

    var $compile, $rootScope, element;

    beforeEach(module('pctDate.timezoneSelector.directive'));

    beforeEach(inject(function($injector) {

        $compile = $injector.get('$compile');
        $rootScope = $injector.get('$rootScope');
    }));


    beforeEach(function() {
        element = $compile('<pct-timezone-selector ng-model="model"  class="c1 c2"></pct-timezone-selector>')($rootScope);
        $rootScope.$digest();
    })


    it('should load the template correctly and all its html', function() {
        expect(element.find('select').length).toBe(2);
    });


    it('should interpolate the css classes to the select elements', function() {
        expect(element.find('.c1.c2').length).toBe(2);
    });


    it('should two way bind the ngModel attr', function() {
        var isolateScope = element.isolateScope();


        isolateScope.ngModel = 'test';
        $rootScope.$digest();
        expect($rootScope.model).toEqual(isolateScope.ngModel);


        $rootScope.model = 'test2';
        $rootScope.$digest();
        expect(isolateScope.ngModel).toEqual($rootScope.model);
    });

});
