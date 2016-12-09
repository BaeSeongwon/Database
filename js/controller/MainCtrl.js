/**
 * Created by Life on 2016-12-01.
 */
angular.module('App').controller('MainCtrl',function($scope,ProjectService){
    $scope.getMainList = function(){
        ProjectService.getMainProject()
            .then(function(data){
                $scope.projects = quicksort(data);
                $scope.firstProjects = [];
                $scope.secondProjects = [];
                for(var a = 0; a < 6; a++){
                    if(a >= 0 && a <=2 ){
                        $scope.firstProjects.push($scope.projects[a]);
                    }else{
                        $scope.secondProjects.push($scope.projects[a]);
                    }
                }
                console.log($scope.firstProjects);
                console.log($scope.secondProjects);
            });
    }

    $scope.moveProjectRegist = function(){
        window.location.href = "http://localhost:3000/#project-regist";
    }

    function quicksort(arr){
        if (arr.length <= 1) {
            return arr;
        }
        var lte = []; //less than
        var gte = []; //greater than
        var pivot = arr[parseInt(arr.length / 2)];
        for (var i = arr.length - 1; i >= 0; i--) {
            if (arr[i].budget < pivot.budget) {
                gte.push(arr[i]);
            } else if (arr[i].budget > pivot.budget){
                lte.push(arr[i]);
            }
        }
        return Array.prototype.concat(quicksort(lte), pivot, quicksort(gte));
    }

    $scope.moveDetail = function(project_co){
        window.location.href = "http://localhost:3000/#/project-detail/" + project_co;
    }

    $scope.getMainList();
});