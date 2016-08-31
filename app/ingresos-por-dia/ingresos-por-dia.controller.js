(function() {
    'use strict';

    angular
        .module('app')
        .controller('IngresosPorDiaController', IngresosPorDiaController);

    IngresosPorDiaController.$inject = ['IngresosPorDiaService'];

    function IngresosPorDiaController(IngresosPorDiaService) {
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

        //Funciones, en orden alfabético
        function activate() {
            if (basil.get('user').rol != 'admin') {
                location.href = '#/';
            } else {
                user = basil.get('user');
                vm.limpiar();
            }
        }

        function cargarIngresos(id_parqueadero) {
            var hoy = new Date();
            IngresosPorDiaService.get(user.id_usuario, id_parqueadero, fechaYYYYMMDD(hoy), user.token)
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

        function limpiar() {}

        activate();
    }
})();