var AdminControllers = function () {
    const url = urlGlobal
    const tblUsuarios = $('#tblUsuarios');
    let dtUsuarios;

    var Inicializar = function () {
        console.log('admin controller')
        functionListar();
    }
    const functionListar = function () {
        initUsuarios();

        postObtenerUsuarios();
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
                tblUsuarios.on('click', '.menuUsuarios', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();



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

    const postObtenerUsuarios = function () {
        funesperar(0, 'Porfavor espere unos segundos.');

            let parametros = {
            }
            const options = url + '/Home/postObtenerUsuarios';
            axios.post(options, parametros).then(function (response) {
                const result = response.data;
                if (result.SUCCESS == true) {
                    dtUsuarios.clear();
                    dtUsuarios.rows.add(result.ITEMS);
                    dtUsuarios.draw();
                    funesperar(1, '');

                } else {
                }
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