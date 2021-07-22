"use strict";


function Catalog(config, dtConfig) {
    this.config = config;
    this.dtConfig = dtConfig;
};

Catalog.prototype.init_dt = function() {

    var _self = this;

    $(this.dtConfig['table_name']).DataTable({
        processing: false,
        serverSide: true,
        oLanguage: { "sUrl": this.dtConfig['lang_path'] },
        ajax: this.dtConfig['lst_path'],
        initComplete: function() {
            $('div.dataTables_filter input').addClass('form-control');
        },
        "aoColumns": this.dtConfig['columns'],

        "aoColumnDefs": [{
                    "mRender": function(data, type, row) {

                        if (data) {

                            return _self.rederEditButton(_self.dtConfig['render_edit_button'], _self.config['obj_source'], data) +
                                _self.renderDeleteButton(_self.dtConfig['render_delete_button'], _self.config['obj_source'], data, row['inactivo']);
                        } else {

                            return '';
                        }
                    },
                    "bSortable": false,
                    "targets": _self.dtConfig['targets']
                },

                {
                    "mRender": function(data) {

                        return _self.renderStatus(_self.dtConfig['status']['render'], data);
                    },
                    "bSortable": true,
                    "targets": _self.dtConfig['status']['target']
                }
            ] // end column defs
    });

};

Catalog.prototype.rederEditButton = function(render, source, data) {

    return (render) ? `<a name='btnEdit' title='Editar' href='#linkForm' onclick='${source}.prototype.edit(${data})' class='btn btn-warning'><span class="fa fa-pen"></span></a>` : '';
};

Catalog.prototype.renderDeleteButton = function(render, source, data, inactive) {

    var icon = (inactive == 0) ? "<i class='fa fa-trash'></i>" : "<i class='fas fa-undo'></i>",
        color = (inactive == 0) ? 'btn-danger' : 'btn-primary',
        title = (inactive == 0) ? 'Inactivar' : 'Reactivar';

    return (render) ? `<a href='#!' title='${title}' onclick='${source}.prototype.destroy(${data}, ${inactive})' class='btn ${color}'>${icon}</a>` : '';
};

Catalog.prototype.edit = function(url, fields) {

    $.get(url, function(result) {

        if ((result !== null) && Catalog.prototype.validateFields(result, fields)) {

            fields.forEach(function(field) {

                $(`#${field['form_name']}`).val(result[field['record_name']]);
            });

        } else {
            // send message
        }
    });

}

Catalog.prototype.validateFields = function(obj, fields) {

    var isValid = true;

    for (var i = 0; i < fields.length; i++) {

        if (!obj.hasOwnProperty(fields[i]['record_name'])) {
            isValid = false;
            break;
        }
    }

    return isValid;
};

Catalog.prototype.init_save = function() {

    var _self = this;

    $(`#${this.config['form_name']}`).submit(function(event) {
        event.preventDefault();
        return false;
    });

    $.validate({

        form: '#' + _self.config['form_name'],
        // modules: "security, date",
        onError: function($form) {
            alert("Hay elementos que debe cuidar para poder procesar.");
        },
        onSuccess: function($form) {

            var frmData = $form.serializeArray(),
                _token = $("meta[name='csrf-token']").attr('content');

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': _token
                }
            });

            $.post(base_url, frmData, function(result) {

                if ((result !== null) && result['status'] === 200) {

                    $(`${_self.dtConfig['table_name']}`).DataTable().ajax.reload(null, false);

                    alertify.notify(result['msg'], 'success', 10);
                } else {

                    alertify.notify(result['msg'], 'error', 15);
                }

            });
            _self.clear();
            return false;
        },
        onElementValidate: function(valid, $el, $form, errorMess) {}
    });
};

Catalog.prototype.init_reset = function() {

    $(`#${this.config['form_name']}`).on('reset', function() {

        $('#id').val('');
    });
}

Catalog.prototype.init_form = function() {
    this.init_save();
    this.init_reset();
}


Catalog.prototype.clear = function() {

    $(`#${this.config['form_name']}`).trigger('reset');
};

Catalog.prototype.destroy = function(id, table_name, inactive) {

    var msg = (inactive == 0) ? '¿Esta seguro de ELIMINAR éste registro?' : '¿Está seguro de REACTIVAR éste registro?';

    alertify.confirm(msg, function() { // Se ejecuta cuando presiona Ok

        var _token = $("meta[name='csrf-token']").attr('content');

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': _token
            }
        });

        var _url = `${base_url}/${id}`;

        $.ajax({

            url: _url,
            type: 'DELETE',
            dataType: 'json',
            data: { "id": id, "_token": _token },
            success: function(response) {

                if ((response !== null) && (response.hasOwnProperty('status')) && (response.hasOwnProperty('msg'))) {

                    if (response['status'] === 200) {

                        alertify.notify(response['msg'], 'success', 10);
                        $(table_name).DataTable().ajax.reload(null, false);
                    } else {

                        alertify.notify(response['msg'], 'error', 10);
                    }
                } else {

                    alertify.notify('No se ha podido eliminar el registro!', 'error', 10);
                }
            },
            error: function(xhr) {
                console.log(xhr.responseText);
            }
        });

    }).set({
        labels: {
            ok: "Sí",
            cancel: "No"
        }
    });
};

Catalog.prototype.renderStatus = function(render, data) {

    var htmlStatus = '',
        divStart = `<div class='col-md-12 text-center'>`,
        divEnd = `</div>`;

    if (render) {

        htmlStatus = (data === 0) ? `<i class="fa fa-check text-success"></i>` : `<i class="fa text-danger fa-times"></i>`;
        htmlStatus = `${divStart}${htmlStatus}${divEnd}`;
    } else {

        htmlStatus = '';
    }

    return htmlStatus;
}