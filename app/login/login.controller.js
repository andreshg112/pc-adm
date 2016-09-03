(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['UsersService'];

    function LoginController(UsersService) {
        var vm = this;
        var options = {
            namespace: 'pc-adm',
            storages: ['session']
        };
        var basil = new window.Basil(options);

        //Declaraciones de variables públicas en orden alfabético.
        vm.ciudades = [{
            nombre: 'Barranquilla',
            url: 'http://www.parkingcontrolapp.co/ParkingControlServer_Barranquilla/public/api'
        }, {
            nombre: 'Valledupar',
            url: 'http://www.parkingcontrolapp.co/ParkingControlServer_Jama/public/api'
        }];
        vm.cambiarApi = cambiarApi;
        vm.iniciarSesion = iniciarSesion;
        vm.limpiar = limpiar;

        //Funciones, en orden alfabético
        function activate() {
            vm.limpiar();
        }

        function cambiarApi(ciudad) {
            sessionStorage.api = ciudad.url;
        }

        function iniciarSesion() {
            UsersService.login(vm.usuarioInicioSesion).then(function(response) {
                    if (!response.data.error) {
                        basil.set('user', response.data);
                        alertify.success("Bienvenido " + response.data.nombres + " " + response.data.apellidos, 3);
                        alertify.success("Serás redirigido(a) al menú principal.", 4, function() {
                            location.href = '/pc-adm';
                        });
                    } else if (response.data.validator) {
                        alertify.error(response.data.mensaje);
                        response.data.validator.forEach(function(element) {
                            alertify.error(element);
                        }, this);
                    } else {
                        alertify.error(response.data.mensaje);
                    }
                })
                .catch(function(error) {
                    alertify.error(error.statusText);
                });
        }

        function limpiar() {
            vm.usuarioInicioSesion = {};
            vm.usuarioRegistro = {};
        }

        activate();
    }
})();