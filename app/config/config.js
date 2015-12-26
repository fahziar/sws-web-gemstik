/**
 * Created by henry on 26/10/2015.
 */

'use strict';

angular.module('myApp.config', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/config/:idtaman', {
            templateUrl: 'config/config.html',
            controller: 'ConfigCtrl'
        });
    }])

    .controller("ConfigCtrl", function($scope, $routeParams, $firebaseArray) {
        var id = $routeParams.idtaman;
        var ref = new Firebase('https://sws.firebaseio.com/gardens/' + id + '/galileos');

        $scope.idtaman = id;
        $scope.galileos = $firebaseArray(ref);
        $scope.changeStatus = function(id, sensorid) {
            var galileo = $scope.galileos[id - 1];
            galileo.sensors[sensorid].enabled = !galileo.sensors[sensorid].enabled;
            $scope.galileos.$save(galileo);
        };
        $scope.changeStatus2 = function(id, valveid) {
            var galileo = $scope.galileos[id - 1];
            galileo.valves[valveid].enabled = !galileo.valves[valveid].enabled;
            $scope.galileos.$save(galileo);
        };
    });