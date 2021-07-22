"use strict";

var placesSelectorInitializer =  function (countryId, stateId, municipalityId)
{
    initCountry(countryId, stateId, municipalityId);
    initState(stateId, municipalityId);
}

var initCountry = function (countryId, stateId, municipalityId) {

    $(`select[name="${countryId}"]`).on('change', function() {

        $(`select[name="${municipalityId}"]`).empty();

        var paisId = $(this).val();

        if (paisId) {

            $.ajax({

                url: '/estados/get/' + paisId,
                type: "GET",
                dataType: "json",
                async: false,

                beforeSend: function() {

                    jsShowWindowLoad("Cargando datos, por favor espere!");
                },

                success: function(data) {

                    $(`select[name="${stateId}"]`).empty();
                    $(`select[name="${stateId}"]`).append('<option value="">Seleccione una opción</option>');
                    
                    $.each(data, function(key, value) {

                        $(`select[name="${stateId}"]`).append('<option value="' + key + '">' + value + '</option>');
                    });
                },

                complete: function() {

                    jsRemoveWindowLoad();
                },
                error: function () {

                    jsRemoveWindowLoad();
                }
            });

        } else {

            $(`select[name="${stateId}"]`).empty();
            $(`select[name="${stateId}"]`).append('<option value="0">N/A</option>');
        }
    });
};

var initState = function (stateId, municipalityId) {

    $(`select[name="${stateId}"]`).on('change', function() {

        var estadoId = $(this).val();

        if (estadoId) {

            $.ajax({

                url: '/municipios/get/' + estadoId,
                type: "GET",
                dataType: "json",
                async: false,
                beforeSend: function() {

                    jsShowWindowLoad("Cargando datos, por favor espere!");
                },

                success: function(data) {

                    $(`select[name="${municipalityId}"]`).empty();
                    $(`select[name="${municipalityId}"]`).append('<option value="">Seleccione una opción</option>');

                    $.each(data, function(key, value) {

                        $(`select[name="${municipalityId}"]`).append('<option value="' + key + '">' + value + '</option>');
                    });
                },

                complete: function() {

                    jsRemoveWindowLoad();
                },
                error: function () {

                    jsRemoveWindowLoad();
                }
            });

        } else {

            $(`select[name="${municipalityId}"]`).empty();
            $(`select[name="${municipalityId}"]`).append('<option value="0">N/A</option>');
        }
    });
};