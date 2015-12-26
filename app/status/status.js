/**
 * Created by henry on 25/10/2015.
 */

'use strict';

angular.module('myApp.status', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/status/:idtaman', {
            templateUrl: 'status/status.html',
            controller: 'StatusCtrl'
        });
    }])

    .controller("StatusCtrl", function($scope, $routeParams, $firebaseArray) {
        var id = $routeParams.idtaman;
        var ref = new Firebase('https://sws.firebaseio.com/gardens/' + id + '/galileos');
        var ket = new Firebase('https://sws.firebaseio.com/gardens/');

        $scope.idtaman = id;
        $scope.url = 'status/' + id;
        $scope.galileos = $firebaseArray(ref);
        $scope.gardens = $firebaseArray(ket);
        $scope.forceOpen = function(id) {
            var galileo = $scope.galileos[id];
            galileo.command.forceopen = !galileo.command.forceopen;
            $scope.galileos.$save(galileo);
        };
    });