"use strict";

function PaisCatalog(cfg, dtCfg) {

    var config = cfg;

    var dtConfig = {
        "table_name": "#tbl_catalogs",
        "lang_path": dtCfg.lang_path,
        "columns": [
            { "sTitle": "Clave", "mData": "clave" },
            { "sTitle": "Pais", "mData": "nombre_pais" },
            { "sTitle": "Estatus", "mData": "inactivo" },
            { "sTitle": "Acción", "mData": "idpais" }
        ],
        "lst_path": dtCfg.lst_path,
        "render_edit_button": true,
        "render_delete_button": true,
        "status": { "render": true, "target": 2 },
        "targets": [3]
    };
    Catalog.call(this, config, dtConfig);
};

PaisCatalog.prototype = Object.create(Catalog.prototype);

PaisCatalog.prototype.edit = function(id) {
    var url = `${base_url}/${id}`,
        fields = [
            { 'form_name': 'id', 'record_name': 'idpais' },
            { 'form_name': 'pais', 'record_name': 'nombre_pais' },
            { 'form_name': 'clave', 'record_name': 'clave' }
        ];

    Catalog.prototype.edit.call(this, url, fields);
};

PaisCatalog.prototype.destroy = function(id, inactive) {

    Catalog.prototype.destroy.call(this, id, '#tbl_catalogs', inactive);
};