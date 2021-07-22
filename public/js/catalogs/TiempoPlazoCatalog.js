"use strict";

function TiempoPlazoCatalog(cfg, dtCfg) {

    var config = cfg;

    var dtConfig = {
        "table_name": "#tbl_catalogs",
        "lang_path": dtCfg.lang_path,
        "columns": [
            { "sTitle": "Plazo", "mData": "plazo" },
            { "sTitle": "Estatus", "mData": "inactivo" },
            { "sTitle": "Acción", "mData": "idtiempo_plazo" }
        ],
        "lst_path": dtCfg.lst_path,
        "render_edit_button": true,
        "render_delete_button": true,
        "status": { "render": true, "target": 1 },
        "targets": [2]
    };
    Catalog.call(this, config, dtConfig);
};

TiempoPlazoCatalog.prototype = Object.create(Catalog.prototype);

TiempoPlazoCatalog.prototype.edit = function(id) {
    var url = `${base_url}/${id}`,
        fields = [
            { 'form_name': 'id', 'record_name': 'idtiempo_plazo' },
            { 'form_name': 'plazo', 'record_name': 'plazo' }
        ];

    Catalog.prototype.edit.call(this, url, fields);
};

TiempoPlazoCatalog.prototype.destroy = function(id, inactive) {

    Catalog.prototype.destroy.call(this, id, '#tbl_catalogs', inactive);
};