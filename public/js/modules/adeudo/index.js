"use strict";

const ID_PAIS_MEXICO = 108;

function Adeudo () {

    this.base_url = getRootWebSitePath();
}


Adeudo.prototype.init = function () {

    this.init_dates();
    this.init_titular();
    this.init_ubicacion();
};


Adeudo.prototype.init_dates = function () {

    jQuery('#fecha_otorgamiento').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
};

Adeudo.prototype.init_titular = function () {

    $("#idtitular").change(function () {

        if (isCopropiedad('idtitular')) {

            toggleDivContent('divTerceroTitle', true);
            toggleDivContent('divTercero', true);
            $("#rfc_tercero").prop('data-validation', 'required|validRFC');
        } else {

            toggleDivContent('divTerceroTitle', false);
            toggleDivContent('divTercero', false);
        }
    });
};

Adeudo.prototype.init_ubicacion = function () {

    $("#ubicacion").change(function () {

        if (this.value == 'mexico') {

            toggleDivContent('divExtranjero', false);
            $("#idpais").val(ID_PAIS_MEXICO);
            $("#idpais_extranjero").val('');
        } else {

            toggleDivContent('divExtranjero', true);
            $("#idpais").val('');
        }
    });
};


(function () {

    $(document).ready(function () {

        $.formUtils.addValidator({
            name: 'validRFC',
            validatorFunction: function(value, $el) {

                return validateRFC(value, $el);
            },
            errorMessage: 'No es un RFC válido',
            errorMessageKey: 'badRFC'
        });

        $.validate({
            form: '#frmAdeudo',
            lang: 'es',
            onError: function() {
                alert("Hay elementos que debe cuidar para poder procesar.");
            }
        });

        let adeudo = new Adeudo();

        adeudo.init();
    });
})();
