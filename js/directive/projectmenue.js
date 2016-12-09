/**
 * Created by Life on 2016-12-07.
 */
angular.module('App').directive('projectMenue',function(){
    var linker = function(scope,element,attrs){

    }
    return{
        restrict : 'EA',
        templateUrl : 'template/project/projectMenue.html',
        link : linker,
        scope : false
    }
})