var MapaController = function (ClientID, projectId) {
    const url = urlGlobal;
    var arrProject = [];
    var arrDevice = [];
    var player_id = null;
    var longitud = 41.991751465614946;
    var latitud = 0.15312031851124058;
    var markerDeviceGroup = null;
    var markers = [];

    var map = L.map('map').setView([longitud, latitud], 10.3);

    var Inicializar = function () {
        console.log(projectId)
        console.log(url);
        console.log('hola soy MapaControllers');
        init_map();
        config();
        //campos();
        getProjects();
        handleDeviceForProject();
        //showDeviceInMap();
        handleDeviceForProjectInMap();
        handleAddProject();
        handleAssignDeviceToProject();
    }

    const init_map = function () {
        
        /*L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);*/

        //google satellite
        googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 30,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        }).addTo(map);
    }

    const config = function () {
        /*var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        var drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems
            },
            draw: {
                polygon: true,
                marker: true,
                polyline: false,
                rectangle: false,
                circle: false
            }
        });
        map.addControl(drawControl);

         //Manejadores de eventos para guardar el polígono dibujado
         map.on(L.Draw.Event.CREATED, function (event) {
            var layer = event.layer;
            console.log(layer);
            drawnItems.addLayer(layer);
         });*/

        // Manejador de eventos para agregar marcadores al hacer clic en el mapa
        
    }

    const campos = function () {
        /*var polygon = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(map);*/
    }

    const toggleMarker = function (index) {
        /*if (map.hasLayer(markers[index])) {
            map.removeLayer(markers[index]);
        } else {
            map.addLayer(markers[index]);
        }*/
    }

    const getProjects = async () => {
        try {
            const parametros = {
                ClientID: ClientID,
                Activo: 1,
            };
            const options = `${url}/Home/postObtenerProjectos`;
            const response = await axios.post(options, parametros);
            const result = response.data;
            const divProyectos = document.getElementById("lista_proyectos");

            if (result.SUCCESS && result.ITEMS.length > 0) {
                arrProject = result.ITEMS;

                const items = sortItems(arrProject).map((v, index) => {
                    return `<div href="#" class="col-sm-12 mb-4">
                                <div class="card shadow-sm">
                                      <div class="card-body mt-5 mb-5 cursor-pointer project-device" data-order="${index}">
                                            <h3 class="mb-5">${v.ProjectName}</h3>
                                                <ul class="list-group list-group-flush" id="card-device-${v.ProjectID}">
                                            </ul>
                                      </div>
                                      ${(v.ProjectID === projectId ? 
                                            `<a href="#" data-bs-toggle="modal" data-bs-target="#myModal">
                                                <div class="card-body text-center" style="border-top: 1px dashed #7ab37f">
                                                    <i class="fa fa-plus"></i> add device
                                                </div>
                                            </a>` : ''
                                      )}
                                </div>
                          </div>`;
                });

                divProyectos.innerHTML = items.join('');
                getDeveceForProjectDefault();
            } else {
                divProyectos.innerHTML = `
                    <div class="alert alert-warning" role="alert">
                      No se encontraron proyectos registrados
                    </div>`;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const sortItems = (items) => {
        const index = items.findIndex(item => item.ProjectID === projectId);

        if (index !== -1) {
            const elementToMove = items.splice(index, 1)[0];
            items.unshift(elementToMove);
        }

        return items;
    }

    const handleDeviceForProject = () => {
        document.getElementById("lista_proyectos").addEventListener('click', async (e) => {
            e.preventDefault();

            const order = e.target.closest('.project-device').dataset.order;
            const project = arrProject[order];

            if (project.ProjectID != projectId) {
                location.href = `Mapa?projectId=${project.ProjectID}`;
            }
           
            /*clearDeviceInMap();

            const order = e.target.closest('.project-device').dataset.order;
            const project = arrProject[order];

            latitud = project.Latitud_1;
            longitud = project.Longitud_1;

            map.flyTo([latitud, longitud], 15, {
                animate: true,
                duration: 2
            });

            const options = `${url}/Home/postObtenerDispositivosPorCliente`;
            const parametros = {
                ProjectID: project.ProjectID
            };

            try {
                const response = await axios.post(options, parametros);
                const result = response.data;

                if (result.SUCCESS && result.ITEMS.length > 0) {
                    arrDevice = result.ITEMS;
                    showDeviceForAssign();
                    showDeviceAssigned(project.ProjectID);
                } else {
                    console.log("No se encontraron dispositivos");
                }
            } catch (error) {
                console.error(error);
            }*/
        });
    };

    const getDeveceForProjectDefault = async () => {
        const order = 0;
        const project = arrProject[order];

        latitud = project.Latitud_1;
        longitud = project.Longitud_1;

        map.flyTo([latitud, longitud], 15, {
            animate: true,
            duration: 2
        });

        const options = `${url}/Home/postObtenerDispositivosPorCliente`;
        const parametros = {
            ProjectID: project.ProjectID
        };

        try {
            const response = await axios.post(options, parametros);
            const result = response.data;

            if (result.SUCCESS && result.ITEMS.length > 0) {
                arrDevice = result.ITEMS;
                showDeviceForAssign();
                showDeviceAssigned(project.ProjectID);
            } else {
                console.log("No se encontraron dispositivos");
            }
        } catch (error) {
            console.error(error);
        }
    }

    const showDeviceAssigned = (ProjectID) => {
        const divDispositivos = document.getElementById(`card-device-${ProjectID}`);
        if (divDispositivos) {
            const items = arrDevice
                .filter(element => element.Longitud !== 0)
                .map((v, index) => `<li class="list-group-item">Device ${v.player_id}</li>`);

            divDispositivos.innerHTML = items.join('');
        } else {
            console.log(`Element with id "card-device-${ProjectID}" not found.`);
        }
    };

    const showDeviceForAssign = function () {
        var items = [], divDispositivos = $("#lista-dispositivos").empty();
        arrDevice.filter(element => { return element.Longitud === 0 }).map((v, index) => {
            items.push(`<button class="btn btn-sm btn-secondary px-2 selecction-device" type="button" value="${v.player_id}">Device ${v.player_id}</button>`);
        });

        divDispositivos.append(items.join(''));
        showDeviceInMap();
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
        if (markerDeviceGroup != null) {
            markerDeviceGroup.clearLayers();
        }
    }

    const handleDeviceForProjectInMap = function () {
        
        $('#lista-dispositivos').on('click', '.selecction-device', function (e) {
            e.preventDefault();
            const value = $(this).val();
            player_id = value;
        });

        map.on('click', function (e) {
            if (player_id != null) {
                var newMarker = L.marker(e.latlng);
                newMarker.bindPopup(`Device ${player_id}`).openPopup().addTo(map);
                // Agrega el nuevo marcador al array

                var lat = newMarker._latlng.lat;
                var lng = newMarker._latlng.lng;

                const options = url + `/Home/postAsignarDispositivoLocalizacion`;
                const parametros = {
                    player_id: player_id,
                    ClientID: ClientID,
                    ProjectID: projectId,
                    Longitud_1: lng,
                    Latitud_1: lat
                }

                axios.post(options, parametros).then(function (response) {
                    const result = response.data;

                    if (result.SUCCESS == true) {
                        markers.push(newMarker);
                        // Agrega un botón para ocultar el marcador individualmente
                        //newMarker.bindPopup(`Device ${player_id}`).openPopup().addTo(map);
                        location.reload();
                        //newMarker.bindPopup('Device ${player_id} <button onclick="toggleMarker(' + (markers.length - 1) + ')">Mostrar/Ocultar</button>').openPopup();
                    } else {
                        console.log("Ocurrio un error");
                    }
                }).catch(function (error) {
                    console.error(error);
                });

                player_id = null;
            } else {
                console.log("Debe seleccionar un dispositivo");
            }
        });
    }

    const handleAddProject = function (form) {
        $("#form-project").submit(function (form) {
            form.preventDefault();

            const message = document.getElementById("message-modal-project");

            var formData = $(this).serializeArray().reduce(function (obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});

            const options = url + '/Home/postAddProjectos';

            formData.ClientID = ClientID;

            axios.post(options, formData).then(function (response) {
                console.log(response);
                const result = response.data;
                if (result.SUCCESS == true) {
                    type = "success";
                    handleAddProject();
                } else {
                    type = "warning";
                }

                message.innerHTML = `
                <div class="alert alert-${type}" role="alert">
                    PLAYER ${formData.player_id}: ${result.MESSAGE}
                </div>`;

                $("#ProjectName").val("");

                setTimeout(() => {
                    $('#myModalProject').modal('hide');
                }, 2000);
            }).catch(function (error) {
                console.error(error);
            });
        });
    }

    const handleAssignDeviceToProject = () => {
        $("#form-device").submit(function (form) {
            form.preventDefault();

            const message = document.getElementById("message-modal-device");

            var formData = $(this).serializeArray().reduce(function (obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});

            const options = url + '/Home/postBuscarDispositivoPorProyecto';

            formData.ClientID = ClientID;
            formData.ProjectID = projectId;

            axios.post(options, formData).then(function (response) {
                const result = response.data;
                if (result.SUCCESS == true) {
                    type = "success ";
                    getDeveceForProjectDefault();
                } else {
                    type = "warning";
                }

                message.innerHTML = `
                <div class="alert alert-${type}" role="alert">
                    PLAYER ${formData.player_id}: ${result.MESSAGE}
                </div>`;

                $("#player_id").val("");

                setTimeout(() => {
                    $('#myModal').modal('hide');
                }, 2000);
                
            }).catch(function (error) {
                console.error(error);
            });
        });
    }

    return {
        Inicializar: Inicializar,
    }
};
