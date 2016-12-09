/**
 * Created by Life on 2016-12-01.
 */
angular.module('App').controller('RegistCtrl',function($scope,UserService){
    $scope.registBtn = function(){
        var userData = {
            type : $scope.userType,
            id : $scope.id,
            password : $scope.password,
            email : $scope.email,
            fax : $scope.fax,
            name : $scope.name,
            sex : $scope.sex,
            birth : $scope.birth,
            phone : $scope.phone,
            bank : $scope.bank,
            bankNumber : $scope.bankNumber,
            localAddress : $scope.localAddress,
            etcAddress : $scope.etcAddress
        };
        UserService.addUser(userData)
            .then(function(data){
                window.location.href = 'http://localhost:3000/';
            });
    }
});