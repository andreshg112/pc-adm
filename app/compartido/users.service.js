(function() {
    'use strict';

    angular
        .module('app')
        .service('UsersService', UsersService);

    UsersService.$inject = ['$http'];

    function UsersService($http) {
        this.login = login;

        ////////////////

        var uri = "http://www.parkingcontrolapp.co/ParkingControlServer_Barranquilla/public/api/authenticate";

        function login(registro) {
            console.log("login");
            var req = $http.post(uri, registro);
            return req;
        }
    }
})();