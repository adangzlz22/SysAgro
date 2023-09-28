var IndexControllers = function (Client_ID) {
    const url = urlGlobal

    const txtDispositivo = $('#txtDispositivo');
    const btnBuscarDispotivo = $('#btnBuscarDispotivo');
    const ContenedorYaEresCliente = $('#ContenedorYaEresCliente');
    const ContenedorMenu = $('#ContenedorMenu');

    const Card = `<div class="col-lg-3 col-sm-12 col-md-4 mb-3"><a href="{1}">
                      <div class="card box" style=" border: 1px solid #7ab37f;">
                          <div class="card-body mt-5 mb-5 text-left">
                              <img src="{0}" style="width:50px" class="mb-3"/>
                              <h2 style="color:#7ab37f; font-size:30px">{2}</h2>
                              <h4>{3}</h4>
                              <br/>
                          </div>
                      </div></a>
                  </div>`;


    var Inicializar = function () {
        postObtenerMenu();
        postObtenerDispositivos();
        functionListar();
        console.log(url)
    }
    const functionListar = function () {
        btnBuscarDispotivo.click(function () {
            obtener();
        });
    }
    const obtener = function () {
        let parametros = {
            //ProjectID : txtDispositivo.val(),
            Chip_ID: txtDispositivo.val(),
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
                    ContenedorMenu.css('display', 'block');
                    ContenedorYaEresCliente.css('display', 'none');
                }
            } else {
                ContenedorMenu.css('display', 'none');
                ContenedorYaEresCliente.css('display', 'block');
            }
        }).catch(function (error) {
            console.error(error);
        });
    }

    const postObtenerMenu = function () {
        let parametros = {
            //ProjectID : txtDispositivo.val(),
            //Chip_ID: txtDispositivo.val(),
            ClientID: Client_ID,
        }
            const options = url + '/Home/postObtenerMenu';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            console.log(result)
            if (result.SUCCESS == true) {
                if (result.ITEMS.length > 0) {
                    let html = '<div class="row" style="justify-content:center">';
                    for (var i = 0; i < result.ITEMS.length; i++) {
                        html += Card.format(result.ITEMS[i].Image, result.ITEMS[i].Redirect, result.ITEMS[i].Titulo, result.ITEMS[i].Description);
                    }
                    html += '</div>';
                    ContenedorMenu.append(html);
                }
            } else {

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