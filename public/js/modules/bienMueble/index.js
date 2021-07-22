const INPUTS = {
    'incorporacion': {
        'divs': [],
        'inputs': [
            { 'id': 'idadquisicion', 'req': true },
            { 'id': 'fecha_adquisicion', 'req': true },
            { 'id': 'idtitular', 'req': true }
        ]
    },
    'venta': {
        'divs': [],
        'inputs': [
            { 'id': 'forma_operacion', 'req': true },
            { 'id': 'valor_operacion', 'req': true },
            { 'id': 'fecha_operacion', 'req': true },
            { 'id': 'nuevo_propietario', 'req': true }
        ]
    },
    'adquisicion': {
        'divs': [ 'divAdquisicion' ],
        'inputs': [
            { 'id': 'nombre', 'req': true },
            { 'id': 'idrelacion_personal', 'req': true }
        ]
    }
};

function BienMueble ()
{
    this.base_url = getRootWebSitePath();
}

BienMueble.prototype.init = function () {

    this.init_dates();
    this.init_tipo_mueble();
    this.init_operacion();
    this.init_adquisicion();
    this.init_otra_relacion();
    this.init_titular();
    this.init_validations();
};

BienMueble.prototype.init_dates = function () {

    $('#fecha_operacion').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
    $('#fecha_adquisicion').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
};

BienMueble.prototype.init_tipo_mueble = function () {

    $('#idtipo_mueble').change(function () {

        let input = $('#idtipo_mueble');

        if (this.value == 3)
        {
            $("#divManeje").show();
            input.attr('data-validation', 'required');
        } else {

            $("#divManeje").hide();
            input.removeAttr('data-validation');
        }
    });
};

BienMueble.prototype.init_operacion = function () {

    $("#idoperacion_mueble").change(function () {

        if (this.value == 2) // venta
        {
            render(INPUTS['venta'], 'show');
            render(INPUTS['incorporacion'], 'hide');
            render(INPUTS['adquisicion'], 'hide');

            toggleDivContent('divTransmisorTitle', false, [], []);
            toggleDivContent('divTransmisor', false, [], [], true);
        } else {

            render(INPUTS['venta'], 'hide');
            render(INPUTS['incorporacion'], 'show');
            render(INPUTS['adquisicion'], 'hide');

            toggleDivContent('divTransmisorTitle', true, [], []);
            toggleDivContent('divTransmisor', true, [], [], true);
        }
    });
};

BienMueble.prototype.init_adquisicion = function () {

    $("#idadquisicion").change(function () {

        let id = this.value;

        if ((id == 1) || (id == 4) || (id == 5))
        {
            render(INPUTS['adquisicion'], 'show');
        } else {

            render(INPUTS['adquisicion'], 'hide');
        }
    });
};

BienMueble.prototype.init_otra_relacion = function () {

    $("#idrelacion_personal").change(function () {

        if (this.value == 22)
        {
            $("#divRelacion").show();
        } else {

            $("#divRelacion").hide();
        }
    });
};

BienMueble.prototype.init_validations = function () {

    $.formUtils.addValidator({
        name: 'validRFC',
        validatorFunction: function(value, $el) {

            return validateRFC(value, $el);
        },
        errorMessage: 'No es un RFC válido',
        errorMessageKey: 'badRFC'
    });

    $.validate({
        form: '#frmMueble',
        lang: 'es',
        // modules: "security, date",
        onError: function($form) {
            alert("Hay elementos que debe cuidar para poder procesar.");
        }
    });
};

BienMueble.prototype.init_titular = function () {

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

(function () {

    $(document).ready(function () {

        let mueble = new BienMueble();

        mueble.init();
    });
})();
