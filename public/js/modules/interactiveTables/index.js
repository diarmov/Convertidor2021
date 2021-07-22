"use strict";

function IT(cfg) {

    this.tblName = cfg['tblName'];
    this.subForms = cfg['subForms'];
    this.base_path = cfg['basePath'];
    this.onSelect = cfg['onSelect'];
    this.onDblClick = cfg['onDblClick'];
    this.map = cfg['map'];
    this.tbody = cfg['tbody'];
};

IT.prototype.init = function() {

    let _self = this;

    if ($(`#${this.tblName}_selected`).length == 0) {
        $(`#${this.tblName}`).append(`<input type='hidden' id='${this.tblName}_selected' value=''/>`);
    }

    $(`#${this.tblName}>tbody>tr`).click(function() {

        let tr = this;
        let rows = $(`#${_self.tblName}`).find('> tbody > tr'),
            selectedRow = tr.getAttribute('id');

        if (selectedRow) {
            selectedRow = selectedRow.substring(selectedRow.indexOf('_') + 1);
        }

        $(`#${_self.tblName}_selected`).val(selectedRow);

        rows.each(function(index, row) {

            let rowId = row.getAttribute('id');

            if (rowId) {

                rowId = rowId.substring(rowId.indexOf('_') + 1);

                if (rowId == selectedRow) {
                    row.style.backgroundColor = "#269abc";
                    row.style.color = "#fff";
                    row.style.fontWeight = "bold";
                } else {
                    row.style.backgroundColor = "";
                    row.style.color = "";
                    row.style.fontWeight = "";
                }
            }
        });

        _self.renderSubForms(selectedRow);

        _self.onSelect();
    });


    $(`#${this.tblName}>tbody>tr`).dblclick(function() {

        let tr = this;

        _self.onDblClick(tr);
    });

    $(`#${_self.tblName}`).find('> tbody > tr:first').click();
};

IT.prototype.renderSubForms = function(selectedRow) {


    if (this.subForms.length > 0) {

        this.subForms.forEach(subForm => {

            let _token = $("meta[name='csrf-token']").attr('content');

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': _token
                },
                async: subForm['async']
            });

            let _path = subForm.fnGetPath(subForm['path'], selectedRow);

            if (_path) {

                $.get(_path, function(response) {

                    subForm.fnClear(subForm['name']);

                    if ((response['status'] === 200) && (response['total'] > 0)) {

                        response['data'].forEach(function(row) {

                            subForm.fnUpdate(row, subForm['name']);
                        });
                    }

                });

                $(`#${subForm['name']}`).find('> tbody > tr:first').click();
            }
        });
    }
};

IT.prototype.clearSubForm = function(subFormName) {

    let tbody = $(`#${subFormName}`).find('tbody');

    tbody.html("");
};

IT.prototype.lazyUpdate = function(row) {

    if (!isEmpty(this.map)) {

        let idName = this.map['id'];
        let id = row[idName];

        for (let key in this.map) {
            if (key != 'id') {
                let cell = $(`#${key}_${id}`);

                cell.text(row[this.map[key]]);
            }
        }
    }
};

IT.prototype.update = function(row, subForm) {

    let html = "";

    if (!isEmpty(this.map) && (this.tbody.length > 0)) {

        html = `<tr id='${this.name}_${row[this.map['id']]}'>`;

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

IT.prototype.renderEditBtn = function(tblName, id) {

    let html = "";

    if (this.renderEditBtn) {
        let icon = getIcon('edit', true);
        html += `<a href='#!' title="Editar" onclick="${this.onEdit}('${tblName}', ${id});" id='${tblName}_edit_${id}' class='btn btn-sm btn-warning'>${icon}</a>`;
    }

    return html;
};

IT.prototype.renderDeleteBtn = function(tblName, id) {

    let html = "";

    if (this.renderDeleteBtn) {
        let icon = getIcon('delete', true);
        html += `<a href='#!' title="Eliminar" onclick="${this.onDelete}('${tblName}', ${id});" id='${tblName}_delete_${id}' class='btn btn-sm btn-danger'>${icon}</a>`;
    }

    return html;
}

IT.prototype.onSelect = function() {};

IT.prototype.onDblClick = function () {};

IT.prototype.getPath = function(basePath, selectedRow) {

    if (selectedRow) {

        return `${basePath}/${selectedRow}`;
    } else {
        return false;
    }
};
