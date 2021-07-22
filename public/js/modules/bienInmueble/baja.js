function Baja(url, frmId) {
    this.url = url;
    Updater.call(this, url, frmId);
};

Baja.prototype = Updater.prototype;

Baja.prototype.init = function () {

    this.init_dates();
    this.init_operacion_inmueble();
    this.init_validate();
    Updater.prototype._init.call(this);
};

Updater.prototype.init_operacion_inmueble = function () {

    $("#idoperacion_inmueble").on('change', function () {

        if (isOtherSelected('idoperacion_inmueble'))
        {
            toggleDivContent('otroMotivoBaja', true)
        } else {

            toggleDivContent('otroMotivoBaja', false)
        }
    });
};

Baja.prototype.init_validate = function () {

    $.validate({
        lang: 'es',
        form: `#${this.frmId}`
    });
};

Baja.prototype.init_dates = function () {

    jQuery('#fecha_operacion').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
};
