"use strict";

function EstatusEscolarCatalog(cfg, dtCfg) {

    var config = cfg;

    var dtConfig = {
        "table_name": "#tbl_catalogs",
        "lang_path": dtCfg.lang_path,
        "columns": [ /** Please change columns */
            { "sTitle": "Estado de la Escolaridad", "mData": "estatus" },
            { "sTitle": "Estatus", "mData": "inactivo" },
            { "sTitle": "Acción", "mData": "idescolaridad_estatus" }
        ],
        "lst_path": dtCfg.lst_path,
        "render_edit_button": true,
        "render_delete_button": true,
        "status": { "render": true, "target": 1 },
        "targets": [2]
    };
    Catalog.call(this, config, dtConfig);
};

EstatusEscolarCatalog.prototype = Object.create(Catalog.prototype);

EstatusEscolarCatalog.prototype.edit = function(id) {
    var url = `${base_url}/${id}`,
        fields = [
            { 'form_name': 'id', 'record_name': 'idescolaridad_estatus' },
            { 'form_name': 'estatus', 'record_name': 'estatus' }
        ];

    Catalog.prototype.edit.call(this, url, fields);
};

EstatusEscolarCatalog.prototype.destroy = function(id, inactive) {

    Catalog.prototype.destroy.call(this, id, '#tbl_catalogs', inactive);
};