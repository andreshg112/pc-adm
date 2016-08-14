(function() {
    'use strict';

    angular
        .module('app')
        .controller('CalificarTutoresController', CalificarTutoresController);

    CalificarTutoresController.$inject = ['TutoresService', 'ProgramasService', 'CalificarTutoresService', '$scope'];

    function CalificarTutoresController(TutoresService, ProgramasService, CalificarTutoresService, $scope) {
        console.log("Entró a CalificarTutoresController");
        var vm = this;
        var options = {
            namespace: 'counseling',
            storages: ['session']
        };
        var basil = new window.Basil(options);
        var user = {};

        //Declaraciones de variables públicas en orden alfabético.
        vm.notas = ['1', '2', '3', '4', '5'];
        vm.calificar = calificar;
        vm.getNombreCompletoUser = getNombreCompletoUser;
        vm.guardar = guardar;
        vm.limpiar = limpiar;
        vm.programas = [];
        vm.tutores = [];

        //Funciones, en orden alfabético
        function activate() {
            if (basil.get('user').tipo_usuario != 'alumno') {
                location.href = '#/';
            } else {
                user = basil.get('user');
                vm.limpiar();
                cargarProgramas();
                cargarTutores();
            }
        }

        function calificar(tutor) {
            vm.tutorSeleccionado = tutor;
            $('#modal-calificar').modal('show');
        }

        function cargarProgramas() {
            ProgramasService.getAll()
                .then(function(response) {
                    vm.programas = response.data.result;
                    if (vm.programas.length == 0) {
                        alertify.error(response.data.mensaje);
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function cargarTutores() {
            vm.tutores = [];
            TutoresService.getConCalificacionAlumno(user.id)
                .then(function(response) {
                    vm.tutores = response.data.result;
                    if (vm.tutores.length == 0) {
                        alertify.error('No hay registros.');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function getNombreCompletoUser(user) {
            var nombreCompleto = "";
            if (user) {
                nombreCompleto = user.primer_nombre;
                nombreCompleto += user.segundo_nombre != null && user.segundo_nombre != "" ? " " + user.segundo_nombre : "";
                nombreCompleto += " " + user.primer_apellido;
                nombreCompleto += user.segundo_apellido != null && user.segundo_apellido != "" ? " " + user.segundo_apellido : "";
            }
            return nombreCompleto;
        }

        function guardar() {
            var calificacion = {
                'tutor_id': vm.tutorSeleccionado.id,
                'alumno_id': basil.get('user').id,
                'nota': vm.tutorSeleccionado.calificacion.nota,
                'observaciones': vm.tutorSeleccionado.calificacion.observaciones
            };
            var promesa;
            if (vm.tutorSeleccionado.estaCalificado) {
                calificacion.id = vm.tutorSeleccionado.calificacion.id;
                promesa = CalificarTutoresService.put(calificacion);
            } else {
                promesa = CalificarTutoresService.post(calificacion);
            }
            promesa.then(function(response) {
                    console.log(response);
                    if (response.data.result) {
                        vm.tutorSeleccionado.estaCalificado = true;
                        alertify.success(response.data.mensaje);
                        $('#modal-calificar').modal('hide');
                        activate();
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
            vm.tutor = {};
            vm.tutorSeleccionado = {};
        }

        activate();
    }
})();