(function() {
    'use strict';

    angular
        .module('app')
        .controller('HorariosController', HorariosController);

    HorariosController.$inject = ['HorariosService', 'MateriasService', 'TutoresService'];

    function HorariosController(HorariosService, MateriasService, TutoresService) {
        console.log("Entró a HorariosController");
        var vm = this;
        var options = {
            namespace: 'counseling',
            storages: ['session']
        };
        var basil = new window.Basil(options);

        //Declaraciones de variables públicas en orden alfabético.
        vm.dias = ['lunes', 'martes', 'miércoles', 'jueves', 'viernes', 'sábado'];
        vm.horarios = [];
        vm.eliminar = eliminar;
        vm.enviarFormulario = enviarFormulario;
        vm.getNombreCompletoTutor = getNombreCompletoTutor;
        vm.estaModificando = false;
        vm.limpiar = limpiar;
        vm.materias = [];
        vm.activarModificar = activarModificar;

        //Funciones, en orden alfabético
        function activate() {
            if (basil.get('user').tipo_usuario != 'administrador') {
                location.href = '#/';
            } else {
                vm.estaModificando = false;
                vm.limpiar();
                cargarHorarios();
                cargarMaterias();
                cargarTutores();
            }
        }

        function activarModificar(horario) {
            vm.estaModificando = true;
            vm.horario = angular.copy(horario);
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

        function eliminar(registro) {
            alertify.confirm("¿Desea eliminar esta asesoría?",
                function() {
                    HorariosService.delete(registro)
                        .then(function(response) {
                            console.log(response);
                            activate();
                            alertify.success(response.data.mensaje);
                        })
                        .catch(function(error) {
                            console.log(error);
                            alertify.error(error.statusText);
                        });
                },
                function() {
                    //Si presiona Cancel.
                });
        }

        function getNombreCompletoTutor(tutor) {
            //return tutor.primer_nombre + ' ' + tutor.segundo_nombre + ' ' + tutor.primer_apellido + ' ' + tutor.segundo_apellido;
            return getNombreCompletoUser(tutor);
        }

        function getNombreCompletoUser(user) {
            var nombreCompleto = user.primer_nombre;
            nombreCompleto += user.segundo_nombre != null && user.segundo_nombre != "" ? " " + user.segundo_nombre : "";
            nombreCompleto += " " + user.primer_apellido;
            nombreCompleto += user.segundo_apellido != null && user.segundo_apellido != "" ? " " + user.segundo_apellido : "";
            return nombreCompleto;
        }

        function enviarFormulario() {
            vm.horario.hora_inicio = $('#hora_inicio').val();
            vm.horario.hora_fin = $('#hora_fin').val();
            console.log(vm.horario);
            var promesa;
            if (vm.estaModificando) {
                //Si está modificando (actualiando, editando), entonces hace un put.
                promesa = HorariosService.put(vm.horario);
            } else {
                //Si está registrando uno nuevo, hace un post.
                promesa = HorariosService.post(vm.horario);
            }
            promesa.then(function(response) {
                    console.log(response);
                    if (response.data.result) {
                        alertify.success(response.data.mensaje);
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
            $('#hora_inicio').val('');
            $('#hora_fin').val('');
            vm.horario = {};
        }

        activate();
    }
})();