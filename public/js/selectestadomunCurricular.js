$(document).ready(function() {

    $('select[name="id_pais"]').on('change', function() {
        $('select[name="id_municipio"]').empty();
        var paisId = $(this).val();
        if (paisId == 108) {
            $.ajax({
                url: APP_URL + '/estados/get/' + paisId,
                type: "GET",
                dataType: "json",
                async: false,
                beforeSend: function() {
                    $('#live_loading').css("visibility", "visible");
                },
                success: function(data) {
                    $('select[name="id_estado"]').empty();
                    $('select[name="id_estado"]').append('<option value="">Seleccione una opción</option>');
                    $.each(data, function(key, value) {
                        $('select[name="id_estado"]').append('<option value="' + key + '">' + value + '</option>');
                    });
                },
                complete: function() {
                    $('#live_loading').css("visibility", "hidden");
                }
            });
        } else {
            $('select[name="id_estado"]').empty();
            $('select[name="id_estado"]').append('<option value="0">N/A</option>');
            $('select[name="id_municipio"]').empty();
            $('select[name="id_municipio"]').append('<option value="0">N/A</option>');
        }
    });


    $('select[name="id_estado"]').on('change', function() {


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
                    $('select[name="id_municipio"]').empty();
                    $('select[name="id_municipio"]').append('<option value="">Seleccione una opción</option>');
                    $('select[name="id_estado"]').append('<option value="">Seleccione una opción</option>');
                    $.each(data, function(key, value) {
                        $('select[name="id_municipio"]').append('<option value="' + key + '">' + value + '</option>');
                    });
                },
                complete: function() {
                    $('#live_loading').css("visibility", "hidden");
                }
            });
        } else {
            $('select[name="id_municipio"]').empty();
            $('select[name="id_municipio"]').append('<option value="0">N/A</option>');
        }
    });




});