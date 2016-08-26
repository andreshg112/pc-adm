(function() {
    'use strict';

    angular
        .module('app')
        .service('VehiculosPorEmpleadoService', VehiculosPorEmpleadoService);

    VehiculosPorEmpleadoService.$inject = ['$http'];

    function VehiculosPorEmpleadoService($http) {
        this.get = get;

        ////////////////

        var uri = 'http://www.parkingcontrolapp.co/ParkingControlServer_Barranquilla/public/api/reporte_vehiculos_dia';

        function get(id_admin, id_parqueadero, fecha, token) {
            var req = $http.get(uri + '/id_administrador/' + id_admin + '/id_parqueadero/' + id_parqueadero + '/fecha/' + fecha + '?token=' + token);
            return req;
        }
    }
})();