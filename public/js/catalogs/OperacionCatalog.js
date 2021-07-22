"use strict";

function OperacionCatalog(cfg, dtCfg) {

    var config = cfg;

    var dtConfig = {
        "table_name": "#tbl_catalogs",
        "lang_path": dtCfg.lang_path,
        "columns": [ /** Please change columns */
            { "sTitle": "Operación", "mData": "operacion" },
            { "sTitle": "Estatus", "mData": "inactivo" },
            { "sTitle": "Acción", "mData": "idoperacion" }
        ],
        "lst_path": dtCfg.lst_path,
        "render_edit_button": true,
        "render_delete_button": true,
        "status": { "render": true, "target": 1 },
        "targets": [2]
    };
    Catalog.call(this, config, dtConfig);
};

OperacionCatalog.prototype = Object.create(Catalog.prototype);

OperacionCatalog.prototype.edit = function(id) {
    var url = `${base_url}/${id}`,
        fields = [
            { 'form_name': 'id', 'record_name': 'idoperacion' },
            { 'form_name': 'operacion', 'record_name': 'operacion' }
        ];

    Catalog.prototype.edit.call(this, url, fields);
};

OperacionCatalog.prototype.destroy = function(id, inactive) {

    Catalog.prototype.destroy.call(this, id, '#tbl_catalogs', inactive);
};


OperacionCatalog.prototype.clear = function() {

    Catalog.prototype.clear.call(this);
    $("#tipo").val("1");
}