'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:sp
 * @description
 * # sp creates a scatter plot
 */
angular.module('verpApp')
    .directive('sp',['EventService', function(EventService) {

        var postLink = function(scope, element, attrs) {
            var w = attrs.width,
                h = attrs.height,
                sp = null;

            function markerSize(s) {

                if(sp === null) return;
                if(!arguments.length) return sp.markerSize();

                sp.markerSize(s);
            }



            function filter(e, d){

                if(sp === null) return;

                var indx = d.epsNet(), f = d.epsFiltering, cond;

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



            function inKeyRange(d, i, r){

                var r = inKeyRange.data;

                return !(i < r[0] || i >= r[1]);

            }

            function inExtent(d, i){

                var x = 0, y = 1, e = inExtent.data;

                return !(e[0][0] > d[x] || d[x] > e[1][0]
                || e[0][1] > d[y] || d[y] > e[1][1]);

            }



            function condHighlight(d, cond){

                if(!d) {

                    return sp.resetHighlight();

                } else {

                    cond.data = d;
                    return sp.condHighlight(cond);

                }

            }

            function highlight(e, d){
                if(sp) sp.highlight(d);
            }

            function brush(e, d){
                if(sp) EventService.broadcastSPSelection(condHighlight(d, inExtent));
            }


            function updateScale(e, d){
                if(sp) sp.updateAxes(d.xs, d.ys);
            }



            function update(e, d) {

                var p = d.data.pos;

                if(sp === null) {

                    sp = new Scatter(d.data.pos,
                        element[0],
                        {   width: w,
                            height: h,
                            scale: {x:0.5, y:0.5},
                            k: {x:0, y:1}
                        });

                } else {

                    sp.update(p);

                }

            }




            scope.$on('update.visibility', function(){
                if(scope.visibility && sp)  sp.visibility(scope.visibility);
            });

            scope.$on('scene.ready', update);
            scope.$on('view.zoom', updateScale);
            scope.$on('view.brush', brush);

            scope.$on('rp.selection', highlight);
            scope.$on('rp.epsFilter.update', filter);
            scope.$on('player.time', hide);



            scope.$watch('sp.selection', function(selection){
                //if(selection) condHighlight(selection, inKeyRange);
                if(sp) EventService.broadcastSPSelection(condHighlight(selection, inKeyRange));

            });


            ////TODO refactor this
            //scope.$on('saccade.update', function(e, d){
            //    if(sp) sp.hide(d.indx, function(indx,i){return indx[i];});
            //});

            scope.$watch('sp.markerSize', function(val) {
                markerSize(val);
            });


        };

        return {
            template: '<div id="tracking-sp" ng-show="showTracking"></div>',
            restrict: 'E',
            replace: true,
            link: postLink
        }

    }]);

