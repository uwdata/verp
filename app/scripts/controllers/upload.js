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


        var parseIDF = function(txt){

            var indx = txt.indexOf('Time'),
                header = txt.substring(0,indx),
                rest = (txt.substring(indx+1)),
                indx2 = rest.indexOf('\n'),
                tracking = rest.substring(indx2+1).split('\n'),
                verp = {pos:[], value:[], time:[], frmid:[]},
                n = tracking.length, i, row;

            verp.info = header;

            for (i=0; i < n; i++){
                row = tracking[i].split('\t');
                verp.frmid.push(0);
                verp.time.push(+row[0]);
                verp.pos.push(row.splice(3,4).map(function(d){return +d;}));
                verp.value.push(verp.pos[i]);
            }

            console.log(verp)

        };

        $scope.getFile = function () {

            FileReader.readAsText($scope.file, $scope)
                .then(function(result) {

                    parseIDF(result);

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

