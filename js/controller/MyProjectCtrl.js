/**
 * Created by Life on 2016-12-09.
 */
angular.module('App').controller('MyProjectCtrl',function($scope,ProjectService,UserService){
    $scope.applicant = null;
    $scope.getMyProject = function(){
        console.log("실행");
        ProjectService.getMyProject()
            .then(function(data){
                $scope.projects = data;
            });
    };

    $scope.getCandidateProject = function(data){
        $scope.applicant = data;
        ProjectService.getApplicantProject()
            .then(function(data){
                $scope.projects = data;
            });
    };

    $scope.getProgressProject = function(){
        ProjectService.getProgressProject()
            .then(function(data){
                $scope.projects = data;
            });
    };

    $scope.getAppraisalProject = function(){
        window.location.href = 'http://localhost:3000/#/project-appraisal-select';
    };

    $scope.getCompleteProject = function(){
        ProjectService.getCompleteProject()
            .then(function(data){
                console.log(data);
            })
    };
    
    $scope.moveDetail = function(param){
        if($scope.applicant != null){
            console.log("지원자");
            $scope.applicant = null;
            window.location.href = 'http://localhost:3000/#/my-page-applicant/' + param;
        }else{
            window.location.href = "http://localhost:3000/#/project-detail/" + param;
        }
    }
    
    $scope.getApplicantPartner = function(param){
        window.location.href = 'http://localhost:3000/#/my-page-applicant/' + param;
    }
});