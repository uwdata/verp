'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:sp
 * @description
 * # sp creates a scatter plot
 */
angular.module('verpApp')
    .directive('sp',function(DataService) {

        var postLink = function(scope, element, attrs) {
            var w = attrs.width,
                h = attrs.height,
                sp = null;


            function filter(e, d){

                if(sp === null) return;

                var  indx = d.epsNet, f = d.epsFiltering, cond;

                if(f)
                    cond = function(indx, i){return !(indx[i] === 1);};
                else
                    cond = function(){return false;};

                sp.ghost(indx, cond);

            }

            function hide(e,d){
                var indx = d.currentTime,
                    cond = function(indx, i){return i>indx;};
                if(sp!==null) sp.hide(indx, cond);
            }

            function cond(e,d,x,y){
                return !(e[0][0] > d[x] || d[x] > e[1][0]
                    || e[0][1] > d[y] || d[y] > e[1][1]);
            }

            function condHighlight(d){
                return (sp===null) ? null : sp.highlight(d, cond);
            }


            function highlight(e,d){
                if(sp) sp.highlight(d);
            }


            function update(e, d){

                var p = d.data.pos;

                if(sp === null) {

                    if(typeof(p.coordXform) !== 'undefined') p.coordXform(p);

                    sp = new Scatter(d.data.pos,
                        element[0],
                        {width: w,
                            height: h,
                            scale: {x: 0.5, y: 0.5},
                            k: {x:0, y:1}
                        });

                    DataService.service('spSelection', condHighlight);

                }else {
                    sp.update(p);
                }

            }


            scope.$on('scene.ready', update);
            scope.$on('rp.selection', highlight);
            scope.$on('player.time', hide);
            scope.$on('rp.epsfilter', filter);
            scope.$on('rp.eps', filter);

        };


        return {
            template: '<div id="tracking-sp" ng-show="showTracking"></div>',
            restrict: 'E',
            replace: true,
            link: postLink
        }


    });

