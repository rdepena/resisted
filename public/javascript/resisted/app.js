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
            tolerance : 1,
            textColor : 'white'
        }, {
            name : 'brown',
            value : 1,
            multiplier : 10,
            hex : '#55460d',
            tolerance : 2,
            textColor : 'white'
        }, {
            name : 'red',
            value : 2,
            multiplier : 100,
            hex : '#da1337',
            textColor : 'black'
        }, {
            name : 'orange',
            value : 3,
            multiplier : 1000,
            hex : '#d28f35',
            textColor : 'black'
        }, {
            name : 'yellow',
            value : 4,
            multiplier : 10000,
            hex : '#ffff00',
            textColor : 'black'
        }, {
            name : 'green',
            value : 5,
            multiplier : 100000,
            hex : '#00aa33',
            textColor : 'black'
        }, {
            name : 'blue',
            value : 6,
            multiplier : 1000000,
            hex : '#00007f',
            textColor : 'white'
        }, {
            name : 'violet',
            value : 7,
            hex : '#8e4e8e',
            textColor : 'black'
        }, {
            name : 'grey',
            value : 8,
            hex : '#808080',
            textColor : 'black'
        }, {
            name : 'white',
            value : 9,
            hex : '#ffffff',
            textColor : 'black'
        }, {
            name : 'gold',
            multiplier : 0.1,
            hex : '#ffd700',
            tolerance : 5,
            textColor : 'black'
        }, {
            name : 'silver',
            multiplier : 0.01,
            hex : '#d9d9d9',
            tolerance : 10,
            textColor : 'black'
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
        model.availableColors = colorValues;
        model.cheatSheet = false;

        $scope.model = model;

        $scope.toggleCheatSheet = function () {
            model.cheatSheet = !model.cheatSheet;
        };
        
        $scope.answer = function () {

            model.isCorrect = resistor.resistance == model.resistance;
            if(model.isCorrect) {
                model.score += 100;
            } else {
                model.score -= 100;
            }

            model.previousAnswerCorrected = resistor.resistance; 
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