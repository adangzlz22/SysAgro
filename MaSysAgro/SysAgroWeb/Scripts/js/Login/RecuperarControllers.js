var RecuperarControllers = function () {
    const url = '/Login/'

    const txtUsuario = $('#txtUsuario');
    const txtCorreo = $('#txtCorreo');
    const btnRecuperar = $('#btnRecuperar');


    var Inicializar = function () {
        functionListar();
    }
    const functionListar = function () {
        btnRecuperar.click(function () {
            obtener();
        });
    }
    const obtener = function () {
        let parametros = {
            Usuario: txtUsuario.val(),
            Correo: txtCorreo.val()
        }
        const options = url + 'postRecuperarContraseña';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            if (result.SUCCESS == true) {
                window.location.href = "/Login/Login";
            } else {
            }
        }).catch(function (error) {
            console.error(error);
        });
    }

    return {
        Inicializar: Inicializar,
    }
};