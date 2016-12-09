/**
 * Created by Life on 2016-12-01.
 */
angular.module('App').config(function($routeProvider){
    $routeProvider
        .when('/',{
            templateUrl: 'template/main/MainTmpl.html',
            controller: 'MainCtrl'
        })
        .when('/regist',{
            templateUrl: 'template/register/RegisterTmpl.html',
            controller: 'RegistCtrl'
        })
        .when('/project-regist',{
            templateUrl: 'template/project/projectRegist.html',
            controller: 'ProjectRegistCtrl'
        })
        .when('/project-select',{
            templateUrl: 'template/project/projectSelect.html',
            controller: 'ProjectSelectCtrl'
        })
        .when('/project-appraisal-select',{
            templateUrl: 'template/project/projectAppraisalSelect.html',
            controller: 'ProjectAppraisalSelectCtrl'
        })
        .when('/my-page',{
            templateUrl: 'template/project/myProject.html',
            controller: 'MyProjectCtrl'
        })
        .when('/project-detail/:code',{
            templateUrl: 'template/project/projectDetail.html',
            controller: 'ProjectDetailCtrl'
        })
        .when('/project-appraisal',{
            templateUrl: 'template/project/projectAppraisal.html',
            controller: 'ProjectAppraisalCtrl'
        })
        .otherwise({redirectTo: '/'});
});