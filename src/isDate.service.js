(function() {

    angular.module('pctDate.isDate', [])
        .factory('isDate', isDateService);


    /*
     * @ngdoc factory
     * @name isDate
     * @kind functions
     *
     * @description
     * Helper function that evaluates if its only @param
     * is a Native Js Valid Date Object.
     *
     * We use angular.isDate to assert that the input
     * is a Date object and we also use date.valueOf
     * to evaluate if it is a valid Date Object
     *
     *
     * @param {*} value
     * @returns {Boolean}
     *
     */
    function isDateService() {

        return function isDate(value) {
            return angular.isDate(value) && !isNaN(value.valueOf());
        }
    }
})();
