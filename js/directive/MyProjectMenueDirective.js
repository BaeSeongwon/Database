/**
 * Created by Life on 2016-12-09.
 */
angular.module('App').directive('myProjectMenue',function(){
    var linker = function(scope,element,attrs){

    }
    return {
        restrict : 'EA',
        templateUrl : 'template/project/MyProjectMenue.html',
        link : linker,
        scope : true
    }
})