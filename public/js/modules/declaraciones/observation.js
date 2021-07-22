"use strict";

function Observation(cfg) {

    this.cfg = cfg;

    this.cfg['subForms'] = [];

    this.cfg['onSelect'] = this.onSelect;
    this.cfg['onDblClick'] = this.onDblClick;

    IT.call(this, this.cfg);
};

Observation.prototype = Object.create(IT.prototype);

Observation.prototype.update = function(row, subForm) {

    if (row && (this.tbody.length > 0)) {

        let icon = getIcon(row['extension'], true);
        this.tbody.append(`<tr><td>${icon} ${row['nombre']}</td></tr>`);
    }

};

Observation.prototype.onDelete = function(tblName, id) {

    alertify.confirm("¿Esta seguro de eliminar esta observación?", function() { // Se ejecuta cuando presiona Ok
        if (tblName && id) {

            let _token = $("meta[name='csrf-token']").attr('content'),
                _url = `${base_url}/admin/observations/${id}`;

            $.ajaxSetup({
                headers: {
                    'X-CSRF-TOKEN': _token
                },
                async: false
            });

            $.ajax({

                url: _url,
                type: 'DELETE',
                dataType: 'json',
                data: { "id": id, "_token": _token },
                success: function(response) {

                    if ((response !== null) && (response.hasOwnProperty('status')) && (response.hasOwnProperty('msg'))) {

                        if (response['status'] === 200) {

                            alertify.notify(response['msg'], 'success', 10);

                            let idDeclaration = $("#tblDeclaraciones_selected").val();
                            let idSection = $("#tblObsSummary_selected").val();

                            if (idDeclaration && idSection) {
                                $(`#tblDeclaraciones_${idDeclaration}`).click();
                                $(`#tblSections_${idSection}`).click();
                            }
                        } else {

                            alertify.notify(response['msg'], 'error', 10);
                        }
                    } else {

                        alertify.notify('No se ha podido eliminar el registro!', 'error', 10);
                    }
                },
                error: function(xhr) {
                    console.log(xhr.responseText);
                }
            });
        }
    }).setHeader('<span style="color:red;">Cuidado!</span>');
};

Observation.prototype.onEdit = function() {

    console.log('editing!');
};


Observation.prototype.onDblClick = function (tr) {

    let table = tr.getAttribute('tbl');
    let table_id = tr.getAttribute('tbl_id');
    let id_observation = $("#tblObservations_selected").val();

    if (id_observation && table && table_id) {

        $("#reviewObs").click();

        let btn_review = $(`#${table}_${table_id}`);

        if (btn_review)
        {
            btn_review.click();
        }

        let divObservation = $(`#observation_${id_observation}`);

        if (divObservation)
        {
            divObservation.click();
        }
    }
};
