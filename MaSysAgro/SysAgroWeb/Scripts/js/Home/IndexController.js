var IndexControllers = function (Client_ID) {
    const url = urlGlobal

    const txtDispositivo = $('#txtDispositivo');
    const btnBuscarDispotivo = $('#btnBuscarDispotivo');
    
    var Inicializar = function () {
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


        }).catch(function (error) {
            console.error(error);
        });
    }


    return {
        Inicializar: Inicializar,
    }
};