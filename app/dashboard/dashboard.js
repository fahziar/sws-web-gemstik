/**
 * Created by henry on 25/10/2015.
 */

'use strict';

angular.module('myApp.dashboard', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/dashboard', {
            templateUrl: 'dashboard/dashboard.html',
            controller: 'DashboardCtrl'
        });
    }])

    .controller("DashboardCtrl", function($scope, $firebaseArray, $location) {
        var ref = new Firebase('https://sws.firebaseio.com/gardens');
        var bounds = new google.maps.LatLngBounds();

        function initMap() {
            $scope.map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 0, lng: 0},
                zoom: 8,
                mapTypeControl: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            });

            setMarkers();
            $scope.map.fitBounds(bounds);
        }

        function setMarkers() {
            $scope.infoWindows = [];
            var temp = 0;
            for(var i in $scope.gardens){
                if($scope.gardens[i].name && $scope.gardens[i].lat && $scope.gardens[i].long){
                    //creating marker
                    var gardenStatus = checkGardenStatus($scope.gardens[i].galileos);
                    var icon = {
                        url: gardenStatus.url,
                        size: new google.maps.Size(50, 71),
                        origin: new google.maps.Point(0, 0),
                        anchor: new google.maps.Point(17, 34),
                        scaledSize: new google.maps.Size(20, 35)
                    };

                    var marker = new google.maps.Marker({
                        position:{
                            lat: $scope.gardens[i].lat,
                            lng: $scope.gardens[i].long
                        },
                        icon: icon,
                        map: $scope.map,
                        title: $scope.gardens[i].name
                    });

                    bounds.extend(marker.position);

                    var url = "status/" + $scope.gardens[i].id;
                    var infowindow = new google.maps.InfoWindow();
                    var contentString = '<div><strong>' + $scope.gardens[i].name + '</strong></div>'
                        + '<div>Address: ' + $scope.gardens[i].address + '<div>'
                        + '<div>Status: ' + gardenStatus.status + '<div>';

                    bindInfoWindow(marker, $scope.map, infowindow, contentString, url)

                    temp++;
                }
            }
        }

        function bindInfoWindow(marker, map, infowindow, description, url) {
            google.maps.event.addListener(marker, 'click', function() {
                $location.path(url);
                $scope.$apply();
            });

            google.maps.event.addListener(marker, 'mouseover', function() {
                infowindow.setContent(description);
                infowindow.open(map, marker);
            });

            google.maps.event.addListener(marker, 'mouseout', function() {
                infowindow.setContent(description);
                infowindow.close(map, marker);
            });
        }

        function checkGardenStatus(garden) {
            var data = {
                url: 'assets/img/standby.png',
                status: 'Stand By'
            };
            for(var key in garden){
                for(var keyvalve in garden[key].valves){
                    if(garden[key].valves[keyvalve].opened){
                        data.url = 'assets/img/water.png';
                        data.status = 'Watering';
                    }
                }
                if(!garden[key].online){
                    data.url = 'assets/img/error.png';
                    data.status = 'Offline';
                    break;
                }
            }
            return data;
        }

        $scope.gardens = $firebaseArray(ref);
        $scope.gardens.$loaded()
            .then(function(x) {
                initMap();
            })
            .catch(function(error) {
                console.log("Error:", error);
            });

        $scope.gardens.$watch(function(){
            setMarkers();
        });
        $scope.addGardens = function(name, address, lat, long) {
            $scope.gardens.$add({

            });
        };
    });