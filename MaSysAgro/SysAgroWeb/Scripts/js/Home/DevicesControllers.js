var DevicesControllers = function (Client_ID) {
    const url = urlGlobal

    const contenedorDevice = $('#contenedorDevice');
    const btnSave = $('#btnSave');
    

    const Card = `       <div class="col-lg-3 col-sm-12 col-md-4 mb-3">
                <div class="card box" style=" border: 1px solid #7ab37f;">
                    <div class="card-body mt-5 mb-5 text-left">
                        <img src="/Content/img/dispositivos.png" style="width:50px" class="mb-3" />

                        <h2 style="color:#7ab37f; font-size:30px"><a href="Project">Device Name</a></h2>
                        <h6>Player : {0}</h6>
                        <h6>Chip : {1}</h6>
                        <h6>Date reaction : {2}</h6>
                        <div class="d-flex justify-content-between align-items-center">

                            <small class="text-body-secondary"></small> <div class="btn-group">
                                <button type="button" class="btn btn-primary" style="font-size: 20px; padding: 0.3rem 1rem" id="btnGo" data-bs-toggle="modal" data-bs-target="#myModal"> <i class="fa-solid fa-caret-right"></i></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>    `;


    var Inicializar = function () {
        postObtenerDispositivos();
        functionListar();
        console.log(url)
    }
    const functionListar = function () {
        btnSave.click(function () {
            postBuscarDevices();
        });
    }
    const postBuscarDevices = function () {
        let parametros = {
            //ProjectID : txtDispositivo.val(),
            player_id: txtDispositivo.val(),
            ClientID: Client_ID,
        }
        const options = url + '/Home/postBuscarDispositivo';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            postObtenerDispositivos();

        }).catch(function (error) {
            console.error(error);
        });
    }
    const postObtenerDispositivos = function () {
        let parametros = {
            //ProjectID : txtDispositivo.val(),
            //Chip_ID: txtDispositivo.val(),
            ClientID: Client_ID,
        }
        const options = url + '/Home/postObtenerDispositivos';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            console.log(result)
            if (result.SUCCESS == true) {
                if (result.ITEMS.length > 0) {
                    console.log(result)
                    let html = '';
                    for (var i = 0; i < result.ITEMS.length; i++) {
                        html += Card.format(result.ITEMS[i].player_id, result.ITEMS[i].Chip_ID, result.ITEMS[i].Date_Creation);
                    }
                    html += '';
                    contenedorDevice.append(html);
                }
            } else {
                ContenedorMenu.css('display', 'none');
                ContenedorYaEresCliente.css('display', 'block');
            }
        }).catch(function (error) {
            console.error(error);
        });
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