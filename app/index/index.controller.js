(function() {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$location', 'ParqueaderosService'];

    function IndexController($location, ParqueaderosService) {
        var vm = this;
        var options = {
            namespace: 'pc-adm',
            storages: ['session']
        };
        var basil = new window.Basil(options);

        vm.cerrarSesion = cerrarSesion;
        vm.getNombreCompletoUser = getNombreCompletoUser;
        vm.getTipoUsuario = getTipoUsuario;
        vm.parqueaderos = [];
        var user = {};

        function activate() {
            if (basil.get('user') == null) {
                location.href = 'login.html';
            } else {
                user = basil.get('user');
                cargarParqueaderos();
            }
        }

        function cargarParqueaderos() {
            ParqueaderosService.getAll(user.id_usuario, user.token)
                .then(function(response) {
                    vm.parqueaderos = response.data.reporte;
                    if (vm.parqueaderos.length == 0) {
                        alertify.error('Error: ' + response.data.error);
                    } else {
                        vm.id_parqueadero = vm.parqueaderos[0].id_parqueadero;
                    }
                })
                .catch(function(error) {
                    alertify.error('Error: ' + error.statusText);
                });
        }

        function cerrarSesion() {
            basil.remove('user');
            location.href = 'login.html';
        }

        function getTipoUsuario() {
            return user.rol;
        }

        function getNombreCompletoUser() {
            var nombreCompleto = user.nombres;
            nombreCompleto += user.apellidos != null && user.apellidos != "" ? " " + user.apellidos : "";
            return nombreCompleto;
        }

        activate();

    }
})();