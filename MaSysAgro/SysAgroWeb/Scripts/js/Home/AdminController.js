var AdminControllers = function () {
    const url = urlGlobal
    const tblUsuarios = $('#tblUsuarios');
    let dtUsuarios;
    const tblProject = $('#tblProject');
    let dtProject;
    const tblDevice = $('#tblDevice');
    let dtDevice;
    const flexSwitchCheckChecked = $('#flexSwitchCheckChecked');
  

    var Inicializar = function () {
        console.log('admin controller')
        functionListar();
    }
    const functionListar = function () {
        initUsuarios();
        initProject();
        initDevice();

        postObtenerUsuarios();
        flexSwitchCheckChecked.change(function () {
            postObtenerUsuarios();
        })
    }
    
    var initUsuarios = function () {
        dtUsuarios = tblUsuarios.DataTable({
            language: 'dtDicEsp',
            ordering: true,
            paging: true,
            searching: true,
            bFilter: false,
            info: false,
            columns: [
                { data: 'Id', title: 'id', visible: false },
                { data: 'Usuario', title: 'user'},
                { data: 'Email', title: 'email' },
                {
                    title: 'name', render: (data, type, row) => {
                        let html = '';
                        html = row.Nombre + ' ' + row.ApellidoPaterno;
                        return html;
                    }
                },
                {
                    title: 'Acciones', render: function (data, type, row) {
                        let btnEliminar = '';
                        let btnMdlMenu = '';


                        btnMdlMenu = `<button class='btn-EditProject btn btn-primary EditProject' data-id='${row.Id}'>` +
                            `<i class='fas fa-bars' style='font-size:18px'></i></button> `;
                        btnMdlMenu += `<button class='btn-EditDevice btn btn-primary EditDevice' data-id='${row.Id}'>` +
                            `<i class='fas fa-bars' style='font-size:18px'></i></button> `;


                        if (row.Activo == 1) {
                            btnEliminar = `<button class='btn-eliminar btn btn-danger eliminarUsuarios' data-id='${row.Id}'>` +
                                `<i class='fas fa-toggle-on' style='font-size:18px'></i></button> `;
                        } else {
                            btnEliminar = `<button class='btn-eliminar btn btn-warning ActivarUsuarios' data-id='${row.Id}'>` +
                                `<i class='fas fa-toggle-on' style='font-size:18px'></i></button> `;
                        }
                        btnMdlMenu += `<button class='btn-editar btn btn-primary editarUsuarios' data-id='${row.Id}'>` +
                            `<i class='fas fa-pencil-alt' style='font-size:18px'></i>` +
                            `</button> ` + btnEliminar;
     

                        return btnMdlMenu;

                    }
                }
            ],
            columnDefs: [
                { className: 'dt-center', 'targets': '_all' },
                { 'width': '20%', 'targets': [0, 1] },
            ],
            initComplete: function (settings, json) {
                tblUsuarios.on('click', '.eliminarUsuarios', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
                    $('#MDelete').modal('show');
                });
                tblUsuarios.on('click', '.ActivarUsuarios', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
                    $('#MActivate').modal('show');
                });
                
                tblUsuarios.on('click', '.EditProject', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
                    $('#MProject').modal('show');
                });
                tblUsuarios.on('click', '.EditDevice', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
                    $('#MDevice').modal('show');
                });
                tblUsuarios.on('click', '.editarUsuarios', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
                    $('#myUser').modal('show');
                });
                
            }
        });

        $('#tblUsuarios_length').css('margin-bottom', '5px');

        //$('#tblUsuarios_length').css('margin-left', '30px');
        $('#tblUsuarios_length').find('select').css('border', '1px solid #e5eaed');
        $('#tblUsuarios_length').find('select').css('border-radius', '.5rem');
        $('#tblUsuarios_length').find('select').css('padding', '.5rem .75rem');
        $('#tblUsuarios_length').find('select').css('color', '#5e6278');
        $('#tblUsuarios_length').find('select').css('margin-left', '10px');
        $('#tblUsuarios_length').find('select').css('margin-right', '10px');
        $('#tblUsuarios_length').find('select').css('outline', 'none');
        //$('#tblUsuarios_length').find('label').css('color', '#05a692');
        //$('#tblUsuarios_length').find('label').css('font-weight', '600');
        //$('#tblUsuarios_length').find('label').css('font-size', '15px');
        $('#tblUsuarios_paginate').css('text-align', 'right');
        $('#tblUsuarios_paginate').css('min-height', '30px');

        //$('#tblUsuarios_filter').find('label').css('color', '#05a692');
        //$('#tblUsuarios_filter').find('label').css('font-weight', '900');
        //$('#tblUsuarios_filter').find('label').css('font-size', '20px');
        $('#tblUsuarios_filter').find('label').css('order', '2');
        $('#tblUsuarios_filter').find('input').css('margin-left', '5px');
        $('#tblUsuarios_filter').find('input').css('border', '1px solid #e5eaed');
        $('#tblUsuarios_filter').find('input').css('border-radius', '.5rem');
        $('#tblUsuarios_filter').find('input').css('padding', '.5rem .75rem');
        $('#tblUsuarios_filter').find('input').css('outline', 'none');
        $('#tblUsuarios_filter').find('input').css('color', '#5e6278');
        $('#tblUsuarios_filter').find('input').css('font-size', '15px');
        $('#tblUsuarios_filter').css('text-align', 'right');
    }
    var initProject = function () {
        dtProject = tblProject.DataTable({
            language: 'dtDicEsp',
            ordering: true,
            paging: true,
            searching: true,
            bFilter: false,
            info: false,
            columns: [
                { data: 'Id', title: 'id', visible: false },
                { data: 'Usuario', title: 'user' },
                { data: 'Email', title: 'email' },
                {
                    title: 'name', render: (data, type, row) => {
                        let html = '';
                        html = row.Nombre + ' ' + row.ApellidoPaterno;
                        return html;
                    }
                },
                {
                    title: 'Acciones', render: function (data, type, row) {
                        let btnEliminar = '';
                        let btnMdlMenu = '';


                        btnMdlMenu = `<button class='btn-EditProject btn btn-primary EditProject' data-id='${row.Id}'>` +
                            `<i class='fas fa-bars' style='font-size:18px'></i></button> `;
                        btnMdlMenu += `<button class='btn-EditDevice btn btn-primary EditDevice' data-id='${row.Id}'>` +
                            `<i class='fas fa-bars' style='font-size:18px'></i></button> `;


                        if (row.Activo == 1) {
                            btnEliminar = `<button class='btn-eliminar btn btn-danger eliminarProject' data-id='${row.Id}'>` +
                                `<i class='fas fa-toggle-on' style='font-size:18px'></i></button> `;
                        } else {
                            btnEliminar = `<button class='btn-eliminar btn btn-warning ActivarProject' data-id='${row.Id}'>` +
                                `<i class='fas fa-toggle-on' style='font-size:18px'></i></button> `;
                        }
                        btnMdlMenu += `<button class='btn-editar btn btn-primary editarProject' data-id='${row.Id}'>` +
                            `<i class='fas fa-pencil-alt' style='font-size:18px'></i>` +
                            `</button> ` + btnEliminar;


                        return btnMdlMenu;

                    }
                }
            ],
            columnDefs: [
                { className: 'dt-center', 'targets': '_all' },
                { 'width': '20%', 'targets': [0, 1] },
            ],
            initComplete: function (settings, json) {
                tblUsuarios.on('click', '.eliminarProject', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
                    $('#MDelete').modal('show');
                });
                tblUsuarios.on('click', '.ActivarProject', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
                    $('#MDelete').modal('show');
                });
                tblUsuarios.on('click', '.editarProject', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
                    $('#MDelete').modal('show');
                });

            }
        });

        $('#tblProject_length').css('margin-bottom', '5px');

        //$('#tblUsuarios_length').css('margin-left', '30px');
        $('#tblProject_length').find('select').css('border', '1px solid #e5eaed');
        $('#tblProject_length').find('select').css('border-radius', '.5rem');
        $('#tblProject_length').find('select').css('padding', '.5rem .75rem');
        $('#tblProject_length').find('select').css('color', '#5e6278');
        $('#tblProject_length').find('select').css('margin-left', '10px');
        $('#tblProject_length').find('select').css('margin-right', '10px');
        $('#tblProject_length').find('select').css('outline', 'none');
        //$('#tblUsuarios_length').find('label').css('color', '#05a692');
        //$('#tblUsuarios_length').find('label').css('font-weight', '600');
        //$('#tblUsuarios_length').find('label').css('font-size', '15px');
        $('#tblProject_length').css('text-align', 'right');
        $('#tblProject_length').css('min-height', '30px');

        //$('#tblUsuarios_filter').find('label').css('color', '#05a692');
        //$('#tblUsuarios_filter').find('label').css('font-weight', '900');
        //$('#tblUsuarios_filter').find('label').css('font-size', '20px');
        $('#tblProject_filter').find('label').css('order', '2');
        $('#tblProject_filter').find('input').css('margin-left', '5px');
        $('#tblProject_filter').find('input').css('border', '1px solid #e5eaed');
        $('#tblProject_filter').find('input').css('border-radius', '.5rem');
        $('#tblProject_filter').find('input').css('padding', '.5rem .75rem');
        $('#tblProject_filter').find('input').css('outline', 'none');
        $('#tblProject_filter').find('input').css('color', '#5e6278');
        $('#tblProject_filter').find('input').css('font-size', '15px');
        $('#tblProject_filter').css('text-align', 'right');
    }
    var initDevice = function () {
        dtDevice = tblDevice.DataTable({
            language: 'dtDicEsp',
            ordering: true,
            paging: true,
            searching: true,
            bFilter: false,
            info: false,
            columns: [
                { data: 'Id', title: 'id', visible: false },
                { data: 'Usuario', title: 'user' },
                { data: 'Email', title: 'email' },
                {
                    title: 'name', render: (data, type, row) => {
                        let html = '';
                        html = row.Nombre + ' ' + row.ApellidoPaterno;
                        return html;
                    }
                },
                {
                    title: 'Acciones', render: function (data, type, row) {
                        let btnEliminar = '';
                        let btnMdlMenu = '';


                        if (row.Activo == 1) {
                            btnEliminar = `<button class='btn-eliminar btn btn-danger eliminarDevice' data-id='${row.Id}'>` +
                                `<i class='fas fa-toggle-on' style='font-size:18px'></i></button> `;
                        } else {
                            btnEliminar = `<button class='btn-eliminar btn btn-warning ActivarDevice' data-id='${row.Id}'>` +
                                `<i class='fas fa-toggle-on' style='font-size:18px'></i></button> `;
                        }
                        btnMdlMenu += `<button class='btn-editar btn btn-primary editarDevice' data-id='${row.Id}'>` +
                            `<i class='fas fa-pencil-alt' style='font-size:18px'></i>` +
                            `</button> ` + btnEliminar;


                        return btnMdlMenu;

                    }
                }
            ],
            columnDefs: [
                { className: 'dt-center', 'targets': '_all' },
                { 'width': '20%', 'targets': [0, 1] },
            ],
            initComplete: function (settings, json) {
                tblUsuarios.on('click', '.eliminarDevice', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
                    $('#MDelete').modal('show');
                });
                tblUsuarios.on('click', '.ActivarDevice', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
                    $('#MDelete').modal('show');
                });
                tblUsuarios.on('click', '.editarDevice', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
                    $('#MDelete').modal('show');
                });

            }
        });

        $('#tblDevice_length').css('margin-bottom', '5px');

        //$('#tblUsuarios_length').css('margin-left', '30px');
        $('#tblDevice_length').find('select').css('border', '1px solid #e5eaed');
        $('#tblDevice_length').find('select').css('border-radius', '.5rem');
        $('#tblDevice_length').find('select').css('padding', '.5rem .75rem');
        $('#tblDevice_length').find('select').css('color', '#5e6278');
        $('#tblDevice_length').find('select').css('margin-left', '10px');
        $('#tblDevice_length').find('select').css('margin-right', '10px');
        $('#tblDevice_length').find('select').css('outline', 'none');
        //$('#tblUsuarios_length').find('label').css('color', '#05a692');
        //$('#tblUsuarios_length').find('label').css('font-weight', '600');
        //$('#tblUsuarios_length').find('label').css('font-size', '15px');
        $('#tblDevice_length').css('text-align', 'right');
        $('#tblDevice_length').css('min-height', '30px');

        //$('#tblUsuarios_filter').find('label').css('color', '#05a692');
        //$('#tblUsuarios_filter').find('label').css('font-weight', '900');
        //$('#tblUsuarios_filter').find('label').css('font-size', '20px');
        $('#tblDevice_filter').find('label').css('order', '2');
        $('#tblDevice_filter').find('input').css('margin-left', '5px');
        $('#tblDevice_filter').find('input').css('border', '1px solid #e5eaed');
        $('#tblDevice_filter').find('input').css('border-radius', '.5rem');
        $('#tblDevice_filter').find('input').css('padding', '.5rem .75rem');
        $('#tblDevice_filter').find('input').css('outline', 'none');
        $('#tblDevice_filter').find('input').css('color', '#5e6278');
        $('#tblDevice_filter').find('input').css('font-size', '15px');
        $('#tblDevice_filter').css('text-align', 'right');
    }

    const postObtenerUsuarios = function () {
        funesperar(0, 'Porfavor espere unos segundos.');

        let parametros = {
            Activo: flexSwitchCheckChecked.prop('checked'),
            }
            const options = url + '/Home/postObtenerUsuarios';
            axios.post(options, parametros).then(function (response) {
                const result = response.data;
                if (result.SUCCESS == true) {
                    dtUsuarios.clear();
                    dtUsuarios.rows.add(result.ITEMS);
                    dtUsuarios.draw();

                } else {
                }
                funesperar(1, '');

            }).catch(function (error) {
                console.error(error);
            });
    }
    const funesperar = function (timer, texto) {
        let timerInterval
        Swal.fire({
            title: 'Alerta!',
            text: texto,
            icon: 'info',
            timer: timer,
            timerProgressBar: true,
            allowOutsideClick: false,
            didOpen: () => {
                Swal.showLoading()
                const b = Swal.getHtmlContainer().querySelector('b')
                timerInterval = setInterval(() => {
                    //b.textContent = Swal.getTimerLeft()
                }, 100)
            },
            willClose: () => {
                clearInterval(timerInterval)
            }
        }).then((result) => {
            /* Read more about handling dismissals below */
            if (result.dismiss === Swal.DismissReason.timer) {
            }
        })
    }

    String.prototype.format = function () {
        var args = arguments;
        return this.replace(/{([0-9]+)}/g, function (match, index) {
            // check if the argument is there
            return typeof args[index] == 'undefined' ? match : args[index];
        });
    };

    return {
        Inicializar: Inicializar,
    }
};