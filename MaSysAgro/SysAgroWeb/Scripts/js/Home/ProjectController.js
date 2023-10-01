var ProjectController = function (ClientID) {
    const url = urlGlobal;

    var arrProject = [];
    var agregarinputTitulo = $('#agregarinputTitulo');
    var btnSave = $('#btnSave');
    
    var Inicializar = function () {
        console.log(url);
        console.log('hola soy ProjectControllers');
        getProyects(1);
        btnSave.click(function () {
            newProject();
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
                            `<div class="col-lg-3 col-sm-12 col-md-4 mb-3" style="height:100%">
                                <a href="Mapa?projectId=${v.ProjectID}">
                                    <div class="card box" style="border: 1px solid #7ab37f; height:200px;">
                                        <div class="card-body mt-5 mb-5 text-left">
                                            <img src="/Content/img/ubicacion.png" style="width:50px" class="mb-3" />
                                            <br />
                                            <h2 style="color:#7ab37f; font-size:30px">${v.ProjectName}</h2>
                                            <!--<h4>Short project description</h4>-->
                                        </div>
                                    </div>
                                </a>
                            </div>`);
                    });

                    divProyectos.append(items.join(''));
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

    return {
        Inicializar: Inicializar,
    }
};

