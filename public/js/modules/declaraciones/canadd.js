"use strict";

function canAdd(base_url, idDeclarant)
{
    let _token = $("meta[name='csrf-token']").attr('content'),
        _url = `${base_url}/canAddDeclaration/${idDeclarant}`,
        _redirectTo = `${base_url}/declaracionAd`;

    if (idDeclarant && _token)
    {
        $.ajax({

            'beforeSend': function(xhr) {
                xhr.setRequestHeader('X-CSRF-TOKEN', _token);
                jsShowWindowLoad("Verificando, por favor espere!");
            },
            'dataType': 'json',
            'type': 'GET',
            'url': _url,
            'async': false,
            'success': function(response) {

                if (response && (response.hasOwnProperty('status')) && (response['status'] === 200))
                {
                    // alertify.notify(response['msg'], 'success', 10);
                    window.location = _redirectTo;
                } else {

                    alertify.notify(response['msg'], 'error', 15);
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