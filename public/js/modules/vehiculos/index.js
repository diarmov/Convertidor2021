"use strict";

const ID_PAIS_MEXICO = 108;

function Vehiculo () {

    this.base_url = getRootWebSitePath();
};


Vehiculo.prototype.init = function () {

    this.init_cesionario();
    this.init_otra_relacion();
    this.init_operacion();
    this.init_dates();
    this.init_ubicacion();
    this.init_titular();
    this.init_otro_vehiculo();
};


Vehiculo.prototype.init_cesionario = function () {

    $("#idadquisicion").change(function () {

        if ((this.value==="1")  || (this.value==="4") || (this.value==="5") || (this.value==="6") || (this.value==="7") || (this.value==="8") || (this.value==="9") ){

            toggleDivContent('divCesionario', true)
        }else{

            toggleDivContent('divCesionario', false)
        }
    });
};


Vehiculo.prototype.init_otra_relacion = function () {

    $("#idrelacion").change(function () {

        if (this.value=="22"){

            toggleDivContent('divotroRelacion', true);
        }else{

            toggleDivContent('divotroRelacion', false);
        }
    });
};

Vehiculo.prototype.init_otro_vehiculo =  function () {

    $("#tipo_vehiculo_id").change(function () {

        if (this.value == "4") {

            toggleDivContent('divOtroVehiculo', true);
        } else {

            toggleDivContent('divOtroVehiculo', false);
        }
    });
};


Vehiculo.prototype.init_operacion = function () {

    $("#idoperacion").change(function () {

        if (this.value==="3"){ //Venta

            // venta
            show('formaVenta');
            show('valorVenta');
            show('fechaVenta');

            // siniestro
            hide('tipoSiniestro');
            hide('aseguradoraSiniestro');
            hide('fechaSiniestro');
            hide('valorSiniestro');

            // adquisicion
            hide('idadquisicion');
            hide('valor');
            hide('fecha_adquisicion');

            // cesionario
            hide('nombreCesionario');
            hide('idrelacion');
            hide('otrorelacion');
            $("#divCesionario").hide();

            toggleDivContent('divTransmisorTitle', false, [], [])
            toggleDivContent('divTransmisor', false, [], [], true)
        }

        if (this.value==="2"){ //Siniestro

            // siniestro
            show('tipoSiniestro');
            show('aseguradoraSiniestro');
            show('fechaSiniestro');
            show('valorSiniestro');

            // venta
            hide('formaVenta');
            hide('valorVenta');
            hide('fechaVenta');

            // adquisicion
            hide('idadquisicion');
            hide('valor');
            hide('fecha_adquisicion');

            // cesionario
            hide('nombreCesionario');
            hide('idrelacion');
            hide('otrorelacion');
            $("#divCesionario").hide();
            toggleDivContent('divTransmisorTitle', true, [], []);
            toggleDivContent('divTransmisor', true, [], [], true)
        }

        if (this.value==="1" || this.value==="4") // Incorporación o Sin cambio
        {
            // adquisicion
            show('idadquisicion');
            show('valor');
            show('fecha_adquisicion');

            // Cesionario
            $(`#nombreCesionario`).closest('div').show();
            $(`#idrelacion`).closest('div').show();
            $(`#otrorelacion`).closest('div').show();
            $("#divCesionario").hide();

            // venta
            hide('formaVenta');
            hide('fechaVenta');
            hide('valorVenta');

            // Siniestro
            hide('tipoSiniestro');
            hide('aseguradoraSiniestro');
            hide('fechaSiniestro');
            hide('valorSiniestro');

            toggleDivContent('divTransmisorTitle', true, [], [])
            toggleDivContent('divTransmisor', true, [], [], true)

            $("#rfc_transmisor").prop('data-validation', 'required|validRFC');
        }
    });
};


Vehiculo.prototype.init_dates = function () {

    jQuery('#fecha_adquisicion').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
    jQuery('#fechaSiniestro').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
    jQuery('#fechaVenta').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
};


Vehiculo.prototype.init_ubicacion = function () {

    $("#ubicacion").change(function () {

        if (this.value == 'mexico') {

            toggleDivContent('divMexico', true);
            toggleDivContent('divExtranjero', false);

            $("#id_pais").val(ID_PAIS_MEXICO);
            $("#pais_extranjero_id").val('');
        } else {

            toggleDivContent('divMexico', false);
            toggleDivContent('divExtranjero', true);

            $("#id_pais").val('');
            $("#id_estado").val('');
        }
    });
};


Vehiculo.prototype.init_titular = function () {

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

        $.formUtils.addValidator({
            name: 'validRFC',
            validatorFunction: function(value, $el) {

                return validateRFC(value, $el);
            },
            errorMessage: 'No es un RFC válido',
            errorMessageKey: 'badRFC'
        });

        $.validate({
            form: '#frmVehiculo',
            lang: 'es',
            onError: function() {
                alert("Hay elementos que debe cuidar para poder procesar.");
            }
        });

        let vehiculo = new Vehiculo();

        vehiculo.init();
    });
})();