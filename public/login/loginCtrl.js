angular.module('getStuffDoneApp').controller('loginCtrl', function($scope, $location, mainService){
    
    $scope.login = function(user){
        
        mainService.getTasks(user)
        $location.path('/' + user + '/mytasks');
    }
    
    
    
    
});