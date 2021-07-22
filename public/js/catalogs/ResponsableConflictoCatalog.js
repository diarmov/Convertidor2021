"use strict";

function ResponsableConflictoCatalog(cfg, dtCfg) {

    var config = cfg;

    var dtConfig = {
        "table_name": "#tbl_catalogs",
        "lang_path": dtCfg.lang_path,
        "columns": [
            { "sTitle": "Responsable del conflicto de Interés", "mData": "responsable" },
            { "sTitle": "Estatus", "mData": "inactivo" },
            { "sTitle": "Acción", "mData": "idresponsable" }
        ],
        "lst_path": dtCfg.lst_path,
        "render_edit_button": true,
        "render_delete_button": true,
        "status": { "render": true, "target": 1 },
        "targets": [2]
    };
    Catalog.call(this, config, dtConfig);
};

ResponsableConflictoCatalog.prototype = Object.create(Catalog.prototype);

ResponsableConflictoCatalog.prototype.edit = function(id) {
    var url = `${base_url}/${id}`,
        fields = [
            { 'form_name': 'id', 'record_name': 'idresponsable' },
            { 'form_name': 'responsable', 'record_name': 'responsable' }
        ];

    Catalog.prototype.edit.call(this, url, fields);
};

ResponsableConflictoCatalog.prototype.destroy = function(id, inactive) {

    Catalog.prototype.destroy.call(this, id, '#tbl_catalogs', inactive);
};