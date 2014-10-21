'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:alphapart
 * @description
 * # alpha
 */
angular.module('verpApp')
  .directive('alphapart', function () {

       var postLink = function(scope, element, attrs) {

        var w = +attrs.width,
            h = +attrs.height,
            ac;

        //creates the maximal complex once
        function alphaComplex(e, d){

	  console.log('creating the alpha complex');

          var v = d.data.pos,
               x = d3.scale.linear()
                .domain([0, v.domainWidth])
                .range([0, w]),
               y = d3.scale.linear()
                .domain([0, v.domainHeight])
                .range([0, h]);

	// if(v.coordXform) v.coordXform(v);
          
          ac = alpha(v).xScale(x).yScale(y);
          ac(element[0]);

        }

        //then extracts alpha complexes as needed
        function alphaUpdate(e,d){
            if(ac && d.partition) {
                ac.update(d.eps);
                scope.partition = true;
            }else{
                scope.partition = false;
            }

        }

         scope.$on('scene.ready', alphaComplex);
         scope.$on('rp.epsFilter.update', alphaUpdate);

       };

    return{
      template: '<div></div>',
      restrict: 'E',
      replace: true,
      link: postLink
    };

  });
