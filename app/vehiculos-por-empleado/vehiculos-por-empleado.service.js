(function() {
    'use strict';

    angular
        .module('app')
        .service('VehiculosPorEmpleadoService', VehiculosPorEmpleadoService);

    VehiculosPorEmpleadoService.$inject = ['$http'];

    function VehiculosPorEmpleadoService($http) {
        this.get = get;

        ////////////////
        //La ruta tiene un nombre indebido.
        var uri = 'http://www.parkingcontrolapp.co/ParkingControlServer_Barranquilla/public/api/reporte_empleado';

        function get(id_admin, id_parqueadero, fecha_inicial, fecha_final, token) {
            var req = $http.get(uri + '/id_admin/' + id_admin + '/id_parqueadero/' + id_parqueadero + '/fecha_inicial/' + fecha_inicial + '/fecha_final/' + fecha_final + '?token=' + token);
            return req;
        }
    }
})();