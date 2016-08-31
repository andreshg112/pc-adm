(function() {
    'use strict';

    angular
        .module('app')
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider
                    .when('/', {
                        redirectTo: '/ingresos-por-dia'
                    })
                    .when('/ingresos-por-dia', {
                        templateUrl: 'app/ingresos-por-dia/ingresos-por-dia.html',
                        controller: 'IngresosPorDiaController',
                        controllerAs: 'vm'
                    })
                    .when('/vehiculos-por-lapsos', {
                        templateUrl: 'app/vehiculos-por-lapsos/vehiculos-por-lapsos.html',
                        controller: 'VehiculosPorLapsosController',
                        controllerAs: 'vm'
                    })
                    .when('/vehiculos-por-dia', {
                        templateUrl: 'app/vehiculos-por-dia/vehiculos-por-dia.html',
                        controller: 'VehiculosPorDiaController',
                        controllerAs: 'vm'
                    })
                    .when('/ingresados-por-lapsos', {
                        templateUrl: 'app/ingresados-por-lapsos/ingresados-por-lapsos.html',
                        controller: 'IngresadosPorLapsosController',
                        controllerAs: 'vm'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }
        ]);
})();