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
            hex : '#990000',
            textColor : 'black'
        }, {
            name : 'orange',
            value : 3,
            multiplier : 1000,
            hex : '#b27300',
            textColor : 'black'
        }, {
            name : 'yellow',
            value : 4,
            multiplier : 10000,
            hex : '#cccc00',
            textColor : 'black'
        }, {
            name : 'green',
            value : 5,
            multiplier : 100000,
            hex : '#80c080',
            textColor : 'black'
        }, {
            name : 'blue',
            value : 6,
            multiplier : 1000000,
            hex : '#007fff',
            textColor : 'white'
        }, {
            name : 'violet',
            value : 7,
            hex : '#b882ed',
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
