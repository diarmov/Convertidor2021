"use strict";

function Review(base_url, _url) {

    this.base_url = base_url;
    this.url = _url;

    this.rubros = [];
    this.jsonOriginal = {};
    this.jsonChanges = {};
    this.type = "";
};

Review.prototype.initialize = function() {

    this.rubros = [];
    this.jsonOriginal = {};
    this.jsonChanges = {};
    this.type = "";

    this.clearInputs();

    this.toggleFrmObservations(false);
};

Review.prototype.clearInputs = function() {

    let a_observations = $("#frmObservations").serializeArray();

    a_observations.forEach(function(_input) {

        $(`#${_input['name']}`).val('');
    });

    let _files = document.getElementsByName('adjuntos[]');

    for(let i = 0; i <_files.length; i++)
    {
        _files[i].value = '';
    }

    $("#__TYPE__").val('');
    $("#divUploadedFiles").html('');

    $("#frmFiles").html(`
        <div class="col-md-12" id="divInputAttachment">
            <input type="file" name="adjuntos[]">
        </div>
    `);
};

Review.prototype.init = function() {

    this.initNewReview();

    this.initUndo();

    this.initSave();

    this.initClose();

    this.initCancel();
};

Review.prototype.initEdition = function(recordId, tblKey) {

    let _token = $("meta[name='csrf-token']").attr('content'),
        _data = {
            'id_declaration': $("#tblDeclaraciones_selected").val(),
            'id_section': $("#tblObsSummary_selected").val(),
            'id_declarant': $("#_iddeclarante").val(),
            'tblKey': tblKey,
            'recordId': recordId
        },
        _self = this;

    $.ajax({
        'beforeSend': function(xhr) {
            xhr.setRequestHeader('X-CSRF-TOKEN', _token);
        },
        'dataType': 'json',
        'data': _data,
        'type': 'POST',
        'url': _self.url,
        'success': function(response) {

            if ((response != null) && (response.hasOwnProperty('status')) && (response['status'] === 200)) {

                _self.initForm(response);

                $("#mdlHTML").html(response["data"]["html"]);

                let form = $("#mdlHTML").find("form");

                if (form) {

                    _self.addChangeListener(form);
                    _self.init();
                }
            }
        }
    });

};

Review.prototype.initNewReview = function() {

    let _self = this;

    $("#reviewObs").unbind();
    $('#reviewObs').click(function() {

        let id_declaration = $("#tblDeclaraciones_selected").val(),
            id_section = $("#tblObsSummary_selected").val(),
            id_declarant = $("#_iddeclarante").val();

        if (id_declaration && id_section && id_declarant) {

            let response = _self.getData(id_declaration, id_section, id_declarant);

            if ((response != null) && (response.hasOwnProperty('status')) && (response['status'] == 200)) {

                if (response['format'] === 'form') {

                    _self.initForm(response);

                    $("#mdlHTML").html(response["data"]["html"]);
                    $("#mdlAddObservation").modal("show");

                    let form = $("#mdlHTML").find("form");

                    if (form) {
                        _self.addChangeListener(form);
                    }
                } else {

                    _self.initList(response);
                }
            }

        }
    });
};

Review.prototype.initForm = function(response) {

    this.initialize();
    this.type = response["type"];
    this.jsonOriginal = JSON.parse(response["data"]["json"]);
    this.jsonChanges = cloneJSON(this.jsonOriginal);
    this.setObservations(response);
};

Review.prototype.initList = function(response) {

    this.initialize();

    $("#__TYPE__").val(response["type"]);

    $("#mdlHTML").html(response["data"]["html"]);
    $("#mdlAddObservation").modal("show");
    $("#btnUndo").hide();
};

Review.prototype.initUndo = function() {

    let _self = this;

    $("#btnUndo").unbind();
    $("#btnUndo").click(function() {

        $("#rubros").val('');
        $("#correccion").val('');

        if (_self.jsonOriginal && !isEmpty(_self.jsonOriginal)) {

            _self.jsonChanges = cloneJSON(_self.jsonOriginal);

            for (let key in _self.jsonOriginal) {

                let input = $(`#${key}`);

                if (input.length > 0) {

                    if ($(input).is('select')) {

                        $(input).val(_self.jsonOriginal[key]).change();
                    } else {

                        $(input).val(_self.jsonOriginal[key]);
                    }
                }
            }

        }

        _self.disableFrm(false);
        _self.toggleFrmObservations(false);
    });
};

Review.prototype.initSave = function() {

    let _self = this;

    $("#btnSave").unbind();
    $("#btnSave").click(function() {

        var url = `${_self.base_url}/admin/observations`;

        if (isEdit() && $("#frmObservations").isValid() && $("#frmEdit").isValid()) {

            let observation = {
                'id_declaration': $("#tblDeclaraciones_selected").val(),
                'id_section': $("#tblObsSummary_selected").val(),
                'id_declarant': $("#_iddeclarante").val(),
                'id_observation': $("#idNewObservation").val(),
                'observation': $('#correccion').val(),
                'rubros': $('#rubros').val(),
            };

            let frmData = _self.getFormData(_self, observation);
                  
            _self.saveObservation(url, frmData);
            // $("#btnUndo").click();
        } else if (isNew() && $("#frmObservations").isValid() && $("#frmEdit").isValid()) {

            let observation = {
                'id_declaration': $("#tblDeclaraciones_selected").val(),
                'id_section': $("#tblObsSummary_selected").val(),
                'id_declarant': $("#_iddeclarante").val(),
                'observation': $('#correccion').val(),
                'rubros': $('#rubros').val(),
            };

            let frmData = _self.getFormData(_self, observation);

            _self.saveObservation(url, frmData);

        } else {

            //TODO: Agregar funcionalidad en caso de que no se cumpla ninguna de las dos anteriores
        }

        _self.enableFrmObservations();
    });
};

Review.prototype.initClose = function() {

    let _self = this;

    $("#btnClose").unbind();
    $("#btnClose").click(function() {

        $('#mdlAddObservation').modal('hide');
    });

    $('#mdlAddObservation').unbind();
    $('#mdlAddObservation').on('hidden.bs.modal', function () {
        // do something…
        _self.reload();
        _self.enableFrmObservations();
        _self.initialize();

        $("#lstObservaciones").html('');
    })
};

Review.prototype.initCancel = function() {

    let _self = this;

    $("#btnCancel").unbind();
    $("#btnCancel").click(function() {

        _self.clearInputs();
        _self.disableFrm(false);
        _self.toggleFrmObservations(false);
        _self.enableFrmObservations();
        $("#btnUndo").click();
    });
};


Review.prototype.getFormData = function(_self, observation) {

    let frmData = new FormData(document.getElementById("frmObservations"));

    frmData.append('type', _self.type);
    frmData.append('frm', JSON.stringify(_self.jsonChanges));
    frmData.append('obs', JSON.stringify(observation));
    frmData.append('original', JSON.stringify(_self.jsonOriginal));
    frmData.append('changes', JSON.stringify(_self.jsonChanges));

    let attachments = $("#frmObservations input[name='adjuntos[]']");

    if (attachments.length > 0) {

        $(attachments).each(function(i, el) {

            frmData.append('adjuntos[]', el.value);
        });
    }

    return frmData;
};

Review.prototype.getData = function(id_declaration, id_section, id_declarant) {

    let _token = $("meta[name='csrf-token']").attr('content'),
        url = `${this.url}/${id_declaration}/${id_section}/${id_declarant}`,
        _response = null;

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': _token
        },
        async: false
    });


    $.get(url, function(response) {

        _response = response;
    });

    return _response;
};

Review.prototype.addChangeListener = function(form) {

    let _self = this;

    let a_serialized = form.serializeArray();
    let a_checkboxes = $("input:checkbox").map(function () {
        return {name: this.name, value: this.checked?1:0};
    });

    // concat checkboxes to a_serialized
    if (a_checkboxes.length > 0)
    {
        a_checkboxes.each(function (idx, element) {
            a_serialized.push(element);
        });
    }

    $.each(a_serialized, function(i, field) {

        if (field.hasOwnProperty('name')) {

            let fieldName = field['name'];

            let _input = $(`[name=${fieldName}]`);

            // when is a date or a datetime we need observe the changes using dp.change from datetimepicker
            if ((_input.attr('_type') === 'date') || (_input.attr('_type') === 'datetime'))
            {
                $(`#${fieldName}`).on("dp.change", function (e) {

                    _self.observeChanges(_self, fieldName, this.value);
                });
            }else if (_input.is('input') || _input.is('textarea')) { // when is an input we need observe the change only using keyup

                if (_input.attr('type') === 'checkbox')
                {
                    _input.click(function() {

                        let input_value = _input.is(':checked')?1:0;
                        _self.observeChanges(_self, fieldName, input_value);
                    });
                } else {

                    _input.keyup(function() {
                        _self.observeChanges(_self, fieldName, this.value);
                    });
                }
            } else if (_input.is('select')) { // when the input is a select we need observe the change using onchange
                _input.change(function() {

                    // this.value = _self.jsonChanges[fieldName];
                    _self.observeChanges(_self, fieldName, this.value);
                });
            }

        }
    });
};

Review.prototype.observeChanges = function(_self, fieldName, value) {

    // if the value is an spanish date then the change is in a date or a datetime input
    if (isSpanishDate(value))
    {
        let field = $(`#${fieldName}`);

        if (field )
        {
            if (field.attr('_type') === 'date')
            {
                value = spanish2EnglishDate(value);
            }
            else if (field.attr('_type') === 'datetime')
            {
                value = spanish2EnglishDateTime(value);
            }
        }
    }

    _self.jsonChanges[fieldName] = value;

    if (jsonHasChanges(_self.jsonOriginal, _self.jsonChanges)) {

        _self.setRubros(_self.jsonOriginal, _self.jsonChanges);
        _self.toggleFrmObservations(true);
    } else {

        $("#rubros").val('');
        $("#correccion").val('');
        _self.toggleFrmObservations(false);
    }
};


Review.prototype.setRubros = function(jsonOriginal, jsonChanges) {

    let changed_fields = getChangedFields(jsonOriginal, jsonChanges);

    if (changed_fields.length > 0) {

        let _rubros = [];
        for (let key in changed_fields) {

            let field = changed_fields[key]['id'],
                input = $(`#${field}`),
                label = $(`#lbl_${field}`),
                oldValue = ((jsonOriginal[field] === null) || (jsonOriginal[field] === '')) ? 'Vacío' : jsonOriginal[field],
                newValue = ((jsonChanges[field] === null) || (jsonChanges[field] === '')) ? 'Vacío' : jsonChanges[field];

            if (input.is('select')) {

                if (isNaN(oldValue))
                {

                    oldValue = input.find(`option[value="${oldValue}"]`).text().trim();
                }else {

                    oldValue = input.find(`option[value=${oldValue}]`).text().trim();
                }

                if (isNaN(newValue))
                {

                    newValue = input.find(`option[value="${newValue}"]`).text().trim();
                }else {

                    newValue = input.find(`option[value=${newValue}]`).text().trim();
                }
            }

            if ((label.length > 0) && (oldValue != newValue)) {

                if (input.attr('_type') === 'date')
                {
                    if (oldValue !== 'Vacío')
                    {
                        oldValue = english2SpanishDate(oldValue);
                    }

                    newValue = english2SpanishDate(newValue);
                } else if (input.attr('_type') === 'datetime') {

                    if (oldValue !== 'Vacío')
                    {

                        oldValue = englishDT2SpanishDate(oldValue);
                    }

                    newValue = englishDT2SpanishDate(newValue);
                }

                if (input.attr('type') === 'checkbox')
                {
                    oldValue = (oldValue === 0)?'No':'Sí';
                    newValue = (newValue === 0)?'No':'Sí';
                }

                oldValue = (oldValue)?oldValue:'Vacío';
                newValue = (newValue)?newValue:'Vacío';

                let lbl_text = (label[0].innerText)? label[0].innerText : label.html();
                _rubros.push(`${lbl_text}: ${oldValue} X ${newValue}`);
            }
        }

        if (_rubros && (_rubros.length > 0)) {

            $("#rubros").val(_rubros.join());
        } else {

            $("#rubros").val('');
        }
    }
};

Review.prototype.reload = function() {

    let id = $("#tblDeclaraciones_selected").val();
    let section_id = $("#tblObsSummary_selected").val();

    if (id) {

        let row = $(`#tblDeclaraciones_${id}`);

        if (row.length > 0) {

            row.click();

            if (section_id) {

                let _section = $(`#tblSections_${section_id}`);

                if (_section.length > 0) {

                    _section.click();
                }
            }
        }
    }
}

Review.prototype.setObservations = function(response) {

    let _token = $("meta[name='csrf-token']").attr('content'),
        _url = `${this.base_url}/admin/observations/byRecord`,
        tblKey = response['type'],
        recordId = response['recordId'],
        _data = {
            'id_declaration': $("#tblDeclaraciones_selected").val(),
            'id_section': $("#tblObsSummary_selected").val(),
            'tblKey': tblKey,
            'recordId': recordId
        };

    Review.prototype.toggleFrmObservations(false);

    $("#lstObservaciones").html('');

    $.ajax({
        'beforeSend': function(xhr) {
            xhr.setRequestHeader('X-CSRF-TOKEN', _token);
        },
        'dataType': 'json',
        'data': _data,
        'type': 'POST',
        'url': _url,
        'async': false,
        'success': function(response) {

            if ((response != null) && (response.hasOwnProperty('status')) && (response['status'] === 200)) {

                response['data'].forEach(function(obs) {

                    $("#lstObservaciones").append(
                        `<div class='chat-message' obsId='${obs['id']}' id='observation_${obs['id']}' title='${obs['rubros']}'
                        style='cursor: pointer;'
                        onClick='return Review.prototype.editObservation(this)'>
                        <span style='font-size: 10px;'>${obs['username']}</span><br>
                        <b>${obs['correccion']}</b>
                        <br><span style='font-size: 10px;'>${obs['fecha_es']}, folio: ${obs['id']}</span>
                    </div>`);
                });
            }
        }
    });
};

Review.prototype.toggleFrmObservations = function(show) {

    if (show) {

        $("#newObservation").show();
        $("#frmButtons").show();
        $("#frmFiles").show();
        $("#btnClone").show();
        $("#divUploadedFiles").show();
        $("#btnUndo").show();
        $("#lstObservaciones").hide();
    } else {

        $("#newObservation").hide();
        $("#frmButtons").hide();
        $("#frmFiles").hide();
        $("#btnClone").hide();
        $("#divUploadedFiles").hide();
        $("#btnUndo").hide();
        $("#lstObservaciones").show();
    }
};

Review.prototype.editObservation = function(divObj) {

    let id = $(divObj).attr('obsId'),
        _token = $("meta[name='csrf-token']").attr('content'),
        rubros = $(divObj).attr('title'),
        observation = $(divObj).html(),
        _url = `${base_url}/admin/observation/${id}`;

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': _token
        },
        async: false
    });

    Review.prototype.clearInputs();
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

Review.prototype.setAttachments = function (_files) {

    $("#divUploadedFiles").html('');

    let links = "";

    if (_files.length > 0) {

        _files.forEach(function (attachedFile) {

            links += `<a target='_blank' href='${base_url}/admin/observation/download/${attachedFile['download_key']}'>${attachedFile['original_name']}</a>
                  <a href='#!' class='btn btn-xs btn-danger' onclick='Review.prototype.deleteAttachment("${attachedFile['id']}", "${attachedFile['original_name']}")'>
                    <b>&times;</b>
                  </a>
                  <br>`;
        });
    }

    $("#divUploadedFiles").html(links);
};

Review.prototype.disableFrm = function(_disabled) {

    let form = $("#mdlHTML").find("form");

    if (form.length > 0)
    {
        let frm = form.serializeArray();

        let a_checkboxes = $("input:checkbox").map(function () {
            return {name: this.name, value: this.checked?1:0};
        });

        // concat checkboxes to a_serialized
        if (a_checkboxes.length > 0)
        {
            a_checkboxes.each(function (idx, element) {
                frm.push(element);
            });
        }

        $.each(frm, function(idx, field) {
            $(`#${field['name']}`).prop('disabled', _disabled);
        });
    }
};

Review.prototype.enableFrmObservations = function() {

    for (let name in this.jsonOriginal) {

        let field = $(`#${name}`);

        if (field.length > 0) {

            field.prop('disabled', false);
        }
    }
};

Review.prototype.saveObservation = function (url, frmData) {

    let _self = this,
        _token = $("meta[name='csrf-token']").attr('content');

    $.ajax({
        'url': url,
        'type': 'POST',
        'data': frmData,
        'processData': false,
        'contentType': false,

        beforeSend: function(xhr) {

            xhr.setRequestHeader('X-CSRF-TOKEN', _token);

            jsShowWindowLoad("Guardando datos, por favor espere!");
        },
        success: function (result) {

            if ((result !== null) && result['status'] === 200) {

                $("#divMessage").html(showMessage('success', result['msg']));

                $("#id").val(result['recordId']);

                _self.jsonChanges[result['id_name']] = result['recordId']

                _self.setObservations(result);

                let _type = _self.type;
                let jsonTemp = cloneJSON(_self.jsonChanges);

                _self.initialize();
                _self.jsonOriginal = cloneJSON(jsonTemp);
                _self.jsonChanges = cloneJSON(jsonTemp);
                _self.type = _type;

                _self.clearInputs();
                _self.toggleFrmObservations(false);
            } else {

                $("#divMessage").html(showMessage('danger', result['msg']));
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


Review.prototype.deleteAttachment = function (id, fileName) {


    let url = `${base_url}/admin/observation/${id}`,
        _token = $("meta[name='csrf-token']").attr('content');

    alertify.confirm(`Esta seguro de eliminar el archivo ${fileName}`, function () {

        $.ajax({
            'url': url,
            'type': 'DELETE',
            'processData': false,
            'contentType': false,
            beforeSend: function(xhr) {

                xhr.setRequestHeader('X-CSRF-TOKEN', _token);
                jsShowWindowLoad("Borrando archivo adjunto, por favor espere!");
            },
            success: function (response) {

                if ((response !== null) && (response['status'] === 200)) {

                    if (response.hasOwnProperty('files')) {

                        Review.prototype.setAttachments(response['files']);
                    }
                } else {

                    console.log(response['msg']);
                }
            },
            complete: function() {

                jsRemoveWindowLoad();
            },
            error: function (jqXHR, textStatus, errorThrown) {

                jsRemoveWindowLoad();
            }
        });
    });
};

var isNew = function() {

    return !($("#idNewObservation").val() != '');
};

var isEdit = function() {

    return ($("#idNewObservation").val() != '');
};

var cloneInputAttachment = function () {

    let toClone =
        `
        <div>
        <div class="col-md-10">
            <input type="file" name="adjuntos[]">
        </div>
        <div class="col-md-2">
            <a href="#!" onclick="dropDiv(this);" class="btn btn-xs btn-danger"><b>X</b></a>
        </div>
        </div>
        `;

    $("#frmFiles").append(toClone);
};

var dropDiv = function (div) {

    $(div).parent().closest('div').parent().closest('div').remove();
};