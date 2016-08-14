(function() {
    'use strict';

    angular
        .module('app')
        .controller('IngresosPorDiaController', IngresosPorDiaController);

    IngresosPorDiaController.$inject = ['ParqueaderosService', 'IngresosPorDiaService'];

    function IngresosPorDiaController(ParqueaderosService, IngresosPorDiaService) {
        console.log("Entró a IngresosPorDiaController");
        var vm = this;
        var options = {
            namespace: 'pc-adm',
            storages: ['session']
        };
        var basil = new window.Basil(options);
        var user = {};

        //Declaraciones de variables públicas en orden alfabético.
        vm.cargarIngresos = cargarIngresos;
        vm.limpiar = limpiar;
        vm.parqueaderos = [];

        //Funciones, en orden alfabético
        function activate() {
            if (basil.get('user').rol != 'admin') {
                location.href = '#/';
            } else {
                user = basil.get('user');
                vm.limpiar();
                cargarParqueaderos();
            }
        }

        function cargarIngresos() {
            var hoy = new Date();
            IngresosPorDiaService.get(user.id_usuario, vm.id_parqueadero, fechaYYYYMMDD(hoy), user.token)
                .then(function(response) {
                    vm.ingresos = response.data;
                    if (vm.ingresos.error) {
                        alertify.error("¡Error!");
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function cargarParqueaderos() {
            ParqueaderosService.getAll(user.id_usuario, user.token)
                .then(function(response) {
                    vm.parqueaderos = response.data.reporte;
                    if (vm.parqueaderos.length == 0) {
                        alertify.error(response.data.error);
                    } else {
                        vm.id_parqueadero = vm.parqueaderos[0].id_parqueadero;
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }


        function limpiar() {}

        activate();
    }
})();