(function() {
    'use strict';

    angular
        .module('app')
        .controller('VehiculosPorDiaController', VehiculosPorDiaController);

    VehiculosPorDiaController.$inject = ['VehiculosPorDiaService', 'NgTableParams'];

    function VehiculosPorDiaController(VehiculosPorDiaService, NgTableParams) {
        var vm = this;
        var options = {
            namespace: 'pc-adm',
            storages: ['session']
        };
        var basil = new window.Basil(options);
        var user = {};

        //Declaraciones de variables públicas en orden alfabético.
        vm.cargarPorDia = cargarPorDia;
        vm.limpiar = limpiar;
        vm.vehiculosPorDia = [];

        //Funciones, en orden alfabético
        function activate() {
            if (basil.get('user').rol != 'admin') {
                location.href = '#/';
            } else {
                vm.limpiar();
                user = basil.get('user');
            }
        }

        function cargarPorDia(id_parquedero) {
            var fecha = $('#fecha').val();
            VehiculosPorDiaService.get(user.id_usuario, id_parquedero, fecha, user.token)
                .then(function(response) {
                    if (!response.data.error) {
                        vm.vehiculosPorDia = response.data.listado_vehiculos;
                        vm.tableParams = new NgTableParams({}, { dataset: vm.vehiculosPorDia });
                        if (vm.vehiculosPorDia.length == 0) {
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
            vm.usuario = {};
        }

        activate();
    }
})();