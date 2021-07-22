"use strict";

function Status (url)
{
    this.url = url;
}

Status.prototype.init = function () {

    this.initSinCambios();
    this.initBaja();
};

Status.prototype.initSinCambios = function () {

    let _self = this;

    jQuery(".btnSinCambios").on('click', function () {

        let id = jQuery(this).attr('idx');

        alertify.confirm("¿Esta seguro de MARCAR éste registro como 'SIN CAMBIO'?.", function () {

            let operation = 'sin_cambio';

            _self.update(id, operation);
        }).set({
            title: "Confirmación",
            labels: {
                ok: "Sí",
                cancel: "No"
            }
        });

    });
};

Status.prototype.initBaja = function () {

    let _self = this;

    jQuery(".btnBaja").on('click', function () {

        if ($(`#${this.frmId}`).isValid())
        {

            let id = jQuery(this).attr('idx');

            alertify.confirm("¿Esta seguro de MARCAR éste registro como 'BAJA'?", function () {


                    let operation = 'baja';

                _self.update(id, operation);
            }).set({
                title: "Confirmación",
                labels: {
                    ok: "Sí",
                    cancel: "No"
                }
            });
        }
    });
};

Status.prototype.update = function (id, operation) {

    let _token = $("meta[name='csrf-token']").attr('content'),
        _data  = {
            'id'    : id,
            'operation': operation
        },
        _self  = this;


    $.ajax({
        'beforeSend': function (xhr) {
            jsShowWindowLoad("Actualizando registro!")
            xhr.setRequestHeader('X-CSRF-TOKEN', _token);
        },
        'dataType': 'json',
        'data': _data,
        'type': 'POST',
        'url': _self.url,
        'success': function(response) {


           if (response && response.hasOwnProperty('status') && response['status'] === 400)
                {
                    jsRemoveWindowLoad();
                    alert(response['msg']);
                }

            if (response && response.hasOwnProperty('status') && response['status'] === 200)
            {
                jsRemoveWindowLoad();
                location.reload();
            }
        },
        'error': function () {
            jsRemoveWindowLoad();

        }
    });
};
