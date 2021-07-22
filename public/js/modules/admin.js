"use strict";

function Admin(url) {
    this.url = url;
    this.users = {
        '0,1,2': [{ 'rol': 1, 'name': 'Declarante' }, { 'rol': 200, 'name': 'Administrador General' }, { 'rol': 206, 'name': 'Administrador OIC' }, { 'rol': 207, 'name': 'Administrador Órgano Autónomo' }],
        '0': [{ 'rol': 1, 'name': 'Declarante' }, { 'rol': 206, 'name': 'Administrador OIC' }],
        '1': [{ 'rol': 1, 'name': 'Declarante' }, { 'rol': 206, 'name': 'Administrador OIC' }],
        '2': [{ 'rol': 1, 'name': 'Declarante' }, { 'rol': 207, 'name': 'Administrador Órgano Autónomo' }],
        '0,1': [{ 'rol': 1, 'name': 'Declarante' }, { 'rol': 200, 'name': 'Administrador General' }, { 'rol': 206, 'name': 'Administrador OIC' }]
    }
};

Admin.prototype.updateDependencies = function(centrality) {

    if (centrality) {

        let _token = $("meta[name='csrf-token']").attr('content');

        $.ajaxSetup({
            headers: {
                'X-CSRF-TOKEN': _token
            }
        });

        $.get(`${this.url}?centrality=${centrality}`, function(dependencies) {

            if (dependencies) {
                $("#dependency").find('option').remove().end().append(`<option value=''>Dependencia</option>`);

                dependencies.forEach(dependency => {

                    $("#dependency").append(`<option value='${dependency['iddependencia']}'>${dependency['dependencia']}</option>`);
                });
            }
        });
    } else {

        $("#dependency").find('option').remove().end().append(`<option value=''>Dependencia</option>`);
    }
};

Admin.prototype.updateUserTypes = function(centrality) {

    if (this.users.hasOwnProperty(centrality)) {

        let users = this.users[centrality];

        $("#rol").find('option').remove().end().append(`<option value=''>Tipo de Usuario</option>`);
        users.forEach(user => {

            console.log(user);
            $("#rol").append(`<option value='${user['rol']}'>${user['name']}</option>`);
        });
    }

};
