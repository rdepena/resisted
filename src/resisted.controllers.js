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