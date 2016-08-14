(function() {
    'use strict';

    angular
        .module('app')
        .service('TutoresService', TutoresService);

    TutoresService.$inject = ['$http'];

    function TutoresService($http) {
        this.getAll = getAll;
        this.getConCalificacionAlumno = getConCalificacionAlumno;
        this.delete = dispose;
        this.post = post;

        ////////////////

        var uri = "api/public/tutores";

        function getAll() {
            console.log("get_all");
            var req = $http.get(uri);
            return req;
        }

        function getConCalificacionAlumno(alumno_id) {
            console.log("getConCalificacionAlumno");
            var req = $http.get("api/public/alumnos/" + alumno_id + "/tutores/calificacion");
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
    }
})();