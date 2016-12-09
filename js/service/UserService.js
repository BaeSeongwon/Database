/**
 * Created by Life on 2016-12-08.
 */
angular.module('App').service('UserService',function($http,$q){
    return{
        addUser : addUser,
        loginUser : loginUser,
        logoutUser : logoutUser
    };

    function addUser(userData){
        var request = $http({
            method : 'post',
            url : 'http://localhost:3000/addUser',
            data : $.param(userData),
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
        return request.then(success);
    };

    function loginUser(userData){
        var request = $http({
            method : 'post',
            url : 'http://localhost:3000/Login',
            data : $.param(userData),
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
        return request.then(success);
    };

    function logoutUser(){
        var request = $http({
            method : 'get',
            url : 'http://localhost:3000/Logout',
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
        return request.then(success);
    }

    function success(res){
        return res.data;
    };
})