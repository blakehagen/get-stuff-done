angular.module('getStuffDoneApp').controller('homeCtrl', function($scope, mainService){
    
    $scope.test = "hello world!"
    
    
    $scope.tasks = function(){
        mainService.getTasks().then(function(response){
            $scope.taskData = response;  
        })
    };
    
    $scope.tasks();
    
    
    
    
})