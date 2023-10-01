var MapaController = function (ClientID, projectId) {
    const url = urlGlobal;
    var arrProject = [];
    var arrDevice = [];
    var player_id = null;
    var longitud = 41.991751465614946;
    var latitud = 0.15312031851124058;
    var markerDeviceGroup = null;

    var map = L.map('map').setView([longitud, latitud], 10.3);// 41.2919797826564050, 1.8535724466127812

    var Inicializar = function () {
        console.log(projectId)
        console.log(url);
        console.log('hola soy MapaControllers');
        init_map();
        config();
        //campos();
        getProyects();
        getDeviceForProject();
        showDeviceInMap();
        setDeviceForProject();
        newProject();
        assignDeviceToProject();
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
        var markers = [];

        map.on('click', function (e) {
            if (player_id != null) {
                var newMarker = L.marker(e.latlng).addTo(map);
                newMarker.bindPopup('Nuevo Marcador').openPopup();
                // Agrega el nuevo marcador al array

                var lat = newMarker._latlng.lat;
                var lng = newMarker._latlng.lng;

                const options = url + `/Home/setDeviceDesignation`;
                const parametros = {
                    ProjectID: id,
                    Longitud: lng,
                    Latitud: lat
                }

                axios.post(options, parametros).then(function (response) {
                    const result = response.data;

                    if (result.SUCCESS == true) {
                        markers.push(newMarker);
                        // Agrega un botón para ocultar el marcador individualmente
                        newMarker.bindPopup('Nuevo Marcador <button onclick="toggleMarker(' + (markers.length - 1) + ')">Mostrar/Ocultar</button>').openPopup();
                    } else {
                        console.log("Ocurrio un error");
                    }
                }).catch(function (error) {
                    console.error(error);
                });


            } else {
                console.log("Debe seleccionar un dispositivo");
            }
        });
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

    const getProyects = function () {
        let parametros = {
            //ProjectID : txtDispositivo.val(),
            ClientID: ClientID,
            Activo: 1,
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
                            `<div href="#" class="col-sm-12 mb-4">
                            <div class="card shadow-sm">
                                <div class="card-body mt-5 mb-5 project-device" data-order="${index}">
                                    <h3 class="mb-5">${v.ProjectName} ${v.ProjectID}</h3>
                                    <ul class="list-group list-group-flush">
                                        <li class="list-group-item">First element</li>
                                        <li class="list-group-item">Second element</li>
                                        <li class="list-group-item">Third element</li>
                                    </ul>
                                </div>
                                <a href="#" data-bs-toggle="modal" data-bs-target="#myModal">
                                    <div class="card-body text-center" style="border-top: 1px dashed #7ab37f">
                                        <i class="fa fa-plus"></i> add device
                                    </div>
                                </a>
                            </div>
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

    const newProject = function (form) {
        $("#form-project").submit(function (form) {
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

