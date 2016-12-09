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
        getSearchProject : getSearchProject
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
        return;
    }

    function addProjectAppraisal(){
        return;
    }

    function getProjectAppraisal(){
        return;
    }

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
    }

    function success(res){
        return res.data;
    }
});