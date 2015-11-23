angular.module('getStuffDoneApp').controller('homeCtrl', function ($scope, mainService) {

    $scope.taskAnimateBox = true;
    $scope.inputBox = false;

    $scope.inputToggle = function () {
        $scope.inputBox = !$scope.inputBox;
        $scope.taskAnimateBox = !$scope.taskAnimateBox;
    }

    // Populate Current Tasks //
    $scope.tasks = function () {
        mainService.getTasks().then(function (response) {
            $scope.taskData = response;
        })
    };
    
    $scope.tasks();
    
    setInterval(function () {
        $scope.tasks();
    }, 30000);









})