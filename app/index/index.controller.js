(function() {
    'use strict';

    angular
        .module('app')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$location'];

    function IndexController($location) {
        console.log("Entró a IndexController");
        var vm = this;
        var options = {
            namespace: 'pc-adm',
            storages: ['session']
        };
        var basil = new window.Basil(options);

        vm.cerrarSesion = cerrarSesion;
        vm.getNombreCompletoUser = getNombreCompletoUser;
        vm.getTipoUsuario = getTipoUsuario;
        vm.user = {};

        function activate() {
            if (basil.get('user') == null) {
                location.href = 'login.html';
            } else {
                vm.user = basil.get('user');
            }
        }

        function cerrarSesion() {
            basil.remove('user');
            location.href = 'login.html';
        }

        function getTipoUsuario() {
            return vm.user.rol;
        }

        function getNombreCompletoUser() {
            var nombreCompleto = vm.user.nombres;
            nombreCompleto += vm.user.apellidos != null && vm.user.apellidos != "" ? " " + vm.user.apellidos : "";
            return nombreCompleto;
        }

        activate();

    }
})();