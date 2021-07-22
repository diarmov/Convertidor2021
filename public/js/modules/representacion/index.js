"use strict";

function Representacion() {

}


Representacion.prototype.init = function () {

    this.initDates();
    this.initValidators();
    this.initCiudadanoExtranjero();
    this.initResidencia();
    this.initActividadLaboral();
    this.initTipoRelacion();
};

Representacion.prototype.initDates = function () {

    jQuery('#fecha_inicio_repre').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
};

Representacion.prototype.initValidators = function () {

    $.formUtils.addValidator({
        name: 'validRFC',
        validatorFunction: function(value, $el) {

            return validateRFC(value, $el);
        },
        errorMessage: 'No es un RFC válido',
        errorMessageKey: 'badRFC'
    });

    $.formUtils.addValidator({
        name: 'validCURP',
        validatorFunction: function (value, $el) {

            return validateCURP(value, $el);
        },
        errorMessage: 'No es un CURP válido!',
        errorMessageKey: 'badCURP'
    });

    $.validate({

        form: '#frmEdit',
        lang: 'es',
        modules: "security, date",
        onError: function($form) {
            // alert("Hay elementos que debe cuidar para poder procesar.");
        }
    });
};

Representacion.prototype.initCiudadanoExtranjero = function () {

    jQuery("#es_ciudadano_extranjero").on('change', function () {
        // data-validation="required|validCURP"
        if (this.value === '0')
        {
            show('curp');
            jQuery("#curp").attr('data-validation', 'required|validCURP');
        } else if (this.value === '1') {

            hide('curp');
        }
    });
};

Representacion.prototype.initResidencia = function () {

    jQuery("#residencia").on('change', function () {

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


Representacion.prototype.initActividadLaboral = function () {

    jQuery("#actividad_laboral").on('change', function () {

        if (this.value === 'publico')
        {
            toggleDivContent("divEmpleoPublicoPart0", true, [], []);
            toggleDivContent("divEmpleoPublicoPart1", true, [], []);
            toggleDivContent("divEmpleoPublicoPart2", true, [], []);

            toggleDivContent("divEmpleoPrivadoPart0", false, [], []);
            toggleDivContent("divEmpleoPrivadoPart1", false, [], []);

            jQuery("#publico_fecha_ingreso").attr('data-validation', 'required|birthdate');

        } else if ((this.value === 'privado') || (this.value === 'otro')) {

            toggleDivContent("divEmpleoPublicoPart0", false, [], []);
            toggleDivContent("divEmpleoPublicoPart1", false, [], []);
            toggleDivContent("divEmpleoPublicoPart2", false, [], []);

            toggleDivContent("divEmpleoPrivadoPart0", true, [], []);
            toggleDivContent("divEmpleoPrivadoPart1", true, [], []);

            jQuery("#privado_rfc").attr('data-validation', 'required|validRFC');
        } else {

            toggleDivContent("divEmpleoPublicoPart0", false, [], []);
            toggleDivContent("divEmpleoPublicoPart1", false, [], []);
            toggleDivContent("divEmpleoPublicoPart2", false, [], []);

            toggleDivContent("divEmpleoPrivadoPart0", false, [], []);
            toggleDivContent("divEmpleoPrivadoPart1", false, [], []);
        }
    });
};

Representacion.prototype.initTipoRelacion = function () {

    jQuery("#idtipo_relacion").change(function () {

        let option = $( "#idtipo_relacion option:selected" ).text();

        if (option === "Otro familiar")
        {
            toggleDivContent("divOtraRelacion", true, [], []);
        } else {

            toggleDivContent("divOtraRelacion", false, [], []);
        }
    });

};
