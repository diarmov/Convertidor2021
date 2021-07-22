"use strict";

function Summary(cfg, observations) {

    this.cfg = cfg;

    this.cfg['subForms'] = [{
        'name': 'tblObservations',
        'fnClear': this.clear,
        'fnUpdate': this.update,
        'path': `${cfg['basePath']}/admin/observations`,
        'fnGetPath': this.getPath,
        'async': false,
        'childForm': 'tblAttached',
        'fnOnSelect': this.onSelect,
        'map': {
            'id': 'id',
            'rubros': 'rubros',
            'obs': 'correccion',
            'fecha': 'fecha_es'
        },
        'options': {
            'render': false,
            'renderEditBtn': false,
            'renderDeleteBtn': false,
            'fnRenderEditBtn': this.renderEditBtn,
            'fnRenderDeleteBtn': this.renderDeleteBtn,
            'onEdit': "Observation.prototype.onEdit",
            'onDelete': "Observation.prototype.onDelete"
        },
        'tbody': $(`#tblObservations`).find('tbody'),
    }];

    this.cfg['onSelect'] = this.onSelect;
    this.cfg['onDblClick'] = null;

    this.observations = observations;

    IT.call(this, this.cfg);
}


Summary.prototype = Object.create(IT.prototype);

Summary.prototype.getPath = function(basePath, idSection) {

    let idDeclaration = $("#tblDeclaraciones_selected").val();

    return `${basePath}/${idDeclaration}/${idSection}`;
};

Summary.prototype.onSelect = function() {

    let rows = $("#tblObservations").find("tbody>tr");

    let review = new Review(base_url, `${base_url}/admin/observation/renderIndex`);
    review.init();

    if (rows.length > 0) {

        this.observations.init();

    } else {

        if ($("#tblObservations_selected").length > 0) {

            $("#tblObservations_selected").val("");
        }
    }
}

Summary.prototype.onEdit = function(tblName, id) {

};

Summary.prototype.onDelete = function(tblName, id) {

};

Summary.prototype.clear = function(subFormName) {

    if (this.hasOwnProperty('childForm')) {

        $(`#${this.childForm}`).find('tbody').html('');
    }
    IT.prototype.clearSubForm.call(this, subFormName);
};

Summary.prototype.update = function(row, subForm) {

    let html = "";

    if (!isEmpty(this.map) && (this.tbody.length > 0)) {

        html = `<tr title='Doble click para EDITAR!' tbl='${row["tabla"]}' tbl_id='${row["tabla_id"]}' id='${this.name}_${row[this.map['id']]}'>`;

        let idName = this.map['id'];
        let id = row[idName];

        for (let key in this.map) {

            if (key != 'id') {

                let content = (row[this.map[key]]) ? row[this.map[key]] : '';
                html += `<td id='${this.name}_${key}_${id}'>${content}</td>`;
            }
        }

        if (this.options['render']) {
            html += "<td>";
            html += this.options.fnRenderEditBtn(this.name, id);
            html += this.options.fnRenderDeleteBtn(this.name, id);
            html += "</td>";
        }

        html += "</tr>";

        $(this.tbody).append(html);
    }
};
