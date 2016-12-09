/**
 * Created by Life on 2016-12-07.
 */
angular.module('App').service('ProjectService',function($http,$q){
    return{
        getMainProject : getMainProject,
        addProject : addProject,
        getMyProject : getMyProject,
        getApplicantProject : getApplicantProject,
        addProjectAppraisal : addProjectAppraisal,
        getProjectAppraisal : getProjectAppraisal,
        getProject : getProject,
        getDetailProject : getDetailProject,
        getSearchProject : getSearchProject,
        getProgressProject : getProgressProject,
        getCompleteProject : getCompleteProject
    };

    function getMainProject(){
        var request = $http({
            method : 'get',
            url : '/list'
        });
        return request.then(success);
    }

    function addProject(projectData){
        console.log(projectData);
        var request = $http({
            url : 'http://localhost:3000/project_registeration',
            method : 'post',
            data : $.param(projectData),
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
        return request.then(success);
    }

    function getMyProject(){
        var request = $http({
            url : 'http://localhost:3000/getMyProjectList',
            method : 'get'
        });
        return request.then(success);
    }

    function getApplicantProject(){
        var request = $http({
            url : 'http://localhost:3000/getApplicantProjectList',
            method : 'get'
        });
        return request.then(success);
    };

    function getProjectAppraisal(){
        var request = $http({
            method : 'get',
            url : '/getProjectAppraisal/:co'
        })
        return request.then(success);
    };

    function getProject(){
        var request = $http({
            method : 'get',
            url : '/search'
        });
        return request.then(success);
    };

    function getDetailProject(param){
        var request = $http({
            method : 'get',
            url : '/read/' + param
        });
        return request.then(success);
    };

    function getSearchProject(param){
        var request = $http({
            method : 'get',
            url : '/DataSearch/' + param.type + '/' + param.keywords
        });
        return request.then(success);
    };

    function getCompleteProject(){
        var request = $http({
            method : 'get',
            url : '/getCompleteProject'
        });
        return request.then(success);
    };

    function getProgressProject(){
        var request = $http({
            method : 'get',
            url : '/getProgressProject'
        });
        return request.then(success);
    };

    function addProjectAppraisal(data){
        var request = $http({
            method : 'post',
            url : '/addProjectAppraisal'
            data : $.param(data),
            headers : {
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
            }
        });
        return request.then(success);
    };

    function success(res){
        return res.data;
    };
});