var MapaController = function (ClientID, projectId) {
    const url = urlGlobal;
    var arrProject = [];
    var arrDevice = [];
    var player_id = null;
    var longitud = -3.742641;
    var latitud = 40.320973;
    var markerDeviceGroup = null;
    var markers = [];
    var coordenadas = null;
    var drawControl = null;
    var drawControl2 = null;

    const btnGrande = $('#btnGrande');


    var map = L.map('map').setView([latitud, longitud], 10.3);

    var map2 = L.map('map-modal').setView([latitud, longitud], 7);
    var Inicializar = function () {
        btnGrande.click(function () {
                map.invalidateSize();
        });
        init_map();
        getProjects();
        handleDeviceForProject();
        //handleDeviceForDeleteInProject();
        //showDeviceInMap();
        handleDeviceForProjectInMap();
        handleAddProject();
        handleAssignDeviceToProject();
        AsignarListadoDePaises();
        handleSearch();
        handleModalMapProject();
        editPolygonToProject();
       // bigMap();
       // mapaChico();
    }

    const handleModalMapProject = () => {
        var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
        osm.addTo(map2);

        googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });

        googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });

        hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });

        var baseMaps = {
            "OSM": osm,
            'Google Street': googleStreets,
            "Google Satellite": googleSat,
            'Google hybrid': hybrid,
        };
        var overlayMaps = {

        };

        L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map2);
        $('#button-modal-map-project').on('click', function () {
            //L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map2);
         

            $("#myModalProjectMap").modal("show");

            setTimeout(function () {
                console.log("invalidateSize");
              
                map2.invalidateSize();
                addPolygonToProject();
            }, 900);
        });
    }

    const init_map = function () {
        var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });
        osm.addTo(map);

        googleStreets = L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });

        googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });

        hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });

        var baseMaps = {
            "OSM": osm,
            'Google Street': googleStreets,
            "Google Satellite": googleSat,
            'Google hybrid': hybrid,
        };

        var overlayMaps = {

        };

        L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
    }

    const addPolygonToProject = () => {

        var drawnItems = new L.FeatureGroup();
        map2.addLayer(drawnItems);

        if (drawControl == null) {
            drawControl = new L.Control.Draw({

                draw: {
                    polygon: true,
                    marker: false,
                    polyline: false,
                    rectangle: false,
                    circle: false
                }
            });
        }

        map2.addControl(drawControl);

        console.log(drawControl);
        //Manejadores de eventos para guardar el polígono dibujado
        map2.on(L.Draw.Event.CREATED, (event) => {
            const layer = event.layer;
            drawnItems.addLayer(layer);
            const coordinates = layer._latlngs[0];

            coordenadas = coordinates;

            $("#myModalProjectMap").modal("show");
        });
    }

    const editPolygonToProject = () => {

        var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        if (drawControl2 == null) {
            drawControl2 = new L.Control.Draw({
                //edit: {
                //    featureGroup: drawnItems
                //},
                draw: {
                    polygon: true,
                    marker: false,
                    polyline: false,
                    rectangle: false,
                    circle: false
                }
            });
        }

        map.addControl(drawControl2);
        //Manejadores de eventos para guardar el polígono dibujado
        map.on(L.Draw.Event.CREATED, (event) => {
            const layer = event.layer;
            drawnItems.addLayer(layer);
            const coordinates = layer._latlngs[0];

            coordenadas = coordinates;

            const options = url + '/Home/postUpdateProjectosCoodenadas';
            const center = calculateCenterCoordinates(coordenadas);

            const primeraLatitud = center.lat;
            const primeraLongitud = center.lng;

            const parametros = {
                Cordenadas: JSON.stringify(coordenadas),
                ProjectID: projectId,
                Longitud_1: primeraLongitud,
                Latitud_1: primeraLatitud
            }
            funesperar(0, 'Please wait a few seconds.');
            axios.post(options, parametros).then(function (response) {
                //if (response.SUCCESS == true) {
                //   window.location.href = `Mapa?projectId=${projectId}`;
                //} else {
                //    info("System Messages", "(Connection error) An error occurred while trying to carry out this processo", "error");
                //}
                window.location.href = `Mapa?projectId=${projectId}`;
                funesperar(1, '');
            }).catch(function (error) {
                info("System Messages", error, "error");
            });
        });
    }

    const calculateCenterCoordinates = (coordenadas) => {
        var sumLat = 0;
        var sumLng = 0;

        for (var i = 0; i < coordenadas.length; i++) {
            sumLat += coordenadas[i].lat; // Sumar las latitudes
            sumLng += coordenadas[i].lng; // Sumar las longitudes
        }

        var centroLat = sumLat / coordenadas.length; // Calcular el promedio de latitudes
        var centroLng = sumLng / coordenadas.length; // Calcular el promedio de longitudes

        return { lat: centroLat, lng: centroLng };
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
                                      ${(v.ProjectID === projectId && v.Cordenadas != null ?
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
                addExistingPolygonIntoMap();
            } else {
                divProyectos.innerHTML = `
                    <div class="alert alert-warning" role="alert">
                     No registered projects found
                    </div>`;
            }
        } catch (error) {
            console.error(error);
        }
    };

    const addExistingPolygonIntoMap = function () {
        var _default = arrProject.filter(x => x.ProjectID == projectId);
        if (_default[0].Cordenadas != '' && _default[0].Cordenadas != null) {
            var project = _default[0];
            var Cordenadas = JSON.parse(project.Cordenadas);

            const coordenadas = Cordenadas.map(item => {
                return {
                    "lat": item.lat,
                    "lng": item.lng
                };
            });
            // Crea una capa de polígono utilizando las coordenadas
            const polygonLayer = L.polygon(coordenadas, {
                //color: 'blue', // Color del borde del polígono
                //fillColor: 'yellow', // Color de relleno del polígono
                fillOpacity: 0.5, // Opacidad del relleno
            });
            polygonLayer.addTo(map);
            //polygonLayer.bindPopup(project.ProjectName).openPopup();
        } else {
            //info(_default[0].ProjectName, "New field, you must add the field polygon");
            //addPolygonToProject();
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
        });
    };

    const getDeveceForProjectDefault = async () => {
        const order = 0;
        const project = arrProject[order];

        _latitud = (project.Latitud_1 == 0 ? latitud : project.Latitud_1);
        _longitud = (project.Longitud_1 == 0 ? longitud : project.Longitud_1);

        map.flyTo([_latitud, _longitud], (project.Latitud_1 == 0 ? 6 : 15), {
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
                showDeviceInMap(project.ProjectID);
            } else {
                console.log("No devices found");
            }
        } catch (error) {
            console.log(error);
        }
    }

    const showDeviceAssigned = (ProjectID) => {
        const divDispositivos = document.getElementById(`card-device-${ProjectID}`);
        if (divDispositivos) {
            const items = arrDevice
                .filter(element => element.Longitud !== 0 && element.ProjectID == ProjectID)
                .map((v, index) => {
                    let texto = '';
                    if (v.Model.trim() == 'PLAYER') {
                        texto = `<i style='color:green;font-size: 20px;' class="fa-solid fa-location-dot"></i>`;
                    } else if (v.Model.trim() == 'MASTER') {
                        texto = `<i style='color:red;font-size: 20px;' class="fa-solid fa-location-dot"></i>`;
                    } else if (v.Model.trim() == 'SONDA') {
                        texto = `<i style='color:yellow;font-size: 20px;' class="fa-solid fa-location-dot"></i>`;
                    }
                    return  `<li class="list-group-item d-flex justify-content-between align-items-center mb-2" key="${index}">
                                <div>
                                    ${texto}
                                    <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Device ${v.player_id}</span>
                                </div>
                                <i role="button" class="fa fa-times mr-2 device-delete" data-player_id="${v.player_id}"></i>
                            </li>`
                });

            divDispositivos.innerHTML = items.join('');

            handleDeviceForDeleteInProject();
        } else {
            console.log(`Element with id "card-device-${ProjectID}" not found.`);
        }
    };

    const handleDeviceForDeleteInProject = () => {

        document.getElementById(`card-device-${projectId}`).addEventListener('click', async (e) => {
            e.preventDefault();

            Swal.fire({
                title: 'Are you sure?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes, delete it!'
            }).then((result) => {
                if (result.isConfirmed) {
                    const player_id = e.target.closest('.device-delete').dataset.player_id;
                    const options = url + `/Home/postAsignarDispositivoLocalizacion`;
                    const parametros = {
                        player_id: player_id,
                        ClientID: ClientID,
                        ProjectID: 0,
                        Longitud_1: 0,
                        Latitud_1: 0
                    }
                    funesperar(0, 'Please wait a few seconds.');
                    axios.post(options, parametros).then(function (response) {
                        const result = response.data;

                        if (result.SUCCESS == true) {
                            window.location.href = '/Home/Mapa?projectId=' + projectId;
                        } else {
                            console.log("Ocurrio un error");
                        }
                        funesperar(1, '');
                    }).catch(function (error) {
                        console.error(error);
                    });
                } 
            }) 
        });
    };

    const showDeviceForAssign = function () {
        var items = [], divDispositivos = $("#lista-dispositivos").empty();
        arrDevice.filter(element => { return element.Longitud === 0 && element.Latitud === 0 && element.ProjectID === projectId }).map((v, index) => {
            if (v.Model.trim() == 'PLAYER') {
                items.push(`<button class="btn btn-sm btn-secondary px-2 selecction-device" type="button" value="${v.player_id}" data-bs-toggle="tooltip" title="Device ${v.player_id}"><i style='color:green' class="fa-solid fa-location-dot"></i></button> `);
            } else if (v.Model.trim() == 'MASTER') {
                items.push(`<button class="btn btn-sm btn-secondary px-2 selecction-device" type="button" value="${v.player_id}" data-bs-toggle="tooltip" title="Device ${v.player_id}"><i style='color:red' class="fa-solid fa-location-dot"></i></button> `);
            } else if (v.Model.trim() == 'SONDA') {
                items.push(`<button class="btn btn-sm btn-secondary px-2 selecction-device" type="button" value="${v.player_id}" data-bs-toggle="tooltip" title="Device ${v.player_id}"><i style='color:yellow' class="fa-solid fa-location-dot"></i></button> `);
            }
        });

        divDispositivos.append(items.join(''));
    }

    const showDeviceInMap = function (ProjectID) {
        // Filtrar dispositivos con Longitud y Latitud válidas
        var arrDevicesAsignados = arrDevice.filter(element => element.Longitud !== 0 && element.Latitud !== 0 && element.ProjectID == ProjectID);

        arrDevicesAsignados.forEach(device => {
            let iconColor = 'blue'; // Color predeterminado

            // Asignar colores en función del valor de element.Model
            if (device.Model.trim() === 'MASTER') {
                iconColor = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png';
            } else if (device.Model.trim() === 'PLAYER') {
                iconColor = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';
            } else if (device.Model.trim() === 'SONDA') {
                iconColor = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-gold.png';
            }
 
            var Icono = L.icon({
                iconUrl: iconColor,
                iconSize: [30, 40],
                popupAnchor: [0, -40]
            });

            var newMarker = L.marker([device.Latitud, device.Longitud], {
                draggable: false,
                icon: Icono
            }).addTo(map);

            newMarker.bindPopup(`Device ${device.player_id}`).openPopup();
            markers.push(newMarker);
        });
    }

    function removeMarker(marker) {
        //console.log(marker);
        map.removeLayer(marker); // Quita el marcador del mapa
        var index = markers.indexOf(marker); // Encuentra el índice del marcador en el array
        if (index !== -1) {
            markers.splice(index, 1); // Elimina el marcador del array
        }
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
                //newMarker.bindPopup(`<button>Show/Hider</button> Device ${player_id}`).openPopup().addTo(map);
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
                funesperar(0, 'Please wait a few seconds.');
                axios.post(options, parametros).then(function (response) {
                    const result = response.data;

                    if (result.SUCCESS == true) {
                        markers.push(newMarker);
                        getDeveceForProjectDefault();
                    } else {
                        console.log("An error occurred");
                    }
                    funesperar(1, '');
                }).catch(function (error) {
                    console.error(error);
                });

                player_id = null;
            } else {
                console.log("You must select a device");
            }
        });
    }

    const handleAddProject = function (form) {
        $("#form-project").submit(function (form) {
            console.log('soy submit')
            form.preventDefault();

            var ProjectName = $("#ProjectName").val();

            if (coordenadas != null && ProjectName.length > 0) {
                var formData = $(this).serializeArray().reduce(function (obj, item) {
                    obj[item.name] = item.value;
                    return obj;
                }, {});

                const options = url + '/Home/postAddProjectos';
                const center = calculateCenterCoordinates(coordenadas);

                const primeraLatitud = center.lat;
                const primeraLongitud = center.lng;

                formData.ClientID = ClientID;
                formData.Cordenadas = JSON.stringify(coordenadas);
                formData.Longitud_1 = primeraLongitud;
                formData.Latitud_1 = primeraLatitud;

                axios.post(options, formData).then(function (response) {
                    if (response.data.SUCCESS == true) {
                        var _ProjectID = response.data.ITEMS.ProjectID;

                        location.href = `Mapa?projectId=${_ProjectID}`;
                    } else {
                        info("System Messages", "(Connection error) An error occurred while trying to carry out this processo", "error");
                    }
                }).catch(function (error) {
                    info("System Messages", error, "error");
                });
            } else {
                info("System Messages", "The Project Name field is required, select the project polygon.", "warning");
            }
        });
    }

    const AsignarListadoDePaises = function () {
        let parametros = {
            Descripcion: ''
        }
        const options = url + '/Home/postObtenerPaises';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            if (result.SUCCESS == true) {
                $('#cityDatalist').find('option').remove();
                let html = '';
                for (var i = 0; i < result.ITEMS.length; i++) {
                    html += '<option value="' + result.ITEMS[i].Descripcion + '" data-coodenadas="' + result.ITEMS[i].Latitud + ', ' + result.ITEMS[i].Longitud + '">'
                }
                $('#cityDatalist').append(html);
            } else {
            }
        }).catch(function (error) {
            console.error(error);
        });
    }

    const handleSearch = function (form) {
        var dropdown = document.getElementById('cityInput');
        dropdown.addEventListener('change', function (event) {
            const selectedValue = event.target.value;
            const selectedOption = document.querySelector(`#cityDatalist option[value="${selectedValue}"]`);

            if (selectedOption) {
                const coordenadas = selectedOption.getAttribute('data-coodenadas');
                const coordenadasArray = coordenadas.split(',');

                if (coordenadasArray.length === 2) {
                    const _latitud = coordenadasArray[0].trim(); // Latitud
                    const _longitud = coordenadasArray[1].trim(); // Longitud

                    map.flyTo([_latitud, _longitud], 5, {
                        animate: true,
                        duration: 2
                    });
                } else {
                    console.error('Incorrect coordinate format.');
                }
            }
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

              

            }).catch(function (error) {
                console.error(error);
            });
        });
    }

    const funesperar = function (timer, texto) {
        let timerInterval
        Swal.fire({
            title: 'Alert!',
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

    const info = function (title = "System Messages", text, type = 'success') {
        Swal.fire(title, text, type);
    }
        
    return {
        Inicializar: Inicializar,
    }
};
