(function (){
    'use strict';

    angular.module('resisted.service', [])
    .factory('resistedGameService', function () {

        var my = {};

        var getRandomInt = function (min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        };

        var getRandomColor = function (colors) {
            return colors[getRandomInt(0, colors.length -1)];
        };

        var calculateResistance = function (colors) {
            //we obtain the first two digits.
            var firstDigits = "" +  colors[0].value +  colors[1].value;

            //then we apply the multipliyer:
            var resistance = parseInt(firstDigits, 10) * colors[2].multiplier;
            return Math.round(resistance * 100) / 100;
        };

        my.generateResistor = function (colors) {
            var randomResistorColors = [];
            var i;
            var assignedColor;
            
            //only take those colors that have value.
            var valueColors = colors.filter(function (color) {
                return (color.value);
            });

            //only take colors with a valid multipliyer
            var multiplierColors = colors.filter(function (color) {
                return (color.multiplier);
            });

            //generate the resistor.
            for(i = 0; i < 3; i++){
                if (i < 2) {
                    randomResistorColors.push(getRandomColor(valueColors));
                } else {
                    randomResistorColors.push(getRandomColor(multiplierColors));
                } 
                
            }
            var resistor = {
                colors : randomResistorColors,
                resistance : calculateResistance(randomResistorColors) 
            };
            return resistor;
        };

        return my;
    });

}());