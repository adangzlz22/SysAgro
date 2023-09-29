var DevicesControllers = function (Client_ID) {
    const url = urlGlobal

    const contenedorDevice = $('#contenedorDevice');
    const btnSave = $('#btnSave');
    const btnEliminar = $('#btnEliminar');
    const btnActivar = $('#btnActivar');
    const agregarinputTitulo = $('#agregarinputTitulo');
    const flexSwitchCheckChecked = $('#flexSwitchCheckChecked');
    

    const Card = `       <div class="col-lg-3 col-sm-12 col-md-4 mb-3">
                <div class="card box" style=" border: 1px solid #7ab37f;">
                <button style="display:none;" data-tipo="1" class="btn btn-danger text-right CloseButton" id="btnEliminar{0}"><i class="fa fa-times-circle" aria-hidden="true"></i></button>
                    <div class="card-body mt-5 mb-5 text-left">
                        <img src="/Content/img/dispositivos.png" style="width:50px" class="mb-3" />

                     
                        <h2 style="color:#7ab37f; font-size:28px">Player : {0}</h2>
                        <h6>Chip : {1}</h6>
                        <h6>Date reaction : {2}</h6>
                        <div class="d-flex justify-content-between align-items-center">

                            <small  class="text-body-secondary"></small> <div class="btn-group">
                                <button style="display:none;" type="button" class="btn btn-primary" style="font-size: 20px; padding: 0.3rem 1rem" id="btnGo" data-bs-toggle="modal" data-bs-target="#myModal"> <i class="fa-solid fa-caret-right"></i></button>
                            </div>
                        </div>

                    </div>
                </div>
            </div>    `;


    var Inicializar = function () {
        postObtenerDispositivos(1);
        functionListar();
        console.log(url)
        btnEliminar.click(function () {
            if ($('.CloseButton').attr('data-tipo') == 1) {
                $('.CloseButton').css('display', 'block');
                $('.CloseButton').attr('data-tipo', 2);
            } else {
                $('.CloseButton').css('display', 'none');
                $('.CloseButton').attr('data-tipo', 1);
            }
        })
        btnActivar.click(function () {
            if ($('.CloseButton').attr('data-tipo') == 1) {
                $('.CloseButton').css('display', 'block');
                $('.CloseButton').attr('data-tipo', 2);
            } else {
                $('.CloseButton').css('display', 'none');
                $('.CloseButton').attr('data-tipo', 1);
            }
        })
    }
    const functionListar = function () {
        btnSave.click(function () {
            postBuscarDevices();
        });
        flexSwitchCheckChecked.change(function () {
            console.log(flexSwitchCheckChecked.prop('checked'));
            btnActivar.css('padding', '.3rem .9rem');
            btnActivar.css('font-size', '18px');
            btnEliminar.css('padding', '.3rem .9rem');
            btnEliminar.css('font-size', '18px');

            if (flexSwitchCheckChecked.prop('checked') == true) {
                btnActivar.css('display', 'none');
                btnEliminar.css('display','');
                postObtenerDispositivos(1);
            } else {
                btnActivar.css('display', '');
                btnEliminar.css('display', 'none');
                postObtenerDispositivos(2)
            }
        })
    }
    const postBuscarDevices = function () {
        let parametros = {
            //ProjectID : txtDispositivo.val(),
            player_id: agregarinputTitulo.val(),
            ClientID: Client_ID,
        }
        const options = url + '/Home/postBuscarDispositivo';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            postObtenerDispositivos(1);

        }).catch(function (error) {
            console.error(error);
        });
    }
    const postObtenerDispositivos = function (Activo) {
        let parametros = {
            //ProjectID : txtDispositivo.val(),
            //Chip_ID: txtDispositivo.val(),
            Activo: Activo,
            ClientID: Client_ID,
        }
        const options = url + '/Home/postObtenerDispositivos';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            console.log(result)
            if (result.SUCCESS == true) {

                contenedorDevice.css('display', '');
                if (result.ITEMS.length > 0) {
                    contenedorDevice.find('div').remove();
                    let html = '';
                    for (var i = 0; i < result.ITEMS.length; i++) {
                        html += Card.format(result.ITEMS[i].player_id, result.ITEMS[i].Chip_ID, result.ITEMS[i].Date_Creation);
                    }
                    html += '';
                    contenedorDevice.append(html);
                    for (var i = 0; i < result.ITEMS.length; i++) {
                        let player = result.ITEMS[i].player_id;
                        $('#btnEliminar' + player).click(function () {
                            console.log('click' + player );
                        });
                    }
                }
            } else {
                contenedorDevice.css('display', 'none');
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