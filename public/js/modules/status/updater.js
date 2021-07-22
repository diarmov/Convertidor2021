"use strict";

function Updater(url, frmId)
{
    this.url = url;
    this.frmId = frmId;

    Status.call(this, this.url); // inherithance step 1
}

Updater.prototype = Object.create(Status.prototype); // inheritance step 2

Updater.prototype._init = function () {

    this.initBaja();
    this.initSinCambios();
    this.initSave();
};

Updater.prototype.initBaja = function () {

    let _self = this;

    $(".btnBaja").on('click', function (event) {

        let id = $(this).attr('idx');

        if (id)
        {
            alertify.confirm("¿Esta seguro de MARCAR éste registro como 'BAJA'?<br> <b>Una vez dado de baja no podrá realizar ninguna modificación</b>", function() { // Se ejecuta cuando presiona Ok

                clearForm(_self.frmId, event);

                $("#id").val(id);
                $("#divMdlBaja").modal('show');

            }).set({
                title: "Confirmación",
                labels: {
                    ok: "Sí",
                    cancel: "No"
                }
            });

        }
    });

    $("#divMdlBaja").on('hidden.bs.modal', function (event) {

        clearForm('frmBaja', event);
    });
};

Updater.prototype.initSave = function () {

    let _self = this;

    $("#btnSave").click(function () {

        if ($(`#${_self.frmId}`).isValid())
        {
            _self.update();
        }

    });

};

Updater.prototype.update = function (id, operation) {

    let _data = null,
        frm = $(`#${this.frmId}`),
        _token = $("meta[name='csrf-token']").attr('content'),
        _self = this;

    if (id && operation) {

        _data = {
            'id': id,
            'operacion': operation
        };
    } else if (frm.length > 0){

        _data = frm.serializeArray();
    }

    if (_data) {

        $.ajax({
            'beforeSend': function (xhr) {
                jsShowWindowLoad("Actualizando registro!");
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
            },
            'completed': function () {

                jsRemoveWindowLoad();
            }
        });
    }
};