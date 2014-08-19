'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
  .controller('UploadCtrl', function ($scope, FileReader) {


        $scope.getFile = function () {
            $scope.progress = 0;
            FileReader.readAsText($scope.file, $scope)
                .then(function(result) {
                    console.log(result);
                    $scope.eye= JSON.parse(result);

                });

                 $scope.currentFrame.src = 'data/'+$scope.file.name.split('.')[0] + '.scn' + '/frm-0.png';

        };

        $scope.$on("fileProgress", function(e, progress) {
            $scope.progress = progress.loaded / progress.total;
        });

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

