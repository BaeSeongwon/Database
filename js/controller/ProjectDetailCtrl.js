/**
 * Created by Life on 2016-12-07.
 */
angular.module('App').controller('ProjectDetailCtrl',function($scope,$routeParams,ProjectService){
   getDetail($routeParams.code);
    function getDetail(param){
        ProjectService.getDetailProject(param)
            .then(function(data){
                $scope.detail = data.inform[0];
                $scope.count = data.count;
                console.log($scope.detail);
            })
    }
});