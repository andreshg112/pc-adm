(function() {
    'use strict';

    angular
        .module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['UsersService'];

    function LoginController(UsersService) {
        console.log("Entró a LoginController");
        var vm = this;
        var options = {
            namespace: 'pc-adm',
            storages: ['session']
        };
        var basil = new window.Basil(options);

        //Declaraciones de variables públicas en orden alfabético.
        vm.iniciarSesion = iniciarSesion;
        vm.limpiar = limpiar;

        //Funciones, en orden alfabético
        function activate() {
            vm.limpiar();
        }

        function iniciarSesion() {
            UsersService.login(vm.usuarioInicioSesion).then(function(response) {
                    console.log(response);
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
                    console.log(error);
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