var LoginControllers = function () {
    const url = 'https://localhost:44377/Api'

    const txtUsuario = $('#txtUsuario');
    const txtPassword = $('#txtPassword');
    const btnLogearse = $('#btnLogearse');


    var Inicializar = function () {
        console.log('hola soy logincontroller')
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
            Contrasena:txtPassword.val()
        }

        const options = url + '/Usuario/postLogearseUsuario';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            if (result.SUCCESS == true) {
                window.location.href = "/Home/Index";
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