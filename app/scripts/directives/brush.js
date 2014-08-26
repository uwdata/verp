'use strict';

/**
 * @ngdoc directive
 * @name verpApp.directive:brush
 * @description
 * # brush
 */
angular.module('verpApp')
  .directive('brush', function (EventService) {

       var postLink = function postLink(scope, element, attrs) {


           function brushed(){
//               if(!brush.empty())
                   EventService['broadcast'+(attrs.id.toUpperCase())+'Brush'](brush.extent());
           }

           var w = attrs.width,
               h = attrs.height,

           sx = d3.scale.ordinal().range([0, w]),
               sy = d3.scale.ordinal().range([0, h]),
               brush = d3.svg.brush()
                   .x(sx)
                   .y(sy)
                   .on('brush', brushed),
               brushsvg = d3.select(element[0])
               .append('svg')
               .attr('width', w)
               .attr('height', h)
               .append('g')
               .attr("class", "rectbrush")
               .call(brush);

       };

    return {
      template: '<div></div>',
      restrict: 'E',
      replace:true,
      link: postLink
    };

  });
