"use strict";

function TitularCatalog(cfg, dtCfg) {

    var config = cfg;

    var dtConfig = {
        "table_name": "#tbl_catalogs",
        "lang_path": dtCfg.lang_path,
        "columns": [ /** Please change columns */
            { "sTitle": "Titular", "mData": "titular" },
            { "sTitle": "Estatus", "mData": "inactivo" },
            { "sTitle": "Acción", "mData": "idtitular" }
        ],
        "lst_path": dtCfg.lst_path,
        "render_edit_button": true,
        "render_delete_button": true,
        "status": { "render": true, "target": 1 },
        "targets": [2]
    };
    Catalog.call(this, config, dtConfig);
};

TitularCatalog.prototype = Object.create(Catalog.prototype);

TitularCatalog.prototype.edit = function(id) {
    var url = `${base_url}/${id}`,
        fields = [
            { 'form_name': 'id', 'record_name': 'idtitular' },
            { 'form_name': 'titular', 'record_name': 'titular' }
        ];

    Catalog.prototype.edit.call(this, url, fields);
};

TitularCatalog.prototype.destroy = function(id, inactive) {

    Catalog.prototype.destroy.call(this, id, '#tbl_catalogs', inactive);
};


TitularCatalog.prototype.clear = function() {

    Catalog.prototype.clear.call(this);
    $("#tipo").val("1");
}