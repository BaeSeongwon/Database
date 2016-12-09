/**
 * Created by Life on 2016-12-08.
 */
angular.module('App').controller('ProjectAppraisalCtrl',function($scope){
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
    });

    $('#satisfaction').on('rating.change', function(event, value, caption) {
        $scope.satisfaction = Number(value);
        $scope.$apply();
    });

    $('#comunication').on('rating.change', function(event, value, caption) {
        $scope.comunication = Number(value);
        $scope.$apply();
    });

    $('#schedule').on('rating.change', function(event, value, caption) {
        $scope.schedule = Number(value);
        $scope.$apply();
    });

    $('#initiative').on('rating.change', function(event, value, caption) {
        $scope.initiative = Number(value);
        $scope.$apply();
    });

});