/**
 * Created by henry on 26/10/2015.
 */

'use strict';

angular.module('myApp.rule', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/rule/:idtaman', {
            templateUrl: 'rule/rule.html',
            controller: 'RuleCtrl'
        });
    }])

    .controller("RuleCtrl", function($scope, $routeParams, $firebaseArray) {
        var id = $routeParams.idtaman;
        var ref = new Firebase('https://sws.firebaseio.com/gardens/' + id + '/galileos');

        $scope.idtaman = id;
        $scope.galileos = $firebaseArray(ref);
        $scope.changeMethod = function(id) {
            var galileo = $scope.galileos[id];
            if(galileo.mode == 'threshold') {
                galileo.mode = 'learning';
            }
            else if(galileo.mode == 'learning') {
                galileo.mode = 'manual';
            }
            else {
                galileo.mode = 'threshold';
            }
            $scope.galileos.$save(galileo);
        };
    });