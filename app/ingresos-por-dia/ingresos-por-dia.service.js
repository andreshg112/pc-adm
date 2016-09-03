(function() {
    'use strict';

    angular
        .module('app')
        .service('IngresosPorDiaService', IngresosPorDiaService);

    IngresosPorDiaService.$inject = ['$http'];

    function IngresosPorDiaService($http) {
        this.get = get;

        ////////////////

        function get(id_administrador, id_parqueadero, fecha, token) {
            var uri = sessionStorage.api + '/vehiculos_fecha';
            var req = $http.get(uri + '/id_administrador/' + id_administrador + '/id_parqueadero/' + id_parqueadero + '/fecha/' + fecha + '?token=' + token);
            return req;
        }

    }
})();