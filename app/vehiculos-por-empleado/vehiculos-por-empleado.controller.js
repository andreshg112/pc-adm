(function() {
    'use strict';

    angular
        .module('app')
        .controller('VehiculosPorEmpleadoController', VehiculosPorEmpleadoController);

    VehiculosPorEmpleadoController.$inject = ['VehiculosPorEmpleadoService', 'NgTableParams'];

    function VehiculosPorEmpleadoController(VehiculosPorEmpleadoService, NgTableParams) {
        var vm = this;
        var options = {
            namespace: 'pc-adm',
            storages: ['session']
        };
        var basil = new window.Basil(options);
        var user = {};

        //Declaraciones de variables públicas en orden alfabético.
        vm.cargar = cargar;
        vm.limpiar = limpiar;
        vm.vehiculos = [];

        //Funciones, en orden alfabético
        function activate() {
            if (basil.get('user').rol != 'admin') {
                location.href = '#/';
            } else {
                vm.limpiar();
                user = basil.get('user');
            }
        }

        function cargar(id_parquedero) {
            vm.limpiar();
            var fecha_inicial = $('#fecha_inicial').val();
            var fecha_final = $('#fecha_final').val();
            if (!id_parquedero || !fecha_inicial || !fecha_final) {
                vm.limpiar();
                return false;
            }
            VehiculosPorEmpleadoService.get(user.id_usuario, id_parquedero, fecha_inicial, fecha_final, user.token)
                .then(function(response) {
                    if (!response.data.error) {
                        vm.vehiculos = response.data.reporte;
                        vm.tableParams = new NgTableParams({}, { dataset: vm.vehiculos });
                        if (vm.vehiculos.length == 0) {
                            alertify.error('No hay registros.');
                        }
                    } else {
                        alertify.error('¡Error!');
                    }

                })
                .catch(function(error) {
                    alertify.error(error.statusText);
                });
        }

        function limpiar() {
            vm.vehiculos = [];
            vm.tableParams = new NgTableParams({}, { dataset: vm.vehiculos });
        }

        activate();
    }
})();