/**
 * Created by Life on 2016-12-06.
 */
angular.module('App').controller('ProjectRegistCtrl',function($scope,$compile,ProjectService){
    $scope.firstCategory = [
        {code : 'B01',name : '개발'},
        {code : 'B02',name : '디자인'}
    ];
    $scope.planFile;
    $scope.$watch('BigCategory.name',function(nv,ov){
        if(nv == '개발'){
            $scope.secondCategory = [
                {code : 'E01',name : '웹'},
                {code : 'E02',name : '애플리케이션'}
            ];
        }else if(nv == '디자인') {
            $scope.secondCategory = [
                {code : 'E03',name : '제품'},
                {code : 'E04',name : '프레젠테이션'},
                {code : 'E05',name : '인쇄물'},
                {code : 'E06',name : '커머스 & 쇼핑몰'},
                {code : 'E07',name : '로고'}
            ];
        }
    });
    $scope.techList = [
        {code : 'C01',name : "Java script"},
        {code : 'C02',name : "Java"},
        {code : 'C03',name : "C++"},
        {code : 'C04',name : "C#"},
        {code : 'C05',name : "Angular"}
    ];

    $scope.addPlanfile = function(){
        angular.element(document.getElementsByTagName('body')).append($compile("<blind></blind>")($scope));
        angular.element(document.getElementById('projectRegiContainer')).append($compile("<planfile></planfile>")($scope));
    }

    function getFormatDate(date){
        var year = date.getFullYear();
        var month = (1 + date.getMonth());
        month = month >= 10 ? month : '0' + month;
        var day = date.getDate();
        day = day >= 10 ? day : '0' + day;
        return  year + '-' + month + '-' + day;
    }

    $scope.registBtn = function(){
        projectData = {
            bigCategory : $scope.BigCategory.code,
            smallCategory : $scope.SmallCategory.code,
            projectTitle : $scope.title,
            projectComplet : getFormatDate($scope.projectComplet),
            possibleMoney : $scope.money,
            manCount : $scope.mancount,
            skill : $scope.skill.code,
            planFile : "test",
            endDay : getFormatDate($scope.endDay),
            foreStart : getFormatDate($scope.forestart),
            intro : $scope.intro
        };

        ProjectService.addProject(projectData)
            .then(function(data){
                console.log(data);
            });
    }
});