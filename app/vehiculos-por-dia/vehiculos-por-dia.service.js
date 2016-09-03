(function() {
    'use strict';

    angular
        .module('app')
        .service('VehiculosPorDiaService', VehiculosPorDiaService);

    VehiculosPorDiaService.$inject = ['$http'];

    function VehiculosPorDiaService($http) {
        this.get = get;

        ////////////////

        function get(id_admin, id_parqueadero, fecha, token) {
            var uri = sessionStorage.api + '/reporte_vehiculos_dia';
            var req = $http.get(uri + '/id_administrador/' + id_admin + '/id_parqueadero/' + id_parqueadero + '/fecha/' + fecha + '?token=' + token);
            return req;
        }
    }
})();