"use strict";

function FrecuenciaAnualCatalog(cfg, dtCfg) {

    var config = cfg;

    var dtConfig = {
        "table_name": "#tbl_catalogs",
        "lang_path": dtCfg.lang_path,
        "columns": [ /** Please change columns */
            { "sTitle": "Frecuencia", "mData": "frecuencia" },
            { "sTitle": "Estatus", "mData": "inactivo" },
            { "sTitle": "Acción", "mData": "idfrecuencia" }
        ],
        "lst_path": dtCfg.lst_path,
        "render_edit_button": true,
        "render_delete_button": true,
        "status": { "render": true, "target": 1 },
        "targets": [2]
    };
    Catalog.call(this, config, dtConfig);
};

FrecuenciaAnualCatalog.prototype = Object.create(Catalog.prototype);

FrecuenciaAnualCatalog.prototype.edit = function(id) {
    var url = `${base_url}/${id}`,
        fields = [
            { 'form_name': 'id', 'record_name': 'idfrecuencia' },
            { 'form_name': 'frecuencia', 'record_name': 'frecuencia' }
        ];

    Catalog.prototype.edit.call(this, url, fields);
};

FrecuenciaAnualCatalog.prototype.destroy = function(id, inactive) {

    Catalog.prototype.destroy.call(this, id, '#tbl_catalogs', inactive);
};


FrecuenciaAnualCatalog.prototype.clear = function() {

    Catalog.prototype.clear.call(this);
    $("#tipo").val("1");
}