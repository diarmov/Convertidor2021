"use strict";

let DATE_REGEX = /^\d{4}-(0?[1-9]|1[012])-(0?[1-9]|[12][0-9]|3[01])$/;
let DATETIME_REGEX = /^\d\d\d\d-(0?[1-9]|1[0-2])-(0?[1-9]|[12][0-9]|3[01]) (00|[0-9]|1[0-9]|2[0-3]):([0-9]|[0-5][0-9]):([0-9]|[0-5][0-9])$/;
let SPANISH_DATE_REGEX = /^(0?[1-9]|[12][0-9]|3[01])[\/](0?[1-9]|1[012])[\/]\d{4}$/;

let icons = {
    'delete': 'fa fa-trash',
    'edit': 'glyphicon glyphicon-pencil',
    'pdf': 'fa fa-file-pdf-o',
    'docx': 'fa fa-file-text',
    'jpg': 'fa fa-file-image-o',
    'gif': 'fa fa-file-image-o',
    'png': 'fa fa-file-image-o'
};

let showMessage = function(type, message) {

    return `<div class="alert alert-${type} alert-dismissible" role="alert">
    ${message}
    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>`;
};

let clearForm = function(id, e) {

    jQuery(`#${id}`).find("input[type=text], select").val("");

    e.preventDefault();

    return false;
};

let isEmpty = function isEmpty(obj) {
    for (let key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
};


let getIcon = function(name, isBold) {

    let icon = '<i class="fa fa-file" aria-hidden="true"></i>';

    if (icons.hasOwnProperty(name)) {
        icon = `<i class="${icons[name]}" aria-hidden="true"></i>`;
    }

    icon = (isBold) ? `<b>${icon}</b>` : icon;

    return icon;
};


let justNumbers = function(e) {

    let key = (e.which) ? e.which : e.keynum;

    return !((key !== 48) && (key > 31) && (key < 48 || key > 57));
};

let render = function(json, operation) {

    if (operation === 'show') {

        showDivs(json);
        showInputs(json);
    } else if (operation === 'hide') {

        hideDivs(json);
        hideInputs(json);
    }
};

let showDivs = function(json) {

    if (json['divs'].length > 0) {

        json['divs'].forEach(function(divId) {

            jQuery(`#${divId}`).removeClass('hide');
        });
    }
};

let showInputs = function(json) {

    if (json['inputs'].length > 0) {

        json['inputs'].forEach(function(inputId) {

            let input = jQuery(`#${inputId['id']}`);

            input.closest('div').removeClass('hide');
            input.removeAttr('data-validation-skipped');
            input.attr('data-validation', 'required');
        });
    }
};

let hideDivs = function(json) {

    if (json['divs'].length > 0) {

        json['divs'].forEach(function(divId) {

            jQuery(`#${divId}`).addClass('hide');
        });
    }
};

let hideInputs = function(json) {

    if (json['inputs'].length > 0) {

        json['inputs'].forEach(function(inputId) {

            let input = jQuery(`#${inputId['id']}`);

            input.closest('div').addClass('hide');
            input.removeAttr('data-validation');
            input.attr('data-validation-skipped', "1");

            if (input.is('select')) {

                input.prop('value', '');
                input.change();
                // input.attr('value', '').change();
            } else {

                input.attr('value', '');
            }
        });
    }
};

let jsonHasChanges = function(original, changes) {

    let changed = false;

    for (let key in original) {

        // if the original element is a null and change is '' (empty string) it should count as none
        if ((original[key] != changes[key]) && !((original[key] === null) && (changes[key] === ''))) {
            changed = true;
            break;
        }
    }

    return changed;
};

let getChangedFields = function(original, changes) {

    let a_changes = [];

    for (let key in original) {

        if (original[key] != changes[key]) {

            a_changes.push({ 'id': key, 'value': changes[key] });
        }
    }

    return a_changes;
};

let cloneJSON = function(originalJSON) {

    return JSON.parse(JSON.stringify(originalJSON));
};


let isDate = function (_value) {

    return DATE_REGEX.test(_value) && (_value.indexOf('-') > -1);
};

let isDateTime = function (_value) {

    return DATETIME_REGEX.test(_value) && (_value.indexOf('-') > -1);
};

let spanish2EnglishDate = function (spanishDate) {

    let m = moment(spanishDate, "DD/MM/YYYY");

    if (m.isValid())
    {
        return m.format("YYYY-MM-DD");
    }

    return spanishDate;
};


let spanish2EnglishDateTime = function (spanishDate) {

    let m = moment(spanishDate, "DD/MM/YYYY");

    if (m.isValid())
    {
        return m.format("YYYY-MM-DD HH:mm:ss");
    }

    return spanishDate;
};

let englishDT2SpanishDate = function (englishDateTime) {

    let m = moment(englishDateTime, "YYYY-MM-DD HH:mm:ss");

    if (m.isValid())
    {
        return m.format("DD/MM/YYYY");
    }

    return englishDateTime;
};

let english2SpanishDate = function (englishDate) {
    let m = moment(englishDate, "YYYY-MM-DD");

    if (m.isValid())
    {
        return m.format("DD/MM/YYYY");
    }

    return englishDate;
};

let isSpanishDate = function (_date) {

    if (!isNaN(_date)) return false; // we can't test a date if it is not a string

    return (_date.indexOf('/') > - 1) && SPANISH_DATE_REGEX.test(_date);
};

//
let toggleDivContent = function (divName, show, skipped, noRequired, keepValues) {

    let div = jQuery(`#${divName}`);

    if (div.length > 0)
    {
        if (show)
        {
            div.show();
        } else {
            div.hide();
        }

        let elements = div.find('input:text, input:password, input:file, select, textarea');

        if (elements.length > 0)
        {

            jQuery(elements).each(function (idx, element) {

                if (!skipped || skipped.indexOf(jQuery(element).attr('name')) === -1)
                {
                    if (!keepValues)
                    {
                        jQuery(element).val('');
                    }

                    if (show)
                    {
                        if (!noRequired || noRequired.indexOf(jQuery(element).attr('name')) === -1 ) {

                            jQuery(element).attr('data-validation', 'required');
                        }
                    } else {

                        jQuery(element).removeAttr('data-validation');
                    }
                }
            });
        }
    }
};


// use it to verify if 'otro' is selected
let isOtherSelected = function(id)
{
    let otherSelected = false,
        optionSelected = jQuery(`#${id} option:selected`);

    if (optionSelected.val() && optionSelected.text())
    {
        otherSelected = optionSelected.text().toLowerCase().trim() === 'otro';
    }

    return otherSelected;
};

// use it to hide fields
let hide = function(id)
{
    let field = jQuery(`#${id}`);

    if(field.is("select")) {

        field.val('').change();
    } else {

        field.attr('value','');
        field.val('');
    }

    field.removeAttr('data-validation');
    field.closest('div').hide();
};

let show = function (id)
{
    let div = jQuery(`#${id}`);
    div.closest('div').show();
    div.attr('data-validation','required');
};

// use it to enable or disable inputs of a form
let toggleStateInputs = function (frmId, isEnabled, skipped) {

    let elements = jQuery(`#${frmId}`).find('input:text, input:password, input:file, select, textarea');

    if (elements.length > 0)
    {
        jQuery(elements).each(function (idx, element) {

            if (skipped.indexOf(jQuery(element).attr('name')) === -1)
            {
                if (isEnabled) {

                    jQuery(element).removeClass('disable');

                } else {

                    jQuery(element).addClass('disable');
                }
            }
        });
    }
};

/*
This function validates a mexican RFC with the next features:
- First 3 characters (for moral people) or first 4 characters (for phisical people)
- Valid date after 3 or 4 characters
- Verificator digit as digit or A letter
- Allows gion or spaces between each part
- Original code: https://es.stackoverflow.com/questions/31713/c%C3%B3mo-validar-un-rfc-de-m%C3%A9xico-y-su-digito-verificador
* */
let validateRFC = function (value, $el)
{
    const ACCEPT_GENERIC = true,
          REGEXP_RFC = /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})?([A\d])?$/;

    $el.val(value = value.toUpperCase());
    let validated = value.match(REGEXP_RFC);

    if (!validated) return false;

    //Separar el dígito verificador del resto del RFC
    const digitoVerificador = validated.pop(),
          rfcSinDigito      = validated.slice(1).join(''),
          len               = rfcSinDigito.length,
          diccionario       = "0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ",
          indice            = len + 1;
    let   suma;
    /*,
          digitoEsperado;
*/
    if (!digitoVerificador && ACCEPT_GENERIC && len === 10)
    {
        return value === rfcSinDigito;
    }

    if (len === 12) suma = 0;
    else suma = 481; //Ajuste para persona moral

    for(let i=0; i<len; i++)
    {
        suma += diccionario.indexOf(rfcSinDigito.charAt(i)) * (indice - i);
    }

   /*digitoEsperado = 11 - suma % 11;

    if (digitoEsperado === 11) digitoEsperado = 0;
    else if (digitoEsperado === 10) digitoEsperado = "A";

    //El dígito verificador coincide con el esperado?
    // o es un RFC Genérico (ventas a público general)?
  /*  if ((digitoVerificador !== digitoEsperado.toString())
        && (!ACCEPT_GENERIC || ((rfcSinDigito + digitoVerificador) !== "XAXX010101000")))
    {
        return false;
    }
    else if (!ACCEPT_GENERIC && ((rfcSinDigito + digitoVerificador) === "XEXX010101000"))
    {
        return false;
    }
    */

    return (rfcSinDigito + digitoVerificador) === value;
};

/*
This function verifies:
- Position of characters
- Valid date
- Valid list of federative entities
- Separe last three (3) digits and test the verificator digit
- Original code: https://es.stackoverflow.com/questions/31039/c%c3%b3mo-validar-una-curp-de-m%c3%a9xico
* */
let validateCURP = function (curp, $el)
{
    var REGEXP_CURP = /^([A-Z][AEIOUX][A-Z]{2}\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])[HM](?:AS|B[CS]|C[CLMSH]|D[FG]|G[TR]|HG|JC|M[CNS]|N[ETL]|OC|PL|Q[TR]|S[PLR]|T[CSL]|VZ|YN|ZS)[B-DF-HJ-NP-TV-Z]{3}[A-Z\d])(\d)$/,
        validated = curp.match(REGEXP_CURP);

    if (!validated)  //Coincide con el formato general?
        return false;

    //Validar que coincida el dígito verificador
    function digitoVerificador(curp17) {
        //Fuente https://consultas.curp.gob.mx/CurpSP/
        var diccionario  = "0123456789ABCDEFGHIJKLMNÑOPQRSTUVWXYZ",
            lngSuma      = 0.0,
            lngDigito    = 0.0;
        for(var i=0; i<17; i++)
            lngSuma = lngSuma + diccionario.indexOf(curp17.charAt(i)) * (18 - i);
        lngDigito = 10 - lngSuma % 10;
        if (lngDigito == 10) return 0;
        return lngDigito;
    }

    if (validated[2] != digitoVerificador(validated[1]))
        return false;

    return true; //Validado
}


function validateForm(form) {

    let frm = jQuery(`#${form}`);

    if (frm.isValid()) {

        frm.trigger('submit');
    }
}

let isCopropiedad = function (id)
{
    let option = $(`#${id} option:selected`).text();

    return (option && (option.toLowerCase().indexOf('copropiedad') > -1));
}


function getRootWebSitePath()
{
    let _location = document.location.toString(),
        applicationNameIndex = _location.indexOf('/', _location.indexOf('://') + 3),
        applicationName = _location.substring(0, applicationNameIndex) + '/';

    return applicationName;
}
