var review = function(_id) {

    let _type = $("#__TYPE__").val();

    if (_id && _type) {

        let review = new Review(base_url, `${base_url}/admin/observation/renderForm`);

        review.initEdition(_id, _type);
    }
};

var addRecord = function (iddeclaracion, iddeclarante) {

    let _type = $("#__TYPE__").val();

    if (!$("#aplica").prop('checked'))
    {

        if (iddeclaracion && iddeclarante && _type)
        {
            let review = new Review(base_url, `${base_url}/admin/observation/renderForm`);

            review.initEdition('', _type);
        }
    }
    else
    {
        $("#aplica").prop('checked', true);
        alert("Para agregar un nuevo registro, es necesario que primero desmarque 'Ninguno'");
    }
};