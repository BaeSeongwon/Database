/**
 * Created by Life on 2016-12-08.
 */
angular.module('App').service('UserService',function($http,$q){
    return{
        addUser : addUser,
        loginUser : loginUser,
        logoutUser: logoutUser,
        getApplicantPartner : getApplicantPartner,
        updateAdopt : updateAdopt,
        cancelAdopt : cancelAdopt,
        getPartnerList : getPartnerList,
        getPartner : getPartner,
        addAppraisal : addAppraisal
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
        console.log("실행");
        var request = $http({
            method : 'get',
            url : '/Logout'
        });
        return request.then(success);
    };

    function getApplicantPartner(param){
        var request = $http({
            method : 'get',
            url : '/getApplicantPartner/' + param
        });
        return request.then(success);
    };

    function updateAdopt(param){
        var request = $http({
            method : 'post',
            url : 'http://localhost:3000/updateAdopt',
            data : $.param(param),
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
        return request.then(success);
    };

    function cancelAdopt(param){
        var request = $http({
            method : 'post',
            url : 'http://localhost:3000/cancelAdopt',
            data : $.param(param),
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
        return request.then(success);
    };

    function getPartnerList(param){
        var request = $http({
            method : 'get',
            url : '/getPartnerList/' + param
        });
        return request.then(success);
    }

    function getPartner(param){
        var request = $http({
            method : 'get',
            url : '/getPartner/' + param
        });
        return request.then(success);
    }

    function addAppraisal(data){
        var request = $http({
            method : 'post',
            url : 'http://localhost:3000/addAppraisal',
            data : $.param(data),
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