(function() {
    'use strict';

    angular
        .module('app')
        .service('CalificarTutoresService', CalificarTutoresService);

    CalificarTutoresService.$inject = ['$http'];

    function CalificarTutoresService($http) {
        this.getAll = getAll;
        this.getByTutor = getByTutor;
        this.delete = dispose;
        this.post = post;
        this.put = put;

        ////////////////

        var uri = "api/public/calificaciones";

        function getAll() {
            console.log("get_all");
            var req = $http.get(uri);
            return req;
        }

        function getByTutor(tutorId) {
            console.log("get_all");
            var req = $http.get("api/public/tutores" + "/" + tutorId + "/calificaciones");
            return req;
        }

        function dispose(registro) {
            console.log("delete");
            var req = $http.delete(uri + "/" + registro.id);
            return req;
        }

        function post(registro) {
            console.log("post");
            var req = $http.post(uri, registro);
            return req;
        }

        function put(registro) {
            console.log("put");
            var req = $http.put(uri + "/" + registro.id, registro);
            return req;
        }
    }
})();