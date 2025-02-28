﻿var DevicesControllers = function (Client_ID) {
    const url = urlGlobal

    const contenedorDevice = $('#contenedorDevice');
    const btnSave = $('#btnSave');
    const btnEliminar = $('#btnEliminar');
    const btnActivar = $('#btnActivar');
    const agregarinputTitulo = $('#agregarinputTitulo');
    const flexSwitchCheckChecked = $('#flexSwitchCheckChecked');
    const lblPlayerId = $("#lblPlayerId");
    const lblModel = $("#lblModel");
    const lblLatitud = $("#lblLatitud");
    const lblLongitud = $("#lblLongitud");

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
        postObtenerDispositivos(1);
        functionListar();
        console.log(url)
        btnEliminar.click(function () {
            if ($('.CloseButton').attr('data-tipo') == 1) {
                $('.CloseButton').css('display', 'inline');
                $('.CloseButton').css('width', '30px');
                $('.CloseButton').css('padding', '2px 7px');
                $('.CloseButton').css('border-radius', '20px');
                $('.CloseButton').css('top', '-9px');
                $('.CloseButton').css('position', 'relative');
                $('.CloseButton').css('left', '10px');
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
                $('.CloseButton').css('top', '-9px');
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
                btnEliminar.css('display', '');
                btnEliminar.attr('data-Activo', 1)
                postObtenerDispositivos(1);
            } else {
                btnActivar.css('display', '');
                btnEliminar.css('display', 'none');
                btnActivar.attr('data-Activo', 2)
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
            if (result.SUCCESS == false) {
                funesperar(5000, result.MESSAGE);
            }
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
                        html += Card.format(result.ITEMS[i].Model, result.ITEMS[i].player_id);
                    }
                    html += '';
                    contenedorDevice.append(html);
                    for (var i = 0; i < result.ITEMS.length; i++) {
                        let player = result.ITEMS[i].player_id;
                        let device = result.ITEMS[i].player_id;
                        let Model = result.ITEMS[i].Model;
                        let Latitud = result.ITEMS[i].Latitud;
                        let Longitud = result.ITEMS[i].Longitud;
                        $('#btnEliminar' + player).click(function () {

                            let Activo = flexSwitchCheckChecked.prop('checked') == true ? 1 : 2;
                            console.log(player, Activo);

                            postActivarDesactivar(player, Activo);
                        });
                        $('#btnClickCont' + result.ITEMS[i].player_id).click(function () {
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

    const postActivarDesactivar = function (player_id, Activo) {
        let parametros = {
            //ProjectID : txtDispositivo.val(),
            player_id: player_id,
            Activo: Activo == 1 ? 2 : 1
        }
        const options = url + '/Home/postUpdateDispositivos';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            postObtenerDispositivos(Activo);

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


    return {
        Inicializar: Inicializar,
    }
};