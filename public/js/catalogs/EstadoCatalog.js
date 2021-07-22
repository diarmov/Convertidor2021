"use strict";

function EstadoCatalog(cfg, dtCfg) {

    var config = cfg;

    var dtConfig = {
        "table_name": "#tbl_catalogs",
        "lang_path": dtCfg.lang_path,
        "columns": [ /** Please change columns */
            { "sTitle": "País", "mData": "pais" },
            { "sTitle": "Clave", "mData": "clave" },
            { "sTitle": "Estado", "mData": "estado" },
            { "sTitle": "Estatus", "mData": "inactivo" },
            { "sTitle": "Acción", "mData": "idestado" }
        ],
        "lst_path": dtCfg.lst_path,
        "render_edit_button": true,
        "render_delete_button": true,
        "status": { "render": true, "target": 3 },
        "targets": [4]
    };
    Catalog.call(this, config, dtConfig);
};

EstadoCatalog.prototype = Object.create(Catalog.prototype);

EstadoCatalog.prototype.edit = function(id) {
    var url = `${base_url}/${id}`,
        fields = [
            { 'form_name': 'id', 'record_name': 'idestado' },
            { 'form_name': 'clave', 'record_name': 'clave' },
            { 'form_name': 'estado', 'record_name': 'estado' },
            { 'form_name': 'idpais', 'record_name': 'idpais' }
        ];

    Catalog.prototype.edit.call(this, url, fields);
};

EstadoCatalog.prototype.destroy = function(id, inactive) {

    Catalog.prototype.destroy.call(this, id, '#tbl_catalogs', inactive);
};