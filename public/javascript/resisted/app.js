(function (){
    'use strict';
    //bootstrap the angular module.
    angular.module('resisted', ['ngRoute', 'resisted.controllers'])
    .config(function ($routeProvider) {
        $routeProvider.when('/', {
            controller : 'gameCtrl',
            templateUrl : 'templates/game.html'
        });
    })
    .constant('colorValues', [
        {
            name : 'black',
            value : 0,
            multiplier : 1,
            hex : '#191919',
            tolerance : 1
        }, {
            name : 'brown',
            value : 1,
            multiplier : 10,
            hex : '#55460d',
            tolerance : 2
        }, {
            name : 'red',
            value : 2,
            multiplier : 100,
            hex : '#da1337'
        }, {
            name : 'orange',
            value : 3,
            multiplier : 1000,
            hex : '#d28f35'
        }, {
            name : 'yellow',
            value : 4,
            multiplier : 10000,
            hex : '#ffff00'
        }, {
            name : 'green',
            value : 5,
            multiplier : 100000,
            hex : '#00aa33'
        }, {
            name : 'blue',
            value : 6,
            multiplier : 1000000,
            hex : '#00007f'
        }, {
            name : 'violet',
            value : 7,
            hex : '#8e4e8e'
        }, {
            name : 'grey',
            value : 8,
            hex : '#808080'
        }, {
            name : 'white',
            value : 9,
            hex : '#ffffff'
        }, {
            name : 'gold',
            multiplier : 0.1,
            hex : '#ffd700',
            tolerance : 5
        }, {
            name : 'silver',
            multiplier : 0.01,
            hex : '#d9d9d9',
            tolerance : 10
        }
    ]);
}());

(function (){
    'use strict';

    angular.module('resisted.controllers', ['resisted.service'])
    .controller('gameCtrl', function ($scope, colorValues, resistedGameService) {
        var model = {};
        var resistor = resistedGameService.generateResistor(colorValues);
        var score = 0;

        //assign model values
        model.colors = resistor.colors;
        model.score = score;

        $scope.model = model;
        
        $scope.answer = function () {

            if(resistor.resistance == model.resistance) {
                model.score += 100;
            } else {
                model.score -= 100;
            }

            //reset/set new values.
            model.resistance = "";
            resistor = resistedGameService.generateResistor(colorValues);
            model.colors = resistor.colors;
        };

    });

}());
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