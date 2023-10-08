var MapaController = function (ClientID, projectId) {
    const url = urlGlobal;
    var arrProject = [];
    var arrDevice = [];
    var player_id = null;
    var longitud = -3.742641;
    var latitud = 40.320973;
    var markerDeviceGroup = null;
    var markers = [];

    var map = L.map('map').setView([longitud, latitud], 10.3);

    var Inicializar = function () {
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
    }

    const init_map = function () {

        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        //google satellite
        /* googleSat = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
             maxZoom: 30,
             subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
         }).addTo(map);*/
    }

    const polygon = () => {

        var drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        var drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems
            },
            draw: {
                polygon: true,
                marker: false,
                polyline: false,
                rectangle: false,
                circle: false
            }
        });

        map.addControl(drawControl);
        //Manejadores de eventos para guardar el polígono dibujado
        map.on(L.Draw.Event.CREATED, async (event) => {
            const layer = event.layer;
            drawnItems.addLayer(layer);

            const coordenadas = layer._latlngs[0];
            const primeraLatitud = coordenadas[0].lat;
            const primeraLongitud = coordenadas[0].lng;

            const options = `${url}/Home/postUpdateProjectosCoodenadas`;
            const parametros = {
                Cordenadas: JSON.stringify(coordenadas),
                ProjectID: projectId,
                Longitud_1: primeraLongitud,
                Latitud_1: primeraLatitud
            };

            try {
                funesperar(0, 'Please wait a few seconds.');
                const response = await axios.post(options, parametros);
                const result = response.data;

                if (result.SUCCESS) {
                    getProjects();
                } else {

                }
                funesperar(1, '');
            } catch (error) {
                console.log(error);
            }
        });
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
                agregarPoligonoExistente();
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

    const agregarPoligonoExistente = function () {
        var _default = arrProject.filter(x => x.ProjectID == projectId);
        //alert((_default[0].Latitud_1) + " " + (_default[0].Longitud_1));
        console.log(_default)
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
            polygonLayer.bindPopup(project.ProjectName).openPopup();
        } else {
            polygon();
            confirm(_default[0].ProjectName, "Nuevo campo, debes agregar el poligono del campo");
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
                console.log("No se encontraron dispositivos");
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
                .map((v, index) => `<li class="list-group-item d-flex justify-content-between align-items-center mb-2" key="${index}">
                                        <div>
                                            <span class="text-900 font-medium mr-2 mb-1 md:mb-0">Device ${v.player_id}</span>
                                        </div>
                                        <i role="button" class="fa fa-times mr-2 device-delete" data-player_id="${v.player_id}"></i>
                                    </li>`);

            divDispositivos.innerHTML = items.join('');

            handleDeviceForDeleteInProject();
        } else {
            console.log(`Element with id "card-device-${ProjectID}" not found.`);
        }
    };

    const handleDeviceForDeleteInProject = () => {

        document.getElementById(`card-device-${projectId}`).addEventListener('click', async (e) => {
            e.preventDefault();

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
                    getDeveceForProjectDefault();
                } else {
                    console.log("Ocurrio un error");
                }
                funesperar(1, '');
            }).catch(function (error) {
                console.error(error);
            });
        });
    };

    const showDeviceForAssign = function () {
        var items = [], divDispositivos = $("#lista-dispositivos").empty();
        arrDevice.filter(element => { return element.Longitud === 0 && element.Latitud === 0 && element.ProjectID === projectId }).map((v, index) => {
            items.push(`<button class="btn btn-sm btn-secondary px-2 selecction-device" type="button" value="${v.player_id}">Device ${v.player_id}</button>`);
        });

        divDispositivos.append(items.join(''));
    }

    /*const showDeviceInMap = function (ProjectID) {
        // Filtrar dispositivos con Longitud y Latitud válidas
        var arrDevicesAsignados = arrDevice.filter(element => element.Longitud !== 0 && element.Latitud !== 0 && element.ProjectID == ProjectID);
        // var markerClusterGroup = L.markerClusterGroup();


        arrDevicesAsignados.forEach(device => {
            //markers.push(newMarker);
            //var marker = L.marker([device.Latitud, device.Longitud]);
            //marker.bindPopup(`<button onClick="${toggleMarker(device.player_id)}">Mostrar/Ocultar</button> Dispositivo ${device.player_id}`).openPopup();
            //markerClusterGroup.addLayer(marker);

            var newMarker = L.marker([device.Latitud, device.Longitud]);
            newMarker.bindPopup(`<button class="miboton" id="device-${device.player_id}" value="${device.player_id}" onClick="() => toggleMarker()">Mostrar/Ocultar</button> Device ${device.player_id} ${(markers.length - 1 == -1 ? 0 : markers.length - 1)}`).openPopup().addTo(map);
            newMarker.player_id = device.player_id;
            markers.push(newMarker);

            var button = document.getElementById(`device-${device.player_id}`);
            button.addEventListener('click', function () {
                toggleMarker(newMarker);
            });
        });
       
        //map.addLayer(markerClusterGroup);
        //markerDeviceGroup = markerClusterGroup;

        // console.log(markerDeviceGroup);
        //var markerToRemove = markers[1];
        //removeMarker(markerToRemove);
    }*/

    const showDeviceInMap = function (ProjectID) {
        // Filtrar dispositivos con Longitud y Latitud válidas
        var arrDevicesAsignados = arrDevice.filter(element => element.Longitud !== 0 && element.Latitud !== 0 && element.ProjectID == ProjectID);

        arrDevicesAsignados.forEach(device => {
            var newMarker = L.marker([device.Latitud, device.Longitud]).addTo(map);
            newMarker.bindPopup(`New Device`).openPopup();
            markers.push(newMarker);
            newMarker.bindPopup(`Device ${device.player_id}`).openPopup();
            //newMarker.bindPopup(`<button class="miboton" id="device-${device.player_id}" onClick="toggleMarker(${device.player_id})" value="${device.player_id}">Mostrar/Ocultar</button> Device ${device.player_id}`).addTo(map);
            //newMarker.player_id = device.player_id;
            //markers.push(newMarker);

            // Agregar un evento click al botón para mostrar/ocultar el marcador
            //var button = document.getElementById(`device-${device.player_id}`);
            //button.addEventListener('click', function () {
            //  toggleMarker(newMarker);
            //});
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
                newMarker.bindPopup(`<button>Mostrar/Ocultar</button> Device ${player_id}`).openPopup().addTo(map);
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
                        // Agrega un botón para ocultar el marcador individualmente
                        //newMarker.bindPopup(`Device ${player_id}`).openPopup().addTo(map);
                        //location.reload();
                        //newMarker.bindPopup('Device ${player_id} <button onclick="toggleMarker(' + (markers.length - 1) + ')">Mostrar/Ocultar</button>').openPopup();
                    } else {
                        console.log("Ocurrio un error");
                    }
                    funesperar(1, '');
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

            var formData = $(this).serializeArray().reduce(function (obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});

            const options = url + '/Home/postAddProjectos';

            formData.ClientID = ClientID;
            axios.post(options, formData).then(function (response) {
                if (response.data.SUCCESS == true) {
                    console.log(response.data.ITEMS.ProjectID);
                    var _ProjectID = response.data.ITEMS.ProjectID;

                    location.href = `Mapa?projectId=${_ProjectID}`;
                } else {

                }
            }).catch(function (error) {
                console.error(error);
            });
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
                console.log(result.ITEMS)
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
                    console.error('Formato de coordenadas incorrecto.');
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

                setTimeout(() => {
                    $('#myModal').modal('hide');
                }, 2000);

            }).catch(function (error) {
                console.error(error);
            });
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

    const confirm = function (title, text) {
        Swal.fire(
            title,
            text,
            'success'
        )
    }

    return {
        Inicializar: Inicializar,
    }
};
