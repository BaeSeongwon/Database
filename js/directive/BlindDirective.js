/**
 * Created by Life on 2016-12-05.
 */
angular.module('App').directive('blind',function(){
    var linker = function(scope,element,attrs){

    };
    return{
        restrict : "EA",
        templateUrl : "template/blind/blindTmpl.html",
        link : linker,
        scope : true
    }
});