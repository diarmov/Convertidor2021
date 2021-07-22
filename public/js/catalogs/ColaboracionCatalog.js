"use strict";

function ColaboracionCatalog(cfg, dtCfg) {

    var config = cfg;

    var dtConfig = {
        "table_name": "#tbl_catalogs",
        "lang_path": dtCfg.lang_path,
        "columns": [ /** Please change columns */
            { "sTitle": "Tipo de Colaboración o Participación", "mData": "colaboracion" },
            { "sTitle": "Estatus", "mData": "inactivo" },
            { "sTitle": "Acción", "mData": "idtipo_colaboracion" }
        ],
        "lst_path": dtCfg.lst_path,
        "render_edit_button": true,
        "render_delete_button": true,
        "status": { "render": true, "target": 1 },
        "targets": [2]
    };
    Catalog.call(this, config, dtConfig);
};

ColaboracionCatalog.prototype = Object.create(Catalog.prototype);

ColaboracionCatalog.prototype.edit = function(id) {
    var url = `${base_url}/${id}`,
        fields = [
            { 'form_name': 'id', 'record_name': 'idtipo_colaboracion' },
            { 'form_name': 'colaboracion', 'record_name': 'colaboracion' }
        ];

    Catalog.prototype.edit.call(this, url, fields);
};

ColaboracionCatalog.prototype.destroy = function(id, inactive) {

    Catalog.prototype.destroy.call(this, id, '#tbl_catalogs', inactive);
};


ColaboracionCatalog.prototype.clear = function() {

    Catalog.prototype.clear.call(this);
    $("#tipo").val("1");
}