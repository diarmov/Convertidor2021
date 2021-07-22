"use strict";

const ID_PAIS_MEXICO = 108;

function Inversion () {

    this.base_url = getRootWebSitePath();
}

Inversion.prototype.init = function () {

    this.init_titular();
    this.init_ubicacion();
    this.init_tipoinversion();
};

Inversion.prototype.init_titular = function () {

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

Inversion.prototype.init_tipoinversion = function () {

    $("#idtipo_inversion").change(function () {

        if (this.value == '1') {

            toggleDivContent('bancaria', true);
            toggleDivContent('organizaciones', false);
            toggleDivContent('monedas', false);
            toggleDivContent('seguros', false);
            toggleDivContent('valores', false);
            toggleDivContent('afores', false);
            toggleDivContent('metales', false);
            toggleDivContent('fondos', false);

        } 
        if (this.value == '2') {

            toggleDivContent('bancaria', false);
            toggleDivContent('organizaciones', false);
            toggleDivContent('monedas', false);
            toggleDivContent('seguros', false);
            toggleDivContent('valores', true);
            toggleDivContent('afores', false);
            toggleDivContent('metales', false);
            toggleDivContent('fondos', false);

        } 
        if (this.value == '3') {

            toggleDivContent('bancaria', false);
            toggleDivContent('organizaciones', false);
            toggleDivContent('monedas', false);
            toggleDivContent('seguros', false);
            toggleDivContent('valores', false);
            toggleDivContent('afores', false);
            toggleDivContent('metales', false);
            toggleDivContent('fondos', true);

        } 
        if (this.value == '4') {

            toggleDivContent('bancaria', false);
            toggleDivContent('organizaciones', true);
            toggleDivContent('monedas', false);
            toggleDivContent('seguros', false);
            toggleDivContent('valores', false);
            toggleDivContent('afores', false);
            toggleDivContent('metales', false);
            toggleDivContent('fondos', false);

        } 
        if (this.value == '5') {

            toggleDivContent('bancaria', false);
            toggleDivContent('organizaciones', false);
            toggleDivContent('monedas', true);
            toggleDivContent('seguros', false);
            toggleDivContent('valores', false);
            toggleDivContent('afores', false);
            toggleDivContent('metales', false);
            toggleDivContent('fondos', false);

        } 
        if (this.value == '6') {

            toggleDivContent('bancaria', false);
            toggleDivContent('organizaciones', false);
            toggleDivContent('monedas', false);
            toggleDivContent('seguros', true);
            toggleDivContent('valores', false);
            toggleDivContent('afores', false);
            toggleDivContent('metales', false);
            toggleDivContent('fondos', false);

        } 
        if (this.value == '8') {

            toggleDivContent('bancaria', false);
            toggleDivContent('organizaciones', false);
            toggleDivContent('monedas', false);
            toggleDivContent('seguros', false);
            toggleDivContent('valores', false);
            toggleDivContent('afores', true);
            toggleDivContent('metales', false);
            toggleDivContent('fondos', false);

        } 
    });
};





Inversion.prototype.init_ubicacion = function () {

    $("#ubicacion").change(function () {

        if (this.value == 'mexico') {

            toggleDivContent('divInstitucionRFC', true);
            toggleDivContent('divPais', false);

            $("#idpais").val(ID_PAIS_MEXICO);
        } else {

            toggleDivContent('divInstitucionRFC', false);
            toggleDivContent('divPais', true);

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
            form: '#frmInversion',
            lang: 'es',
            onError: function() {
                alert("Hay elementos que debe cuidar para poder procesar.");
            }
        });

        let inversion = new Inversion();

        inversion.init();
    });
})();
