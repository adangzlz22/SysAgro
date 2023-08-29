var RegistrateControllers = function () {
    const url = urlGlobal

    const txtUsuario = $('#txtUsuario');
    const txtCorreo = $('#txtCorreo');
    const btnCrearCuenta = $('#btnCrearCuenta');
    const txtContrasena = $('#txtContrasena');
    const txtVerifyContrasena = $('#txtVerifyContrasena');
    const txtFirstName = $('#txtFirstName');
    const txtLastName = $('#txtLastName');
    const txtErrror = $('#txtErrror');
    let block = 'block';
    
    var Inicializar = function () {
        functionListar();
    }
    const functionListar = function () {
        btnCrearCuenta.click(function () {
            obtener();
        });
        txtContrasena.on('input', function () {
            if (txtContrasena.val().length <= 8) {
                txtErrror.text('The password cannot be less than 8 digits');
                txtErrror.css('display', block);
                return;
            } else {
                txtErrror.css('display', 'none');
            }
        });
        txtVerifyContrasena.on('input',function () {
            if (txtContrasena.val() != txtVerifyContrasena.val()) {
                txtErrror.text('the passwords are not the same');
                txtErrror.css('display', block);
                return;
            } else {
                txtErrror.css('display', 'none');
            }
        });
    }
    const obtener = function () {
        if (txtContrasena.val().length <= 8) {
            txtErrror.text('The password cannot be less than 8 digits');
            txtErrror.css('display', block);
            return;
        }
        if (txtContrasena.val() != txtVerifyContrasena.val()) {
            txtErrror.text('the passwords are not the same');
            txtErrror.css('display', block);
            return;
        }

        if (txtContrasena.val() == '') {
            txtErrror.text('empty user please put one');
            txtErrror.css('display', block);
            return;
        }
        if (txtVerifyContrasena.val() == '') {
            txtErrror.text('empty user please put one');
            txtErrror.css('display', block);
            return;
        }
        if (txtFirstName.val() == '') {
            txtErrror.text('empty user please put one');
            txtErrror.css('display', block);
            return;
        }
        if (txtLastName.val() == '') {
            txtErrror.text('empty user please put one');
            txtErrror.css('display', block);
            return;
        }
        if (txtCorreo.val() == '') {
            txtErrror.text('Please enter an email');
            txtErrror.css('display', block);
            return;
        }
        if (txtUsuario.val() == '') {
            txtErrror.text('empty user please put one');
            txtErrror.css('display', block);
            return;
        }
        let parametros = {
            Usuario: txtUsuario.val(),
            Email: txtCorreo.val(),
            Contrasena: txtContrasena.val(),
            Nombre: txtFirstName.val(),
            ApellidoPaterno: txtLastName.val(),
            Email: txtCorreo.val(),
        }
        const options = url + '/Usuario/postRegistrarse';
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