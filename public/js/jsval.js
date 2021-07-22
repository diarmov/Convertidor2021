"use strict";

let numberFormat = function(fld, e, type, max) { // field, event, type (float or integer), max value

    let key = (e.which) ? e.which : e.keynum,
        regCheck = (type === 'float')? /^[+-]?\d+(\.\d+)?$/: (/^[0-9]+$/),
        fldValue = fld.value + String.fromCharCode(key),
        idxDot = fldValue.indexOf('.'),
        lastPosition = fldValue.length - 1,
        numberOfDots = (fldValue.match(/\./g))? fldValue.match(/\./g).length:0;

    if ((fldValue.length > 1) && (idxDot === lastPosition) && (numberOfDots === 1)) {
        return true;
    }

    let isValid = regCheck.test(fldValue),
        number = null;

    if (max !== null)
    {

        try {

            number = parseFloat(fldValue);

            isValid = true;

        } catch (e) {
            isValid = false;
        }

    }

    return (max != null)? (number <= max) && isValid: isValid;
};
