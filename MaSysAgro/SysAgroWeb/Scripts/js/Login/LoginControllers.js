var LoginControllers = function () {
    const url = '/Login/'

    const txtUsuario = $('#txtUsuario');
    const txtPassword = $('#txtPassword');
    const btnLogearse = $('#btnLogearse');


    var Inicializar = function () {
        functionListar();
    }
    const functionListar= function(){
        btnLogearse.click(function () {
            obtener();
        });
    }
    const obtener = function () {
        let parametros = {
            Usuario: txtUsuario.val(),
            Password:txtPassword.val()
        }
        const options = url + 'postLogearseUsuario';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            if (result.SUCCESS == true) {
                window.location.href = "/Home/Estaciones";
            } else {
                Swal.fire('Usuario y/o contraseña incorrecta.');
            }
        }).catch(function (error) {
            console.error(error);
        });
    }

    return {
        Inicializar: Inicializar,
    }
};