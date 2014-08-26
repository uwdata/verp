'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('UploadCtrl', function ($scope, FileReader, DataService) {
        $scope.getFile = function () {
            var scene = {};

            FileReader.readAsText($scope.file, $scope)
                .then(function(result) {
                    DataService.eyeTracking(JSON.parse(result));
                });

           scene.src = 'data/'+$scope.file.name.split('.')[0] + '.scn';

            DataService.sceneSrc(scene.src);
        };
//        $scope.$on("fileProgress", function(e, progress) {
//            $scope.progress = progress.loaded / progress.total;
//        });

    }).directive('fileSelect', function(){

        return {
            link: function(scope,el){

                el.bind("change", function(e){

                    scope.file = (e.srcElement || e.target).files[0];
                    scope.currentFrame = document.getElementById('current-frame');
                    scope.getFile();
                });

            }
        }
    });

