(function (){
    'use strict';

    angular.module('resisted.service', [])
    .factory('resistedGameService', function (colorValues) {
        var my = {};
        //only take those colors that have value.
        var valueColors = colorValues.filter(function (color) {
            return (color.value);
        });
        //only take colors with a valid multipliyer
        var multiplierColors = colorValues.filter(function (color) {
            return (color.multiplier);
        });

        var getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        var getRandomColor = function (colors) {
            return colors[getRandomInt(0, colors.length -1)];
        };

        var calculateResistance = function (colors) {
            var firstDigits = "";
            angular.forEach(colors, function (color, i) {
                //append the digits of the colors array, except the last color
                if(i === colors.length -1) {
                    return;
                }
                firstDigits = firstDigits + "" + color.value;
            });

            //take the last color's multiplier.
            var resistance = parseInt(firstDigits, 10) * colors[colors.length -1].multiplier;
            return Math.round(resistance * 100) / 100;
        };

        my.generateResistor = function () {
            var randomResistorColors = [];
            //get the resistor stripe count.
            var stripeCount = getRandomInt(3,4);

            //generate the resistor.
            for(var i = 0; i < stripeCount; i++){
                if (i < stripeCount -1) {
                    randomResistorColors.push(getRandomColor(valueColors));
                } else {
                    randomResistorColors.push(getRandomColor(multiplierColors));
                }
            }

            return {
                colors : randomResistorColors,
                resistance : calculateResistance(randomResistorColors)
            };
        };

        return my;
    });
}());