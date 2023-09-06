var LoginControllers = function () {
    const url = urlGlobal

    const txtUsuario = $('#txtUsuario');
    const txtPassword = $('#txtPassword');
    const btnLogearse = $('#btnLogearse');


    var Inicializar = function () {
        console.log(urlGlobal)
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
                console.log( result.ITEMS)
                MandarObjUsuarios(result.ITEMS);
            } else {
                Swal.fire('Usuario y/o contraseña incorrecta.');
            }
        }).catch(function (error) {
            console.error(error);
        });
    }
    const MandarObjUsuarios = function (parametros) {
        const options = '/Login/AsignarVariable';
        axios.post(options, parametros).then(function (response) {
                window.location.href = "/Home/Index";
        }).catch(function (error) {
            console.error(error);
        });
    }



    return {
        Inicializar: Inicializar,
    }
};