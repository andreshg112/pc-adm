(function() {
    'use strict';

    angular
        .module('app')
        .service('AsistenciasService', AsistenciasService);

    AsistenciasService.$inject = ['$http'];

    function AsistenciasService($http) {
        this.getByTutor = getByTutor;

        ////////////////

        var uri = "api/public";

        function getByTutor(tutorId) {
            console.log("getByTutor");
            var req = $http.get(uri + "/tutores/" + tutorId + "/asistencias");
            return req;
        }
    }
})();