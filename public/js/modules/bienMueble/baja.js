function Baja(url, frmId) {
    this.url = url;
    Updater.call(this, url, frmId); // call constructor
}

Baja.prototype = Updater.prototype; // inheritance

Baja.prototype.init = function () {

    this.init_validate();
    this.init_operacion();
    this.init_dates();

    Updater.prototype._init.call(this);
};

Baja.prototype.init_validate = function () {

    $.validate({
        lang: 'es',
        form: `#${this.frmId}`
    });
};

Baja.prototype.init_operacion = function () {

    $("#idoperacion_mueble").change(function () {

        let option = $("#idoperacion_mueble option:selected").text().trim().toLowerCase();

        if (option === 'siniestro')
        {
            toggleDivContent('divSiniestroPart1', true);
            toggleDivContent('divSiniestroPart2', true);

            toggleDivContent('divVenta', false);
            toggleDivContent('otroMotivoBaja', false);
            toggleDivContent('divBaja1', false);
            toggleDivContent('divBaja2', false);
        } else if (option === 'venta') {

            toggleDivContent('divVenta', true);

            toggleDivContent('divSiniestroPart1', false);
            toggleDivContent('divSiniestroPart2',false );
            toggleDivContent('otroMotivoBaja', false);
            toggleDivContent('divBaja', false);
            toggleDivContent('divBaja1', false);
            toggleDivContent('divBaja2', false);
        } else if (option.includes('donac')) {

            toggleDivContent('divBaja1', true);
            toggleDivContent('divBaja2',true );

            toggleDivContent('divVenta',false );
            toggleDivContent('divSiniestroPart1', false);
            toggleDivContent('divSiniestroPart2',false );
            toggleDivContent('otroMotivoBaja', false);
        } else if (option === 'otro') {

            toggleDivContent('divBaja1', true);
            toggleDivContent('divBaja2',true );
            toggleDivContent('otroMotivoBaja', true);

            toggleDivContent('divVenta', false );
            toggleDivContent('divSiniestroPart1', false);
            toggleDivContent('divSiniestroPart2',false );
        } else {
            toggleDivContent('divBaja1', false);
            toggleDivContent('divBaja2', false );

            toggleDivContent('divVenta', false );
            toggleDivContent('divSiniestroPart1', false);
            toggleDivContent('divSiniestroPart2', false );
            toggleDivContent('otroMotivoBaja', false);
        }
    });
};

Baja.prototype.init_dates = function () {

    jQuery('#fechaVenta').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
    jQuery('#fecha_baja').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
    jQuery('#fechaSiniestro').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
};
