function Aplicability(base_url, section, iddeclaration) {

    this.base_url = base_url;
    this._url = `${base_url}/admin/aplicability/observations`;
    this.jsonAplicability = {};
    this.jsonChanges = {};
    this.jsonObservations = {};
    this.section = section;
    this.iddeclaration = iddeclaration;
};

Aplicability.prototype.init = function () {

    this.getAplicability();
    this.initSave();
    this.initCancel();
    this.Initundo();
};

Aplicability.prototype.getAplicability = function ()
{
    let _token = $("meta[name='csrf-token']").attr('content'),
        _data = {
            idDeclaration: $("#iddeclaracion").val(),
            idSection: $("#idseccion").val()
        },
        _self = this;

    $.ajax({
        'beforeSend': function(xhr) {
            xhr.setRequestHeader('X-CSRF-TOKEN', _token);
        },
        'dataType': 'json',
        'data': _data,
        'type': 'POST',
        'url': _self._url,
        'success': function(response) {

            if ((response) && (response.hasOwnProperty('status')) && (response['status'] === 200)) {

                _self.jsonAplicability = JSON.parse(response['jsonAplicability']);
                _self.jsonChanges = cloneJSON(_self.jsonAplicability);
                _self.jsonObservations = response['jsonObservations'];

                $("#aplica").prop('checked', (_self.jsonAplicability['aplica'] == 0));
                _self.setObservations(_self.jsonObservations);
            }
        },
        'error': function (error, e) {
            console.log(e);
        }
    });
};

Aplicability.prototype.setObservations = function (strObservations) {

    $("#lstObservaciones").html('');

    let lstObservations = JSON.parse(strObservations);

    if (lstObservations && (lstObservations.length > 0))
    {
        for(let i = 0; i < lstObservations.length; i++)
        {
            $("#lstObservaciones").append(
                `<div class='chat-message' obsId='${lstObservations[i]['id']}' id='observation_${lstObservations[i]['id']}' title='${lstObservations[i]['rubros']}'
                    style='cursor: pointer;'
                    onClick='return Aplicability.prototype.editObservation(this)'>
                    <span style='font-size: 10px;'>${lstObservations[i]['username']}</span><br>
                    <b>${lstObservations[i]['correccion']}</b>
                    <br><span style='font-size: 10px;'>${lstObservations[i]['fecha_es']}, folio: ${lstObservations[i]['id']}</span>
                </div>`);
        }
    }
};


Aplicability.prototype.initChangeApply = function (checkId)
{
    let checkApply = $(`#${checkId}`),
        _self = this;

    if (checkApply.length > 0)
    {
        checkApply.click(function () {

            if (_self.canCheck() === true) {

                if (_self.jsonChanges.hasOwnProperty('aplica'))
                {
                    _self.jsonChanges['aplica'] = (this.checked)?0:1;
                }

                if (jsonHasChanges(_self.jsonAplicability, _self.jsonChanges)) {

                    _self.hideAdd(true);
                    Review.prototype.toggleFrmObservations(true);
                    _self.setRubros(_self);
                }else {

                    $("#btnUndo").click();
                }
            } else {

                checkApply.prop('checked', !checkApply.prop('checked'));
                alert('Para seleccionar Ninguno, tiene que eliminar todos los registros');
            }
        });
    }
}

Aplicability.prototype.setRubros = function (_self) {
    let oldValue = (_self.jsonAplicability['aplica'] == 1)?'Sí':'No';
    let newValue = (_self.jsonChanges['aplica'] == 1)?'Sí':'No';
    $("#rubros").val(`Aplicabilidad: ${oldValue} X ${newValue}`);
};

Aplicability.prototype.initSave = function () {

    let _self = this;

    $("#btnSave").unbind();

    $("#btnSave").click(function () {

        let _frmAplicability = {
            'id_declaration': $("#tblDeclaraciones_selected").val(),
            'id_section': $("#tblObsSummary_selected").val(),
            'aplica': (_self.jsonChanges['aplica'] == 1)?1:0,
            'tabla_id': _self.jsonAplicability['idaplicabilidad']
        };

        if ($("#frmObservations").isValid()) {

            let formData = _self.getFormData(_frmAplicability);

            _self.saveObservation(formData);
        }
    });
};

Aplicability.prototype.getFormData = function (_frmAplicability, observation) {

    let _self = this;
    let frmData = new FormData(document.getElementById("frmObservations"));

    frmData.append('frm', JSON.stringify(_frmAplicability));
    frmData.append('original', JSON.stringify(_self.jsonAplicability));
    frmData.append('changes', JSON.stringify(_self.jsonChanges));
    frmData.append('idSection', $("#tblObsSummary_selected").val());
    frmData.append('idDeclaration', $("#tblDeclaraciones_selected").val());
    frmData.append('recordId', _self.jsonChanges['idaplicabilidad']);

    let attachments = $("#frmObservations input[name='adjuntos[]']");

    if (attachments.length > 0) {

        $(attachments).each(function(i, el) {

            frmData.append('adjuntos[]', el.value);
        });
    }

    return frmData;
};

Aplicability.prototype.initCancel = function () {

    $("#btnCancel").unbind();
    $("#btnCancel").click(function () {

        $("#btnUndo").click();
    });
};

Aplicability.prototype.clearInputs = function () {

    let a_observations = $("#frmObservations").serializeArray();

    a_observations.forEach(function(_input) {

        $(`#${_input['name']}`).val('');
    });

    let _files = document.getElementsByName('adjuntos[]');

    for(let i = 0; i <_files.length; i++)
    {
        _files[i].value = '';
    }

    $("#divUploadedFiles").html('');

    $("#frmFiles").html(`
        <div class="col-md-12" id="divInputAttachment">
            <input type="file" name="adjuntos[]">
        </div>
    `);
};

Aplicability.prototype.Initundo = function () {

    let _self = this;

    $("#btnUndo").unbind();
    $("#btnUndo").click(function () {

        _self.jsonChanges = cloneJSON(_self.jsonAplicability);
        _self.clearInputs();
        Review.prototype.toggleFrmObservations(false);
        Review.prototype.disableFrm(false);
        $("#aplica").prop('checked', (_self.jsonAplicability['aplica'] == 0 ));
    });
};

Aplicability.prototype.saveObservation = function (formData){

    let url = `${this.base_url}/admin/aplicability/save`,
        _token = $("meta[name='csrf-token']").attr('content'),
        _self = this;

    $.ajax({
        'url': url,
        'type': 'POST',
        'data': formData,
        'processData': false,
        'contentType': false,
        beforeSend: function(xhr) {

            xhr.setRequestHeader('X-CSRF-TOKEN', _token);

            jsShowWindowLoad("Guardando datos, por favor espere!");
        },
        success: function (result) {

            if (result && result.hasOwnProperty('status') && (result['status'] === 200))
            {
                _self.jsonAplicability = cloneJSON(_self.jsonChanges);
                _self.setObservations(result['jsonObservations']);
                Review.prototype.toggleFrmObservations(false);
                Review.prototype.disableFrm(false);
                _self.clearInputs();
                _self.hideAdd(false);
            }
        },
        complete: function() {

            jsRemoveWindowLoad();
        },
        error: function (jqXHR, textStatus, errorThrown) {

            jsRemoveWindowLoad();
        }
    });
};


Aplicability.prototype.editObservation = function(divObj) {

    let id = $(divObj).attr('obsId'),
        _token = $("meta[name='csrf-token']").attr('content'),
        rubros = $(divObj).attr('title'),
        _url = `${base_url}/admin/observation/${id}`;

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': _token
        },
        async: false
    });

    Aplicability.prototype.clearInputs();
    $("#divMessage").html('');

    $.get(_url, function(_response) {

        if ((_response != null) && (_response['status'] === 200) && _response.hasOwnProperty('data') &&
            _response['data'].hasOwnProperty('cambio') && (_response['data']['cambio'] != null)) {

            let changes = JSON.parse(_response['data']['cambio']);

            if (changes) {

                Review.prototype.disableFrm(true);

                $("#rubros").val(rubros);
                $("#idNewObservation").val(id);
                $("#correccion").val(_response['data']['correccion']);

                Review.prototype.toggleFrmObservations(true);
            }

            // set attachments
            if (_response.hasOwnProperty('files'))
            {

                Review.prototype.setAttachments(_response['files']);
            }
        }
    });
};

Aplicability.prototype.canCheck = function () {

    let aplica = $("#aplica").prop('checked');

    let totalRows = $("#totalRows");

    if ((totalRows.length > 0) && (!aplica)) {

        return true;
    }
    else if (totalRows.length > 0)
    {
        return totalRows.val() == 0;
    } else {
        return false;
    }
};

Aplicability.prototype.hideAdd = function (hidden)
{
    let divAddRecord = $("#divAddRecord");
    
    if (divAddRecord.length > 0) {
    
        if (hidden)
        {

            divAddRecord.hide();
        }
        else{

            divAddRecord.show();
        }
    }
};