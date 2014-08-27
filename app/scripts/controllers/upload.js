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

            FileReader.readAsText($scope.file, $scope)
                .then(function(result) {
                    DataService.scene(
                        {data: JSON.parse(result),
                         src: 'data/'+$scope.file.name.split('.')[0] + '.scn'
                        });
                });

        };

//       $scope.$on("fileProgress", function(e, progress) {
//           $scope.progress = progress.loaded / progress.total;
//       });

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

