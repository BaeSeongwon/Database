/**
 * Created by Parksubin on 2016-12-09.
 */

angular.module('App').controller('ApplicantProjectCtrl',function($scope,$routeParams,UserService,$timeout,ProjectService){
    getApplicant($routeParams.code);
    function getApplicant(param){
        UserService.getApplicantPartner(param)
            .then(function(data){
                console.log(data);
                $scope.data = data;
                $scope.project = data.detail[0];
            })
    };

    $timeout(function(){
        $('.adopt').bootstrapToggle();
        $('.adopt').change(function(){
            if($(this).prop('checked') == true){
                var param = {
                    project_co : $scope.data.detail[0].project_co,
                    partner_id : $(this).val()
                };
                UserService.updateAdopt(param)
                    .then(function(data){
                        console.log(data);
                    });
            }else{
                var param = {
                    project_co : $scope.data.detail[0].project_co,
                    partner_id : $(this).val()
                };
                UserService.cancelAdopt(param)
                    .then(function(data){
                        console.log(data);
                    });
            }
        });
    },1000);

    $scope.complete = function(param){
        ProjectService.updateCompleteProject(param)
            .then(function(data){
                window.location.href = 'http://localhost:3000/';
            });
    };
});