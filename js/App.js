/**
 * Created by Life on 2016-12-01.
 */
var app = angular.module('App',['ngFileUpload','ngRoute','ngCookies']);

app.controller('AppCtrl',function($scope,$compile,$cookies,UserService,ProjectService){
    if($cookies.get('id')){
        $scope.userId = $cookies.get('id');
    }else {
        $scope.userId = null;
    }

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

    $scope.search = function(){
        var param = {
            type : $scope.type,
            keywords : $scope.keywords
        }
        ProjectService.getSearchProject(param)
            .then(function(data){
                $scope.searchProject = data;
            });
    };

    $scope.typeChange = function(type){
        if(type == 'client_id'){
            $scope.typeName = '작성자';
        }else{
            $socpe.typeName = '제목'
        }
        $scope.type = type;
    };

    $scope.moveMypage = function(){
        window.location.href = "http://localhost:3000/#/my-page";
    }
});