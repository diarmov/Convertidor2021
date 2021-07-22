"use strict";

function MunicipioCatalog(cfg, dtCfg) {

    var config = cfg;

    var dtConfig = {
        "table_name": "#tbl_catalogs",
        "lang_path": dtCfg.lang_path,
        "columns": [
            { "sTitle": "País", "mData": "pais" },
            { "sTitle": "Estado", "mData": "estado" },
            { "sTitle": "Municipio", "mData": "nombre_municipio" },
            { "sTitle": "Estatus", "mData": "inactivo" },
            { "sTitle": "Acción", "mData": "idmunicipio" }
        ],
        "lst_path": dtCfg.lst_path,
        "render_edit_button": true,
        "render_delete_button": true,
        "status": { "render": true, "target": 3 },
        "targets": [4]
    };
    Catalog.call(this, config, dtConfig);
};


MunicipioCatalog.prototype = Object.create(Catalog.prototype);


MunicipioCatalog.prototype.edit = function(id) {
    var url = `${base_url}/${id}`,
        _self = this;

    $("#idpais").val();


    $.get(url, function(result) {

        var idcountry = result['idpais'],
            idstate = result['idestado'];

        _self.loadStates(idcountry, idstate);

        $("#clave").val(result['clave']);
        $("#municipio").val(result['nombre_municipio']);
        $("#id").val(result['idmunicipio']);
    });

};


MunicipioCatalog.prototype.destroy = function(id, inactive) {

    Catalog.prototype.destroy.call(this, id, '#tbl_catalogs', inactive);
};


MunicipioCatalog.prototype.init_form = function() {

    this.changeCountry();
    Catalog.prototype.init_form.call(this);
};


MunicipioCatalog.prototype.changeCountry = function() {

    var _self = this;

    $("#idpais").change(function() {

        var idcountry = $("#idpais").val(),
            idstate = $("#idestado").val();

        _self.loadStates(idcountry, idstate);
    });
}

MunicipioCatalog.prototype.loadStates = function(idcountry, idstate) {

    var url = `${base_url}/lstEstados/${idcountry}`,
        comboEstado = $("#idestado");

    $("#idpais").val(idcountry);

    comboEstado
        .find('option')
        .remove()
        .end()
        .append('<option value="">-- Seleccione un Estado --</option>');

    $.get(url, function(states) {

        if (states && (states.length > 0)) {

            states.forEach(state => {

                comboEstado.append(`<option value='${state.idestado}'>${state.estado}</option>`);
            });
        }

        if (idstate) {
            comboEstado.val(idstate);
        }
    });
}
