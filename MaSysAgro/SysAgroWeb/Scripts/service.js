
var Service = function () {

    
    var PostToken = function (Url, objModel, funcallback) {
        
        $.ajax({
            url: Url,
            type: 'POST',
            data: JSON.stringify(objModel),
            contentType: "application/json; charset=utf-8",
            dataType: 'json',
            beforeSend: function (xhr) {
            },
            success: function (result) {
                funcallback(result)
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                if (XMLHttpRequest.status == 401) {
                    errorThrown = "No autorizado";
                }
                funcallback({ ObjModResultado: { MsgError: "Error en la solicitud: " + textStatus + ", " + errorThrown } });
            }
        });
    }


    return {
        PostToken: PostToken,
    }
}
///Se crea la instancia desde que se agrega el archivo para que este global
var objService = new Service();