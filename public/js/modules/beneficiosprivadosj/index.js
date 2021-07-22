"use strict";

function Beneficios() {

}


Beneficios.prototype.init = function () {

  
    this.initValidators();
   
}; 



Beneficios.prototype.initValidators = function () {

   
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








