var ProjectController = function (ClientID) {
    const url = urlGlobal;

    var arrProject = [];
    var agregarinputTitulo = $('#agregarinputTitulo');
    var btnSave = $('#btnSave');
    var flexSwitchCheckChecked = $('#flexSwitchCheckChecked');
    var btnActivar = $('#btnActivar');
    var btnEliminar = $('#btnEliminar');
    var btnEditar = $('#btnEditar');
    var idEstatus = 1;
    
    var Inicializar = function () {
        console.log(url);
        console.log('hola soy ProjectControllers');
        getProyects(1);

        btnEditar.click(function () {
            if (idEstatus == 1) {
                idEstatus = 2;
                $('.projectName').css('display', '')
                $('.projectNameText').css('display', 'none')
                $('.btnprojectName').css('display', '')
                
            } else {
                $('.projectName').css('display', 'none')
                $('.btnprojectName').css('display', 'none')
                $('.projectNameText').css('display', '')
                idEstatus = 1;
            }
        });

        btnSave.click(function () {
            newProject();
        });
        btnEliminar.click(function () {
            if ($('.CloseButton').attr('data-tipo') == 1) {
                $('.CloseButton').css('display', 'inline');
                $('.CloseButton').css('width', '30px');
                $('.CloseButton').css('padding', '2px 7px');
                $('.CloseButton').css('border-radius', '20px');
                $('.CloseButton').css('top', '16px');
                $('.CloseButton').css('position', 'relative');
                $('.CloseButton').css('left', '10px');
                $('.CloseButton').css('z-index', '1');
                $('.CloseButton').attr('data-tipo', 2);
                $('.CloseButton').addClass('btn-danger');
                $('.CloseButton').removeClass('btn-success');
            } else {
                $('.CloseButton').css('display', 'none');
                $('.CloseButton').attr('data-tipo', 1);
            }
        })
        btnActivar.click(function () {
            if ($('.CloseButton').attr('data-tipo') == 1) {
                $('.CloseButton').css('display', 'inline');
                $('.CloseButton').css('width', '30px');
                $('.CloseButton').css('padding', '2px 7px');
                $('.CloseButton').css('border-radius', '20px');
                $('.CloseButton').css('top', '16px');
                $('.CloseButton').css('z-index', '1');
                $('.CloseButton').css('position', 'relative');
                $('.CloseButton').css('left', '10px');
                $('.CloseButton').attr('data-tipo', 2);
                $('.CloseButton').removeClass('btn-danger');
                $('.CloseButton').addClass('btn-success');
            } else {
                $('.CloseButton').css('display', 'none');
                $('.CloseButton').attr('data-tipo', 1);
            }
        })
        flexSwitchCheckChecked.change(function () {
            console.log(flexSwitchCheckChecked.prop('checked'));
            btnActivar.css('padding', '.3rem .9rem');
            btnActivar.css('font-size', '18px');
            btnEliminar.css('padding', '.3rem .9rem');
            btnEliminar.css('font-size', '18px');

            if (flexSwitchCheckChecked.prop('checked') == true) {
                btnActivar.css('display', 'none');
                btnEliminar.css('display', '');
                btnEliminar.attr('data-Activo', 1)
                getProyects(1);
            } else {
                btnActivar.css('display', '');
                btnEliminar.css('display', 'none');
                btnActivar.attr('data-Activo', 2)
                getProyects(2)
            }
        });
    }

    const getProyects = function (Activo) {
        let parametros = {
            //ProjectID : txtDispositivo.val(),
            ClientID: ClientID,
            Activo: Activo,
        }
        const options = url + '/Home/postObtenerProjectos';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            const items = [], divProyectos = $("#lista_proyectos").empty();

            if (result.SUCCESS == true) {
                if (result.ITEMS.length > 0) {

                    arrProject = result.ITEMS;

                    arrProject.map((v, index) => {
                        items.push(
                            `<div class="col-lg-3 col-sm-12 col-md-4 mb-3">
<div class="row">
<div class="col-lg-12 col-md-12 col-sm-12" style="text-align:right">
<button style="display:none;" data-tipo="1" class="btn btn-danger CloseButton" id="btnEliminar${v.ProjectID}"><i class="fa fa-times-circle" aria-hidden="true"></i></button>
</div>
</div>
                                 <a href="Mapa?projectId=${v.ProjectID}">
                                    <div class="card box" style="border: 1px solid #7ab37f; height:200px;text-align:left">
                                        <div class="card-body mt-5 mb-5 text-left">
                               
                                            <img src="/Content/img/ubicacion.png" style="width:50px" class="mb-3" />
                              
                                            <br />
                                            <h2 style="color:#7ab37f; font-size:25px" class='projectNameText'>${v.ProjectName}</h2>
                                            <input id="txtProjectName${v.ProjectID}" type='text' class='form-control projectName mb-3' value='${v.ProjectName}' style='display:none;'>
                                        <div class='text-right'>
<buttom id="btnCambiarNombre${v.ProjectID}" class="btn btn-primary btnprojectName" style="padding: .3rem .9rem; font-size: 18px; display: none; font-weight:800"><b><i class="fa-solid fa-save"></i></b></buttom>
</div>

                                          
                                            <!--<h4>Short project description</h4>-->
                                        </div>
                                    </div></a>
                            </div>  `);
                    });

                    divProyectos.append(items.join(''));
                    for (var i = 0; i < result.ITEMS.length; i++) {
                        let ProjectID = result.ITEMS[i].ProjectID;
                        $('#btnEliminar' + ProjectID).click(function () {

                            let Activo = flexSwitchCheckChecked.prop('checked') == true ? 1 : 2;
                            console.log(ProjectID, Activo);

                            postActivarDesProjectos(ProjectID, Activo);
                        });
                        $('#btnCambiarNombre' + ProjectID).click(function () {
                            let inputtext = $(`#txtProjectName${ProjectID}`).val();
                            console.log(inputtext)
                            postUpdateProjectos(ProjectID, inputtext);
                        });
                    }

                } else {

                    divProyectos.append(
                        `<div class="alert alert-warning" role="alert">
                            No se encontraron proyectos registrados
                        </div>`
                    );
                }
            } else {

            }

        }).catch(function (error) {
            console.error(error);
        });
    }

    const getDeviceForProject = function () {

        $('#lista_proyectos').on('click', '.project-device', function (e) {
            e.preventDefault();

            clearDeviceInMap();

            let order = $(this).data('order');
            let project = arrProject[order];

            latitud = project.Latitud_1;
            longitud = project.Longitud_1;

            map.flyTo([latitud, longitud], 15, {
                animate: true,
                duration: 2 // in seconds
            });

            const options = url + `/Home/postObtenerDispositivosPorProjecto`;
            var parametros = {
                ProjectID: project.ProjectID
            };

            axios.post(options, parametros).then(function (response) {
                const result = response.data;
                const items = [], divDispositivos = $("#lista-dispositivos").empty();

                if (result.SUCCESS == true) {
                    if (result.ITEMS.length > 0) {

                        arrDevice = result.ITEMS;

                        arrDevice.filter(element => { return element.Longitud === 0 }).map((v, index) => {
                            items.push(`<button class="btn btn-sm btn-secondary px-2 selecction-device" type="button" value="${index}">Device ${v.player_id}</button>`);
                        });

                        divDispositivos.append(items.join(''));

                        showDeviceInMap();
                    } else {
                        console.log("No se encontraron dispositivos");
                    }
                } else {

                }
            }).catch(function (error) {
                console.error(error);
            });
        });
    }

    const showDeviceInMap = function () {
        // Filtrar dispositivos con Longitud y Latitud válidas
        var arrDevicesAsignados = arrDevice.filter(element => element.Longitud !== 0 && element.Latitud !== 0);
        var markerClusterGroup = L.markerClusterGroup();

        arrDevicesAsignados.forEach(device => {
            var marker = L.marker([device.Latitud, device.Longitud]);
            marker.bindPopup(`Dispositivo ${device.player_id}`);
            markerClusterGroup.addLayer(marker);
        });

        map.addLayer(markerClusterGroup);
        markerDeviceGroup = markerClusterGroup;
    }

    const clearDeviceInMap = function () {
        markerDeviceGroup.clearLayers();
    }

    const setDeviceForProject = function () {
        $('#lista-dispositivos').on('click', '.selecction-device', function (e) {
            e.preventDefault();
            const order = $(this).val();
            player_id = arrDevice[order].player_id;
        });
    }

    const newProject = function () {
        let parametros = {
            ProjectName: agregarinputTitulo.val(),
            ClientID: ClientID
        };
            const options = url + '/Home/postAddProjectos';

            axios.post(options, parametros).then(function (response) {
                const result = response.data;
                if (result.SUCCESS == true) {
                    getProyects(1);
                } else {
                    console.log("Ocurrio un error");
                }
            }).catch(function (error) {
                console.error(error);
            });
    }

    const assignDeviceToProject = function (form) {
        $("#form-device").submit(function (form) {
            form.preventDefault();

            var formData = $(this).serializeArray().reduce(function (obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});

            const options = url + '/Home/postAddProjectos';

            formData.ClientID = ClientID;

            axios.post(options, formData).then(function (response) {
                console.log(response);
                /*const result = response.data;
                if (result.SUCCESS == true) {
                   
                } else {
                    console.log("Ocurrio un error");
                }*/
            }).catch(function (error) {
                console.error(error);
            });
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
            getProyects(Activo);

        }).catch(function (error) {
            console.error(error);
        });
    }
    
    const postUpdateProjectos = function (ProjectID, ProjectName) {
        let parametros = {
            //ProjectID : txtDispositivo.val(),
            ProjectID: ProjectID,
            ProjectName: ProjectName
        }
        const options = url + '/Home/postUpdateProjectos';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            idEstatus = 1;
            getProyects(1);

        }).catch(function (error) {
            console.error(error);
        });
    }
    return {
        Inicializar: Inicializar,
    }
};

