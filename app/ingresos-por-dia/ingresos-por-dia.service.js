(function() {
    'use strict';

    angular
        .module('app')
        .service('IngresosPorDiaService', IngresosPorDiaService);

    IngresosPorDiaService.$inject = ['$http'];

    function IngresosPorDiaService($http) {
        this.get = get;

        ////////////////

        var uri = 'http://www.parkingcontrolapp.co/ParkingControlServer_Barranquilla/public/api/vehiculos_fecha';

        function get(id_administrador, id_parqueadero, fecha, token) {
            var req = $http.get(uri + '/id_administrador/' + id_administrador + '/id_parqueadero/' + id_parqueadero + '/fecha/' + fecha + '?token=' + token);
            return req;
        }

    }
})();