"use strict";

function Declaraciones(cfg) {

    this.cfg = cfg;
    this.cfg['subForms'] = [{
        'name': 'tblObsSummary',
        'fnClear': this.clear,
        'fnUpdate': this.lazyUpdate,
        'path': `${cfg['basePath']}/admin/observations/summary`,
        'fnGetPath': this.getPath,
        'async': true,
        'fnOnSelect': this.onSelect,
        'map': {
            'id': 'idseccion',
            'obs': 'n_observaciones',
            'date': 'last_date'
        },
        'options': {
            'render': false
        }
    }];

    this.cfg['onSelect'] = this.onSelect;
    this.cfg['onDblClick'] = null;

    IT.call(this, this.cfg);
}

Declaraciones.prototype = Object.create(IT.prototype);


Declaraciones.prototype.clear = function(tblName) {

    let rows = $(`#${tblName}`).find('tbody>tr');

    if (rows) {
        rows.each(function(index, tr) {

            let tds = $(tr).find('td');

            tds.each(function(idx, cell) {


                let td = $(cell);

                let id = td.attr('id');

                if (id.indexOf('obs_') > -1) {
                    td.text(0);
                }

                if (id.indexOf('date_') > -1) {
                    td.text('');
                }
            });
        });
    }
};

Declaraciones.prototype.getPath = function(basePath, selectedRow) {

    return `${basePath}/${selectedRow}`;
}
