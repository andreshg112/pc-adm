(function() {
    'use strict';

    angular
        .module('app')
        .service('ParqueaderosService', ParqueaderosService);

    ParqueaderosService.$inject = ['$http'];

    function ParqueaderosService($http) {
        this.getAll = getAll;

        ////////////////

        function getAll(id_admin, token) {
            var uri = sessionStorage.api + '/admin_count_parqueadero/id_admin';
            var req = $http.get(uri + '/' + id_admin + "?token=" + token);
            return req;
        }

    }
})();