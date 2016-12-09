/**
 * Created by Life on 2016-12-01.
 */
var app = angular.module('App',['ngFileUpload','ngRoute','ngCookies']);

app.controller('AppCtrl',function($scope,$compile,$cookies,UserService){
    if($cookies.get('id')){
        $scope.userId = $cookies.get('id');
    }else{
        $scope.userId = null;
    }
    $scope.type = "작성자";

    $scope.moveRegist = function(){
        window.location.href = 'http://localhost:3000/#regist';
    };

    $scope.login = function(){
        angular.element(document.getElementsByTagName('body')).append($compile("<blind></blind>")($scope));
        angular.element(document.getElementsByTagName('body')).append($compile("<login-popup></login-popup>")($scope));
    };

    $scope.logout = function(){
        UserService.logoutUser()
            .then(function(data){
                alert('로그아웃 되었습니다.');
                window.location.href = 'http://localhost:3000/';
            })
    };
});