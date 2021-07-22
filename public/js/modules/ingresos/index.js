"use strict";

function Ingresos (base_url)
{
    this.base_url = base_url;
}

Ingresos.prototype.init = function () {
    this.init_validate();
    this.init_cargo_publico();
    this.init_industrial();
    this.init_financiero();
    this.init_servicios();
    this.init_otros();
    this.init_conyuge();
    this.init_enajenacion();
    this.init_instrumento();
};

Ingresos.prototype.reCalcSubtotal = function () {

    let industrial = $("#industrial").val();
    let financiero = $("#financiero").val();
    let servicios = $("#servicios").val();
    let otros = $("#otros").val();
    let enajenacion_vehiculo = $("#enajenacion_vehiculo").val();
    let enajenacion_muebles = $("#enajenacion_muebles").val();
    let enajenacion_inmueble = $("#enajenacion_inmueble").val();
    

    let montoSubtotal = 0;

    try {

        let montoIndustrial = (industrial)?parseInt(industrial):0;
        let montoFinanciero = (financiero)?parseInt(financiero):0;
        let montoServicios = (servicios)?parseInt(servicios):0;
        let montoOtros = (otros)?parseInt(otros):0;
        let montoEnajenacion_vehiculo = (enajenacion_vehiculo)?parseInt(enajenacion_vehiculo):0;
        let montoEnajenacion_muebles = (enajenacion_muebles)?parseInt(enajenacion_muebles):0;
        let montoEnajenacion_inmueble = (enajenacion_inmueble)?parseInt(enajenacion_inmueble):0;

        montoSubtotal = montoIndustrial + montoFinanciero + montoServicios +montoEnajenacion_vehiculo+montoEnajenacion_muebles+montoEnajenacion_inmueble+ montoOtros;
    } catch(e) {

        console.log(e);
    }

    $("#subtotal").val(montoSubtotal);
};

Ingresos.prototype.reCalcIngresoNeto = function () {

    let cargoPublico = $("#cargo_publico").val();
    let subtotal = $("#subtotal").val();

    let montoIngresoNeto = 0;

    try {

        let montoCargoPublico = (cargoPublico)?parseInt(cargoPublico): 0;
        let montoSubtotal = (subtotal)?parseInt(subtotal): 0;

        montoIngresoNeto = montoCargoPublico + montoSubtotal;
    } catch(e) {
        console.log(e);
    }

    $("#ingreso_neto").val(montoIngresoNeto);
};

Ingresos.prototype.reCalcTotalIngreso = function () {

    let ingresoNeto = $("#ingreso_neto").val();
    let ingresoConyuge = $("#ingreso_conyuge").val();

    let totalIngreso = ingresoNeto + ingresoConyuge;

    try {

        let montoIngresoNeto = (ingresoNeto)?parseInt(ingresoNeto):0;
        let montoIngresoConyuge = (ingresoConyuge)?parseInt(ingresoConyuge):0;

        totalIngreso = montoIngresoNeto + montoIngresoConyuge;

    } catch (e) {

        console.log(e);
    }

    $("#total_ingreso").val(totalIngreso);
};

let recalc = function(_self, field)
{

    $(`#${field}`).keyup(function () {

        _self.reCalcSubtotal();
        _self.reCalcIngresoNeto();
        _self.reCalcTotalIngreso();
    });
};

Ingresos.prototype.init_cargo_publico = function () {

    recalc(this, 'cargo_publico');
}; 

Ingresos.prototype.init_industrial = function () {

    recalc(this, 'industrial');
};


Ingresos.prototype.init_financiero = function () {

    recalc(this, 'financiero');
};

Ingresos.prototype.init_servicios = function () {

    recalc(this, 'servicios');
};

Ingresos.prototype.init_otros = function () {

    recalc(this, 'otros');
};

Ingresos.prototype.init_conyuge = function () {

    recalc(this, 'ingreso_conyuge');
};

Ingresos.prototype.init_validate = function () {

    $.validate({
        form: '#frmEdit',
        lang: 'es',
        onError: function($form) {
            alert("Hay elementos que debe cuidar para poder procesar.");
        }
    });
};

Ingresos.prototype.init_instrumento = function () {

    $("#idtipo_inversion").change(function () {

        if (isOtherSelected('idtipo_inversion')) {

            toggleDivContent("divOtroTipoInversion", true, [], [])
        } else {

            toggleDivContent("divOtroTipoInversion", false, [], [])
        }
    });
}