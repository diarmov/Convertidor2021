"use strict";

const INPUTS = {
    'obra': {
        'divs': [],
        'inputs': [
            {'id': 'idadquisicion', 'req': true},
            {'id': 'idobra', 'req': true},
            {'id': 'inversion_obra', 'req': true},
            {'id': 'fecha_obra', 'req': true}
        ]
    },
    'venta': {
        'divs': [],
        'inputs': [
            {'id': 'forma_operacion', 'req': true},
            {'id': 'valor_operacion', 'req': true},
            {'id': 'fecha_operacion', 'req': true}
        ]
    },
    'adquisicion': {
        'divs': [],
        'inputs': [
            {'id': 'idadquisicion', 'req': true},
            {'id': 'fecha_adquisicion', 'req': true}
        ]
    }
},
      MEXICO = 'mexico';


function BienInmueble (base_url)
{
    this.base_url = base_url;
}

BienInmueble.prototype.init = function () {

    placesSelectorInitializer('idpais', 'idestado', 'idmunicipio');
    this.init_dates();
    this.init_validation();
    this.init_operacion_inmueble();
    this.init_otro_titular();
    this.init_titular();
    this.init_ubicacion();
};

BienInmueble.prototype.init_validation = function () {

    $.formUtils.addValidator({
        name: 'validRFC',
        validatorFunction: function(value, $el) {

            return validateRFC(value, $el);
        },
        errorMessage: 'No es un RFC válido',
        errorMessageKey: 'badRFC'
    });

    $.validate({

        form: '#frmInmueble',
        lang: 'es',
        // modules: "security, date",
        onError: function($form) {
            alert("Hay elementos que debe cuidar para poder procesar.");
        }
    });
};

BienInmueble.prototype.init_dates = function () {

    $('#fecha_adquisicion').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
    $('#fecha_obra').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
    $('#fecha_operacion').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
};

BienInmueble.prototype.init_operacion_inmueble = function () {

    $("#idoperacion_inmueble").change(function () {

        if (this.value == "2"){ // Obra

            // write hide first
            render(INPUTS['venta'], 'hide');
            render(INPUTS['adquisicion'], 'hide');
            render(INPUTS['obra'], 'show');

            toggleDivContent('divTransmisorTitle', false, [], [])
            toggleDivContent('divTransmisor', false, [], [], true)
        }else if (this.value=="3"){ // Venta

            // write hide first
            render(INPUTS['obra'], 'hide');
            render(INPUTS['adquisicion'], 'hide');
            render(INPUTS['venta'], 'show');

            toggleDivContent('divTransmisorTitle', false, [], [])
            toggleDivContent('divTransmisor', false, [], [], true)
        }else{

            // write hide first
            render(INPUTS['obra'], 'hide');
            render(INPUTS['venta'], 'hide');
            render(INPUTS['adquisicion'], 'show');

            toggleDivContent('divTransmisorTitle', true, [], [])
            toggleDivContent('divTransmisor', true, [], [], true)

            $("#rfc_transmisor").prop('data-validation', 'required|validRFC');
        }
    });
};

BienInmueble.prototype.init_otro_titular = function () {

    $("#idadquisicion").on('change', function () {

        if ((this.value=="1") || (this.value=="4") || (this.value=="5")){

            $('#divCesionario').removeClass('hide');
        }else{

            $("#divCesionario").addClass('hide');
            $("#idrelacion_personal").val("");
        }
    });
};

BienInmueble.prototype.init_otra_relacion = function () {

    $("#idrelacion_personal").change(function () {

        if (this.value=="22"){

            divT = document.getElementById("divRelacion");
            divT.style.display = "";
        }else{

            divT = document.getElementById("divRelacion");
            document.getElementById('otrarelacion').value = "";
            divT.style.display = "none";

        }
    });
};

BienInmueble.prototype.init_titular = function () {

    $("#idtitular").change(function () {

        if (isCopropiedad('idtitular'))
        {
            toggleDivContent('divDatosTerceroTitle', true, [], [])
            toggleDivContent('divDatosTerceroPart1', true, [], [])
        } else {

            toggleDivContent('divDatosTerceroTitle', false, [], [])
            toggleDivContent('divDatosTerceroPart1', false, [], [])
        }
    });
};

BienInmueble.prototype.init_ubicacion = function () {

    $("#ubicacion").change(function () {

        if (this.value === 'mexico')
        {
            jQuery("#divDomicilioMexicoTitle").show();
            toggleDivContent("divDomicilioMexicoPart0", true, [], []);
            toggleDivContent("divDomicilioMexicoPart1", true, [], []);
            toggleDivContent("divDomicilioMexicoPart2", true, ['num_int'], ['num_int']);

            jQuery("#divDomicilioForeingTitle").hide();
            jQuery("#country_name").val("México");
            toggleDivContent('divForeingAddress', false, ['num_int_extranjero'], ['num_int_extranjero']);

        } else if (this.value === 'extranjero') {

            jQuery("#divDomicilioMexicoTitle").hide();
            toggleDivContent("divDomicilioMexicoPart0", false, [], []);
            toggleDivContent("divDomicilioMexicoPart1", false, [], []);
            toggleDivContent("divDomicilioMexicoPart2", false, ['num_int'], ['num_int']);

            jQuery("#divDomicilioForeingTitle").show();
            toggleDivContent('divForeingAddress', true, ['num_int_extranjero'], ['num_int_extranjero']);
        } else if (this.value === 'desconocido') {

            jQuery("#divDomicilioMexicoTitle").hide();
            toggleDivContent("divDomicilioMexicoPart0", false, [], []);
            toggleDivContent("divDomicilioMexicoPart1", false, [], []);
            toggleDivContent("divDomicilioMexicoPart2", false, ['num_int'], ['num_int']);

            jQuery("#divDomicilioForeingTitle").hide();
            toggleDivContent('divForeingAddress', false, ['num_int_extranjero'], ['num_int_extranjero']);
        }
    });
};