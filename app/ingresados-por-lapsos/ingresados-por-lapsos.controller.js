(function() {
    'use strict';

    angular
        .module('app')
        .controller('IngresadosPorLapsosController', IngresadosPorLapsosController);

    IngresadosPorLapsosController.$inject = ['IngresadosPorLapsosService', 'NgTableParams'];

    function IngresadosPorLapsosController(IngresadosPorLapsosService, NgTableParams) {
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
        vm.total = 0;
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
            if (!id_parquedero || !vm.fecha_inicial || !vm.fecha_final) {
                vm.limpiar();
                return false;
            }
            var fecha_inicial = new Date(vm.fecha_inicial.valueOf() - vm.fecha_inicial.getTimezoneOffset() * 60000);
            var fecha_final = new Date(vm.fecha_final.valueOf() - vm.fecha_final.getTimezoneOffset() * 60000);
            IngresadosPorLapsosService.get(user.id_usuario, id_parquedero, fecha_inicial.toISOString(), fecha_final.toISOString(), user.token)
                .then(function(response) {
                    if (!response.data.error) {
                        vm.vehiculos = response.data.reporte;
                        vm.total = response.data.liquidacion;
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
            vm.total = 0;
            vm.vehiculos = [];
            vm.tableParams = new NgTableParams({}, { dataset: vm.vehiculos });
        }

        activate();
    }
})();