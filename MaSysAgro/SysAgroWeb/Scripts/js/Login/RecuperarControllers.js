var RecuperarControllers = function () {
    const url = urlGlobal

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
        if (txtCorreo.val() == '') {
            Swal.fire('Please enter an email');
            return;
        }
        if (txtUsuario.val() == '') {
            Swal.fire('empty user please put one');
            return;
        }
        let parametros = {
            Usuario: txtUsuario.val(),
            Email: txtCorreo.val()
        }
        const options = url + '/Usuario/postSolicitarContrasena';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            if (result.SUCCESS == true) {
                window.location.href = "/Login/Login";
            } else {
                Swal.fire(result.MESSAGE);
            }
        }).catch(function (error) {
            console.error(error);
        });
    }

    return {
        Inicializar: Inicializar,
    }
};