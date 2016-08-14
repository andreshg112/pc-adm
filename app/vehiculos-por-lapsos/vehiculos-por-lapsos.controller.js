(function() {
    'use strict';

    angular
        .module('app')
        .controller('VehiculosPorLapsosController', VehiculosPorLapsosController);

    VehiculosPorLapsosController.$inject = ['VehiculosPorLapsosService', 'ParqueaderosService'];

    function VehiculosPorLapsosController(VehiculosPorLapsosService, ParqueaderosService) {
        var vm = this;
        var options = {
            namespace: 'pc-adm',
            storages: ['session']
        };
        var basil = new window.Basil(options);
        var user;

        //Declaraciones de variables públicas en orden alfabético.
        vm.consultarPorLapsos = consultarPorLapsos;
        vm.limpiar = limpiar;
        vm.parqueaderos = [];
        vm.vehiculosPorLapsos = [];

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

        function consultarPorLapsos() {
            var fecha_inicial = $('#fecha_inicial').val();
            var fecha_final = $('#fecha_final').val();
            VehiculosPorLapsosService.get(user.id_usuario, vm.id_parqueadero, fecha_inicial, fecha_final, user.token)
                .then(function(response) {
                    vm.vehiculosPorLapsos = response.data.reporte;
                    if (vm.vehiculosPorLapsos.length == 0) {
                        alertify.error('No hay datos para mostrar.');
                    }
                })
                .catch(function(error) {
                    alertify.error('Error: ' + error.statusText);
                });
        }

        function limpiar() {}

        activate();
    }
})();