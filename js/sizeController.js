var SizeController = function (params) {
    'use strict';
    
    // checking mandatory params
    
    ['startValue', 'stepSize', 'minus', 'plus', 'changeFn'].forEach(function (param) {
        if (params[param] === undefined) {
            throw new TypeError('No ' + [param] + ' in params');
        }
    });
    
    // private variables
    
    var value = null;

    // private functions
    
    function setValue(newValue, changeFn) {
        var numberValue = Number(newValue);

        if (!isNaN(numberValue)) {
            if (params.min !== undefined && numberValue < params.min) {
                value = params.min;
            } else if (params.max && numberValue > params.max) {
                value = params.max;
            } else {
                value = numberValue;
            }
            
            if (changeFn) {
                changeFn(value);
            }
        }
        
        if (params.input) {
            params.input.value = value;
        }
    }
    
    // listeners

    params.minus.addEventListener("click", function () {
        setValue(value - params.stepSize, params.changeFn);
    }, false);

    params.plus.addEventListener("click", function () {
        setValue(value + params.stepSize, params.changeFn);
    }, false);


    if (params.input) {
        params.input.addEventListener('change', function () {
            setValue(params.input.value, params.changeFn);
        }, false);
    }
    
    // public functions

    this.changeValueQuietly = setValue;
    
    // setup
    
    setValue(params.startValue);
};