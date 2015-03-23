'use strict';

/**
 * @ngdoc service
 * @name verpApp.FileReader
 * @description
 * # FileReader
 * Factory in the verpApp.
 */
angular.module('verpApp')
  .factory('FileReader', ['$q', function ($q){

      var onLoad = function(reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };

        var onError = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };


        var getReader = function(deferred, scope) {
            var reader = new FileReader();
            reader.onload = onLoad(reader, deferred, scope);
            reader.onerror = onError(reader, deferred, scope);
            return reader;
        };

         var readAsText= function (file, scope) {
            var deferred = $q.defer();

            var reader = getReader(deferred, scope);
            reader.readAsText(file);

            return deferred.promise;
        };

        var readAsDataURL = function (file, scope) {

            var deferred = $q.defer(),
                reader = getReader(deferred, scope);

            reader.readAsDataURL(file);

            return deferred.promise;
        };

        return {
            readAsDataURL: readAsDataURL,
            readAsText: readAsText
        };

    }]);
