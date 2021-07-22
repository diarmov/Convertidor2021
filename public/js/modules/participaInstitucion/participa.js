"use strict";

function Participa() {

}


Participa.prototype.init = function () {

    this.initDates();
    this.initValidators();
    this.initLugar();
    this.initTipoRelacion();
};

Participa.prototype.initDates = function () {

    jQuery('#fecha_inicio').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
};

Participa.prototype.initValidators = function () {

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


Participa.prototype.initLugar = function () {

    jQuery("#lugar").on('change', function () {
        
        if (this.value === 'mexico')
        {
            jQuery("#divDomicilioMexicoTitle").show();
            toggleDivContent("divDomicilioMexicoPart0", true, [], []);
          
            jQuery("#divDomicilioForeingTitle").hide();
            jQuery("#country_name").val("México");
            toggleDivContent('divForeingAddress', false, ['num_int_extranjero'], ['num_int_extranjero']);

        } else if (this.value === 'extranjero') {

            jQuery("#divDomicilioMexicoTitle").hide();
             jQuery("#divDomicilioForeingTitle").show();
            toggleDivContent("divDomicilioMexicoPart0", false, [], []);
            
            jQuery("#divDomicilioForeingTitle").show();
            toggleDivContent('divForeingAddress', true, ['num_int_extranjero'], ['num_int_extranjero']);
        } else if (this.value === 'desconocido') {

            jQuery("#divDomicilioMexicoTitle").hide();
            toggleDivContent("divDomicilioMexicoPart0", false, [], []);
            jQuery("#divDomicilioForeingTitle").hide();
            toggleDivContent('divForeingAddress', false, ['num_int_extranjero'], ['num_int_extranjero']);
        }

    });
};


Participa.prototype.initTipoRelacion = function () {

    jQuery("#idinstitucion").change(function () {

        let option = $( "#idinstitucion option:selected" ).text();

        if (option === "Otro")
        {
            toggleDivContent("divOtraInstitucion", true, [], []);
        } else {

            toggleDivContent("divOtraInstitucion", false, [], []);
        }
    });

};