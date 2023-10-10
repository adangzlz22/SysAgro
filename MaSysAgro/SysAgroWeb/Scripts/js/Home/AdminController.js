var AdminControllers = function () {
    const url = urlGlobal
    const tblUsuarios = $('#tblUsuarios');
    let dtUsuarios;
    const tblProject = $('#tblProject');
    let dtProject;
    const tblDevice = $('#tblDevice');
    let dtDevice;
    const flexSwitchCheckChecked = $('#flexSwitchCheckChecked');
    const projectCheck = $('#projectCheck');
    
    const btnCancelarDesc = $('#btnCancelarDesc');
    const btnDesactivar = $('#btnDesactivar');
    const btnCancelarAct = $('#btnCancelarAct');
    const btnActivate = $('#btnActivate');
    const btnCancelar = $('#btnCancelar');
    const btnSave = $('#btnSave');
    
    const btnCancelarDis = $('#btnCancelarDis');
    const btnSaveDis = $('#btnSaveDis');
    
    
    const txtUser = $('#txtUser'); 
    const txtPass = $('#txtPass'); 
    const txtfirstname = $('#txtfirstname'); 
    const txtlastname = $('#txtlastname'); 
    const txtphone = $('#txtphone'); 
    const txtEmail = $('#txtEmail'); 
    const inpId = $('#inpId'); 
    
    const btnNuevo = $('#btnNuevo'); 
    const titleUSer = $('#titleUSer'); 
    
    const inpProject = $('#inpProject'); 

    const btnActivateEli = $('#btnActivateEli'); 
    const btnDesactivarEli = $('#btnDesactivarEli'); 
    const txtlabelMdelete = $('#txtlabelMdelete'); 
    const txtDescripcionEli = $('#txtDescripcionEli'); 
    const inpMdEleteElimin = $('#inpMdEleteElimin'); 

    const txtlabelMdeleteUser = $('#txtlabelMdeleteUser');
    const inpMdEleteEliminUser = $('#inpMdEleteEliminUser');
    const txtDescripcionEliUser = $('#txtDescripcionEliUser');
    const btnCancelarDescUser = $('#btnCancelarDescUser');
    const btnDesactivarEliUser = $('#btnDesactivarEliUser');
    const btnActivateEliUser = $('#btnActivateEliUser');

    var Inicializar = function () {
        console.log('admin controller')
        functionListar();
    }
    const functionListar = function () {
        initUsuarios();
        initProject();
        initDevice();

        postObtenerUsuarios(1);
        flexSwitchCheckChecked.change(function () {
            if (flexSwitchCheckChecked.prop('checked') == true) {
                postObtenerUsuarios(1);
            } else {
                postObtenerUsuarios(2);
            }
        })
        btnCancelarDesc.click(function () {
            $('#MDelete').modal('hide')
            
        });
        btnDesactivar.click(function () {
            
        });
        btnCancelarAct.click(function () {
            $('#MActivate').modal('hide')
            
        });
        btnActivate.click(function () {
            
        });
        btnCancelar.click(function () {
            $('#myUser').modal('hide')
        });
        btnSave.click(function () {
            postEditarUsuarios();
        });
        btnCancelarDis.click(function () {
            $('#btnCancelarDis').modal('hide')
            
        });
        btnSaveDis.click(function () {
            
        });
        btnNuevo.click(function () {
            $('#myUser').modal('show');
            inpId.val(0);
            txtUser.val('');
            txtPass.val('');
            txtfirstname.val('');
            txtlastname.val('');
            txtphone.val('');
            txtEmail.val('');
        })
        projectCheck.change(function () {
            if (projectCheck.prop('checked') == true)  {
                postObtenerProjectosUsuarios(inpProject.val(), 1);
            } else {
                postObtenerProjectosUsuarios(inpProject.val(), 2);
            }
        });
        
        btnActivateEli.click(function () {
            console.log(inpMdEleteElimin.val());
            postActivarDesProjectos(inpMdEleteElimin.val(),2);
        });
        btnDesactivarEli.click(function () {
            postActivarDesProjectos(inpMdEleteElimin.val(), 1);
        });

        btnDesactivarEliUser.click(function () {
            postActDescUsuarios(flexSwitchCheckChecked.prop('checked'));
        });
        btnActivateEliUser.click(function () {
            postActDescUsuarios(flexSwitchCheckChecked.prop('checked'));
        });
        btnCancelarDescUser.click(function () {
            $('#MDeleteEliminarUser').modal('hide');

        });
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
                       
                        
                        btnMdlMenu = `<button class='btn-EditProject btn btn-primary EditProject' style='padding:0.3rem 0.8rem' data-id='${row.Id}'>` +
                            `<i class='fa-solid fa-map-location-dot' style='font-size:18px'></i></button> `;
                        btnMdlMenu += `<button class='btn-EditDevice btn btn-primary EditDevice' style='padding:0.3rem 0.8rem' data-id='${row.Id}'>` +
                            `<i class='fa-solid fa-tablet-screen-button' style='font-size:18px'></i></button> `;


                        if (row.Activo == 1) {
                            btnEliminar = `<button class='btn-eliminar btn btn-danger eliminarUsuarios' style='padding:0.3rem 0.8rem' data-id='${row.Id}'>` +
                                `<i class='fas fa-toggle-on' style='font-size:18px'></i></button> `;
                        } else {
                            btnEliminar = `<button class='btn-eliminar btn btn-warning ActivarUsuarios' style='padding:0.3rem 0.8rem' data-id='${row.Id}'>` +
                                `<i class='fas fa-toggle-on' style='font-size:18px'></i></button> `;
                        }
                        btnMdlMenu += `<button class='btn-editar btn btn-primary editarUsuarios' style='padding:0.3rem 0.8rem' data-id='${row.Id}'>` +
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
                    $('#MDeleteEliminarUser').modal('show');
                    txtlabelMdeleteUser.val('Desactivate User');
                    inpMdEleteEliminUser.val(rowData.Id);
                    txtDescripcionEliUser.val('Are you sure you want to desactivate this user?');
                });
                tblUsuarios.on('click', '.ActivarUsuarios', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
                    $('#MDeleteEliminarUser').modal('show');
                    txtlabelMdeleteUser.val('Activate User');
                    inpMdEleteEliminUser.val(rowData.Id);
                    txtDescripcionEliUser.val('Are you sure you want to activate this user?');
                });
                
                tblUsuarios.on('click', '.EditProject', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
                    $('#MProject').modal('show');
                    inpProject.val(rowData.Id);
                    postObtenerProjectosUsuarios(inpProject.val(),1);
                });
                tblUsuarios.on('click', '.EditDevice', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
               

                    $('#MDevice').modal('show');
                });
                tblUsuarios.on('click', '.editarUsuarios', function () {
                    const rowData = dtUsuarios.row($(this).closest('tr')).data();
                    $('#myUser').modal('show');
                    inpId.val(rowData.Id);
                    txtUser.val(rowData.Usuario);
                    txtPass.val(rowData.Contrasena);
                    txtfirstname.val(rowData.Nombre);
                    txtlastname.val(rowData.ApellidoPaterno);
                    txtphone.val(rowData.Telefono);
                    txtEmail.val(rowData.Email);
                    titleUSer.text('Edit User');
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

    const postObtenerUsuarios = function (Activo) {
        funesperar(0, 'Please wait a few seconds.');

        let parametros = {
            Activo: flexSwitchCheckChecked.prop('checked'),
            }
            const options = url + '/Home/postObtenerUsuarios';
            axios.post(options, parametros).then(function (response) {
                const result = response.data;
                    console.log(result.ITEMS)
                    dtUsuarios.clear();
                    dtUsuarios.rows.add(result.ITEMS);
                    dtUsuarios.draw();

                
                funesperar(1, '');

            }).catch(function (error) {
                console.error(error);
            });
    }
    const postEditarUsuarios = function () {
        funesperar(0, 'Please wait a few seconds.');

        let parametros = {
            Id: inpId.val(),
            Usuario: txtUser.val(),
            Contrasena: txtPass.val(),
            Nombre: txtfirstname.val(),
            ApellidoPaterno: txtlastname.val(),
            Telefono: txtphone.val(),
            Email: txtEmail.val(),
        }
        const options = url + '/Home/postEditarUsuarios';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
                console.log(result.ITEMS)
                
            $('#MDeleteEliminarUser').modal('hide');

           
            funesperar(1, '');
            if (flexSwitchCheckChecked.prop('checked') == true) {
                postObtenerUsuarios(1);
            } else {
                postObtenerUsuarios(2);
            }
        }).catch(function (error) {
            console.error(error);
        });
    }
    
    const postActDescUsuarios = function (Activo) {
        funesperar(0, 'Please wait a few seconds.');

        let parametros = {
            Id: inpId.val(),
            Activo: Activo == true ? false : true,
           
        }
        const options = url + '/Home/postActDescUsuarios';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            console.log(result.ITEMS)

            $('#myUser').modal('hide');
            funesperar(1, '');
            if (flexSwitchCheckChecked.prop('checked') == true) {
                postObtenerUsuarios(1);
            } else {
                postObtenerUsuarios(2);
            }
        }).catch(function (error) {
            console.error(error);
        });
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
                { data: 'ProjectID', title: 'ProjectID', visible: false },
                { data: 'ProjectName', title: 'Project name' },
                { data: 'Latitud_1', title: 'Latitud' },
                { data: 'Longitud_1', title: 'Longitud' },
                {
                    title: 'Acciones', render: function (data, type, row) {
                        let btnEliminar = '';
                        let btnMdlMenu = '';


             


                        if (row.Activo == 1) {
                            btnEliminar = `<button class='btn-eliminar btn btn-danger eliminarProject' data-id='${row.ProjectID}'>` +
                                `<i class='fas fa-toggle-on' style='font-size:18px'></i></button> `;
                        } else {
                            btnEliminar = `<button class='btn-eliminar btn btn-warning activarProject' data-id='${row.ProjectID}'>` +
                                `<i class='fas fa-toggle-on' style='font-size:18px'></i></button> `;
                        }
                        btnMdlMenu += `` + btnEliminar;


                        return btnMdlMenu;

                    }
                }
            ],
            columnDefs: [
                { className: 'dt-center', 'targets': '_all' },
                { 'width': '20%', 'targets': [0, 1] },
            ],
            initComplete: function (settings, json) {
                tblProject.on('click', '.eliminarProject', function () {
                    const rowData = dtProject.row($(this).closest('tr')).data();
                    $('#MDelete').modal('show');
                    txtlabelMdelete.text('Desactivate Project');
                    txtDescripcionEli.text('Are you sure you want to desactivate this Project?');
                    btnActivateEli.css('display', 'none');
                    btnDesactivarEli.css('display', 'block');
                    inpMdEleteElimin.val(rowData.ProjectID);

                });
                tblProject.on('click', '.activarProject', function () {
                    const rowData = dtProject.row($(this).closest('tr')).data();
                    $('#MDelete').modal('show');
                    txtlabelMdelete.text('Activate Project');
                    txtDescripcionEli.text('Are you sure you want to activate this Projec?');
                    btnActivateEli.css('display', 'block');
                    btnDesactivarEli.css('display', 'none');
                    inpMdEleteElimin.val(rowData.ProjectID);
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
    const postObtenerProjectosUsuarios = function (ClientID,Activo) {
        funesperar(0, 'Please wait a few seconds.');

        let parametros = {
            ClientID: ClientID,
            Activo: Activo,
        }
        const options = url + '/Home/postObtenerProjectosUsuarios';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            if (result.SUCCESS == true) {
                console.log(result.ITEMS)
                dtProject.clear();
                dtProject.rows.add(result.ITEMS);
                dtProject.draw();

            } else {
            }
            funesperar(1, '');

        }).catch(function (error) {
            console.error(error);
        });
    }
    const postActivarDesProjectos = function (ProjectID, Activo) {
        let parametros = {
            //ProjectID : txtDispositivo.val(),
            ProjectID: ProjectID,
            Activo: Activo == 1 ? 2 : 1
        }
        const options = url + '/Home/postActivarDesProjectos';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            postObtenerProjectosUsuarios(inpProject.val(),Activo);
            $('#MDelete').modal('hide');

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