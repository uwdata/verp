'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:rp
 * @description
 * # rp  -- recurrence plot directive
 */
angular.module('verpApp')
    .directive('rp',function($rootScope, DataService) {

        var postLink = function(scope, element, attrs) {

            var w = attrs.width,
                h = attrs.height,
                rp = null;

           function  init(){
               rp = rep.crp()
                    .width(w)
                    .height(h)
                    .distfn(scope.distfn)
                    .eps(scope.eps);
           }

            function update(e,scene) {

              var dd= {x: scene.data.value, y: scene.data.value};


              if(rp === null) {
                  init();
                  rp(dd, element[0]);
                  DataService.service('rpSelection', rp.activeDomain);
                  DataService.service('rpEpsNet', rp.epsnet)

              }else{
                  rp.data(dd).update();
              }
            }

            function  highlight(e,d){
                if(rp) rp.highlight(d);
            }

            function  updateRange(e,d){
              if(rp) rp.range(d).update();
            }

            function  updateEps(n,o){
              n = parseInt(n,10);
              if(rp) rp.eps(n).update();
            }

            function  updateDistfn(n,o){
              if(rp) rp.distfn(n).update();
            }

            scope.$on('scene.ready', update);
            scope.$on('sp.selection', highlight);
            scope.$on('range.update', updateRange);
//            scope.$on('rp.eps', updateEps);
            scope.$watch('eps', updateEps);
            scope.$watch('distfn', updateDistfn);

        };

        return {
            template: '<div></div>',
            restrict: 'E',
            replace: true,
            link: postLink
        }
    });
