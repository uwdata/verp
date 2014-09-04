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

        var coordXform = function(d){

       var  cw = 1680, ch = 1050,  w = d.domainWidth, h = d.domainHeight,
           tx = -(cw -w)*0.5, ty = -(ch-h)*0.5, i;

       for (i = 0; i < d.length; i++){
          if(!(Math.abs(d[i][0]) < 0.001 && Math.abs(d[i][1]) < 0.001)) {
              d[i][0] += tx;
              d[i][1] += ty;
          }
       }

   };

        var parseIDF = function(txt){

            var indx = txt.indexOf('Time'),
                header = txt.substring(0,indx),
                rest = (txt.substring(indx+1)),
                indx2 = rest.indexOf('\n'),
                tracking = rest.substring(indx2+1).split('\n'),
                verp = {pos:[], value:[], time:[], frmid:[]},
                n = tracking.length, j = 0, i, row, p;

            verp.info = header;

            for (i=0; i < n; i++){

                row = tracking[i].split('\t');

                if(row.length  === 0 ||
                    row === 'undefined') continue;

                verp.frmid.push(0);
                verp.time.push(+row[0]);
                p = row.splice(3,2);
                p[0] = +p[0];
                p[1] = +p[1];
                verp.pos.push(p);
                verp.value
                    .push(verp.pos[j++]);

            }

            verp.pos = verp.pos.splice(0,verp.pos.length-1);

            verp.pos.coordXform =  coordXform;

            return verp;
        };

        $scope.getFile = function () {

            FileReader.readAsText($scope.file, $scope)
                .then(function(result) {

                    var t = $scope.file.name.split('.'),
                        src = t[0] + '.png' ;

                    console.log($scope.file.name);
                    console.log($scope.file);

                    if(t[t.length - 1] === 'json')

                        DataService.scene(
                            {data: JSON.parse(result),
                                src: src
                            });

                    else if(t[t.length-1] === 'idf'){

                        DataService.scene(
                            {data: parseIDF(result),
                                src: src
                            });
                    }

                });

        };


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

