'use strict';

/**
 * @ngdoc function
 * @name verpApp.controller:UploadCtrl
 * @description
 * # UploadCtrl
 * Controller of the verpApp
 */
angular.module('verpApp')
    .controller('UploadCtrl', ['$scope', '$rootScope', '$timeout', 'Parser', 'FileReader', 'DataService',
        function ($scope, $rootScope, $timeout, Parser, FileReader, DataService) {


       $scope.patternSearch = {show:false, placeholder:"search motifs"};


        $scope.resetPatternSearch = function(){

            $scope.patternSearch.show=false;
            $scope.patternSearch.placeholder = "search motifs";

        };


        $scope.patternHighlight = function(type){

            $scope.patternSearch.placeholder='search ' + type + ' ...';

            $rootScope.$broadcast('pattern.search', type);

            $timeout($scope.resetPatternSearch, 500);

        };


       $scope.togglePatternSearch = function(searchBox){

           $scope.patternSearch.show = ! $scope.patternSearch.show;

           var sb = searchBox;

           $scope.patternSearch.top = ~~( sb.offsetTop + (3 / 4) * sb.offsetHeight );
           $scope.patternSearch.left = ~~( searchBox.offsetLeft + (1 / 8) * sb.offsetWidth );

        };


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


                    $scope.time = DataService.tracking().time;
                    if($scope.time)
                        $scope.duration = 0.000001*($scope.time[$scope.time.length-1] - $scope.time[0]);

                });



        };

    }]).directive('fileSelect', function(){

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

