/**
 * Created by Life on 2016-12-08.
 */
angular.module('App').controller('ProjectAppraisalCtrl',function($scope,$routeParams,UserService){
    $('#input-4').rating({displayOnly : true});
    $('#profession').rating();
    $('#satisfaction').rating();
    $('#comunication').rating();
    $('#schedule').rating();
    $('#initiative').rating();

    $scope.$watch('proNumber',function(nv,ov){
        $('#profession').rating('update', nv);
    });

    $scope.$watch('satisfaction',function(nv,ov){
        $('#satisfaction').rating('update', nv);
    });

    $scope.$watch('comunication',function(nv,ov){
        $('#comunication').rating('update', nv);
    });

    $scope.$watch('schedule',function(nv,ov){
        $('#schedule').rating('update', nv);
    });

    $scope.$watch('initiative',function(nv,ov){
        $('#initiative').rating('update', nv);
    });

    $('#profession').on('rating.change', function(event, value, caption) {
        $scope.proNumber = Number(value);
        $scope.$apply();
        console.log($scope.proNumber);
    });

    $('#satisfaction').on('rating.change', function(event, value, caption) {
        $scope.satNumber = Number(value);
        $scope.$apply();
        console.log($scope.proNumber);
    });

    $('#comunication').on('rating.change', function(event, value, caption) {
        $scope.comNumber = Number(value);
        $scope.$apply();
        console.log($scope.proNumber);
    });

    $('#schedule').on('rating.change', function(event, value, caption) {
        $scope.schNumber = Number(value);
        $scope.$apply();
        console.log($scope.proNumber);
    });

    $('#initiative').on('rating.change', function(event, value, caption) {
        $scope.iniNumber = Number(value);
        $scope.$apply();
        console.log($scope.proNumber);
    });

    function getPartnerList(){
        UserService.getPartnerList($routeParams.code)
            .then(function(data){
                $scope.partnerList = data;
            });
    }
    
    $scope.getPartnerData = function(partner_id){
        UserService.getPartner(partner_id)
            .then(function(data){
                $scope.partner = data[0];
            })
    };

    $scope.Appraisal = function(){
        var data = {
            project_co : $routeParams.code,
            partner_id : $scope.partner.partner_id,
            profession : $scope.proNumber,
            satisfaction : $scope.satNumber,
            comunication : $scope.comNumber,
            schedule : $scope.schNumber,
            initiative : $scope.iniNumber
        };
        UserService.addAppraisal(data)
            .then(function(data){
                console.log(data);
            });
    }

    getPartnerList();
});