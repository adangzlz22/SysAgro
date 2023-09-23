var MapaController = function () {
    const url = urlGlobal

    const map = L.map('map').setView([51.505, -0.09], 13);

    var Inicializar = function () {
        console.log(url);
        console.log('hola soy MapaControllers');
        init_map();
        config();
        campos();
    }

    const init_map = function () {
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    }

    const config = function () {
        var drawnItems = new L.FeatureGroup();
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

        // Manejadores de eventos para guardar el polígono dibujado
        map.on(L.Draw.Event.CREATED, function (event) {
            var layer = event.layer;
            console.log(layer);
            drawnItems.addLayer(layer);
        });
    }

    const campos = function () {
        var polygon = L.polygon([
            [51.509, -0.08],
            [51.503, -0.06],
            [51.51, -0.047]
        ]).addTo(map);
    }

    const toggleMarker = function (index) {
        if (map.hasLayer(markers[index])) {
            map.removeLayer(markers[index]);
        } else {
            map.addLayer(markers[index]);
        }
    }
   
    return {
        Inicializar: Inicializar,
    }
};