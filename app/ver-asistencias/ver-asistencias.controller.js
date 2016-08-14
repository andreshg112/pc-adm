(function() {
    'use strict';

    angular
        .module('app')
        .controller('VerAsistenciasController', VerAsistenciasController);

    VerAsistenciasController.$inject = ['AsistenciasService', 'MateriasService'];

    function VerAsistenciasController(AsistenciasService, MateriasService) {
        console.log("Entró a VerAsistenciasController");
        var vm = this;
        var options = {
            namespace: 'counseling',
            storages: ['session']
        };
        var basil = new window.Basil(options);
        var user = {};

        //Declaraciones de variables públicas en orden alfabético.
        vm.asistencias = [];
        vm.getNombreCompletoUser = getNombreCompletoUser;
        vm.materias = [];

        //Funciones, en orden alfabético
        function activate() {
            if (basil.get('user').tipo_usuario != 'tutor') {
                location.href = '#/';
            } else {
                user = basil.get('user');
                cargarAsistencias();
            }
        }

        function cargarAsistencias() {
            AsistenciasService.getByTutor(user.id)
                .then(function(response) {
                    if (!response.data.result) {
                        alertify.error(response.data.mensaje);
                    } else {
                        vm.asistencias = response.data.result;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function getNombreCompletoUser(user) {
            var nombreCompleto = "";
            if (user) {
                nombreCompleto = user.primer_nombre;
                nombreCompleto += user.segundo_nombre != null && user.segundo_nombre != "" ? " " + user.segundo_nombre : "";
                nombreCompleto += " " + user.primer_apellido;
                nombreCompleto += user.segundo_apellido != null && user.segundo_apellido != "" ? " " + user.segundo_apellido : "";
            }
            return nombreCompleto;
        }

        activate();
    }
})();