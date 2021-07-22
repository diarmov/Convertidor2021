"use strict";

function DocumentoEstudioCatalog(cfg, dtCfg) {

    var config = cfg;

    var dtConfig = {
        "table_name": "#tbl_catalogs",
        "lang_path": dtCfg.lang_path,
        "columns": [ /** Please change columns */
            { "sTitle": "Documento", "mData": "documento" },
            { "sTitle": "Estatus", "mData": "inactivo" },
            { "sTitle": "Acción", "mData": "iddocumento" }
        ],
        "lst_path": dtCfg.lst_path,
        "render_edit_button": true,
        "render_delete_button": true,
        "status": { "render": true, "target": 1 },
        "targets": [2]
    };
    Catalog.call(this, config, dtConfig);
};

DocumentoEstudioCatalog.prototype = Object.create(Catalog.prototype);

DocumentoEstudioCatalog.prototype.edit = function(id) {
    var url = `${base_url}/${id}`,
        fields = [
            { 'form_name': 'id', 'record_name': 'iddocumento' },
            { 'form_name': 'documento', 'record_name': 'documento' }
        ];

    Catalog.prototype.edit.call(this, url, fields);
};

DocumentoEstudioCatalog.prototype.destroy = function(id, inactive) {

    Catalog.prototype.destroy.call(this, id, '#tbl_catalogs', inactive);
};