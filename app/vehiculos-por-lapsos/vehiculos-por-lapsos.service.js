(function() {
    'use strict';

    angular
        .module('app')
        .service('VehiculosPorLapsosService', VehiculosPorLapsosService);

    VehiculosPorLapsosService.$inject = ['$http'];

    function VehiculosPorLapsosService($http) {
        this.get = get;

        ////////////////

        var uri = 'http://www.parkingcontrolapp.co/ParkingControlServer_Barranquilla/public/api/reporte_rango_fecha';

        function get(id_admin, id_parqueadero, fecha_inicial, fecha_final, token) {
            var req = $http.get(uri + '/id_admin/' + id_admin + '/id_parqueadero/' + id_parqueadero + '/fecha_inicial/' + fecha_inicial + '/fecha_final/' + fecha_final + '?token=' + token);
            return req;
        }
    }
})();