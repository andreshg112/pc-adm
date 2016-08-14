(function() {
    'use strict';

    angular
        .module('app')
        .controller('VisualizarUsuariosController', VisualizarUsuariosController);

    VisualizarUsuariosController.$inject = ['UsersService', 'ProgramasService'];

    function VisualizarUsuariosController(UsersService, ProgramasService) {
        console.log("Entró a VisualizarUsuariosController");
        var vm = this;
        var options = {
            namespace: 'counseling',
            storages: ['session']
        };
        var basil = new window.Basil(options);

        //Declaraciones de variables públicas en orden alfabético.
        vm.limpiar = limpiar;
        vm.programas = [];
        vm.roles = ['alumno', 'tutor'];
        vm.usuarios = [];

        //Funciones, en orden alfabético
        function activate() {
            if (basil.get('user').tipo_usuario != 'administrador') {
                location.href = '#/';
            } else {
                vm.limpiar();
                cargarProgramas();
                cargarUsuarios();
            }
        }

        function cargarProgramas() {
            ProgramasService.getAll()
                .then(function(response) {
                    vm.programas = response.data.result;
                    if (vm.programas.length == 0) {
                        alertify.error(response.data.mensaje);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function cargarUsuarios() {
            UsersService.getAll()
                .then(function(response) {
                    vm.usuarios = response.data.result;
                    if (vm.usuarios.length == 0) {
                        alertify.error('No hay registros.');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function limpiar() {
            vm.usuario = {};
        }

        activate();
    }
})();