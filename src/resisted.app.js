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
