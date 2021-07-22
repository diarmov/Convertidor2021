"use strict";

function Apoyo() {

}


Apoyo.prototype.init = function () {

    this.initValidators();
    this.initTipoApoyo();

};


Apoyo.prototype.initValidators = function () {

 
    $.validate({

        form: '#frmEdit',
        lang: 'es',
        modules: "security, date",
        onError: function($form) {
            // alert("Hay elementos que debe cuidar para poder procesar.");
        }
    });
};



Apoyo.prototype.initTipoApoyo = function () {

    jQuery("#idcat_apoyo").change(function () {


        let option = $( "#idcat_apoyo option:selected" ).text();


        if (option === "Otro")
        {
            toggleDivContent("divOtroApoyo", true, [], []);
        } else {

            toggleDivContent("divOtroApoyo", false, [], []);
        }
    });

};
