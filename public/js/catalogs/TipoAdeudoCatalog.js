"use strict";

function TipoAdeudoCatalog(cfg, dtCfg) {

    var config = cfg;

    var dtConfig = {
        "table_name": "#tbl_catalogs",
        "lang_path": dtCfg.lang_path,
        "columns": [ /** Please change columns */
            { "sTitle": "Adeudo", "mData": "adeudo" },
            { "sTitle": "Estatus", "mData": "inactivo" },
            { "sTitle": "Acción", "mData": "idtipoadeudo" }
        ],
        "lst_path": dtCfg.lst_path,
        "render_edit_button": true,
        "render_delete_button": true,
        "status": { "render": true, "target": 1 },
        "targets": [2]
    };
    Catalog.call(this, config, dtConfig);
};

TipoAdeudoCatalog.prototype = Object.create(Catalog.prototype);

TipoAdeudoCatalog.prototype.edit = function(id) {
    var url = `${base_url}/${id}`,
        fields = [
            { 'form_name': 'id', 'record_name': 'idtipoadeudo' },
            { 'form_name': 'adeudo', 'record_name': 'adeudo' }
        ];

    Catalog.prototype.edit.call(this, url, fields);
};

TipoAdeudoCatalog.prototype.destroy = function(id, inactive) {

    Catalog.prototype.destroy.call(this, id, '#tbl_catalogs', inactive);
};


TipoAdeudoCatalog.prototype.clear = function() {

    Catalog.prototype.clear.call(this);
    $("#tipo").val("1");
}