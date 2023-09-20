var LayoutControllers = function () {
    const url = urlGlobal

    const btnCerrarSession = $('#btnCerrarSession');

    var Inicializar = function () {
        functionListar();
        console.log(url)
    }
    const functionListar = function () {
        btnCerrarSession.click(function () {
            obtener();
        });
    }
    const obtener = function () {
        let parametros = {

        }
        const options = url + 'postObtenerMenu';
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