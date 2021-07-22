$(document).ready(function() {

    $('select[name="id_poder"]').on('change', function() {
        var Id = $(this).val();
        if (Id) {
            $.ajax({
                url: '/depAmbito/get/' + Id,
                type: "GET",
                dataType: "json",
                async: false,
                beforeSend: function() {
                    $('#live_loading').css("visibility", "visible");
                },
                success: function(data) {
                    $('select[name="iddependencia"]').empty();
                    $('select[name="iddependencia"]').append('<option value="">Seleccione una opción</option>');
                    //$('select[name="id_estado"]').append('<option value="">Seleccione una opción</option>');
                    $.each(data, function(key, value) {
                        $('select[name="iddependencia"]').append('<option value="' + key + '">' + value + '</option>');
                    });
                },
                complete: function() {
                    $('#live_loading').css("visibility", "hidden");
                }
            });
        } else {
            $('select[name="iddependencia"]').empty();
            $('select[name="iddependencia"]').append('<option value="0">N/A</option>');
        }
    });
















});