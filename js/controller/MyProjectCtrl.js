/**
 * Created by Life on 2016-12-09.
 */
angular.module('App').controller('MyProjectCtrl',function($scope){
    $scope.getMyProject = function(){
        console.log("실행");
        ProjectService.getMyProject()
            .then(function(data){
                $scope.projects = data;
            });
    };

    $scope.getCandidateProject = function(){

    };

    $scope.getProgressProject = function(){

    };

    $scope.getAppraisalProject = function(){
        ProjectService.getProjectAppraisal()
            .then(function(data){
                console.log(data);
            });
    };

    $scope.getCompleteProject = function(){
        ProjectService.getCompleteProject()
            .then(function(data){
                console.log(data);
            })
    };
});