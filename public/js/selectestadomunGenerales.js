$(document).ready(function() {

    $('select[name="id_pais_domicilio"]').on('change', function() {

        $('select[name="id_municipio_domicilio"]').empty();

        var paisId = $(this).val();

        if (paisId) {

            $.ajax({

                url: APP_URL + '/estados/get/' + paisId,
                type: "GET",
                dataType: "json",
                async: false,

                beforeSend: function() {

                    $('#live_loading').css("visibility", "visible");
                },

                success: function(data) {

                    $('select[name="idestado_domicilio"]').empty();
                    $('select[name="idestado_domicilio"]').append('<option value="">Seleccione una opción</option>');
                    $('select[name="idestado_domicilio"]').append('<option value="0">N/A</option>');

                    $.each(data, function(key, value) {

                        $('select[name="idestado_domicilio"]').append('<option value="' + key + '">' + value + '</option>');
                    });
                },

                complete: function() {

                    $('#live_loading').css("visibility", "hidden");
                }
            });

        } else {

            $('select[name="idestado_domicilio"]').empty();
            $('select[name="idestado_domicilio"]').append('<option value="0">N/A</option>');
        }
    });


    $('select[name="idestado_domicilio"]').on('change', function() {

        var estadoId = $(this).val();

        if (estadoId) {

            $.ajax({

                url: APP_URL + '/getmunicipios/get/' + estadoId,
                type: "GET",
                dataType: "json",
                async: false,

                beforeSend: function() {

                    $('#live_loading').css("visibility", "visible");
                },

                success: function(data) {

                    $('select[name="id_municipio_domicilio"]').empty();
                    $('select[name="id_municipio_domicilio"]').append('<option value="0">N/A</option>');

                    $.each(data, function(key, value) {

                        $('select[name="id_municipio_domicilio"]').append('<option value="' + key + '">' + value + '</option>');
                    });
                },

                complete: function() {

                    $('#live_loading').css("visibility", "hidden");
                }

            });

        } else {

            $('select[name="id_municipio_domicilio"]').empty();
            $('select[name="id_municipio_domicilio"]').append('<option value="0">N/A</option>');
        }
    });

});