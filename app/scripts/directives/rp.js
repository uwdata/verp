'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:rp
 * @description
 * # rp  -- recurrence plot directive
 */
angular.module('verpApp')
    .directive('rp',['$rootScope', 'DataService', 'EventService', function( $rootScope, DataService, EventService) {

        var postLink = function(scope, element, attrs) {

            var w = +attrs.width,
                h = +attrs.height,
                rp, rqa;

            function init() {

                if(!scope.data.x) return;

                var eps = scope.data.eps;

                rp = rep.crp()
                    .width(w)
                    .height(h)
                    .distfn(eps.distfn)
                    .eps(eps.value);


                d3.select(element[0])
                    .call(rp, scope.data);

                rqa = rp.rqa();
                $rootScope.$broadcast('rqa.update', rqa);

                DataService.service('rpEpsNet', rp.epsnet);
                DataService.service('rpDistanceMatrix', rp.distanceMatrix);

            }


            //function update(e, scene) {
            //
            //    if(!scope.data) return;
            //
            //
            //    var dom = scope.domain();
            //
            //    x.domain(dom.dx).range([0, w]);
            //    y.domain(dom.dy).range([0, h]);
            //
            //
            //    dpath.xScale(x).yScale(y).update(toarrow(scope.data));
            //
            //        //init();
            //        //rp(dd, element[0]);
            //        //DataService.service('rpEpsNet', rp.epsnet);
            //        //DataService.service('rpDistanceMatrix', rp.distanceMatrix);
            //
            //    //}else{
            //
            //        rp.data(dd).update();
            //
            //    //}
            //}


            function brush(e,d){

                if(rp) {

                    if ( d )
                        EventService.broadcastRPSelection(rp.boxHighlight(d));
                    else
                        EventService.broadcastRPSelection(rp.resetHighlight());

                }

            }

            function patternHighlight(e, d){

                if(rqa) {

                    var p;

                    if ( d === 'horizontal')
                        p = rqa.hl;
                    else if ( d === 'vertical')
                        p =  rqa.vl;
                    else if ( d === 'diagonal')
                        p = rqa.dl;
                    else
                        console.warn('Unknown pattern: ' + d);

                    if(!p) return;

                    EventService.broadcastRPSelection(rp.patternHighlight(p));

                }

            }


            function  highlight(e, d){

                if(rp) rp.highlight(d);

            }


            function  updateScale(e, d){

                if(rp) rp.scale(d).update();

            }



            function updateRQA(){

                rqa = rp.rqa();
                $rootScope.$broadcast('rqa.update', rqa);


            }


            function  updateEps(e,d) {


                if (rp) {

                    rp.eps(d.eps).update();

                    updateRQA();


                    if (d.filtering === true) {
                        d.epsNet = rp.epsnet;
                        $rootScope.$broadcast('rp.epsFilter.update', d);

                    }

                }
            }

            function  updateDistfn(e,d){

                if(rp) {
                    rp.distfn(d).update();
                    updateRQA();
                }

            }

            scope.$on('domain.ready', init);
            scope.$on('view.zoom', updateScale);
            scope.$on('view.brush', brush);
            scope.$on('distfn.update', updateDistfn);
            scope.$on('eps.update', updateEps);
            scope.$on('sp.selection', highlight);
            scope.$on('pattern.search', patternHighlight);

        };


        return {
            template:'<div></div>',
            restrict:'E',
            priority: 1,
            scope: {
                data: '=data'
            },
            replace: true,
            link: postLink
        }


    }]);
