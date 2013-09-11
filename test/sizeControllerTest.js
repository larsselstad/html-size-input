/*global describe, it, expect, SizeController, document, spyOn, jasmine, beforeEach, window, console*/
/*jslint nomen: true */

(function () {
    'use strict';

    function id(name) {
        document.getElementById(name);
    }

    describe("Constructer should throw error if ... ", function () {

        it("startValue is missing", function () {
            expect(function () {
                var sc = new SizeController({
                    //startValue: 5,
                    stepSize: 1,
                    min: 0,
                    max: 140,
                    input: document.createElement('input'),
                    minus: document.createElement('button'),
                    plus: document.createElement('button'),
                    changeFn: function (value) {
                        return value + 1;
                    }
                });
            }).toThrow(new TypeError('No startValue in params'));
        });

        it("sizeStep is missing", function () {
            expect(function () {
                var sc = new SizeController({
                    startValue: 5,
                    //stepSize: 1,
                    min: 0,
                    max: 140,
                    input: document.createElement('input'),
                    minus: document.createElement('button'),
                    plus: document.createElement('button'),
                    changeFn: function (value) {
                        return value + 1;
                    }
                });
            }).toThrow(new TypeError('No stepSize in params'));
        });

        it("sizeStep is minus", function () {
            expect(function () {
                var sc = new SizeController({
                    startValue: 5,
                    stepSize: 1,
                    min: 0,
                    max: 140,
                    input: document.createElement('input'),
                    //minus: document.createElement('button'),
                    plus: document.createElement('button'),
                    changeFn: function (value) {
                        return value + 1;
                    }
                });
            }).toThrow(new TypeError('No minus in params'));
        });

        it("sizeStep is plus", function () {
            expect(function () {
                var sc = new SizeController({
                    startValue: 5,
                    stepSize: 1,
                    min: 0,
                    max: 140,
                    input: document.createElement('input'),
                    minus: document.createElement('button'),
                    //plus: document.createElement('button'),
                    changeFn: function (value) {
                        return value + 1;
                    }
                });
            }).toThrow(new TypeError('No plus in params'));
        });

        it("changeFn is plus", function () {
            expect(function () {
                var sc = new SizeController({
                    startValue: 5,
                    stepSize: 1,
                    min: 0,
                    max: 140,
                    input: document.createElement('input'),
                    minus: document.createElement('button'),
                    plus: document.createElement('button')
                    //changeFn: function (value) { return value + 1; }
                });
            }).toThrow(new TypeError('No changeFn in params'));
        });
    });

    describe("Set value on size controller ... ", function () {
        var startValue = 5,
            stepSize = 1,
            changeFn,
            minusButton,
            plusButton,
            input,
            sc;

        beforeEach(function () {
            document.body.innerHTML = window.__html__['test/fixture.html'];

            minusButton = document.getElementById('minus');
            plusButton = document.getElementById('plus');
            input = document.getElementById('input');

            changeFn = jasmine.createSpy('changeFn');

            sc = new SizeController({
                startValue: startValue,
                stepSize: stepSize,
                min: 0,
                max: 140,
                input: input,
                minus: minusButton,
                plus: plusButton,
                changeFn: changeFn
            });
        });
        
        function createChangeEvent() {
            var changeEvent = document.createEvent('Event');
            changeEvent.initEvent('change', true, true);
            
            return changeEvent;
        }

        it('should expose the templates to __html__', function () {
            expect(document.getElementById('minus')).toBeDefined();
            expect(document.getElementById('plus')).toBeDefined();
            expect(document.getElementById('input')).toBeDefined();
        });

        it('minus button clicked', function () {
            minusButton.click();

            expect(changeFn).toHaveBeenCalledWith(startValue - stepSize);
        });

        it('plus button clicked', function () {
            plusButton.click();

            expect(changeFn).toHaveBeenCalledWith(startValue + stepSize);
        });

        it('input change should set input to input value if its equal or between min and max', function () {
            input.value = '40';

            input.dispatchEvent(createChangeEvent());

            expect(changeFn).toHaveBeenCalledWith(40);
        });

        it('input over max is set back to max', function () {
            input.value = '141';

            input.dispatchEvent(createChangeEvent());

            expect(changeFn).toHaveBeenCalledWith(140);
            expect(input.value).toEqual('140');
        });

        it('input over min is set back to min', function () {
            input.value = '-1';

            input.dispatchEvent(createChangeEvent());

            expect(changeFn).toHaveBeenCalledWith(0);
            expect(input.value).toEqual('0');
        });
        
        it('value passed to change value most by equal or between min and max', function () {
            sc.changeValueQuietly(-1);
            
            expect(input.value).toEqual('0');
            
            expect(changeFn).not.toHaveBeenCalled();
        });

    });
}());