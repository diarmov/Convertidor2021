"use strict";


function Declarante(base_url) {

    this.base_url = base_url;
}


Declarante.prototype.isUnique = function(field_name) {
    var _token = $("meta[name='csrf-token']").attr('content'),
        frmData = {
            "id": $('#i').val(),
            "rfc": $('#rfc').val(),
            "curp": $('#curp').val(),
            "field": field_name
        },
        unique = null,
        _self = this;

    $.ajaxSetup({
        headers: {
            'X-CSRF-TOKEN': _token
        }
    });

    $.ajax({
        url: _self.base_url,
        type: "post",
        contentType: "application/x-www-form-urlencoded",
        data: frmData,
        async: false,
        success: function(data) {

            unique = data;
        }
    });

    return unique;
};


Declarante.prototype.isValidPassword = function() {

    let id = $("#i").val(),
        password = $("#password").val(),
        repeat_password = $("#repeat-password").val(),
        is_valid = false;

    // if is edition mode
    if (id) {
        if (password) {
            is_valid = password === repeat_password;
        } else {
            is_valid = true;
        }
    } else { // if is new mode

        is_valid = (password) && password === repeat_password;
    }

    return is_valid;
};


Declarante.prototype.validate = function() {

    let curp = this.isUnique('curp'),
        rfc = this.isUnique('rfc'),
        unique = false;

    if (curp && rfc) {

        if (!curp['isUnique']) {

            return this.showError('La CURP ya existe para otro declarante!');
        }

        if (!rfc['isUnique']) {

            return this.showError('El RFC ya existe para otro declarante!');
        }
    }

    if (!this.isValidPassword()) {

        $("#password").css("border-color", "red");
        $("#repeat-password").css("border-color", "red");

        return this.showError('El password esta vacío o no coincide, por favor verifíquelo!');
    }

    return true;
};


Declarante.prototype.changeStatus = function() {

    $("#divMotivoBaja")
};


Declarante.prototype.showError = function(str_error) {

    $("#message").html(showMessage('danger', str_error));

    $("html, body").animate({
        scrollTop: 0
    }, 500);

    return false;
};


Declarante.prototype.updateForm = function(active) {

    if (active === "0") {
        $("#divMotivoBaja").removeClass("hidden");
        $("#idbaja").attr("data-validation", "required");
        $("#idbaja").attr("data-validation-error-msg", "Por favor elija el motivo de baja del Declarante!");
    } else {

        $("#idbaja").val("").change();
        $("#divMotivoBaja").addClass("hidden");
        $("#idbaja").removeAttr("data-validation");
        $("#idbaja").removeAttr("data-validation-error-msg");
    }
};