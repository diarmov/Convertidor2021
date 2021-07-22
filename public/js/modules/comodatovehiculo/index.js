"use strict";

function ComodatoVehiculo() {

}


ComodatoVehiculo.prototype.init = function () {

    this.initDates();
    this.initValidators();
    this.initTipoVeh();
    this.initLugar();
};

ComodatoVehiculo.prototype.initDates = function () {

    jQuery('#fecha_inicio').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
 
};

ComodatoVehiculo.prototype.initValidators = function () {

    $.formUtils.addValidator({
        name: 'validRFC',
        validatorFunction: function(value, $el) {

            return validateRFC(value, $el);
        },
        errorMessage: 'No es un RFC válido',
        errorMessageKey: 'badRFC'
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

ComodatoVehiculo.prototype.initLugar = function () {

    jQuery("#lugar").on('change', function () {
    
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




ComodatoVehiculo.prototype.initTipoVeh = function () {

    jQuery("#idtipovehcomodato").change(function () {

        let option = $( "#idtipovehcomodato option:selected" ).text();

        if (option === "Otro")
        {
            toggleDivContent("divOtroVeh", true, [], []);
        } else {

            toggleDivContent("divOtroVeh", false, [], []);
        }
    });

};
