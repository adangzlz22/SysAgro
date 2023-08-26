var LayoutControllers = function () {
    const url = '/Loyout/'
    const url2 = '/Login/'
    
    const btnCerrarSession = $('#btnCerrarSession');
    
    var Inicializar = function () {
        functionListar();
     
    }
    const functionListar = function () {
        btnCerrarSession.click(function () {
            obtener();
        });
    }
    const obtener = function () {
        let parametros = {
        
        }
        const options = url2 + 'postCerrarSession';
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