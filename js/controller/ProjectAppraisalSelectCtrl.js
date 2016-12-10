/**
 * Created by Life on 2016-12-07.
 */
angular.module('App').controller('ProjectAppraisalSelectCtrl',function($scope,ProjectService){
    getProjectList();

    function getProjectList(){
        ProjectService.getProjectAppraisal()
            .then(function(data){
                $scope.projects = data;
            })
    }

    $scope.moveArraisal = function(project_co){
        window.location.href = 'http://localhost:3000/#/project-appraisal/' + project_co;
    };
});