"use strict";

function EstadoCivilCatalog(cfg, dtCfg) {

    var config = cfg;

    var dtConfig = {
        "table_name": "#tbl_catalogs",
        "lang_path": dtCfg.lang_path,
        "columns": [
            { "sTitle": "Estado Civil", "mData": "descripcion" },
            { "sTitle": "Estatus", "mData": "inactivo" },
            { "sTitle": "Acción", "mData": "idestadocivil" }
        ],
        "lst_path": dtCfg.lst_path,
        "render_edit_button": true,
        "render_delete_button": true,
        "status": { "render": true, "target": 1 },
        "targets": [2]
    };
    Catalog.call(this, config, dtConfig);
};

EstadoCivilCatalog.prototype = Object.create(Catalog.prototype);

EstadoCivilCatalog.prototype.edit = function(id) {
    var url = `${base_url}/${id}`,
        fields = [
            { 'form_name': 'id', 'record_name': 'idestadocivil' },
            { 'form_name': 'descripcion', 'record_name': 'descripcion' }
        ];

    Catalog.prototype.edit.call(this, url, fields);
};

EstadoCivilCatalog.prototype.destroy = function(id, inactive) {

    Catalog.prototype.destroy.call(this, id, '#tbl_catalogs', inactive);
};