/**
 * Created by Life on 2016-12-09.
 */
angular.module('App').controller('MyProjectCtrl',function($scope,ProjectService){
    $scope.getMyProject = function(){
        ProjectService.getMyProject()
            .then(function(data){
                console.log(data);
            });
    };

    $scope.getCandidateProject = function(){

    };

    $scope.getProgressProject = function(){

    };

    $scope.getAppraisalProject = function(){

    };

    $scope.getCompleteProject = function(){

    };
});