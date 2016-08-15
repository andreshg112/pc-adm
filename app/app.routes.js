(function() {
    'use strict';

    angular
        .module('app')
        .config(['$routeProvider',
            function($routeProvider) {
                $routeProvider
                    .when('/', {
                        templateUrl: 'app/cover/cover.html'
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
                    .when('/buscar-horarios', {
                        templateUrl: 'app/buscar-horarios/buscar-horarios.html',
                        controller: 'BuscarHorariosController',
                        controllerAs: 'horariosVm'
                    })
                    .when('/vehiculos-por-dia', {
                        templateUrl: 'app/vehiculos-por-dia/vehiculos-por-dia.html',
                        controller: 'VehiculosPorDiaController',
                        controllerAs: 'vm'
                    })
                    .when('/calificar-tutores', {
                        templateUrl: 'app/calificar-tutores/calificar-tutores.html',
                        controller: 'CalificarTutoresController',
                        controllerAs: 'calificarVm'
                    })
                    .when('/ver-calificaciones', {
                        templateUrl: 'app/ver-calificaciones/ver-calificaciones.html',
                        controller: 'VerCalificacionesController',
                        controllerAs: 'vm'
                    })
                    .when('/ver-asistencias', {
                        templateUrl: 'app/ver-asistencias/ver-asistencias.html',
                        controller: 'VerAsistenciasController',
                        controllerAs: 'vm'
                    })
                    .otherwise({
                        redirectTo: '/'
                    });
            }
        ]);
})();