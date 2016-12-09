/**
 * Created by Life on 2016-12-09.
 */
angular.module('App').directive('loginPopup',function(UserService){
    var linker = function(scope,element,attrs){
        scope.cancel = function(event){
            element.remove();
            $('blind').remove();
        };

        scope.login = function(){
            data = {
                id : scope.id,
                password : scope.password
            }
            UserService.loginUser(data)
                .then(function(data){
                    if(data == '아이디와 패스워드가 일치합니다.'){
                        alert(data);
                        window.location.href = 'http://localhost:3000/';
                    }else if(data == '아이디가 존재하지 않습니다.'){
                        alert(data);
                    }else{
                        alert(data);
                    }
                });
        };
    };
    return{
        restrict : 'EA',
        templateUrl : 'template/popup/LoginPopup.html',
        link : linker,
        scope : true
    }
})