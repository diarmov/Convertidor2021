"use strict";


function showUnredeemed(idDependency, exercise)
{
    if (idDependency && exercise) {

        let _token = $("meta[name='csrf-token']").attr('content'),
            url = `${base_url}/dependencias/incumplidos/${idDependency}/${exercise}`;

    $.ajax({
        'url': url,
        'type': 'GET',
        'processData': false,
        'contentType': false,
        'dataType': 'json',

        beforeSend: function(xhr) {

            xhr.setRequestHeader('X-CSRF-TOKEN', _token);

            jsShowWindowLoad("Obteniendo datos, por favor espere!");
        },
        success: function (result) {

            if (result && result.hasOwnProperty('status') && (result['status'] === 200))
            {

                jsRemoveWindowLoad(); // remove loader

                $("#tblUnredeemed").unbind();

                $("#tblUnredeemed").DataTable(
                    {
                        destroy: true,
                        data: result['data'],
                        aoColumns: [
                            { "sTitle": "Nombre completo", "mData": "nombre_completo" },
                        ],
                        oLanguage: { "sUrl": `${base_url}/js/json/dt/Spanish.json` }
                    }
                );

                $("#spanDependency").html(result['dependencyName']);

                $("#mdlShowUnredeemed").modal("show");
            }
        },
        complete: function() {

            jsRemoveWindowLoad();
        },
        error: function (jqXHR, textStatus, errorThrown) {

            jsRemoveWindowLoad();
        }
    });

    }
}