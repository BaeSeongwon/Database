/**
 * Created by Life on 2016-12-06.
 */
angular.module('App').directive('identity',function(){
    var linker = function(scope,element,attrs){

    };
    return{
        restrict : "EA",
        templateUrl : "template/popup/identity.html",
        link : linker,
        scope : true
    }
});