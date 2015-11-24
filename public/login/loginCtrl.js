angular.module('getStuffDoneApp').controller('loginCtrl', function($scope, $location){
    
    $scope.login = function(user){
        $location.path('/' + user + '/mytasks');
    }
    
    
    
    
});