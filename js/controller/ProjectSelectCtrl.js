/**
 * Created by Life on 2016-12-07.
 */
angular.module('App').controller('ProjectSelectCtrl',function ($scope,ProjectService) {

    getProject();

    function getProject(){
        ProjectService.getProject()
            .then(function(data){
                console.log(data);
                $scope.projects = data.search;
                $scope.projectCount = data.count;
            });
    };

    $scope.moveDetail = function(project_co){
        window.location.href = "http://localhost:3000/#/project-detail/" + project_co;
    }
});