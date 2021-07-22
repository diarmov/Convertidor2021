"use strict";

const declarationTypes = {
    'I': 'Inicial',
    'A': 'Modificación patrimonial',
    'F': 'Conclusión'
};

function Home (base_url)
{
    this.base_url = base_url;
    this.url = `${base_url}/home/nextDeclarations`;
};

Home.prototype.init = function() {

    this.initOpenModal(this);
    this.initSave(this);
};

Home.prototype.initOpenModal = function(_self)
{
    $("#addDeclaration").click(function () {


         var myDiv = document.getElementById("msgDec");
         myDiv.innerHTML = "";

        let nextDeclarations = _self.getNextDeclarations();

        let selectDeclarationType = $('#declarationType');

        selectDeclarationType.html('');
        selectDeclarationType.append("<option value=''>-- Tipo --</option>");
        if (nextDeclarations && (nextDeclarations.length > 0))
        {
            $.each(nextDeclarations, function (idx, value) {

                let o = new Option(declarationTypes[value], value);
                $(o).html(declarationTypes[value]);

                selectDeclarationType.append(o);
            });
            $("#mdlAddDeclaration").modal("show");
        } else {
            // show error
        }
    });
};

Home.prototype.getNextDeclarations = function ()
{

    let _token = $("meta[name='csrf-token']").attr('content'),
        nextDeclarations = [],
        _self = this;

    $.ajax({
        beforeSend: function(xhr) {
            xhr.setRequestHeader('X-CSRF-TOKEN', _token);
        },
        dataType: 'json',
        type: 'GET',
        url: _self.url,
        async: false,
        success: function(response) {
        
            if (response && (response.hasOwnProperty('status')) && (response['status'] === 200)) {

                nextDeclarations = response['data'];
            }
        },
        error: function ()
        {

        }
    });

    return nextDeclarations;
};

Home.prototype.initSave = function (_self) {

    let urlCreation = `${_self.base_url}/home/createDeclaration`,
        _token = $("meta[name='csrf-token']").attr('content');

    $("#btnSave").click(function () {

        if ($("#frmCreateDeclaration").isValid())
        {
            let data = $("#frmCreateDeclaration").serializeArray();


            $.ajax({
                beforeSend: function(xhr) {
                    jsShowWindowLoad("Importando datos de la última declaración!");
                    xhr.setRequestHeader('X-CSRF-TOKEN', _token);
                },
                dataType: 'json',
                type: 'POST',
                data: data,
                url: urlCreation,
                success: function(response) {
 

                    if (response && (response.hasOwnProperty('status')) && (response['error'] === 'anual') ){
                       jsShowWindowLoad("No permitido");
                       jsRemoveWindowLoad();
                                              
                       //$("#mdlAddDeclaration").modal("hide");
                       //alert(response['msg']);
                         var myDiv = document.getElementById("msgDec");
                         myDiv.innerHTML = response['msg'];

                    }

                    if (response && (response.hasOwnProperty('status')) && (response['error'] === 'repetida')) {
                        var ruta = response['route'];  
                        //alert(ruta);
                        //window.location(ruta);
                        // Simulate an HTTP redirect:
                         window.location.href = ruta;
                        // location.reload();

                    } 


                    if (response && (response.hasOwnProperty('status')) && (response['status'] === 200) && (response['error'] === '') ) {

                        location.reload();
                    }
                },
                error: function ()
                {
                    alert("Error");
                    jsRemoveWindowLoad();
                }
            });
        }
    });
};