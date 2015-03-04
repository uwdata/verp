'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('UploadCtrl', function ($scope, Parser, FileReader, DataService) {


        $scope.getImg = function () {

            FileReader.readAsDataURL($scope.imgFile, $scope)
                .then(function(result) {
                    DataService.img(result);
                });

        };

        $scope.getFile = function () {

            FileReader.readAsText($scope.file, $scope)
                .then(function(result) {

                    var t = $scope.file.name.split('.');

                    if(t[t.length - 1] === 'json')
                        DataService.tracking(Parser.VERP(result));

                     else if(t[t.length-1] === 'idf')
                        DataService.tracking(Parser.IDF(result));

                     else
                        console.error('Unknown tracking file format!');

                });

        };

    }).directive('fileSelect', function(){

        return {
            link: function(scope,el){

                el.bind("change", function(e){
                    scope.file = (e.srcElement || e.target).files[0];
                    scope.getFile();
                });

            }
        };


    }).directive('imgSelect', function(){

        return {
            link: function(scope,el){

                el.bind("change", function(e){
                    scope.imgFile = (e.srcElement || e.target).files[0];
                    if(scope.imgFile) scope.getImg();
                });

            }
        };

    });

