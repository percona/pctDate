describe('pctDate.utils.tzId.filterTzByRegion module', function() {

    var filterTzByRegion;

    beforeEach(module('pctDate.utils.tzId.filterTzByRegion'));


    beforeEach(inject(function($injector) {
        filterTzByRegion = $injector.get('filterTzByRegion');
    }));



    it('should return a function that filters the original tz list by region', function() {
        var tzList = [
            {id:'America/Los_Angeles', region: 'America', subregion: 'Los_Angeles'},
            {id: 'Europe/Rome', region: 'Europe', subregion: 'Rome'}
        ];

        var filter = filterTzByRegion(tzList);


        expect(angular.isFunction(filter)).toBe(true);
        expect(filter('America')).toEqual([{id:'America/Los_Angeles', region: 'America', subregion: 'Los_Angeles'}]);
        expect(filter('Europe')).toEqual([{id: 'Europe/Rome', region: 'Europe', subregion: 'Rome'}]);
    });


    it('should throw and error when the @param is not an array', function() {
        expect(function() { filterTzByRegion('not an array') }).toThrow();
    });
});

