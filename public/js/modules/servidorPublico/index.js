"use strict";

function ServidorPublico(base_url)
{
    this.base_url = base_url;
}

ServidorPublico.prototype.init = function () {

    this.init_dates();
    this.init_validate();
    this.init_servidor_publico();
};

ServidorPublico.prototype.init_dates = function () {

    $('#fecha_inicio').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
    $('#fecha_fin').datetimepicker({ format: 'L', locale: 'es', viewMode: 'years'});
};

ServidorPublico.prototype.init_validate = function () {

    $.validate({
        lang: 'es',
        form: '#frmEdit'
    });
};

ServidorPublico.prototype.init_servidor_publico = function () {

    $("#servidorpublico").change(function () {

        if (this.value == 1) {

            toggleDivContent('divDates', true, [], ['aclaraciones', 'otro_tipo_inversion', 'otro_tipo_enagenacion']);
        } else {

            toggleDivContent('divDates', false, [], ['aclaraciones', 'otro_tipo_inversion', 'otro_tipo_enagenacion']);
        }
    });
};

ServidorPublico.prototype.init_tipo_enagenacion = function () {

    $("#tipo_enagenacion").change(function () {

        console.log(this.value);
    });


};
