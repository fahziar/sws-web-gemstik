/**
 * Created by henry on 27/10/2015.
 */

'use strict';

angular.module('myApp.history', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/history/:idtaman', {
            templateUrl: 'history/history.html',
            controller: 'HistoryCtrl'
        });
    }])

    .controller("HistoryCtrl", function($scope, $routeParams, $firebaseArray) {
        var id = $routeParams.idtaman;
        var ref = new Firebase('https://sws.firebaseio.com/gardens/' + id + '/log');

        $scope.idtaman = id;
        $scope.url = 'history/' + id;
        $scope.histories = $firebaseArray(ref);
    });