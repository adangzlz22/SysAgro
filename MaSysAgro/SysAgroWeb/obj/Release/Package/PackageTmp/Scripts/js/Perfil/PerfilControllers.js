var PerfilControllers = function () {
    const url = urlGlobal

    const btnGuardarPerfil = $('#btnGuardarPerfil');


    const imgEntrenador = $('#imgEntrenador');
    const txtIdOculto = $('#txtIdOculto');
    const txtUsuario = $('#txtUsuario');
    const txtNombreUsuario = $('#txtNombreUsuario');
    const txtApePaternoUsuario = $('#txtApePaternoUsuario');
    const txtApeMaternoUsuario = $('#txtApeMaternoUsuario');
    const txtTelefono = $('#txtTelefono');
    const txtCorreoElectronico = $('#txtCorreoElectronico');


    const txtContraActual = $('#txtContraActual');
    const txtNuevaContraseña = $('#txtNuevaContraseña');
    const txtConfirmarContraseña = $('#txtConfirmarContraseña');




    var Inicializar = function () {
        console.log('soy PerfilControllers')
        functionListar();
    }
    const functionListar = function () {
        btnGuardarPerfil.click(function () {
            console.log('soy PerfilControllers')
            obtener();
        });
    }
    const obtener = function () {
        if (txtContraActual.val() != '') {
            if (txtNuevaContraseña.val() == txtConfirmarContraseña.val()) {

            } else {
                Swal.fire('the passwords are not the same');
                return;
            }
        }
        let parametros = {
            Id: txtIdOculto.val(),
            IdSucursal: 0,
            Usuario: txtUsuario.val(),
            ContrasenaActual: txtContraActual.val(),
            Contrasena: txtNuevaContraseña.val(),
            Nombre: txtNombreUsuario.val(),
            ApellidoPaterno: txtApePaternoUsuario.val(),
            ApellidoMaterno: txtApeMaternoUsuario.val(),
            Telefono: txtTelefono.val(),
            Email: txtCorreoElectronico.val(),
            Activo: true,
            Token: "",
            FechaIngreso: "",
            FechaExpiracion: "",
            ImagenPerfil: imgEntrenador[0].src,
            IDUnico: "",
            TelefonoContacto: ""
        };
        const options = url + '/Usuario/postEditarPerfil';
        axios.post(options, parametros).then(function (response) {
            const result = response.data;
            if (result.SUCCESS == true) {
                console.log(result.ITEMS)
                MandarObjUsuarios(result.ITEMS)
            } else {
                Swal.fire('Incorrect username and/or password.');
            }
        }).catch(function (error) {
            console.error(error);
        });
    }

    const MandarObjUsuarios = function (parametros) {
        const options = '/Login/AsignarVariable';
        axios.post(options, parametros).then(function (response) {
            window.location.href = "/Home/Perfil";
        }).catch(function (error) {
            console.error(error);
        });
    }

    return {
        Inicializar: Inicializar,
    }
};