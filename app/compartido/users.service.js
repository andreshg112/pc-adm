(function() {
    'use strict';

    angular
        .module('app')
        .service('UsersService', UsersService);

    UsersService.$inject = ['$http'];

    function UsersService($http) {
        this.login = login;

        ////////////////

        function login(registro) {
            var uri = sessionStorage.api + "/authenticate";
            var req = $http.post(uri, registro);
            return req;
        }
    }
})();