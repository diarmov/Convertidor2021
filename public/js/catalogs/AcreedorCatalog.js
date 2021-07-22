"use strict";

function AcreedorCatalog(cfg, dtCfg) {

    var config = cfg;

    var dtConfig = {
        "table_name": "#tbl_catalogs",
        "lang_path": dtCfg.lang_path,
        "columns": [
            { "sTitle": "Acreedor", "mData": "acreedor" },
            { "sTitle": "Acción", "mData": "idacreedor" }
        ],
        "lst_path": dtCfg.lst_path,
        "render_edit_button": true,
        "render_delete_button": true,
        "targets": [1]
    };
    Catalog.call(this, config, dtConfig);
};

AcreedorCatalog.prototype = Object.create(Catalog.prototype);

AcreedorCatalog.prototype.edit = function(id) {
    var url = `${base_url}/${id}`,
        fields = [
            { 'form_name': 'id', 'record_name': 'idacreedor' },
            { 'form_name': 'acreedor', 'record_name': 'acreedor' }
        ];

    Catalog.prototype.edit.call(this, url, fields);
};

AcreedorCatalog.prototype.destroy = function(id) {

    Catalog.prototype.destroy.call(this, id, '#tbl_catalogs');
};