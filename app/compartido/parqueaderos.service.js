(function() {
    'use strict';

    angular
        .module('app')
        .service('ParqueaderosService', ParqueaderosService);

    ParqueaderosService.$inject = ['$http'];

    function ParqueaderosService($http) {
        this.getAll = getAll;

        ////////////////

        var uri = 'http://www.parkingcontrolapp.co/ParkingControlServer_Barranquilla/public/api/admin_count_parqueadero/id_admin';

        function getAll(id_admin, token) {
            var req = $http.get(uri + '/' + id_admin + "?token=" + token);
            return req;
        }

    }
})();