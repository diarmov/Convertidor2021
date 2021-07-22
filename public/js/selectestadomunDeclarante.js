$(document).ready(function() {

    $('select[name="idpais"]').on('change', function(){

        $('select[name="idmunicipio"]').empty();
        var paisId = $(this).val();
        if(paisId) {
            $.ajax({
                url: '/estados/get/'+paisId,
                type:"GET",
                dataType:"json",
                async: false,
                beforeSend: function(){
                    $('#live_loading').css("visibility", "visible");
                },
                success:function(data) {
                        $('select[name="idestado"]').empty();
                        $('select[name="idestado"]').append('<option value="">Seleccione una opción</option>');
                        $('select[name="idestado"]').append('<option value="0">N/A</option>');
                    $.each(data, function(key, value){

                        $('select[name="idestado"]').append('<option value="'+ key +'">' + value + '</option>');
                    });

                },
                complete: function(){
                    $('#live_loading').css("visibility", "hidden");
                }
            });
        } else {
            $('select[name="idestado"]').empty();
            $('select[name="idestado"]').append('<option value="0">N/A</option>');
        }
    });




});
