/**
 * Created by Life on 2016-12-08.
 */
angular.module('App').directive('appraisalPartnerList',function(){
    var linker = function(scope,element,attrs){

    };
    return{
        restrict : "EA",
        templateUrl : 'template/project/partnerlist.html',
        link : linker,
        scope : false
    };
});