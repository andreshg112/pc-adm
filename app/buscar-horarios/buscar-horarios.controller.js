(function() {
    'use strict';

    angular
        .module('app')
        .controller('BuscarHorariosController', BuscarHorariosController);

    BuscarHorariosController.$inject = ['HorariosService', 'MateriasService', 'TutoresService'];

    function BuscarHorariosController(HorariosService, MateriasService, TutoresService) {
        console.log("Entró a BuscarHorariosController");
        var vm = this;
        var options = {
            namespace: 'counseling',
            storages: ['session']
        };
        var basil = new window.Basil(options);
        var user = {};

        //Declaraciones de variables públicas en orden alfabético.
        vm.asistir = asistir;
        vm.dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
        vm.getNombreCompletoTutor = getNombreCompletoTutor;
        vm.horarios = [];
        vm.limpiar = limpiar;
        vm.materias = [];

        //Funciones, en orden alfabético
        function activate() {
            if (basil.get('user').tipo_usuario != 'alumno') {
                location.href = '#/';
            } else {
                user = basil.get('user');
                vm.estaModificando = false;
                vm.limpiar();
                cargarHorarios();
                cargarMaterias();
                cargarTutores();
            }
        }

        function asistir(horario) {
            var hoy = new Date();
            if (horario.dia == getDiaSemana(hoy)) {
                if (hoy.toTimeString() >= horario.hora_fin) {
                    alertify.error("Se ha pasado la hora de la asesoría. Inténtalo nuevamente el " + horario.dia.capitalize() + " antes de las " + horario.hora_fin);
                } else {
                    alertify.prompt('Mensaje', '¿Sobre cuál(es) tema(s) quieres recibir asesorías?', horario.materia.nombre,
                        function(evt, value) {
                            var temas_tutoriados = value;
                            var hoy = new Date();
                            var asistencia = {
                                'horario_id': horario.id,
                                'alumno_id': user.id,
                                'fecha': hoy.getFullYear() + "-" + (hoy.getMonth() + 1) + "-" + hoy.getDate(),
                                'temas_tutoriados': temas_tutoriados
                            };
                            enviarAsistencia(asistencia);
                        },
                        function() {
                            //Si presiona Cancel
                        }
                    );
                }
            } else {
                alertify.error("El día de hoy no está disponible la asesoría. Inténtalo nuevamente el " + horario.dia.capitalize() + ".");
            }
        }

        function cargarHorarios() {
            HorariosService.getAll()
                .then(function(response) {
                    vm.horarios = response.data;
                    if (vm.horarios.length == 0) {
                        alertify.error('No hay registros.');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function cargarMaterias() {
            MateriasService.getAll()
                .then(function(response) {
                    vm.materias = response.data;
                    if (vm.materias.length == 0) {
                        alertify.error('No se han registrado materias.');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function cargarTutores() {
            TutoresService.getAll()
                .then(function(response) {
                    vm.tutores = response.data.result;
                    if (vm.tutores.length == 0) {
                        alertify.error('No se han registrado tutores.');
                    }
                })
                .catch(function(error) {
                    console.log(error);
                    alertify.error(error.statusText);
                });
        }

        function getNombreCompletoTutor(tutor) {
            return getNombreCompletoUser(tutor);
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

        function enviarAsistencia(asistencia) {
            HorariosService.postAsistencia(asistencia.horario_id, asistencia)
                .then(function(response) {
                    console.log(response);
                    if (response.data.result) {
                        //alertify.success(response.data.mensaje);
                        alertify.success("Tu asistencia a esta asesoría se registró correctamente.");
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
            vm.horario = {};
        }

        activate();
    }
})();