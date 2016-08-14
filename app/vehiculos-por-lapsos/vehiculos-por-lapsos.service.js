(function() {
    'use strict';

    angular
        .module('app')
        .service('HorariosService', HorariosService);

    HorariosService.$inject = ['$http'];

    function HorariosService($http) {
        this.getAll = getAll;
        this.delete = dispose;
        this.post = post;
        this.postAsistencia = postAsistencia;
        this.put = put;

        ////////////////

        var uri = "api/public/horarios";

        function getAll() {
            console.log("get_all");
            var req = $http.get(uri);
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

        function postAsistencia(id, registro) {
            console.log("postAsistencia");
            var req = $http.post(uri + "/" + id + "/asistencias", registro);
            return req;
        }

        function put(registro) {
            console.log("put");
            var req = $http.put(uri + "/" + registro.id, registro);
            return req;
        }
    }
})();