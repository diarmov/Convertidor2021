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

    
};


Baja.prototype.init_dates = function () {

   
    jQuery('#fecha_baja').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
   
};
