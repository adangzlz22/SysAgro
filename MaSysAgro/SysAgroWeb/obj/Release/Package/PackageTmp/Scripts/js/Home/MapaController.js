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
    const cboProjects = $('#cboProjects');
    const cboDevice = $('#cboDevice');
    const AddDevice = $('#AddDevice');
    const conDispositivos = $("#divdispositivos");
    const lblPlayerId = $("#lblPlayerId");
    const carContenido = $("#carContenido");
    const carContenido2 = $("#carContenido2");

    const lblModel = $("#lblModel");
    const lblLatitud = $("#lblLatitud");
    const lblLongitud = $("#lblLongitud");
    const shoMap = $("#shoMap");
    
    var map = L.map('map').setView([latitud, longitud], 10.3);

    var map2 = L.map('map-modal').setView([latitud, longitud], 7);

    const Card = `       <div class="col-lg-3 col-sm-12 col-md-4 mb-3" id="btnClickCont{1}">
                <div class="card box" style=" border: 1px solid #7ab37f;">
<div class="row">
<div class="col-lg-12 col-md-12 col-sm-12" style="text-align:right">
<button style="display:none;" data-tipo="1" class="btn btn-danger CloseButton" id="btnEliminar{0}"><i class="fa fa-times-circle" aria-hidden="true"></i></button>
</div>
</div>
                
                    <div class="card-body mt-5 mb-5 text-left">

                     
                        <h2 style="color:#7ab37f; font-size:28px">{0} : {1}</h2>
                        <div class="d-flex justify-content-between align-items-center">

                            <small  class="text-body-secondary"></small> <div class="btn-group">
                                <button style="display:none;" type="button" class="btn btn-primary" style="font-size: 20px; padding: 0.3rem 1rem" id="btnGo" data-bs-toggle="modal" data-bs-target="#myModal"> <i class="fa-solid fa-caret-right"></i></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>    `;


    var Inicializar = function () {
        cboProjects.select2();
        cboDevice.select2();
        cboDevice.select2({
            templateResult: function (e) {
                console.log(e);
                var $span = "";
                $span = $(`<span value="0"><img src="${e.title}" style="width:50%;"> ${e.text} </span> `);
                arrDevice.filter(element => { return element.Longitud === 0 && element.Latitud === 0 && element.ProjectID === projectId }).map((v, index) => {
                    if (v.Model.trim() == 'PLAYER') {
                        $span = $(`<span value="${v.player_id}"><img src="${e.title}" style="width:10%;"> ${e.text}</span> `);
                    } else if (v.Model.trim() == 'MASTER') {
                        $span = $(`<span value="${v.player_id}"><img src="${e.title}" style="width:10%;"> ${e.text}</span> `);
                    } else if (v.Model.trim() == 'SONDA') {
                        $span = $(`<span value="${v.player_id}"><img src="${e.title}" style="width:10%;"> ${e.text}</span> `);
                    } else if (v.Model.trim() == 'PREUSER') {
                        $span = $(`<span value="${v.player_id}"><img src="${e.title}" style="width:10%;"> ${e.text}</span> `);
                    }
                });
                return $span;
            }
        });

        showDeviceAsginados();

        AddDevice.click(function () {
            $('#myModal').modal('show');
        });
        cboProjects.change(function () {
            window.location.href = "/Home/Mapa?projectId=" + cboProjects.val();
        });
        btnGrande.click(function () {
            map.invalidateSize();
        });
        carContenido.click(function () {
            console.log('hola guapo');
            if (cboDevice.val() == "0" && cboDevice.val() == 0) {
                funesperar(3000, "select a device.");
            } else {
                btnDivContenedor();
            }
        });
        shoMap.click(function () {
            if (shoMap.attr('data-id') == 0) {
                shoMap.text('Close map')
                shoMap.attr('data-id',1)
                $('#cardMapa').css('display', 'block');
                $('#carContenido').css('display', 'none');
                //carContenido2.css('display', 'none');
                
            } else {
                shoMap.text('Show map')
                shoMap.attr('data-id', 0)
                $('#cardMapa').css('display', 'none');
                $('#carContenido').css('display', 'block');
                //carContenido2.css('display', 'block');
            }
        });

        init_map();
        getProjects();
        handleDeviceForProject();
        $('#cardMapa').css('display', 'none');
        //handleDeviceForDeleteInProject();
        //showDeviceInMap();
        handleDeviceForProjectInMap();
        handleAddProject();
        handleAssignDeviceToProject();
        AsignarListadoDePaises();
        handleSearch();
        handleModalMapProject();
        editPolygonToProject();
    }

    const btnDivContenedor = function () {
        const options = url + `/Home/postAsignarDispositivoLocalizacion`;
        const parametros = {
            player_id: cboDevice.val(),
            ClientID: ClientID,
            ProjectID: cboProjects.val(),
            Longitud_1: 1,
            Latitud_1: 1
        }
        funesperar(0, 'Please wait a few seconds.');
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            if (result.SUCCESS == true) {
            } else {
                console.log("Ocurrio un error");
            }
            funesperar(1, '');
            showDeviceAsginados();
            getDeveceForProjectDefault();
        }).catch(function (error) {
            console.error(error);
        });
    }

    const handleModalMapProject = () => {
        var osm = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 20,
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        });

        var hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });

        hybrid.addTo(map2);

        var baseMaps = {
            'Google Satellite': hybrid,
            "OSM": osm,
        };
        var overlayMaps = {

        };

        L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map2);
        $('#button-modal-map-project').on('click', function () {
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
        
        var hybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
            maxZoom: 20,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
        });

        hybrid.addTo(map);

        var baseMaps = {
            'Google Satellite': hybrid,
            "OSM": osm
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
                    circle: false,
                    polygon: {
                        shapeOptions: { color: 'white', opacity: 0.5 },
                        allowIntersection: false
                    }
                }
            });
        }

        map2.addControl(drawControl);
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
                    circle: false,
                    polygon: {
                        shapeOptions: { color: 'white', opacity: 0.5 },
                        allowIntersection: false
                    }
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

           
            Swal.fire({
                title: 'Do you want to finish creating the polygon?',
                text: "You won't be able to revert this!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    funesperar(0, 'Please wait a few seconds.');
                    axios.post(options, parametros).then(function (response) {
                        window.location.href = `Mapa?projectId=${projectId}`;
                        funesperar(1, '');
                    }).catch(function (error) {
                        info("System Messages", error, "error");
                    });
                } else {
                    map.removeLayer(layer);
                }
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
                cboProjects.find('option').remove();
                let html = "";
                let items2 = [];
                html = "<option data-coordenadas='0' value='0'> Select project </option>";
                for (var i = 0; i < arrProject.length; i++) {
                    html += `<option data-coordenadas="${arrProject[i].Longitud_1}" value="${arrProject[i].ProjectID}">${arrProject[i].ProjectName}</option>`;
                };
                cboProjects.append(html);

                if ($('#cboProjects').find('option').filter(':selected').attr('data-coordenadas') == 0 && $('#cboProjects').find('option').filter(':selected').attr('data-coordenadas') == "0") {
                    $('#cardMapa').css('display', 'none');
                    $('#carContenido').css('display', 'block');
                } else {
                    $('#cardMapa').css('display', 'block');
                    $('#carContenido').css('display', 'none');
                }
                divProyectos.innerHTML = items.join('');
                cboProjects.val(projectId);

                showDeviceAsginados();
                getDeveceForProjectDefault();
                //addExistingPolygonIntoMap();
                addExistingAllPolygonIntoMap();
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
                color: 'white', // Color del borde del polígono
                //fillColor: 'yellow', // Color de relleno del polígono
                fillOpacity: 0.1, // Opacidad del relleno
                dashArray: '10',
            });
            polygonLayer.addTo(map);
        } else {
            //info(_default[0].ProjectName, "New field, you must add the field polygon");
            //addPolygonToProject();
        }
    };

    const addExistingAllPolygonIntoMap = function () {
        var polygons = {};

        console.log(arrProject)
        arrProject.forEach(project => {
            if (project.Cordenadas != "0" && project.Cordenadas.length > 0) {
                const coordinates = JSON.parse(project.Cordenadas);

                const coordenadas = coordinates.map(item => {
                    return {
                        "lat": item.lat,
                        "lng": item.lng
                    };
                });

                function deletePolygon(polygonId) {
                    const polygon = polygons[polygonId];
                    if (polygon) {
                        polygon.remove();

                        delete polygons[polygonId];

                        const options = url + '/Home/postUpdateProjectosCoodenadas';
                        const center = calculateCenterCoordinates(coordenadas);

                        const primeraLatitud = 0;
                        const primeraLongitud = 0;

                        const parametros = {
                            Cordenadas: "0",
                            ProjectID: polygonId,
                            Longitud_1: primeraLongitud,
                            Latitud_1: primeraLatitud
                        }

                        funesperar(0, 'Please wait a few seconds.');
                        axios.post(options, parametros).then(function (response) {
                            funesperar(1, '');
                        }).catch(function (error) {
                            info("System Messages", error, "error");
                        });
                    }
                }
                // Crea una capa de polígono utilizando las coordenadas
                const polygonLayer = L.polygon(coordenadas, {
                    color: 'white', // Color del borde del polígono
                    fillOpacity: 0.1, // Opacidad del relleno
                    dashArray: '10',
                });
                polygonLayer.addTo(map);
                polygons[project.ProjectID] = polygonLayer;

                polygonLayer.on('click', function () {
                    Swal.fire({
                        title: 'Are you sure to delete this polygon?',
                        text: "You won't be able to revert this!",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Yes, delete it!'
                    }).then((result) => {
                        if (result.isConfirmed) {
                            deletePolygon(project.ProjectID);
                        }
                    });
                });
            }
        });
        if ($('#cboProjects').find('option').filter(':selected').attr('data-coordenadas') == 0 && $('#cboProjects').find('option').filter(':selected').attr('data-coordenadas') == "0") {
            $('#cardMapa').css('display', 'none');
            $('#carContenido').css('display', 'block');
        } else {
            $('#cardMapa').css('display', 'block');
            $('#carContenido').css('display', 'none');
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
                    return `<li class="list-group-item d-flex justify-content-between align-items-center mb-2" key="${index}">
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

        //document.getElementById(`card-device-${projectId}`).addEventListener('click', async (e) => {
        //e.preventDefault();
        $("#btnRemoveDevice").click(function (e) {
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
                    const player_id = $('#btnRemoveDevice').val();
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
            });
        });
    };

    const showDeviceAsginados = function () {
        let parametros = {
            ProjectID: projectId
        }
        const options = url + '/Home/postObtenerDispositivosPorProjectoAsignados';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            showDeviceAssign(result.ITEMS)
        }).catch(function (error) {
            console.error(error);
        });
    }

    const showDeviceAssign = function (lstDatos) {
        var items = [];
        console.log(lstDatos);
        conDispositivos.find('button').remove();
        for (var f = 0; f < lstDatos.length; f++) {
            if (lstDatos[f].Model.trim() == 'PLAYER') {
                items.push(`<button class="btn btn-sm btn-secondary px-2 selecction-device" type="button" value="${lstDatos[f].player_id}" data-bs-toggle="tooltip" title="Device ${lstDatos[f].player_id}" id="btnDevice${lstDatos[f].player_id}" style="width: 50px;padding: 6px 0px!important;"><img src="/Content/img/Icono-mapa-1.png" style="width:50%;"></button> `);
            } else if (lstDatos[f].Model.trim() == 'MASTER') {
                items.push(`<button class="btn btn-sm btn-secondary px-2 selecction-device" type="button" value="${lstDatos[f].player_id}" data-bs-toggle="tooltip" title="Device ${lstDatos[f].player_id}" id="btnDevice${lstDatos[f].player_id}" style="width: 50px;padding: 6px 0px!important;"><img src="/Content/img/Icono-mapa-2.png" style="width:50%;"></button> `);
            } else if (lstDatos[f].Model.trim() == 'SONDA') {
                items.push(`<button class="btn btn-sm btn-secondary px-2 selecction-device" type="button" value="${lstDatos[f].player_id}" data-bs-toggle="tooltip" title="Device ${lstDatos[f].player_id}"  id="btnDevice${lstDatos[f].player_id}" style="width: 50px;padding: 6px 0px!important;"><img src="/Content/img/Icono-mapa-3.png" style="width:50%;"></button> `);
            } else if (lstDatos[f].Model.trim() == 'PREUSER') {
                items.push(`<button class="btn btn-sm btn-secondary px-2 selecction-device" type="button" value="${lstDatos[f].player_id}" data-bs-toggle="tooltip" title="Device ${lstDatos[f].player_id}"  id="btnDevice${lstDatos[f].player_id}" style="width: 50px;padding: 6px 0px!important;"><img src="/Content/img/Icono-mapa-4.png" style="width:50%;"></button> `);
            }
        }

        conDispositivos.append(items);
        let itm = "";
        carContenido2.find('div').remove();
        console.log('hola')
        itm = "<div class='row'>";
        for (var i = 0; i < lstDatos.length; i++) {
            itm += Card.format(lstDatos[i].Model, lstDatos[i].player_id);
        }
        itm += "</div>";
        carContenido2.append(itm);

        for (var f = 0; f < lstDatos.length; f++) {
            let device = lstDatos[f].player_id;
            let Model = lstDatos[f].Model;
            let Latitud = lstDatos[f].Latitud;
            let Longitud = lstDatos[f].Longitud;
            $('#btnDevice' + lstDatos[f].player_id).click(function () {
                $('#myModalInformation').modal('show');
                lblPlayerId.text(device);
                lblModel.text(Model);
                if (Latitud == 1) {
                    lblLatitud.css('display', 'none')
                    lblLongitud.css('display', 'none')
                    $('#titlon').css('display', 'none')
                    $('#titlat').css('display', 'none')
                }
                lblLatitud.text(Latitud);
                lblLongitud.text(Longitud);

                $("#btnRemoveDevice").val(device);
            });
            $('#btnClickCont' + lstDatos[f].player_id).click(function () {
                $('#myModalInformation').modal('show');
                lblPlayerId.text(device);
                lblModel.text(Model);
                if (Latitud == 1) {
                    lblLatitud.css('display', 'none')
                    lblLongitud.css('display', 'none')
                    $('#titlon').css('display', 'none')
                    $('#titlat').css('display', 'none')
                }
                lblLatitud.text(Latitud);
                lblLongitud.text(Longitud);

                $("#btnRemoveDevice").val(device);
            });
            
        }
    }

    const showDeviceForAssign = function () {
        var items2 = [];
        cboDevice.find('option').remove();
        items2.push(`<option value="0" title="/Content/img/IconoDispositivos.png">Select device</option>`)
        arrDevice.filter(element => { return element.Longitud === 0 && element.Latitud === 0 && element.ProjectID === projectId }).map((v, index) => {
            if (v.Model.trim() == 'PLAYER') {
                items2.push(`<option value="${v.player_id}" title="/Content/img/Icono-mapa-1.png"><img src="/Content/img/Icono-mapa-1.png" style="width:50%;"> Device ${v.player_id}</option> `);
            } else if (v.Model.trim() == 'MASTER') {
                items2.push(`<option value="${v.player_id}" title="/Content/img/Icono-mapa-2.png"><img src="/Content/img/Icono-mapa-2.png" style="width:50%;"> Device ${v.player_id}</option> `);
            } else if (v.Model.trim() == 'SONDA') {
                items2.push(`<option value="${v.player_id}" title="/Content/img/Icono-mapa-3.png"><img src="/Content/img/Icono-mapa-3.png" style="width:50%;"> Device ${v.player_id}</option> `);
            } else if (v.Model.trim() == 'PREUSER') {
                items2.push(`<option value="${v.player_id}" title="/Content/img/Icono-mapa-4.png"><img src="/Content/img/Icono-mapa-4.png" style="width:50%;">  Device ${v.player_id}</option> `);
            }
        });

        cboDevice.append(items2);

        //divDispositivos.append(items.join(''));
    }

    const showDeviceInMap = function (ProjectID) {
        // Filtrar dispositivos con Longitud y Latitud válidas
        var arrDevicesAsignados = arrDevice.filter(element => element.Longitud !== 0 && element.Latitud !== 0 && element.ProjectID == ProjectID);

        arrDevicesAsignados.forEach(device => {
            let iconColor = 'blue'; // Color predeterminado
            //iconColor = 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png';

            if (device.Model.trim() === 'MASTER') {
                iconColor = '/Content/img/Icono-mapa-2.png';
            } else if (device.Model.trim() === 'PLAYER') {
                iconColor = '/Content/img/Icono-mapa-1.png';
            } else if (device.Model.trim() === 'SONDA') {
                iconColor = '/Content/img/Icono-mapa-3.png';
            } else if (device.Model.trim() === 'PREUSER') {
                iconColor = '/Content/img/Icono-mapa-4.png';
            }

            var Icono = L.icon({
                iconUrl: iconColor,
                iconSize: [30, 30],
                popupAnchor: [0, -40]
            });

            var newMarker = L.marker([device.Latitud, device.Longitud], {
                draggable: true,
                icon: Icono,
                player_id: device.player_id
            }).addTo(map);

            newMarker.bindPopup(`Device ${device.player_id}`).openPopup();
            markers.push(newMarker);

            newMarker.on('dragend', function (event) {
                const marker = event.target;
                const position = marker.getLatLng();
                const lat = position.lat;
                const lng = position.lng;

                const popupContent = marker.getPopup().getContent();
                const parts = popupContent.split(' ');
                const player_id = parts[1];

                const options = url + `/Home/postAsignarDispositivoLocalizacion`;
                const parametros = {
                    player_id: player_id,
                    ClientID: ClientID,
                    ProjectID: projectId,
                    Longitud_1: lng,
                    Latitud_1: lat
                }

                //funesperar(0, 'Please wait a few seconds.');
                axios.post(options, parametros).then(function (response) {
                    const result = response.data;

                    if (result.SUCCESS == true) {
                        console.log("Device coordinates updated successfully");
                    } else {
                        console.log("An error occurred");
                    }
                    // funesperar(1, '');
                }).catch(function (error) {
                    console.error(error);
                });

            });
        });
    }

    function removeMarker(marker) {
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

        cboDevice.change(function (e) {
            //$('#lista-dispositivos').on('click', '.selecction-device', function (e) {
            e.preventDefault();
            const value = $(this).val();
            player_id = value;
        });

        map.on('click', function (e) {
            if (player_id != "0" && player_id != null) {
                var newMarker = L.marker(e.latlng);
               

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
            form.preventDefault();

            var ProjectName = $("#ProjectName").val();

            //if (coordenadas != null && ProjectName.length > 0) {
            var formData = $(this).serializeArray().reduce(function (obj, item) {
                obj[item.name] = item.value;
                return obj;
            }, {});

            const options = url + '/Home/postAddProjectos';

            let center;
            let primeraLatitud;
            let primeraLongitud;
            if (coordenadas != null) {
                center = calculateCenterCoordinates(coordenadas);

                primeraLatitud = center.lat;
                primeraLongitud = center.lng;

                formData.ClientID = ClientID;
                formData.Cordenadas = JSON.stringify(coordenadas);
                formData.Longitud_1 = primeraLongitud;
                formData.Latitud_1 = primeraLatitud;
            } else {
                primeraLatitud = 0;
                primeraLongitud = 0;

                formData.ClientID = ClientID;
                formData.Cordenadas = 0;
                formData.Longitud_1 = primeraLongitud;
                formData.Latitud_1 = primeraLatitud;
            }

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
            //} else {
            //    info("System Messages", "The Project Name field is required, select the project polygon.", "warning");
            //}
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

                    map2.flyTo([_latitud, _longitud], 5, {
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
                    showDeviceForAssign();
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
