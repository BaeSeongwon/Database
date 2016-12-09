/**
 * Created by Life on 2016-12-06.
 */
angular.module('App').directive('planfile',function(Upload){
    var linker = function(scope,element,attrs){
        scope.cancel = function(){
            element.remove();
            $('blind').remove();
        }

        scope.addPlanFile = function(){
            console.log(scope.planfile);
            planfile = scope.planfile;
            element.remove();
            $('blind').remove();
        }

        scope.onFileSelect = function($files){
            console.log($files);
        }
    }
    return{
        restrict : "EA",
        templateUrl : "template/popup/planfile.html",
        link : linker,
        scope : false
    }
})